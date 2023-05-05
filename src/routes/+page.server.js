import { fail, redirect } from '@sveltejs/kit';
import { get_options, create_session, reverse_lookup } from '$lib/server';

export async function load({ locals: { supabase }, platform }) {
	const { latitude: lat = 37.337, longitude: lon = -121.89 } =
		platform?.context.geo ?? {};
	const address = await reverse_lookup(lat, lon);

	return { lat, lon, address };
}

export const actions = {
	default: async ({ locals: { supabase }, request }) => {
		const form = await request.formData();
		const lat = form.get('lat');
		const lon = form.get('lon');
		const radius = form.get('radius');
		const votes_required = form.get('people');

		const options = await get_options(lat, lon, radius);
		if (options.length === 0) {
			return fail(400, { no_results: true, radius });
		}

		const id = await create_session(supabase, options, votes_required);

		throw redirect(303, `/session/${id}/link`);
	}
};
