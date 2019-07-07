import {getState} from '../../actions/state.js';
import {getTopPodcasts} from '../../actions/podcasts/index.js';
import {showSection} from '../../util/nav.js';
import render from './render.js';

export const PATH = /^\/$/;
export const ID = 'home';
export const SECTION = 'home';

export const enter = async () => {
	showSection(SECTION);

	const state = getState();
	const podcasts = state.podcasts ? state.podcasts : await getTopPodcasts();

	await render(podcasts);
};

export const leave = async () => {
	// Nothing to do yet
};
