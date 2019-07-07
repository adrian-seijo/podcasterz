import {getLoadedPodcast} from '../itunes/podcasts.js';
import {loadPodcastDetail} from './common.js';

export const PATH = /^\/podcast\/(\d+)\/episode\/(.+)\/$/;
export const ID = 'episode';
export const SECTION = 'podcast';

const loadEpisodeDetails = (episode) => {

	const title = document.querySelector('#episode-details h3');
	title.textContent = episode.title;

	const summary = document.querySelector('#episode-summary');
	summary.textContent = episode.summary;

	const audio = document.querySelector('audio');
	audio.src = episode.file;
};

export const load = async ({match, currentView}) => {
	const podcastId = match[1];
	const episodesId = match[2];

	const podcast = await getLoadedPodcast(podcastId);
	loadPodcastDetail(podcast);

	const {episodes} = podcast;
	const episode = episodes.find(({id}) => id === episodesId);

	if (!episode) throw new Error('Episode not found');

	const list = document.querySelector('#episode-list');
	list.classList.remove('visible');

	const details = document.querySelector('#episode-details');
	details.classList.add('visible');

	if (!currentView || currentView.ID === 'podcast') {
		const visible = document.querySelector('section.visible');
		if (visible) visible.classList.remove('visible');

		const section = document.querySelector('section#podcast');
		if (section) section.classList.add('visible');
	}

	loadEpisodeDetails(episode);
};
