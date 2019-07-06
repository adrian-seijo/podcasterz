import {getPodcastDetails} from '../itunes/podcasts.js';

export const PATH = /^\/podcast\/(\d+)\/$/;
export const ID = 'podcast';

export const load = async ({match}) => {
	const id = match[1];

	const podcast = await getPodcastDetails(id);
	console.log(podcast);
};
