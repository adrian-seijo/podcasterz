import {updateState} from '../state.js';
import {getFeedData} from './format.js';

const ITUNES_PODCAST_URL = '/.netlify/functions/podcast-details?id=';
const FEED_BASE_URL = '/.netlify/functions/feed?url=';

const parser = new DOMParser();

const getPodcastDetails = async (id) => {
	if (!id) throw new Error('Missing id for getPodcastData');

	const res = await fetch(ITUNES_PODCAST_URL + id);
	const {resultCount, results} = await res.json();

	if (resultCount <= 0 || results.length <= 0) throw new Error('Podcast details not found');

	const [{feedUrl}] = results;

	const feedData = await fetch(FEED_BASE_URL + encodeURIComponent(feedUrl));
	const body = await feedData.text();

	const doc = parser.parseFromString(body, 'text/xml');

	const result = {
		id,
		...getFeedData(doc)
	};

	updateState('podcast', result);

	return result;
};

export default getPodcastDetails;
