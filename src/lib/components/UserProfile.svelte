<script lang="ts">
	import {MessagesSquare} from 'lucide-svelte';

	let userInfo: { givenName: string; familyName: string; email: string; } = {
		givenName: 'First',
		familyName: 'Last',
		email: 'dummy@email.com'
	}

	function newChat() {
		window.location.href = '/';
	}

	const initials = $derived((userInfo.givenName?.[0] || '') + (userInfo.familyName?.[0] || ''));
	const {children} = $props()
</script>

<div class="h-full flex flex-col">
    <div class="p-4 flex justify-between items-center">
        <div class="w-30 h-30 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-800 dark:text-white border-1 border-indigo-600 dark:border-gray-600 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700">
            {initials}
        </div>
        {@render children?.()}
    </div>
    <div class="flex-1 overflow-y-auto p-4">
        <p class="text-center font-semibold text-gray-800 dark:text-gray-200 mb-6">
            {userInfo.familyName}, {userInfo.givenName}
        </p>
        <button
            onclick={newChat}
            class="w-full flex items-center justify-center text-gray-900 bg-white border border-indigo-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
            <MessagesSquare class="mr-2" size={18}/>
            <span>New Chat</span>
        </button>
        <nav class="space-y-2">
            <!-- Add navigation items here -->
        </nav>
    </div>
</div>
