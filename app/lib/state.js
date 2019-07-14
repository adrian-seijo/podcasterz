import {showError} from './util/nav.js';

const state = {
	search: '',
	podcasts: null,
	podcast: null,
	episode: null
};

export const onStateChange = (cb) => window.addEventListener('state-change', ({detail}) => {
	try {
		cb(detail.key, detail.state);
	} catch (e) {
		console.error(e);
		showError();
	}
});

export const updateState = (key, value) => {
	state[key] = value;

	window.dispatchEvent(new CustomEvent('state-change', {
		detail: {
			key,
			state
		}
	}));
};

export const getState = () => state;
