<script lang="ts">
	import {BotMessageSquare, User} from 'lucide-svelte';
	import {chatStore} from '$lib/stores/chat-store';
	import SvelteMarkdown from "svelte-markdown";

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
    class="flex-1 overflow-y-auto p-6 space-y-4 font-inter scroll-smooth"
    bind:this={conversationContainer}
>
    {#each $chatStore as message (message.id)}
        <div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in">
            <div class="flex items-start space-x-3 p-4
        {message.role === 'user'
          ? 'bg-blue-100 dark:bg-zinc-700/70 text-black dark:text-white'
          : 'bg-white dark:bg-gray-700/70 text-black dark:text-white'}
        rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:shadow-xl">

                <div class="shrink-0 mt-1">
                    {#if message.role === 'user'}
                        <User class="w-5 h-5 animate-pulse"/>
                    {:else}
                        <BotMessageSquare class="w-5 h-5 animate-bounce"/>
                    {/if}
                </div>

                <div class="flex-1 leading-7 tracking-wide text-[15px] font-normal selection:bg-blue-200 selection:text-blue-900">
                    <SvelteMarkdown source={message.content}/>
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fadeIn 0.3s ease-out;
    }
</style>
