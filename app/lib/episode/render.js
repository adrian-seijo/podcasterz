import {updateElements, safeAppendHTML} from '../util/dom.js';
import {renderAside} from '../common/renderAside.js';

export const PATH = /^\/podcast\/(\d+)\/episode\/(.+)\/$/;
export const ID = 'episode';
export const SECTION = 'podcast';

const renderEpisodeDetails = (episode) => {

	const {
		title,
		summary,
		file
	} = episode;

	updateElements([
		{selector: '#episode-details h3', attrs: {textContent: title}},
		{selector: 'audio', attrs: {src: file}}
	]);

	safeAppendHTML('#episode-summary', summary);
};

export const renderEpisode = (podcast, episode) => {
	window.scrollTo(0, 0);

	renderAside(podcast);
	renderEpisodeDetails(episode);
};
