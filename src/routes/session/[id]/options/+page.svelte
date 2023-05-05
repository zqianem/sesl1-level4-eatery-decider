<script>
	import { enhance } from '$app/forms';

	export let data;
	$: ({ options } = data);

	let loading = false;

	function handle_submit() {
		loading = true;
	}
</script>

<form method="POST" use:enhance on:submit={handle_submit} id="options">
	<fieldset>
		<legend>Which restaurants are you okay with?</legend>
		{#each options as option, i}
			<label>
				<input type="checkbox" name="vote" value={i} checked />
				{option.name}
			</label>
		{/each}
	</fieldset>
</form>
<button form="options" disabled={loading}>Submit vote</button>

<style>
	label {
		display: block;
	}
</style>
