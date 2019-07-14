import {getState, updateState} from '../../state.js';

/**
 * Go through the podcast list in state and filter out the items based on the search we have in the state
 * by adding a filteredOut property to them
 */
export const filterTopPodcasts = () => {
	const {podcasts, search} = getState();

	const terms = (search || '').trim()
		.split(/\s+/)
		.filter((item) => item)
		.map((item) => item.toLowerCase());

	const updatedPodcasts = (podcasts || []).map((podcast) => {

		if (!search) {
			return {
				...podcast,
				visible: true
			};
		}

		const visible = terms.some((term) => {
			const {title, author} = podcast;
			return title.toLowerCase().includes(term) || author.toLowerCase().includes(term);
		});

		return {
			...podcast,
			visible
		};
	});

	updateState('podcasts', updatedPodcasts);
};
