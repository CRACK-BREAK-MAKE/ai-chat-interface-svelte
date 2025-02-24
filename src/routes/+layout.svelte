<script lang="ts">
	import '../app.css';
	import Header from "$lib/components/Header.svelte";

	let {children} = $props();
</script>
<div class="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 shadow-sm">
    <Header />
    <main class="flex-1 overflow-hidden flex justify-center">
        {@render children?.()}
    </main>
</div>
