<script>
	import { enhance } from '$app/forms';

	let loading = false;

	function handle_submit() {
		loading = true;
	}
</script>

<form method="POST" use:enhance on:submit={handle_submit}>
	<button disabled={loading}>Create session</button>
</form>
