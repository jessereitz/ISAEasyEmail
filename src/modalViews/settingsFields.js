import { appendChildren, generateElement, validateURL } from '../lib.js';

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

export const TextField = Object.assign(TextFieldBase, field);

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
export const SwitchField = Object.assign(SwitchFieldBase, field);

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

export const OptionalLinkField = Object.assign(OptionalLinkFieldBase, field);
