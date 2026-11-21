<script>
	import WatchViewer from './WatchViewer.svelte';
	import { watches } from '$lib/data/watches.js';

	let activeIndex = $state(0);
	let autoRotate = $state(true);
	let isLoading = $state(true);

	let currentWatch = $derived(watches[activeIndex]);

	function selectWatch(idx) {
		if (activeIndex === idx) return;
		isLoading = true;
		activeIndex = idx;
	}

	function handleModelLoaded() {
		isLoading = false;
	}

	function toggleAutoRotate() {
		autoRotate = !autoRotate;
	}
</script>

<section class="calibre-3d-section" id="calibre-3d">
	<div class="container">
		<!-- Section Header: strictly sequential 02 -->
		<div class="section-top">
			<div>
				<span class="label-caps">02 / 3D CALIBRE LABORATORY</span>
				<h2 class="display-title section-title">
					INTERACTIVE 3D HOROLOGY
				</h2>
			</div>
			<p class="section-intro">
				Examine each reference in real-time 3D rendered space. Click and drag to
				orbit 360°, inspect the bezel geometry, lug chamfering, and exhibition
				casebacks.
			</p>
		</div>

		<!-- Watch Switcher Tabs without numbers (clean name only) -->
		<div class="model-selector-tabs" role="tablist" aria-label="3D Watch Models">
			{#each watches as watch, i}
				<button
					class="selector-tab"
					class:active={i === activeIndex}
					role="tab"
					aria-selected={i === activeIndex}
					onclick={() => selectWatch(i)}
				>
					<span class="tab-label">{watch.name.replace('Vauthier ', '')}</span>
				</button>
			{/each}
		</div>

		<!-- 3D Studio Stage & Spec Grid -->
		<div class="studio-grid">
			<!-- 3D Viewer Canvas Container -->
			<div class="stage-viewport-card">
				<!-- Stage 3D Viewport -->
				<div class="canvas-wrapper">
					<WatchViewer
						url={currentWatch.modelPath}
						interactive={true}
						{autoRotate}
						onLoaded={handleModelLoaded}
					/>

					{#if isLoading}
						<div class="stage-loader" aria-live="polite">
							<div class="loader-spinner" aria-hidden="true"></div>
							<span class="label-caps">INITIALIZING CALIBRE...</span>
						</div>
					{/if}
				</div>

				<!-- Interactive HUD Overlay -->
				<div class="hud-overlay">
					<div class="hud-top-right">
						<button
							class="hud-btn label-caps"
							onclick={toggleAutoRotate}
							title="Toggle continuous rotation"
						>
							{#if autoRotate}
								<span>PAUSE ORBIT</span>
							{:else}
								<span class="accent-amber">RESUME ORBIT</span>
							{/if}
						</button>
					</div>

					<div class="hud-bottom-bar label-caps">
						<span>DRAG TO ROTATE 360° · SCROLL TO ZOOM</span>
						<span class="hud-ref">{currentWatch.edition}</span>
					</div>
				</div>
			</div>

			<!-- Technical Spec Sheet Column -->
			<div class="spec-sheet-col">
				<div class="spec-sheet-header">
					<span class="label-caps spec-tag accent-amber">
						{currentWatch.edition}
					</span>
					<h3 class="display-title current-watch-name">
						{currentWatch.name}
					</h3>
					<p class="current-watch-tagline">
						{currentWatch.tagline}
					</p>
					<p class="current-watch-desc">
						{currentWatch.shortDesc}
					</p>
				</div>

				<!-- Detailed Spec Table -->
				<div class="spec-table" role="table" aria-label="Technical Specifications">
					{#each currentWatch.specs as spec}
						<div class="spec-row" role="row">
							<span class="spec-key label-caps" role="rowheader">{spec.label}</span>
							<span class="spec-value" role="cell">{spec.value}</span>
						</div>
					{/each}
				</div>

				<div class="spec-actions">
					<a href="#dates" class="btn-pill btn-pill-primary">
						Book Salon Viewing
					</a>
					<a href="#statement" class="btn-pill btn-pill-ghost">
						Atelier Archive
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.calibre-3d-section {
		padding-block: clamp(5rem, 10vw, 8rem);
		background: var(--color-ground);
		border-bottom: 1px solid var(--color-hairline);
		position: relative;
	}

	.section-top {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 3rem;
		margin-bottom: 2.75rem;
		flex-wrap: wrap;
	}

	.section-title {
		font-size: clamp(28px, 4vw, 50px);
		line-height: 1.1;
		margin-top: 0.5rem;
	}

	.section-intro {
		max-width: 460px;
		color: var(--color-secondary-ink);
		font-size: 14px;
		line-height: 1.7;
	}

	/* ── Model Selector Tabs (clean text without 01/02 numbering) ── */
	.model-selector-tabs {
		display: flex;
		gap: 0.75rem;
		border-bottom: 1px solid var(--color-hairline);
		margin-bottom: 3rem;
		overflow-x: auto;
		padding-bottom: 0.25rem;
		scrollbar-width: none;
	}

	.model-selector-tabs::-webkit-scrollbar {
		display: none;
	}

	.selector-tab {
		display: flex;
		align-items: center;
		padding: 0.85rem 1.25rem;
		border-bottom: 2px solid transparent;
		color: var(--color-secondary-ink);
		background: transparent;
		cursor: pointer;
		white-space: nowrap;
		transition: all 0.2s ease;
	}

	.selector-tab:hover {
		color: var(--color-ink);
		border-bottom-color: var(--color-hairline);
	}

	.selector-tab.active {
		color: var(--color-ink);
		border-bottom-color: var(--color-amber);
	}

	.tab-label {
		font-family: var(--font-display);
		font-size: 14px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	/* ── Studio Stage & Spec Sheet Grid ── */
	.studio-grid {
		display: grid;
		grid-template-columns: 1.25fr 1fr;
		gap: clamp(2rem, 5vw, 4.5rem);
		align-items: center;
	}

	/* ── Stage Viewport Card ── */
	.stage-viewport-card {
		position: relative;
		width: 100%;
		height: 580px;
		background: var(--color-stage-bg);
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.canvas-wrapper {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.stage-loader {
		position: absolute;
		inset: 0;
		background: var(--color-ground);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		z-index: 10;
		transition: opacity 0.3s ease;
	}

	.loader-spinner {
		width: 28px;
		height: 28px;
		border: 2px solid var(--color-hairline);
		border-top-color: var(--color-amber);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* ── HUD Overlay ── */
	.hud-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.hud-top-right {
		align-self: flex-end;
		pointer-events: auto;
	}

	.hud-btn {
		padding: 0.35rem 0.85rem;
		border-radius: 9999px;
		border: 1px solid var(--color-hairline);
		background: rgba(10, 12, 14, 0.4);
		backdrop-filter: blur(8px);
		color: var(--color-ink);
		font-size: 9px;
		cursor: pointer;
		transition: border-color 0.2s ease, color 0.2s ease;
	}

	.hud-btn:hover {
		border-color: var(--color-amber);
	}

	.hud-bottom-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--color-muted);
		font-size: 9.5px;
		border-top: 1px solid var(--color-hairline-subtle);
		padding-top: 0.75rem;
	}

	.hud-ref {
		color: var(--color-secondary-ink);
	}

	/* ── Spec Sheet Column ── */
	.spec-sheet-col {
		display: flex;
		flex-direction: column;
	}

	.spec-tag {
		margin-bottom: 0.5rem;
		display: block;
	}

	.current-watch-name {
		font-size: clamp(24px, 2.5vw, 36px);
		line-height: 1.15;
		margin-bottom: 0.5rem;
	}

	.current-watch-tagline {
		font-family: var(--font-body);
		font-size: 13.5px;
		font-weight: 500;
		color: var(--color-secondary-ink);
		margin-bottom: 1.25rem;
	}

	.current-watch-desc {
		font-family: var(--font-body);
		font-size: 14px;
		line-height: 1.7;
		color: var(--color-secondary-ink);
		margin-bottom: 2rem;
		padding-bottom: 1.75rem;
		border-bottom: 1px solid var(--color-hairline);
	}

	/* ── Spec Table ── */
	.spec-table {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 2.25rem;
	}

	.spec-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		font-size: 13px;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-hairline-subtle);
	}

	.spec-key {
		color: var(--color-muted);
		font-size: 9.5px;
	}

	.spec-value {
		font-family: var(--font-body);
		font-weight: 500;
		color: var(--color-ink);
	}

	.spec-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	@media (max-width: 960px) {
		.studio-grid {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.stage-viewport-card {
			height: 480px;
		}
	}

	@media (max-width: 600px) {
		.stage-viewport-card {
			height: 380px;
		}
	}
</style>
