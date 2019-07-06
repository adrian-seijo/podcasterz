import {getLoadedPodcasts, getTopPodcasts} from '../itunes/podcasts.js';

const template = document.querySelector('#podcast-tile');

export const PATH = /^\/$/;
export const ID = 'home';

const createTile = (fragment, data) => {
	const tile = document.importNode(template.content, true);

	const link = tile.querySelector('h2 a');
	link.href = '/podcast/' + data.id + '/';
	link.textContent = data.name;

	const author = tile.querySelector('.author');
	author.textContent = data.author;

	const img = tile.querySelector('img');
	img.src = data.image;

	fragment.append(tile);
	return fragment;
};

export const getLoadedPoscast = () => {

};

export const load = async () => {

	let podcasts = getLoadedPodcasts();

	if (!podcasts) {
		podcasts = await getTopPodcasts();
	}
	const fragment = podcasts.reduce(createTile, document.createDocumentFragment());

	const list = document.querySelector('#home .podcast-list');
	list.innerHTML = '';
	list.appendChild(fragment);
};
