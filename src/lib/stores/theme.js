/**
 * Interaktivitas DOM menggunakan JS: Pengontrol Tema Night / Light Mode
 * Memanipulasi atribut data-theme pada document.documentElement dan menyimpan preferensi ke localStorage.
 */

import { writable } from 'svelte/store';

export const theme = writable('dark');

/**
 * Inisialisasi tema dari localStorage atau preferensi sistem browser
 */
export function initTheme() {
	if (typeof window === 'undefined') return;
	const saved = localStorage.getItem('vtech-theme');
	const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const initial = saved || (systemDark ? 'dark' : 'light');
	theme.set(initial);
	// DOM Manipulation: Mengubah atribut data-theme pada root elemen <html>
	document.documentElement.setAttribute('data-theme', initial);
}

/**
 * Toggle beralih antara Night Mode (dark) dan Light Mode (light)
 */
export function toggleTheme() {
	theme.update((current) => {
		const next = current === 'dark' ? 'light' : 'dark';
		if (typeof window !== 'undefined') {
			localStorage.setItem('vtech-theme', next);
			// DOM Manipulation: Menyetel atribut data-theme secara dinamis
			document.documentElement.setAttribute('data-theme', next);
		}
		return next;
	});
}

/**
 * Menyetel tema tertentu secara eksplisit
 */
export function setTheme(next) {
	if (typeof window !== 'undefined') {
		localStorage.setItem('vtech-theme', next);
		document.documentElement.setAttribute('data-theme', next);
	}
	theme.set(next);
}
