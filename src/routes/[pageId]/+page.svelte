<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { useCompletion } from 'ai/svelte';
	import { storable } from '$lib/storable';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	type IConfig = Record<string, string>;

	let systemInput = writable<IConfig>({});
	let humanInput = writable<IConfig>({});

	let system = storable('svelte-component-system', systemInput);
	const { completion, handleSubmit, input } = useCompletion({
		api: 'api/svelte/component',
		id: $page.params.pageId,
		body: {
			system: $system[$page.params.pageId]
		}
	});
	let human = storable('svelte-component-human', humanInput);
	human.subscribe((s) => {
		const value = s[$page.params.pageId];
		input.set(value);
		// setCompletion(value);
	});
	page.subscribe((_page) => {
		const value = $human[_page.params.pageId];
		input.set(value);
		// setCompletion(value);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="w-full flex flex-col">
	<form
		on:submit={(e) => {
			console.log(e);
			handleSubmit(e);
		}}
		class="w-full px-4"
	>
		<div class="flex flex-wrap gap-8">
			<label class="label w-[500px]">
				<span>System</span>
				<textarea class="textarea h-[200px]" bind:value={$system[$page.params.pageId]} />
			</label>
			<label class="label w-[500px]">
				<span>Human</span>
				<textarea class="textarea h-[200px]" bind:value={$human[$page.params.pageId]} />
			</label>
		</div>
		<button class="btn variant-filled mt-4" type="submit">Send</button>
	</form>
	<h3>Completion:</h3>
	<SvelteMarkdown source={$completion} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
