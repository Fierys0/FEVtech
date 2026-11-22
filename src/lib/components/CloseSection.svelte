<script>
	// Interaktivitas DOM & JS: State Management Modal Konsultasi
	let isModalOpen = $state(false);
	let formSuccess = $state(false);
	let name = $state('');
	let email = $state('');
	let city = $state('Geneva');
	let timepiece = $state('Meridian Chronograph');

	function handleFormSubmit(e) {
		e.preventDefault();
		formSuccess = true;
		setTimeout(() => {
			isModalOpen = false;
			formSuccess = false;
		}, 2000);
	}
</script>

<!-- Komponen Semantik HTML: <section> -->
<section class="close-section" id="close">
	<div class="container close-inner">
		<!-- Top Row: Headline + Fine Print on left, Two Buttons on opposite edge -->
		<div class="close-top-row">
			<div class="close-text-col">
				<span class="label-caps close-tag">06 / ACQUISITION</span>
				<h2 class="display-title close-headline">
					ACQUIRE<br />A LEGACY.
				</h2>
				<p class="close-fine-print">
					Each timepiece is hand-assembled in limited series, chronometer-tested by
					COSC, and permanently recorded into the perpetual manufacture registry at Le
					Locle. Private liaison consultations arranged upon request.
				</p>
			</div>

			<div class="close-actions-col">
				<!-- Interaktivitas DOM: Trigger Modal -->
				<button
					class="btn-pill btn-pill-primary"
					onclick={() => (isModalOpen = true)}
				>
					Book Consultation
				</button>
				<!-- Navigasi Antar-Halaman menuju /book -->
				<a
					href="/book"
					class="btn-pill btn-pill-ghost"
				>
					Book Appointment →
				</a>
			</div>
		</div>

		<!-- Komponen Semantik HTML: <footer> -->
		<footer class="footer-strip">
			<div class="strip-left label-caps">
				<span>VAUTHIER HORLOGERIE S.A.</span>
				<span class="strip-sep">/</span>
				<span>RUE DU MARAIS 12, 2400 LE LOCLE, SUISSE</span>
			</div>

			<!-- Navigasi Antar-Halaman -->
			<div class="strip-center label-caps">
				<a href="/" class="foot-link">HOME</a>
				<span class="strip-sep">·</span>
				<a href="/book" class="foot-link">BOOK APPOINTMENT</a>
				<span class="strip-sep">·</span>
				<a href="/#calibre-3d" class="foot-link">3D LABORATORY</a>
			</div>

			<div class="strip-right label-caps">
				<span>SWISS REG. NO. 884-VA</span>
				<span class="strip-sep">/</span>
				<span>© 2024 VAUTHIER</span>
			</div>
		</footer>
	</div>

	<!-- Massive full width wordmark translated down slightly so the page edge crops it -->
	<div class="cropped-wordmark-container" aria-hidden="true">
		<div class="cropped-wordmark">
			VAUTHIER
		</div>
	</div>

	<!-- Interaktivitas DOM & JS: Private Consultation Modal Dialog -->
	{#if isModalOpen}
		<div
			class="modal-backdrop"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<div class="modal-card">
				<div class="modal-header">
					<div>
						<span class="label-caps">PRIVATE SALON CONSULTATION</span>
						<h3 id="modal-title" class="display-title modal-title">
							LIAISON REQUEST
						</h3>
					</div>
					<button
						class="modal-close-btn"
						aria-label="Close"
						onclick={() => (isModalOpen = false)}
					>
						✕
					</button>
				</div>

				{#if formSuccess}
					<div class="modal-success">
						<p class="success-heading">REQUEST TRANSMITTED</p>
						<p class="label-caps">
							OUR CONCIERGE AT LE LOCLE WILL CONTACT YOU WITHIN 24 HOURS.
						</p>
					</div>
				{:else}
					<!-- Komponen Semantik HTML: <form> -->
					<form class="modal-form" onsubmit={handleFormSubmit}>
						<div class="form-group">
							<label for="c-name" class="label-caps">YOUR FULL NAME</label>
							<input
								id="c-name"
								type="text"
								bind:value={name}
								required
								placeholder="e.g. Lord Sterling"
								class="form-input"
							/>
						</div>

						<div class="form-group">
							<label for="c-email" class="label-caps">CONFIDENTIAL EMAIL</label>
							<input
								id="c-email"
								type="email"
								bind:value={email}
								required
								placeholder="client@domain.ch"
								class="form-input"
							/>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="c-city" class="label-caps">PREFERRED SALON</label>
								<select id="c-city" bind:value={city} class="form-select">
									<option value="Geneva">Geneva Atelier</option>
									<option value="Zurich">Zurich Salon</option>
									<option value="Tokyo">Tokyo Suite</option>
									<option value="New York">New York Salon</option>
									<option value="London">London Private</option>
								</select>
							</div>

							<div class="form-group">
								<label for="c-piece" class="label-caps">DESIRED REFERENCE</label>
								<select id="c-piece" bind:value={timepiece} class="form-select">
									<option value="Meridian Chronograph">Meridian Chronograph</option>
									<option value="Boccia Titanium">Boccia Titanium Perpetual</option>
									<option value="Phantom Royale">Phantom Royale Atelier</option>
									<option value="Nautilus Grand Sport">Nautilus Grand Sport</option>
								</select>
							</div>
						</div>

						<div class="form-actions">
							<button type="submit" class="btn-pill btn-pill-primary">
								Transmit Request
							</button>
							<button
								type="button"
								class="btn-pill btn-pill-ghost"
								onclick={() => (isModalOpen = false)}
							>
								Cancel
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	{/if}
</section>

<style>
	/* Desain Tata Letak & Styling CSS */
	.close-section {
		padding-top: clamp(5rem, 10vw, 8rem);
		padding-bottom: 0;
		background: var(--color-ground);
		position: relative;
		overflow: hidden;
	}

	.close-inner {
		display: flex;
		flex-direction: column;
	}

	/* ── Top Row ── */
	.close-top-row {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 3rem;
		margin-bottom: clamp(4rem, 8vw, 6.5rem);
		flex-wrap: wrap;
	}

	.close-text-col {
		max-width: 580px;
	}

	.close-tag {
		margin-bottom: 1.5rem;
		display: block;
	}

	.close-headline {
		font-size: clamp(38px, 5.5vw, 76px);
		line-height: 1.05;
		margin-bottom: 1.75rem;
	}

	.close-fine-print {
		font-family: var(--font-body);
		font-size: 13.5px;
		line-height: 1.75;
		color: var(--color-secondary-ink);
	}

	.close-actions-col {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	/* ── Hairline Footer Strip ── */
	.footer-strip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-block: 1.75rem;
		border-top: 1px solid var(--color-hairline);
		border-bottom: 1px solid var(--color-hairline);
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.strip-left,
	.strip-right,
	.strip-center {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		color: var(--color-muted);
	}

	.foot-link {
		color: var(--color-secondary-ink);
		transition: color 0.2s ease;
	}

	.foot-link:hover {
		color: var(--color-amber);
	}

	.strip-sep {
		color: var(--color-hairline);
	}

	/* ── Cropped Wordmark ── */
	.cropped-wordmark-container {
		width: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		line-height: 0.72;
		pointer-events: none;
		user-select: none;
	}

	.cropped-wordmark {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(80px, 20vw, 300px);
		letter-spacing: -0.03em;
		color: var(--color-ink);
		text-align: center;
		width: 100%;
		transform: translateY(18%);
		opacity: 0.92;
	}

	/* ── Modal ── */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(10, 12, 14, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000;
		padding: var(--page-margin);
	}

	.modal-card {
		background: var(--color-secondary-ground);
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		width: 100%;
		max-width: 520px;
		padding: 2.25rem;
		box-shadow: 0 32px 80px -16px rgba(0, 0, 0, 0.8);
	}

	.modal-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		border-bottom: 1px solid var(--color-hairline);
		padding-bottom: 1.25rem;
		margin-bottom: 1.75rem;
	}

	.modal-title {
		font-size: 22px;
		margin-top: 0.25rem;
	}

	.modal-close-btn {
		font-size: 16px;
		color: var(--color-muted);
		padding: 4px 8px;
		transition: color 0.2s ease;
	}

	.modal-close-btn:hover {
		color: var(--color-ink);
	}

	.modal-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.form-input,
	.form-select {
		background: var(--color-ground);
		border: 1px solid var(--color-hairline);
		border-radius: 6px;
		padding: 0.75rem 1rem;
		font-family: var(--font-body);
		font-size: 13.5px;
		color: var(--color-ink);
		outline: none;
		transition: border-color 0.2s ease;
	}

	.form-input:focus,
	.form-select:focus {
		border-color: var(--color-amber);
	}

	.form-actions {
		display: flex;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	.modal-success {
		padding: 3rem 1rem;
		text-align: center;
	}

	.success-heading {
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 700;
		color: var(--color-amber);
		margin-bottom: 0.75rem;
	}

	/* Desain Responsif: Breakpoint Mobile & Tablet */
	@media (max-width: 768px) {
		.close-top-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 2rem;
		}

		.footer-strip {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
