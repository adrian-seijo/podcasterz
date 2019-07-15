import {updateElements} from '../util/dom.js';

/**
 * Given a podcast update the aside with its details
 * @param  {Object} podcast
 */
export const renderAside = (podcast) => {

	const {
		image,
		title,
		author,
		summary
	} = podcast;

	updateElements([
		{selector: 'aside img', attrs: {src: image, alt: title + ' logo'}},
		{selector: 'aside h2 a', attrs: {
			href: '/podcast/' + podcast.id + '/',
			textContent: title
		}},
		{selector: 'aside .author', attrs: {textContent: author}},
		{selector: 'aside #podcast-summary', attrs: {textContent: summary}},
	]);
};
