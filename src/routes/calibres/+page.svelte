<script>
	// Navigasi Multi-Halaman: Halaman 2 (Calibre Directory & Technical Archive)
	import Navigation from '$lib/components/Navigation.svelte';
	import { watches } from '$lib/data/watches.js';

	// Interaktivitas DOM & JS: Live Filtering & Search
	let searchQuery = $state('');
	let selectedCategory = $state('all');
	let activeCalibreModal = $state(null);

	const categories = [
		{ id: 'all', label: 'All Calibres' },
		{ id: 'chronograph', label: 'Chronograph' },
		{ id: 'perpetual', label: 'Perpetual & Complications' },
		{ id: 'dress', label: 'Ultra-Thin Dress' },
		{ id: 'diver', label: 'Marine & Sport' }
	];

	// Filter data reaktif dengan derived runes
	let filteredWatches = $derived(
		watches.filter((w) => {
			const matchesSearch =
				w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				w.edition.toLowerCase().includes(searchQuery.toLowerCase()) ||
				w.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
				w.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());

			if (!matchesSearch) return false;

			if (selectedCategory === 'all') return true;
			if (selectedCategory === 'chronograph') return w.id.includes('chronograph');
			if (selectedCategory === 'perpetual') return w.id.includes('titanium') || w.id.includes('boccia');
			if (selectedCategory === 'dress') return w.id.includes('phantom') || w.id.includes('heritage');
			if (selectedCategory === 'diver') return w.id.includes('nautilus') || w.id.includes('horizon');
			return true;
		})
	);

	function openModal(watch) {
		activeCalibreModal = watch;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeModal() {
		activeCalibreModal = null;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}
</script>

<svelte:head>
	<title>Calibre Archive & Technical Directory — VAUTHIER</title>
	<meta
		name="description"
		content="Explore the complete registry of Vauthier Swiss in-house manufacture movements and technical horological specifications."
	/>
</svelte:head>

<!-- Struktur Semantik HTML: <header> & <nav> -->
<Navigation />

<!-- Struktur Semantik HTML: <main> -->
<main class="archive-main">
	<!-- Struktur Semantik HTML: <section> Hero Header -->
	<section class="archive-hero">
		<div class="container">
			<!-- Navigasi Breadcrumb -->
			<nav class="breadcrumb label-caps" aria-label="Breadcrumb">
				<a href="/" class="crumb-link">VAUTHIER</a>
				<span class="crumb-sep">/</span>
				<span class="crumb-current">MANUFACTURE CALIBRE DIRECTORY</span>
			</nav>

			<div class="hero-content">
				<span class="label-caps hero-badge">01 / TECHNICAL ARCHIVE</span>
				<h1 class="display-title hero-title">
					THE MANUFACTURE<br />CALIBRES
				</h1>
				<p class="hero-desc">
					Every Vauthier movement is conceived, machined, hand-finished, and assembled
					under one roof in Le Locle, Switzerland. Explore the full technical archive of
					in-house calibres, frequency ratings, and horological complications.
				</p>
			</div>
		</div>
	</section>

	<!-- Struktur Semantik HTML: <section> Filter & Card Grid -->
	<section class="archive-filter-section">
		<div class="container">
			<!-- Interaktivitas DOM & JS: Search Bar & Kategori Filter -->
			<div class="filter-bar">
				<!-- Search Input -->
				<div class="search-box">
					<svg
						class="search-icon"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<circle cx="11" cy="11" r="8"></circle>
						<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
					</svg>
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search calibres, complications, materials..."
						class="search-input"
						aria-label="Filter calibres"
					/>
					{#if searchQuery}
						<button
							class="clear-search-btn label-caps"
							onclick={() => (searchQuery = '')}
							aria-label="Clear search"
						>
							CLEAR
						</button>
					{/if}
				</div>

				<!-- Category Filter Chips -->
				<div class="filter-chips" role="radiogroup" aria-label="Filter by complication category">
					{#each categories as cat}
						<button
							class="chip-btn label-caps"
							class:active={selectedCategory === cat.id}
							role="radio"
							aria-checked={selectedCategory === cat.id}
							onclick={() => (selectedCategory = cat.id)}
						>
							{cat.label}
						</button>
					{/each}
				</div>
			</div>

			<!-- Indikator Jumlah Hasil -->
			<div class="results-header">
				<span class="label-caps count-text">
					SHOWING {filteredWatches.length} OF {watches.length} REGISTERED CALIBRES
				</span>
				<div class="header-rule" aria-hidden="true"></div>
			</div>

			<!-- Struktur Semantik HTML: <article> untuk Setiap Item Produk -->
			<div class="calibre-grid">
				{#each filteredWatches as watch, i}
					<article class="calibre-card">
						<div class="card-top">
							<span class="label-caps card-ref">REF. VA-0{i + 1}</span>
							<span class="label-caps card-edition accent-amber">{watch.edition}</span>
						</div>

						<h2 class="display-title card-title">{watch.name}</h2>
						<p class="card-tagline">{watch.tagline}</p>

						<p class="card-desc">{watch.shortDesc}</p>

						<!-- Spesifikasi Teknis -->
						<div class="card-specs-list" role="list">
							{#each watch.specs.slice(0, 4) as spec}
								<div class="spec-row" role="listitem">
									<span class="spec-key label-caps">{spec.label}</span>
									<span class="spec-val">{spec.value}</span>
								</div>
							{/each}
						</div>

						<!-- Tombol Aksi -->
						<div class="card-actions">
							<button
								class="btn-pill btn-pill-primary"
								onclick={() => openModal(watch)}
							>
								View Dossier
							</button>
							<a href="/#calibre-3d" class="btn-pill btn-pill-ghost">
								3D Preview →
							</a>
						</div>
					</article>
				{/each}

				{#if filteredWatches.length === 0}
					<div class="empty-state">
						<p class="display-title empty-title">NO CALIBRES MATCHED YOUR CRITERIA</p>
						<p class="label-caps empty-subtitle">
							TRY CLEARING THE SEARCH QUERY OR SELECTING "ALL CALIBRES".
						</p>
						<button
							class="btn-pill btn-pill-ghost"
							onclick={() => {
								searchQuery = '';
								selectedCategory = 'all';
							}}
						>
							Reset Filters
						</button>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- Section Standar Manufaktur -->
	<section class="standards-section">
		<div class="container standards-inner">
			<div class="standards-left">
				<span class="label-caps">02 / HOROLOGICAL RIGOR</span>
				<h2 class="display-title standards-title">
					THE JURA CHRONOMETRY<br />BENCHMARKS
				</h2>
				<p class="standards-desc">
					Each calibre undergoes 360 hours of continuous position testing across five
					temperatures (-4°C to +38°C) before earning the official COSC bulletin de
					marche.
				</p>
			</div>

			<div class="standards-right">
				<div class="standard-stat">
					<span class="stat-num display-title">312</span>
					<span class="label-caps">INDIVIDUAL HAND-FINISHED COMPONENTS</span>
				</div>
				<div class="standard-stat">
					<span class="stat-num display-title">28,800</span>
					<span class="label-caps">VIBRATIONS PER HOUR (4 HZ HIGH-BEAT)</span>
				</div>
				<div class="standard-stat">
					<span class="stat-num display-title">±2 SEC</span>
					<span class="label-caps">MAXIMUM DAILY DEVIATION TOLERANCE</span>
				</div>
			</div>
		</div>
	</section>
</main>

<!-- Interaktivitas DOM & JS: Modal Dialog Detail Spesifikasi -->
{#if activeCalibreModal}
	<div
		class="modal-backdrop"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		aria-labelledby="modal-calibre-title"
		onkeydown={(e) => {
			if (e.key === 'Escape') closeModal();
		}}
	>
		<div class="modal-card">
			<div class="modal-header">
				<div>
					<span class="label-caps accent-amber">{activeCalibreModal.edition}</span>
					<h3 id="modal-calibre-title" class="display-title modal-title">
						{activeCalibreModal.name}
					</h3>
				</div>
				<button class="modal-close" aria-label="Close dossier" onclick={closeModal}>
					✕
				</button>
			</div>

			<p class="modal-story">{activeCalibreModal.story}</p>

			<div class="modal-specs">
				{#each activeCalibreModal.specs as spec}
					<div class="modal-spec-row">
						<span class="label-caps spec-k">{spec.label}</span>
						<span class="spec-v">{spec.value}</span>
					</div>
				{/each}
			</div>

			<div class="modal-actions">
				<a href="/#dates" class="btn-pill btn-pill-primary" onclick={closeModal}>
					Book Salon Viewing
				</a>
				<a href="/#calibre-3d" class="btn-pill btn-pill-ghost" onclick={closeModal}>
					Open 3D Stage
				</a>
			</div>
		</div>
	</div>
{/if}

<!-- Struktur Semantik HTML: <footer> -->
<footer class="archive-footer">
	<div class="container footer-content">
		<div class="footer-left">
			<a href="/" class="footer-brand display-title">VAUTHIER<span class="accent-amber">.</span></a>
			<p class="label-caps">HAUTE HORLOGERIE SUISSE · LE LOCLE</p>
		</div>

		<div class="footer-nav">
			<a href="/" class="footer-link label-caps">HOME ATELIER</a>
			<a href="/#calibre-3d" class="footer-link label-caps">3D LABORATORY</a>
			<a href="/calibres" class="footer-link label-caps accent-amber">CALIBRE ARCHIVE</a>
			<a href="/#dates" class="footer-link label-caps">SALON DATES</a>
		</div>

		<div class="footer-copy label-caps">
			<span>SWISS REG. NO. 884-VA</span>
			<span class="sep">/</span>
			<span>© 2024 VAUTHIER HORLOGERIE S.A.</span>
		</div>
	</div>
</footer>

<style>
	/* Pengaturan Tampilan & Tata Letak menggunakan CSS */
	.archive-main {
		padding-top: var(--nav-height);
		background: var(--color-ground);
		min-height: 100vh;
	}

	/* Hero */
	.archive-hero {
		padding-top: clamp(4rem, 7vw, 6rem);
		padding-bottom: clamp(3rem, 5vw, 4.5rem);
		border-bottom: 1px solid var(--color-hairline);
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		margin-bottom: 2rem;
		color: var(--color-muted);
	}

	.crumb-link {
		color: var(--color-secondary-ink);
		transition: color 0.2s ease;
	}

	.crumb-link:hover {
		color: var(--color-amber);
	}

	.crumb-sep {
		color: var(--color-hairline);
	}

	.crumb-current {
		color: var(--color-ink);
	}

	.hero-badge {
		display: block;
		margin-bottom: 1.25rem;
		color: var(--color-muted);
	}

	.hero-title {
		font-size: clamp(36px, 5.5vw, 72px);
		line-height: 1.05;
		margin-bottom: 1.75rem;
	}

	.hero-desc {
		font-family: var(--font-body);
		font-size: 15px;
		line-height: 1.8;
		color: var(--color-secondary-ink);
		max-width: 620px;
	}

	/* Filters */
	.archive-filter-section {
		padding-block: clamp(3rem, 6vw, 5rem);
		border-bottom: 1px solid var(--color-hairline);
	}

	.filter-bar {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.search-box {
		position: relative;
		width: 100%;
		max-width: 520px;
	}

	.search-icon {
		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-muted);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		background: var(--color-secondary-ground);
		border: 1px solid var(--color-hairline);
		border-radius: 9999px;
		padding: 0.85rem 3.5rem 0.85rem 2.85rem;
		font-family: var(--font-body);
		font-size: 13.5px;
		color: var(--color-ink);
		outline: none;
		transition: border-color 0.25s ease;
	}

	.search-input:focus {
		border-color: var(--color-amber);
	}

	.clear-search-btn {
		position: absolute;
		right: 1.25rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-muted);
		font-size: 9px;
		transition: color 0.2s ease;
	}

	.clear-search-btn:hover {
		color: var(--color-amber);
	}

	.filter-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.chip-btn {
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		border: 1px solid var(--color-hairline);
		background: transparent;
		color: var(--color-secondary-ink);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.chip-btn:hover {
		border-color: var(--color-ink);
		color: var(--color-ink);
	}

	.chip-btn.active {
		border-color: var(--color-amber);
		color: var(--color-amber);
		background: rgba(232, 145, 60, 0.08);
	}

	.results-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.count-text {
		color: var(--color-muted);
		white-space: nowrap;
	}

	.header-rule {
		flex: 1;
		height: 1px;
		background: var(--color-hairline);
	}

	/* Desain Responsif: Grid Multi-Kolom */
	.calibre-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	.calibre-card {
		background: var(--color-secondary-ground);
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition: transform 0.25s ease, border-color 0.25s ease;
	}

	.calibre-card:hover {
		transform: translateY(-4px);
		border-color: rgba(232, 145, 60, 0.3);
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.25rem;
	}

	.card-title {
		font-size: 20px;
		line-height: 1.2;
		margin-bottom: 0.5rem;
	}

	.card-tagline {
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		color: var(--color-secondary-ink);
		margin-bottom: 1rem;
	}

	.card-desc {
		font-family: var(--font-body);
		font-size: 13.5px;
		line-height: 1.65;
		color: var(--color-muted);
		margin-bottom: 1.75rem;
	}

	.card-specs-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--color-hairline);
		margin-bottom: 1.75rem;
	}

	.spec-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-size: 12px;
	}

	.spec-key {
		color: var(--color-muted);
		font-size: 9px;
	}

	.spec-val {
		color: var(--color-ink);
		font-weight: 500;
	}

	.card-actions {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.empty-state {
		grid-column: 1 / -1;
		padding: 4rem 1rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.empty-title {
		font-size: 20px;
	}

	.empty-subtitle {
		color: var(--color-muted);
	}

	/* Standards Section */
	.standards-section {
		padding-block: clamp(5rem, 8vw, 7rem);
		border-bottom: 1px solid var(--color-hairline);
	}

	.standards-inner {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: clamp(2rem, 5vw, 5rem);
		align-items: center;
	}

	.standards-title {
		font-size: clamp(28px, 3.5vw, 44px);
		margin-top: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.standards-desc {
		color: var(--color-secondary-ink);
		font-size: 14.5px;
		line-height: 1.75;
		max-width: 500px;
	}

	.standards-right {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		border-left: 1px solid var(--color-hairline);
		padding-left: clamp(2rem, 4vw, 4rem);
	}

	.standard-stat {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.stat-num {
		font-size: clamp(32px, 4vw, 54px);
		color: var(--color-amber);
		line-height: 1;
	}

	/* Modal */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(10, 12, 14, 0.85);
		backdrop-filter: blur(12px);
		z-index: 2000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}

	.modal-card {
		background: var(--color-secondary-ground);
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		width: 100%;
		max-width: 560px;
		padding: 2.25rem;
		max-height: 90vh;
		overflow-y: auto;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		border-bottom: 1px solid var(--color-hairline);
		padding-bottom: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.modal-title {
		font-size: 22px;
		margin-top: 0.25rem;
	}

	.modal-close {
		color: var(--color-muted);
		font-size: 16px;
		padding: 4px;
	}

	.modal-story {
		font-family: var(--font-body);
		font-size: 14px;
		line-height: 1.75;
		color: var(--color-secondary-ink);
		margin-bottom: 1.75rem;
	}

	.modal-specs {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		border-top: 1px solid var(--color-hairline);
		border-bottom: 1px solid var(--color-hairline);
		padding-block: 1.25rem;
		margin-bottom: 1.75rem;
	}

	.modal-spec-row {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
	}

	.spec-k {
		color: var(--color-muted);
		font-size: 9.5px;
	}

	.spec-v {
		font-weight: 500;
		color: var(--color-ink);
	}

	.modal-actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	/* Footer */
	.archive-footer {
		padding-block: 3.5rem;
		background: var(--color-ground);
	}

	.footer-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.footer-brand {
		font-size: 18px;
		margin-bottom: 0.25rem;
		display: block;
	}

	.footer-nav {
		display: flex;
		gap: 2rem;
	}

	.footer-link {
		color: var(--color-secondary-ink);
		transition: color 0.2s ease;
	}

	.footer-link:hover {
		color: var(--color-amber);
	}

	.footer-copy {
		display: flex;
		gap: 0.5rem;
		color: var(--color-muted);
	}

	.sep {
		color: var(--color-hairline);
	}

	/* Desain Responsif: Breakpoint Tablet & Mobile */
	@media (max-width: 1024px) {
		.calibre-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.standards-inner {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.standards-right {
			border-left: none;
			padding-left: 0;
			border-top: 1px solid var(--color-hairline);
			padding-top: 2rem;
		}
	}

	@media (max-width: 680px) {
		.calibre-grid {
			grid-template-columns: 1fr;
		}

		.footer-content {
			flex-direction: column;
			align-items: flex-start;
			gap: 1.5rem;
		}

		.footer-nav {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
