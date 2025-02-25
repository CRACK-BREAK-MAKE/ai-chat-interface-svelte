<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import CodeBlock from "$lib/components/CodeBlock.svelte";

	const { content } = $props();

	// Parse content to separate markdown text and code blocks
	function parseContent(text: string) {
		const parts = [];
		const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;

		let lastIndex = 0;
		let match;

		while ((match = codeBlockRegex.exec(text)) !== null) {
			// Add text before the code block
			if (match.index > lastIndex) {
				parts.push({
					type: 'text',
					content: text.slice(lastIndex, match.index)
				});
			}

			// Add the code block
			parts.push({
				type: 'code',
				language: match[1] || '',
				content: match[2]
			});

			lastIndex = match.index + match[0].length;
		}

		// Add remaining text after last code block
		if (lastIndex < text.length) {
			parts.push({
				type: 'text',
				content: text.slice(lastIndex)
			});
		}

		return parts;
	}

	const contentParts = $derived(parseContent(content));
</script>

<div>
    {#each contentParts as part}
        {#if part.type === 'text'}
            <SvelteMarkdown source={part.content} />
        {:else if part.type === 'code'}
            <CodeBlock code={part.content} language={part.language} />
        {/if}
    {/each}
</div>
