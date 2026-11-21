<script>
	import { reveal } from '$lib/actions/animate.js';
	import SectionHeader from './SectionHeader.svelte';

	const testimonials = [
		{
			quote:
				'The Meridian Chronograph is, without question, the most beautifully finished watch I\'ve owned under ten thousand dollars. VTECH has quietly become one of the most compelling names in modern horology.',
			name: 'James Whitfield',
			role: 'Watch Collector',
			initials: 'JW',
			featured: true
		},
		{
			quote:
				"I've worn my VTECH daily for three years. The movement keeps better time than watches costing five times as much.",
			name: 'Sarah Chen',
			role: 'Architect',
			initials: 'SC',
			featured: false
		},
		{
			quote:
				'The attention to detail is extraordinary. The brushed and polished finishing on the bracelet alone would justify the price.',
			name: 'Marcus Rivera',
			role: 'Designer',
			initials: 'MR',
			featured: false
		}
	];

	const featured = testimonials.find((t) => t.featured);
	const supporting = testimonials.filter((t) => !t.featured);
</script>

<section class="testimonials" id="testimonials">
	<div class="container">
		<SectionHeader
			title="Words from<br>our collectors"
			actionText="More reviews"
			actionHref="#testimonials"
		/>

		<div class="testimonial-grid">
			{#if featured}
				<blockquote class="testimonial-featured" use:reveal={{ scale: 0.98, y: 20 }}>
					<div class="quote-mark" aria-hidden="true">"</div>
					<p class="quote-text-featured">{featured.quote}</p>
					<footer class="quote-attribution">
						<div class="avatar" aria-hidden="true">
							{featured.initials}
						</div>
						<div class="attribution-text">
							<cite class="quote-name">{featured.name}</cite>
							<span class="quote-role">{featured.role}</span>
						</div>
					</footer>
				</blockquote>
			{/if}

			<div class="supporting-quotes">
				{#each supporting as testimonial, i}
					<blockquote class="testimonial-card" use:reveal={{ delay: 150 + i * 120 }}>
						<p class="quote-text">{testimonial.quote}</p>
						<footer class="quote-attribution">
							<div class="avatar avatar-sm" aria-hidden="true">
								{testimonial.initials}
							</div>
							<div class="attribution-text">
								<cite class="quote-name">{testimonial.name}</cite>
								<span class="quote-role">{testimonial.role}</span>
							</div>
						</footer>
					</blockquote>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.testimonials {
		background-color: var(--color-alt-ground);
		padding-top: var(--band-top);
		padding-bottom: var(--band-bottom);
	}

	.testimonial-grid {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	/* ── Featured Quote ── */
	.testimonial-featured {
		background: var(--color-ground);
		border-radius: var(--surface-corner);
		padding: 3rem 3.5rem;
		position: relative;
		transition: box-shadow 0.4s ease;
	}

	.testimonial-featured:hover {
		box-shadow: 0 12px 48px -12px rgba(0, 0, 0, 0.06);
	}

	.quote-mark {
		font-family: var(--font-body);
		font-size: 6rem;
		line-height: 0.8;
		color: var(--color-gold);
		opacity: 0.25;
		position: absolute;
		top: 1.5rem;
		left: 2.5rem;
		user-select: none;
	}

	.quote-text-featured {
		font-family: var(--font-body);
		font-size: clamp(1.25rem, 1.8vw, 1.5rem);
		font-style: italic;
		line-height: 1.65;
		color: var(--color-primary);
		margin-bottom: 2rem;
		position: relative;
		max-width: 48rem;
	}

	/* ── Supporting Quotes ── */
	.supporting-quotes {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	.testimonial-card {
		background: var(--color-ground);
		border-radius: var(--surface-corner);
		padding: 2rem 2.25rem;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.testimonial-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.06);
	}

	.quote-text {
		font-family: var(--font-body);
		font-size: var(--size-body);
		font-style: italic;
		line-height: 1.65;
		color: var(--color-secondary);
		margin-bottom: 1.5rem;
	}

	/* ── Attribution ── */
	.quote-attribution {
		display: flex;
		align-items: center;
		gap: 0.875rem;
	}

	.avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		background-color: var(--color-alt-ground);
		color: var(--color-secondary);
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		flex-shrink: 0;
	}

	.avatar-sm {
		width: 2.25rem;
		height: 2.25rem;
		font-size: 0.6875rem;
	}

	.attribution-text {
		display: flex;
		flex-direction: column;
	}

	.quote-name {
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 500;
		font-style: normal;
		color: var(--color-primary);
		line-height: 1.3;
	}

	.quote-role {
		font-family: var(--font-body);
		font-size: 0.8125rem;
		color: var(--color-muted);
	}

	/* ── Responsive ── */
	@media (max-width: 768px) {
		.testimonial-featured {
			padding: 2rem 1.75rem;
		}

		.quote-mark {
			font-size: 4rem;
			top: 1rem;
			left: 1.25rem;
		}

		.supporting-quotes {
			grid-template-columns: 1fr;
		}
	}
</style>
