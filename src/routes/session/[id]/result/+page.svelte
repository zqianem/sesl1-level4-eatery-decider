<script>
	import loading_image from '$lib/food.gif';
	import sad_image from '$lib/sad-pikachu.gif';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	export let data;
	$: ({ options, winner } = data);

	onMount(() => {
		const interval = setInterval(() => {
			if (winner === null) invalidateAll();
		}, 1000);
		return () => clearInterval(interval);
	});
</script>

<h2>The Decision</h2>
{#if winner === null}
	<div class="image-wrapper">
		<p>Waiting for everyone to vote...</p>
		<img src={loading_image} alt="cute loading gif" width="300" />
	</div>
{:else if winner < 0}
	<div class="image-wrapper">
		<p>A winner could not be chosen.</p>
		<img src={sad_image} alt="sad pikachu gif" width="300" />
	</div>
{:else}
	{@const { name, phone, address, tags } = options[winner]}
	{@const query = new URLSearchParams({ q: address })}
	<p>We have a winner!</p>
	<div class="winner">
		<h3>{name}</h3>
		{#if phone}
			<a href="tel:{phone}">{phone}</a>
		{/if}
		<p>{address}</p>
		<a class="map-link" href="https://maps.google.com/?{query}" target="_blank">
			Open in Google Maps
		</a>
	</div>
{/if}
{#if winner === null}
	<p class="info">(page will update automatically)</p>
{:else}
	<a href="/">
		{winner < 0 ? 'Try again' : 'Return home'}
	</a>
{/if}

<style>
	div.image-wrapper {
		text-align: center;
		padding-bottom: 30px;
	}

	div.winner {
		width: 100%;
		border-radius: 8px;
		border: 1px solid grey;
		text-align: center;
		padding: 1em;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	div.winner h3 {
		margin: 0;
	}

	div.winner a {
		margin: 0.5em 0;
	}

	div.winner a.map-link {
		border-radius: 100px;
		text-decoration: none;
		font-size: 16px;
		padding: 0.5em;
		background: #0a74d6;
		color: white;
		cursor: pointer;
		width: 230px;
		display: block;
	}

	p.info {
		margin-top: auto;
	}
</style>
