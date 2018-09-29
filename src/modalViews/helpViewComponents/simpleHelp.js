import {
  generateElement,
  generateStandardButton,
} from '../../lib.js';

export default {
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
  init(title, steps, modal) {
    this.initHTML();
    this.$heading.textContent = title;
    this.steps = steps;
    this.modal = modal;
    this.steps.map(step => this.$allSteps.appendChild(step.cloneNode(true)));

    this.$ctn.appendChild(this.$heading);

    this.$btnCtn.appendChild(this.$prevBtn);
    this.$btnCtn.appendChild(this.$displayAllBtn);
    this.$btnCtn.appendChild(this.$nextBtn);
    this.$ctn.appendChild(this.$btnCtn);
    this.setCurrentStep(0);
    this.$nextBtn.addEventListener('click', this.nextStep.bind(this));
    this.$prevBtn.addEventListener('click', this.prevStep.bind(this));
    this.$displayAllBtn.addEventListener('click', this.toggleDisplayAll.bind(this));
    return this;
  },

  initHTML() {
    this.$ctn = generateElement('div');
    this.$heading = generateElement('h1');
    this.$allSteps = generateElement('div');
    this.$btnCtn = generateElement('div');
    this.$prevBtn = generateStandardButton('Previous');
    this.$nextBtn = generateStandardButton('Next');
    this.$displayAllBtn = generateStandardButton('Display All Steps', { klasses: ['standardBtn--margin-right-large', 'standardBtn--margin-left-large'] });
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
    if (String(stepIndex).toLowerCase() !== 'all' && !this.steps[stepIndex]) return false;
    let stepHTML = null;
    // Remove currently displayed step.
    if (this.currentStep === 'all') {
      this.$ctn.removeChild(this.$allSteps);
    } else if (this.currentStep >= 0) {
      this.$ctn.removeChild(this.steps[this.currentStep]);
    }
    this.currentStep = stepIndex;
    // Set and display new current step.
    if (String(stepIndex).toLowerCase() === 'all') {
      stepHTML = this.$allSteps;
    } else {
      stepHTML = this.steps[stepIndex];
    }
    // this.$ctn.insertBefore(stepHTML, this.$btnCtn);
    this.$ctn.appendChild(stepHTML);
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
      if (this.steps[this.currentStep + 1]) {
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
      this.render(this.currentStep - 1);
    }
  },

  /**
   * nextStep - Displays the next step, if it exists.
   *
   */
  nextStep() {
    if (this.currentStep !== 'all' && this.steps[this.currentStep + 1]) {
      this.render(this.currentStep + 1);
    }
  },

  /**
   * toggleDisplayAll - Will either display all steps on a single page or the
   *  first step, depending on what is already displayed.
   *
   */
  toggleDisplayAll() {
    if (this.currentStep === 'all') {
      this.render(0);
    } else {
      this.render('all');
    }
  },

  /**
   * render - Renders this simpleHelp by setting the current step to that given
   *  and calling the modal's display method.
   *
   * @returns {Element} Returns this.$ctn.
   */
  render(step) {
    let newStep = step;
    if (!(newStep >= 0) && newStep !== 'all') {
      newStep = this.currentStep;
    }
    this.setCurrentStep(newStep);
    this.modal.display(this.$ctn);
  },
};
