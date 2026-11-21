import { writable } from 'svelte/store';

export const theme = writable('light');

/**
 * Initialize theme from localStorage or system preference.
 */
export function initTheme() {
	if (typeof window === 'undefined') return;
	const saved = localStorage.getItem('vtech-theme');
	const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const initial = saved || (systemDark ? 'dark' : 'light');
	theme.set(initial);
	document.documentElement.setAttribute('data-theme', initial);
}

/**
 * Toggle between light and dark themes.
 */
export function toggleTheme() {
	theme.update((current) => {
		const next = current === 'dark' ? 'light' : 'dark';
		if (typeof window !== 'undefined') {
			localStorage.setItem('vtech-theme', next);
			document.documentElement.setAttribute('data-theme', next);
		}
		return next;
	});
}

/**
 * Set an explicit theme ('light' or 'dark').
 */
export function setTheme(next) {
	if (typeof window !== 'undefined') {
		localStorage.setItem('vtech-theme', next);
		document.documentElement.setAttribute('data-theme', next);
	}
	theme.set(next);
}
