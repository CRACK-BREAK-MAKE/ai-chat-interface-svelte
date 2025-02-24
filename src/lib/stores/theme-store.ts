import { writable } from 'svelte/store';
import type { Theme } from '$lib/types/theme';
import { ThemeUtils } from '$lib/utils/theme-utils';
import { browser } from '$app/environment';

export interface ThemeStore {
	subscribe: (callback: (value: Theme) => void) => () => void;
	setTheme: (theme: Theme) => void;
	toggle: () => void;
}

function createThemeStore(): ThemeStore {
	const initialTheme = ThemeUtils.getStoredTheme();
	const { subscribe, set } = writable<Theme>(initialTheme);

	// Initialize system theme listener
	if (browser) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			const currentTheme = ThemeUtils.getStoredTheme();
			if (currentTheme === 'system') {
				ThemeUtils.updateDocumentClass('system');
			}
		});
	}

	function setTheme(newTheme: Theme) {
		ThemeUtils.persistTheme(newTheme);
		ThemeUtils.updateDocumentClass(newTheme);
		set(newTheme);
	}

	function toggle() {
		const currentTheme = ThemeUtils.getStoredTheme();
		setTheme(currentTheme === 'light' ? 'dark' : 'light');
	}

	// Initialize theme
	if (browser) {
		ThemeUtils.updateDocumentClass(initialTheme);
	}

	return {
		subscribe,
		setTheme,
		toggle
	};
}

export const themeStore = createThemeStore();
