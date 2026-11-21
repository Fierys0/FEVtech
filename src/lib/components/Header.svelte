<script>
	import ThemeToggle from './ThemeToggle.svelte';

	let menuOpen = $state(false);

	const navLinks = [
		{ label: 'Collections', href: '#showcase' },
		{ label: 'Craftsmanship', href: '#features' },
		{ label: 'Heritage', href: '#process' },
		{ label: 'Contact', href: '#footer' }
	];

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header class="header">
	<div class="header-inner container">
		<a href="/" class="logo" aria-label="VTECH Home">
			<span class="logo-v">V</span><span class="logo-rest">TECH</span>
		</a>

		<nav class="nav" class:open={menuOpen} aria-label="Main navigation">
			{#each navLinks as link}
				<a href={link.href} class="nav-link" onclick={closeMenu}>
					{link.label}
				</a>
			{/each}
			<div class="nav-actions-mobile">
				<div class="mobile-toggle-row">
					<span class="mobile-toggle-label">Theme</span>
					<ThemeToggle />
				</div>
				<a href="#" class="sign-in" onclick={closeMenu}>Sign In</a>
				<a href="#appointment" class="btn-primary" onclick={closeMenu}>Book Now</a>
			</div>
		</nav>

		<div class="header-actions">
			<ThemeToggle />
			<a href="#" class="sign-in">Sign In</a>
			<a href="#appointment" class="btn-primary">Book Now</a>
		</div>

		<button
			class="menu-toggle"
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span class="menu-line" class:open={menuOpen}></span>
			<span class="menu-line" class:open={menuOpen}></span>
			<span class="menu-line" class:open={menuOpen}></span>
		</button>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 100;
		background-color: var(--color-header-bg);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--color-hairline);
		transition: background-color 0.3s ease, border-color 0.3s ease;
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 4.5rem;
		gap: 2rem;
	}

	/* ── Logo ── */
	.logo {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--color-primary);
		text-decoration: none;
		flex-shrink: 0;
	}

	.logo-v {
		color: var(--color-accent);
	}

	/* ── Nav ── */
	.nav {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-link {
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 450;
		color: var(--color-secondary);
		text-decoration: none;
		transition: color 0.2s ease;
		letter-spacing: 0.01em;
		position: relative;
		padding-bottom: 2px;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--color-primary);
		transition: width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
	}

	.nav-link:hover {
		color: var(--color-primary);
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.nav-actions-mobile {
		display: none;
	}

	/* ── Actions ── */
	.header-actions {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		flex-shrink: 0;
	}

	.sign-in {
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 450;
		color: var(--color-secondary);
		transition: color 0.2s ease;
	}

	.sign-in:hover {
		color: var(--color-primary);
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0.625rem 1.5rem;
		background-color: var(--color-action-fill);
		color: var(--color-action-label);
		border-radius: var(--control-corner);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		text-decoration: none;
	}

	.btn-primary:hover {
		transform: scale(1.03);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
	}

	/* ── Hamburger ── */
	.menu-toggle {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.5rem;
		cursor: pointer;
		background: none;
		border: none;
	}

	.menu-line {
		display: block;
		width: 100%;
		height: 2px;
		background-color: var(--color-primary);
		border-radius: 1px;
		transition: transform 0.3s ease, opacity 0.3s ease;
		transform-origin: center;
	}

	.menu-line.open:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.menu-line.open:nth-child(2) {
		opacity: 0;
	}

	.menu-line.open:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	/* ── Mobile ── */
	@media (max-width: 768px) {
		.menu-toggle {
			display: flex;
		}

		.header-actions {
			display: none;
		}

		.nav {
			position: fixed;
			top: 4.5rem;
			left: 0;
			right: 0;
			bottom: 0;
			flex-direction: column;
			align-items: flex-start;
			gap: 0;
			padding: 1.5rem var(--page-margin);
			background: var(--color-ground);
			border-top: 1px solid var(--color-hairline);
			transform: translateX(100%);
			transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
			overflow-y: auto;
		}

		.nav.open {
			transform: translateX(0);
		}

		.nav-link {
			font-size: 1.25rem;
			padding: 1rem 0;
			width: 100%;
			border-bottom: 1px solid var(--color-hairline);
		}

		.nav-link::after {
			display: none;
		}

		.nav-actions-mobile {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			width: 100%;
			padding-top: 1.5rem;
		}

		.nav-actions-mobile .btn-primary {
			text-align: center;
			justify-content: center;
			padding: 0.875rem 1.5rem;
		}

		.nav-actions-mobile .sign-in {
			font-size: 1rem;
			text-align: center;
			padding: 0.5rem;
		}

		.mobile-toggle-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0.5rem 0;
			border-bottom: 1px solid var(--color-hairline);
		}

		.mobile-toggle-label {
			font-family: var(--font-display);
			font-size: 1rem;
			color: var(--color-secondary);
		}
	}
</style>
