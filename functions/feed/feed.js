/* eslint-env node */
const get = require('../../util/get');

const handler = async (event) => {

	try {
		const {queryStringParameters} = event;
		const {url} = queryStringParameters;

		console.log('Do a request to url', url);

		const {data} = await get(url);
		console.log(data);

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'text/xml'
			},
			body: data
		};

	} catch (e) {
		return {
			statusCode: 500,
			body: e
		};
	}
};

exports.handler = handler;
