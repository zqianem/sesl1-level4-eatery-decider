import { get_session } from '$lib/server';

export async function load({ locals: { supabase }, params: { id }, parent }) {
	return get_session(supabase, id, 'winner');
}
