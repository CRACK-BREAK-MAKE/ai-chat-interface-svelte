<script lang="ts">
	import MaxWidthWrapper from './MaxWidthWrapper.svelte';
	import {Laptop, Moon, Sun} from 'lucide-svelte';
	import {themeStore} from "$lib/stores/theme-store";
	import type {Theme} from "$lib/types/theme";
	import {ThemeUtils} from "$lib/utils/theme-utils";

	let currentTheme = $state<Theme>(ThemeUtils.getStoredTheme());

	themeStore.subscribe(value => {
		currentTheme = value;
	});

	function setTheme(newTheme: Theme) {
		themeStore.setTheme(newTheme);
	}
</script>

<header class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
    <MaxWidthWrapper class_="h-[70px]" maxWidth="max-w-7xl">
        <div class="flex items-center justify-between h-full">
            <div class="flex-shrink-0">
                <img src="/ai-logo-transparent.png" alt="Spring Logo" class="h-14" />
            </div>

            <div class="flex items-center gap-1 bg-white dark:bg-gray-800 p-1.5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <button
                    class="p-1.5 rounded-md transition-all duration-200 {currentTheme === 'light' ? 'bg-blue-100 text-amber-600 dark:bg-blue-900 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}"
                    onclick={() => setTheme('light')}
                    aria-label="Light Mode"
                >
                    <Sun size={18} />
                </button>

                <button
                    class="p-1.5 rounded-md transition-all duration-200 {currentTheme === 'dark' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}"
                    onclick={() => setTheme('dark')}
                    aria-label="Dark Mode"
                >
                    <Moon size={18} />
                </button>

                <button
                    class="p-1.5 rounded-md transition-all duration-200 {currentTheme === 'system' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}"
                    onclick={() => setTheme('system')}
                    aria-label="System Theme"
                >
                    <Laptop size={18} />
                </button>
            </div>
        </div>
    </MaxWidthWrapper>
</header>
