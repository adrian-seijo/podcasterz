import {getState, onStateChange} from '../state.js';
import {getEpisodeDetails} from './actions/index.js';

onStateChange(async (key, state) => {
	if (key !== 'episode') return;

	const {renderEpisode} = await import('./render.js');
	const {podcast, episode} = state;
	renderEpisode(podcast, episode);
});

const enter = async ({match}) => {

	document.querySelector('#episode-details').classList.add('visible');
	document.querySelector('#episode-list').classList.remove('visible');

	const podcastId = decodeURIComponent(match[1]);
	const episodesId = decodeURIComponent(match[2]);

	const {podcast, episode} = getState();

	if (!podcast || podcast.id !== podcastId || !episode || episode.id !== episodesId) {
		await getEpisodeDetails(podcastId, episodesId);
	}
};

const leave = () => {
	const audio = document.querySelector('audio');
	if (!audio.paused) audio.pause();
};

export default {
	PATH: /^\/podcast\/(\d+)\/episode\/(.+)\/$/,
	ID: 'episode',
	SECTION: 'podcast',
	enter,
	leave
};
