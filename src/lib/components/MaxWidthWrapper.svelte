<script lang="ts">
	let { fullWidth = false, maxWidth = 'max-w-5xl', class_ = '', children } = $props();
	const containerClass = $derived(`mx-auto ${fullWidth ? 'w-full' : maxWidth} px-4 sm:px-6 lg:px-8 ${class_}`.trim());
</script>

<div class={containerClass}>
    {@render children?.()}
</div>
