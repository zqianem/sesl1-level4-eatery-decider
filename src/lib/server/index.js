import { error as sk_error } from '@sveltejs/kit';

export async function create_session(supabase) {
	const { data, error } = await supabase
		.from('eat_sessions')
		.insert({})
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

export async function get_winner(supabase, id) {
	const { data, error } = await supabase.rpc('get_winner', { id });

	if (error) throw sk_error(500, error);
	if (data === null) throw sk_error(404, 'Not found');

	return data;
}

// convert 2D jagged array to square array
function pad(array) {
	const length = Math.max(...array.map((subarray) => subarray.length));
	return array.map((subarray) =>
		subarray.concat(new Array(length - subarray.length).fill(null))
	);
}

// convert 2D square array to jagged array
function unpad(array) {
	return array.map((subarray) => subarray.filter((v) => v !== null));
}
