const getLabelValue = (item) => {
	return item && item.label ? item.label : item;
};

const getDataFromElement = (doc, selector, attribute = null) => {
	const element = doc.querySelector(selector);
	if (!element) return null;
	if (!attribute) return element.textContent || null;
	return element.getAttribute(attribute) || null;
};

export const formatPodcastEntry = (entry) => {
	const {
		id: {
			attributes: {
				'im:id': id
			}
		},
		title,
		summary,
		'im:artist': author,
		'im:image': images
	} = entry;

	const image = images.reduce((result, {attributes, label}) => {
		const height = parseInt(attributes.height, 10);
		if (!height || height < result.height) return result;
		return {
			label,
			height
		};
	}, {});

	return Object.entries({
		id,
		title,
		summary,
		author,
		image
	}).reduce((res, [key, value]) => {
		res[key] = getLabelValue(value);
		return res;
	}, {});
};

export const getFeedData = (feed) => {

	const episodes = Array.from(feed.querySelectorAll('item'))
		.map((item) => {

			const title = getDataFromElement(item, 'title');
			const summary = getDataFromElement(item, 'summary');
			const episode = getDataFromElement(item, '*|episode');
			const duration = getDataFromElement(item, '*|duration');
			const date = getDataFromElement(item, 'pubDate');
			const file = getDataFromElement(item, 'enclosure', 'url');

			return {
				title,
				summary,
				episode,
				duration,
				date: date ? new Date(date) : null,
				file
			};
		})
		.sort((a, b) => b.date - a.date);

	const podcast = {
		title: getDataFromElement(feed, 'title'),
		author: getDataFromElement(feed, '*|author'),
		summary: getDataFromElement(feed, '*|summary'),
		image: getDataFromElement(feed, 'image url'),
		episodes
	};

	console.log('>>>', podcast);

	return podcast;
};
