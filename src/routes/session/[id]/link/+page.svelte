<script>
	export let data;
	$: ({ url } = data);

	let copied = false;

	async function copy() {
		await navigator.clipboard.writeText(url);
		copied = true;
	}
</script>

<button on:click={copy} disabled={copied}>
	{copied ? 'Copied!' : 'Copy link'}
</button>
{#if copied}
	<p><a href={url}>Choose restaurants</a></p>
{/if}
