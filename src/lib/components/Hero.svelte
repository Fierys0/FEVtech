<script>
	import { parallax } from '$lib/actions/animate.js';

	const metrics = [
		{ value: '1987', label: 'Established' },
		{ value: '147', label: 'Master Artisans' },
		{ value: '50+', label: 'Countries' }
	];
</script>

<section class="hero" id="hero">
	<div class="hero-inner container">
		<div class="hero-text">
			<h1 class="hero-heading">
				Where time<br />becomes art
			</h1>
			<div class="hero-gold-line" aria-hidden="true"></div>
			<p class="hero-body">
				Each VTECH timepiece is a masterwork of Swiss engineering and artisanal
				craft. Designed for those who understand that true luxury lies in the
				details.
			</p>
			<div class="hero-actions">
				<a href="#pricing" class="btn-primary">Explore Collection</a>
				<a href="#process" class="btn-secondary">Our Story</a>
			</div>
			<p class="hero-trust">Free worldwide shipping · 5-year warranty</p>
			<div class="hero-metrics">
				{#each metrics as metric, i}
					{#if i > 0}
						<span class="metric-divider" aria-hidden="true"></span>
					{/if}
					<div class="metric">
						<span class="metric-value">{metric.value}</span>
						<span class="metric-label">{metric.label}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="hero-image-col" use:parallax={0.06}>
			<div class="hero-image-wrapper">
				<div class="hero-glow" aria-hidden="true"></div>
				<img
					src="/watch-hero.jpg"
					alt="VTECH Meridian Chronograph — gold and silver two-tone bracelet with black dial, moonphase complication and three sub-dials"
					class="hero-image"
					width="800"
					height="800"
					loading="eager"
					fetchpriority="high"
				/>
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
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: center;
	}

	/* ── Staggered Entrance ── */
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

	@keyframes lineGrow {
		from {
			width: 0;
			opacity: 0;
		}
		to {
			width: 60px;
			opacity: 1;
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
		font-size: var(--size-display);
		font-weight: var(--weight-display);
		line-height: 1.08;
		letter-spacing: -0.025em;
		color: var(--color-primary);
		margin-bottom: 0;
		animation: fadeSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
	}

	.hero-gold-line {
		width: 60px;
		height: 2px;
		background: linear-gradient(90deg, var(--color-gold), transparent);
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		animation: lineGrow 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both;
	}

	.hero-body {
		font-family: var(--font-body);
		font-size: var(--size-body-lg);
		line-height: 1.7;
		color: var(--color-secondary);
		max-width: 440px;
		margin-bottom: 2rem;
		animation: fadeSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.875rem;
		margin-bottom: 1rem;
		animation: fadeSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 0.9375rem;
		font-weight: 500;
		padding: 0.8125rem 2rem;
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

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 0.9375rem;
		font-weight: 500;
		padding: 0.8125rem 2rem;
		background: transparent;
		color: var(--color-primary);
		border: 1px solid var(--color-hairline);
		border-radius: var(--control-corner);
		text-decoration: none;
		transition: border-color 0.2s ease, transform 0.2s ease;
	}

	.btn-secondary:hover {
		border-color: var(--color-primary);
		transform: scale(1.03);
	}

	.hero-trust {
		font-family: var(--font-body);
		font-size: 0.875rem;
		font-style: italic;
		color: var(--color-muted);
		margin-bottom: 2.5rem;
		animation: fadeSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
	}

	/* ── Metrics ── */
	.hero-metrics {
		display: flex;
		align-items: center;
		gap: 1.75rem;
		animation: fadeSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.75s both;
	}

	.metric {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.metric-value {
		font-family: var(--font-display);
		font-size: 1.75rem;
		font-weight: 600;
		color: var(--color-primary);
		line-height: 1.1;
		letter-spacing: -0.01em;
	}

	.metric-label {
		font-family: var(--font-display);
		font-size: 0.6875rem;
		font-weight: 500;
		color: var(--color-muted);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.metric-divider {
		width: 1px;
		height: 2.5rem;
		background-color: var(--color-hairline);
		flex-shrink: 0;
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
		max-width: 560px;
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
		background: #ffffff;
		box-shadow:
			0 4px 8px rgba(0, 0, 0, 0.04),
			0 16px 48px -8px rgba(0, 0, 0, 0.08),
			0 32px 80px -16px rgba(0, 0, 0, 0.06);
		object-fit: contain;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-image:hover {
		transform: scale(1.02);
	}

	/* ── Responsive ── */
	@media (max-width: 1024px) {
		.hero-inner {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.hero-text {
			order: 1;
		}

		.hero-image-col {
			order: 2;
		}

		.hero-image-wrapper {
			max-width: 420px;
			margin: 0 auto;
		}
	}

	@media (max-width: 640px) {
		.hero-heading {
			font-size: clamp(2.75rem, 10vw, 3.5rem);
		}

		.hero-metrics {
			flex-wrap: wrap;
			gap: 1.25rem;
		}

		.metric-divider {
			display: none;
		}

		.metric {
			min-width: calc(50% - 1rem);
		}

		.hero-image {
			padding: 1rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-heading,
		.hero-body,
		.hero-actions,
		.hero-trust,
		.hero-metrics,
		.hero-image-wrapper,
		.hero-gold-line {
			animation: none;
			opacity: 1;
		}
	}
</style>
