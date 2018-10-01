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
  this.input.classList.remove('settingsField--error');
  if (url) {
    this.targetHTML.style.display = 'block';
    this.targetHTML.href = url;
    return true;
  }
  if (this.input.value.length === 0) {
    this.targetHTML.style.display = 'none';
    return false;
  }
  throw Error('Invalid URL');
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
function createSettingSwitchField(labelText, targetID, targetField) {
  const ctn = generateElement('div', { style: { 'text-align': 'left' } });
  const labelCtn = generateElement('label', { klasses: ['switch'] });
  const labelTxt = generateElement('span', { klasses: ['sitch-text'] });
  const input = generateElement('input', { type: 'checkbox', checked: 'true' });
  const slider = generateElement('span', { klasses: ['slider'] });
  const closedTargetField = targetField;
  labelTxt.textContent = labelText;
  labelCtn.appendChild(labelTxt);
  labelCtn.appendChild(input);
  labelCtn.appendChild(slider);
  ctn.appendChild(labelCtn);
  labelCtn.addEventListener('change', (e) => {
    if (e.target.checked) {
      if (closedTargetField.prevValue) {
        closedTargetField.input.value = closedTargetField.prevValue;
      }
      closedTargetField.ctn.style.maxHeight = targetField.ctn.prevHeight;
    } else {
      closedTargetField.prevValue = closedTargetField.input.value;
      closedTargetField.input.value = '';
      closedTargetField.ctn.prevHeight = targetField.ctn.style.maxHeight;
      closedTargetField.ctn.style.maxHeight = 0;
    }
  });
  const field = {
    ctn,
    label: labelCtn,
    input,
    targetID,
    load: () => {
      const checked = !!document.getElementById(targetID);
      input.checked = checked;
    },
    save: () => {},
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
function createSettingsField(labelText, targetID, loadCallback, saveCallback) {
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
    const advisingLinkField = createSettingsField('Advising Session URL:', 'advisingLink');
    const applicationLinkField = createSettingsField('Application URL:', 'applicationLink');
    this.fields.push(createSettingsField('Email Title', '', loadTitle.bind(this), saveTitle.bind(this)));
    this.fields.push(createSettingSwitchField('Include Advising Session Link', 'advisingLink', advisingLinkField));
    this.fields.push(advisingLinkField);
    this.fields.push(createSettingSwitchField('Include Application Link', 'applicationLink', applicationLinkField));
    this.fields.push(applicationLinkField);
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
    const errors = [];
    this.fields.forEach((field) => {
      try {
        if (field.hideError) field.hideError();
        field.save(field.input.value);
      } catch (err) {
        field.input.classList.add('settingsField--error');
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
