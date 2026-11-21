<script>
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>VTECH — Precision Timepieces</title>
	<meta
		name="description"
		content="Luxury Swiss timepieces crafted for the modern connoisseur. Discover VTECH's collections of precision-engineered watches."
	/>
</svelte:head>

{@render children()}

