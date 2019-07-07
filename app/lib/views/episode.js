
export const PATH = /^\/podcast\/(\d+)\/episode\/(.+)\/$/;
export const ID = 'episode';
export const SECTION = 'podcast';

export const load = ({match, currentView}) => {
	const episodesId = match[2];
	console.log('Episodes', episodesId);
	console.log(currentView);

	if (currentView && currentView.ID === 'podcast') {
		const list = document.querySelector('#episode-list');
		list.classList.remove('visible');

		const details = document.querySelector('#episode-details');
		details.classList.add('visible');

	} else {
		const visible = document.querySelector('section.visible');
		if (visible) visible.classList.remove('visible');

		const section = document.querySelector('section#podcast');
		if (section) section.classList.add('visible');
	}
};
