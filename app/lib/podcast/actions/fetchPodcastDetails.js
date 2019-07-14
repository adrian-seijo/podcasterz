import {updateState} from '../../state.js';
import {getDataFromElement} from '../../util/dom.js';

const ITUNES_PODCAST_URL = '/.netlify/functions/podcast-details?id=';
const FEED_BASE_URL = '/.netlify/functions/feed?url=';

const parser = new DOMParser();

/**
 * Given an xml document get all the podcast data from it
 * @param  {XMLDocument} feed
 * @return {Object}
 */
export const getFeedData = (feed) => {

	const episodes = Array.from(feed.querySelectorAll('item'))
		.map((item) => {

			const id = getDataFromElement(item, 'guid');
			const title = getDataFromElement(item, 'title');
			const summary = getDataFromElement(item, 'summary');
			const episode = getDataFromElement(item, '*|episode');
			const duration = getDataFromElement(item, '*|duration');
			const date = getDataFromElement(item, 'pubDate');
			const file = getDataFromElement(item, 'enclosure', 'url');

			return {
				id,
				title,
				summary,
				episode,
				duration,
				date: date ? new Date(date) : null,
				file
			};
		})
		.sort((a, b) => b.date - a.date);

	const image = getDataFromElement(feed, 'image url') || getDataFromElement(feed, '*|image', 'href');

	const podcast = {
		title: getDataFromElement(feed, 'title'),
		author: getDataFromElement(feed, '*|author'),
		summary: getDataFromElement(feed, '*|summary'),
		image,
		episodes
	};

	return podcast;
};

/**
 * Given a itunes podcast id fetch its details and parse them ebfore adding them
 * to the state
 * @async
 * @param  {Number}
 */
export const fetchPodcastDetails = async (id) => {
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
};
