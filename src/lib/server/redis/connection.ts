import { createClient } from 'redis';
import { RedisVectorStore } from 'langchain/vectorstores/redis';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { openAIApiKey } from '../langchain/models';

const client = createClient({
	url: 'redis://localhost:6379'
});

let redisStore: RedisVectorStore;

export const getRedisStore = async (indexName: string = 'docs') => {
	try {
		await client.connect();
	} catch (e) {}

	if (!redisStore) {
		redisStore = new RedisVectorStore(
			new OpenAIEmbeddings({
				openAIApiKey
			}),
			{
				redisClient: client,
				indexName: indexName
			}
		);
	}
	return redisStore;
};

export const disconnectRedis = async () => {
	await client.disconnect();
};
