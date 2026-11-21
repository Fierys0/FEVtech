<script>
	import { slide } from 'svelte/transition';
	import { reveal } from '$lib/actions/animate.js';
	import SectionHeader from './SectionHeader.svelte';

	const faqs = [
		{
			question: 'What movement powers VTECH watches?',
			answer:
				'All VTECH timepieces are powered by Swiss automatic movements sourced from leading manufacturers including ETA and Sellita. Our Limited Edition pieces feature in-house manufacture movements developed by our own atelier in Le Locle, Switzerland.'
		},
		{
			question: 'How long does shipping take?',
			answer:
				'We offer complimentary worldwide shipping via insured express courier. Most orders arrive within 3–5 business days. Each watch ships in our signature presentation case with a certificate of authenticity.'
		},
		{
			question: 'What is your warranty policy?',
			answer:
				'The Classic Collection carries a 3-year international warranty. The Chronograph Series offers 5 years. Limited Edition pieces are covered for life. All warranties cover manufacturing defects and movement servicing at our certified service centres.'
		},
		{
			question: 'Can I try before I buy?',
			answer:
				"We offer a 30-day wear trial. If your timepiece doesn't meet your expectations, return it in its original condition for a full refund. We'll even cover the return shipping."
		},
		{
			question: 'How should I care for my VTECH?',
			answer:
				'We recommend a full service every 4–5 years to maintain optimal accuracy. Wipe your watch with a soft cloth after exposure to salt water or perspiration. Avoid exposing leather straps to water. Our concierge team can arrange servicing at any time.'
		},
		{
			question: 'Do you offer engraving?',
			answer:
				'Complimentary caseback engraving is available on all models. Limited Edition pieces include a numbered plaque and the option for personal engraving on the deployment clasp. Contact our atelier to discuss bespoke requests.'
		}
	];

	let openItems = $state(new Set());

	function toggle(index) {
		const next = new Set(openItems);
		if (next.has(index)) {
			next.delete(index);
		} else {
			next.add(index);
		}
		openItems = next;
	}
</script>

<section class="faq" id="faq">
	<div class="container">
		<SectionHeader
			title="Questions our<br>collectors ask"
			actionText="Contact us"
			actionHref="#footer"
		/>

		<div class="faq-list" role="list">
			{#each faqs as faq, i}
				<div class="faq-item" role="listitem" use:reveal={{ delay: i * 60, y: 15 }}>
					<button
						class="faq-trigger"
						aria-expanded={openItems.has(i)}
						onclick={() => toggle(i)}
					>
						<span class="faq-question">{faq.question}</span>
						<span class="faq-icon" class:open={openItems.has(i)} aria-hidden="true">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path
									d="M5 8L10 13L15 8"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</span>
					</button>
					{#if openItems.has(i)}
						<div class="faq-answer-wrapper" transition:slide={{ duration: 280 }}>
							<p class="faq-answer">{faq.answer}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.faq {
		background-color: var(--color-alt-ground);
		padding-top: var(--band-top);
		padding-bottom: var(--band-bottom);
	}

	.faq-list {
		max-width: 48rem;
	}

	.faq-item {
		border-bottom: 1px solid var(--color-hairline);
	}

	.faq-item:first-child {
		border-top: 1px solid var(--color-hairline);
	}

	/* ── Trigger ── */
	.faq-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		width: 100%;
		padding: 1.5rem 0;
		text-align: left;
		cursor: pointer;
		background: none;
		border: none;
		font-family: var(--font-display);
		font-size: 1.0625rem;
		font-weight: 500;
		color: var(--color-primary);
		line-height: 1.4;
		transition: color 0.2s ease;
	}

	.faq-trigger:hover {
		color: var(--color-accent);
	}

	.faq-question {
		flex: 1;
	}

	.faq-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 1.75rem;
		height: 1.75rem;
		color: var(--color-muted);
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.faq-icon.open {
		transform: rotate(180deg);
	}

	/* ── Answer ── */
	.faq-answer-wrapper {
		overflow: hidden;
	}

	.faq-answer {
		font-family: var(--font-body);
		font-size: var(--size-body);
		line-height: 1.7;
		color: var(--color-secondary);
		padding-bottom: 1.5rem;
		max-width: 40rem;
	}
</style>
