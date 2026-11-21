<script>
	import { reveal } from '$lib/actions/animate.js';
	import SectionHeader from './SectionHeader.svelte';

	const plans = [
		{
			name: 'Classic',
			price: '2,400',
			description: 'The essential VTECH. Timeless design, uncompromising quality.',
			features: [
				'Automatic movement',
				'Sapphire crystal',
				'100M water resistance',
				'Italian leather strap',
				'3-year warranty'
			],
			cta: 'Book an Appointment',
			recommended: false
		},
		{
			name: 'Chronograph',
			price: '4,800',
			description: 'For those who demand more from every moment.',
			features: [
				'Chronograph complication',
				'Sapphire crystal',
				'200M water resistance',
				'Steel bracelet',
				'5-year warranty',
				'Moonphase display'
			],
			cta: 'Book an Appointment',
			recommended: true
		},
		{
			name: 'Limited Edition',
			price: '12,000',
			description: 'Numbered pieces for the true connoisseur.',
			features: [
				'Manufacture movement',
				'Sapphire crystal',
				'200M water resistance',
				'18K gold accents',
				'Lifetime warranty',
				'Numbered edition',
				'Personal engraving'
			],
			cta: 'Request Private Viewing',
			recommended: false
		}
	];
</script>

<section class="pricing" id="pricing">
	<div class="container">
		<SectionHeader
			title="Find your<br>collection"
			actionText="Compare all"
			actionHref="#pricing"
		/>

		<div class="pricing-grid">
			{#each plans as plan, i}
				<div
					class="pricing-card"
					class:recommended={plan.recommended}
					use:reveal={{ delay: i * 150, y: 35 }}
				>
					{#if plan.recommended}
						<span class="recommended-badge">Recommended</span>
					{/if}
					<div class="card-header">
						<h3 class="plan-name">{plan.name}</h3>
						<p class="plan-price">
							<span class="price-from">Starting from</span>
							<span class="price-amount">${plan.price}</span>
						</p>
						<p class="plan-description">{plan.description}</p>
					</div>
					<ul class="plan-features">
						{#each plan.features as feature}
							<li class="plan-feature">
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									aria-hidden="true"
								>
									<path
										d="M3.5 8.5L6.5 11.5L12.5 4.5"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								{feature}
							</li>
						{/each}
					</ul>
					<a
						href="#footer"
						class="plan-cta"
						class:plan-cta-primary={plan.recommended}
					>
						{plan.cta}
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.pricing {
		background-color: var(--color-ground);
		padding-top: var(--band-top);
		padding-bottom: var(--band-bottom);
	}

	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		align-items: start;
	}

	/* ── Card ── */
	.pricing-card {
		display: flex;
		flex-direction: column;
		background: var(--color-surface);
		border-radius: var(--surface-corner);
		padding: 2.25rem 2rem;
		position: relative;
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
	}

	.pricing-card:hover {
		transform: translateY(-5px);
		box-shadow:
			0 8px 24px -8px rgba(0, 0, 0, 0.06),
			0 16px 48px -12px rgba(0, 0, 0, 0.08);
	}

	.pricing-card.recommended {
		background: var(--color-inverse-ground);
		color: var(--color-inverse-text);
		box-shadow:
			0 16px 48px -12px rgba(0, 0, 0, 0.25),
			0 0 0 1px rgba(201, 168, 76, 0.1);
	}

	.pricing-card.recommended:hover {
		transform: translateY(-6px);
		box-shadow:
			0 20px 56px -12px rgba(0, 0, 0, 0.3),
			0 0 0 1px rgba(201, 168, 76, 0.15);
	}

	.recommended-badge {
		display: inline-block;
		font-family: var(--font-display);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-gold);
		background: rgba(201, 168, 76, 0.1);
		padding: 0.375rem 0.875rem;
		border-radius: var(--control-corner);
		margin-bottom: 1.5rem;
		align-self: flex-start;
	}

	/* ── Header ── */
	.card-header {
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--color-hairline);
	}

	.recommended .card-header {
		border-bottom-color: rgba(255, 255, 255, 0.12);
	}

	.plan-name {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 500;
		margin-bottom: 0.75rem;
		letter-spacing: -0.01em;
	}

	.plan-price {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-bottom: 0.75rem;
	}

	.price-from {
		font-family: var(--font-body);
		font-size: 0.8125rem;
		color: var(--color-muted);
	}

	.recommended .price-from {
		color: rgba(255, 255, 255, 0.5);
	}

	.price-amount {
		font-family: var(--font-display);
		font-size: 2.25rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1;
	}

	.plan-description {
		font-family: var(--font-body);
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--color-secondary);
	}

	.recommended .plan-description {
		color: rgba(255, 255, 255, 0.6);
	}

	/* ── Features ── */
	.plan-features {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 2rem;
		flex: 1;
	}

	.plan-feature {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-family: var(--font-body);
		font-size: 0.9375rem;
		line-height: 1.4;
		color: var(--color-secondary);
	}

	.recommended .plan-feature {
		color: rgba(255, 255, 255, 0.75);
	}

	.plan-feature svg {
		flex-shrink: 0;
		color: var(--color-accent);
	}

	/* ── CTA ── */
	.plan-cta {
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 0.9375rem;
		font-weight: 500;
		padding: 0.8125rem 1.5rem;
		border-radius: var(--control-corner);
		text-decoration: none;
		transition: all 0.25s ease;
		border: 1px solid var(--color-hairline);
		color: var(--color-primary);
		background: transparent;
	}

	.plan-cta:hover {
		border-color: var(--color-primary);
		background: var(--color-ground);
		transform: scale(1.02);
	}

	.plan-cta-primary {
		background: var(--color-inverse-text);
		color: var(--color-inverse-ground);
		border-color: transparent;
	}

	.plan-cta-primary:hover {
		background: var(--color-inverse-text);
		box-shadow: 0 0 24px rgba(252, 252, 253, 0.2);
		transform: scale(1.02);
	}

	/* ── Responsive ── */
	@media (max-width: 1024px) {
		.pricing-grid {
			grid-template-columns: 1fr;
			max-width: 480px;
			margin: 0 auto;
		}

		.pricing-card.recommended {
			order: -1;
		}
	}

	@media (max-width: 640px) {
		.pricing-card {
			padding: 1.75rem 1.5rem;
		}
	}
</style>
