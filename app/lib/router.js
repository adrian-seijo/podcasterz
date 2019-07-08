import {showError} from './util/nav.js';
import views  from './views/index.js';

let currentView = null;

export const updateView = () => {
	try {
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

		view.enter({match, currentView});
		currentView = view;
	} catch (e) {
		console.error(e);
		showError();
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
