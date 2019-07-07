import {getState} from '../../actions/state.js';
import {getPodcastDetails} from '../../actions/podcasts/index.js';
import {showSection} from '../../util/nav.js';
import render from './render.js';

export const PATH = /^\/podcast\/(\d+)\/$/;
export const ID = 'podcast';
export const SECTION = 'podcast';

export const enter = async ({match}) => {
	showSection(SECTION);

	const id = match[1];
	const state = getState();
	const podcast = state.podcast && state.podcast.id === id ? state.podcast : await getPodcastDetails(id);

	document.querySelector('#episode-details').classList.remove('visible');
	document.querySelector('#episode-list').classList.add('visible');

	render(podcast);
};

export const leave = () => {
	// Nothing to do yet
};
