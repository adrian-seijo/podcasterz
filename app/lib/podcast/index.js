import {getState, onStateChange} from '../state.js';
import {fetchPodcastDetails} from './actions/index.js';

onStateChange(async (key, state) => {
	if (key !== 'podcast') return;

	const {renderPodcast} = await import('./render.js');
	renderPodcast(state.podcast);
});

const enter = async ({match, currentView}) => {
	// If we come form home we reset the scroll to avoid showign the list in the middle
	if (currentView && currentView.ID === 'home') {
		window.scrollTo(0, 0);
	}

	document.querySelector('#episode-details').classList.remove('visible');
	document.querySelector('#episode-list').classList.add('visible');

	const id = match[1];
	const {podcast} = getState();

	if (!podcast || podcast.id !== id) {
		await fetchPodcastDetails(id);
	}
};

export default {
	PATH: /^\/podcast\/(\d+)\/$/,
	ID: 'podcast',
	SECTION: 'podcast',
	enter,
};
