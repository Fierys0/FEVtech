<script>
	import { reveal } from '$lib/actions/animate.js';

	const linkColumns = [
		{
			title: 'Collections',
			links: [
				{ label: 'Classic', href: '#' },
				{ label: 'Chronograph', href: '#' },
				{ label: 'Limited Edition', href: '#' },
				{ label: 'New Arrivals', href: '#' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'Our Story', href: '#' },
				{ label: 'Craftsmanship', href: '#' },
				{ label: 'Careers', href: '#' },
				{ label: 'Press', href: '#' }
			]
		},
		{
			title: 'Support',
			links: [
				{ label: 'Contact', href: '#' },
				{ label: 'Warranty', href: '#' },
				{ label: 'Shipping', href: '#' },
				{ label: 'Care Guide', href: '#' }
			]
		}
	];

	const socialLinks = [
		{
			label: 'Instagram',
			href: '#',
			icon: 'M7.8 2h8.4C19 2 22 5 22 7.8v8.4c0 2.8-3 5.8-5.8 5.8H7.8C5 22 2 19 2 16.2V7.8C2 5 5 2 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6'
		},
		{
			label: 'X',
			href: '#',
			icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
		},
		{
			label: 'YouTube',
			href: '#',
			icon: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z'
		}
	];
</script>

<footer class="footer" id="footer">
	<div class="footer-inner container">
		<div class="footer-grid" use:reveal={{ y: 25 }}>
			<div class="footer-brand">
				<a href="/" class="footer-logo" aria-label="VTECH Home">
					<span class="logo-v">V</span><span class="logo-rest">TECH</span>
				</a>
				<p class="footer-tagline">Precision. Craft. Legacy.</p>
			</div>

			{#each linkColumns as column}
				<div class="footer-column">
					<h4 class="footer-column-title">{column.title}</h4>
					<ul class="footer-links">
						{#each column.links as link}
							<li>
								<a href={link.href} class="footer-link">{link.label}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="footer-bottom" use:reveal={{ y: 15, delay: 200 }}>
			<div class="social-links">
				{#each socialLinks as social}
					<a
						href={social.href}
						class="social-link"
						aria-label={social.label}
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d={social.icon} />
						</svg>
					</a>
				{/each}
			</div>

			<div class="footer-legal">
				<p class="copyright">© 2024 VTECH Timepieces. All rights reserved.</p>
				<p class="footer-note">
					Prices shown are MSRP and may vary by region. VTECH is a fictional
					brand created for educational purposes.
				</p>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background-color: var(--color-alt-ground);
		padding-top: var(--band-top);
		padding-bottom: 2.5rem;
	}

	.footer-inner {
		display: flex;
		flex-direction: column;
	}

	/* ── Grid ── */
	.footer-grid {
		display: grid;
		grid-template-columns: 1.5fr repeat(3, 1fr);
		gap: 3rem;
		padding-bottom: 3rem;
		border-bottom: 1px solid var(--color-hairline);
	}

	/* ── Brand ── */
	.footer-logo {
		font-family: var(--font-display);
		font-size: 1.375rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--color-primary);
		text-decoration: none;
		display: inline-block;
		margin-bottom: 0.5rem;
	}

	.logo-v {
		color: var(--color-accent);
	}

	.footer-tagline {
		font-family: var(--font-body);
		font-style: italic;
		font-size: 0.9375rem;
		color: var(--color-muted);
	}

	/* ── Columns ── */
	.footer-column-title {
		font-family: var(--font-display);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-primary);
		margin-bottom: 1.25rem;
	}

	.footer-links {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.footer-link {
		font-family: var(--font-body);
		font-size: 0.9375rem;
		color: var(--color-secondary);
		text-decoration: none;
		transition: color 0.2s ease, transform 0.2s ease;
		display: inline-block;
	}

	.footer-link:hover {
		color: var(--color-primary);
		transform: translateX(3px);
	}

	/* ── Bottom ── */
	.footer-bottom {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 2rem;
		padding-top: 2rem;
	}

	.social-links {
		display: flex;
		gap: 0.75rem;
		flex-shrink: 0;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		color: var(--color-secondary);
		transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
	}

	.social-link:hover {
		color: var(--color-primary);
		background-color: var(--color-hairline);
		transform: scale(1.1);
	}

	.footer-legal {
		text-align: right;
	}

	.copyright {
		font-family: var(--font-body);
		font-size: 0.8125rem;
		color: var(--color-muted);
		margin-bottom: 0.25rem;
	}

	.footer-note {
		font-family: var(--font-body);
		font-size: 0.75rem;
		color: var(--color-muted);
		opacity: 0.7;
	}

	/* ── Responsive ── */
	@media (max-width: 768px) {
		.footer-grid {
			grid-template-columns: 1fr 1fr;
			gap: 2.5rem;
		}

		.footer-brand {
			grid-column: 1 / -1;
		}

		.footer-bottom {
			flex-direction: column;
			align-items: flex-start;
		}

		.footer-legal {
			text-align: left;
		}
	}

	@media (max-width: 480px) {
		.footer-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
