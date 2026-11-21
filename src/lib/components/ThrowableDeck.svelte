<script>
	let deckEl;
	let activeIndex = $state(0);
	let isDragging = $state(false);
	let isThrowing = $state(false);
	let throwDir = $state(1); // 1 = right, -1 = left
	let dragX = $state(0);
	let dragY = $state(0);
	let startX = 0;
	let startY = 0;

	const sleeves = [
		{
			ref: 'REF. VA-087',
			name: 'MERIDIAN CHRONOGRAPH',
			calibre: 'Calibre V-7750 Column-Wheel',
			series: 'First Edition · 250 Pieces',
			caseSpec: '42mm / Surgical 316L & 18K Bezel',
			rate: '28,800 vph · 72h Reserve',
			price: 'Starting from $4,800',
			tag: 'SIGNATURE PIECE',
			accent: 'amber',
			image: '/image2.jpg',
			imagePos: 'center 40%'
		},
		{
			ref: 'REF. VA-041',
			name: 'BOCCIA TITANIUM PERPETUAL',
			calibre: 'Calibre V-900 Perpetual Plate',
			series: 'Aerospace Series · 100 Pieces',
			caseSpec: '41mm / Grade 5 Titanium (68g)',
			rate: '21,600 vph · 80h Reserve',
			price: 'Starting from $3,600',
			tag: 'AEROSPACE METALLURGY',
			accent: 'teal',
			image: '/image-hero.webp',
			imagePos: 'center 38%'
		},
		{
			ref: 'REF. VA-012',
			name: 'PHANTOM ROYALE ATELIER',
			calibre: 'Calibre V-12 Ultra-Thin Hand-Wound',
			series: 'Secret Compartment · 50 Pieces',
			caseSpec: '39mm / 18K Yellow Gold & Guilloché',
			rate: '28,800 vph · 48h Reserve',
			price: 'Starting from $12,000',
			tag: 'ATELIER COMMODITY',
			accent: 'amber',
			image: '/image3.jfif',
			imagePos: 'center 45%'
		},
		{
			ref: 'REF. VA-800',
			name: 'NAUTILUS GRAND SPORT',
			calibre: 'Calibre V-800 High-Beat Regulateur',
			series: 'Monobloc Diver · 150 Pieces',
			caseSpec: '43mm / 316L Monobloc Marine Steel',
			rate: '36,000 vph · 120h Reserve',
			price: 'Starting from $6,200',
			tag: 'DEEP-SEA ISO 6425',
			accent: 'teal',
			image: '/image2.jpg',
			imagePos: 'center 48%'
		}
	];

	function throwCard(direction = 1) {
		if (isThrowing) return;
		isThrowing = true;
		throwDir = direction;
		setTimeout(() => {
			activeIndex = (activeIndex + 1) % sleeves.length;
			isThrowing = false;
			dragX = 0;
			dragY = 0;
		}, 340);
	}

	function handlePointerDown(e) {
		if (isThrowing) return;
		isDragging = true;
		startX = e.clientX;
		startY = e.clientY;
		dragX = 0;
		dragY = 0;
		try {
			e.currentTarget.setPointerCapture(e.pointerId);
		} catch (err) {}
	}

	function handlePointerMove(e) {
		if (!isDragging) return;
		dragX = e.clientX - startX;
		dragY = e.clientY - startY;
	}

	function handlePointerUp(e) {
		if (!isDragging) return;
		isDragging = false;
		const deckWidth = deckEl ? deckEl.offsetWidth : 360;
		const threshold = deckWidth * 0.12;

		if (Math.abs(dragX) > threshold) {
			throwCard(dragX > 0 ? 1 : -1);
		} else {
			dragX = 0;
			dragY = 0;
		}
		try {
			e.currentTarget.releasePointerCapture(e.pointerId);
		} catch (err) {}
	}

	function handleKeyDown(e) {
		if (e.key === 'ArrowRight' || e.key === 'Space') {
			e.preventDefault();
			throwCard(1);
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			throwCard(-1);
		}
	}
