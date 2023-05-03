import { redirect } from '@sveltejs/kit';
import { create_session } from '$lib/server';

export const actions = {
	default: async ({ locals: { supabase } }) => {
		const id = await create_session(supabase);

		throw redirect(303, `/session/${id}/link`);
	}
};
