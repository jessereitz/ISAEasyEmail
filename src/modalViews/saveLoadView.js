import {
  cleanFileName,
  generateElement,
  generateStandardButton,
} from '../lib.js';

const saveLoadView = {
  fileType: 'ISAEmail_config',
  $ctn: generateElement('div'),
  $heading: generateElement('h1', { textContent: 'Save / Load an Email' }),
  $loadBtn: generateStandardButton('Load', { style: { display: 'inline-block' } }),
  $saveBtn: generateStandardButton('Save', { style: { display: 'inline-block' } }),
  $btnSeparator: generateElement(
    'div',
    {
      style: {
        width: '1px',
        height: '10rem',
        background: '#ddd',
        display: 'inline-block',
        'vertical-align': 'middle',
        margin: '1rem',
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
        download: `${cleanFileName(docInfo.title)}.isaemail`,
        style: { display: 'none' },
      },
    );
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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

export default saveLoadView;
