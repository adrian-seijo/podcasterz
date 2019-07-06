import views  from './views/index.js';

let currentView = null;

export const updateView = () => {
	const {pathname} = window.location;

	let match;
	const view = views.find(({PATH}) => {
		match = pathname.match(PATH);
		return match;
	});

	if (currentView && currentView.ID === view.ID) return;

	// const current = document.querySelector('section.visible');
	//
	// if (current && current.id === view.ID) return;
	// if (current) current.classList.remove('visible');
	//
	// if (!view) {
	// 	const section = document.querySelector(`section#notfound`);
	// 	section.classList.add('visible');
	// 	return;
	// }

	// const section = document.querySelector(`section#${view.ID}`);
	// section.classList.add('visible');

	view.load({match, currentView});
	currentView = view;
};

document.body.addEventListener('click', (event) => {
	if (!event.target.closest('a')) return;

	event.preventDefault();

	const {href} = event.target;
	history.pushState({}, event.target.textContent, href);

	updateView();
});

window.addEventListener('popstate', updateView);

updateView();
