export const createCopyState = (timeout = 2000)  => {
	let copied = $state(false);

	async function copy(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			copied = true;

			setTimeout(() => {
				copied = false;
			}, timeout);

			return true;
		} catch (error) {
			console.error('Failed to copy:', error);
			return false;
		}
	}

	return { copied: $derived(copied), copy };
}
