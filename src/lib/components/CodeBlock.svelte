<script lang="ts">
	import { Copy, Check } from 'lucide-svelte';
	import {highlightCode} from "$lib/utils/highlight-store";

	const { code, language } = $props();

	let copied = $state(false);
	let codeElement = $state<HTMLElement | null>(null);
	let highlighted = $state(false);

	// Reset copied state after delay
	$effect(() => {
		if (copied) {
			const timeout = setTimeout(() => {
				copied = false;
			}, 2000);

			return () => clearTimeout(timeout);
		}
	});

	// Apply syntax highlighting when codeElement is available
	$effect(() => {
		if (codeElement && !highlighted) {
			// Use async IIFE to handle the Promise
			(async () => {
				try {
					const html = await highlightCode(code, language);
					if (codeElement) {
						codeElement.innerHTML = html;
						highlighted = true;
					}
				} catch (error) {
					console.error('Error highlighting code:', error);
					if (codeElement) {
						codeElement.textContent = code;
					}
				}
			})();
		}
	});

	// Handle copy to clipboard
	function copyToClipboard() {
		navigator.clipboard.writeText(code).then(() => {
			copied = true;
		}).catch(error => {
			console.error('Failed to copy code:', error);
		});
	}
</script>

<div class="relative rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-zinc-900 max-w-2xl">
    <!-- Header with language and copy button -->
    <div class="flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-zinc-200">
        <span class="text-sm font-mono">{language || 'code'}</span>

        <button
            class="p-2 rounded-md bg-gray-300 dark:bg-zinc-700 text-gray-700 dark:text-gray-300
             hover:bg-gray-400 dark:hover:bg-zinc-600 hover:text-black dark:hover:text-white 
             transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            onclick={copyToClipboard}
            aria-label="Copy code to clipboard"
        >
            {#if copied}
                <Check class="w-4 h-4 text-green-500" />
            {:else}
                <Copy class="w-4 h-4" />
            {/if}
        </button>
    </div>

    <!-- Code content with proper formatting -->
    <div class="relative">
    <pre class="px-4 py-3 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 dark:scrollbar-thumb-zinc-600 dark:hover:scrollbar-thumb-zinc-500">
      <code bind:this={codeElement} class="font-mono text-sm block whitespace-pre overflow-visible">{code}</code>
    </pre>
    </div>
</div>
