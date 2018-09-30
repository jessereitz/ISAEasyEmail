import { generateStandardButton } from '../lib';

const substeps = [
  {
    target: 'tutorialExitBtn',
    description: `
      <p>Click this button at any time to exit this tutorial.</p>
    `,
  },
  {
    target: 'wfeditor',
    description: `
      <!--<h1>Editor / Preview</h1>-->
      <p>This is the editor and preview section. This section allows you to compose and edit your email.</p>
    `,
  },
  {
    target: 'controller',
    description: `
      <!--<h1>Controller</h1>-->
      <p>These buttons allow you to manipulate your email in a broad manner, similar to the File menu in most programs.</p>
    `,
  },
  {
    target: 'metaDisplayCtn',
    description: `
      <!--<h1>Email Info</h1>-->
      <p>You can see important info about your email here, such as its title.</p>
    `,
  },
  {
    target: 'helpBtnCtn',
    description: `
      <!--<h1>Help Section</h1>-->
      <p>Click this button if you ever need help with ISA Easy Email or if you would like to go through this tutorial again.</p>
    `,
  },
];

export default function layoutOverview() {
  let currentIndex = 0;
  const nextBtn = generateStandardButton('Continue');

  const next = function next() {
    if (currentIndex === 0) this.$window.classList.remove('vertical-center');
    if (!substeps[currentIndex]) {
      this.nextStep();
    }
    const target = document.getElementById(substeps[currentIndex].target);
    this.highlight(target);
    this.positionWindow(target);
    this.$window.innerHTML = substeps[currentIndex].description;
    this.$window.appendChild(nextBtn);
    currentIndex += 1;
  };

  nextBtn.addEventListener('click', next.bind(this));

  this.$window.innerHTML = `
    <h1>Welcome!</h1>
    <p>
      This tutorial is designed to take you through the core features and
      functions of the ISA Easy Email Generator. We'll start with a basic
      overview of the layout of the page. Click "Continue" below to begin.
    </p>
  `;
  this.$window.appendChild(nextBtn);
  this.$window.classList.add('vertical-center');
}
