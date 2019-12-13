const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

const options = {SAFE_FOR_JQUERY: true, ALLOWED_TAGS: []};
const options2 = {SAFE_FOR_JQUERY: true, ALLOWED_TAGS: ['b', 'i']};

module.exports = {
  sanitize: (data) => DOMPurify.sanitize(data, options),
  safe: (data) => DOMPurify.sanitize(data, options) === data,
  safeRich: (data) => DOMPurify.sanitize(data, options2) === data
};
