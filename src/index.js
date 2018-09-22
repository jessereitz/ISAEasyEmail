import WriteFree from 'writefree';
import Modal from './modalViews/modal.js';
import SettingsView from './modalViews/settingsView.js';
import CopyView from './modalViews/copyView.js';
import SaveLoadView from './modalViews/saveLoadView.js';

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
  width: '100%',
  overflow: 'hidden',
  'box-sizing': 'border-box',
  'font-family': 'Times',
  'font-size': '16px',

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

document.addEventListener('DOMContentLoaded', () => {
  const btns = setButtons();
  const $copyTargetCtn = document.getElementById('copyTargetCtn');
  const $copyTargetInnerCtn = document.getElementById('copyTargetInnerCtn');

  const editorCtn = document.getElementById('wfeditor');
  const editor = WriteFree(editorCtn, options);
  window.ed = editor;

  function loadEditorFile(docInfo) {
    editor.load(docInfo.contents);
  }

  function getDocInfo() {
    return {
      title: 'Test Title',
      contents: editor.html(true),
    };
  }

  const modal = Object.create(Modal);
  modal.init();
  const settingsview = Object.create(SettingsView);
  settingsview.init(modal);
  const copyview = Object.create(CopyView);
  copyview.init(modal);
  const saveLoadView = Object.create(SaveLoadView);
  saveLoadView.init(modal, loadEditorFile, getDocInfo);


  document.addEventListener('click', (e) => {
    if (e.target === btns.$startoverBtn) {
      window.location.reload();
    } else if (e.target === btns.$copyCodeBtn) {
      $copyTargetInnerCtn.innerHTML = editor.html();
      copyview.displayAndCopy($copyTargetCtn.outerHTML);
      btns.$copyCodeBtn.blur();
    } else if (e.target === btns.$saveLoadBtn) {
      saveLoadView.display();
      btns.$saveLoadBtn.blur();
    } else if (e.target === btns.$settingsBtn) {
      settingsview.display();
      btns.$settingsBtn.blur();
    }
  });
});
