<script>
	import Navigation from '$lib/components/Navigation.svelte';
	import { watches } from '$lib/data/watches.js';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	// Salon locations
	const salons = [
		{
			id: 'geneva',
			city: 'Geneva Salon',
			address: 'Hôtel des Bergues, Quai des Bergues 33',
			country: 'Switzerland',
			status: 'Immediate Availability'
		},
		{
			id: 'le-locle',
			city: 'Le Locle Manufacture',
			address: 'Rue du Marais 12, 2400 Le Locle',
			country: 'Switzerland',
			status: 'Atelier Floor Tour Included'
		},
		{
			id: 'zurich',
			city: 'Zurich Private Suite',
			address: 'Bahnhofstrasse 14, 8001 Zürich',
			country: 'Switzerland',
			status: 'Limited Slots'
		},
		{
			id: 'tokyo',
			city: 'Tokyo Exhibition',
			address: 'Ginza Six Private Suite, Chuo-ku',
			country: 'Japan',
			status: 'Seasonal Exhibition'
		},
		{
			id: 'london',
			city: 'London Mayfair Atelier',
			address: 'Old Bond Street 24, W1S 4AP',
			country: 'United Kingdom',
			status: 'By Appointment Only'
		},
		{
			id: 'new-york',
			city: 'New York Madison Suite',
			address: '645 Madison Avenue, NY 10022',
			country: 'United States',
			status: 'Private Suite'
		},
		{
			id: 'liaison',
			city: 'Private Residence Liaison',
			address: 'Discreet viewing at collector residence or suite',
			country: 'Worldwide',
			status: 'Senior Horologist Traveling'
		}
	];

	const timeSlots = [
		{ id: 'morning', label: 'Morning Session', time: '10:00 — 12:00' },
		{ id: 'midday', label: 'Midday Session', time: '13:30 — 15:30' },
		{ id: 'afternoon', label: 'Afternoon Session', time: '16:00 — 18:00' },
		{ id: 'evening', label: 'Evening Salon', time: '18:30 — 20:30' }
	];

	// Form State
	let selectedSalon = $state('geneva');
	let selectedWatchId = $state('all');
	let appointmentDate = $state('');
	let selectedSlot = $state('afternoon');
	let guestCount = $state('1');

	// Guest Info
	let salutation = $state('Mr.');
	let fullName = $state('');
	let email = $state('');
	let phone = $state('');
	let countryOfResidence = $state('');
	let contactPreference = $state('email');
	let bespokeNotes = $state('');
	let wristSize = $state('');

	// Submission state
	let isSubmitting = $state(false);
	let isSubmitted = $state(false);
	let bookingReference = $state('');
	let submissionTimestamp = $state('');

	onMount(() => {
		// Set default date to 3 days in advance
		const d = new Date();
		d.setDate(d.getDate() + 3);
		appointmentDate = d.toISOString().split('T')[0];

		// Parse URL parameters if passed (e.g. /book?city=Tokyo or /book?watch=meridian)
		const queryCity = $page.url.searchParams.get('city');
		if (queryCity) {
			const found = salons.find(
				(s) => s.city.toLowerCase().includes(queryCity.toLowerCase()) || s.id === queryCity.toLowerCase()
			);
			if (found) selectedSalon = found.id;
		}

		const queryWatch = $page.url.searchParams.get('watch');
		if (queryWatch) {
			const foundWatch = watches.find(
				(w) => w.id.includes(queryWatch.toLowerCase()) || w.name.toLowerCase().includes(queryWatch.toLowerCase())
			);
			if (foundWatch) selectedWatchId = foundWatch.id;
		}
	});

	let currentSalonObj = $derived(salons.find((s) => s.id === selectedSalon) || salons[0]);
	let currentWatchObj = $derived(
		selectedWatchId === 'all'
			? { name: 'Full Manufacture Archive (All 6 Calibres)', tagline: 'Complete Private Presentation' }
			: watches.find((w) => w.id === selectedWatchId) || watches[0]
	);
	let currentSlotObj = $derived(timeSlots.find((s) => s.id === selectedSlot) || timeSlots[2]);

	function generateRef() {
		const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
		let ref = 'VAU-';
		for (let i = 0; i < 4; i++) ref += chars.charAt(Math.floor(Math.random() * chars.length));
		ref += '-';
		for (let i = 0; i < 3; i++) ref += chars.charAt(Math.floor(Math.random() * chars.length));
		return ref;
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!fullName || !email || !phone) return;

		isSubmitting = true;
		setTimeout(() => {
			bookingReference = generateRef();
			submissionTimestamp = new Date().toLocaleDateString('en-GB', {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
			isSubmitting = false;
			isSubmitted = true;
			if (typeof window !== 'undefined') {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}, 800);
	}

	function resetForm() {
		isSubmitted = false;
		fullName = '';
		email = '';
		phone = '';
		bespokeNotes = '';
	}
</script>

<svelte:head>
	<title>Book Private Appointment · VAUTHIER Haute Horlogerie</title>
	<meta
		name="description"
		content="Reserve a confidential salon appointment or private atelier viewing at Vauthier Manufacture in Le Locle or international private suites."
	/>
</svelte:head>

<!-- Global Navigation -->
<Navigation />

<main class="book-page">
	<div class="container book-container">
		<!-- Breadcrumb -->
		<nav class="breadcrumb label-caps" aria-label="Breadcrumb">
			<a href="/" class="crumb-link">VAUTHIER</a>
			<span class="crumb-sep">/</span>
			<span class="crumb-current">PRIVATE SALON & ATELIER APPOINTMENT</span>
		</nav>

		{#if !isSubmitted}
			<!-- Header Block -->
			<header class="book-header">
				<span class="label-caps hero-badge">01 / PRIVATE LIAISON REGISTRY</span>
				<h1 class="display-title book-title">
					RESERVE AN<br />APPOINTMENT
				</h1>
				<p class="book-intro">
					Arrange a confidential, private salon viewing with a senior horological specialist.
					Examine finished timepieces under 10× magnification, inspect raw manufacture movement
					architecture, or discuss bespoke commission piece allocations.
				</p>
			</header>

			<!-- Booking Grid (Form on Left / Summary & Atelier Sidebar on Right) -->
			<div class="book-grid">
				<form class="book-form" onsubmit={handleSubmit}>
					<!-- Section 01: Location Selection -->
					<section class="form-section">
						<div class="section-title-row">
							<span class="step-num label-caps accent-amber">STAGE 01</span>
							<h2 class="section-heading">SELECT SALON OR ATELIER</h2>
						</div>
						<p class="section-sub">Choose where you wish to meet our senior horological liaison.</p>

						<div class="salon-cards">
							{#each salons as salon}
								<label
									class="salon-card"
									class:selected={selectedSalon === salon.id}
								>
									<input
										type="radio"
										name="salon"
										value={salon.id}
										bind:group={selectedSalon}
										class="sr-only"
									/>
									<div class="salon-card-header">
										<span class="salon-city">{salon.city}</span>
										<span class="salon-country label-caps">{salon.country}</span>
									</div>
									<p class="salon-address">{salon.address}</p>
									<span class="salon-status label-caps">{salon.status}</span>
								</label>
							{/each}
						</div>
					</section>

					<!-- Section 02: Timepiece of Interest -->
					<section class="form-section">
						<div class="section-title-row">
							<span class="step-num label-caps accent-amber">STAGE 02</span>
							<h2 class="section-heading">TIMEPIECE OR CALIBRE OF INTEREST</h2>
						</div>
						<p class="section-sub">Select the primary model or movement you wish prepared for your arrival.</p>

						<div class="watch-select-grid">
							<label
								class="watch-choice-card"
								class:selected={selectedWatchId === 'all'}
							>
								<input
									type="radio"
									name="watch"
									value="all"
									bind:group={selectedWatchId}
									class="sr-only"
								/>
								<span class="watch-choice-code label-caps accent-amber">PORTFOLIO</span>
								<h3 class="watch-choice-title">Complete Manufacture Archive</h3>
								<p class="watch-choice-tag">All 6 calibres presented in bespoke walnut vitrine</p>
							</label>

							{#each watches as watch, i}
								<label
									class="watch-choice-card"
									class:selected={selectedWatchId === watch.id}
								>
									<input
										type="radio"
										name="watch"
										value={watch.id}
										bind:group={selectedWatchId}
										class="sr-only"
									/>
									<span class="watch-choice-code label-caps accent-amber">0{i + 1} / {watch.edition}</span>
									<h3 class="watch-choice-title">{watch.name}</h3>
									<p class="watch-choice-tag">{watch.tagline}</p>
								</label>
							{/each}
						</div>
					</section>

					<!-- Section 03: Date & Session Slot -->
					<section class="form-section">
						<div class="section-title-row">
							<span class="step-num label-caps accent-amber">STAGE 03</span>
							<h2 class="section-heading">PREFERRED DATE & SESSION</h2>
						</div>
						<p class="section-sub">Select your desired date and private viewing window.</p>

						<div class="datetime-row">
							<div class="field-group date-group">
								<label for="book-date" class="field-label label-caps">RESERVATION DATE</label>
								<input
									id="book-date"
									type="date"
									class="field-input date-input"
									bind:value={appointmentDate}
									required
								/>
							</div>

							<div class="field-group guests-group">
								<label for="book-guests" class="field-label label-caps">ACCOMPANYING GUESTS</label>
								<select id="book-guests" class="field-input" bind:value={guestCount}>
									<option value="1">Solo Consultation (1 Guest)</option>
									<option value="2">Private Pair (2 Guests)</option>
									<option value="3">Private Delegation (3–4 Guests)</option>
								</select>
							</div>
						</div>

						<div class="slot-cards">
							{#each timeSlots as slot}
								<label class="slot-card" class:selected={selectedSlot === slot.id}>
									<input
										type="radio"
										name="timeslot"
										value={slot.id}
										bind:group={selectedSlot}
										class="sr-only"
									/>
									<span class="slot-label label-caps">{slot.label}</span>
									<span class="slot-time">{slot.time}</span>
								</label>
							{/each}
						</div>
					</section>

					<!-- Section 04: Collector Dossier -->
					<section class="form-section">
						<div class="section-title-row">
							<span class="step-num label-caps accent-amber">STAGE 04</span>
							<h2 class="section-heading">COLLECTOR CREDENTIALS</h2>
						</div>
						<p class="section-sub">Discreet liaison details for confirmation and security credentials.</p>

						<div class="fields-grid">
							<div class="field-group salutation-group">
								<label for="salutation" class="field-label label-caps">TITLE</label>
								<select id="salutation" class="field-input" bind:value={salutation}>
									<option value="Mr.">Mr.</option>
									<option value="Ms.">Ms.</option>
									<option value="Mrs.">Mrs.</option>
									<option value="Dr.">Dr.</option>
									<option value="Prof.">Prof.</option>
									<option value="Lord">Lord</option>
									<option value="Lady">Lady</option>
								</select>
							</div>

							<div class="field-group name-group">
								<label for="fullName" class="field-label label-caps">FULL NAME *</label>
								<input
									id="fullName"
									type="text"
									class="field-input"
									placeholder="e.g. Jean-Luc Vauthier"
									bind:value={fullName}
									required
								/>
							</div>

							<div class="field-group">
								<label for="email" class="field-label label-caps">CONFIDENTIAL EMAIL *</label>
								<input
									id="email"
									type="email"
									class="field-input"
									placeholder="name@domain.com"
									bind:value={email}
									required
								/>
							</div>

							<div class="field-group">
								<label for="phone" class="field-label label-caps">PHONE / WHATSAPP *</label>
								<input
									id="phone"
									type="tel"
									class="field-input"
									placeholder="+41 22 555 0192"
									bind:value={phone}
									required
								/>
							</div>

							<div class="field-group">
								<label for="country" class="field-label label-caps">PRIMARY RESIDENCE</label>
								<input
									id="country"
									type="text"
									class="field-input"
									placeholder="e.g. Zurich, Switzerland"
									bind:value={countryOfResidence}
								/>
							</div>

							<div class="field-group">
								<label for="contactPref" class="field-label label-caps">CONTACT METHOD</label>
								<select id="contactPref" class="field-input" bind:value={contactPreference}>
									<option value="email">Encrypted Email</option>
									<option value="phone">Private Telephone Call</option>
									<option value="whatsapp">Discreet WhatsApp Liaison</option>
									<option value="courier">Private Courier Dossier</option>
								</select>
							</div>
						</div>
					</section>

					<!-- Section 05: Bespoke Requests & Wrist Sizing -->
					<section class="form-section">
						<div class="section-title-row">
							<span class="step-num label-caps accent-amber">STAGE 05</span>
							<h2 class="section-heading">BESPOKE NOTES & PROTOCOLS</h2>
						</div>
						<p class="section-sub">Inform our atelier of any tailoring, security, or refreshment preferences.</p>

						<div class="field-group">
							<label for="wristSize" class="field-label label-caps">APPROXIMATE WRIST CIRCUMFERENCE (OPTIONAL)</label>
							<input
								id="wristSize"
								type="text"
								class="field-input"
								placeholder="e.g. 175 mm / 6.9 inches (for pre-sized bracelet links)"
								bind:value={wristSize}
							/>
						</div>

						<div class="field-group" style="margin-top: 1rem;">
							<label for="bespokeNotes" class="field-label label-caps">ADDITIONAL REQUESTS & NOTES</label>
							<textarea
								id="bespokeNotes"
								rows="3"
								class="field-textarea"
								placeholder="Special complication inquiries, private suite security requirements, dietary/champagne preferences, or heritage timepiece trade-in queries..."
								bind:value={bespokeNotes}
							></textarea>
						</div>
					</section>

					<!-- Form Submission Button -->
					<div class="submit-row">
						<button
							type="submit"
							class="btn-pill btn-pill-primary submit-btn"
							disabled={isSubmitting}
						>
							{#if isSubmitting}
								<span>ENCRYPTING & TRANSMITTING DOSSIER...</span>
							{:else}
								<span>REQUEST PRIVATE APPOINTMENT →</span>
							{/if}
						</button>
						<p class="privacy-notice label-caps">
							PROTECTED BY SWISS FEDERAL DATA PROTECTION ACT (FADP). ABSOLUTE DISCRETION GUARANTEED.
						</p>
					</div>
				</form>

				<!-- Right Column: Live Booking Summary & Protocols -->
				<aside class="book-aside">
					<div class="summary-card">
						<div class="summary-header">
							<span class="label-caps accent-amber">LIAISON DOSSIER</span>
							<h3 class="summary-title">APPOINTMENT SUMMARY</h3>
						</div>

						<div class="summary-items">
							<div class="summary-row">
								<span class="summary-label label-caps">SALON</span>
								<span class="summary-value">{currentSalonObj.city}</span>
								<span class="summary-sub">{currentSalonObj.address}</span>
							</div>

							<div class="summary-row">
								<span class="summary-label label-caps">TIMEPIECE FOCUS</span>
								<span class="summary-value">{currentWatchObj.name}</span>
								<span class="summary-sub">{currentWatchObj.tagline}</span>
							</div>

							<div class="summary-row">
								<span class="summary-label label-caps">DATE & TIME</span>
								<span class="summary-value">{appointmentDate || 'Date Selected in Form'}</span>
								<span class="summary-sub">{currentSlotObj.label} ({currentSlotObj.time})</span>
							</div>

							<div class="summary-row">
								<span class="summary-label label-caps">ATTENDANCE</span>
								<span class="summary-value">{guestCount} Guest{guestCount === '1' ? '' : 's'}</span>
							</div>
						</div>

						<div class="protocol-box">
							<h4 class="protocol-title label-caps accent-amber">ATELIER SALON PROTOCOLS</h4>
							<ul class="protocol-list">
								<li>· 1-on-1 private liaison with Master Horologist</li>
								<li>· Dedicated sterile loupe & microfiber inspection bench</li>
								<li>· Complimentary vintage champagne & artisan coffee</li>
								<li>· Immediate wrist link sizing upon acquisition</li>
							</ul>
						</div>

						<div class="concierge-box">
							<span class="label-caps">DIRECT CONCIERGE LIAISON</span>
							<p class="concierge-phone">+41 32 933 88 40</p>
							<p class="concierge-email">liaison@vauthier-horlogerie.ch</p>
						</div>
					</div>
				</aside>
			</div>
		{:else}
			<!-- Confirmation Dossier View -->
			<div class="confirmation-stage">
				<div class="confirmation-card">
					<div class="conf-seal label-caps accent-amber">
						<span>VAUTHIER MANUFACTURE</span>
						<span class="conf-dot">·</span>
						<span>LE LOCLE SUISSE</span>
					</div>

					<h1 class="display-title conf-title">
						APPOINTMENT REQUEST<br />RECORDED
					</h1>

					<p class="conf-subtitle">
						Your confidential dossier has been transmitted to our senior salon liaison.
						A personal coordinator will contact you via {contactPreference.toUpperCase()} to finalize
						security protocols and building access credentials.
					</p>

					<div class="conf-dossier">
						<div class="conf-dossier-grid">
							<div class="dossier-cell">
								<span class="dossier-lbl label-caps">REFERENCE NUMBER</span>
								<span class="dossier-val accent-amber font-mono">{bookingReference}</span>
							</div>
							<div class="dossier-cell">
								<span class="dossier-lbl label-caps">REGISTERED GUEST</span>
								<span class="dossier-val">{salutation} {fullName}</span>
							</div>
							<div class="dossier-cell">
								<span class="dossier-lbl label-caps">SALON DESTINATION</span>
								<span class="dossier-val">{currentSalonObj.city}</span>
								<span class="dossier-sub">{currentSalonObj.address}</span>
							</div>
							<div class="dossier-cell">
								<span class="dossier-lbl label-caps">TIMEPIECE PREPARED</span>
								<span class="dossier-val">{currentWatchObj.name}</span>
							</div>
							<div class="dossier-cell">
								<span class="dossier-lbl label-caps">RESERVATION WINDOW</span>
								<span class="dossier-val">{appointmentDate} · {currentSlotObj.time}</span>
							</div>
							<div class="dossier-cell">
								<span class="dossier-lbl label-caps">STATUS</span>
								<span class="dossier-val accent-amber">LIAISON REVIEW PENDING</span>
							</div>
						</div>
					</div>

					<div class="conf-actions">
						<a href="/" class="btn-pill btn-pill-primary">
							RETURN TO MANUFACTURE HOME →
						</a>
						<button class="btn-pill btn-pill-ghost" onclick={resetForm}>
							MODIFY OR SUBMIT NEW DOSSIER
						</button>
					</div>

					<div class="conf-footer-note label-caps">
						DOSSIER REGISTERED AT LE LOCLE REGISTRY · TIMESTAMP: {submissionTimestamp}
					</div>
				</div>
			</div>
		{/if}
	</div>
</main>

<style>
	.book-page {
		padding-top: calc(var(--nav-height) + 2rem);
		padding-bottom: 6rem;
		min-height: 100vh;
		background: var(--color-ground);
		transition: background-color 0.3s ease;
	}

	.book-container {
		max-width: 1280px;
	}

	/* ── Breadcrumb ── */
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		margin-bottom: 2.5rem;
	}

	.crumb-link {
		color: var(--color-muted);
		transition: color 0.2s ease;
	}

	.crumb-link:hover {
		color: var(--color-amber);
	}

	.crumb-sep {
		color: var(--color-hairline);
	}

	.crumb-current {
		color: var(--color-ink);
	}

	/* ── Header ── */
	.book-header {
		margin-bottom: 3.5rem;
		max-width: 860px;
	}

	.hero-badge {
		display: inline-block;
		color: var(--color-amber);
		margin-bottom: 0.75rem;
	}

	.book-title {
		font-size: clamp(2.5rem, 5vw, 4.25rem);
		line-height: 0.95;
		margin-bottom: 1.5rem;
		color: var(--color-ink);
	}

	.book-intro {
		font-family: var(--font-body);
		font-size: 15px;
		line-height: 1.7;
		color: var(--color-secondary-ink);
		max-width: 680px;
	}

	/* ── Layout Grid ── */
	.book-grid {
		display: grid;
		grid-template-columns: 1fr 380px;
		gap: 3.5rem;
		align-items: start;
	}

	/* ── Form Sections ── */
	.form-section {
		margin-bottom: 3.5rem;
		padding-bottom: 3.5rem;
		border-bottom: 1px solid var(--color-hairline);
	}

	.section-title-row {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		margin-bottom: 0.35rem;
	}

	.step-num {
		font-size: 11px;
	}

	.section-heading {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		color: var(--color-ink);
	}

	.section-sub {
		font-size: 13px;
		color: var(--color-muted);
		margin-bottom: 1.75rem;
	}

	/* ── Salon Cards ── */
	.salon-cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 1rem;
	}

	.salon-card {
		display: flex;
		flex-direction: column;
		padding: 1.25rem;
		background: var(--color-surface);
		border: 1px solid var(--color-hairline);
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.salon-card:hover {
		border-color: var(--color-amber);
		transform: translateY(-2px);
	}

	.salon-card.selected {
		border-color: var(--color-amber);
		background: var(--color-secondary-ground);
		box-shadow: 0 0 0 1px var(--color-amber);
	}

	.salon-card-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.35rem;
	}

	.salon-city {
		font-family: var(--font-display);
		font-size: 14px;
		font-weight: 700;
		color: var(--color-ink);
	}

	.salon-country {
		font-size: 9.5px;
		color: var(--color-muted);
	}

	.salon-address {
		font-size: 12px;
		color: var(--color-secondary-ink);
		line-height: 1.4;
		margin-bottom: 0.75rem;
		flex: 1;
	}

	.salon-status {
		font-size: 9.5px;
		color: var(--color-teal);
	}

	/* ── Watch Selection Grid ── */
	.watch-select-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 1rem;
	}

	.watch-choice-card {
		display: flex;
		flex-direction: column;
		padding: 1.25rem;
		background: var(--color-surface);
		border: 1px solid var(--color-hairline);
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.watch-choice-card:hover {
		border-color: var(--color-amber);
		transform: translateY(-2px);
	}

	.watch-choice-card.selected {
		border-color: var(--color-amber);
		background: var(--color-secondary-ground);
		box-shadow: 0 0 0 1px var(--color-amber);
	}

	.watch-choice-code {
		font-size: 9.5px;
		margin-bottom: 0.35rem;
	}

	.watch-choice-title {
		font-family: var(--font-display);
		font-size: 13.5px;
		font-weight: 700;
		color: var(--color-ink);
		line-height: 1.3;
		margin-bottom: 0.35rem;
	}

	.watch-choice-tag {
		font-size: 11.5px;
		color: var(--color-secondary-ink);
		line-height: 1.4;
	}

	/* ── Datetime Row ── */
	.datetime-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.field-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.field-label {
		font-size: 10px;
		color: var(--color-secondary-ink);
	}

	.field-input,
	.field-textarea {
		width: 100%;
		padding: 0.75rem 1rem;
		background: var(--color-surface);
		border: 1px solid var(--color-hairline);
		border-radius: 4px;
		color: var(--color-ink);
		font-family: var(--font-body);
		font-size: 13.5px;
		transition: border-color 0.2s ease;
	}

	.field-input:focus,
	.field-textarea:focus {
		outline: none;
		border-color: var(--color-amber);
	}

	.date-input {
		color-scheme: inherit;
	}

	/* ── Slot Cards ── */
	.slot-cards {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.75rem;
	}

	.slot-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem 0.5rem;
		background: var(--color-surface);
		border: 1px solid var(--color-hairline);
		border-radius: 4px;
		cursor: pointer;
		text-align: center;
		transition: all 0.2s ease;
	}

	.slot-card:hover {
		border-color: var(--color-amber);
	}

	.slot-card.selected {
		border-color: var(--color-amber);
		background: var(--color-secondary-ground);
		box-shadow: 0 0 0 1px var(--color-amber);
	}

	.slot-label {
		font-size: 9.5px;
		margin-bottom: 0.25rem;
	}

	.slot-time {
		font-size: 12px;
		font-weight: 600;
		color: var(--color-ink);
	}

	/* ── Fields Grid ── */
	.fields-grid {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 1.25rem;
	}

	.fields-grid > :nth-child(n + 3) {
		grid-column: span 1;
	}

	@media (max-width: 600px) {
		.fields-grid {
			grid-template-columns: 1fr;
		}
		.fields-grid > :nth-child(n + 3) {
			grid-column: span 1;
		}
	}

	.field-textarea {
		resize: vertical;
		min-height: 80px;
	}

	/* ── Submit Row ── */
	.submit-row {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-top: 1rem;
	}

	.submit-btn {
		width: 100%;
		padding: 1rem 2rem;
		font-size: 12px;
		letter-spacing: 0.16em;
	}

	.privacy-notice {
		font-size: 9.5px;
		color: var(--color-muted);
		text-align: center;
		line-height: 1.5;
	}

	/* ── Summary Sidebar ── */
	.book-aside {
		position: sticky;
		top: calc(var(--nav-height) + 2rem);
	}

	.summary-card {
		background: var(--color-secondary-ground);
		border: 1px solid var(--color-hairline);
		border-radius: 8px;
		padding: 2rem;
	}

	.summary-header {
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-hairline);
	}

	.summary-title {
		font-family: var(--font-display);
		font-size: 16px;
		font-weight: 700;
		color: var(--color-ink);
		margin-top: 0.25rem;
	}

	.summary-items {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		margin-bottom: 1.75rem;
	}

	.summary-row {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.summary-label {
		font-size: 9.5px;
		color: var(--color-muted);
	}

	.summary-value {
		font-size: 13.5px;
		font-weight: 600;
		color: var(--color-ink);
	}

	.summary-sub {
		font-size: 11.5px;
		color: var(--color-secondary-ink);
		line-height: 1.4;
	}

	.protocol-box {
		padding: 1.25rem;
		background: var(--color-surface);
		border: 1px solid var(--color-hairline-subtle);
		border-radius: 6px;
		margin-bottom: 1.5rem;
	}

	.protocol-title {
		font-size: 10px;
		margin-bottom: 0.75rem;
	}

	.protocol-list {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		font-size: 11.5px;
		color: var(--color-secondary-ink);
		line-height: 1.5;
	}

	.concierge-box {
		padding-top: 1rem;
		border-top: 1px solid var(--color-hairline-subtle);
	}

	.concierge-phone {
		font-family: var(--font-display);
		font-size: 14px;
		font-weight: 700;
		color: var(--color-ink);
		margin-top: 0.25rem;
	}

	.concierge-email {
		font-size: 12px;
		color: var(--color-muted);
	}

	/* ── Confirmation View ── */
	.confirmation-stage {
		max-width: 820px;
		margin: 2rem auto;
	}

	.confirmation-card {
		background: var(--color-secondary-ground);
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		padding: clamp(2.5rem, 6vw, 4rem);
		text-align: center;
		box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.4);
	}

	.conf-seal {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		letter-spacing: 0.16em;
	}

	.conf-dot {
		opacity: 0.5;
	}

	.conf-title {
		font-size: clamp(2rem, 4.5vw, 3.25rem);
		line-height: 1.05;
		margin-bottom: 1.5rem;
	}

	.conf-subtitle {
		font-size: 14.5px;
		color: var(--color-secondary-ink);
		line-height: 1.7;
		max-width: 620px;
		margin: 0 auto 2.5rem;
	}

	.conf-dossier {
		background: var(--color-surface);
		border: 1px solid var(--color-hairline);
		border-radius: 8px;
		padding: 2rem;
		margin-bottom: 2.5rem;
		text-align: left;
	}

	.conf-dossier-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	.dossier-cell {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.dossier-lbl {
		font-size: 9.5px;
		color: var(--color-muted);
	}

	.dossier-val {
		font-size: 14px;
		font-weight: 600;
		color: var(--color-ink);
	}

	.dossier-sub {
		font-size: 12px;
		color: var(--color-secondary-ink);
	}

	.font-mono {
		font-family: monospace;
		letter-spacing: 0.12em;
		font-size: 15px;
	}

	.conf-actions {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.conf-footer-note {
		font-size: 9.5px;
		color: var(--color-muted);
	}

	/* ── Helper ── */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* ── Responsive ── */
	@media (max-width: 960px) {
		.book-grid {
			grid-template-columns: 1fr;
		}

		.book-aside {
			position: static;
			margin-top: 2rem;
		}

		.slot-cards {
			grid-template-columns: repeat(2, 1fr);
		}

		.datetime-row {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.conf-dossier-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
