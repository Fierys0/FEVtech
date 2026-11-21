<script>
	import { parallax } from '$lib/actions/animate.js';
</script>

<section class="hero" id="hero">
	<div class="hero-inner container">
		<div class="hero-image-col" use:parallax={0.06}>
			<div class="hero-image-wrapper">
				<div class="hero-glow" aria-hidden="true"></div>
				<img
					src="/watch-hero.jpg"
					alt="VTECH luxury timepiece — precision Swiss craftsmanship"
					class="hero-image"
					width="800"
					height="800"
					loading="eager"
					fetchpriority="high"
				/>
			</div>
		</div>

		<div class="hero-text">
			<h1 class="hero-heading">
				Where <strong>time</strong><br />becomes <strong>art</strong>
			</h1>
			<div class="hero-actions">
				<a href="#appointment" class="btn-primary">Book an Appointment</a>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		background-color: var(--color-alt-ground);
		padding-top: var(--band-top);
		padding-bottom: var(--band-bottom);
		overflow: hidden;
	}

	.hero-inner {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 3rem;
		align-items: center;
	}

	/* ── Entrance Animations ── */
	@keyframes fadeSlideUp {
		from {
			opacity: 0;
			transform: translateY(28px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes imageReveal {
		from {
			opacity: 0;
			transform: scale(1.04);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* ── Text Column ── */
	.hero-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.hero-heading {
		font-family: var(--font-display);
		font-size: clamp(4rem, 7vw, 6.5rem);
		font-weight: var(--weight-display);
		line-height: 1.05;
		letter-spacing: -0.03em;
		color: var(--color-primary);
		margin-bottom: 2.5rem;
		animation: fadeSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
	}

	.hero-heading :global(strong) {
		font-weight: 700;
		color: var(--color-gold);
	}

	.hero-actions {
		animation: fadeSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 500;
		padding: 1rem 2.5rem;
		background-color: var(--color-action-fill);
		color: var(--color-action-label);
		border-radius: var(--control-corner);
		text-decoration: none;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.btn-primary:hover {
		transform: scale(1.03);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
	}

	/* ── Image Column ── */
	.hero-image-col {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-image-wrapper {
		position: relative;
		width: 100%;
		max-width: 440px;
		border-radius: 20px;
		overflow: visible;
		animation: imageReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
	}

	.hero-glow {
		position: absolute;
		inset: -15%;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			var(--color-gold-light) 0%,
			rgba(201, 168, 76, 0.04) 50%,
			transparent 70%
		);
		filter: blur(40px);
		z-index: 0;
		pointer-events: none;
	}

	.hero-image {
		position: relative;
		z-index: 1;
		width: 100%;
		height: auto;
		display: block;
		padding: 1.5rem;
		border-radius: 20px;
		background: var(--color-card-bg);
		border: 1px solid var(--color-hairline);
		box-shadow: var(--color-card-shadow);
		object-fit: contain;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease;
	}

	.hero-image:hover {
		transform: scale(1.02);
	}

	/* ── Responsive ── */
	@media (max-width: 1024px) {
		.hero-inner {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.hero-image-col {
			order: 1;
		}

		.hero-text {
			order: 2;
		}

		.hero-image-wrapper {
			max-width: 320px;
			margin: 0 auto;
		}

		.hero-heading {
			font-size: clamp(3rem, 10vw, 4.5rem);
		}
	}

	@media (max-width: 640px) {
		.hero-heading {
			font-size: clamp(2.5rem, 10vw, 3.5rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-heading,
		.hero-actions,
		.hero-image-wrapper {
			animation: none;
			opacity: 1;
		}
	}
</style>
