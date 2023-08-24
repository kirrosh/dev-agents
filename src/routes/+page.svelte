<script>
	import { svelteComponenSystemPrompt } from '$lib/prompts/svelte-component';
	import SvelteMarkdown from 'svelte-markdown';
	import { useCompletion } from 'ai/svelte';
	import { storable } from '$lib/storable';
	import { writable } from 'svelte/store';
	let systemInput = writable(svelteComponenSystemPrompt);
	let system = storable('svelte-component-system', systemInput);
	const { completion, handleSubmit, input } = useCompletion({
		api: 'api/svelte/component',
		body: {
			system: $system
		}
	});
	let human = storable('svelte-component-human', input);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div>System:</div>
	<textarea bind:value={$system} />
	<form on:submit={handleSubmit}>
		<textarea bind:value={$human} />
		<br />
		<button type="submit">Send</button>
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
