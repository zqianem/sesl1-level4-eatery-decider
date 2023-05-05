<script>
	export let data;
	$: ({ url } = data);

	let copied = false;

	async function copy() {
		await navigator.clipboard.writeText(url);
		copied = true;
	}
</script>

<h2>Step 2: Share Link</h2>
<p>Copy before continuing:</p>
<span>{url}</span>
<button on:click={copy} disabled={copied} class="copy">
	{copied ? 'Copied!' : 'Copy link'}
</button>
<form action={url} id="formlink" />
<button form="formlink" disabled={!copied}>Continue</button>

<style>
	span {
		color: black;
		font-weight: 500;
		user-select: none;
		text-align: center;
		display: block;
		overflow: auto;
		max-width: 300px;
		white-space: nowrap;
	}

	button.copy {
		margin: 1em 0;
		border-radius: 100px;
		appearance: none;
		border: none;
		font-size: 18px;
		padding: 0.5em;
		background: #0a74d6;
		color: white;
		cursor: pointer;
		width: 100px;
	}

	button:disabled {
		background: grey;
	}
</style>
