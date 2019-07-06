/* eslint-env node */
const get = require('../../util/get');

const ITUNES_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

const handler = async () => {
	try {
		const {data} = await get(ITUNES_URL, {asJSON: true});

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data, null, 4)
		};

	} catch (e) {
		return {
			statusCode: 500,
			body: e
		};
	}
};

exports.handler = handler;
