/* eslint-env node */
const get = require('../util/get');

const ITUNES_URL = 'https://itunes.apple.com/lookup?entity=podcast&id=';

const handler = async (event) => {
	try {
		const {queryStringParameters} = event;
		const {id} = queryStringParameters;
		const {data} = await get(ITUNES_URL + id, {asJSON: true});

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
