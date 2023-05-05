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
	}

	div.grid {
		display: grid;
		justify-content: center;
		height: 100dvh;
		padding: 4px;
		grid: auto 1fr / minmax(min-content, 420px);
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
		padding: 1em 2em;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
