import {updateState} from '../state.js';
import {formatPodcastEntry} from './format.js';

const ITUNES_TOP_URL = '/.netlify/functions/top-podcasts';

let podcasts = null;

const getTopPodcasts = async () => {
	const res = await fetch(ITUNES_TOP_URL);
	const {feed} = await res.json();
	const {entry: entries} = feed;

	podcasts = entries.reduce((result, entry) => {
		const data = formatPodcastEntry(entry);
		result.push(data);
		return result;
	}, []);

	updateState('podcasts', podcasts);
	return podcasts;
};

export default getTopPodcasts;
