import {getState, onStateChange} from '../state.js';
import {debounce} from '../util/debounce.js';
import {fetchTopPodcasts, updateSearch} from './actions/index.js';

const search = document.querySelector('#search');
search.addEventListener('input', debounce(({target}) => updateSearch(target.value), 200));
search.value = new URLSearchParams(window.location.search).get('q');

onStateChange(async (key, state) => {
	if (key !== 'podcasts' && key !== 'search') return;

	const {renderList, renderSearch} = await import('./render.js');
	if (key === 'podcasts') renderList(state.podcasts);
	if (key === 'search') renderSearch(state.search);
});

const enter = async () => {
	const {podcasts} = getState();
	if (!podcasts) await fetchTopPodcasts();
};

export default {
	PATH: /^\/$/,
	ID: 'home',
	SECTION: 'home',
	enter
};
