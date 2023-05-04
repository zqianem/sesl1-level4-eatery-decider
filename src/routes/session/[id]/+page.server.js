import { redirect } from '@sveltejs/kit';
import { get_session, get_vote_count } from '$lib/server';

export async function load({ locals: { supabase }, params: { id } }) {
	const vote_count = await get_vote_count(supabase, id);
	const { votes_required } = await get_session(supabase, id, 'votes_required');

	const path = vote_count < votes_required ? 'options' : 'result';
	throw redirect(303, `/session/${id}/${path}`);
}
