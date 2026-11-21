<script>
	import { reveal } from '$lib/actions/animate.js';
</script>

<section class="appointment" id="appointment">
	<div class="container">
		<div class="appointment-card" use:reveal={{ y: 30, scale: 0.98 }}>
			<h2 class="appointment-heading">Schedule Your<br />Private Viewing</h2>
			<p class="appointment-body">
				Visit our atelier and discover the VTECH collection with a personal horologist.
			</p>
			<a href="#footer" class="appointment-cta">Book an Appointment</a>
			<p class="appointment-hours">Mon–Sat 10AM–7PM · By appointment only</p>
		</div>
	</div>
</section>

<style>
	.appointment {
		background-color: var(--color-ground);
		padding-top: var(--band-top);
		padding-bottom: var(--band-bottom);
	}

	.appointment-card {
		background: var(--appointment-card-bg);
		border: var(--appointment-card-border);
		box-shadow: var(--appointment-card-glow);
		border-radius: var(--surface-corner);
		padding: clamp(3rem, 6vw, 5rem) clamp(2rem, 4vw, 4rem);
		text-align: center;
		max-width: 720px;
		margin: 0 auto;
		transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
	}

	.appointment-heading {
		font-family: var(--font-display);
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: var(--weight-display);
		line-height: 1.15;
		letter-spacing: -0.015em;
		color: #fcfcfd;
		margin-bottom: 1.25rem;
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

	@keyframes shimmer {
		0% {
			background-position: 200% center;
		}
		100% {
			background-position: -200% center;
		}
	}

	.appointment-body {
		font-family: var(--font-body);
		font-size: var(--size-body-lg);
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.7);
		max-width: 440px;
		margin: 0 auto 2rem;
	}

	.appointment-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 0.9375rem;
		font-weight: 500;
		padding: 0.9375rem 2.5rem;
		background-color: #fcfcfd;
		color: #0b0b0c;
		border-radius: var(--control-corner);
		text-decoration: none;
		transition: transform 0.25s ease, box-shadow 0.25s ease;
		margin-bottom: 1.5rem;
	}

	.appointment-cta:hover {
		transform: scale(1.03);
		box-shadow: 0 0 32px rgba(252, 252, 253, 0.25);
	}

	.appointment-hours {
		font-family: var(--font-body);
		font-size: 0.875rem;
		font-style: italic;
		color: rgba(255, 255, 255, 0.4);
	}

	@media (prefers-reduced-motion: reduce) {
		.appointment-heading {
			animation: none;
			-webkit-text-fill-color: var(--color-inverse-text);
			background: none;
		}
	}
</style>
