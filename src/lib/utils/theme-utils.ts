import type { Theme } from '$lib/types/theme';
import { browser } from '$app/environment';

export class ThemeUtils {
	static getStoredTheme(): Theme {
		if (!browser) return 'system';
		return (localStorage.getItem('theme') as Theme) || 'system';
	}

	static getSystemPreference(): 'light' | 'dark' {
		if (!browser) return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	static getEffectiveTheme(theme: Theme): 'light' | 'dark' {
		let systemPreference = this.getSystemPreference();
		return theme === 'system' ? systemPreference : theme;
	}

	static updateDocumentClass(theme: Theme): void {
		if (!browser) return;

		const effectiveTheme = this.getEffectiveTheme(theme);
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(effectiveTheme);
	}

	static persistTheme(theme: Theme): void {
		if (!browser) return;
		localStorage.setItem('theme', theme);
	}
}
