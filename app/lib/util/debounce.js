
/**
 * Debounce the given method by the given amount of miliseconds
 * @param  {Function} cb
 * @param  {Number}   time
 * @return {Function}
 */
export const debounce = (cb, time) => {
	let timer;

	return (...args) => {
		window.clearTimeout(timer);
		timer = window.setTimeout(() => cb(...args), time);
	};
};
