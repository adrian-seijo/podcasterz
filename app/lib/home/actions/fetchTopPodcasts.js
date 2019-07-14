import {updateState} from '../../state.js';

const ITUNES_TOP_URL = '/.netlify/functions/top-podcasts';

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
	}, {
		visible: true
	});
};

/**
 * Fetch the list of top podcasts from itunes and update the state with it
 * @async
 */
export const fetchTopPodcasts = async () => {
	const res = await fetch(ITUNES_TOP_URL);
	const {feed} = await res.json();
	const {entry: entries} = feed;

	const podcasts = entries.reduce((result, entry) => {
		const data = formatPodcastEntry(entry);
		result.push(data);
		return result;
	}, []);

	updateState('podcasts', podcasts);
};
