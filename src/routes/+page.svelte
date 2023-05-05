<script>
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let { lat, lon, address } = data; // intentionally not reactive to data
	let radius = 2;

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

	let loading = false;

	function handle_submit() {
		loading = true;
	}

	function pluralize_miles(length) {
		return length === 1 ? '1 mile' : `${length} miles`;
	}
</script>

<form method="POST" use:enhance on:submit={handle_submit}>
	<label>
		Location:
		<output name="address" for="lat lon">{address}</output>
		<input type="hidden" name="lat" value={lat} id="lat" />
		<input type="hidden" name="lon" value={lon} id="lon" />
	</label>
	<button type="button" disabled={precise} on:click={use_precise_location}>
		{#if location_loading}
			Loading...
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
	{#if form?.no_results}
		<p>No results — try increasing the max distance</p>
	{/if}
	<button disabled={loading}>Find restaurants</button>
</form>

<style>
	label {
		display: block;
	}

	input {
		display: block;
	}
</style>
