
const state = {
	fetching: false,
	podcasts: null,
	podcast: null,
	episode: null
};

export const updateState = (key, value) => state[key] = value;

export const getState = () => state;
