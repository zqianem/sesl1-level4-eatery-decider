<script>
	import { page } from '$app/stores';
</script>

<h2>{$page.status} Error</h2>
<p>{$page.error.message}</p>

{#if $page.status === 409}
	<a href=".">See result</a>
{:else}
	<a href="/">Return home</a>
{/if}
