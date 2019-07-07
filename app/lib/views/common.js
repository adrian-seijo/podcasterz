import {updateElements} from '../util/dom.js';

/**
 * Given a podcast update the aside with its details
 * @param  {Object} podcast
 */
export const renderPodcastDetail = (podcast) => {

	const {
		image,
		title,
		author,
		summary
	} = podcast;

	updateElements([
		{selector: 'aside img', attrs: {src: image}},
		{selector: 'aside h2', attrs: {textContent: title}},
		{selector: 'aside .author', attrs: {textContent: author}},
		{selector: 'aside .summary', attrs: {textContent: summary}},
	]);
};
