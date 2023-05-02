import { error as sk_error } from '@sveltejs/kit';

export async function load({ params: { id }, locals: { supabase } }) {
	const { data, error } = await supabase
		.from('eat_sessions')
		.select()
		.eq('id', id)
		.maybeSingle();

	if (error) throw sk_error(500, error);
	if (!data) throw sk_error(404, 'Not found');

	return data;
}
