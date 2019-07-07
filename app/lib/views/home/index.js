import {getLoadedPodcasts} from '../../itunes/podcasts.js';
import {showSection} from '../../util/nav.js';
import render from './render.js';

export const PATH = /^\/$/;
export const ID = 'home';
export const SECTION = 'home';

export const enter = async () => {
	showSection(SECTION);
	const podcasts = await getLoadedPodcasts();
	await render(podcasts);
};

export const leave = async () => {
	// Nothing to do yet
};
