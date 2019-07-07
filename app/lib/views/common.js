
export const loadPodcastDetail = (podcast) => {

	const image = document.querySelector('aside img');
	image.src = podcast.image;

	const title = document.querySelector('aside h2');
	title.textContent = podcast.title;

	const author = document.querySelector('aside .author');
	author.textContent = podcast.author;

	const summary = document.querySelector('aside .summary');
	summary.textContent = podcast.summary;
};
