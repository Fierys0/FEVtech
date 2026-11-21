<script>
	// Interaktivitas DOM & JS: State Tema Gelap / Terang
	// Interaktivitas DOM & JS: State Tema Gelap / Terang
	import { theme, toggleTheme } from '$lib/stores/theme.js';
</script>

<button
	class="theme-toggle-btn"
	onclick={toggleTheme}
	aria-label={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	title={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
	<span class="theme-dot" class:is-light={$theme === 'light'} aria-hidden="true"></span>
	<span class="label-caps theme-text">
		{$theme === 'dark' ? 'LIGHT' : 'DARK'}
	</span>
	<span class="theme-icon" aria-hidden="true">
		{#if $theme === 'dark'}
			<!-- Sun Icon (mode terang) -->
			<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="12" cy="12" r="5"></circle>
				<line x1="12" y1="1" x2="12" y2="3"></line>
				<line x1="12" y1="21" x2="12" y2="23"></line>
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
				<line x1="1" y1="12" x2="3" y2="12"></line>
				<line x1="21" y1="12" x2="23" y2="12"></line>
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
				<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
			</svg>
		{:else}
			<!-- Moon Icon (mode malam / night mode) -->
			<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
			</svg>
		{/if}
	</span>
</button>

<style>
	/* Styling CSS Tombol Theme Toggle */
	/* Styling CSS Tombol Theme Toggle */
	.theme-toggle-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.45rem 0.85rem;
		border-radius: 9999px;
		border: 1px solid var(--color-hairline);
		background: transparent;
		color: var(--color-ink);
		cursor: pointer;
		transition: border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
	}

	.theme-toggle-btn:hover {
		border-color: var(--color-amber);
		color: var(--color-amber);
		transform: scale(1.02);
	}

	.theme-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--color-amber);
		transition: background-color 0.25s ease;
	}

	.theme-dot.is-light {
		background: var(--color-teal);
	}

	.theme-text {
		font-size: 9.5px;
		font-weight: 600;
		letter-spacing: 0.12em;
	}

	.theme-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.85;
	}
</style>
