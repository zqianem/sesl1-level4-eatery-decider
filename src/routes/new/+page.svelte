<script>
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';

	export let data;
	export let form;

	const spinner = getContext('spinner');

	let { lat, lon, address } = data; // intentionally not reactive to data
	let radius = 2;
	let voters = 2;

	let precise = false;
	let location_loading = false;

	async function use_precise_location() {
		try {
			precise = true;
			location_loading = true;
			({ latitude: lat, longitude: lon } = await new Promise(
				(resolve, reject) => {
					navigator.geolocation.getCurrentPosition(
						(pos) => resolve(pos.coords),
						reject
					);
				}
			));
			address = `${lat}, ${lon}`;
		} catch {
			precise = false;
		} finally {
			location_loading = false;
		}
	}

	let loading;
	$: form, (loading = false);

	function handle_submit() {
		loading = true;
		$spinner = true;
	}

	function pluralize_miles(length) {
		return length === 1 ? '1 mile' : `${length} miles`;
	}
</script>

<h2>Step 1: Nearby Eats</h2>
<form method="POST" use:enhance on:submit={handle_submit} id="myform">
	<label class="loc">
		<span>Location:</span>
		<output name="address" for="lat lon">{address}</output>
		<input type="hidden" name="lat" value={lat} id="lat" />
		<input type="hidden" name="lon" value={lon} id="lon" />
	</label>
	<button
		class="precise"
		type="button"
		disabled={precise}
		on:click={use_precise_location}
	>
		{#if location_loading}
			Locating...
		{:else if precise}
			Found!
		{:else}
			Use precise location
		{/if}
	</button>
	<label>
		Max distance:
		<output name="max distance" for="radius">{pluralize_miles(radius)}</output>
		<input
			type="range"
			name="radius"
			id="radius"
			min="0.1"
			max="30"
			step="0.1"
			bind:value={radius}
		/>
	</label>
	<label>
		Number of voters:
		<output name="count" for="voters">{voters}</output>
		<input
			type="range"
			name="voters"
			id="voters"
			min="1"
			max="10"
			bind:value={voters}
		/>
	</label>
	{#if form?.no_results}
		<p class="red">No restaurants found — try increasing the max distance</p>
	{/if}
</form>
<button disabled={loading} form="myform">Find restaurants</button>

<style>
	form {
		text-align: center;
		width: 100%;
	}

	label {
		display: block;
		margin: 1em 0;
	}

	input {
		display: block;
		width: 100%;
	}

	label.loc {
		min-height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	label.loc span {
		display: block;
		margin-bottom: 0.5em;
	}

	label.loc output {
		display: block;
		font-weight: 500;
	}

	button.precise {
		margin: -0.5em 0 1em;
		border-radius: 100px;
		appearance: none;
		border: none;
		font-size: 16px;
		padding: 0.5em;
		background: #0a74d6;
		color: white;
		cursor: pointer;
		width: 230px;
	}

	button:disabled {
		background: grey;
	}

	p.red {
		color: #660000;
		font-weight: 500;
	}
</style>
