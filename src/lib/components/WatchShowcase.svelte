<script>
	import { fade, scale } from 'svelte/transition';
	import { reveal } from '$lib/actions/animate.js';
	import SectionHeader from './SectionHeader.svelte';
	import WatchViewer from './WatchViewer.svelte';
	import { watches } from '$lib/data/watches.js';

	let activeIndex = $state(0);
	let expanded = $state(false);

	let currentWatch = $derived(watches[activeIndex]);

	function selectWatch(index) {
		activeIndex = index;
	}

	function nextWatch() {
		activeIndex = (activeIndex + 1) % watches.length;
	}

	function prevWatch() {
		activeIndex = (activeIndex - 1 + watches.length) % watches.length;
	}

	function open(index = activeIndex) {
		activeIndex = index;
		expanded = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function close() {
		expanded = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && expanded) close();
		if (expanded) {
			if (e.key === 'ArrowRight') nextWatch();
			if (e.key === 'ArrowLeft') prevWatch();
		}
	}}
/>

<section class="showcase" id="showcase">
	<div class="container">
		<SectionHeader
			title="The Watch<br>Collection"
			actionText="Book Private Viewing"
			actionHref="#appointment"
		/>

		<!-- Watch Switcher Tabs (Clean name without numbering) -->
		<div class="watch-tabs" use:reveal={{ y: 20 }}>
			{#each watches as watch, i}
				<button
					class="tab-btn"
					class:active={i === activeIndex}
					onclick={() => selectWatch(i)}
				>
					<span class="tab-name">{watch.name.replace('Vauthier ', '')}</span>
				</button>
			{/each}
		</div>

		<!-- Main 3D Showcase Stage -->
		<div class="showcase-stage-wrapper" use:reveal={{ y: 30, delay: 100 }}>
			<div class="showcase-stage">
				<!-- 3D Preview (Auto-rotating & Zoomed in) -->
				{#if !expanded}
					<div class="stage-viewer" onclick={() => open()}>
						<WatchViewer url={currentWatch.modelPath} interactive={false} />
					</div>
				{/if}

				<!-- Stage Overlays -->
				<div class="stage-top-bar">
					<span class="stage-badge">{currentWatch.edition}</span>
					<span class="stage-hint">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
						</svg>
						Interactive 3D · Click to Zoom & Inspect
					</span>
				</div>

				<!-- Navigation arrows on stage -->
				<button class="stage-arrow stage-arrow-left" onclick={prevWatch} aria-label="Previous watch">
					‹
				</button>
				<button class="stage-arrow stage-arrow-right" onclick={nextWatch} aria-label="Next watch">
					›
				</button>

				<div class="stage-bottom-bar">
					<div class="stage-info" onclick={() => open()}>
						<h3 class="stage-title">{currentWatch.name}</h3>
						<p class="stage-tagline">{currentWatch.tagline}</p>
					</div>
					<button class="stage-explore-btn" onclick={() => open()}>
						<span>Inspect in 3D</span>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M6 3l5 5-5 5" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- All 6 Watches Grid Overview -->
		<div class="collection-grid" use:reveal={{ y: 30, delay: 200 }}>
			{#each watches as watch, i}
				<div
					class="watch-card"
					class:selected={i === activeIndex}
					onclick={() => open(i)}
				>
					<div class="card-header">
						<span class="card-num">0{i + 1}</span>
						<span class="card-edition">{watch.edition}</span>
					</div>
					<h4 class="card-title">{watch.name}</h4>
					<p class="card-tagline">{watch.tagline}</p>
					<p class="card-desc">{watch.shortDesc}</p>
					<div class="card-footer">
						<span class="card-spec-highlight">
							{watch.specs[0].value} · {watch.specs[1].value}
						</span>
						<span class="card-action">View in 3D →</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Full 3D Inspection Modal -->
{#if expanded}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal-backdrop" transition:fade={{ duration: 250 }} onclick={close}>
		<div
			class="modal-content"
			onclick={(e) => e.stopPropagation()}
			transition:scale={{ duration: 250, start: 0.95 }}
		>
			<button class="modal-close" onclick={close} aria-label="Close modal">✕</button>

			<div class="modal-layout">
				<!-- Left: 3D Interactive Viewer -->
				<div class="modal-viewer-col">
					<div class="modal-viewer-canvas">
						<WatchViewer url={currentWatch.modelPath} interactive={true} />
					</div>
					<div class="viewer-instructions">
						<span>Drag to rotate</span>
						<span class="instruction-dot">·</span>
						<span>Scroll / pinch to zoom in/out</span>
					</div>
				</div>

				<!-- Right: Watch Details, Craft Story & Specs -->
				<div class="modal-details-col">
					<!-- Watch Switcher within Modal -->
					<div class="modal-nav">
						<button class="modal-nav-arrow" onclick={prevWatch} aria-label="Previous watch">
							‹
						</button>
						<span class="modal-counter">0{activeIndex + 1} / 0{watches.length}</span>
						<button class="modal-nav-arrow" onclick={nextWatch} aria-label="Next watch">
							›
						</button>
					</div>

					<span class="modal-badge">{currentWatch.edition}</span>
					<h2 class="modal-title">{currentWatch.name}</h2>
					<p class="modal-tagline">{currentWatch.tagline}</p>

					<div class="modal-block">
						<p class="modal-lead">{currentWatch.shortDesc}</p>
					</div>

					<div class="modal-block">
						<h3 class="modal-block-title">The Craft & Story</h3>
						<p class="modal-story">{currentWatch.story}</p>
					</div>

					<div class="modal-block">
						<h3 class="modal-block-title">Specifications</h3>
						<div class="specs-grid">
							{#each currentWatch.specs as spec}
								<div class="spec-item">
									<span class="spec-label">{spec.label}</span>
									<span class="spec-value">{spec.value}</span>
								</div>
							{/each}
						</div>
					</div>

					<div class="modal-actions">
						<a href="#appointment" class="btn-modal-primary" onclick={close}>
							Book an Appointment for this Watch
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.showcase {
		background-color: var(--color-ground);
		padding-top: var(--band-top);
		padding-bottom: var(--band-bottom);
		position: relative;
	}

	/* ── Watch Tabs ── */
	.watch-tabs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		overflow-x: auto;
		padding-bottom: 1rem;
		margin-bottom: 2rem;
		scrollbar-width: none;
	}

	.watch-tabs::-webkit-scrollbar {
		display: none;
	}

	.tab-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1.25rem;
		border-radius: var(--control-corner);
		background: var(--color-surface);
		border: 1px solid var(--color-hairline);
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-secondary);
		white-space: nowrap;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.tab-btn:hover {
		background: var(--color-alt-ground);
		color: var(--color-primary);
		border-color: var(--color-primary);
	}

	.tab-btn.active {
		background: var(--color-primary);
		color: var(--color-ground);
		border-color: var(--color-primary);
	}

	.tab-num {
		font-size: 0.75rem;
		opacity: 0.6;
	}

	.tab-btn.active .tab-num {
		color: var(--color-gold);
		opacity: 1;
	}

	/* ── Showcase Stage ── */
	.showcase-stage-wrapper {
		margin-bottom: 3rem;
	}

	.showcase-stage {
		position: relative;
		width: 100%;
		height: 540px;
		background: var(--stage-bg);
		border: 1px solid var(--color-hairline);
		border-radius: var(--surface-corner);
		overflow: hidden;
		box-shadow:
			0 12px 36px -10px rgba(0, 0, 0, 0.05),
			0 4px 12px -2px rgba(0, 0, 0, 0.03);
		transition: background 0.3s ease, border-color 0.3s ease;
	}

	.stage-viewer {
		position: absolute;
		inset: 0;
		cursor: pointer;
		z-index: 1;
	}

	.stage-top-bar {
		position: absolute;
		top: 1.5rem;
		left: 1.5rem;
		right: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		pointer-events: none;
		z-index: 2;
	}

	.stage-badge {
		font-family: var(--font-display);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-gold);
		background: var(--color-badge-bg);
		border: 1px solid var(--color-badge-border);
		padding: 0.375rem 0.875rem;
		border-radius: var(--control-corner);
	}

	.stage-hint {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-muted);
		background: var(--overlay-bg);
		backdrop-filter: blur(8px);
		padding: 0.375rem 0.75rem;
		border-radius: var(--control-corner);
		border: 1px solid var(--color-hairline);
	}

	.stage-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 2.75rem;
		height: 2.75rem;
		background: var(--overlay-bg);
		backdrop-filter: blur(8px);
		border: 1px solid var(--color-hairline);
		border-radius: 50%;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-primary);
		cursor: pointer;
		z-index: 3;
		transition: all 0.2s ease;
	}

	.stage-arrow:hover {
		background: var(--color-primary);
		color: var(--color-ground);
		transform: translateY(-50%) scale(1.08);
	}

	.stage-arrow-left {
		left: 1.25rem;
	}

	.stage-arrow-right {
		right: 1.25rem;
	}

	.stage-bottom-bar {
		position: absolute;
		bottom: 1.5rem;
		left: 1.5rem;
		right: 1.5rem;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		z-index: 2;
		pointer-events: auto;
	}

	.stage-info {
		cursor: pointer;
		background: var(--overlay-bg);
		backdrop-filter: blur(12px);
		padding: 1rem 1.5rem;
		border-radius: 12px;
		border: 1px solid var(--color-hairline);
		max-width: 480px;
		transition: transform 0.2s ease;
	}

	.stage-info:hover {
		transform: translateY(-2px);
	}

	.stage-title {
		font-family: var(--font-display);
		font-size: 1.375rem;
		font-weight: 600;
		color: var(--color-primary);
		letter-spacing: -0.015em;
		margin-bottom: 0.25rem;
	}

	.stage-tagline {
		font-family: var(--font-body);
		font-size: 0.9375rem;
		color: var(--color-secondary);
		line-height: 1.4;
	}

	.stage-explore-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0.875rem 1.75rem;
		background: var(--color-action-fill);
		color: var(--color-action-label);
		border-radius: var(--control-corner);
		border: none;
		cursor: pointer;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.stage-explore-btn:hover {
		transform: scale(1.04);
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
	}

	/* ── Collection Grid ── */
	.collection-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.watch-card {
		background: var(--color-surface);
		border: 1px solid var(--color-hairline);
		border-radius: var(--surface-corner);
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		cursor: pointer;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.2s ease;
	}

	.watch-card:hover {
		transform: translateY(-4px);
		box-shadow:
			0 8px 24px -8px rgba(0, 0, 0, 0.06),
			0 16px 40px -12px rgba(0, 0, 0, 0.08);
		border-color: var(--color-primary);
	}

	.watch-card.selected {
		border-color: var(--color-gold);
		background: var(--color-surface);
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.card-num {
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-muted);
	}

	.card-edition {
		font-family: var(--font-display);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-gold);
	}

	.card-title {
		font-family: var(--font-display);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-primary);
		letter-spacing: -0.01em;
		margin-bottom: 0.375rem;
	}

	.card-tagline {
		font-family: var(--font-body);
		font-size: 0.875rem;
		font-style: italic;
		color: var(--color-muted);
		margin-bottom: 0.75rem;
	}

	.card-desc {
		font-family: var(--font-body);
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--color-secondary);
		margin-bottom: 1.5rem;
		flex: 1;
	}

	.card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 1rem;
		border-top: 1px solid var(--color-hairline);
		font-family: var(--font-display);
		font-size: 0.75rem;
	}

	.card-spec-highlight {
		color: var(--color-muted);
	}

	.card-action {
		font-weight: 600;
		color: var(--color-primary);
		transition: transform 0.2s ease, color 0.2s ease;
	}

	.watch-card:hover .card-action {
		color: var(--color-gold);
		transform: translateX(3px);
	}

	/* ── Full 3D Modal ── */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 99999;
		background: rgba(10, 10, 12, 0.82);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.modal-content {
		position: relative;
		background: var(--color-ground);
		border-radius: var(--surface-corner);
		max-width: 1200px;
		width: 100%;
		max-height: 90vh;
		overflow: hidden;
		box-shadow:
			0 32px 96px -16px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(255, 255, 255, 0.1);
	}

	.modal-close {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
		z-index: 20;
		width: 2.75rem;
		height: 2.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--overlay-bg);
		backdrop-filter: blur(8px);
		color: var(--color-primary);
		border: 1px solid var(--color-hairline);
		border-radius: 50%;
		font-size: 1.125rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.modal-close:hover {
		background: var(--color-primary);
		color: var(--color-ground);
		transform: scale(1.08);
	}

	.modal-layout {
		display: grid;
		grid-template-columns: 55% 45%;
		min-height: 580px;
	}

	.modal-viewer-col {
		position: relative;
		background: var(--modal-viewer-bg);
		display: flex;
		flex-direction: column;
		min-height: 540px;
	}

	.modal-viewer-canvas {
		flex: 1;
		width: 100%;
		height: 100%;
		min-height: 500px;
	}

	.viewer-instructions {
		position: absolute;
		bottom: 1.25rem;
		left: 50%;
		transform: translateX(-50%);
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--overlay-bg);
		backdrop-filter: blur(8px);
		border: 1px solid var(--color-hairline);
		padding: 0.375rem 0.875rem;
		border-radius: var(--control-corner);
		font-family: var(--font-display);
		font-size: 0.75rem;
		color: var(--color-muted);
		pointer-events: none;
		white-space: nowrap;
	}

	.instruction-dot {
		opacity: 0.5;
	}

	.modal-details-col {
		padding: 2.75rem;
		overflow-y: auto;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
	}

	.modal-nav {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
	}

	.modal-nav-arrow {
		width: 2rem;
		height: 2rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--color-hairline);
		border-radius: 50%;
		background: var(--color-surface);
		color: var(--color-primary);
		font-size: 1.125rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.modal-nav-arrow:hover {
		background: var(--color-primary);
		color: #ffffff;
	}

	.modal-counter {
		font-family: var(--font-display);
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--color-muted);
	}

	.modal-badge {
		display: inline-block;
		font-family: var(--font-display);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-gold);
		background: var(--color-gold-light);
		padding: 0.375rem 0.875rem;
		border-radius: var(--control-corner);
		margin-bottom: 1rem;
		align-self: flex-start;
	}

	.modal-title {
		font-family: var(--font-display);
		font-size: clamp(1.875rem, 3vw, 2.375rem);
		font-weight: var(--weight-display);
		line-height: 1.15;
		letter-spacing: -0.02em;
		color: var(--color-primary);
		margin-bottom: 0.375rem;
	}

	.modal-tagline {
		font-family: var(--font-body);
		font-size: 1rem;
		font-style: italic;
		color: var(--color-gold);
		margin-bottom: 1.5rem;
	}

	.modal-block {
		margin-bottom: 1.75rem;
	}

	.modal-lead {
		font-family: var(--font-body);
		font-size: 1.0625rem;
		line-height: 1.65;
		color: var(--color-primary);
	}

	.modal-block-title {
		font-family: var(--font-display);
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-muted);
		margin-bottom: 0.625rem;
	}

	.modal-story {
		font-family: var(--font-body);
		font-size: 0.9375rem;
		line-height: 1.75;
		color: var(--color-secondary);
	}

	.specs-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.875rem;
		background: var(--color-surface);
		padding: 1.25rem;
		border-radius: 12px;
		border: 1px solid var(--color-hairline);
	}

	.spec-item {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.spec-label {
		font-family: var(--font-display);
		font-size: 0.6875rem;
		font-weight: 500;
		color: var(--color-muted);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.spec-value {
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-primary);
	}

	.modal-actions {
		margin-top: auto;
		padding-top: 1.5rem;
	}

	.btn-modal-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		font-family: var(--font-display);
		font-size: 0.9375rem;
		font-weight: 500;
		padding: 1rem 2rem;
		background-color: var(--color-action-fill);
		color: var(--color-action-label);
		border-radius: var(--control-corner);
		text-decoration: none;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.btn-modal-primary:hover {
		transform: scale(1.02);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
	}

	/* ── Responsive ── */
	@media (max-width: 1024px) {
		.collection-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.modal-layout {
			grid-template-columns: 1fr;
		}

		.modal-viewer-col {
			min-height: 380px;
			max-height: 420px;
		}

		.modal-details-col {
			padding: 2rem;
			max-height: 50vh;
		}
	}

	@media (max-width: 640px) {
		.showcase-stage {
			height: 420px;
		}

		.stage-bottom-bar {
			flex-direction: column;
			align-items: stretch;
			gap: 0.75rem;
		}

		.stage-info {
			max-width: 100%;
		}

		.collection-grid {
			grid-template-columns: 1fr;
		}

		.modal-backdrop {
			padding: 0.75rem;
		}

		.modal-viewer-col {
			min-height: 300px;
			max-height: 320px;
		}

		.specs-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
