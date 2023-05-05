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
<form action={url} id="formlink" />
<button form="formlink" disabled={!copied}>Choose restaurants</button>
