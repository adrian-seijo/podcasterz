// NOTE: This file is not linting since dyn amic imports are a stage 4 feature and pulling babel just to support
// this seems excesive

import {getState} from '../../actions/state.js';
import {getTopPodcasts} from '../../actions/podcasts/index.js';
import {showSection, showError} from '../../util/nav.js';

export const PATH = /^\/$/;
export const ID = 'home';
export const SECTION = 'home';

export const enter = async () => {
	try {
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
	}
};

export const leave = async () => {
	// Nothing to do yet
};
