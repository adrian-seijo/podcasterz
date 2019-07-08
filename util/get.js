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

	console.log(`Doing a request to "${url}"`);

	const reqUrl = parse(url);

	const {asJSON, ...config} = options;

	const reqOptions = {
		...reqUrl,
		...config,
		method: 'get',
	};

	const useHttps = url.startsWith('https');

	const req = (useHttps ? https : http).request(reqOptions, (res) => {

		console.log(`Request to "${url}" answer with "${res.statusCode}"`);

		if (res.statusCode >= 300 && res.statusCode <= 399) {
			const {location} = res.headers;
			get(location, options).then(resolve);
			return;
		}

		if (res.statusCode !== 200) {
			reject(res);
			return;
		}

		let data = '';

		res.setEncoding('utf8');
		res.on('error', reject);
		res.on('data', (chunk) => data += chunk);
		res.on('end', () => {
			if (!asJSON) {
				resolve({data, res});
				return;
			}

			try {
				resolve({data: JSON.parse(data), res});
			} catch (e) {
				reject(e);
			}
		});
	}).on('error', reject);

	req.end();
});

module.exports = get;
