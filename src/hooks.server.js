import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

export async function handle({ event, resolve }) {
	event.locals.supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
	return resolve(event);
}
