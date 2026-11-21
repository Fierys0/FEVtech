<script>
	import { reveal } from '$lib/actions/animate.js';
	import SectionHeader from './SectionHeader.svelte';

	const features = [
		{
			title: 'Swiss Automatic Movement',
			description:
				'Every VTECH houses a certified Swiss automatic movement, beating at 28,800 vibrations per hour for unparalleled accuracy that keeps pace with your life.',
			imagePosition: '45% 35%',
			imageScale: 1.6
		},
		{
			title: 'Sapphire Crystal Glass',
			description:
				'Scratch-resistant sapphire crystal protects each dial, ensuring clarity and brilliance that endures for generations to come.',
			imagePosition: '50% 25%',
			imageScale: 2.2
		},
		{
			title: 'Water Resistant to 200 Metres',
			description:
				'From the boardroom to the deep blue, crafted to withstand the elements without compromise. Every case is pressure-tested to twice its rated depth.',
			imagePosition: '65% 60%',
			imageScale: 1.4
		}
	];
</script>

<section class="features" id="features">
	<div class="container">
		<SectionHeader
			title="Crafted without<br>compromise"
			actionText="All features"
			actionHref="#features"
		/>

		<div class="feature-list">
			{#each features as feature, i}
				<div class="feature-row" class:reversed={i % 2 === 1}>
					<div
						class="feature-image-wrapper"
						use:reveal={{ x: i % 2 === 0 ? -40 : 40, y: 0, delay: 100 }}
					>
						<div class="feature-image-frame">
							<img
								src="/watch-hero.jpg"
								alt="VTECH watch detail — {feature.title}"
								class="feature-image"
								loading="lazy"
								style="object-position: {feature.imagePosition}; transform: scale({feature.imageScale});"
							/>
						</div>
					</div>
					<div class="feature-content" use:reveal={{ delay: 250 }}>
						<span class="feature-number">{String(i + 1).padStart(2, '0')}</span>
						<h3 class="feature-title">{feature.title}</h3>
						<p class="feature-description">{feature.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.features {
		background-color: var(--color-alt-ground);
		padding-top: var(--band-top);
		padding-bottom: var(--band-bottom);
	}

	.feature-list {
		display: flex;
		flex-direction: column;
		gap: 5rem;
	}

	.feature-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}

	.feature-row.reversed {
		direction: rtl;
	}

	.feature-row.reversed > * {
		direction: ltr;
	}

	/* ── Image ── */
	.feature-image-wrapper {
		width: 100%;
	}

	.feature-image-frame {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: var(--surface-corner);
		overflow: hidden;
		background: #ffffff;
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.03),
			0 8px 32px -8px rgba(0, 0, 0, 0.08);
	}

	.feature-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: scale 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.feature-image-frame:hover .feature-image {
		scale: 1.04;
	}

	/* ── Content ── */
	.feature-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.feature-number {
		font-family: var(--font-display);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: var(--color-gold);
		margin-bottom: 1.25rem;
	}

	.feature-title {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 2.2vw, 1.875rem);
		font-weight: 500;
		line-height: 1.2;
		letter-spacing: -0.01em;
		color: var(--color-primary);
		margin-bottom: 1rem;
	}

	.feature-description {
		font-family: var(--font-body);
		font-size: var(--size-body-lg);
		line-height: 1.7;
		color: var(--color-secondary);
		max-width: 440px;
	}

	/* ── Responsive ── */
	@media (max-width: 1024px) {
		.feature-row {
			gap: 2.5rem;
		}
	}

	@media (max-width: 768px) {
		.feature-row,
		.feature-row.reversed {
			grid-template-columns: 1fr;
			gap: 1.5rem;
			direction: ltr;
		}

		.feature-list {
			gap: 3.5rem;
		}

		.feature-image-frame {
			aspect-ratio: 16 / 10;
		}
	}
</style>
