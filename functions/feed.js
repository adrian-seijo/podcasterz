
const handler = (event, context, callback) => {

	const {queryStringParameters} = event;
	const {url} = queryStringParameters;

	console.log('Do a request to url');

	callback(null, {
		statusCode: 200,
		body: 'Hello, World'
	});
};

exports.handler = handler;
