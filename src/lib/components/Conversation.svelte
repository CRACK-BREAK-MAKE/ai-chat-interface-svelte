<script lang="ts">
	import { BotMessageSquare, User } from 'lucide-svelte';
	import { chatStore } from '$lib/stores/chat-store';
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';

	let conversationContainer: HTMLDivElement;

	$effect(() => {
		if (conversationContainer && $chatStore.length) {
			requestAnimationFrame(() => {
				conversationContainer.scrollTo({
					top: conversationContainer.scrollHeight,
					behavior: 'smooth'
				});
			});
		}
	});
</script>

<div
    class="flex-1 overflow-y-auto p-6 mx-4 space-y-4 font-inter scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 rounded-b"
    bind:this={conversationContainer}
>
    {#each $chatStore as message (message.id)}
        <div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div class="flex items-start space-x-3 py-6 px-4 max-w-3xl
                {message.role === 'user'
                  ? 'bg-blue-100 dark:bg-zinc-900 text-black dark:text-neutral-300 shadow-lg'
                  : 'bg-white dark:bg-stone-950/40 text-black dark:text-neutral-300 shadow-lg'}
                rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:shadow-xl">
                <div class="shrink-0 mt-1">
                    {#if message.role === 'user'}
                        <User class="w-5 h-5 animate-pulse"/>
                    {:else}
                        <BotMessageSquare class="w-5 h-5 animate-bounce"/>
                    {/if}
                </div>
                <div class="flex-1 leading-7 tracking-wide text-[16px] font-normal selection:bg-blue-200 selection:text-blue-900">
                    <MarkdownRenderer content={message.content}/>
                </div>
            </div>
        </div>
    {/each}
</div>
