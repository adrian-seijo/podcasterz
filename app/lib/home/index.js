// NOTE: This file is not linting since dyn amic imports are a stage 4 feature and pulling babel just to support
// this seems excesive

import {getState} from '../state.js';
import {getTopPodcasts, filterTopPodcasts} from './actions/topPodcasts.js';
import {onSearch} from './actions/search.js';
import {showSection, showError, isLoading} from '../util/nav.js';

const PATH = /^\/$/;
const ID = 'home';
const SECTION = 'home';

const search = document.querySelector('#search');
search.addEventListener('input', onSearch);
search.value = new URLSearchParams(window.location.search).get('q');

const enter = async () => {
	try {
		isLoading(true);
		showSection(SECTION);

		const state = getState();
		let podcasts = state.podcasts;

		if (podcasts) {
			const {default: render} = await import('./render.js');
			await render(podcasts);
		} else {
			const [podcasts, {default: render}] = await Promise.all([
				getTopPodcasts(),
				import('./render.js')
			]);

			await render(podcasts);
		}
	} catch (e) {
		console.error(e);
		showError();
	} finally {
		isLoading(false);
	}
};

const update = async () => {
	const {default: render} = await import('./render.js');
	await render(filterTopPodcasts());
};

const leave = async () => {
	// Nothing to do yet
};

export default {
	PATH,
	ID,
	SECTION,
	enter,
	leave
};
