<script>
	const calibres = [
		{
			code: 'CALIBRE V-7750',
			accent: 'teal',
			name: 'Meridian Column-Wheel Chronograph',
			count: '28,800 VPH · 72H RESERVE · COSC'
		},
		{
			code: 'CALIBRE V-900',
			accent: 'amber',
			name: 'Boccia Aerospace Perpetual Plate',
			count: '68 GRAMS · 80H RESERVE · 300M'
		},
		{
			code: 'CALIBRE V-12',
			accent: 'amber',
			name: 'Phantom Guilloché Ultra-Thin Hand-Wound',
			count: '18K GOLD · 48H RESERVE · 50 PCS'
		},
		{
			code: 'CALIBRE V-28',
			accent: 'teal',
			name: 'Heritage Automatique Enamel Roman Dial',
			count: 'COSC CERT · 65H RESERVE · 100M'
		},
		{
			code: 'CALIBRE V-800',
			accent: 'teal',
			name: 'Nautilus Grand Sport Monobloc Regulateur',
			count: '120H RESERVE · 300M ISO DIVER'
		}
	];

	const salonDates = [
		{
			city: 'Geneva Salon',
			venue: 'Hôtel des Bergues, Quai des Bergues 33',
			dates: 'NOV 28 — DEC 02',
			calibres: 'Complete Vauthier Archive (01–06)',
			status: 'RESERVE SLOT',
			isAvailable: true
		},
		{
			city: 'Zurich Atelier',
			venue: 'Bahnhofstrasse 14, 8001 Zürich',
			dates: 'DEC 08 — DEC 12',
			calibres: 'Calibre V-7750 & V-12',
			status: 'BY INVITATION',
			isAvailable: false
		},
		{
			city: 'Tokyo Exhibition',
			venue: 'Ginza Six Private Suite, Chuo-ku',
			dates: 'JAN 14 — JAN 18',
			calibres: 'Boccia Titanium & Nautilus',
			status: 'RESERVE SLOT',
			isAvailable: true
		},
		{
			city: 'New York Salon',
			venue: 'The Carlyle, 35 E 76th St, Manhattan',
			dates: 'FEB 04 — FEB 08',
			calibres: 'Complete Vauthier Archive',
			status: 'WAITLIST ONLY',
			isAvailable: false
		},
		{
			city: 'London Showcase',
			venue: 'Mayfair Private Salons, New Bond St',
			dates: 'FEB 22 — FEB 26',
			calibres: 'Phantom Royale & Meridian',
			status: 'RESERVE SLOT',
			isAvailable: true
		}
	];
</script>

