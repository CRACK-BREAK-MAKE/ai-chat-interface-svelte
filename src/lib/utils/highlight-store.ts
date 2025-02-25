import { browser } from '$app/environment';

// Lazy load highlight.js only on the client
let hljs: typeof import('highlight.js').default | null = null;

/**
 * Lazy loads highlight.js and applies syntax highlighting
 * @param code The code to highlight
 * @param language The language to use for highlighting
 * @returns The highlighted HTML string
 */
export async function highlightCode(code: string, language?: string): Promise<string> {
	if (!browser) {
		return code; // Server-side rendering, return plain code
	}

	if (!hljs) {
		// Dynamically import highlight.js only when needed
		const module = await import('highlight.js');
		hljs = module.default;

		// Import the CSS only once
		if (!document.querySelector('link[href*="highlight.js"]')) {
			await import('highlight.js/styles/github-dark.css');
		}
	}

	try {
		if (language && hljs.getLanguage(language)) {
			return hljs.highlight(code, { language }).value;
		} else {
			return hljs.highlightAuto(code).value;
		}
	} catch (e) {
		console.error("Highlighting error:", e);
		return code;
	}
}
