import {appendTemplate, replaceContent, updateElement} from '../util/dom.js';
import {renderAside} from '../common/renderAside.js';

const template = document.querySelector('#episode-row');
const dateFormatter = new Intl.DateTimeFormat();

/**
 * Render each row of the podcast episode list
 * @param  {Object} podcast
 * @param  {DocumentFragment} fragment
 * @param  {Object} episode
 */
const renderRow = (podcast, fragment, episode) => {
	const {
		id,
		title
	} = episode;

	const episodeUrl = '/podcast/' + encodeURIComponent(podcast.id) + '/episode/' + encodeURIComponent(id) + '/';

	return appendTemplate(template, fragment, [
		{
			selector: 'a',
			attrs: {
				href: episodeUrl,
				textContent: title
			}
		},
		{
			selector: 'td:nth-child(2)',
			attrs: {
				dataset: {title: 'Date: '},
				textContent: dateFormatter.format(episode.date)
			}
		},
		{
			selector: 'td:nth-child(3)',
			attrs: {
				dataset: {title: 'Duration: '},
				textContent: episode.duration
			}
		}
	]);
};

/**
 * Render the given pdocast details by updating the aside and the episode list
 * @param  {Object} podcast
 */
export const renderPodcast = (podcast) => {

	renderAside(podcast);

	updateElement('.episode-count', {textContent: podcast.episodes.length});

	const {episodes} = podcast;
	const fragment = episodes.reduce((...args) => renderRow(podcast, ...args), document.createDocumentFragment());

	replaceContent('table > tbody', fragment);
};
