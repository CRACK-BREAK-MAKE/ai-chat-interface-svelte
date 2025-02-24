<script lang="ts">
	import Conversation from "$lib/components/Conversation.svelte";
	import UserQuery from "$lib/components/UserQuery.svelte";
	import Sidebar from "$lib/components/Sidebar.svelte";

	let {data, form} = $props();
</script>

<Sidebar/>
<div class="w-full max-w-3xl flex flex-col">
    <Conversation/>
    <UserQuery {data} {form}/>
</div>
