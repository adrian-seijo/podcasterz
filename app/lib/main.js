import {showError, showSection, isLoading} from './util/nav.js';
import home from './home/index.js';
import podcast from './podcast/index.js';
import episode from './episode/index.js';

const views = [
	home,
	podcast,
	episode
];

let currentView = null;

const setCurrentView = (view) => currentView = view;

export const updateView = async () => {
	try {
		isLoading(true);
		const {pathname} = window.location;

		let match;
		const view = views.find(({PATH}) => {
			match = pathname.match(PATH);
			return match;
		});

		if (!view) {
			showError('404 Not found! 🤷‍♂️');
			return;
		}

		if (currentView && currentView.ID === view.ID) return;
		if (currentView && currentView.leave) currentView.leave({match, view});

		showSection(view.SECTION);
		await view.enter({match, currentView});
		setCurrentView(view);
	} catch (e) {
		console.error(e);
		showError();
	} finally {
		isLoading(false);
	}
};

document.body.addEventListener('click', (event) => {
	if (!event.target.closest('a')) return;
	if (event.target.target === '_blank') return;

	event.preventDefault();

	const {href} = event.target;
	history.pushState({}, event.target.textContent, href);

	updateView();
});

window.addEventListener('popstate', updateView);

updateView();