</script>

<section class="releases-section" id="releases">
	<div class="container releases-inner">
		<!-- Column 1: Headline, lede, two buttons -->
		<div class="releases-col-left">
			<span class="label-caps section-tag">03 / THE CATALOGUE</span>
			<h2 class="display-title releases-headline">
				THE CATALOGUE<br />OF SLEEVES
			</h2>
			<p class="releases-lede">
				Four horological masterworks, hand-assembled in limited series at our Le
				Locle atelier. Throw each sleeve aside to explore the technical calibre
				specification and provenance archive.
			</p>

			<div class="releases-actions">
				<a href="#dates" class="btn-pill btn-pill-primary">
					Book an Appointment
				</a>
				<a href="#calibre-3d" class="btn-pill btn-pill-ghost">
					3D Calibre Laboratory
				</a>
			</div>

			<div class="releases-meta">
				<div class="meta-item">
					<span class="meta-dot dot-amber" aria-hidden="true"></span>
					<span class="label-caps">FOUR REFERENCES</span>
				</div>
				<div class="meta-item">
					<span class="meta-dot dot-teal" aria-hidden="true"></span>
					<span class="label-caps">COSC CHRONOMETERS</span>
				</div>
				<div class="meta-item">
					<span class="label-caps">SWISS JURA MANUFACTURE</span>
				</div>
			</div>
		</div>

		<!-- Column 2: Square Throwable Card Deck -->
		<div class="releases-col-right">
			<!-- Deck container with tabindex 0 and touch-action pan-y -->
			<div
				class="deck-stage"
				bind:this={deckEl}
				tabindex="0"
				role="toolbar"
				aria-label="Physical watch catalogue deck. Use left or right arrow keys to throw sleeves."
				onkeydown={handleKeyDown}
			>
				<div class="deck-stack">
					{#each sleeves as sleeve, i}
						{@const order = (i - activeIndex + sleeves.length) % sleeves.length}
						{@const isTop = order === 0}
						{@const isNext = order === 1}
						{@const isThird = order === 2}
						{@const isFourth = order === 3}

						<!-- Card styling with offsets and physics -->
						<div
							class="deck-card"
							class:top-card={isTop}
							class:throwing={isTop && isThrowing}
							class:dragging={isTop && isDragging}
							role="group"
							aria-roledescription="card sleeve"
							aria-label="{sleeve.name} - {sleeve.calibre}"
							style:z-index={sleeves.length - order}
							style:--offset-x={isTop
								? isThrowing
									? `${throwDir * 125}%`
									: `${dragX}px`
								: isNext
									? '8px'
									: isThird
										? '-6px'
										: '12px'}
							style:--offset-y={isTop
								? isThrowing
									? `${dragY - 24}px`
									: `${dragY * 0.35}px`
								: isNext
									? '-8px'
									: isThird
										? '-18px'
										: '-28px'}
							style:--rotation={isTop
								? isThrowing
									? `${throwDir * 24}deg`
									: `${dragX * 0.065}deg`
								: isNext
									? '2.2deg'
									: isThird
										? '-2deg'
										: '1.4deg'}
							style:--scale={isTop
								? isDragging
									? '1.02'
									: '1'
								: isNext
									? '0.96'
									: isThird
										? '0.91'
										: '0.86'}
							onpointerdown={isTop ? handlePointerDown : undefined}
							onpointermove={isTop ? handlePointerMove : undefined}
							onpointerup={isTop ? handlePointerUp : undefined}
							onpointercancel={isTop ? handlePointerUp : undefined}
						>
							<!-- Card Header -->
							<div class="card-header">
								<span class="label-caps card-ref">{sleeve.ref}</span>
								<span
									class="label-caps card-tag"
									class:accent-amber={sleeve.accent === 'amber'}
									class:accent-teal={sleeve.accent === 'teal'}
								>
									{sleeve.tag}
								</span>
							</div>

							<!-- Card Visual Aperture -->
							<div class="card-media">
								<img
									src={sleeve.image}
									alt={sleeve.name}
									class="card-img"
									style="object-position: {sleeve.imagePos};"
									draggable="false"
								/>
								<div class="media-overlay" aria-hidden="true"></div>
								<div class="media-watermark label-caps">VAUTHIER ATELIER</div>
							</div>

							<!-- Card Details -->
							<div class="card-body">
								<h3 class="card-title">{sleeve.name}</h3>
								<div class="card-calibre label-caps">
									{sleeve.calibre}
								</div>

								<div class="card-divider" aria-hidden="true"></div>

								<div class="card-specs">
									<div class="spec-row">
										<span class="spec-label label-caps">SPEC</span>
										<span class="spec-val">{sleeve.caseSpec}</span>
									</div>
									<div class="spec-row">
										<span class="spec-label label-caps">FREQUENCY</span>
										<span class="spec-val">{sleeve.rate}</span>
									</div>
									<div class="spec-row">
										<span class="spec-label label-caps">REGISTRATION</span>
										<span class="spec-val">{sleeve.series}</span>
									</div>
								</div>

								<div class="card-footer">
									<span class="card-price">{sleeve.price}</span>
									<a href="#calibre-3d" class="card-3d-link label-caps" onclick={(e) => e.stopPropagation()}>
										INSPECT 3D →
									</a>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Hint line and progress dots beneath deck -->
				<div class="deck-controls">
					<div class="progress-dots" role="tablist" aria-label="Deck Sleeves">
						{#each sleeves as _, idx}
							<button
								class="progress-dot"
								class:active={idx === activeIndex}
								aria-label="View sleeve {idx + 1}"
								onclick={() => (activeIndex = idx)}
							></button>
						{/each}
					</div>

					<div class="hint-line label-caps">
						[ 0{activeIndex + 1} / 0{sleeves.length} ] · DRAG OR USE ARROW KEYS TO
						THROW
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.releases-section {
		padding-block: clamp(5rem, 10vw, 8rem);
		background: var(--color-ground);
		border-bottom: 1px solid var(--color-hairline);
		overflow: hidden;
	}

	.releases-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(3rem, 6vw, 6rem);
		align-items: center;
	}

	/* ── Left Column ── */
	.releases-col-left {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.section-tag {
		margin-bottom: 1.5rem;
		display: block;
	}

	.releases-headline {
		font-size: clamp(32px, 4vw, 54px);
		line-height: 1.08;
		margin-bottom: 1.75rem;
	}

	.releases-lede {
		font-family: var(--font-body);
		font-size: 15px;
		line-height: 1.75;
		color: var(--color-secondary-ink);
		max-width: 480px;
		margin-bottom: 2.5rem;
	}

	.releases-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 3rem;
	}

	.releases-meta {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		border-top: 1px solid var(--color-hairline);
		padding-top: 1.5rem;
		width: 100%;
		max-width: 440px;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}

	.meta-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
	}

	.dot-amber {
		background: var(--color-amber);
	}

	.dot-teal {
		background: var(--color-teal);
	}

	/* ── Right Column: Throwable Deck ── */
	.releases-col-right {
		display: flex;
		justify-content: center;
	}

	.deck-stage {
		width: 100%;
		max-width: 440px;
		display: flex;
		flex-direction: column;
		align-items: center;
		outline: none;
		touch-action: pan-y;
		user-select: none;
	}

	.deck-stage:focus-visible {
		outline: 1px solid var(--color-amber);
		outline-offset: 8px;
	}

	.deck-stack {
		position: relative;
		width: 100%;
		height: 540px;
		perspective: 1000px;
	}

	/* ── Card Styling ── */
	.deck-card {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		background: var(--color-secondary-ground);
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-shadow:
			0 24px 60px -15px rgba(0, 0, 0, 0.7),
			0 8px 24px -8px rgba(0, 0, 0, 0.5);
		transform-origin: center bottom;
		transform: translate(var(--offset-x), var(--offset-y)) rotate(var(--rotation))
			scale(var(--scale));
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		cursor: grab;
		will-change: transform;
	}

	.deck-card.top-card {
		cursor: grab;
	}

	.deck-card.dragging {
		cursor: grabbing;
		transition: none;
	}

	.deck-card.throwing {
		transition: transform 0.34s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.34s ease;
		opacity: 0.15;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--color-hairline);
	}

	.card-ref {
		color: var(--color-muted);
	}

	.card-tag {
		font-weight: 600;
	}

	/* ── Media ── */
	.card-media {
		position: relative;
		width: 100%;
		height: 180px;
		border-radius: 6px;
		overflow: hidden;
		margin-block: 0.75rem;
		border: 1px solid var(--color-hairline-subtle);
		background: var(--color-ground);
	}

	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
	}

	.media-overlay {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, transparent 30%, rgba(16, 19, 23, 0.6) 100%);
	}

	.media-watermark {
		position: absolute;
		bottom: 8px;
		right: 10px;
		font-size: 8.5px;
		letter-spacing: 0.15em;
		color: rgba(237, 231, 220, 0.4);
	}

	/* ── Body ── */
	.card-body {
		display: flex;
		flex-direction: column;
	}

	.card-title {
		font-family: var(--font-display);
		font-size: 18px;
		font-weight: 700;
		letter-spacing: -0.015em;
		color: var(--color-ink);
		margin-bottom: 0.25rem;
	}

	.card-calibre {
		color: var(--color-secondary-ink);
		font-size: 10px;
		margin-bottom: 0.85rem;
	}

	.card-divider {
		height: 1px;
		background: var(--color-hairline);
		margin-bottom: 0.85rem;
	}

	.card-specs {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		margin-bottom: 1.1rem;
	}

	.spec-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		font-size: 11px;
	}

	.spec-label {
		color: var(--color-muted);
		font-size: 9px;
	}

	.spec-val {
		color: var(--color-secondary-ink);
		font-family: var(--font-body);
		font-weight: 500;
	}

	.card-footer {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		border-top: 1px solid var(--color-hairline);
		padding-top: 0.75rem;
	}

	.card-price {
		font-family: var(--font-display);
		font-size: 15px;
		font-weight: 700;
		color: var(--color-ink);
		letter-spacing: -0.01em;
	}

	.card-3d-link {
		color: var(--color-amber);
		font-size: 9.5px;
		font-weight: 600;
		letter-spacing: 0.12em;
		transition: transform 0.2s ease, color 0.2s ease;
		display: inline-flex;
		align-items: center;
		padding: 2px 4px;
	}

	.card-3d-link:hover {
		color: var(--color-ink);
		transform: translateX(3px);
	}

	/* ── Deck Controls (Dots & Hint) ── */
	.deck-controls {
		margin-top: 1.75rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.85rem;
		width: 100%;
	}

	.progress-dots {
		display: flex;
		gap: 8px;
	}

	.progress-dot {
		width: 24px;
		height: 2px;
		background: var(--color-hairline);
		transition: background-color 0.25s ease, width 0.25s ease;
		cursor: pointer;
	}

	.progress-dot.active {
		background: var(--color-amber);
		width: 38px;
	}

	.hint-line {
		color: var(--color-muted);
		font-size: 9.5px;
		letter-spacing: 0.12em;
		text-align: center;
	}

	@media (max-width: 900px) {
		.releases-inner {
			grid-template-columns: 1fr;
			gap: 3.5rem;
		}

		.releases-col-left {
			align-items: flex-start;
		}

		.deck-stack {
			height: 500px;
		}
	}

	@media (max-width: 480px) {
		.deck-stack {
			height: 480px;
		}

		.deck-card {
			padding: 1.25rem;
		}

		.card-media {
			height: 140px;
		}
	}
</style>
