import { LLMChain } from 'langchain/chains';
import { ollamaModel } from '$lib/server/langchain/models';
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	SystemMessagePromptTemplate
} from 'langchain/prompts';

export async function POST({ request }) {
	const { prompt, system } = await request.json();
	console.log(prompt, system);
	return new Response('ok');
	const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(system);
	const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(prompt);
	const chatPrompt = ChatPromptTemplate.fromPromptMessages([
		systemMessagePrompt,
		humanMessagePrompt
	]);
	const chain = new LLMChain({
		llm: ollamaModel,
		prompt: chatPrompt
	});
	const stream = await chain.invoke({
		verbose: true
	});
	return new Response(stream.text);
}
