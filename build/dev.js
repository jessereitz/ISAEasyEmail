(function (WriteFree) {
  'use strict';

  WriteFree = WriteFree && WriteFree.hasOwnProperty('default') ? WriteFree['default'] : WriteFree;

  /*\
  |*|
  |*|  :: cookies.js ::
  |*|
  |*|  A complete cookies reader/writer framework with full unicode support.
  |*|
  |*|  Revision #3 - July 13th, 2017
  |*|
  |*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
  |*|  https://developer.mozilla.org/User:fusionchess
  |*|  https://github.com/madmurphy/cookies.js
  |*|
  |*|  This framework is released under the GNU Public License, version 3 or later.
  |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
  |*|
  |*|  Syntaxes:
  |*|
  |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
  |*|  * docCookies.getItem(name)
  |*|  * docCookies.removeItem(name[, path[, domain]])
  |*|  * docCookies.hasItem(name)
  |*|  * docCookies.keys()
  |*|
  \*/

  var Cookies = {
    getItem: function (sKey) {
      if (!sKey) { return null; }
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            /*
            Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
            version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
            the end parameter might not work as expected. A possible solution might be to convert the the
            relative time to an absolute time. For instance, replacing the previous line with:
            */
            /*
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
            */
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      if (!this.hasItem(sKey)) { return false; }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: function () {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
      return aKeys;
    }
  };

  const DocumentFileType = 'ISAEmail_config';

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

  function generateStandardButton(innerHTML, addOptions = {}) {
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
  function generateCurrentDateString() {
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
  function cleanFileName(string) {
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
  function appendChildren(node, children) {
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
  function findAncestorOfType(type, node) {
    if (!type || (type && typeof type !== 'string')) return document;
    if (!node || (node && !(node instanceof Element))) return document;
    if (node.tagName === type.toUpperCase() || node === document) {
      return node;
    }
    return findAncestorOfType(type, node.parentNode);
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
      const klasses = ['modal-overlay'];
      this.$overlay = generateElement('div', { klasses });
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
      const klasses = 'modal-window';
      const id = 'main-modal';
      this.$window = generateElement('div', { klasses, id });
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
      this.$saveBtn = generateStandardButton(
        'Save',
        { style: { 'margin-right': '1rem' } },
      );
      this.$saveBtn.addEventListener('click', defaultSaveButtonHandler.bind(this));

      this.$closeBtn = generateStandardButton('Close');
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
    setSaveHandler(text = null, handler = null) {
      if (handler && typeof handler === 'function') {
        this.$saveBtn.innerHTML = text;
        this.$saveBtn.saveHandler = handler;
        this.$saveBtn.classList.remove('hide');
        return true;
      }
      this.$saveBtn.classList.add('hide');
      return false;
    },

    adjustHeight() {
      const windowRect = this.$window.getBoundingClientRect();
      if (windowRect.height > window.innerHeight) {
        this.$window.classList.add('no-transform');
      } else {
        this.$window.classList.remove('no-transform');
      }
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
      if (this.$currentContent) this.$window.removeChild(this.$currentContent);
      this.$currentContent = $content;
      this.$window.insertBefore(this.$currentContent, this.$btnCtn);
      this.$overlay.style.display = 'block';
      this.adjustHeight();
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

  /**
   * field - Base object for all fields.
   */
  const field = {

    /**
     * initField - Initializes the field. Creates the container, sets local vars.
     *
     * @param {Object} docInfo  The docInfo to use to load/save from.
     * @param {type} loadFunc Description
     * @param {type} saveFunc Description
     *
     * @returns {type} Description
     */
    initField(docInfo, saveFunc, loadFunc) {
      this.docInfo = docInfo;
      this.ctn = generateElement(
        'div',
        {
          klasses: ['settingsField'],
          style: { 'text-align': 'left' },
        },
      );
      if (
        (saveFunc && typeof saveFunc === 'function')
        || saveFunc === null
      ) {
        this.save = saveFunc;
      }
      if (
        (loadFunc && typeof loadFunc === 'function')
        || loadFunc === null
      ) {
        this.load = loadFunc;
      }
    },
  };

  /**
   * TextFieldBase - A Text Field provides label, input, and error message
   *  elements as well as basic save/load funcitonality (to provided docInfo
   *  object).
   */
  const TextFieldBase = {

    /**
     * init - Initialize a text field.
     *
     * @param {Object} docInfo   The docInfo to use to load/save from.
     * @param {String} labelText The string to be used in the label.
     * @param {type} targetID  The id of the HTML object which this settings field
     *  will affect.
     *
     * @returns {TextField} Returns the newly initialized TextField.
     */
    init(docInfo, labelText, targetID, saveFunc, loadFunc) {
      this.targetID = targetID;
      this.initField(docInfo, saveFunc, loadFunc);
      this.html = document.getElementById('targetID');
      this.ctn.appendChild(generateElement('label', { textContent: labelText }));
      this.input = generateElement('input', { type: 'text' });
      this.errorMessage = generateElement('div', { klasses: ['settingsField__error--message'] });
      this.ctn.classList.add('settingsField--transition');
      appendChildren(this.ctn, [this.input, this.errorMessage]);
      return this;
    },

    /**
     * save - Saves the value of the input to the docInfo.
     *
     */
    save() {
      this.docInfo[this.targetID] = this.input.value;
      if (this.html) this.textContent = this.input.value;
    },

    load() {
      this.input.value = this.docInfo[this.targetID];
    },

    /**
     * showError - Sets the error message to the given value then displays it.
     *
     * @param {String} msg The message to display as an error.
     *
     */
    showError(msg) {
      this.errorMessage.textContent = msg;
      this.errorMessage.style.display = 'block';
      this.input.classList.add('settingsField--error');
    },

    /**
     * hideError - Removes the error message text then hides it.
     *
     */
    hideError() {
      this.errorMessage.textContent = '';
      this.errorMessage.style.display = 'none';
      this.input.classList.remove('settingsField--error');
    },

    /**
     * display - Display the text field.
     *
     */
    display() {
      if (this.prevValue) {
        this.input.value = this.prevValue;
      }
      this.ctn.style.maxHeight = '10em';
      this.hidden = false;
    },

    /**
     * hide - Hide the text field.
     *
     */
    hide() {
      this.prevValue = this.input.value;
      this.input.value = '';
      this.ctn.style.maxHeight = 0;
      this.hidden = true;
    },

    /**
     * value - Get the current value of the input.
     *
     * @returns {String} Returns the current value of the input.
     */
    value() {
      return this.input.value;
    },
  };

  const TextField = Object.assign(TextFieldBase, field);

  /**
   * SwitchFieldBase - A SwitchField creates a toggle switch.
   */
  const SwitchFieldBase = {

    /**
     * init - Initializes the Switch Field. Creates all the necessary HTML
     *  elements to display it properly.
     *
     * @param {type} docInfo   Description
     * @param {type} labelText Description
     * @param {type} targetID  Description
     *
     * @returns {type} Description
     */
    init(docInfo, labelText, targetID, saveFunc, loadFunc) {
      this.targetID = targetID;
      this.initField(docInfo, saveFunc, loadFunc);
      this.labelCtn = generateElement('label', { klasses: ['switch'] });
      this.labelTxt = generateElement('span', { klasses: ['sitch-text'], textContent: labelText });
      this.input = generateElement('input', { type: 'checkbox', checked: 'true' });
      this.slider = generateElement('span', { klasses: ['slider'] });
      appendChildren(this.labelCtn, [this.labelTxt, this.input, this.slider]);
      this.ctn.appendChild(this.labelCtn);
    },

    /**
     * save - Save the state of the switch.
     *
     */
    save() {
      this.docInfo[this.targetID] = this.input.checked;
    },

    /**
     * load - Load the state of the switch.
     *
     */
    load() {
      this.input.checked = this.docInfo[this.targetID];
    },

    /**
     * value - Returns the current state of the switch.
     *
     * @returns {boolean} Returns true if switch is checked else false.
     */
    value() {
      return this.input.checked;
    },
  };
  const SwitchField = Object.assign(SwitchFieldBase, field);

  /**
   * OptionalLinkFieldBase - An Optional Link Field provides a Switch Field and
   *  Text Field together. This allows the user to choose if they want to include
   *  the link at all and let's them edit the url for that link.
   */
  const OptionalLinkFieldBase = {

    /**
     * init - Initializes the Optional Link Field. Creates the Switch Field and
     *  Text Field.
     *
     * @param {Object} docInfo    The docInfo to read from and save to.
     * @param {String} fieldTitle The title of the field.
     * @param {String} targetID   The string to use as the property name when
     *  reading from/writing to the docInfo. This is also used to find and set the
     *  link in the HTML.
     *
     * @returns {type} Description
     */
    init(docInfo, fieldTitle, targetID) {
      this.fieldTitle = fieldTitle;
      this.targetID = targetID;
      this.initField(docInfo);
      this.html = document.getElementById(targetID);

      this.switchField = Object.create(SwitchField);
      this.textField = Object.create(TextField);

      this.switchField.init(this.docInfo.links, `Include ${fieldTitle} Link:`, '', null, null);
      this.textField.init(this.docInfo.links, `${fieldTitle} URL:`);

      this.switchField.ctn.classList.remove('settingsField');
      this.textField.ctn.classList.remove('settingsField');

      this.showError = this.textField.showError.bind(this.textField);
      this.hideError = this.textField.hideError.bind(this.textField);

      appendChildren(this.ctn, [this.switchField.ctn, this.textField.ctn]);

      this.switchField.input.addEventListener('change', this.switchChangeListener.bind(this));
    },

    /**
     * setHTML - Sets the state of the HTML based on the values of the Switch
     *  Field and Text Field. If the switch is checked then the HTML is displayed
     *  with its href set to the value of the textField.
     *
     */
    setHTML() {
      if (this.html) {
        if (this.switchField.value()) {
          const url = validateURL(this.textField.value());
          if (!url) throw Error('Invalid URL');
          this.html.href = url;
          this.html.style.display = 'block';
        } else {
          this.html.style.display = 'none';
        }
      }
    },

    /**
     * switchChangeListener - Hides or displays the text field depending on the
     *  state of the switch.
     *
     */
    switchChangeListener() {
      if (this.switchField.value() === true) {
        this.textField.display();
      } else {
        this.textField.hide();
      }
    },

    /**
     * save - Saves the state of the Optional Link Field. If the switch is checked
     *  and there is a valid url in the text field, it will be saved to the
     *  docInfo. Otherwise, it will be removed from the docInfo.
     *
     */
    save() {
      let val = null;
      if (this.switchField.value() === true) {
        const url = validateURL(this.textField.value());
        if (!url) throw Error('Invalid URL');
        if (this.html) this.html.href = url;
        val = {
          text: this.html ? this.html.textContent : null,
          url,
        };
      }
      this.setHTML();
      this.docInfo[this.targetID] = val;
    },

    /**
     * load - Loads the state of the Optional Link Field form the docInfo and sets
     *  the HTML.
     *
     */
    load() {
      if (this.docInfo[this.targetID]) {
        this.switchField.input.checked = true;
        this.textField.input.value = this.docInfo[this.targetID].url;
        this.textField.display();
      } else {
        this.switchField.input.checked = false;
        this.textField.hide();
      }
      this.setHTML();
    },
  };

  const OptionalLinkField = Object.assign(OptionalLinkFieldBase, field);

  const SettingsView = {
    $ctn: generateElement('div'),
    $heading: generateElement('h1', { textContent: 'Settings' }),

    /**
     * init - Initialize the Settings view. Creates the applicable fields to allow
     *  users to adjust the settings of their email.
     *
     * @param {Modal} modal The Modal in which the SettingsView will be displayed.
     *
     * @returns {SettingsView} Returns this view.
     */
    init(modal, docInfo) {
      this.modal = modal;
      this.docInfo = docInfo;
      this.$ctn.innerHTML = '';
      this.$ctn.appendChild(this.$heading);
      this.generateFields();
      return this;
    },

    /**
     * generateFields - Generates the settings fields. then loads them.
     *
     */
    generateFields() {
      this.fields = [];

      const title = Object.create(TextField);
      title.init(this.docInfo, 'Email Title', 'title');

      const advisingLink = Object.create(OptionalLinkField);
      advisingLink.init(this.docInfo.links, 'Advising Session', 'advisingLink');

      const applicationLink = Object.create(OptionalLinkField);
      applicationLink.init(this.docInfo.links, 'Application Link', 'applicationLink');

      this.fields.push(title, advisingLink, applicationLink);
      this.loadFields();
    },

    /**
     * loadFields - Updates the current value of the fields.
     *
     */
    loadFields() {
      this.fields.forEach((field) => {
        field.load(field.input);
        this.$ctn.appendChild(field.ctn);
      });
    },

    /**
     * display - Displays this view, utilizing the modal.
     *
     * @returns {Element} Returns the modal containing this view.
     */
    display() {
      this.loadFields();
      this.modal.setSaveHandler('Save', this.save.bind(this));
      return this.modal.display(this.$ctn);
    },

    /**
     * save - Saves the user's settings by iterating through each field and
     *  calling its save method.
     *
     * @returns {boolean} Returns true if the settings were successfully saved.
     *  Otherwise returns false.
     */
    save() {
      const errors = [];
      this.fields.forEach((field) => {
        try {
          if (field.hideError) field.hideError();
          field.save();
        } catch (err) {
          if (field.showError) {
            field.showError(err.message);
          } else {
            throw err;
          }
          errors.push(err);
        }
      });
      if (errors.length === 0) this.modal.hide();
      return true;
    },
  };

  const CopyView = {
    $ctn: generateElement('div'),
    $heading: generateElement('h1', { textContent: 'Copy Your Email' }),
    $description: generateElement('p'),
    $textarea: generateElement(
      'textarea',
      {
        style: {
          width: '35rem',
          height: '10rem',
          resize: 'vertical',
        },
      },
    ),
    /**
     * init - Initialize the copy view. The copy view displays a text box filled
     *  with the content of the email editor.
     *
     * @param {Modal} modal The Modal in which the CopyView will be displayed.
     *
     * @returns {CopyView} Returns this view.
     */
    init(modal) {
      this.modal = modal;
      this.$description.textContent = 'Copy the code for your email below.';

      this.$ctn.appendChild(this.$heading);
      this.$ctn.appendChild(this.$description);
      this.$ctn.appendChild(this.$textarea);
      return this;
    },

    /**
     * fillText - Fill the view with the text to be copied.
     *
     * @param {string} text The text to be copied.
     *
     */
    fillText(text) {
      this.$textarea.value = text;
      return this.$textarea;
    },

    /**
     * copyContents - Copy the contents of the copy view.
     *
     * @returns {string} Returns the copied content.
     */
    copyContents() {
      this.$textarea.focus();
      this.$textarea.select();
      let successful;
      try {
        successful = document.execCommand('copy');
      } catch (exc) {
        successful = false;
      }
      if (successful) {
        this.$heading.textContent = 'Email Content Copied!';
        this.$description.textContent = 'You can now paste the email content into GRS.';
      } else {
        this.$heading.textContent = 'Uh oh...';
        this.$description.textContent = "We couldn't copy the email content. Try again or manually copy the content below";
      }
      return successful;
    },

    /**
     * display - Displays the view, utilizing the modal.
     *
     * @returns {Element} Returns the modal containing this view.
     */
    display() {
      this.modal.setSaveHandler('Copy', this.copyContents.bind(this));
      return this.modal.display(this.$ctn);
    },

    /**
     * displayAndCopy - This function fills, copies, and displays the copyView in
     *  one fell swoop.
     *
     * @param {string} content The content to be displayed/copied.
     *
     * @returns {boolean} Returns true if successfully copied. Else returns false.
     */
    displayAndCopy(content) {
      this.fillText(content);
      this.display();
      return this.copyContents();
    },
  };

  const style = {
    display: 'inline-block',
    width: '13em',
    height: '7em',
  };

  const saveLoadView = {
    fileType: 'ISAEmail_config',
    $ctn: generateElement('div'),
    $heading: generateElement('h1', { textContent: 'Save / Load an Email' }),
    $loadBtn: generateStandardButton('Load a Previous Email', { style }),
    $saveBtn: generateStandardButton('Save Current Email', { style }),
    $btnSeparator: generateElement(
      'div',
      {
        style: {
          width: '1px',
          height: '10rem',
          background: '#ddd',
          display: 'inline-block',
          'vertical-align': 'middle',
          margin: '1rem 2rem',
        },
      },
    ),

    /**
     * init - Initialize the saveLoadView. Saves a reference to the modal it will
     *  use as well as a loadCallBack called when the user updloads a config file,
     *  and a getDocInfo function used when generating a config file for saving.
     *
     * @param {Modal} modal           The modal used to display the saveLoadView.
     * @param {function} loadCallback The function called once the file uploaded
     *  by a user is processed.
     * @param {function} getDocInfo   The function called to get information about
     *  the doucment to be saved (eg. title, contents, etc)
     *
     * @returns {saveLoadView} Returns this saveLoadView.
     */
    init(modal, loadCallback, getDocInfo) {
      this.modal = modal;
      this.loadCallback = loadCallback;
      this.getDocInfo = getDocInfo;

      this.$ctn.append(this.$heading);
      this.$ctn.append(this.$loadBtn);
      this.$ctn.append(this.$btnSeparator);
      this.$ctn.append(this.$saveBtn);

      this.$loadBtn.addEventListener('click', this.load.bind(this));
      this.$saveBtn.addEventListener('click', this.save.bind(this));
      return this;
    },

    /**
     * load - This function, attached as a 'click' handler for $loadBtn, prompts
     *  the user to select a config file, parses that file, and loads that file in
     *  the editor.
     *
     * @param {Event} event The click event to handle.
     *
     */
    load(event) {
      event.preventDefault();
      const fileInput = generateElement(
        'input',
        { type: 'file', style: { display: 'none' } },
      );
      fileInput.addEventListener('change', this.parseFile.bind(this));
      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
    },

    /**
     * parseFile - This function is attached as a 'change' handler to the
     *  fileInput created in this.load. It parses the uploaded file, ensures it's
     *  the proper format and type of file, then calls the loadCallback, passing
     *  in the configuration information for the Editor to load.
     *
     * @param {Event} event The change event to handle.
     *
     */
    parseFile(event) {
      const file = event.target.files[0];
      if (!file) return false;
      const reader = new FileReader();
      reader.onload = () => {
        const docInfo = JSON.parse(reader.result);
        if (!docInfo.fileType === 'ISAEmail_config') return false;
        this.loadCallback(docInfo);
        this.modal.hide();
        return docInfo;
      };
      reader.readAsText(file);
      return true;
    },

    /**
     * save - This function is attached as a 'click' handler to this.$saveBtn.
     *  When called, this function will generate the configuration file by calling
     *  the this.getDocInfo function. If there is a title in the doc info
     *  obtained, this will be used as the name of the file. Otherwise it will use
     *  a generic name.
     *
     * @returns {boolean} Returns true if the file was successfully created. Else
     *  it returns false.
     */
    save(e) {
      e.preventDefault();
      const rawDocInfo = this.getDocInfo();
      if (!rawDocInfo) return false;
      rawDocInfo.fileType = this.fileType;
      const docInfo = JSON.stringify(rawDocInfo);
      const href = `data:text/plain;charset=utf-8,${encodeURIComponent(docInfo)}`;
      const downloadLink = generateElement(
        'a',
        {
          href,
          download: `${cleanFileName(rawDocInfo.title)}.isaemail`,
          style: { display: 'none' },
        },
      );
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      this.modal.hide();
      return true;
    },

    /**
     * display - Calls the modal's display method, passing in this.$ctn.
     *
     * @returns {Element} Returns the modal containing this saveLoadView.
     */
    display() {
      this.modal.setSaveHandler('Ok', this.modal.hide());
      return this.modal.display(this.$ctn);
    },
  };

  var SimpleHelp = {
    /**
     * init - Initializes this simpleHelp view. The simpleHelp view simply
     *  displays a list of steps, one at a time or all at once. The user can click
     *  through each step or choose to display all on a single page.
     *
     * @param {string} title The title of the simpleHelp view. This is used in the
     *  H1 element at the top of the modal.
     * @param {Element[]} steps An array of HTML elements, steps represents each
     *  step for the help view.
     *
     * @returns {simpleHelp} Returns this simpleHelp view.
     */
    init(title, steps, modal) {
      this.initHTML();
      this.$heading.textContent = title;
      this.steps = steps;
      this.modal = modal;
      this.steps.map(step => this.$allSteps.appendChild(step.cloneNode(true)));

      this.$ctn.appendChild(this.$heading);

      this.$btnCtn.appendChild(this.$prevBtn);
      this.$btnCtn.appendChild(this.$displayAllBtn);
      this.$btnCtn.appendChild(this.$nextBtn);
      this.$ctn.appendChild(this.$btnCtn);
      this.setCurrentStep(0);
      this.$nextBtn.addEventListener('click', this.nextStep.bind(this));
      this.$prevBtn.addEventListener('click', this.prevStep.bind(this));
      this.$displayAllBtn.addEventListener('click', this.toggleDisplayAll.bind(this));
      return this;
    },

    initHTML() {
      this.$ctn = generateElement('div');
      this.$heading = generateElement('h1');
      this.$allSteps = generateElement('div');
      this.$btnCtn = generateElement('div');
      this.$prevBtn = generateStandardButton('Previous');
      this.$nextBtn = generateStandardButton('Next');
      this.$displayAllBtn = generateStandardButton('Display All Steps', { klasses: ['standardBtn--margin-right-large', 'standardBtn--margin-left-large'] });
    },

    /**
     * setCurrentStep - Sets the current step index to that given or to all then
     *  displays the appropriate step.
     *
     * @param {number|string} stepIndex If number, this function will display the
     *  step at the corresponding index in this.steps. If 'all', this function
     *  will display all steps.
     *
     * @returns {boolean} Returns true if the requested step is displayed properly
     *  otherwise returns false.
     */
    setCurrentStep(stepIndex) {
      if (String(stepIndex).toLowerCase() !== 'all' && !this.steps[stepIndex]) return false;
      let stepHTML = null;
      // Remove currently displayed step.
      if (this.currentStep === 'all') {
        this.$ctn.removeChild(this.$allSteps);
      } else if (this.currentStep >= 0) {
        this.$ctn.removeChild(this.steps[this.currentStep]);
      }
      this.currentStep = stepIndex;
      // Set and display new current step.
      if (String(stepIndex).toLowerCase() === 'all') {
        stepHTML = this.$allSteps;
      } else {
        stepHTML = this.steps[stepIndex];
      }
      // this.$ctn.insertBefore(stepHTML, this.$btnCtn);
      this.$ctn.appendChild(stepHTML);
      this.toggleDisabledButtons();
      return true;
    },

    /**
     * toggleDisabledButtons - Toggles the disabled state on $nextBtn and $prevBtn.
     *  If there is no step after the current one, $nextBtn will be disabled. If
     *  there is no step before the current one, $prevBtn will be disabled.
     *
     */
    toggleDisabledButtons() {
      let prevDisabled = false;
      let nextDisabled = false;
      let displayAllText = 'Display All Steps';
      if (this.currentStep === 'all') {
        nextDisabled = true;
        prevDisabled = true;
        displayAllText = 'Display Single Step';
      } else {
        displayAllText = 'Display All Steps';
        if (this.steps[this.currentStep - 1]) {
          prevDisabled = false;
        } else {
          prevDisabled = true;
        }
        if (this.steps[this.currentStep + 1]) {
          nextDisabled = false;
        } else {
          nextDisabled = true;
        }
      }
      this.$prevBtn.disabled = prevDisabled;
      this.$nextBtn.disabled = nextDisabled;
      this.$displayAllBtn.textContent = displayAllText;
    },

    /**
     * prevStep - Displays the previous step, if it exists.
     *
     */
    prevStep() {
      if (this.currentStep !== 'all' && this.steps[this.currentStep - 1]) {
        this.render(this.currentStep - 1);
      }
    },

    /**
     * nextStep - Displays the next step, if it exists.
     *
     */
    nextStep() {
      if (this.currentStep !== 'all' && this.steps[this.currentStep + 1]) {
        this.render(this.currentStep + 1);
      }
    },

    /**
     * toggleDisplayAll - Will either display all steps on a single page or the
     *  first step, depending on what is already displayed.
     *
     */
    toggleDisplayAll() {
      if (this.currentStep === 'all') {
        this.render(0);
      } else {
        this.render('all');
      }
    },

    /**
     * render - Renders this simpleHelp by setting the current step to that given
     *  and calling the modal's display method.
     *
     * @returns {Element} Returns this.$ctn.
     */
    render(step) {
      let newStep = step;
      if (!(newStep >= 0) && newStep !== 'all') {
        newStep = this.currentStep;
      }
      this.setCurrentStep(newStep);
      this.modal.display(this.$ctn);
    },
  };

  /**
   * toggleClicksEnabled - Disables or enables click, mousedown, and mouseup
   *  events in the document. Clicks are always enabled for the exit button and
   *  can be enabled for a given HTML element (the allowed parameter).
   *
   * @param {Element} allowed An HTML Element which should still be clickable.
   *
   */
  function toggleClicksEnabled(allowed) {
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

  const substeps = [
    {
      target: 'tutorialExitBtn',
      description: `
      <p>Click this button at any time to exit this tutorial.</p>
    `,
    },
    {
      target: 'wfeditor',
      description: `
      <p>This is the editor and preview section. This section allows you to compose and edit your email.</p>
    `,
    },
    {
      target: 'controller',
      description: `
      <p>These buttons allow you to manipulate your email in a broad manner, similar to the File menu in most programs.</p>
    `,
    },
    {
      target: 'metaDisplayCtn',
      description: `
      <p>You can see important info about your email here, such as its title.</p>
    `,
    },
    {
      target: 'helpBtnCtn',
      description: `
      <p>Click this button if you ever need help with ISA Easy Email or if you would like to go through this tutorial again.</p>
    `,
    },
  ];

  function layoutOverview() {
    let currentIndex = 0;
    const nextBtn = generateStandardButton('Continue');
    toggleClicksEnabled.call(this, nextBtn);
    const next = function next() {
      if (currentIndex === 0) this.$window.classList.remove('vertical-center');
      if (!substeps[currentIndex]) {
        toggleClicksEnabled.call(this);
        return this.nextStep();
      }
      const target = document.getElementById(substeps[currentIndex].target);
      this.highlight(target);
      this.positionWindow(target);
      this.$window.innerHTML = substeps[currentIndex].description;
      this.$window.appendChild(nextBtn);
      currentIndex += 1;
      return null;
    };

    nextBtn.addEventListener('click', next.bind(this));

    this.$window.innerHTML = `
    <h1>Welcome!</h1>
    <p>
      This tutorial is designed to take you through the core features and
      functions of the ISA Easy Email Generator. We'll start with a basic
      overview of the layout of the page. Click "Continue" below to begin.
    </p>
  `;
    this.$window.appendChild(nextBtn);
    this.centerWindow();
  }

  var editorOverview = (function init() {
    let editor; let editBtns; let insertBtns; let firstEditorPar;
    // An Array of the substeps through which the user will proceed
    const substeps = [];
    let currentStep = 0;
    // Reusable button to proceed to the next substep
    const nextBtn = generateStandardButton('Next');
    // Length of time in ms which the demo will display the effects of each edit button
    const demoButtonDuration = 750;
    const demoButtonInitialDelay = 250;

    /**
     * selectNodeContents - Selects the contents of the given node.
     *
     * @param {Element} node The HTML Element to select.
     *
     */
    function selectNodeContents(node) {
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    /**
     * selectFirstParagraphContents - Finds and selects the very first paragraph
     *  in the editor.
     *
     */
    function selectFirstParagraphContents() {
      firstEditorPar = editor.firstChild.firstChild;
      selectNodeContents(firstEditorPar);
    }

    /**
     * nextSubStep - Proceed to the next substep in the substeps array. If the
     *  user is at the final substep, this function calls the overarching nextStep
     *  function to proceed to the next section.
     *
     */
    function nextSubStep() {
      currentStep += 1;
      if (!substeps[currentStep]) return this.nextStep();
      substeps[currentStep].call(this);
      return null;
    }

    /**
     * prepNextBtn - Prepares the nextBtn to be used. This must be called each
     *  time the nextBtn is to be used. Otherwise, the current step will be set to
     *  a previous value if the user exits then relaunches the tutorial.
     *
     */
    function prepNextBtn() {
      if (nextBtn.handler) {
        nextBtn.removeEventListener('click', nextBtn.handler);
      }
      nextBtn.handler = nextSubStep.bind(this);
      nextBtn.addEventListener('click', nextBtn.handler);
    }

    /**
     * getEditButtons - Finds all buttons in the edit toolbar in the document.
     *  Returns these buttons in an object.
     *
     */
    function getEditButtons() {
      return {
        bold: document.querySelector('[title="Bold Selection"]'),
        italic: document.querySelector('[title="Italicize Selection"]'),
        heading: document.querySelector('[title="Wrap Selection with Heading"]'),
        link: document.querySelector('[title="Wrap Selection with Link"]'),
      };
    }

    /**
     * getInsertButtons - Finds all buttons in the insert toolbar in the document.
     *  Returns these buttons in an object.
     *
     */
    function getInsertButtons() {
      return {
        image: document.querySelector('[title="Insert an Image"]'),
        line: document.querySelector('[title="Insert a Horizontal Rule"]'),
      };
    }

    /**
     * toggleClicksEnabled - Disables or enables click, mousedown, and mouseup
     *  events in the document. Clicks are always enabled for the exit button and
     *  can be enabled for a given HTML element (the allowed parameter).
     *
     * @param {Element} allowed An HTML Element which should still be clickable.
     *
     */
    function toggleClicksEnabled(allowed) {
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
      } else {
        document.disableFunction = disableClicks.bind(this);
        document.addEventListener('click', document.disableFunction, true);
        document.addEventListener('mousedown', document.disableFunction, true);
        document.addEventListener('mouseup', document.disableFunction, true);
      }
    }

    /**
     * intro - The introduction to the Editor. Displays a brief overview message.
     *
     */
    substeps[0] = function intro() {
      this.$window.innerHTML = `
      <p>
        Let's talk about the editor first. It allows you to easily compose an
        email complete with images, links, and common styling elements.
      </p>
    `;
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };

    /**
     * tryTyping - This substep has the user try typing in the editor. The user
     *  must type in the targetText completely and exactly in order to proceed.
     *
     */
    substeps[1] = function tryTyping() {
      const targetText = 'Hello Students!';
      this.$window.innerHTML = `
      <p>
        Let's see what this thing can do! Try typing "${targetText}" in the editor.
      </p>
    `;
      const boundIsHelloStudents = function isHelloStudents() {
        if (firstEditorPar.textContent === targetText) {
          editor.removeEventListener('keyup', boundIsHelloStudents);
          nextSubStep.call(this);
        }
      }.bind(this);
      editor.addEventListener('keyup', boundIsHelloStudents);
    };

    /**
     * displayEditToolbar - This substep selects the just-entered text to display
     *  the edit toolbar. It then adds the next button to the window for the user
     *  to proceed.
     *
     */
    substeps[2] = function displayEditToolbar() {
      this.$window.innerHTML = `
      <p>
        Perfect. Did you notice I highlighted the text you entered?
        Highlighting text will bring up the editing toolbar which allows you to
        manipulate the text.
      </p>
    `;
      toggleClicksEnabled.call(this, nextBtn);
      setTimeout(() => {
        selectFirstParagraphContents();
        setTimeout(() => {
          prepNextBtn.call(this);
          this.$window.appendChild(nextBtn);
        }, demoButtonDuration);
      }, demoButtonInitialDelay);
    };

    /**
     * highlightBoldBtn - Highlights and demonstrates the bold button.
     *
     */
    substeps[3] = function highlightBoldBtn() {
      this.$window.innerHTML = `
      <p>
        The "B" button bolds your selection.
      </p>
    `;
      selectFirstParagraphContents();
      setTimeout(() => {
        // temporarily reenable clicks, click on bold button, disable clicks
        toggleClicksEnabled.call(this);
        editBtns.bold.click();
        toggleClicksEnabled.call(this);
        setTimeout(() => {
          toggleClicksEnabled.call(this);
          editBtns.bold.click();
          toggleClicksEnabled.call(this, nextBtn);
          this.$window.appendChild(nextBtn);
        }, demoButtonDuration);
      }, demoButtonInitialDelay);
      prepNextBtn.call(this);
      editBtns.bold.prevBorder = editBtns.bold.style.borderColor;
      editBtns.bold.style.borderColor = 'white';
    };

    /**
     * highlightItalicBtn - Highlights and demonstrates the italic button.
     *
     */
    substeps[4] = function highlightItalicBtn() {
      this.$window.innerHTML = `
      <p>
        The "i" button italicizes your selection.
      </p>
    `;
      selectFirstParagraphContents();
      setTimeout(() => {
        // temporarily reenable clicks, click on italic button, disable clicks
        toggleClicksEnabled.call(this);
        editBtns.italic.click();
        toggleClicksEnabled.call(this);
        setTimeout(() => {
          toggleClicksEnabled.call(this);
          editBtns.italic.click();
          toggleClicksEnabled.call(this, nextBtn);
          this.$window.appendChild(nextBtn);
        }, demoButtonDuration);
      }, demoButtonInitialDelay);
      prepNextBtn.call(this);
      editBtns.bold.style.borderColor = editBtns.bold.prevBorder;
      editBtns.italic.prevBorder = editBtns.italic.style.borderColor;
      editBtns.italic.style.borderColor = 'white';
    };

    /**
     * highlightHeadingBtn - Highlights and demonstrates the heading button. It
     *  does this by cycling through all heading options and back to normal.
     *
     */
    substeps[5] = function highlightHeadingBtn() {
      this.$window.innerHTML = `
      <p>
        The "H" button wraps your selection in a heading. There are two heading
        styles to choose from. Clicking this button will cycle through the
        heading and normal styles.
      </p>
    `;
      selectFirstParagraphContents();
      setTimeout(() => {
        // temporarily reenable clicks, click on heading button, disable clicks
        toggleClicksEnabled.call(this);
        editBtns.heading.click();
        toggleClicksEnabled.call(this, nextBtn);
        selectFirstParagraphContents();
        setTimeout(() => {
          selectFirstParagraphContents();
          toggleClicksEnabled.call(this);
          editBtns.heading.click();
          toggleClicksEnabled.call(this, nextBtn);
          selectFirstParagraphContents();
          setTimeout(() => {
            selectFirstParagraphContents();
            toggleClicksEnabled.call(this);
            editBtns.heading.click();
            toggleClicksEnabled.call(this, nextBtn);
            selectFirstParagraphContents();
            this.$window.appendChild(nextBtn);
          }, demoButtonDuration);
        }, demoButtonDuration);
      }, demoButtonInitialDelay);
      prepNextBtn.call(this);
      editBtns.italic.style.borderColor = editBtns.italic.prevBorder;
      editBtns.heading.prevBorder = editBtns.heading.style.borderColor;
      editBtns.heading.style.borderColor = 'white';
    };

    /**
     * highlightLinkBtn - Highlights and demonstrates the link button.
     *
     */
    substeps[6] = function highlightLinkBtn() {
      this.$window.innerHTML = `
      <p>
        The link button wraps your selection in a link. Pressing this button
        will bring up an interface to insert your link. Just type or paste the URL,
        press enter, and you're good to go!
      </p>
    `;
      selectFirstParagraphContents();
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
      editBtns.heading.style.borderColor = editBtns.heading.prevBorder;
      editBtns.link.prevBorder = editBtns.link.style.borderColor;
      editBtns.link.style.borderColor = 'white';
    };

    /**
     * createHeading - Takes the user through the process of making their text
     *  into a heading. Disables all clicks except those on the heading button,
     *  then proceeds when the user clicks on the heading button.
     *
     */
    substeps[7] = function createHeading() {
      this.$window.innerHTML = `
      <p>
        Let's create a heading. Go ahead and click the heading button. (The one outlined in white.)
      </p>
      <p><i>Hint: if you can't see the editing toolbar, try selecting the text again</i></p>
    `;
      toggleClicksEnabled.call(this);
      toggleClicksEnabled.call(this, editBtns.heading);

      /**
       * headingNextStep - Resets the heading button's style, reenables clicks,
       *  then moves on to the next substep.
       *
       */
      function headingNextStep() {
        editBtns.heading.style.borderColor = editBtns.heading.prevBorder;
        toggleClicksEnabled.call(this);
        editBtns.heading.removeEventListener('click', editBtns.heading.tutClickHandler);
        nextSubStep.call(this);
      }
      editBtns.heading.tutClickHandler = headingNextStep.bind(this);
      editBtns.heading.addEventListener('click', editBtns.heading.tutClickHandler);

      selectFirstParagraphContents();
      editBtns.link.style.borderColor = editBtns.link.prevBorder;
      editBtns.heading.prevBorder = editBtns.heading.style.borderColor;
      editBtns.heading.style.borderColor = 'white';
    };

    /**
     * goToNewLine - Has the user move to a new line in order to demonstrate the
     *  insert toolbar.
     *
     */
    substeps[8] = function goToNewLine() {
      this.$window.innerHTML = `
      <p>
        Cool, right? Let's throw an image into the mix now. First, press "Enter"
        to go to a new line.
      </p>
    `;

      /**
       * checkForEnter - Checks if the user presses enter in the editor. If they do,
       *  proceeds to the next substep.
       *
       * @param {Event} e The click event to monitor.
       *
       */
      function checkForEnter(e) {
        if (e.key === 'Enter') {
          nextSubStep.call(this);
          editor.removeEventListener('keyup', editor.tutKeyListener);
        }
      }
      editor.tutKeyListener = checkForEnter.bind(this);
      editor.addEventListener('keyup', editor.tutKeyListener);
    };

    /**
     * startAddImage - Has the user start to add an image to their email.
     *
     */
    substeps[9] = function startAddImage() {
      this.$window.innerHTML = `
      <p>
        Are you on a new line? Is it empty? Awesome! You should now see the
        insert toolbar. This toolbar allows you to insert an image or a horizontal
        rule (a line to separate sections).
      </p>
      <p>
        To add an image, click the image button (it's highlighted in white).
      </p>
      <p><i>If you don't see the insert toolbar make sure you are on an empty line.</i></p>
    `;
      toggleClicksEnabled.call(this, insertBtns.image);
      function imageClickHandler() {
        insertBtns.image.style.borderColor = insertBtns.image.prevBorder;
        insertBtns.image.removeEventListener('click', insertBtns.image.tutClickHandler);
        toggleClicksEnabled.call(this);
        nextSubStep.call(this);
      }
      insertBtns.image.tutClickHandler = imageClickHandler.bind(this);
      insertBtns.image.addEventListener('click', insertBtns.image.tutClickHandler);
      insertBtns.image.prevBorder = insertBtns.image.style.borderColor;
      insertBtns.image.style.borderColor = 'white';
    };

    /**
     * endAddImage - Has the user finish up adding an image to their email.
     *
     */
    substeps[10] = function endAddImage() {
      this.positionWindow(editor);
      const imgURL = 'http://studiesabroad.com/html-email-files/images/scot.jpg';
      this.$window.innerHTML = `
      <p>
        Notice how the toolbar changed? You can now type or paste the url for
        the image you would like to add. Go ahead and copy and paste the URL below,
        then press enter.
      </p>
      <p>
        ${imgURL}
      </p>
    `;
      let atAltText = false;
      function enterHandler(e) {
        if (e.key !== 'Enter') return;
        if (!atAltText) {
          atAltText = true;
          this.$window.innerHTML = `
          <p>
            Now that you've entered the URL, you need to add the alt text. Your
            alt text should describe what the image is supposed to convey. For
            instance, you could put the following alt text in for the image you
            are adding:
          </p>
          <p>"The beautifully jagged landscape of Scotland at sunrise."</p>
          <p>
            Copy and paste the example text above and press enter again to
            finalize your image.
          </p>
          <p><i>If you loose the insert toolbar, just click on the empty line,
          then click the image icon and repaste the url:<br/><br/>
          ${imgURL}</i></p>
        `;
        } else {
          editor.removeEventListener('keyup', editor.tutEnterHandler);
          this.$window.innerHTML = `
          <p>
            Alt text is <strong>VERY</strong> important because it is displayed when
            the image doesn't load. This is important because many email clients
            disable automatic image loading by default and because those with
            visual impairments rely on the alt text to know what the image is
            supposed to convey.
          </p>
        `;
          prepNextBtn.call(this);
          this.$window.appendChild(nextBtn);
        }
      }
      editor.tutEnterHandler = enterHandler.bind(this);
      editor.addEventListener('keyup', editor.tutEnterHandler);
    };

    /**
     * wrapUp - Tell users how to delete images and add links.
     *
     */
    substeps[11] = function wrapUp() {
      this.$window.innerHTML = `
      <p>
        Our email is looking pretty good, now, isn't it? If you decide you don't
        like the image or anything else, you can just click in the line below it
        and press "Backspace." Oh, and remember that adding links is similar to
        adding images: just choose the text you want to use as your link, press
        the link button, and paste or type the URL to which you want to link.
      </p>
    `;
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };

    /**
     * end - Finish the Editor section of the tutorial. Have user move on to the
     *  next section.
     *
     */
    substeps[12] = function end() {
      this.$window.innerHTML = `
      <p>
        That just about wraps up the Editor section of this tutorial. There's a
        lot more to explore though so take some time after this tutorial to play
        around with it! In the meantime, click "Next" below to continue to the
        next section of this tutorial.
      </p>
    `;
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };

    function main() {
      prepNextBtn.call(this);
      editor = document.getElementById('wfeditor');
      editBtns = getEditButtons();
      insertBtns = getInsertButtons();
      firstEditorPar = editor.querySelector('.wf__text-section');
      this.highlight(editor);
      this.positionWindow(editor);
      currentStep = 0;
      substeps[0].call(this);
    }
    return main;
  }());

  var controllerOverview = (function init() {
    const substeps = [];
    let currentStep = 0;
    let controller;
    let controllerBtns;
    let mainModal;
    const nextBtn = generateStandardButton('Next');

    /**
     * getControllerAndButtons - map the Controller and its buttons to variables.
     *
     */
    function getControllerAndButtons() {
      controller = document.getElementById('controller');
      controllerBtns = {
        startOver: document.getElementById('startoverBtn'),
        copyCode: document.getElementById('copyCodeBtn'),
        saveLoad: document.getElementById('saveLoadBtn'),
        settings: document.getElementById('settingsBtn'),
      };
    }

    /**
     * nextSubStep - Proceed to the next substep in the substeps array. If the
     *  user is at the final substep, this function calls the overarching nextStep
     *  function to proceed to the next section.
     *
     */
    function nextSubStep() {
      currentStep += 1;
      if (!substeps[currentStep]) return this.nextStep();
      substeps[currentStep].call(this);
      return null;
    }

    /**
     * prepNextBtn - Prepares the nextBtn to be used. This must be called each
     *  time the nextBtn is to be used. Otherwise, the current step will be set to
     *  a previous value if the user exits then relaunches the tutorial.
     *
     */
    function prepNextBtn(handler) {
      if (nextBtn.handler) {
        nextBtn.removeEventListener('click', nextBtn.handler);
      }
      let finalHandler;
      if (handler && typeof handler === 'function') {
        finalHandler = handler.bind(this);
      } else {
        finalHandler = nextSubStep.bind(this);
      }
      nextBtn.handler = finalHandler;
      nextBtn.addEventListener('click', nextBtn.handler);
    }

    /**
     * openModalListener - Generates the listener for buttons which open up
     *  modals. Makes sure the tutorial window is positioned properly and that
     *  the user can interact with the modal. This function generates the actual
     *  listener and must be given the button to which the listener will be attached.
     *
     * @param {HTML Element} target The HTML Button to which the listener will be
     *  attached.
     *
     * @returns {Function} The listener to attach to the button.
     */
    function openModalListener(target) {
      const targetBtn = target;
      return function innerListener() {
        this.highlight(mainModal);
        this.minimizeOverlay();
        targetBtn.removeEventListener('click', targetBtn.tutClickHandler);
        toggleClicksEnabled.call(this);
        this.$window.display = 'none';
        setTimeout(() => {
          this.$window.display = 'block';
          this.positionWindow(mainModal);
        }, 100);
        nextSubStep.call(this);
      }.bind(this);
    }

    /**
     * closeModalListener - Generates the listener for buttons which close modals.
     *  Essentially disables all clicks, repositions the tutorial overlay, and
     *  calls the next step.
     *
     * @returns {Function} The listener to attach to the button.
     */
    function closeModalListener(close) {
      const closeBtn = close;
      return function innerListener() {
        this.maximizeOverlay();
        toggleClicksEnabled.call(this);
        closeBtn.removeEventListener('click', closeBtn.tutClickHandler);
        nextSubStep.call(this);
      }.bind(this);
    }

    /**
     * intro - Provides a brief overview of the Controller section.
     *
     */
    substeps[0] = function intro() {
      this.$window.innerHTML = `
      <p>
        This is the Controller. It provides broad functionality that affects the
        editor and/or your email as a whole.
      </p>
    `;
      toggleClicksEnabled.call(this, nextBtn);
      this.positionWindow(controller);
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };

    /**
     * startOver - Provides a brief overview of the Start Over button.
     *
     */
    substeps[1] = function startOver() {
      this.$window.innerHTML = `
      <p>
        The "Start Over" button has a fairly obvious purpose. Just be careful as
        you will loose all your work if you press it.
      </p>
    `;
      this.positionWindow(controllerBtns.startOver);
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };

    /**
     * copyCodeOverview - Provides a brief overview of the Copy Code button.
     *
     * @returns {type} Description
     */
    substeps[2] = function copyCodeOverview() {
      this.$window.innerHTML = `
      <p>
        The "Copy Code" button will copy the source code of your email to your
        clipboard so you can paste it into the GRS HTML Template editor.
      </p>
    `;
      this.positionWindow(controllerBtns.copyCode);
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };

    /**
     * copyCodeOpen - Prompts the user to click the Copy Code button to view the
     *  copy code interface. Disables all clicks but on the copy code button.
     *
     */
    substeps[3] = function copyCodeOpen() {
      this.$window.innerHTML = `
      <p>Go ahead and give the "Copy Code" button a click to see what happens.</p>
    `;
      toggleClicksEnabled.call(this, controllerBtns.copyCode);
      controllerBtns.copyCode.tutClickHandler = openModalListener.call(this, controllerBtns.copyCode);
      controllerBtns.copyCode.addEventListener('click', controllerBtns.copyCode.tutClickHandler);
    };

    /**
     * copyCodeInterface - Demonstrates the functionality of the copy code
     *  interface.
     *
     */
    substeps[4] = function copyCodeInterface() {
      this.$window.innerHTML = `
      <p>
        This is the code copying interface. ISA Easy Email will attempt to copy
        the code straight to your clipboard as soon as you click the "Copy Code"
        button but this doesn't always work due to browser settings (especially
        Firefox).
      </p>
      <p>
        Regardless, you can view and copy the code in the textbox here. You can
        try to copy again using the "Copy" button or you can right-click to copy
        the text straight from the textbox.
      </p>
      <p>
        Press "Close" to continue.
      </p>
    `;
      const closeBtn = mainModal.lastChild.lastChild;
      closeBtn.tutClickHandler = closeModalListener.call(this, closeBtn);
      closeBtn.addEventListener('click', closeBtn.tutClickHandler);
      toggleClicksEnabled.call(this, closeBtn);
    };

    /**
     * saveLoadOverview - Provides a basic overview of the save and load
     *  functionality.
     *
     */
    substeps[5] = function saveLoadOverview() {
      this.$window.innerHTML = `
      <p>
        The "Save / Load" button, you guessed it, let's you save your email or
        load up previous emails! This is super helpful if you want to share a
        template with someone else or if you want to come back to your email
        later.
      </p>
    `;
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
      toggleClicksEnabled.call(this, nextBtn);
      this.highlight(controller);
      this.positionWindow(controllerBtns.saveLoad);
    };

    substeps[6] = function settingsOverview() {
      this.$window.innerHTML = `
      <p>
        The "Settings" button allows you to adjust a few settings in the email.
        Go ahead and give it a click.
      </p>
    `;
      controllerBtns.settings.tutClickHandler = openModalListener.call(this, controllerBtns.settings);
      controllerBtns.settings.addEventListener('click', controllerBtns.settings.tutClickHandler);
      toggleClicksEnabled.call(this, controllerBtns.settings);
      this.positionWindow(controllerBtns.settings);
    };

    substeps[7] = function settingsInterface() {
      this.$window.innerHTML = `
      <p>
        Here you can see the settings you can adjust within your email.
      </p>
    `;
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
      toggleClicksEnabled.call(this, nextBtn);
    };

    substeps[8] = function emailTitle() {
      this.$window.innerHTML = `
      <p>
        The Email Title allows you to easily keep track of your ISA Easy Email
        files. Your email is automatically given a title based on the date and
        time it was created but you can change it here. The title of the current
        email is displayed in the bottom right of the screen and is used as the
        name of the file when you save your work.
      </p>
      <p>
        <i>Recipients of the email won't see the title.</i>
      </p>
    `;
      const emailTitleField = mainModal.querySelector('.settingsField');
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
      toggleClicksEnabled.call(this, nextBtn);
      this.positionWindow(emailTitleField);
    };

    substeps[9] = function changeTitle() {
      const targetText = 'Fun Tutorial Email';
      this.$window.innerHTML = `
      <p>
        Let's try changing the Email Title to something more useful. Try
        changing it to the following:
      </p>
      <p>
        "${targetText}"
      </p>
    `;
      const emailTitleField = mainModal.querySelector('.settingsField');
      const emailInput = emailTitleField.querySelector('input');
      function titleIsTarget() {
        if (emailInput.value === targetText) {
          emailInput.removeEventListener('keyup', emailInput.tutKeyHandler);
          nextSubStep.call(this);
        }
      }
      emailInput.tutKeyHandler = titleIsTarget.bind(this);
      emailInput.addEventListener('keyup', emailInput.tutKeyHandler);
      toggleClicksEnabled.call(this, emailTitleField);
    };

    substeps[10] = function linkOverview() {
      this.$window.innerHTML = `
      <p>
        Perfect. The following fields allow you to manipulate the two large
        buttons at the bottom of the email. These buttons provide links to a
        place to book an advising session (eg. SimpleBook.me) and to the online
        application. They have default values but you can choose to override
        them here.
      </p>
    `;
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
      toggleClicksEnabled.call(this, nextBtn);
    };

    substeps[11] = function switchingLinks() {
      this.$window.innerHTML = `
      <p>
        For instance, let's say we <strong>don't</strong> want to include an
        advising session link but <strong>do</strong> want to provide a link to
        an online application, but at a new location.
      </p>
      <p>
        First, let's get rid of that advising session link. You can remove it by
        clicking the toggle switch after "Include Advising Session Link". Try
        this now.
      </p>
    `;
      const advisingSeshField = mainModal.querySelectorAll('.settingsField')[1];
      const advisingSeshSwitch = advisingSeshField.querySelector('.switch');
      function changeToggle(e) {
        e.target.removeEventListener('change', e.target.tutChangeHandler);
        nextSubStep.call(this);
      }
      advisingSeshSwitch.tutChangeHandler = changeToggle.bind(this);
      advisingSeshSwitch.addEventListener('change', advisingSeshSwitch.tutChangeHandler);
      toggleClicksEnabled.call(this, advisingSeshField);
      this.highlight(advisingSeshField);
      this.positionWindow(advisingSeshField);
    };

    substeps[12] = function editingLinkURLs() {
      const targetText = 'google.com';
      this.$window.innerHTML = `
      <p>
        Did you notice how the text box for the advising session URL went away?
        Once you hit save the link itself will be removed from the email, too.
        Pretty neat, right?
      </p>
      <p>
        Now let's change the URL for the link to the online application. We'll
        just set it to something easy, like google for now. Change the contents
        of the Application Link URL box to say "${targetText}".
      </p>
    `;
      const applicationLinkField = mainModal.querySelectorAll('.settingsField')[2];
      const applicationLinkTextBox = applicationLinkField.querySelector('input[type="text"]');
      function isCorrectURL() {
        if (applicationLinkTextBox.value === targetText) {
          applicationLinkTextBox.removeEventListener('keyup', applicationLinkTextBox.tutKeyHandler);
          nextSubStep.call(this);
        }
      }
      applicationLinkTextBox.tutKeyHandler = isCorrectURL.bind(this);
      applicationLinkTextBox.addEventListener('keyup', applicationLinkTextBox.tutKeyHandler);
      this.highlight(applicationLinkField);
      this.positionWindow(applicationLinkField);
      toggleClicksEnabled.call(this, applicationLinkTextBox);
    };

    substeps[13] = function thatsIt() {
      this.$window.innerHTML = `
      <p>
        Awesome! Now click "Save" to save these settings.
      </p>
    `;
      const saveBtn = mainModal.lastChild.firstChild;
      saveBtn.tutClickHandler = closeModalListener.call(this, saveBtn);
      saveBtn.addEventListener('click', saveBtn.tutClickHandler);
      toggleClicksEnabled.call(this, saveBtn);
    };

    substeps[14] = function wrapUp() {
      this.$window.innerHTML = `
      <p>
        That's it for the controller section. Check out the email now: it only
        has the application link. You should also notice that the title in the
        bottom right of the corner has changed.
      </p>
    `;
      toggleClicksEnabled.call(this);
      this.positionWindow(controller);
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };

    function main() {
      getControllerAndButtons();
      this.highlight(controller);
      mainModal = document.getElementById('main-modal');
      substeps[0].call(this);
      return null;
    }
    return main;
  }());

  function wrapUp() {
    const closeBtn = generateStandardButton('Exit Tutorial');
    closeBtn.addEventListener('click', this.hide.bind(this));
    this.$window.innerHTML = `
    <h1>And That's It!</h1>
    <p>
      Hopefully this tutorial has given you a bit of insight into how to
      effectively use ISA Easy Email. I encourage you to play around with the
      editor and explore all its functionality! You should also read the "GRS
      Help" and "Images Help" in the Help section so you can take full advantage
      of ISA Easy Email!
    </p>
  `;
    this.$window.appendChild(closeBtn);
    this.centerWindow();
  }

  const windowPosOffset = 20;
  let currentStep = 0;

  /**
   * Tutorial - A walkthrough of the features of the ISA Easy Email Generator.
   *  This tutorial operates by placing an overlay over the entire screen and
   *  highlighting one component at a time while annotating with a popout box. It
   *  does this by iterating through the 'steps' property, which is an Array of
   *  functions which manipulate the popout and highlighted elements to take the
   *  user through each function.
   */
  const Tutorial = {
    $overlay: generateElement('div', { klasses: ['modal-overlay', 'tutorial-overlay'] }),
    $window: generateElement('div', { klasses: ['tutorial-window'] }),
    $exitBtn: generateStandardButton('&times;', { klasses: ['tutorial-exit'], id: 'tutorialExitBtn' }),
    steps: [],
    minimizedOverlayStyle: {
      position: 'static',
      width: '1px',
      height: '1px',
      zIndex: '1',
    },

    /**
     * init - Initialize the Tutorial.
     *
     */
    init() {
      currentStep = 0;
      this.$exitBtn.addEventListener('click', this.hide.bind(this));
      this.$overlay.appendChild(this.$exitBtn);
      this.$overlay.appendChild(this.$window);
      document.body.appendChild(this.$overlay);
      return this;
    },

    /**
     * beginTutorial - Begins the tutorial by calling the first step.
     *
     */
    beginTutorial() {
      this.resetWindowPosition();
      currentStep = 0;
      this.display();
      this.steps[currentStep].call(this);
    },

    /**
     * nextStep - Move to the next step in the tutorial process.
     *
     */
    nextStep() {
      currentStep += 1;
      if (!this.steps[currentStep]) return this.hide();
      this.steps[currentStep].call(this);
      return null;
    },

    /**
     * resetWindowPosition - Reset the position of the tutorial popout window.
     *
     */
    resetWindowPosition() {
      this.$window.style.left = '';
      this.$window.style.right = '';
      this.$window.style.top = '';
      this.$window.style.bottom = '';
      if (this.$window.classList.contains('vertical-center')) this.$window.classList.remove('vertical-center');
    },

    /**
     * positionWindow - Position the tutorial popout window to display next to the
     *  given HTML Element.
     *
     * @param {type} target Description
     *
     * @returns {type} Description
     */
    positionWindow(target) {
      const modalRect = this.$window.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      this.resetWindowPosition();
      if (window.innerWidth - modalRect.width > targetRect.right) {
        this.$window.style.left = targetRect.right + windowPosOffset;
      } else {
        this.$window.style.right = (window.innerWidth - targetRect.left) + windowPosOffset;
      }

      if (targetRect.top + modalRect.height < window.innerHeight) {
        this.$window.style.top = targetRect.top;
      } else {
        this.$window.style.bottom = windowPosOffset;
      }
    },

    /**
     * highlight - Highlights the given target by bringing it above the overlay.
     *
     * @param {HTML Element} target The Element to highlight.
     *
     */
    highlight(target) {
      this.releaseHighlighted();
      this.highlightedHTML = target;
      if (target.id === 'wfeditor') {
        this.highlightedHTML.style.background = 'white';
      }

      this.highlightedHTML.prevPos = this.highlightedHTML.style.position;
      this.highlightedHTML.prevZ = this.highlightedHTML.style.zIndex;

      if (this.highlightedHTML.id === 'controller') {
        this.highlightedHTML.style.position = 'absolute';
      } else if (this.highlightedHTML.id === 'wfeditor') {
        this.highlightedHTML.style.position = 'relative';
      }
      this.highlightedHTML.style.zIndex = '10';
    },

    /**
     * releaseHighlighted - Releases the currently highlighted element, if there
     *  is one. It does this by setting its position and zIndex to their previous
     *  values.
     *
     */
    releaseHighlighted() {
      if (this.highlightedHTML) {
        this.highlightedHTML.style.position = this.highlightedHTML.prevPos;
        this.highlightedHTML.style.zIndex = this.highlightedHTML.prevZ;
        if (this.highlightedHTML.id === 'wfeditor') this.highlightedHTML.style.background = '';
      }
    },

    /**
     * display - Display the tutorial.
     *
     */
    display() {
      this.$overlay.style.display = 'block';
    },

    /**
     * hide - Hide the tutorial.
     *
     */
    hide() {
      this.releaseHighlighted();
      this.$overlay.style.display = 'none';
      window.location.reload();
    },

    /**
     * minimizeOverlay - Make the overlay minimized. That is to say, make is so
     *  the main modal window can be displayed in the tutorial with the tutorial
     *  modal alongside it.
     *
     */
    minimizeOverlay() {
      Object.keys(this.minimizedOverlayStyle).forEach((prop) => {
        this.$overlay.style[prop] = this.minimizedOverlayStyle[prop];
      });
      this.$window.style.zIndex = '1000';
    },

    /**
     * maximizeOverlay - Make the overlay cover the entire screen again.
     *
     */
    maximizeOverlay() {
      this.$overlay.style = '';
      this.$overlay.style.display = 'block';
    },

    /**
     * centerWindow - Centers the modal window vertically and horizontally.
     *
     */
    centerWindow() {
      this.$window.classList.add('vertical-center');
      this.$window.style = '';
    },
  };

  Tutorial.steps[0] = layoutOverview;
  Tutorial.steps[1] = editorOverview;
  Tutorial.steps[2] = controllerOverview;
  Tutorial.steps[3] = wrapUp;

  /*
   ######   ########   ######     ##     ## ######## ##       ########
  ##    ##  ##     ## ##    ##    ##     ## ##       ##       ##     ##
  ##        ##     ## ##          ##     ## ##       ##       ##     ##
  ##   #### ########   ######     ######### ######   ##       ########
  ##    ##  ##   ##         ##    ##     ## ##       ##       ##
  ##    ##  ##    ##  ##    ##    ##     ## ##       ##       ##
   ######   ##     ##  ######     ##     ## ######## ######## ##
  */

  const grsHelpSteps = [];

  grsHelpSteps[0] = ['1. Open GRS\'s HTML Template Editor', `
  <p>
    Your first step in sending your email through GRS is creating a template
    shell to contain your email content. To start, navigate to the
    <a href="https://grs.studiesabroad.com/tools/" target="_blank">GRS Tools</a>
    section. Then, click <a href="https://grs.studiesabroad.com/htmltemplate" target="_blank">"HTML Template Editor"</a>
    (shown below).
  </p>
  <img class='img-max-width' src="./assets/images/grs-help/grs-tools.png" alt="Location of the GRS HTML Template Editor.">
`];

  grsHelpSteps[1] = ['2. Create a New Template', `
  <p>
    You should now be in the HTML Template Editor seeing a screen similar to
    that below. Click "New Template" at the top of the screen.
  </p>
  <img class='img-max-width' src="./assets/images/grs-help/template-landing.png" alt="Initial screen of the GRS HTML Template Editor.">
  <p>
    You should now see the screen below. Click "Standar Email" to begin creating
    your template shell.
  </p>
  <img class='img-max-width' src="./assets/images/grs-help/new-template.png" alt="Creating a Standar Email">
`];

  grsHelpSteps[2] = ['3. Complete Template Settings', `
  <p>
    You are now ready to begin creating your template. You will see a screen
    like the one below. Fill out the information as laid out below:
  </p>
  <dl>
    <dt>Template Name</dt>
    <dd>
      Choose a descriptive name for your email. This is for internal use only
      and won't be visible to anyone receiving the email.
    </dd>
    <dt>Business Division</dt>
    <dd>Choose the appropriate business division (ISA, WSISACP, etc).</dd>
    <dt>Category</dt>
    <dd>
      Choose the appropriate category (Interested Student, Admissions Email, etc).
      Please note that different categories may have additional options in this
      section (eg. Admissions Email have a subcategory option). Choose the options
      best suited to your use case.
    </dd>
    <dt>Include Unsubscribe Link</dt>
    <dd>Choose "Yes" - <strong>Always</strong> choose Yes.</dd>
    <dt>Teplate Width (px)</dt>
    <dd>Type in "600". It defaults to 650 but the format works best at 600px.</dd>
    <dt>Template Status</dt>
    <dd>Choose "Active".</dd>
    <dt>When to Send</dt>
    <dd>Choose the most appropriate option. In general, this will be "Manual".</dd>
    <dt>Email To</dt>
    <dd>Again, choose the most appropriate option. In general, this will be "Primary Email".</dd>
  </dl>
  <p>
    Your setting should now look something like the image below. You now move on
    to the next step. Click on "Header" at the top. Do <strong>not</strong> click "Save".
    </p>
  <img class='img-max-width' src="./assets/images/grs-help/template-settings.png" alt="Initial template settings">
`];

  grsHelpSteps[3] = ['4. Add Email Headers', `
  <p>
    Headers are what keeps our HTML emails uniform and identifiable. As such,
    it is important that we include them on every email we send. After clicking
    "Header" at the top, you will be brought to a screen with several check boxes.
    Check the boxes so your settings look like the image below:
  </p>
  <img class='img-max-width' src="./assets/images/grs-help/header-options.png" alt="Appropriate header options">
  <p>
    Ensure "Use General Header?" and "Use General Footer?" are both checked. Once
    you check "Use General Header?" you will be presented with options for
    choosing the Google Campaign Name, Campaign Source, and Campaign Medium. These
    are used by marketing to track the success of email campaigns. You should
    coordinate with the marketing department to determine the best values of these
    fields for your email.
  </p>
  <p>
    Once your settings look similar to those above, move on to the next step by
    clicking "Content" at the top of the page. Do <strong>not</strong> click "Save".
  </p>
`];

  grsHelpSteps[4] = ['5. Finish the Template Shell', `
  <p>
    Clicking "Content" at the top of the page will bring you to the standard
    interface for adding content to your email. This is the interface we are
    circumventing by using the ISA Easy Email Generator. However, we still need
    to use it actually insert our generated content into the email in GRS.
  </p>
  <p>Start by filling out the Email Subject, Preview, and Title fields as follows:</p>
  <dl>
    <dt>Email Subject</dt>
    <dd>This is the subject of your email. Your subject should be captivating but concise.</dd>
    <dt>Email Preview</dt>
    <dd>
      This is the small blurb displayed to recipients in their email client
      before actually opening the email. You should write a sentence or two here
      which summarizes your email and/or entices your recipient to open your email.
    </dd>
    <dt>Email Title</dt>
    <dd>
      In general, leave this blank. This will insert a large title at the very
      beginning of your email (before even the header).
    </dd>
  </dl>
  <p>
    To finish your template shell, you should enter a word or two in the "Body"
    section. This will allow you to finally click that "Save" button and have
    GRS save your email template. Remember the template title so you can find it
    later.
  </p>
`];

  grsHelpSteps[5] = ['6. Insert Your Content', `
  <p>
    Once your Template Shell is created in GRS, you are ready to compose your
    email in the ISA Easy Email Generator. To do this, simply press "Copy Code"
    in the ISA Easy Email Generator to copy the source code of the contents of
    your email. Then, navigate to the "Content" section of your Template Shell in
    GRS, click the "<>Source" button in the Body section, and paste your email
    in the body section (see image below). Click "Save" and your email's contents will be saved in
    GRS. Click "Preview" at the top to ensure your email has been successfully
    saved.
  </p>
  <img class='img-max-width' src="./assets/images/grs-help/insert-source.png" alt="Inserting source code into the GRS HTML Template Editor.">
`];

  /*
  #### ##     ##    ###     ######   ########    ##     ## ######## ##       ########
   ##  ###   ###   ## ##   ##    ##  ##          ##     ## ##       ##       ##     ##
   ##  #### ####  ##   ##  ##        ##          ##     ## ##       ##       ##     ##
   ##  ## ### ## ##     ## ##   #### ######      ######### ######   ##       ########
   ##  ##     ## ######### ##    ##  ##          ##     ## ##       ##       ##
   ##  ##     ## ##     ## ##    ##  ##          ##     ## ##       ##       ##
  #### ##     ## ##     ##  ######   ########    ##     ## ######## ######## ##
  */


  const imgHelpSteps = [];
  imgHelpSteps[0] = ['1. Preparing to Add Your Image', `
  <p>
    Before you can add any images to your email, you must first decide where they
    are going to live. If you have found an image online (make sure it has a
    license allowing for commercial use!) you can choose to either just copy its
    address (right click > "Copy image address" or "Copy Image Location") and
    paste it into the ISA Easy Email Generator. If you have an image saved to
    your computer, it needs to be uploaded it to the ISA server. To do so, you must
    first create a template shell in GRS's HTML Template editor. See the
    "GRS Help" section to learn how to do this.
  </p>
  <p>
    Once you have created your template shell, you will need to navigate to the
    "Content" section of your template shell. From here, click the "Image" button
    in the editor control panel (see below) to launch the Image Properties editor.
  </p>
  <img class="img-max-width" src="assets/images/img-help/add-image-btn.png" alt="Location of the Image button in the GRS HTML Template Editor.">
`];

  imgHelpSteps[1] = ['2. Uploading Your Image to the ISA Server', `
  <p>
    You should now see a window like that below. Click the "Browse Server" button
    to launch the server file browser.
  </p>
  <img class="img-max-width" src="./assets/images/img-help/image-properties-browse.png" alt="The Image Properties box.">
  <p>
    The File Browser (see below) functions similarly to that on Windows or Mac.
    Choose the best folder in which to store your image, then click "Upload" in
    the upper-left to upload your image. Once it has been uploaded, double click
    it to select it and return to the "Image Properties" window.
  </p>
  <img class="img-max-width" src="./assets/images/img-help/file-browser.png" alt="GRS's image file browser">
`];

  imgHelpSteps[2] = ['3. Copying the Image URL', `
  <p>
    The "Image Properties" box should now have the URL to your image in its URL
    box. Select the entire URL and copy it. You will paste this into the ISA
    Easy Email Generator. Once you have copied the URL, click "Cancel" to close
    the Image Properties window. You can now return to the ISA Easey Email Generator
    to paste your image URL. You do not need to do anything else for your image
    in GRS.
  </p>
  <img class="img-max-width" src="./assets/images/img-help/copy-url.png" alt="Copying the image URL from the Image Properties window">
`];

  /*
  ######## ##     ## ########   #######  ########  ########
  ##        ##   ##  ##     ## ##     ## ##     ##    ##
  ##         ## ##   ##     ## ##     ## ##     ##    ##
  ######      ###    ########  ##     ## ########     ##
  ##         ## ##   ##        ##     ## ##   ##      ##
  ##        ##   ##  ##        ##     ## ##    ##     ##
  ######## ##     ## ##         #######  ##     ##    ##
  */


  // Wraps each step in a div and returns it to the new array.
  function wrapHelpSteps(step) {
    const ctn = document.createElement('div');
    const innerCtn = document.createElement('div');
    const heading = document.createElement('h2');
    ctn.appendChild(heading);
    ctn.appendChild(innerCtn);
    [heading.textContent, innerCtn.innerHTML] = step;
    ctn.classList.add('max-35');
    return ctn;
  }

  const GRSHelpSteps = grsHelpSteps.map(wrapHelpSteps);
  const IMGHelpSteps = imgHelpSteps.map(wrapHelpSteps);

  const descriptionHTML = `
  <p>Welcome to the ISA Easy Email Generator! This editor is here to provide
  a simple, easy-to-use tool to compose your HTML emails. Though this editor
  offers an alternative to GRS's HTML template editor, you will still need to
  use the GRS editor to actually create and send your email.</p>

  <p>If it's your first time using this editor, please click the "Tutorial"
  button below to learn about its features and how to use them. You should also
  read the "GRS Help" and "Images Help" sections below to learn about how you
  should create the GRS portion of your email and add images to the ISA server
  for use here.</p>
`;

  const btnStyle = {
    display: 'block',
    padding: '2em 1rem',
    'margin-left': 'auto',
    'margin-right': 'auto',
    width: '20em',
  };

  function setModalBackButton() {
    const backText = 'Back to Help';
    this.modal.setSaveHandler(backText, this.display.bind(this));
  }

  const helpView = {
    $ctn: generateElement('div'),
    $heading: generateElement('h1', { textContent: 'Help' }),
    $description: generateElement(
      'div',
      {
        innerHTML: descriptionHTML,
        style: { 'text-align': 'left', 'max-width': '35em', margin: '2em auto' },
      },
    ),
    $tutorialBtn: generateStandardButton('Tutorial<br/>(unsaved progress will be lost)', { style: btnStyle }),
    $grsBtn: generateStandardButton('GRS Help', { style: btnStyle }),
    $imagesBtn: generateStandardButton('Images Help', { style: btnStyle }),

    /**
     * init - Initialize the helpView. Saves a reference to the moadl it will use
     *  and prepares the container to display in the modal.
     *
     * @param {Modal} modal The modal used to display the helpView.
     *
     * @returns {helpView} Returns this helpView.
     */
    init(modal) {
      this.modal = modal;

      this.baseElements = [
        this.$heading,
        this.$description,
        this.$tutorialBtn,
        this.$grsBtn,
        this.$imagesBtn,
      ];

      this.tutorial = Object.create(Tutorial);
      this.tutorial.init();
      this.$tutorialBtn.addEventListener('click', this.startTutorial.bind(this));
      window.tut = this.tutorial;

      this.grsHelp = Object.create(SimpleHelp);
      this.grsHelp.init('Add and Send Your Email in GRS', GRSHelpSteps, this.modal);
      this.$grsBtn.addEventListener('click', this.displayGRSTutorial.bind(this));

      this.imgHelp = Object.create(SimpleHelp);
      this.imgHelp.init('Add Images to Your Email', IMGHelpSteps, this.modal);
      this.$imagesBtn.addEventListener('click', this.displayImagesTutorial.bind(this));

      this.setBaseView();
    },

    /**
     * startTutorial - Starts the live tutorial.
     *
     * @returns {type} Description
     */
    startTutorial() {
      this.modal.hide();
      this.tutorial.beginTutorial();
    },

    /**
     * displayGRSTutorial - Display the GRS tutorial.
     *
     */
    displayGRSTutorial() {
      this.modal.hide();
      setModalBackButton.call(this);
      this.grsHelp.render(0);
    },


    /**
     * displayImagesTutorial - Display the images tutorial.
     *
     */
    displayImagesTutorial() {
      this.modal.hide();
      setModalBackButton.call(this);
      this.imgHelp.render(0);
    },

    /**
     * setBaseView - Sets the view to display the base information, that is to
     *  say, sets the view to display everything in the baseElements array. It
     *  also sets the modal savehandler to null which also hides the auxiliary
     *  button on the modal.
     *
     * @returns {type} Description
     */
    setBaseView() {
      this.$ctn.innerHTML = '';
      this.baseElements.forEach(el => this.$ctn.appendChild(el));
      this.modal.setSaveHandler(null);
    },

    /**
     * display - Display the modal, passing in this.$ctn.
     *
     */
    display() {
      this.setBaseView();
      this.modal.display(this.$ctn);
    },
  };

  // import WriteFree from './vendor/writefree.es6.js';

  const tutorialCookieTitle = 'ISAEasyEmailTutorial';

  const containerStyle = {
    'box-sizing': 'border-box',
    padding: '20px 5px',
    width: '600px',
  };

  const largeHeadingStyle = {
    'font-family': "'Helvetica', sans-serif",
    'font-weight': 'normal',
    'font-size': '24px',
    color: '#333',
    'padding-left': '10px',
    'padding-right': '10px',
  };

  const smallHeadingStyle = {
    'font-family': "'Helvetica', sans-serif",
    'font-weight': 'normal',
    'font-size': '20px',
    color: '#888',
    'padding-left': '10px',
    'padding-right': '10px',
  };

  const imgStyle = {
    'max-width': '100%',
    'text-align': 'center',
    margin: '1em auto',
  };

  const sectionStyle = {
    overflow: 'hidden',
    width: '100%',
    'padding-left': '10px',
    'padding-right': '10px',
    'box-sizing': 'border-box',
    'font-family': 'Times',
    'font-size': '16px',
    'line-height': '1.25em',

  };

  const options = {
    divOrPar: 'p',
    containerStyle,
    largeHeadingStyle,
    smallHeadingStyle,
    imgStyle,
    sectionStyle,
    emptyPlaceholder: 'Compose your email here...',
  };

  function setButtons() {
    return {
      $startoverBtn: document.getElementById('startoverBtn'),
      $copyCodeBtn: document.getElementById('copyCodeBtn'),
      $saveLoadBtn: document.getElementById('saveLoadBtn'),
      $settingsBtn: document.getElementById('settingsBtn'),
      $helpBtn: document.getElementById('helpBtn'),
    };
  }

  function checkTutorialCookie() {
    return Cookies.getItem(tutorialCookieTitle);
  }

  function setTutorialCookie() {
    const date = new Date();
    Cookies.setItem(tutorialCookieTitle, date.toUTCString());
  }

  const Controller = {
    docInfo: {
      fileType: DocumentFileType,
      dateCreated: generateCurrentDateString(),
    },

    /**
     * init - Initialize the Controller object. The Controller object is what, in
     *  turn, initializes the editor and modalViews.
     *
     * @returns {Controller} Returns this.
     */
    init() {
      // Initialize Controller HTML
      this.btns = setButtons();
      this.$copyTargetCtn = document.getElementById('copyTargetCtn');
      this.$copyTargetInnerCtn = document.getElementById('copyTargetInnerCtn');
      this.$copyTargetBottomBtns = document.getElementById('copyTarget-bottomBtns');
      this.$bottomBtns = document.getElementById('bottomBtns');
      this.$metaDisplay = document.getElementById('metaDisplay');
      // Initialize the editor
      this.editorCtn = document.getElementById('wfeditor');
      this.editor = WriteFree(this.editorCtn, options);
      // Set the document meta data
      this.setDocInfo();
      // Initialize the modal views. This must come after setDocInfo.
      this.initModalViews();

      document.addEventListener('click', this.buttonClickHandler.bind(this));

      window.ed = this.editor;
      window.docInfo = this.docInfo;
      if (!checkTutorialCookie()) {
        this.helpView.startTutorial();
        setTutorialCookie();
      }
      return this;
    },

    /**
     * initModalViews - Initialize the modal views.
     *
     */
    initModalViews() {
      this.modal = Object.create(Modal);
      this.modal.init();
      this.settingsview = Object.create(SettingsView);
      this.settingsview.init(this.modal, this.docInfo);
      this.copyview = Object.create(CopyView);
      this.copyview.init(this.modal);
      this.saveLoadView = Object.create(saveLoadView);
      this.saveLoadView.init(this.modal, this.setDocInfo.bind(this), this.getDocInfo.bind(this));
      this.helpView = Object.create(helpView);
      this.helpView.init(this.modal);
    },

    /**
     * initDocInfo - Initialize the document info past what is done in property
     *  declarations above. The properties defined here are done so because they
     *  utilize getters and setters which must wait for other portions of the app
     *  to initialize before they can be set up.
     *
     */
    initDocInfo() {
      if (!this.docInfo.contents) {
        const closureEditor = this.editor;
        // docInfo.contents is linked up with the editor
        Object.defineProperty(this.docInfo, 'contents', {
          configurable: false,
          writeable: true,
          enumerable: true,
          get() {
            return closureEditor.html(true);
          },
          set(htmlString) {
            return closureEditor.load(htmlString);
          },
        });
      }
      if (!this.docInfo.title) {
        let closureTitle = '';
        const closureMetaDisplay = this.$metaDisplay;
        const title = document.getElementsByTagName('TITLE')[0];
        // title defined with setter to facilitate side-effects like updating the
        // current title at the bottom of the screen.
        Object.defineProperty(this.docInfo, 'title', {
          configurable: false,
          writeable: true,
          enumerable: true,
          set(val) {
            closureTitle = val;
            closureMetaDisplay.textContent = val;
            title.textContent = `Editing ${val} | ISA Easy Email`;
          },
          get() {
            return closureTitle;
          },
        });
        if (!this.docInfo.links) {
          const advisingLink = document.getElementById('advisingLink');
          const applicationLink = document.getElementById('applicationLink');
          this.docInfo.links = {
            advisingLink: {
              text: advisingLink.textContent,
              url: advisingLink.href,
            },
            applicationLink: {
              text: applicationLink.textContent,
              url: applicationLink.href,
            },
          };
        }
        this.docInfo.title = `ISA Email ${this.docInfo.dateCreated}`;
      }
    },

    /**
     * setDocInfo - Sets the meta information for the current document. If given
     *  passed a docInfo object, it will attempt to set the docInfo of the current
     *  document to match that. Otherwise, it will provide generic defaults.
     *
     * @param {object} [docInfo] An optional object containing information about a
     *  document.
     *
     * @returns {object} returns the current docInfo.
     *
     */
    setDocInfo(docInfo = null) {
      this.initDocInfo();
      if (
        docInfo
        && docInfo.title
        && docInfo.contents
      ) {
        if (docInfo.fileType !== DocumentFileType) return false;
        Object.keys(docInfo).forEach((key) => {
          this.docInfo[key] = docInfo[key];
        });
      }
      if (this.settingsview) {
        this.settingsview.init(this.modal, this.docInfo);
      }
      return this.docInfo;
    },

    /**
     * getDocInfo - Retrieve the meta information for the current document in
     *  JSON format. The returned object includes the ocntent of the editor.
     *
     * @returns {object} The meta information for the document.
     */
    getDocInfo() {
      return this.docInfo;
    },

    /**
     * loadEditorFile - Loads the given docInfo into the current document. Sets
     *  the contents of the editor and updates the title of the current document.
     *
     * @param {object} docInfo The meta information, including editor contents, of
     *  the document to be loaded.
     *
     * @returns {type} Description
     */
    loadEditorFile(docInfo) {
      this.editor.load(docInfo.contents);
    },

    /**
     * buttonClickHandler - Handle clicks on the Controller buttons.
     *
     * @param {event} e The click event.
     *
     */
    buttonClickHandler(e) {
      if (e.target === this.btns.$startoverBtn) {
        window.location.reload();
      } else if (e.target === this.btns.$copyCodeBtn) {
        this.$copyTargetInnerCtn.innerHTML = this.editor.html();
        this.$copyTargetBottomBtns.innerHTML = this.$bottomBtns.innerHTML;
        this.$copyTargetBottomBtns.querySelectorAll('a').forEach((link) => {
          if (link.style.display === 'none') {
            const tr = findAncestorOfType('TR', link);
            tr.parentNode.removeChild(tr);
            // link.parentNode.parentNode.parentNode.removeChild(link.parentNode.parentNode);
          }
        });
        this.copyview.displayAndCopy(this.$copyTargetCtn.outerHTML);
        this.btns.$copyCodeBtn.blur();
      } else if (e.target === this.btns.$saveLoadBtn) {
        this.saveLoadView.display();
        this.btns.$saveLoadBtn.blur();
      } else if (e.target === this.btns.$settingsBtn) {
        this.settingsview.display();
        this.btns.$settingsBtn.blur();
      } else if (e.target === this.btns.$helpBtn) {
        this.helpView.display();
        this.btns.$settingsBtn.blur();
      }
    },

  };

  // Initialize the Controller object.
  document.addEventListener('DOMContentLoaded', Controller.init.bind(Controller));

}(WriteFree));
//# sourceMappingURL=dev.js.map
