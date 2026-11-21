<script>
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	
	// Interaktivitas DOM & JS: State Menu Navigasi Dinamis
	let menuOpen = $state(false);

	const navLinks = [
		{ label: 'HOME', href: '/' },
		{ label: 'CALIBRE ARCHIVE', href: '/calibres' },
		{ label: '3D LABORATORY', href: '/#calibre-3d' },
		{ label: 'CATALOGUE', href: '/#releases' },
		{ label: 'SALON DATES', href: '/#dates' }
	];

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<!-- Komponen Semantik HTML: <header> -->
<header class="navbar">
	<div class="navbar-inner container">
		<!-- Brand Wordmark linking to Home -->
		<a href="/" class="wordmark" onclick={closeMenu} aria-label="Vauthier Home">
			VAUTHIER<span class="period">.</span>
		</a>

		<!-- Komponen Semantik HTML: <nav> dengan manipulasi class dinamis DOM -->
		<nav class="nav-links" class:open={menuOpen} aria-label="Primary Navigation">
			{#each navLinks as link}
				<a href={link.href} class="nav-link" onclick={closeMenu}>
					{link.label}
				</a>
			{/each}
			
			<!-- Mobile Navigation Drawer Actions -->
			<div class="mobile-action">
				<div class="mobile-theme-row">
					<!-- Night Mode / Light Mode Theme Toggle -->
					<ThemeToggle />
				</div>
				<a href="/#dates" class="btn-pill btn-pill-primary" onclick={closeMenu}>
					BOOK SALON
				</a>
			</div>
		</nav>

		<!-- Desktop Navigation Actions -->
		<div class="nav-actions">
			<!-- Night Mode / Light Mode Theme Toggle -->
			<ThemeToggle />
			
			<a href="/#dates" class="btn-pill btn-pill-primary">
				BOOK SALON
			</a>
			
			<!-- Mobile Hamburger Toggle Button with DOM Event Handling -->
			<button
				class="menu-btn"
				aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
				aria-expanded={menuOpen}
				onclick={toggleMenu}
			>
				<span class="menu-bar" class:open={menuOpen}></span>
				<span class="menu-bar" class:open={menuOpen}></span>
			</button>
		</div>
	</div>
</header>

<style>
	/* Desain Tata Letak & Styling CSS */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: var(--nav-height);
		background: var(--color-nav-bg);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border-bottom: 1px solid var(--color-hairline);
		z-index: 1000;
		transition: background-color 0.3s ease, border-color 0.3s ease;
	}

	.navbar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}

	.wordmark {
		font-family: var(--font-display);
		font-size: 15px;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--color-ink);
		text-decoration: none;
		display: inline-flex;
		align-items: baseline;
	}

	.period {
		color: var(--color-amber);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 2.25rem;
	}

	.nav-link {
		font-family: var(--font-body);
		font-size: 10.5px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--color-secondary-ink);
		transition: color 0.2s ease;
	}

	.nav-link:hover {
		color: var(--color-amber);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.mobile-action {
		display: none;
	}

	.menu-btn {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 6px;
		width: 32px;
		height: 32px;
		padding: 4px;
	}

	.menu-bar {
		width: 100%;
		height: 1.5px;
		background: var(--color-ink);
		transition: transform 0.25s ease, opacity 0.25s ease;
	}

	.menu-bar.open:nth-child(1) {
		transform: translateY(3.75px) rotate(45deg);
	}

	.menu-bar.open:nth-child(2) {
		transform: translateY(-3.75px) rotate(-45deg);
	}

	/* Desain Responsif: Breakpoint Mobile & Tablet */
	@media (max-width: 900px) {
		.menu-btn {
			display: flex;
		}

		.nav-actions .btn-pill,
		.nav-actions :global(.theme-toggle-btn) {
			display: none;
		}

		.nav-links {
			position: fixed;
			top: var(--nav-height);
			left: 0;
			width: 100%;
			height: calc(100vh - var(--nav-height));
			background: var(--color-ground);
			flex-direction: column;
			align-items: flex-start;
			padding: 2.5rem var(--page-margin);
			gap: 1.75rem;
			transform: translateY(-100%);
			transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
			border-bottom: 1px solid var(--color-hairline);
			pointer-events: none;
		}

		.nav-links.open {
			transform: translateY(0);
			pointer-events: auto;
		}

		.nav-link {
			font-size: 14px;
			padding-bottom: 0.5rem;
			width: 100%;
			border-bottom: 1px solid var(--color-hairline-subtle);
		}

		.mobile-action {
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
			margin-top: 1rem;
			width: 100%;
		}

		.mobile-theme-row {
			display: flex;
			align-items: center;
		}

		.mobile-action .btn-pill {
			width: 100%;
		}
	}
</style>
