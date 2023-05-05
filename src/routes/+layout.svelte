<script>
	import Spinner from './Spinner.svelte';
	import { navigating } from '$app/stores';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const spinner = writable(false);
	setContext('spinner', spinner);

	$: if (!$navigating) {
		$spinner = false;
	}
</script>

<div class="grid">
	<header>
		<h1><a href="/">Decide on Food</a></h1>
	</header>
	<main>
		<Spinner loading={$navigating || $spinner} />
		<slot />
	</main>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family: system-ui;
		font-size: 18px;
		background-image: url(/back.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	div.grid {
		display: grid;
		justify-content: center;
		align-content: center;
		height: 100dvh;
		padding: 4px;
		grid: auto minmax(0, 600px) / minmax(min-content, 420px);
	}

	header {
		padding: 8px;
	}

	h1 {
		margin: 0;
		text-align: center;
	}

	a {
		text-decoration: none;
		color: white;
		text-shadow: 0 0 8px black;
	}

	main {
		border-radius: 8px;
		overflow: auto;
		box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
		padding: 16px 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: white;
	}

	main > :global(:is(a, button):last-child) {
		margin-top: auto;
		color: white;
		background: black;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 300px;
		height: 60px;
		border-radius: 60px;
		padding: 1em;
		font-size: 24px;
		cursor: pointer;
	}

	main > :global(h2) {
		font-weight: 300;
		margin-bottom: auto;
	}

	main > :global(a:last-child) {
		text-decoration: none;
	}

	main > :global(button:last-child) {
		border: none;
	}

	main > :global(button:last-child:disabled) {
		background: grey;
	}
</style>
