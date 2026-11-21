<script>
	import { reveal } from '$lib/actions/animate.js';
	/** @type {{ title: string, actionText?: string, actionHref?: string }} */
	let { title, actionText = '', actionHref = '#' } = $props();
</script>

<div class="section-header" use:reveal={{ y: 20 }}>
	<h2 class="section-title">{@html title}</h2>
	{#if actionText}
		<a href={actionHref} class="section-action">
			{actionText}
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
				<path
					d="M1 7h12m0 0L8 2.5M13 7l-5 4.5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</a>
	{/if}
</div>

<style>
	.section-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem;
		margin-bottom: 3.5rem;
	}

	.section-title {
		font-family: var(--font-display);
		font-size: var(--size-section-heading);
		font-weight: var(--weight-display);
		line-height: 1.15;
		color: var(--color-primary);
		letter-spacing: -0.015em;
		max-width: 55%;
	}

	.section-action {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-size: 0.8125rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		padding: 0.5rem 1.25rem;
		border: 1px solid var(--color-hairline);
		border-radius: var(--control-corner);
		color: var(--color-secondary);
		white-space: nowrap;
		transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
		flex-shrink: 0;
		margin-bottom: 0.25rem;
	}

	.section-action:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
		transform: translateX(2px);
	}

	.section-action svg {
		transition: transform 0.25s ease;
	}

	.section-action:hover svg {
		transform: translateX(3px);
	}

	@media (max-width: 640px) {
		.section-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
			margin-bottom: 2.5rem;
		}

		.section-title {
			max-width: 100%;
		}
	}
</style>
