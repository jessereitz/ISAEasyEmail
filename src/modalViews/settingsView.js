import { generateElement, validateURL } from '../lib.js';

/**
 * loadField - Loads the value of a link field
 *
 * @returns {string} Returns the value of the href attribute of designated link.
 */
function loadField() {
  this.targetHTML = document.getElementById(this.targetID);
  this.input.value = this.targetHTML.href;
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
  if (url) {
    this.targetHTML.href = url;
    return true;
  }
  return false;
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
function createSettingsField(labelText, targetID, loadCallback, saveCallback) {
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
    load: loadCallback && typeof loadCallback === 'function' ? loadCallback : loadField,
    save: saveCallback && typeof saveCallback === 'function' ? saveCallback : saveField,
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
    this.$ctn.appendChild(this.$heading);
    this.generateFields();
    return this;
  },

  generateFields() {
    this.fields = [];
    this.fields.push(createSettingsField('Title', '', loadTitle.bind(this), saveTitle.bind(this)));
    this.fields.push(createSettingsField('Advising Session URL:', 'advisingLink'));
    this.fields.push(createSettingsField('Application URL:', 'applicationLink'));
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
    this.fields.forEach(field => field.save(field.input.value));
    this.modal.hide();
    return true;
  },
};

export default SettingsView;
