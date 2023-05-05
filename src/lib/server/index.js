import { error as sk_error } from '@sveltejs/kit';
import { TOMTOM_KEY } from '$env/static/private';
import { shuffle } from 'd3-array';
import haversine from 'haversine-distance';

export async function create_session(supabase, lat, lon, radius) {
	const options = await get_options(lat, lon, radius);
	const { data, error } = await supabase
		.from('eat_sessions')
		.insert({ options })
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

async function get_options(lat, lon, radius) {
	const params = new URLSearchParams({
		key: TOMTOM_KEY,
		categorySet: 7315, // restaurants
		limit: 100,
		lat,
		lon,
		radius
	});
	const url = `https://api.tomtom.com/search/2/nearbySearch/.json?${params}`;
	const response = await fetch(url);
	const data = await response.json();
	const { errorText } = data;

	if (errorText) throw sk_error(500, errorText);

	const { results } = data;
	shuffle(data.results);

	return results.slice(0, 10).map((result) => {
		const {
			poi: { name, phone, categories },
			address: { freeformAddress },
			position
		} = result;
		return {
			name,
			phone,
			address: freeformAddress,
			distance: haversine({ lat, lon }, position),
			type: categories.filter((category) => category !== 'restaurant')
		};
	});
}
