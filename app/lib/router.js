
import * as home from './home/index.js';
import * as podcast from './podcast/index.js';
import * as episode from './episode/index.js';

const views = [
	home,
	podcast,
	episode
];

export const changeView = () => {
	const {pathname, search} = window.location;

	let match;
	const view = views.find(({PATH}) => {
		match = pathname.match(PATH);
		return match;
	});

	const current = document.querySelector('section.visible');

	if (current && current.id === view.ID) return;
	if (current) current.classList.remove('visible');

	if (!view) {
		const section = document.querySelector(`section#notfound`);
		section.classList.add('visible');
		return;
	}

	const section = document.querySelector(`section#${view.ID}`);
	section.classList.add('visible');

	view.load({
		match,
		params: new URLSearchParams(search)
	});
};

document.body.addEventListener('click', (event) => {
	if (!event.target.closest('a')) return;

	event.preventDefault();

	const {href} = event.target;
	history.pushState({}, event.target.textContent, href);

	changeView();
});

window.addEventListener('popstate', changeView);

window.addEventListener('load', changeView);
