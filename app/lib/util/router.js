
export const getUrlDetails = () => {
	const {pathname, search} = window.location;

	const params = new URLSearchParams(search);
	const paths = pathname.split('/').slice(1);

	return {
		params,
		paths
	};
};

document.body.addEventListener('click', (event) => {
	if (!event.target.closest('a')) return;

	event.preventDefault();

	const {href} = event.target;
	history.pushState({}, event.target.textContent, href);

	console.log('NEW URL > ', getUrlDetails());
});

window.addEventListener('popstate', () => {
	console.log('NEW URL > ', getUrlDetails());
});
