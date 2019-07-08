
export const showSection  = (id) => {
	const current = document.querySelector('section.visible');

	if (current && current.id === id) return;

	const section = document.querySelector('section#' + id);
	if (!section) throw new Error('Section  not found');

	if (current) current.classList.remove('visible');
	section.classList.add('visible');
};

export const showError = (text = 'Oops! Something failed 🙀') => {
	const visible = document.querySelector(`section.visible`);
	if (visible) visible.classList.remove('visible');

	const title = document.querySelector('#error h2');
	title.textContent = text;

	const small = document.querySelector('#error small');
	small.textContent = 'check the console for details 🤫';

	const section = document.querySelector('#error');
	section.classList.add('visible');
};

export const isLoading = (value) => {
	document.querySelector('main').classList.toggle('loading', value);
};
