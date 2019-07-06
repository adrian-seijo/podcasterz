import {getPodcastDetails} from '../itunes/podcasts.js';

export const PATH = /^\/podcast\/(\d+)\/$/;
export const ID = 'podcast';
export const SECTION = 'podcast';

export const load = async ({match, currentView}) => {
	const id = match[1];

	const podcast = await getPodcastDetails(id);
	console.log(podcast);

	if (!currentView || currentView.ID === 'home') {
		const home = document.querySelector('section.visible');
		if (home) home.classList.remove('visible');

		document.querySelector('section#podcast').classList.add('visible');
	} else {
		// TODO: Deal with navigations from an episode detail
	}

};
