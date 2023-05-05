<script>
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';

	export let data;
	$: ({ options } = data);

	const spinner = getContext('spinner');

	let loading = false;

	function handle_submit() {
		loading = true;
		$spinner = true;
	}
</script>

<h2>Step 3: Vote!</h2>
<form method="POST" use:enhance on:submit={handle_submit} id="options">
	<fieldset>
		<legend>Which places are you okay with?</legend>
		{#each options as option, i}
			{@const { name, distance, tags } = option}
			<label>
				<input type="checkbox" name="vote" value={i} checked />
				{name}
				<br />
				<span>{distance.toFixed(1)} miles</span>
				{#each tags as tag}
					<span>{tag}</span>
				{/each}
			</label>
		{/each}
	</fieldset>
</form>
<button form="options" disabled={loading}>Submit vote</button>

<style>
	form {
		width: 100%;
	}

	label {
		display: block;
		padding: 1em 0.5em;
		border: 1px solid grey;
		border-radius: 4px;
		cursor: pointer;
	}

	fieldset {
		border: none;
		padding: 0;
		margin: 1em 0;
		display: grid;
		gap: 5px;
	}

	legend {
		width: 100%;
		text-align: center;
		margin-bottom: 0.5em;
	}

	span {
		font-size: 14px;
		border-radius: 4px;
		padding: 0.25em 0.5em;
		background: #f4f7f8;
	}
</style>
