import { generateElement, validateURL } from '../lib.js';
import { TextField, OptionalLinkField } from './settingsFields';

/**
 * loadField - Loads the value of a link field
 *
 * @returns {string} Returns the value of the href attribute of designated link.
 */
function loadField() {
  this.targetHTML = document.getElementById(this.targetID);
  if (!this.docInfoRef) this.targetHTML.style.display = 'none';
  else {
    this.targetHTML.href = this.docInfoRef.url;
    this.input.value = this.docInfoRef.url;
    this.targetHTML.style.display = 'block';
  }
  return this;
}

/**
 * saveField - Saves the current value of the input as the href of the
 *  designated link.
 *
 * @returns {boolean} Returns true if href set correctly. Else returns false.
 */
function saveField() {
  const url = validateURL(this.input.value);
  this.input.classList.remove('settingsField--error');
  if (url) {
    this.targetHTML.style.display = 'block';
    this.targetHTML.href = url;
    return true;
  }
  this.targetHTML.style.display = 'none';
  this.targetHTML.href = '';
  if (!this.hidden) throw Error('Invalid URL');
  return true;
}

/**
 * loadTitle - Loads the title of the document's docInfo.
 *
 * @returns {string} Returns the current title of the document.
 */
function loadTitle(input) {
  const innerInput = input;
  innerInput.value = this.docInfo.title;
}

/**
 * saveTitle - Sets the title of the current document to the given value.
 *
 * @param {string} value The value to which to set the title of the document.
 *
 */
function saveTitle(value) {
  this.docInfo.title = value;
}

/**
 * createSettingSwitchField - Creates a toggle switch to display or hide a
 *  settings field (given targetField).
 *
 * @param {String} labelText   The text to display next to the switch.
 * @param {String} targetID    The id of the HTML element in the email which
 *  this switch will affect.
 * @param {SettingsField} targetField The settingsField which this switch will
 *  display or hide.
 *
 * @returns {SettingsSwitchField} Returns the newly created SettingsSwitchField.
 */
function createSettingSwitchField(docInfoTitle, docInfo, labelText, targetID, targetField) {
  const ctn = generateElement('div', { style: { 'text-align': 'left' } });
  const labelCtn = generateElement('label', { klasses: ['switch'] });
  const labelTxt = generateElement('span', { klasses: ['sitch-text'] });
  const input = generateElement('input', { type: 'checkbox', checked: 'true' });
  const slider = generateElement('span', { klasses: ['slider'] });
  const closedDocInfo = docInfo;
  labelTxt.textContent = labelText;
  labelCtn.appendChild(labelTxt);
  labelCtn.appendChild(input);
  labelCtn.appendChild(slider);
  ctn.appendChild(labelCtn);
  function checkboxHandler(e) {
    if (e.target.checked) {
      targetField.display();
    } else {
      targetField.hide();
    }
  }
  labelCtn.addEventListener('change', checkboxHandler.bind(this));
  const field = {
    ctn,
    label: labelCtn,
    input,
    targetID,
    load: () => {
      input.checked = (
        typeof closedDocInfo.links[docInfoTitle] !== 'undefined'
        && closedDocInfo.links[docInfoTitle] !== null
      );
      if (!input.checked) {
        checkboxHandler.call(this, { target: input });
      }
    },
    save: () => {
      let newVal = null;
      if (validateURL(targetField.input.value)) {
        newVal = {
          text: document.getElementById(targetID).textContent,
          url: targetField.input.value,
        };
      }
      closedDocInfo.links[docInfoTitle] = newVal;
    },
  };
  return field;
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
function createSettingsField(docInfoRef, labelText, targetID, loadCallback, saveCallback) {
  const ctn = generateElement('div', { klasses: ['settingsField'], style: { 'text-align': 'left' } });
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
  const errorMessage = generateElement(
    'div',
    {
      klasses: ['settingsField__error-message'],
      style: {
        'margin-top': '-0.25em',
        background: 'rgba(242, 110, 127, 0.25)',
        border: '1px solid rgba(242, 110, 127, 1)',
        display: 'none',
        padding: '0.1em 0.25rem',
        'font-size': '0.85em',
      },
    },
  );
  ctn.appendChild(label);
  ctn.appendChild(input);
  ctn.appendChild(errorMessage);
  const field = {
    ctn,
    label,
    input,
    targetID,
    load: loadCallback && typeof loadCallback === 'function' ? loadCallback : loadField,
    save: saveCallback && typeof saveCallback === 'function' ? saveCallback : saveField,
    showError: (msg) => { errorMessage.textContent = msg; errorMessage.style.display = 'block'; },
    hideError: () => { errorMessage.style.display = 'none'; },
    display: function displayField() {
      if (this.prevValue) {
        input.value = this.prevValue;
      }
      ctn.style.maxHeight = '10em';
      this.hidden = false;
    },
    hide: function hideField() {
      this.prevValue = input.value;
      input.value = '';
      ctn.style.maxHeight = 0;
      this.hidden = true;
    },
    docInfoRef,
  };
  return field;
}

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

  generateFields() {
    this.fields = [];
    const title = Object.create(TextField);
    title.init(this.docInfo, 'Email Title', 'title');
    this.fields.push(title);
    const advisingLink = Object.create(OptionalLinkField);
    advisingLink.init(this.docInfo.links, 'Advising Session', 'advisingLink');
    const applicationLink = Object.create(OptionalLinkField);
    applicationLink.init(this.docInfo.links, 'Application Link', 'applicationLink');
    this.fields.push(advisingLink, applicationLink);
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

export default SettingsView;
