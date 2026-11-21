<script>
	import { onMount } from 'svelte';

	let heroEl;
	let scrollProgress = $state(0);
	let prefersReducedMotion = $state(false);

	function updateScroll() {
		if (!heroEl) return;
		const rect = heroEl.getBoundingClientRect();
		const totalScrollable = rect.height - window.innerHeight;
		if (totalScrollable <= 0) {
			scrollProgress = 0;
			return;
		}
		const scrolled = -rect.top;
		const rawProgress = scrolled / totalScrollable;
		scrollProgress = Math.max(0, Math.min(1, rawProgress));
	}

	onMount(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			scrollProgress = 1;
			return;
		}

		updateScroll();
		window.addEventListener('scroll', updateScroll, { passive: true });
		window.addEventListener('resize', updateScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', updateScroll);
			window.removeEventListener('resize', updateScroll);
		};
	});

	// Derived values for animations
	let progress = $derived(prefersReducedMotion ? 1 : scrollProgress);

	// Image overscale settles from 1.18 to 1.0
	let imageScale = $derived(1.18 - progress * 0.18);

	// Duotone wash raises from 0 to 0.28 opacity
	let duotoneOpacity = $derived(progress * 0.28);

	// Panels translate outward past 100% width
	let panelTranslateLeft = $derived(progress * 106);
	let panelTranslateRight = $derived(progress * 106);

	// Title scale up (1.0 to 1.32) and tightening tracking (0.04em to -0.03em)
	let titleScale = $derived(1.0 + progress * 0.32);
	let titleTracking = $derived(0.04 - progress * 0.07);
	let wordTravelLeft = $derived(progress * 54);
	let wordTravelRight = $derived(progress * 54);

	// Two accent dots travel to opposite corners
	let dot1X = $derived(-progress * 42);
	let dot1Y = $derived(-progress * 38);
	let dot2X = $derived(progress * 42);
	let dot2Y = $derived(progress * 38);
</script>

