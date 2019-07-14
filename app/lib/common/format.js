import {getDataFromElement} from '../util/dom.js';

/**
 * Given an item object return its label property or the item itself if not present
 * @param  {Object} item
 * @return {Any}
 */
const getLabelValue = (item) => item && item.label ? item.label : item;

/**
 * Given an response object from itunes podcast api get all the data we need from it
 * @param  {Object} entry
 * @return {Object}
 */
export const formatPodcastEntry = (entry) => {
	const {
		id: {
			attributes: {
				'im:id': id
			}
		},
		title,
		summary,
		'im:artist': author,
		'im:image': images
	} = entry;

	const image = images.reduce((result, {attributes, label}) => {
		const height = parseInt(attributes.height, 10);
		if (!height || height < result.height) return result;
		return {
			label,
			height
		};
	}, {});

	return Object.entries({
		id,
		title,
		summary,
		author,
		image
	}).reduce((res, [key, value]) => {
		res[key] = getLabelValue(value);
		return res;
	}, {});
};

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
