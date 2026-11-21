<script>
	import { onMount } from 'svelte';

	let foldEl;
	let circleRotation = $state(0);
	let circleDrift = $state(0);
	let prefersReducedMotion = $state(false);

	function updateMotion() {
		if (prefersReducedMotion || !foldEl) return;
		const rect = foldEl.getBoundingClientRect();
		const windowH = window.innerHeight;
		// calculate visibility ratio
		const progress = (windowH - rect.top) / (windowH + rect.height);
		if (progress >= 0 && progress <= 1) {
			circleRotation = (progress - 0.5) * 50; // rotate -25deg to +25deg
			circleDrift = (progress - 0.5) * 70; // drift Y -35px to +35px
		}
	}

	onMount(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!prefersReducedMotion) {
			window.addEventListener('scroll', updateMotion, { passive: true });
			updateMotion();
		}
		return () => {
			window.removeEventListener('scroll', updateMotion);
		};
	});
</script>

<section class="statement-fold" id="statement" bind:this={foldEl}>
	<!-- Outlined index numeral with transparent fill using -webkit-text-stroke -->
	<div class="index-numeral" aria-hidden="true">01</div>

	<!-- Floating circular image drifting & rotating on scroll (image3.jfif) -->
	<div
		class="floating-circle-wrapper"
		style="transform: translateY({circleDrift}px) rotate({circleRotation}deg);"
		aria-hidden="true"
	>
		<div class="circular-crop">
			<img
				src="/image3.jfif"
				alt="Vauthier Haute Horlogerie Complication Craftsmanship"
				class="dial-texture"
			/>
		</div>
	</div>

	<div class="container statement-content">
		<span class="label-caps statement-label">01 / MANIFESTO</span>

		<h2 class="statement-text">
			True mechanical mastery does not chase fleeting moments. It commands them through
			<span class="accent-amber">obsessive Swiss geometry</span> and hand-sculpted calibres.
		</h2>

		<div class="statement-footer">
			<span class="label-caps technical-note">
				ATELIER LE LOCLE · HOROLOGICAL SPECIFICATION V-SERIES
			</span>
			<div class="hairline-divider" aria-hidden="true"></div>
		</div>
	</div>
</section>

<style>
	.statement-fold {
		min-height: 100vh;
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
		background: var(--color-ground);
		border-bottom: 1px solid var(--color-hairline);
		padding-block: clamp(5rem, 10vw, 8rem);
	}

	/* Outlined index numeral with transparent fill */
	.index-numeral {
		position: absolute;
		top: 10%;
		left: var(--page-margin);
		font-family: var(--font-display);
		font-size: clamp(140px, 24vw, 360px);
		font-weight: 800;
		line-height: 0.8;
		color: transparent;
		-webkit-text-stroke: 1px var(--color-hairline);
		pointer-events: none;
		user-select: none;
		z-index: 1;
	}

	/* Floating circular image on the right edge */
	.floating-circle-wrapper {
		position: absolute;
		right: -10vw;
		top: 50%;
		margin-top: -24vw;
		width: clamp(320px, 48vw, 680px);
		height: clamp(320px, 48vw, 680px);
		pointer-events: none;
		z-index: 2;
		will-change: transform;
		transition: transform 0.1s linear;
	}

	.circular-crop {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
		opacity: 0.35;
		border: 1px solid var(--color-hairline);
		background: var(--color-secondary-ground);
	}

	.dial-texture {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		filter: contrast(1.15);
	}

	.statement-content {
		position: relative;
		z-index: 5;
		max-width: 1100px;
	}

	.statement-label {
		display: block;
		margin-bottom: 2.5rem;
		color: var(--color-muted);
	}

	.statement-text {
		font-family: var(--font-display);
		font-size: clamp(24px, 3.6vw, 52px);
		font-weight: 700;
		line-height: 1.25;
		letter-spacing: -0.025em;
		color: var(--color-ink);
		max-width: 23ch;
		margin-bottom: 3.5rem;
	}

	.statement-footer {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.technical-note {
		color: var(--color-muted);
		white-space: nowrap;
	}

	.hairline-divider {
		flex: 1;
		height: 1px;
		background: var(--color-hairline);
	}

	@media (max-width: 768px) {
		.floating-circle-wrapper {
			right: -25vw;
			width: 75vw;
			height: 75vw;
			margin-top: -37.5vw;
			opacity: 0.22;
		}

		.statement-text {
			max-width: 100%;
		}

		.technical-note {
			white-space: normal;
		}
	}
</style>