<section class="portal-section" bind:this={heroEl}>
	<div class="portal-stage">
		<!-- 1. Full-bleed background hero photograph (image-hero.webp) -->
		<div
			class="image-layer"
			style="transform: scale({imageScale});"
		>
			<img
				src="/image-hero.webp"
				alt="Vauthier Haute Horlogerie Timepiece on Wrist"
				class="hero-img"
				fetchpriority="high"
			/>
		</div>

		<!-- 2. Duotone wash blending amber & teal -->
		<div
			class="duotone-wash"
			style="opacity: {duotoneOpacity};"
			aria-hidden="true"
		></div>

		<!-- 3. Radial veil darkening edges -->
		<div class="radial-veil" aria-hidden="true"></div>

		<!-- 4. Two solid panels meeting in the middle (begin CLOSED) -->
		<div
			class="portal-panel panel-left"
			style="transform: translateX(-{panelTranslateLeft}%);"
			aria-hidden="true"
		></div>
		<div
			class="portal-panel panel-right"
			style="transform: translateX({panelTranslateRight}%);"
			aria-hidden="true"
		></div>

		<!-- 5. Two small accent dots at the centre travelling outward -->
		<div
			class="accent-dot dot-amber"
			style="transform: translate(calc(-50% + {dot1X}vw), calc(-50% + {dot1Y}vh));"
			aria-hidden="true"
		></div>
		<div
			class="accent-dot dot-teal"
			style="transform: translate(calc(-50% + {dot2X}vw), calc(-50% + {dot2Y}vh));"
			aria-hidden="true"
		></div>

		<!-- 6. Portal Title: VAUTHIER split into symmetrical 4-letter halves (VAUT / HIER) -->
		<div
			class="portal-title-wrapper"
			style="transform: scale({titleScale}); letter-spacing: {titleTracking}em;"
		>
			<h1 class="portal-title">
				<span
					class="word-half word-left"
					style="transform: translateX(-{wordTravelLeft}%);"
				>VAUT</span><span
					class="word-half word-right"
					style="transform: translateX({wordTravelRight}%);"
				>HIER</span>
			</h1>
		</div>

		<!-- 7. Corner metadata pinned to top and bottom edges -->
		<div class="corner-meta corner-tl label-caps">
			<span>LE LOCLE, SUISSE</span>
			<span class="meta-sep">/</span>
			<span class="meta-val">47.0502° N, 6.7495° E</span>
		</div>

		<div class="corner-meta corner-tr label-caps">
			<span>HAUTE HORLOGERIE</span>
			<span class="meta-sep">/</span>
			<span class="accent-amber">ARCHIVE N° 087</span>
		</div>

		<div class="corner-meta corner-bl label-caps">
			<span>SWISS IN-HOUSE CALIBRES</span>
			<span class="meta-sep">/</span>
			<span class="accent-teal">COSC CERTIFIED</span>
		</div>

		<div class="corner-meta corner-br label-caps">
			<span>PORTAL STATUS</span>
			<span class="meta-sep">/</span>
			<span class="status-indicator">
				{#if progress < 0.95}
					SCROLL TO UNCOVER [ ↓ ]
				{:else}
					STAGE UNCOVERED [ REVERSE ↑ ]
				{/if}
			</span>
		</div>
	</div>
</section>

<style>
	.portal-section {
		height: 250vh;
		position: relative;
		background: var(--color-ground);
	}

	.portal-stage {
		position: sticky;
		top: 0;
		height: 100vh;
		width: 100%;
		overflow: hidden;
		isolation: isolate;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 1. Image Layer */
	.image-layer {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		will-change: transform;
		transform-origin: center center;
	}

	.hero-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 38%;
		filter: brightness(0.92) contrast(1.08);
	}

	/* 2. Duotone wash blending amber & teal */
	.duotone-wash {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		mix-blend-mode: overlay;
		background: linear-gradient(135deg, var(--color-amber) 0%, var(--color-teal) 100%);
		pointer-events: none;
		will-change: opacity;
	}

	/* 3. Radial veil darkening edges */
	.radial-veil {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 3;
		background: radial-gradient(
			circle at center,
			transparent 30%,
			rgba(10, 12, 14, 0.35) 60%,
			var(--veil-color) 100%
		);
		pointer-events: none;
	}

	/* 4. Two solid panels meeting in the middle */
	.portal-panel {
		position: absolute;
		top: 0;
		width: 50.5%;
		height: 100%;
		background: var(--color-ground);
		z-index: 4;
		will-change: transform;
		pointer-events: none;
		transition: background-color 0.3s ease;
	}

	.panel-left {
		left: 0;
		transform-origin: left center;
		border-right: 1px solid var(--color-hairline);
	}

	.panel-right {
		right: 0;
		transform-origin: right center;
		border-left: 1px solid var(--color-hairline);
	}

	/* 5. Accent dots */
	.accent-dot {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		z-index: 6;
		pointer-events: none;
		will-change: transform;
	}

	.dot-amber {
		background: var(--color-amber);
	}

	.dot-teal {
		background: var(--color-teal);
	}

	/* 6. Title styling */
	.portal-title-wrapper {
		position: relative;
		z-index: 10;
		transform-origin: center center;
		will-change: transform, letter-spacing;
		pointer-events: none;
		user-select: none;
	}

	.portal-title {
		font-family: var(--font-display);
		font-size: clamp(56px, 13vw, 190px);
		font-weight: 800;
		line-height: 0.9;
		color: var(--color-ink);
		display: flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
	}

	.word-half {
		display: inline-block;
		will-change: transform;
	}

	.word-left {
		text-align: right;
	}

	.word-right {
		text-align: left;
	}

	/* 7. Corner metadata */
	.corner-meta {
		position: absolute;
		z-index: 12;
		color: var(--color-secondary-ink);
		font-size: 10.5px;
		letter-spacing: 0.14em;
		pointer-events: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.meta-sep {
		color: var(--color-hairline);
	}

	.corner-tl {
		top: calc(var(--nav-height) + 24px);
		left: var(--page-margin);
	}

	.corner-tr {
		top: calc(var(--nav-height) + 24px);
		right: var(--page-margin);
	}

	.corner-bl {
		bottom: 28px;
		left: var(--page-margin);
	}

	.corner-br {
		bottom: 28px;
		right: var(--page-margin);
	}

	.status-indicator {
		color: var(--color-amber);
	}

	@media (max-width: 768px) {
		.portal-section {
			height: 220vh;
		}

		.corner-tl,
		.corner-tr {
			top: calc(var(--nav-height) + 16px);
			font-size: 9px;
		}

		.corner-bl,
		.corner-br {
			bottom: 16px;
			font-size: 9px;
		}

		.corner-tr,
		.corner-bl {
			display: none;
		}
	}
</style>
