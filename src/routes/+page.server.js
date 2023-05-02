import { error as sk_error, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals: { supabase } }) => {
		const { data, error } = await supabase
			.from('eat_sessions')
			.insert({})
			.select()
			.maybeSingle();

		if (error) throw sk_error(500, error);

		throw redirect(303, `/session/${data.id}`);
	}
};
