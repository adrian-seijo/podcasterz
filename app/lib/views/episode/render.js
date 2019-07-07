
import {updateElement} from '../../util/dom.js';
import {renderPodcastDetail} from '../common.js';

export const PATH = /^\/podcast\/(\d+)\/episode\/(.+)\/$/;
export const ID = 'episode';
export const SECTION = 'podcast';

const renderEpisodeDetails = (episode) => {

	const {
		title,
		summary,
		file
	} = episode;

	updateElement('#episode-details h3', {textContent: title});
	updateElement('#episode-summary', {textContent: summary});
	updateElement('audio', {src: file});
};

const render = (podcast, episode) => {
	renderPodcastDetail(podcast);
	renderEpisodeDetails(episode);
};

export default render;
