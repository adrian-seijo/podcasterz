import {getPodcastDetails} from '../itunes/podcasts.js';
import {loadPodcastDetail} from './common.js';

export const PATH = /^\/podcast\/(\d+)\/$/;
export const ID = 'podcast';
export const SECTION = 'podcast';

const template = document.querySelector('#episode-row');
const dateFormatter = new Intl.DateTimeFormat();

const loadEpisodeList = (podcast) => {
	const episodeCount = document.querySelector('.episode-count');
	episodeCount.textContent = podcast.episodes.length;

	const table = document.querySelector('table');
	const body = table.tBodies[0];

	const rows = podcast.episodes.reduce((fragment, episode) => {
		const templateElement = document.importNode(template.content, true);
		const row = templateElement.children[0];

		const link = row.querySelector('a');
		link.href = '/podcast/' + podcast.id + '/episode/' + episode.id + '/';
		link.textContent = episode.title;

		row.children[1].textContent = dateFormatter.format(episode.date);
		row.children[2].textContent = episode.duration;

		fragment.append(templateElement);

		return fragment;
	}, document.createDocumentFragment());

	body.innerHTML = '';
	body.appendChild(rows);
};

export const load = async ({match, currentView}) => {
	const id = match[1];

	const podcast = await getPodcastDetails(id);

	if (!currentView || currentView.ID === 'home') {
		const home = document.querySelector('section.visible');
		if (home) home.classList.remove('visible');

		document.querySelector('section#podcast').classList.add('visible');
	}

	const details = document.querySelector('#episode-details');
	details.classList.remove('visible');

	const list = document.querySelector('#episode-list');
	list.classList.add('visible');

	loadPodcastDetail(podcast);
	loadEpisodeList(podcast);
};
