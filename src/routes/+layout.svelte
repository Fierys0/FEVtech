<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { initTheme } from '$lib/stores/theme.js';

	let { children } = $props();

	onMount(() => {
		initTheme();
	});
</script>

<svelte:head>
	<title>VTECH — Precision Timepieces</title>
	<meta
		name="description"
		content="Luxury Swiss timepieces crafted for the modern connoisseur. Discover VTECH's collections of precision-engineered watches."
	/>
</svelte:head>

{@render children()}
