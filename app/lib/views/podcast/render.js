import {appendTemplate, replaceContent, updateElement} from '../../util/dom.js';
import {renderPodcastDetail} from '../common.js';

export const PATH = /^\/podcast\/(\d+)\/$/;
export const ID = 'podcast';
export const SECTION = 'podcast';

const template = document.querySelector('#episode-row');
const dateFormatter = new Intl.DateTimeFormat();

const renderRow = (podcast, fragment, episode) => {
	const {
		id,
		title
	} = episode;

	return appendTemplate(template, fragment, [
		{
			selector: 'a',
			attrs: {
				href: '/podcast/' + podcast.id + '/episode/' + id + '/',
				textContent: title
			}
		},
		{
			selector: 'td:nth-child(2)',
			attrs: {
				textContent: dateFormatter.format(episode.date)
			}
		},
		{
			selector: 'td:nth-child(3)',
			attrs: {
				textContent: episode.duration
			}
		}
	]);
};

const render = (podcast) => {

	renderPodcastDetail(podcast);

	updateElement('.episode-count', {textContent: podcast.episodes.length});

	const {episodes} = podcast;
	const fragment = episodes.reduce((...args) => renderRow(podcast, ...args), document.createDocumentFragment());

	replaceContent('table > tbody', fragment);
};

export default render;
