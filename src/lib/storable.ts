import { writable, get, type Writable } from 'svelte/store';

export function storable<T = unknown>(key: string, store: Writable<T>) {
	const { subscribe, set } = store;
	const isBrowser = typeof window !== 'undefined';

	isBrowser && localStorage[key] && set(JSON.parse(localStorage[key]));

	return {
		subscribe,
		set: (n: T) => {
			isBrowser && (localStorage[key] = JSON.stringify(n));
			set(n);
		},
		update: (cb: (value: T) => T) => {
			const updatedStore = cb(get(store));

			isBrowser && (localStorage[key] = JSON.stringify(updatedStore));
			set(updatedStore);
		}
	};
}
