import {getPodcastDetails} from '../itunes/podcasts.js';

export const PATH = /^\/podcast\/(\d+)\/$/;
export const ID = 'podcast';
export const SECTION = 'podcast';

const template = document.querySelector('#episode-row');
const dateFormatter = new Intl.DateTimeFormat();

const loadPodcastDetail = (podcast) => {

	const image = document.querySelector('aside img');
	image.src = podcast.image;

	const title = document.querySelector('aside h2');
	title.textContent = podcast.title;

	const author = document.querySelector('aside .author');
	author.textContent = podcast.author;

	const summary = document.querySelector('aside .summary');
	summary.textContent = podcast.summary;
};

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
	} else {
		// TODO: Deal with navigations from an episode detail
	}

	loadPodcastDetail(podcast);
	loadEpisodeList(podcast);
};
