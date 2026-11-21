<script>
	import { reveal } from '$lib/actions/animate.js';
	import SectionHeader from './SectionHeader.svelte';

	const steps = [
		{
			number: '01',
			title: 'Design',
			description:
				'Every timepiece begins as a hand-drawn sketch, refined over months until every proportion achieves visual harmony.'
		},
		{
			number: '02',
			title: 'Engineer',
			description:
				'Our master watchmakers assemble over 200 components with micrometer precision, testing each mechanism to Swiss chronometer standards.'
		},
		{
			number: '03',
			title: 'Finish',
			description:
				'Every surface is hand-polished, every edge chamfered, every detail inspected under 10× magnification before it earns the VTECH name.'
		}
	];
</script>

<section class="process" id="process">
	<div class="container">
		<SectionHeader
			title="Three generations<br>of mastery"
			actionText="Learn more"
			actionHref="#process"
		/>

		<div class="steps">
			{#each steps as step, i}
				<div class="step" use:reveal={{ delay: i * 180, y: 30 }}>
					<div class="step-indicator">
						<span class="step-number">{step.number}</span>
						{#if i < steps.length - 1}
							<span class="step-line" aria-hidden="true"></span>
						{/if}
					</div>
					<div class="step-content">
						<h3 class="step-title">{step.title}</h3>
						<p class="step-description">{step.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.process {
		background-color: var(--color-ground);
		padding-top: var(--band-top);
		padding-bottom: var(--band-bottom);
	}

	.steps {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0;
	}

	.step {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		position: relative;
	}

	/* ── Indicator ── */
	.step-indicator {
		display: flex;
		align-items: center;
		width: 100%;
		margin-bottom: 2rem;
		position: relative;
	}

	.step-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.25rem;
		height: 3.25rem;
		border-radius: 50%;
		background-color: var(--color-primary);
		color: var(--color-inverse-text);
		font-family: var(--font-display);
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		flex-shrink: 0;
		position: relative;
		z-index: 1;
		transition: background-color 0.3s ease, transform 0.3s ease;
	}

	.step:hover .step-number {
		background-color: var(--color-accent);
		transform: scale(1.08);
	}

	.step-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, var(--color-hairline) 0%, var(--color-hairline) 50%, transparent 100%);
		margin-left: 0;
	}

	/* ── Content ── */
	.step-content {
		padding-right: 3rem;
	}

	.step-title {
		font-family: var(--font-display);
		font-size: 1.375rem;
		font-weight: 500;
		line-height: 1.2;
		color: var(--color-primary);
		margin-bottom: 0.75rem;
		letter-spacing: -0.01em;
	}

	.step-description {
		font-family: var(--font-body);
		font-size: var(--size-body);
		line-height: 1.65;
		color: var(--color-secondary);
	}

	/* ── Responsive ── */
	@media (max-width: 768px) {
		.steps {
			grid-template-columns: 1fr;
			gap: 0;
		}

		.step {
			display: grid;
			grid-template-columns: auto 1fr;
			gap: 1.25rem;
			padding-bottom: 2.5rem;
		}

		.step:last-child {
			padding-bottom: 0;
		}

		.step-indicator {
			flex-direction: column;
			width: auto;
			margin-bottom: 0;
			align-self: stretch;
		}

		.step-line {
			width: 1px;
			height: 100%;
			flex: 1;
			margin-left: 0;
			margin-top: 0;
			position: absolute;
			left: 50%;
			top: 3.25rem;
			transform: translateX(-50%);
			background: linear-gradient(180deg, var(--color-hairline) 0%, transparent 100%);
		}

		.step-content {
			padding-right: 0;
			padding-top: 0.25rem;
		}
	}
</style>
