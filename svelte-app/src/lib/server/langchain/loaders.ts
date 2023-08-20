import type { SelectorType } from 'cheerio';
import { CheerioWebBaseLoader } from 'langchain/document_loaders';

export const cheerioLoader = async (url: string, selector: SelectorType = 'body') => {
	const loader = new CheerioWebBaseLoader(url, {
		selector: selector
	});
	return loader.load();
};
