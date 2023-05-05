import { error as sk_error } from '@sveltejs/kit';
import { TOMTOM_KEY } from '$env/static/private';
import shuffle from 'array-shuffle';
import haversine from 'haversine-distance';

export async function create_session(supabase, options, votes_required) {
	const { data, error } = await supabase
		.from('eat_sessions')
		.insert({ options, votes_required })
		.select()
		.maybeSingle();

	if (error) throw sk_error(500, error);

	return data.id;
}

export async function get_session(supabase, id, select = '*') {
	const { data, error } = await supabase
		.from('eat_sessions')
		.select(select)
		.eq('id', id)
		.maybeSingle();

	if (error) throw sk_error(500, error);
	if (!data) throw sk_error(404, 'Not found');

	return data;
}

export async function get_vote_count(supabase, id) {
	const { data, error } = await supabase.rpc('get_vote_count', { id });

	if (error) throw sk_error(500, error);
	if (data === null) throw sk_error(404, 'Not found');

	return data;
}

export async function add_vote(supabase, id, vote) {
	const { data, error } = await supabase.rpc('add_vote', { id, vote });

	if (error) throw sk_error(500, error);
	if (data === null) throw sk_error(409, 'All votes already received');

	return data;
}

export function pick_winner(votes) {
	const intersection = [
		...new Set(votes.reduce((acc, curr) => acc.filter((x) => curr.includes(x))))
	];
	return intersection.length === 0
		? -1
		: intersection[Math.floor(Math.random() * intersection.length)];
}

export async function set_winner(supabase, id, winner) {
	const { error } = await supabase
		.from('eat_sessions')
		.update({ winner })
		.eq('id', id);

	if (error) throw sk_error(500, error);
}

export async function reverse_lookup(lat, lon) {
	const url =
		`https://api.tomtom.com/search/2/reverseGeocode/crossStreet/` +
		`${lat},${lon}.json?key=${TOMTOM_KEY}`;
	const response = await fetch(url);
	const data = await response.json();
	const { errorText } = data;

	if (errorText) throw sk_error(500, errorText);

	return data.addresses[0].address.freeformAddress;
}

export async function get_options(lat, lon, radius) {
	const params = new URLSearchParams({
		key: TOMTOM_KEY,
		categorySet: 7315, // restaurants
		openingHours: 'nextSevenDays',
		limit: 100,
		lat,
		lon,
		radius: radius * 1609.344
	});
	const url = `https://api.tomtom.com/search/2/nearbySearch/.json?${params}`;
	const response = await fetch(url);
	const data = await response.json();
	const { errorText } = data;

	if (errorText) throw sk_error(500, errorText);

	return shuffle(data.results)
		.filter((result) => is_open_or_unknown(result.poi.openingHours))
		.slice(0, 10)
		.map((result) => tomtom_result_to_option(result, lat, lon));
}

function is_open_or_unknown(hours) {
	if (!hours) return true;
	const now = new Date();

	return hours.timeRanges.some(({ startTime, endTime }) => {
		const start = rangeTime_to_date(startTime);
		const end = rangeTime_to_date(endTime);
		return now.getTime() >= start.getTime() && now.getTime() <= end.getTime();
	});
}

function get_closing_time(hours) {
	if (!hours) return 'unknown';
	const now = new Date();

	return hours.timeRanges.find(({ startTime, endTime }) => {
		const start = rangeTime_to_date(startTime);
		const end = rangeTime_to_date(endTime);
		return now.getTime() >= start.getTime() && now.getTime() <= end.getTime();
	}).endTime;
}

function tomtom_result_to_option(result, lat, lon) {
	const {
		poi: { name, phone, categories, openingHours },
		address: { freeformAddress },
		position
	} = result;
	return {
		name,
		phone,
		address: freeformAddress,
		distance: haversine({ lat, lon }, position),
		tags: categories.filter((category) => category !== 'restaurant'),
		closes_at: get_closing_time(openingHours)
	};
}

function rangeTime_to_date(rangeTime) {
	const date = new Date(rangeTime.date);
	date.setHours(rangeTime.hour);
	date.setMinutes(rangeTime.minute);
	return date;
}
