import {getState} from '../../actions/state.js';
import {getPodcastDetails} from '../../actions/podcasts/index.js';
import {showSection, showError, isLoading} from '../../util/nav.js';
import render from './render.js';

export const PATH = /^\/podcast\/(\d+)\/episode\/(.+)\/$/;
export const ID = 'episode';
export const SECTION = 'podcast';

export const enter = async ({match}) => {
	try {
		isLoading(true);
		showSection(SECTION);

		document.querySelector('#episode-details').classList.add('visible');
		document.querySelector('#episode-list').classList.remove('visible');

		const podcastId = decodeURIComponent(match[1]);
		const episodesId = decodeURIComponent(match[2]);

		const state = getState();

		let podcast = state.podcast;

		if (podcast && state.podcast.id === podcastId) {
			const {default: render} = await import('./render.js');
			await render(podcast, episodesId);
		} else {

			const [podcast, {default: render}] = await Promise.all([
				getPodcastDetails(podcastId),
				import('./render.js')
			]);

			if (!podcast) throw new Error('Podcast not found');

			await render(podcast, episodesId);
		}
	} catch (e) {
		console.error(e);
		showError();
	} finally {
		isLoading(false);
	}
};

export const leave = () => {
	const audio = document.querySelector('audio');
	if (!audio.paused) audio.pause();
};
