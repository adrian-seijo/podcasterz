
export const showSection  = (id) => {
	const current = document.querySelector('section.visible');

	if (current && current.id === id) return;

	const section = document.querySelector('section#' + id);
	if (!section) throw new Error('Section  not found');

	if (current) current.classList.remove('visible');
	section.classList.add('visible');
};
