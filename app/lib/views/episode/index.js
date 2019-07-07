import {getLoadedPodcast} from '../../actions/podcasts.js';
import {showSection} from '../../util/nav.js';
import render from './render.js';

export const PATH = /^\/podcast\/(\d+)\/episode\/(.+)\/$/;
export const ID = 'episode';
export const SECTION = 'podcast';

export const enter = async ({match}) => {

	const podcastId = match[1];
	const episodesId = match[2];

	const podcast = await getLoadedPodcast(podcastId);
	if (!podcast) throw new Error('Podcast not found');

	const {episodes} = podcast;
	const episode = episodes.find(({id}) => id === episodesId);
	if (!episode) throw new Error('Episode not found');

	showSection(SECTION);

	document.querySelector('#episode-details').classList.add('visible');
	document.querySelector('#episode-list').classList.remove('visible');

	render(podcast, episode);
};

export const leave = () => {
	const audio = document.querySelector('audio');
	if (!audio.paused) audio.pause();
};