<section class="roster-dates-section" id="roster">
	<div class="container">
		<!-- ── Part 1: Hairline Roster (04 / MANUFACTURE ROSTER) ── -->
		<div class="roster-block">
			<div class="block-header">
				<span class="label-caps">04 / MANUFACTURE ROSTER</span>
				<h2 class="display-title block-title">THE CALIBRE ARCHIVE</h2>
			</div>

			<div class="roster-list" role="list">
				{#each calibres as calibre}
					<div class="roster-row" role="listitem">
						<span
							class="label-caps calibre-code"
							class:accent-teal={calibre.accent === 'teal'}
							class:accent-amber={calibre.accent === 'amber'}
						>
							{calibre.code}
						</span>

						<span class="calibre-name">
							{calibre.name}
						</span>

						<span class="calibre-count label-caps">
							{calibre.count}
						</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- ── Part 2: Salon Dates Table (05 / PRIVATE VIEWINGS) ── -->
		<div class="dates-block" id="dates">
			<div class="block-header">
				<span class="label-caps">05 / PRIVATE VIEWINGS</span>
				<h2 class="display-title block-title">SALON ITINERARY 2024/25</h2>
			</div>

			<div class="dates-table-wrapper">
				<!-- Uppercase table headers over a hairline -->
				<div class="table-head label-caps" aria-hidden="true">
					<div class="col-city">CITY / SALON</div>
					<div class="col-venue">VENUE</div>
					<div class="col-dates">DATES</div>
					<div class="col-calibres">CALIBRES PRESENT</div>
					<div class="col-action">ACCESS</div>
				</div>

				<div class="table-body" role="table" aria-label="Salon Viewing Dates">
					{#each salonDates as item}
						<div class="table-row" role="row">
							<div class="col-city table-cell" role="cell">
								<span class="mobile-label label-caps">CITY</span>
								<span class="city-name">{item.city}</span>
							</div>

							<div class="col-venue table-cell" role="cell">
								<span class="mobile-label label-caps">VENUE</span>
								<span class="venue-name">{item.venue}</span>
							</div>

							<div class="col-dates table-cell" role="cell">
								<span class="mobile-label label-caps">DATES</span>
								<span class="dates-text">{item.dates}</span>
							</div>

							<div class="col-calibres table-cell" role="cell">
								<span class="mobile-label label-caps">CALIBRES</span>
								<span class="calibres-text">{item.calibres}</span>
							</div>

							<div class="col-action table-cell" role="cell">
								<span class="mobile-label label-caps">ACCESS</span>
								{#if item.isAvailable}
									<a href="#close" class="access-link label-caps">
										{item.status} <span class="arrow">→</span>
									</a>
								{:else}
									<span class="access-muted label-caps">{item.status}</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.roster-dates-section {
		padding-block: clamp(5rem, 10vw, 8rem);
		background: var(--color-ground);
		border-bottom: 1px solid var(--color-hairline);
	}

	.block-header {
		margin-bottom: 3.5rem;
	}

	.block-title {
		font-size: clamp(28px, 3.5vw, 44px);
		margin-top: 0.75rem;
	}

	/* ── Hairline Roster ── */
	.roster-block {
		margin-bottom: clamp(5rem, 8vw, 7rem);
	}

	.roster-list {
		border-top: 1px solid var(--color-hairline);
	}

	.roster-row {
		display: grid;
		grid-template-columns: 180px 1fr auto;
		gap: 2rem;
		align-items: baseline;
		padding-block: 1.65rem;
		border-bottom: 1px solid var(--color-hairline);
		transition: background-color 0.2s ease;
	}

	.roster-row:hover {
		background: rgba(237, 231, 220, 0.02);
	}

	.calibre-code {
		font-weight: 600;
	}

	.calibre-name {
		font-family: var(--font-display);
		font-size: clamp(16px, 1.6vw, 21px);
		font-weight: 600;
		color: var(--color-ink);
		letter-spacing: -0.015em;
	}

	.calibre-count {
		color: var(--color-secondary-ink);
		text-align: right;
		white-space: nowrap;
	}

	/* ── Salon Dates Table ── */
	.dates-table-wrapper {
		width: 100%;
	}

	.table-head {
		display: grid;
		grid-template-columns: 1.4fr 2fr 1.3fr 1.6fr 1.1fr;
		gap: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-hairline);
		color: var(--color-muted);
	}

	.table-row {
		display: grid;
		grid-template-columns: 1.4fr 2fr 1.3fr 1.6fr 1.1fr;
		gap: 1.5rem;
		align-items: baseline;
		padding-block: 1.5rem;
		border-bottom: 1px solid var(--color-hairline);
		transition: background-color 0.2s ease;
	}

	.table-row:hover {
		background: rgba(237, 231, 220, 0.02);
	}

	.city-name {
		font-family: var(--font-display);
		font-size: 17px;
		font-weight: 700;
		letter-spacing: -0.015em;
		color: var(--color-ink);
	}

	.venue-name {
		color: var(--color-secondary-ink);
		font-size: 13.5px;
	}

	.dates-text {
		color: var(--color-ink);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	.calibres-text {
		color: var(--color-muted);
		font-size: 12.5px;
	}

	.access-link {
		color: var(--color-amber);
		font-weight: 600;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		transition: transform 0.2s ease, color 0.2s ease;
	}

	.access-link:hover {
		transform: translateX(4px);
		color: var(--color-ink);
	}

	.access-muted {
		color: var(--color-muted);
	}

	.mobile-label {
		display: none;
	}

	/* ── Responsive collapse to 2-column grid per row on narrow screens ── */
	@media (max-width: 900px) {
		.roster-row {
			grid-template-columns: 1fr auto;
			gap: 0.75rem 1.5rem;
		}

		.calibre-code {
			grid-column: 1 / 2;
		}

		.calibre-count {
			grid-column: 2 / 3;
		}

		.calibre-name {
			grid-column: 1 / 3;
			font-size: 18px;
		}
	}

	@media (max-width: 768px) {
		.table-head {
			display: none;
		}

		.table-row {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1.25rem 1rem;
			padding-block: 1.75rem;
		}

		.mobile-label {
			display: block;
			font-size: 8.5px;
			color: var(--color-muted);
			margin-bottom: 0.25rem;
		}

		.col-city {
			grid-column: 1 / 3;
		}

		.col-venue {
			grid-column: 1 / 3;
		}

		.col-dates {
			grid-column: 1 / 2;
		}

		.col-action {
			grid-column: 2 / 3;
			justify-self: end;
			align-self: end;
		}

		.col-calibres {
			grid-column: 1 / 3;
		}
	}
</style>
