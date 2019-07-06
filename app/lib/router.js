
import * as home from './home/index.js';
import * as podcast from './podcast/index.js';
import * as episode from './episode/index.js';

const views = [
	{
		key: '',
		view: home
	},
	{
		key: 'podcast',
		view: podcast
	},
	{
		key: 'episode',
		view: episode
	},
];

export const changeView = () => {
	const {pathname, search} = window.location;

	const params = new URLSearchParams(search);
	const paths = pathname.split('/').slice(1);

	const [basePath] = paths;

	const route = views.find(({key}) => key === basePath);

	const current = document.querySelector('section.visible');
	if (current) current.classList.remove('visible');

	if (!route) {
		const section = document.querySelector(`section#notfound`);
		section.classList.add('visible');
		return;
	}

	const section = document.querySelector(`section#${route.view.ID}`);
	section.classList.add('visible');

	route.view.load(params);
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
