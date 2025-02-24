<script lang="ts">
	import { ArrowLeftToLine, Bot } from 'lucide-svelte';
	import {fly} from 'svelte/transition';
	import UserProfile from "$lib/components/UserProfile.svelte";

	let isExpanded = $state(false);


	function toggleSidebar() {
		isExpanded = !isExpanded;
	}
</script>

<!-- Desktop Sidebar -->
<div class="hidden md:block fixed left-0 top-[75px] h-[calc(100vh-70px)] w-64 bg-white dark:bg-gray-800 shadow-lg z-30 transition-transform duration-300 ease-in-out"
     class:translate-x-0={isExpanded}
     class:-translate-x-full={!isExpanded}>
    <UserProfile>
        <button onclick={toggleSidebar} class="text-gray-900 bg-white border border-indigo-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors duration-200 p-2 rounded-full">
            <ArrowLeftToLine size={24}/>
        </button>
    </UserProfile>
</div>

<!-- Mobile Sidebar -->
{#if isExpanded}
    <div class="md:hidden fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-800 z-50"
         transition:fly={{ x: '-100%', duration: 300 }}>
        <UserProfile>
            <button onclick={toggleSidebar} class="text-indigo-600 dark:text-white hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors duration-200 bg-indigo-100 dark:bg-indigo-800 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500">
                <ArrowLeftToLine size={24}/>
            </button>
        </UserProfile>
    </div>
{/if}

<!-- Toggle button for desktop -->
<button
    onclick={toggleSidebar}
    class="hidden md:flex fixed left-4 top-1/2 transform -translate-y-1/2 z-30 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 items-center justify-center focus:ring-4 dark:focus:ring-gray-100 focus:ring-purple-500"
    class:invisible={isExpanded}
>
    <Bot size={24}/>
</button>

<!-- Toggle button for mobile -->
<button
    onclick={toggleSidebar}
    class="md:hidden fixed left-[-0.5rem] top-[80px] z-30 bg-indigo-600 text-white p-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center focus:ring-4 dark:focus:ring-gray-100 focus:ring-purple-500"
>
    <Bot size={24}/>
</button>
