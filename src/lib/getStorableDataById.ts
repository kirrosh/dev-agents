import { get, writable, type Writable } from 'svelte/store';
import { storable } from './storable';
import { useCompletion } from 'ai/svelte';

const stores: Record<string, Writable<unknown>> = {};
export const getStore = (id: string) => {
	if (stores[id]) {
		return stores[id];
	}
	const { subscribe, set, update } = writable('');
	return {
		subscribe,
		set,
		update
	};
};

export const getStorableDataById = (pageId: string) => {
	let systemInput = getStore(pageId);
	let system = storable(pageId + '-svelte-component-system', systemInput);
	const { completion, handleSubmit, input } = useCompletion({
		api: 'api/svelte/component',
		body: {
			system: get(system)
		}
	});
	let human = storable('svelte-component-human', input);
	return {
		system,
		human,
		completion,
		handleSubmit,
		input
	};
};
