<script>
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>VAUTHIER — Haute Horlogerie Suisse</title>
	<meta
		name="description"
		content="VAUTHIER — Swiss Haute Horlogerie. Manufacture calibres hand-assembled in Le Locle, Switzerland."
	/>
</svelte:head>

{@render children()}
