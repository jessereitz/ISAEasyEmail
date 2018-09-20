import WriteFree from 'writefree';
import Modal from './views/modal.js';
import SettingsView from './views/settingsView.js';



const containerStyle = {
  'box-sizing': 'border-box',
  padding: '20px',
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
  'margin-left': 'auto',
  'margin-right': 'auto',
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

document.addEventListener('DOMContentLoaded', () => {
  const editorCtn = document.getElementById('wfeditor');
  const editor = WriteFree(editorCtn, options);
  const modal = Object.create(Modal);
  modal.init();
  const settings = Object.create(SettingsView);
  settings.init(modal);

  const settingsBtn = document.getElementById('settingsBtn');

  document.addEventListener('click', (e) => {
    if (e.target === settingsBtn) {
      settings.display();
      settingsBtn.blur();
    }
  });
});
