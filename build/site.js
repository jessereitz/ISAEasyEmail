(function () {
  'use strict';

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
  function addStyleFromObj($el, styleObj) {
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
  function addClasses($el, klasses) {
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
  function generateElement(tagName = 'div', options = {}) {
    const $el = document.createElement(tagName);
    if (options && typeof options === 'object') {
      Object.keys(options).forEach((attr) => {
        if (attr === 'style') {
          addStyleFromObj($el, options[attr]);
        } else if (attr === 'klasses') {
          addClasses($el, options[attr]);
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
  function validateURL(url) {
    let returnVal;
    if (!url.includes('.')) return false;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      returnVal = `http://${url}`;
    } else {
      returnVal = url;
    }
    return returnVal;
  }

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
        this.$saveBtn.textContent = text;
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

  function loadField() {
    this.targetHTML = document.getElementById(this.targetID);
    this.input.value = this.targetHTML.href;
    return this;
  }

  function saveField() {
    const url = validateURL(this.input.value);
    if (url) {
      this.targetHTML.href = url;
      return true;
    }
    return false;
  }

  /**
   * createSettingsField - Creates a setting field. A settings field is an object
   *  consisting of an HTML div containing a label and input. It also contains
   *  reference to the HTML link in the email to which it corresponds. Each
   *  settingsField has a load method and a save method. The load method loads the
   *  current url to which the link points while the save method will validate the
   *  given url and set the link to point to it.
   *
   * @param {string} labelText The string to be displayed in the label.
   * @param {string} targetID  The id of the HTML element containing the link to
   *  which this field will be connected.
   *
   * @returns {Field} Returns the newly created field.
   */
  function createSettingsField(labelText, targetID) {
    const ctn = generateElement('div', { style: { 'text-align': 'left' } });
    const label = generateElement('label');
    label.textContent = labelText;
    const input = generateElement(
      'input',
      {
        type: 'text',
        style: {
          width: '100%',
          margin: '0.25em auto 1em auto',
          border: '1px solid #fff',
          'border-radius': '0.1em',
          padding: '0.25em',
        },
      },
    );
    ctn.appendChild(label);
    ctn.appendChild(input);
    const field = {
      ctn,
      label,
      input,
      targetID,
      load: loadField,
      save: saveField,
    };
    return field;
  }

  const SettingsView = {

    /**
     * init - Initialize the Settings view. Creates the applicable fields to allow
     *  users to adjust the settings of their email.
     *
     * @param {Modal} modal The Modal in which the SettingsView will be displayed.
     *
     * @returns {SettingsView} Returns this view.
     */
    init(modal) {
      this.modal = modal;
      this.fields = [];
      this.fields.push(createSettingsField('Advising Session URL:', 'advisingLink'));
      this.fields.push(createSettingsField('Application URL:', 'applicationLink'));
      return this;
    },

    /**
     * display - Displays this view, utilizing the modal.
     *
     * @returns {Element} Returns the modal containing this view.
     */
    display() {
      const ctn = generateElement('div');
      const heading = generateElement('h1');
      heading.textContent = 'Settings';
      ctn.appendChild(heading);
      this.fields.forEach((field) => {
        field.load();
        ctn.appendChild(field.ctn);
      });
      this.modal.setSaveHandler('Save', this.save.bind(this));
      return this.modal.display(ctn);
    },

    /**
     * save - Saves the user's settings by iterating through each field and
     *  calling its save method.
     *
     * @returns {boolean} Returns true if the settings were successfully saved.
     *  Otherwise returns false.
     */
    save() {
      this.fields.forEach(field => field.save());
      this.modal.hide();
      return true;
    },
  };

  document.addEventListener('DOMContentLoaded', () => {
    // let wfeditor = document.getElementById('wfeditor');
    // wfeditor = WriteFree(wfeditor, options);
    const ctn = document.createElement('div');
    ctn.innerHTML = `
    <label>Advising Session URL:</label><br>
    <input type="text" placeholder="Advising session URL">
  `;
    const modal = Object.create(Modal);
    modal.init();
    const settings = Object.create(SettingsView);
    settings.init(modal);

    const settingsBtn = document.getElementById('settingsBtn');

    document.addEventListener('click', (e) => {
      if (e.target === settingsBtn) {
        settings.display();
        settingsBtn.blur();
      }
    });
  });

}());
//# sourceMappingURL=site.js.map
