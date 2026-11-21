<script>
	// Komponen Semantik HTML
	import Navigation from '$lib/components/Navigation.svelte';
	import PortalHero from '$lib/components/PortalHero.svelte';
	import StatementFold from '$lib/components/StatementFold.svelte';
	import Watch3DSection from '$lib/components/Watch3DSection.svelte';
	import ThrowableDeck from '$lib/components/ThrowableDeck.svelte';
	import RosterAndDates from '$lib/components/RosterAndDates.svelte';
	import CloseSection from '$lib/components/CloseSection.svelte';
</script>

<svelte:head>
	<title>VAUTHIER · Haute Horlogerie Suisse</title>
	<meta
		name="description"
		content="VAUTHIER — Swiss Haute Horlogerie. Portal opening, 3D calibre laboratory, physical catalogue deck of sleeves, movement archive, and private salon viewings."
	/>
</svelte:head>

<!-- Struktur Semantik HTML: <header> & <nav> -->
<Navigation />

<!-- Struktur Semantik HTML: <main> -->
<main id="main-content">
	<!-- Portal Hero: Opening stage dengan scroll uncover -->
	<PortalHero />

	<!-- Struktur Semantik HTML: <section> 01 Manifesto -->
	<StatementFold />

	<!-- Struktur Semantik HTML: <section> 02 (Interaktif 3D Calibre Stage) -->
	<Watch3DSection />

	<!-- Struktur Semantik HTML: <section> 03 (Throwable Card Deck) -->
	<ThrowableDeck />

	<!-- Struktur Semantik HTML: <section> 04 & 05 (Calibre Roster & Salon Itinerary) -->
	<RosterAndDates />

	<!-- Struktur Semantik HTML: <section> 06 & <footer> (Acquisition & Footer Strip) -->
	<CloseSection />
</main>
