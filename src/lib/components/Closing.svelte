<script>
	import { reveal } from '$lib/actions/animate.js';
</script>

<section class="closing" use:reveal={{ y: 0, scale: 0.98 }}>
	<div class="closing-inner container">
		<h2 class="closing-heading">Find your signature timepiece</h2>
		<div class="closing-actions">
			<a href="#appointment" class="btn-primary">Book an Appointment</a>
			<a href="#footer" class="btn-secondary">Book a Consultation</a>
		</div>
	</div>
</section>

<style>
	.closing {
		background: radial-gradient(ellipse at 50% 50%, #1e1d1e 0%, #0d0c0e 70%);
		padding-top: var(--band-top);
		padding-bottom: var(--band-bottom);
		overflow: hidden;
		position: relative;
	}

	.closing-inner {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 2rem 3rem;
		position: relative;
		z-index: 1;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% center;
		}
		100% {
			background-position: -200% center;
		}
	}

	.closing-heading {
		font-family: var(--font-display);
		font-size: clamp(1.75rem, 3vw, 2.5rem);
		font-weight: var(--weight-display);
		letter-spacing: -0.01em;
		line-height: 1.15;
		text-align: center;
		background: linear-gradient(
			120deg,
			rgba(252, 252, 253, 1) 0%,
			rgba(252, 252, 253, 1) 35%,
			var(--color-gold) 50%,
			rgba(252, 252, 253, 1) 65%,
			rgba(252, 252, 253, 1) 100%
		);
		background-size: 250% auto;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: shimmer 5s ease-in-out infinite;
	}

	.closing-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.875rem;
		align-items: center;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 0.9375rem;
		font-weight: 500;
		padding: 0.8125rem 2rem;
		background-color: #fcfcfd;
		color: #0b0b0c;
		border-radius: var(--control-corner);
		text-decoration: none;
		transition: transform 0.25s ease, box-shadow 0.25s ease;
	}

	.btn-primary:hover {
		transform: scale(1.03);
		box-shadow: 0 0 32px rgba(252, 252, 253, 0.25);
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
		color: #fcfcfd;
		border: 1px solid rgba(255, 255, 255, 0.25);
		border-radius: var(--control-corner);
		text-decoration: none;
		transition: border-color 0.25s ease, transform 0.25s ease;
	}

	.btn-secondary:hover {
		border-color: rgba(255, 255, 255, 0.6);
		transform: scale(1.03);
	}

	@media (max-width: 640px) {
		.closing-inner {
			flex-direction: column;
			text-align: center;
		}

		.closing-actions {
			justify-content: center;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.closing-heading {
			animation: none;
			-webkit-text-fill-color: var(--color-inverse-text);
			background: none;
		}
	}
</style>
