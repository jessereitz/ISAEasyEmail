import { generateElement } from '../lib.js';

/**
 * defaultSaveButtonHandler - The default function to call when the save button
 *  is clicked. If the saveBtn has a proper saveHandler attached, this function
 *  will call that one.
 *
 */
function defaultSaveButtonHandler() {
  if (
    this.$saveBtn.saveHandler
    && typeof this.$saveBtn.saveHandler === 'function'
  ) {
    this.$saveBtn.saveHandler();
  }
}

/**
 * keydownHandler - Handle keydown events. If the modal is open and the user
 *  presses 'Enter', a click on the save button is simulated. If the 'Escape'
 *  key is pressed, a click on the close button is simulated.
 *
 * @param {Event} e The keydown event.
 *
 */
function keydownHandler(e) {
  if (e.key === 'Enter') {
    this.$saveBtn.click();
  } else if (e.key === 'Escape') {
    this.$closeBtn.click();
  }
}

/**
 * clickOffHandler - When open, checks to see if the user clicked off the modal
 *  window.
 *
 * @param {Event} e The click event.
 *
 */
function clickOffHandler(e) {
  if (e.target === this.$overlay) this.hide();
}

const Modal = {
  /**
   * init - Initializes the Modal. Creates the necessary elements to display
   *  Modal content.
   *
   * @returns {Modal} Returns this Modal.
   */
  init() {
    this.createOverlay();
    this.createWindow();
    this.createControlButtons();
    this.keydownHandler = keydownHandler.bind(this);
    this.clickOffHandler = clickOffHandler.bind(this);
  },

  /**
   * createOverlay - Creates the overall modal background. This is the grayed-
   *  out background to the modal which also acts as the modal container. Also
   *  sets the overlay style as appropiate.
   *
   * @returns {Element} The overlay Element.
   */
  createOverlay() {
    const style = {
      display: 'none',
      position: 'fixed',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      background: 'rgba(0,0,0,0.4)',
      'text-align': 'center',
      overflow: 'scroll',
    };
    this.$overlay = generateElement('div', { style });
    document.body.appendChild(this.$overlay);
    return this.overlay;
  },

  /**
   * createWindow - Creates the window which will contain the content passed to
   *  the modal. Sets appropriate styles and appends the window to the overlay.
   *
   * @returns {Element} Returns the window Element.
   */
  createWindow() {
    const style = {
      position: 'relative',
      'max-width': '700px',
      margin: '0 auto',
      top: '50%',
      transform: 'translateY(-50%)',
      padding: '1em 1rem',
      background: '#666',
      color: 'white',
      'font-family': "'Open Sans', sans-serif",
      'box-shadow': '0.2rem 0.2rem 2rem 0.75rem rgba(0,0,0,0.3)',
    };
    this.$window = generateElement('div', { style });

    this.$overlay.appendChild(this.$window);
    return this.window;
  },

  /**
   * createControlButtons - Creates the control buttons. The Modal has two
   *  control buttons: the saveButton and the closeButton. The saveButton has a
   *  defineable click handler (set by this.setupSave) and text (eg. 'Save,'
   *  'Copy,' etc). The closeButton is permanently set to 'Close' and has a
   *  permanent click handler which clears and closes the Modal.
   *
   * @returns {Element} Returns the div containing the control buttons.
   */
  createControlButtons() {
    this.$btnCtn = generateElement('div');
    this.$saveBtn = generateElement(
      'button',
      {
        klasses: ['standardBtn', 'standardBtn--dark'],
        style: { 'margin-right': '1rem' },
      },
    );
    this.$saveBtn.textContent = 'Save';
    this.$saveBtn.addEventListener('click', defaultSaveButtonHandler.bind(this));

    this.$closeBtn = generateElement(
      'button',
      { klasses: ['standardBtn', 'standardBtn--dark'] },
    );
    this.$closeBtn.textContent = 'Close';
    this.$closeBtn.addEventListener('click', this.hide.bind(this));
    this.$btnCtn.appendChild(this.$saveBtn);
    this.$btnCtn.appendChild(this.$closeBtn);
    this.$window.appendChild(this.$btnCtn);
    return this.$btnCtn;
  },

  /**
   * setSaveHandler - Sets the saveBtn's textContent and handler to those given.
   *
   * @param {string} text The text for the saveBtn to display.
   * @param {function} handler The function to call when the saveBtn is clicked.
   *
   * @returns {boolean} Returns true if the saveHandler was successfully set.
   *  Otherwise returns false.
   */
  setSaveHandler(text, handler) {
    if (handler && typeof handler === 'function') {
      this.$saveBtn.innerHTML = text;
      this.$saveBtn.saveHandler = handler;
      return true;
    }
    return false;
  },

  /**
   * display - Displays the Modal. Attaches the given content to the window and
   *  unhides the overlay.
   *
   * @param {Element} content The HTML to be displayed within the Modal.
   *
   * @returns {Element} Returns the Modal.
   */
  display($content) {
    this.$currentContent = $content;
    this.$window.insertBefore(this.$currentContent, this.$btnCtn);
    this.$overlay.style.display = 'block';
    document.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('click', this.clickOffHandler);
    return this.$overlay;
  },

  /**
   * hide - Hides the Modal and clears its contents.
   *
   */
  hide() {
    document.removeEventListener('keydown', this.keydownHandler);
    document.removeEventListener('click', this.clickOffHandler);
    this.$overlay.style.display = 'none';
    if (this.$currentContent) this.$window.removeChild(this.$currentContent);
    this.$currentContent = null;
    this.$saveBtn.saveHandler = null;
  },
};

export default Modal;
