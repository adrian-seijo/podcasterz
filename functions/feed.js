/* eslint-env node */
const http = require('http');
const https = require('https');
const {parse} = require('url');

/**
 * Wrapper around http.request that does http request to the given url.
 * Most of the options are the same as the regular node ones except for payload, which will be written to the request,
 * and asJSOn, that will trigger the automatic parsing of the url response as JSON before resolve the promise
 * @async
 * @param  {string} url
 * @param  {Object} [options={}]
 * @return {Object} The promise will resolve with an object containing two things, the `data` and the `res` object
 */
const get = (url, options = {}) => new Promise((resolve, reject) => {

	const reqUrl = parse(url);

	const reqOptions = {
		...reqUrl,
		...options,
		method: 'get',
	};

	const useHttps = url.startsWith('https');

	const req = (useHttps ? https : http).request(reqOptions, (res) => {

		if (res.statusCode !== 200) {
			reject(res);
			return;
		}

		let data = '';

		res.setEncoding('utf8');
		res.on('error', reject);
		res.on('data', (chunk) => data += chunk);
		res.on('end', () => resolve({data, res}));
	}).on('error', reject);

	req.end();
});

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
				'Content-Type': 'application/xml'
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
