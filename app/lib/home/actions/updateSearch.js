import {updateState} from '../../state.js';
import {filterTopPodcasts} from './filterTopPodcasts.js';

/**
 * Update the search querystring with the given value, udpate the state and call the filter podcast action
 * @param  {String} value
 */
export const updateSearch = (value) => {
	const search = new URLSearchParams(window.location.search);

	if (value && value.trim()) {
		search.set('q', value);
	} else {
		search.delete('q');
	}

	const urlSearch = search.toString();
	history.pushState({}, document.title, window.location.pathname + (urlSearch ? '?' + urlSearch : ''));

	updateState('search', value || null);
	filterTopPodcasts();
};
