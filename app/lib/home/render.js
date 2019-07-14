import {appendTemplate, replaceContent} from '../util/dom.js';

const LIST_SELECTOR = '#home .podcast-list';
const template = document.querySelector('#podcast-tile');

/**
 * Method that renders podcast data as a tile in the home podcast list. It will return the fragment where the tile is
 * applied
 * @param  {HTMLElement} 				fragment
 * @param  {Object.<String, String>} 	data
 * @return {HTMLElement}
 */
const renderTile = (fragment, data) => {

	const {
		id,
		title,
		author,
		image
	} = data;

	return appendTemplate(template, fragment, [
		{
			selector: 'h2 a',
			attrs: {
				href: '/podcast/' + id + '/',
				textContent: title
			}
		},
		{
			selector: '.author',
			attrs: {
				textContent: author
			}
		},
		{
			selector: 'img',
			attrs: {
				src: image,
				alt: title + ' logo',
				loading: 'lazy'
			}
		}
	]);
};

/**
 * Method that render the home view
 * @param  {Array.<Object>} 	podcasts
 */
const render = (podcasts) => {
	const frag = document.createDocumentFragment();
	podcasts.reduce(renderTile, frag);
	replaceContent(LIST_SELECTOR, frag);
};

export default render;
