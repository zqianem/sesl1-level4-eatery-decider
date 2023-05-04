import { redirect } from '@sveltejs/kit';
import { get_session, add_vote, pick_winner, set_winner } from '$lib/server';

export async function load({ locals: { supabase }, params: { id } }) {
	return get_session(supabase, id, 'options');
}

export const actions = {
	default: async ({ locals: { supabase }, params: { id }, request }) => {
		const form = await request.formData();
		const vote = form.getAll('vote');

		const votes = await add_vote(supabase, id, vote);
		const { votes_required } = await get_session(
			supabase,
			id,
			'votes_required'
		);

		if (votes.length === votes_required) {
			const winner = pick_winner(votes);
			await set_winner(supabase, id, winner);
		}

		throw redirect(303, `/session/${id}/result`);
	}
};
