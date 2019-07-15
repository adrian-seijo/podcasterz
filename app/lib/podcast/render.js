import {appendTemplate, replaceContent, updateElement} from '../util/dom.js';
import {renderAside} from '../common/renderAside.js';

const template = document.querySelector('#episode-row');
const dateFormatter = new Intl.DateTimeFormat();

const formatDuration = (duration) => {

	let result = duration || '--';
	if (!duration || duration.includes(':')) return result;

	const timeInMins = duration / 60;
	const mins = Math.floor(timeInMins);
	const seconds = Math.ceil((timeInMins - mins) * 60);
	result = `${String(mins).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

	return result;
};

/**
 * Render each row of the podcast episode list
 * @param  {Object} podcast
 * @param  {DocumentFragment} fragment
 * @param  {Object} episode
 */
const renderRow = (podcast, fragment, episode) => {
	const {
		id,
		title,
		date,
		duration
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
				textContent: dateFormatter.format(date)
			}
		},
		{
			selector: 'td:nth-child(3)',
			attrs: {
				dataset: {title: 'Duration: '},
				textContent: formatDuration(duration)
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
