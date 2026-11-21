<script>
	import { reveal } from '$lib/actions/animate.js';

	const logos = ['GQ', 'ESQUIRE', 'ROBB REPORT', 'HODINKEE', 'FORBES', 'VOGUE'];
</script>

<section class="logo-cloud" id="logos">
	<div class="container">
		<p class="cloud-caption" use:reveal={{ y: 15 }}>As featured in</p>
		<div class="logo-row" role="list" aria-label="Featured publications">
			{#each logos as logo, i}
				<span class="logo-mark" role="listitem" use:reveal={{ delay: 100 + i * 80, y: 15 }}>
					{logo}
				</span>
			{/each}
		</div>
	</div>
</section>

<style>
	.logo-cloud {
		background-color: var(--color-ground);
		padding-top: var(--band-top);
		padding-bottom: var(--band-bottom);
	}

	.cloud-caption {
		font-family: var(--font-body);
		font-size: 0.875rem;
		font-style: italic;
		color: var(--color-muted);
		text-align: center;
		margin-bottom: 2.5rem;
		letter-spacing: 0.02em;
	}

	.logo-row {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 3rem 4rem;
	}

	.logo-mark {
		font-family: var(--font-display);
		font-size: 1.125rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		color: var(--color-muted);
		opacity: 0.55;
		text-transform: uppercase;
		transition: opacity 0.3s ease, transform 0.3s ease;
		user-select: none;
		white-space: nowrap;
	}

	.logo-mark:hover {
		opacity: 0.9;
		transform: scale(1.05);
	}

	@media (max-width: 640px) {
		.logo-row {
			gap: 2rem 2.5rem;
		}

		.logo-mark {
			font-size: 0.875rem;
		}
	}
</style>
