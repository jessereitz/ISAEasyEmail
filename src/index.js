import WriteFree from 'writefree';
import Modal from './modalViews/modal.js';
import SettingsView from './modalViews/settingsView.js';
import CopyView from './modalViews/copyView.js';
import SaveLoadView from './modalViews/saveLoadView.js';

import {
  DocumentFileType,
  generateCurrentDateString,
} from './lib.js';

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
};

const smallHeadingStyle = {
  'font-family': "'Helvetica', sans-serif",
  'font-weight': 'normal',
  'font-size': '20px',
  color: '#888',
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
};

function setButtons() {
  return {
    $startoverBtn: document.getElementById('startoverBtn'),
    $copyCodeBtn: document.getElementById('copyCodeBtn'),
    $saveLoadBtn: document.getElementById('saveLoadBtn'),
    $settingsBtn: document.getElementById('settingsBtn'),
  };
}

const Controller = {
  docInfo: {
    // title: `ISA Email ${generateCurrentDateString()}`,
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
    this.saveLoadView = Object.create(SaveLoadView);
    this.saveLoadView.init(this.modal, this.setDocInfo.bind(this), this.getDocInfo.bind(this));
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
      // title defined with setter to facilitate side-effects like updating the
      // current title at the bottom of the screen.
      Object.defineProperty(this.docInfo, 'title', {
        configurable: false,
        writeable: true,
        enumerable: true,
        set(val) {
          closureTitle = val;
          closureMetaDisplay.textContent = val;
        },
        get() {
          return closureTitle;
        },
      });
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
      this.copyview.displayAndCopy(this.$copyTargetCtn.outerHTML);
      this.btns.$copyCodeBtn.blur();
    } else if (e.target === this.btns.$saveLoadBtn) {
      this.saveLoadView.display();
      this.btns.$saveLoadBtn.blur();
    } else if (e.target === this.btns.$settingsBtn) {
      this.settingsview.display();
      this.btns.$settingsBtn.blur();
    }
  },

};

// Initialize the Controller object.
document.addEventListener('DOMContentLoaded', Controller.init.bind(Controller));
