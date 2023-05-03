export async function load({ url }) {
	return { url: new URL('.', url).href };
}
