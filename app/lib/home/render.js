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
 * Method that render the home podcast list
 * @param  {Array.<Object>} 	podcasts
 */
export const renderList = (podcasts) => {
	const frag = document.createDocumentFragment();
	podcasts
		.filter(({visible}) => visible)
		.reduce(renderTile, frag);

	replaceContent(LIST_SELECTOR, frag);
};

/**
 * Method that render the search field by updating its value
 * @param  {String} value
 */
export const renderSearch = (value) => {
	const search = document.querySelector('#search');
	search.value = value;
};
