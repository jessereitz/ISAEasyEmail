/**
 * toggleClicksEnabled - Disables or enables click, mousedown, and mouseup
 *  events in the document. Clicks are always enabled for the exit button and
 *  can be enabled for a given HTML element (the allowed parameter).
 *
 * @param {Element} allowed An HTML Element which should still be clickable.
 *
 */
export default function toggleClicksEnabled(allowed) {
  function disableClicks(e) {
    if (allowed instanceof Element && allowed.contains(e.target)) return false;
    if (this.$exitBtn.contains(e.target)) return toggleClicksEnabled.call(this);
    e.preventDefault();
    e.stopPropagation();
    return true;
  }
  if (document.disableFunction) {
    document.removeEventListener('click', document.disableFunction, true);
    document.removeEventListener('mousedown', document.disableFunction, true);
    document.removeEventListener('mouseup', document.disableFunction, true);
    document.disableFunction = null;
  }
  if (allowed && allowed instanceof Element) {
    document.disableFunction = disableClicks.bind(this);
    document.addEventListener('click', document.disableFunction, true);
    document.addEventListener('mousedown', document.disableFunction, true);
    document.addEventListener('mouseup', document.disableFunction, true);
  }
}
