
const WHITELISTED_NODES = [
	'b', 'em', 'i',
	'p', 'span', 'div',
	'a'
];

const WHITELISTED_ATTRS = [
	'href'
];

const parser = new DOMParser();

/**
 * Given an selector and a block of text parse it with the DOMParse and filter out anything that is not
 * wbhitelisted. After that append the parsed document to the element that matches the selector.
 * @param  {HTMLElement} element
 * @param  {String} content
 */
export const safeAppendHTML = (selector, content) => {
	const doc = parser.parseFromString(content, 'text/html');

	doc.body.querySelectorAll('*').forEach((node) => {
		if (!WHITELISTED_NODES.includes(node.tagName.toLowerCase())) {
			node.remove();
			return;
		}

		const attrs = Array.from(node.attributes);
		attrs.forEach(({name}) => {
			if (!WHITELISTED_ATTRS.includes(name)) {
				node[name] = null;
			}
		});

		if (node.tagName.toLocaleLowerCase() === 'a') {
			node.target = '_blank';
			node.rel = 'noopener';
		}
	});

	const element = document.querySelector(selector);
	element.innerHTML = '';
	element.append(doc.body);
};

/**
 * Given a selector, an object with attributes and optionally a root document (by default `document`) execute
 * the selector on the root and use the key value paris in attrs to update the attrs of the found element
 * @param  {[type]} selector        [description]
 * @param  {[type]} attrs           [description]
 * @param  {[type]} [root=document] [description]
 * @return {[type]}                 [description]
 */
export const updateElement = (selector, attrs, root = document) => {
	const elements = root.querySelectorAll(selector);
	if (!elements.length) throw new Error(`Element "${selector}" not found`);

	elements.forEach((element) => {
		Object.entries(attrs)
			.forEach(([key, value]) => {
				if (typeof value === 'function') {
					element[key] = value(element);
				} else if (key === 'dataset') {
					Object.keys(value).forEach((prop) => element.dataset[prop] = value[prop]);
				} else {
					element[key] = value;
				}

			});
	});
};

/**
 * Given an list of selector and attributes and optionally a root element find the lements for each selector
 * and update the properties with the values received
 * @param  {Array.<String, Object>} list
 * @param  {HTMLElement?} 			root=document

 */
export const updateElements = (list, root = document) => {
	list.forEach(({selector, attrs}) => updateElement(selector, attrs, root));
};

/**
 * Given a template, a target node and a bunch of selectors and attbriutes clone the template, updateit based
 * on the received data and append it to the target. This method will return the target node.
 * @param  {HTMLTemplateElement} 		template
 * @param  {HTMLElement} 				parent
 * @param  {Object.<String, Object>} 	data
 * @return {HTMLElement}
 */
export const appendTemplate = (template, target, data) => {

	const fragment = document.importNode(template.content, true);
	data.forEach(({selector, attrs}) => updateElement(selector, attrs, fragment));
	target.append(fragment);

	return target;
};

/**
 * Given a selector and some elements find it, empty it and add the new elements to it
 * @param  {[type]} selector [description]
 * @param  {[type]} content  [description]
 * @return {[type]}          [description]
 */
export const replaceContent = (selector, content) => {
	const list = document.querySelector(selector);
	if (!list) throw new Error(`Element "${selector}" not found`);

	list.innerHTML = '';
	list.appendChild(content);
};

export const getDataFromElement = (doc, selector, attribute = null) => {
	const element = doc.querySelector(selector);
	if (!element) return null;
	if (!attribute) return element.textContent || null;
	return element.getAttribute(attribute) || null;
};
