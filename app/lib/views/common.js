import {updateElement} from '../util/dom.js';

export const renderPodcastDetail = (podcast) => {

	const {
		image,
		title,
		author,
		summary
	} = podcast;

	updateElement('aside img', {src: image});
	updateElement('aside h2', {textContent: title});
	updateElement('aside .author', {textContent: author});
	updateElement('aside .summary', {textContent: summary});
};
