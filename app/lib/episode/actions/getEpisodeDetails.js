import {getState, updateState} from '../../state.js';
import {fetchPodcastDetails} from '../../podcast/actions/index.js';

export const getEpisodeDetails = async (podcastId, episodeId) => {
	await fetchPodcastDetails(podcastId);

	const {podcast} = getState();
	const {episodes} = podcast;
	const episode = episodes.find(({id}) => id === episodeId);
	if (!episode) throw new Error('Episode not found');

	updateState('episode', episode);
};
