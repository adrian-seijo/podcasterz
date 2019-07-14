import {updateState} from '../../state.js';
import {formatPodcastEntry} from '../../common/format.js';

const ITUNES_TOP_URL = '/.netlify/functions/top-podcasts';

let podcasts = null;

export const getTopPodcasts = async () => {
	const res = await fetch(ITUNES_TOP_URL);
	const {feed} = await res.json();
	const {entry: entries} = feed;

	podcasts = entries.reduce((result, entry) => {
		const data = formatPodcastEntry(entry);
		result.push(data);
		return result;
	}, []);

	updateState('podcasts', podcasts);
	return filterTopPodcasts();
};

export const filterTopPodcasts = () => {
	const search = new URLSearchParams(window.location.search);
	const urlSeach = search.get('q');

	if (!urlSeach) {
		return podcasts;
	}

	const terms = urlSeach.trim()
		.split(/\s+/)
		.filter((item) => item)
		.map((item) => item.toLowerCase());

	return podcasts.filter((podcast) => {
		return (
			terms.some((term) => {
				const {title, author} = podcast;
				return title.toLowerCase().includes(term) || author.toLowerCase().includes(term);
			})
		);
	});
};
