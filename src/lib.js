export const DocumentFileType = 'ISAEmail_config';

/**
 * addStyleFromObj - Adds inline-style to a given HTML Element from the given
 *  style Object.
 *
 * @param {Element} $el   The HTML Element to which the styles will be added.
 * @param {object} styleObj The object which contains the styles. Must be
 *  formatted in the format { 'property' : 'value' } where 'property' is the
 *  CSS property and 'value' is the value to which it should be set.
 *  E.g. { color : 'purple' } will set $el's color to purple.
 *
 * @returns {Element} If the given styleObj is not an object or is null or
 *  undefined, will return false. If styles are successfully added, returns the
 *  HTML Element.
 */
export function addStyleFromObj($el, styleObj) {
  if (
    styleObj === null
    || styleObj === undefined
    || (!(typeof styleObj === 'object'))
  ) { return false; }
  let styleString = '';
  Object.keys(styleObj).forEach((prop) => {
    styleString += `${prop}: ${styleObj[prop]};`;
  });
  $el.setAttribute('style', styleString);
  return $el;
}

/**
 * addClasses - Add classes to an HTML Element.
 *
 * @param {Element} $el  The HTML Element to which the classes will be added.
 * @param {string || Array} klasses A single string or an array of strings
 *  representing the classes to be added to $el.
 *
 * @returns {Element} The original $el with classes attached.
 */
export function addClasses($el, klasses) {
  if (!klasses) return $el;
  if (Array.isArray(klasses)) {
    klasses.forEach((klass) => {
      if (typeof klass === 'string' && klass.length > 0) $el.classList.add(klass);
    });
  } else {
    $el.classList.add(klasses);
  }
  return $el;
}

/**
 * generateElement - Quickly generates an HTML element with given tagName,
 *  classes, and id.
 *
 * @param {string} [tagName=div] The tag name to use for the element.
 * @param {string|string[]}  [klasses=[]]  A single string or an array of
 *  strings representing the classes to be added to the element.
 * @param {object} [options={}] An optional object containing attributes to be
 *  added to the element. Each key must be a valid HTML attribute and the value
 *  must be a string.
 *
 * @returns {Element} The newly-created HTML element.
 */
export function generateElement(tagName = 'div', options = {}) {
  const $el = document.createElement(tagName);
  if (options && typeof options === 'object') {
    Object.keys(options).forEach((attr) => {
      if (attr === 'style') {
        addStyleFromObj($el, options[attr]);
      } else if (attr === 'klasses') {
        addClasses($el, options[attr]);
      } else if (attr === 'textContent') {
        $el.textContent = options[attr];
      } else if (attr === 'innerHTML') {
        $el.innerHTML = options[attr];
      } else {
        $el.setAttribute(attr, options[attr]);
      }
      return null;
    });
  }
  return $el;
}

/**
 * validateURL - A very simple url validator that checks for at least one dot
 *  and for http or https. If it has a dot but no http(s), http:// will be
 *  prepended before the url is returned.
 *
 * @param {string} url The url to validate
 *
 * @returns {string || boolean} Returns the url (with http:// prepended if
*   applicable) if url is valid. Else returns false.
 */
export function validateURL(url) {
  let returnVal;
  if (!url.includes('.')) return false;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    returnVal = `http://${url}`;
  } else {
    returnVal = url;
  }
  return returnVal;
}

export function generateStandardButton(innerHTML, addOptions = {}) {
  const options = addOptions;
  options.innerHTML = innerHTML;
  if (Array.isArray(options.klasses)) {
    options.klasses.push('standardBtn');
    options.klasses.push('standardBtn--dark');
  } else {
    options.klasses = ['standardBtn', 'standardBtn--dark'];
  }
  return generateElement('button', options);
}

/**
* generateCurrentDateString - Create a string representing the current date in
*  the format YYYY-MM-DD.
*
* @returns {string} Returns the current date in the format YYYY-MM-DD.
*/
export function generateCurrentDateString() {
  const date = new Date();
  const dateString = {};
  dateString.year = date.getFullYear();
  dateString.month = date.getMonth() + 1;
  dateString.dateNum = date.getDate();
  dateString.hours = date.getHours();
  dateString.minutes = date.getMinutes();
  Object.keys(dateString).forEach((key) => {
    const valAsString = String(dateString[key]);
    dateString[key] = (valAsString.length < 2) ? `0${valAsString}` : valAsString;
  });
  return `${dateString.year}-${dateString.month}-${dateString.dateNum} ${dateString.hours}:${dateString.minutes}`;
}

/**
 * cleanFileName - Replaces any illegal file characters with legal ones.
 *
 * @param {string} string The string to clean.
 *
 * @returns {string} Returns the cleaned string.
 */
export function cleanFileName(string) {
  // No control chars, no: /, \, ?, %, *, :, |, ", <, >
  let cleanedString = string.replace(/\/|\\|\?|%|\*|\|"|'|<|>'/g, '');
  cleanedString = cleanedString.replace(/:/g, '-');
  cleanedString = cleanedString.replace(/ /g, '_');
  return cleanedString;
}

/**
 * appendChildren - Append multiple children to a target node.
 *
 * @param {HTML Element} node     The node to which the children will be added.
 * @param {[HTML Element]} children The children to be added.
 *
 * @returns {HTML Element || false} Returns the node if successful. Otherwise
 *  returns false;
 */
export function appendChildren(node, children) {
  if (node instanceof Element && Array.isArray(children)) {
    children.forEach((child) => {
      if (child instanceof Element) node.appendChild(child);
      else throw Error(`Child ${child} is not an HTML Element`);
    });
    return node;
  }
  return false;
}


/**
 * findAncestorOfType - Finds the closest ancestor of the given node which
 *  matches the given type.
 *
 * @param {HTML Element} node The node for which to look for an ancestor
 *  matching the given type.
 * @param {String} type The type of node to look for, eg. 'DIV'
 *
 * @returns {HTML Element} Returns the ancestor matching the given type, if
 *  found. Otherwise, simply returns the document.
 */
export function findAncestorOfType(type, node) {
  if (!type || (type && typeof type !== 'string')) return document;
  if (!node || (node && !(node instanceof Element))) return document;
  if (node.tagName === type.toUpperCase() || node === document) {
    return node;
  }
  return findAncestorOfType(type, node.parentNode);
}
