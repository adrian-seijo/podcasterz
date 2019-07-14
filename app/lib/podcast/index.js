import {getState} from '../state.js';
import {getPodcastDetails} from './actions/podcastDetails.js';
import {showSection, showError, isLoading} from '../util/nav.js';

const PATH = /^\/podcast\/(\d+)\/$/;
const ID = 'podcast';
const SECTION = 'podcast';

const enter = async ({match, currentView}) => {
	try {
		isLoading(true);
		showSection(SECTION);

		// If we come form home we reset the scroll to avoid showign the list in the middle
		if (currentView && currentView.ID === 'home') {
			window.scrollTo(0, 0);
		}

		document.querySelector('#episode-details').classList.remove('visible');
		document.querySelector('#episode-list').classList.add('visible');

		const id = match[1];
		const state = getState();

		let podcast = state.podcast;

		if (podcast && state.podcast.id === id) {
			const {default: render} = await import('./render.js');
			await render(podcast);
		} else {

			const [podcasts, {default: render}] = await Promise.all([
				getPodcastDetails(id),
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

const leave = () => {
	// Nothing to do yet
};

export default {
	PATH,
	ID,
	SECTION,
	enter,
	leave
};
