import { generateElement } from '../lib.js';

const windowPosOffset = 20;
let currentStep = 0;

const Tutorial = {
  $overlay: generateElement('div', { klasses: ['modal-overlay'] }),
  $window: generateElement('div', { klasses: ['tutorial-window'] }),
  steps: [],
  init() {
    currentStep = 0;
    this.$window.innerHTML = '<p>hello?</p><p>Hello!</p>';
    this.$overlay.appendChild(this.$window);
    document.body.appendChild(this.$overlay);
  },
  nextStep() {
    currentStep += 1;
    this.steps[currentStep].call(this);
  },

  display() {
    this.$overlay.style.display = 'block';
  },

  positionWindow(target) {
    const modalRect = this.$window.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    if (window.innerWidth - modalRect.width > targetRect.right) {
      this.$window.style.left = targetRect.right + windowPosOffset;
      this.$window.style.right = '';
    } else {
      this.$window.style.left = '';
      this.$window.style.right = (window.innerWidth - targetRect.left) + windowPosOffset;
    }

    if (targetRect.bottom + modalRect.height < window.innerHeight) {
      this.$window.style.top = targetRect.top;
      this.$window.style.bottom = '';
    } else {
      this.$window.style.top = '';
      this.$window.style.bottom = windowPosOffset;
    }
  },
};

Tutorial.steps[0] = function layoutOverview() {

};

export default Tutorial;
