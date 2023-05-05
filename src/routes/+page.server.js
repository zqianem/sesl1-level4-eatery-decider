import { redirect } from '@sveltejs/kit';
import { create_session } from '$lib/server';

export const actions = {
	default: async ({ locals: { supabase }, platform }) => {
		const { latitude = 37.337, longitude = -121.89 } =
			platform?.context.geo ?? {};
		const radius = 5_000;
		const id = await create_session(supabase, latitude, longitude, radius);

		throw redirect(303, `/session/${id}/link`);
	}
};
