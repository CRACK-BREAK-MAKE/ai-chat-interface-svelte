<script lang="ts">
	import { Copy } from 'lucide-svelte';

	export let language: string = '';
	export let code: string;

	let copied = false;

	function copyToClipboard() {
		navigator.clipboard.writeText(code).then(() => {
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		});
	}
</script>

<div class="relative group">
    <pre><code class="language-{language}">{code}</code></pre>
    <button
        on:click={copyToClipboard}
        class="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
        title="Copy to clipboard"
    >
        <Copy size={16} />
    </button>
    {#if copied}
        <span class="absolute top-2 right-12 text-sm text-green-500">Copied!</span>
    {/if}
</div>

<style>
    pre {
        @apply bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto;
    }
    code {
        @apply font-mono text-sm;
    }
</style>
