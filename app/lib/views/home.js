import {getLoadedPodcasts, getTopPodcasts} from '../itunes/podcasts.js';

const template = document.querySelector('#podcast-tile');

export const PATH = /^\/$/;
export const ID = 'home';
export const SECTION = 'home';

const createTile = (fragment, data) => {
	const tile = document.importNode(template.content, true);

	const link = tile.querySelector('h2 a');
	link.href = '/podcast/' + data.id + '/';
	link.textContent = data.name;

	const author = tile.querySelector('.author');
	author.textContent = data.author;

	const img = tile.querySelector('img');
	img.src = data.image;
	img.alt = data.name + ' logo';

	fragment.append(tile);
	return fragment;
};

export const getLoadedPoscast = () => {

};

export const load = async () => {

	// Hide the current section
	const visibleSection = document.querySelector('section.visible');
	if (visibleSection) visibleSection.classList.remove('visible');

	const homeSection = document.querySelector('section#home');
	homeSection.classList.add('visible');

	// If we have podcast we don't load them for now, we will handle this better later
	// with serviceworker plus better transitions
	let podcasts = getLoadedPodcasts();
	if (podcasts) return;

	// If we don't have the podcast then we just go ahead and grab them and populate the section with them
	podcasts = await getTopPodcasts();
	const fragment = podcasts.reduce(createTile, document.createDocumentFragment());

	const list = document.querySelector('#home .podcast-list');
	list.innerHTML = '';
	list.appendChild(fragment);
};
