import {
  generateElement,
  generateStandardButton,
} from '../lib.js';

const descriptionHTML = `
  <p>Welcome to the ISA Easy Email Generator! This editor is here to provide
  a simple, easy-to-use tool to compose your HTML emails. Though this editor
  offers an alternative to GRS's HTML template editor, you will still need to
  use the GRS editor to actually create and send your email.</p>

  <p>If it's your first time using this editor, please click the "Tutorial"
  button below to learn about its features and how to use them. You should also
  read the "GRS Help" and "Images Help" sections below to learn about how you
  should create the GRS portion of your email and add images to the ISA server
  for use here.</p>
`;

const btnStyle = {
  // 'margin-left': '1rem',
  // 'margin-right': '1rem',
  display: 'block',
  padding: '2em 1rem',
  'margin-left': 'auto',
  'margin-right': 'auto',
  width: '20em',
};

const helpView = {
  $ctn: generateElement('div'),
  $heading: generateElement('h1', { textContent: 'Help' }),
  $description: generateElement(
    'div',
    {
      innerHTML: descriptionHTML,
      style: { 'text-align': 'left' },
    },
  ),
  $tutorialBtn: generateStandardButton('Tutorial', { style: btnStyle }),
  $grsBtn: generateStandardButton('GRS Help', { style: btnStyle }),
  $imagesBtn: generateStandardButton('Images Help', { style: btnStyle }),

  init(modal) {
    this.modal = modal;

    this.$ctn.appendChild(this.$heading);
    this.$ctn.appendChild(this.$description);
    this.$ctn.appendChild(this.$tutorialBtn);
    this.$ctn.appendChild(this.$grsBtn);
    this.$ctn.appendChild(this.$imagesBtn);
  },

  startTutorial() {
    return null;
  },

  setModalBackBtn() {
    return null;
  },

  displayGRSTutorial() {
    return null;
  },

  displayImagesTutorial() {
    return null;
  },

  display() {
    this.modal.setSaveHandler(null);
    this.modal.display(this.$ctn);
  },
};

export default helpView;
