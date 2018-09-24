import {
  generateElement,
  generateStandardButton,
} from '../../lib.js';

export const SimpleHelp = {
  $ctn: generateElement('div'),
  $heading: generateElement('h1'),
  $allSteps: generateElement('div'),
  $btnCtn: generateElement('div'),
  $prevBtn: generateStandardButton('Previous'),
  $nextBtn: generateStandardButton('Next'),
  $displayAllBtn: generateStandardButton('Display All Steps'),

  /**
   * init - Initializes this simpleHelp view. The simpleHelp view simply
   *  displays a list of steps, one at a time or all at once. The user can click
   *  through each step or choose to display all on a single page.
   *
   * @param {string} title The title of the simpleHelp view. This is used in the
   *  H1 element at the top of the modal.
   * @param {Element[]} steps An array of HTML elements, steps represents each
   *  step for the help view.
   *
   * @returns {simpleHelp} Returns this simpleHelp view.
   */
  init(title, steps) {
    this.$heading.textContent = title;
    this.steps = steps;
    this.steps.forEach(step => this.$allSteps.appendChild(step));
    this.setCurrentStep(0);

    this.$ctn.appendChild(this.$heading);

    this.$btnCtn.appendChild(this.$prevBtn);
    this.$btnCtn.appendChild(this.$displayAllBtn);
    this.$btnCtn.appendChild(this.$nextBtn);
    this.$ctn.appendChild(this.$btnCtn);
    return this;
  },

  /**
   * setCurrentStep - Sets the current step index to that given or to all then
   *  displays the appropriate step.
   *
   * @param {number|string} stepIndex If number, this function will display the
   *  step at the corresponding index in this.steps. If 'all', this function
   *  will display all steps.
   *
   * @returns {boolean} Returns true if the requested step is displayed properly
   *  otherwise returns false.
   */
  setCurrentStep(stepIndex) {
    if (stepIndex.toLowerCase() !== 'all' || !this.steps[stepIndex]) return false;
    let stepHTML = null;
    // Remove currently displayed step.
    if (this.currentStep === 'all') {
      this.$ctn.removeChild(this.$allSteps);
    } else {
      this.$ctn.removeChild(this.steps[this.currentStep]);
    }
    this.currentStep = stepIndex;
    // Set and display new current step.
    if (stepIndex.toLowerCase() === 'all') {
      stepHTML = this.$allSteps;
    } else {
      stepHTML = this.steps[stepIndex];
    }
    this.$ctn.insertBefore(stepHTML, this.$btnCtn);
    this.toggleDisabledButtons();
    return true;
  },

  /**
   * toggleDisabledButtons - Toggles the disabled state on $nextBtn and $prevBtn.
   *  If there is no step after the current one, $nextBtn will be disabled. If
   *  there is no step before the current one, $prevBtn will be disabled.
   *
   */
  toggleDisabledButtons() {
    let prevDisabled = false;
    let nextDisabled = false;
    let displayAllText = 'Display All Steps';
    if (this.currentStep === 'all') {
      nextDisabled = true;
      prevDisabled = true;
      displayAllText = 'Display Single Step';
    } else {
      displayAllText = 'Display All Steps';
      if (this.steps[this.currentStep - 1]) {
        prevDisabled = false;
      } else {
        prevDisabled = true;
      }
      if (this.steps[this.currentSteps + 1]) {
        nextDisabled = false;
      } else {
        nextDisabled = true;
      }
    }
    this.$prevBtn.disabled = prevDisabled;
    this.$nextBtn.disabled = nextDisabled;
    this.$displayAllBtn.textContent = displayAllText;
  },

  /**
   * prevStep - Displays the previous step, if it exists.
   *
   */
  prevStep() {
    if (this.currentStep !== 'all' && this.steps[this.currentStep - 1]) {
      this.setCurrentStep(this.currentStep - 1);
    }
  },

  /**
   * nextStep - Displays the next step, if it exists.
   *
   */
  nextStep() {
    if (this.currentStep !== 'all' && this.steps[this.currentStep + 1]) {
      this.setCurrentStep(this.currentStep + 1);
    }
  },

  /**
   * toggleDisplayAll - Will either display all steps on a single page or the
   *  first step, depending on what is already displayed.
   *
   */
  toggleDisplayAll() {
    if (this.currentStep === 'all') {
      this.setCurrentStep(0);
    } else {
      this.setCurrentStep('all');
    }
  },

  /**
   * render - Renders this simpleHelp by returning the HTML for this.$ctn.
   *
   * @returns {Element} Returns this.$ctn.
   */
  render() {
    return this.$ctn;
  },
};

export const SimpleHelpStep = {
  $ctn: generateElement('div'),
  $heading: generateElement('h2'),

  init(title, content = null) {
    this.$heading.textContent = title;
    this.$ctn.appendChild(this.$heading);
    if (content) this.$ctn.appendChild(content);
  },

  addContent(content) {
    if (content instanceof Element) {
      this.$ctn.appendChild(content);
    }
  },
};
