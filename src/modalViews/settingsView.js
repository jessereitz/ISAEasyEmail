import { generateElement, validateURL } from '../lib.js';

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

export default SettingsView;
