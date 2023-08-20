import { RetrievalQAChain } from 'langchain/chains';
import { json } from '@sveltejs/kit';
import { ollamaModel } from '$lib/server/langchain/models';
import { parseMarkdownCode } from '$lib/parseMarkdownCode';
import { getRedisStore } from '$lib/server/redis/connection';

export async function POST({ request }) {
	const store = await getRedisStore();
	const vectorStoreRetriever = store.asRetriever();
	const chain = RetrievalQAChain.fromLLM(ollamaModel, vectorStoreRetriever);
	const res = await chain.call({
		verbose: true,
		query: `
You will assume the role of a software developer.
You can only create a component on Svelte fraimwork.
You are given a part of documentation.

Write a todo app on svelte framework.
There hould be an input field with create button.
There should be a list of todos.
There should be a button to delete todo.
There should be a checkbox to mark todo as done.

You can use all of the features of the framework if needed: 
If blocks
Else blocks
Else-if blocks
Each blocks
Keyed each blocks
Await blocks
Write working code in the single Markdown code block like:
\`\`\`svelte
...
\`\`\`
  `
	});

	console.log(res);
	const parsed = parseMarkdownCode(res.text, 'svelte');
	return json(parsed);
}
