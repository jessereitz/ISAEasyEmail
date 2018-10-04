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

export default SettingsView;
