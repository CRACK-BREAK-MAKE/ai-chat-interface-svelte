<script lang="ts">
	import { enhance } from '$app/forms';
	import { Send } from 'lucide-svelte';
	import { chatStore } from '$lib/stores/chat-store';
	import { statusStore } from "$lib/stores/status-store";

	let userQuery = $state('');
	let currentMessageId: string | null = $state(null);
	let errorMessage = $state('');

	let { data, form } = $props();

	async function handleStream(query: string) {
		$statusStore = 'streaming';
		errorMessage = '';

		try {
			const response = await fetch(`/chat/${data.sessionId}/stream`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query,
					messages: [...$chatStore],
                    sessionId: data.sessionId,
				})
			});

			if (!response.ok) {
				new Error('Failed to connect to stream');
			}

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();

			if (!reader) {
				new Error('No reader available');
			}

			// Create initial assistant message
			const assistantMessage = chatStore.addMessage('assistant', '', data.sessionId);
			currentMessageId = assistantMessage.id;

			let accumulatedContent = ''; // Keep track of accumulated content

			while (true) {
				const { done, value } = await reader.read();

				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				if (currentMessageId) {
					chatStore.updateMessage(currentMessageId, chunk);
					accumulatedContent += chunk;
				}
			}

		} catch (error) {
			$statusStore = 'error';
			errorMessage = error instanceof Error ? error.message : 'An error occurred';
			console.error('Streaming error:', error);
		} finally {
			$statusStore = 'ready';
			currentMessageId = null;
			userQuery = '';
		}
	}

	 const buttonDisabled = $derived($statusStore !== 'ready');
</script>

<div class="p-4 bg-white dark:bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-xl shadow-2xl">
    <form
        class="max-w-4xl mx-auto"
        method="POST"
        action="?/inference"
        use:enhance={() => {
            if (!userQuery.trim()) return;

            $statusStore = 'submitted';
            errorMessage = '';

            // Store the query for streaming
            const currentQuery = userQuery;

            // Add user message to store with chat ID
            chatStore.addMessage('user', currentQuery, data.sessionId);

            return async ({ result }) => {
                if (result.type === 'success' && result.data?.success) {
                    await handleStream(currentQuery);
                } else {
                    $statusStore = 'error';
                    errorMessage = result.data?.msg || 'An error occurred';
                }
            };
        }}
    >
        <div class="flex flex-col gap-2">
            <div class="flex gap-2">
                <input
                    name="query"
                    class="flex-1 p-2 bg-white dark:bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 shadow-inner"
                    placeholder="Type your message..."
                    bind:value={userQuery}
                    disabled={$statusStore !== 'ready'}
                />
                <button
                    type="submit"
                    class="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 rounded-lg shadow-xl flex items-center justify-center focus:ring-4 dark:focus:ring-gray-100 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={buttonDisabled}
                >
                    {#if $statusStore === 'submitted' || $statusStore === 'streaming'}
                        <div class="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                    {:else}
                        <Send class="w-5 h-5"/>
                    {/if}
                </button>
            </div>
        </div>
    </form>
</div>
