import views  from './views/index.js';

let currentView = null;

export const updateView = () => {
	const {pathname} = window.location;

	let match;
	const view = views.find(({PATH}) => {
		match = pathname.match(PATH);
		return match;
	});

	if (!view) {
		const visible = document.querySelector(`section.visible`);
		if (visible) visible.classList.remove('visible');

		const section = document.querySelector(`section#notfound`);
		section.classList.add('visible');
		return;
	}

	if (currentView && currentView.ID === view.ID) return;
	if (currentView && currentView.leave) currentView.leave({match, view});

	view.enter({match, currentView});
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
