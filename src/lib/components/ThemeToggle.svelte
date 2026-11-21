<script>
	import { theme, toggleTheme } from '$lib/stores/theme.js';
</script>

<button
	class="theme-toggle"
	onclick={toggleTheme}
	aria-label={$theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
	title={$theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
>
	<div class="icon-wrapper" class:is-dark={$theme === 'dark'}>
		<!-- Sun icon (shown in dark mode) -->
		<svg
			class="theme-icon icon-sun"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="5" />
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</svg>

		<!-- Moon icon (shown in light mode) -->
		<svg
			class="theme-icon icon-moon"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	</div>
</button>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background: var(--color-surface);
		border: 1px solid var(--color-hairline);
		color: var(--color-primary);
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
		flex-shrink: 0;
	}

	.theme-toggle:hover {
		border-color: var(--color-gold);
		color: var(--color-gold);
		transform: scale(1.06);
		box-shadow: 0 0 16px var(--color-gold-light);
	}

	.icon-wrapper {
		position: relative;
		width: 18px;
		height: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.theme-icon {
		position: absolute;
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
	}

	/* In light mode: show moon, hide sun */
	.icon-sun {
		opacity: 0;
		transform: rotate(-90deg) scale(0.5);
	}

	.icon-moon {
		opacity: 1;
		transform: rotate(0deg) scale(1);
	}

	/* In dark mode: show sun, hide moon */
	.icon-wrapper.is-dark .icon-sun {
		opacity: 1;
		transform: rotate(0deg) scale(1);
	}

	.icon-wrapper.is-dark .icon-moon {
		opacity: 0;
		transform: rotate(90deg) scale(0.5);
	}
</style>
