<div class="grid">
	<header>
		<h1><a href="/">Decide on Food</a></h1>
	</header>
	<main>
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
	}

	div.grid {
		display: grid;
		justify-content: center;
		align-content: center;
		height: 100dvh;
		padding: 4px;
		grid: auto minmax(min-content, 600px) / minmax(min-content, 420px);
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
		color: black;
	}

	main {
		border-radius: 8px;
		border: 1px solid grey;
		overflow: auto;
		box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
		padding: 16px 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: white;
	}

	main > :global(:first-child) {
		margin-top: auto;
	}

	main > :global(:last-child) {
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
