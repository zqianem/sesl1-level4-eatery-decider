<script>
	export let loading;
</script>

<span class="spinner" class:loading />

<style>
	span.spinner {
		--width: 48px;
		--thick-border: 5px solid black;
		border-radius: 4px;
		top: calc(50% - var(--width) / 2);
		position: absolute;
		width: var(--width);
		height: var(--width);
		border: var(--thick-border);
		pointer-events: none;
		opacity: 0;
		z-index: 1;
	}

	span.spinner.loading {
		opacity: 1;
		transition: opacity 0.2s;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		100% {
			transform: rotate(1turn);
		}
	}
</style>
