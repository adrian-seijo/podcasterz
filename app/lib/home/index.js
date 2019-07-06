import {formatPodcastEntry} from '../util/itunes.js';

const ITUNES_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

const template = document.querySelector('#podcast-tile');

export const PATH = /^\/$/;
export const ID = 'home';

const createTile = (fragment, entry) => {

	const data = formatPodcastEntry(entry);

	const tile = document.importNode(template.content, true);

	const link = tile.querySelector('h2 a');
	link.href = '/podcast/' + data.id;
	link.textContent = data.name;

	const author = tile.querySelector('.author');
	author.textContent = data.author;

	const img = tile.querySelector('img');
	img.src = data.image;

	fragment.append(tile);
	return fragment;
};

export const load = async () => {
	const res = await fetch(ITUNES_URL);
	const {feed} = await res.json();
	const {entry: entries} = feed;

	const fragment = entries.reduce(createTile, document.createDocumentFragment());

	const list = document.querySelector('#home .podcast-list');
	list.innerHTML = '';
	list.appendChild(fragment);
};
