import {updateView} from '../../main.js';

export const onSearch = (event) => {
	const {target} = event;

	const search = new URLSearchParams(window.location.search);

	if (target.value) {
		search.set('q', target.value);
	} else {
		search.delete('q');
	}

	const urlSearch = search.toString();
	history.pushState({}, document.title, window.location.pathname + (urlSearch ? '?' + urlSearch : ''));

	updateView();
};
