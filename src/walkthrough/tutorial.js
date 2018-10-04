import layoutOverview from './layoutOverview';
import editorOverview from './editorOverview';
import controllerOverview from './controllerOverview';
import wrapUp from './wrapUp';

import { generateElement, generateStandardButton } from '../lib';

const windowPosOffset = 20;
let currentStep = 0;

/**
 * Tutorial - A walkthrough of the features of the ISA Easy Email Generator.
 *  This tutorial operates by placing an overlay over the entire screen and
 *  highlighting one component at a time while annotating with a popout box. It
 *  does this by iterating through the 'steps' property, which is an Array of
 *  functions which manipulate the popout and highlighted elements to take the
 *  user through each function.
 */
const Tutorial = {
  $overlay: generateElement('div', { klasses: ['modal-overlay', 'tutorial-overlay'] }),
  $window: generateElement('div', { klasses: ['tutorial-window'] }),
  $exitBtn: generateStandardButton('&times;', { klasses: ['tutorial-exit'], id: 'tutorialExitBtn' }),
  steps: [],
  minimizedOverlayStyle: {
    position: 'static',
    width: '1px',
    height: '1px',
    zIndex: '1',
  },

  /**
   * init - Initialize the Tutorial.
   *
   */
  init() {
    currentStep = 0;
    this.$exitBtn.addEventListener('click', this.hide.bind(this));
    this.$overlay.appendChild(this.$exitBtn);
    this.$overlay.appendChild(this.$window);
    document.body.appendChild(this.$overlay);
    return this;
  },

  /**
   * beginTutorial - Begins the tutorial by calling the first step.
   *
   */
  beginTutorial() {
    this.resetWindowPosition();
    currentStep = 0;
    this.display();
    this.steps[currentStep].call(this);
  },

  /**
   * nextStep - Move to the next step in the tutorial process.
   *
   */
  nextStep() {
    currentStep += 1;
    if (!this.steps[currentStep]) return this.hide();
    this.steps[currentStep].call(this);
    return null;
  },

  /**
   * resetWindowPosition - Reset the position of the tutorial popout window.
   *
   */
  resetWindowPosition() {
    this.$window.style.left = '';
    this.$window.style.right = '';
    this.$window.style.top = '';
    this.$window.style.bottom = '';
    if (this.$window.classList.contains('vertical-center')) this.$window.classList.remove('vertical-center');
  },

  /**
   * positionWindow - Position the tutorial popout window to display next to the
   *  given HTML Element.
   *
   * @param {type} target Description
   *
   * @returns {type} Description
   */
  positionWindow(target) {
    const modalRect = this.$window.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    this.resetWindowPosition();
    if (window.innerWidth - modalRect.width > targetRect.right) {
      this.$window.style.left = targetRect.right + windowPosOffset;
    } else {
      this.$window.style.right = (window.innerWidth - targetRect.left) + windowPosOffset;
    }

    if (targetRect.top + modalRect.height < window.innerHeight) {
      this.$window.style.top = targetRect.top;
    } else {
      this.$window.style.bottom = windowPosOffset;
    }
  },

  /**
   * highlight - Highlights the given target by bringing it above the overlay.
   *
   * @param {HTML Element} target The Element to highlight.
   *
   */
  highlight(target) {
    this.releaseHighlighted();
    this.highlightedHTML = target;
    if (target.id === 'wfeditor') {
      this.highlightedHTML.style.background = 'white';
    }

    this.highlightedHTML.prevPos = this.highlightedHTML.style.position;
    this.highlightedHTML.prevZ = this.highlightedHTML.style.zIndex;

    if (this.highlightedHTML.id === 'controller') {
      this.highlightedHTML.style.position = 'absolute';
    } else if (this.highlightedHTML.id === 'wfeditor') {
      this.highlightedHTML.style.position = 'relative';
    }
    this.highlightedHTML.style.zIndex = '10';
  },

  /**
   * releaseHighlighted - Releases the currently highlighted element, if there
   *  is one. It does this by setting its position and zIndex to their previous
   *  values.
   *
   */
  releaseHighlighted() {
    if (this.highlightedHTML) {
      this.highlightedHTML.style.position = this.highlightedHTML.prevPos;
      this.highlightedHTML.style.zIndex = this.highlightedHTML.prevZ;
      if (this.highlightedHTML.id === 'wfeditor') this.highlightedHTML.style.background = '';
    }
  },

  /**
   * display - Display the tutorial.
   *
   */
  display() {
    this.$overlay.style.display = 'block';
  },

  /**
   * hide - Hide the tutorial.
   *
   */
  hide() {
    this.releaseHighlighted();
    this.$overlay.style.display = 'none';
    window.location.reload();
  },

  /**
   * minimizeOverlay - Make the overlay minimized. That is to say, make is so
   *  the main modal window can be displayed in the tutorial with the tutorial
   *  modal alongside it.
   *
   */
  minimizeOverlay() {
    Object.keys(this.minimizedOverlayStyle).forEach((prop) => {
      this.$overlay.style[prop] = this.minimizedOverlayStyle[prop];
    });
    this.$window.style.zIndex = '1000';
  },

  /**
   * maximizeOverlay - Make the overlay cover the entire screen again.
   *
   */
  maximizeOverlay() {
    this.$overlay.style = '';
    this.$overlay.style.display = 'block';
  },

  /**
   * centerWindow - Centers the modal window vertically and horizontally.
   *
   */
  centerWindow() {
    this.$window.classList.add('vertical-center');
    this.$window.style = '';
  },
};

Tutorial.steps[0] = layoutOverview;
Tutorial.steps[1] = editorOverview;
Tutorial.steps[2] = controllerOverview;
Tutorial.steps[3] = wrapUp;
export default Tutorial;
