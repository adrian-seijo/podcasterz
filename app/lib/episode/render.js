import {showError} from '../util/nav.js';
import {updateElements, safeAppendHTML} from '../util/dom.js';
import {renderPodcastDetail} from '../common/renderPodcastDetail.js';

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

const render = (podcast, episodesId) => {
	window.scrollTo(0, 0);

	try {
		const {episodes} = podcast;
		const episode = episodes.find(({id}) => id === episodesId);
		if (!episode) throw new Error('Episode not found');

		renderPodcastDetail(podcast);
		renderEpisodeDetails(episode);
	} catch (e) {
		console.error(e);
		showError();
	}
};

export default render;
