import { OpenAI } from 'langchain';
import { ChatOpenAI } from 'langchain/chat_models';
import { Ollama } from 'langchain/llms/ollama';

export const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const openAIChatModel = new ChatOpenAI({
	modelName: 'gpt-3.5-turbo-0613',
	temperature: 0,
	openAIApiKey,
	verbose: true
});

export const openAIModel = new OpenAI({
	temperature: 0,
	openAIApiKey
});

export const ollamaModel = new Ollama({
	baseUrl: 'http://localhost:11434', // Default value
	model: 'codeup', // Default value
	verbose: true, // Default value
	temperature: 0 // Default value
});
