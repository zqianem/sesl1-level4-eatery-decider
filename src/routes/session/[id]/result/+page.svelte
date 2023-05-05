<script>
	export let data;
	$: ({ options, winner } = data);
</script>

<p>
	{#if winner === null}
		Waiting for all votes...
	{:else if winner < 0}
		A winner could not be chosen from the votes.
	{:else}
		The winner is {options[winner].name}!
	{/if}
</p>
<a href="/">Try again</a>
