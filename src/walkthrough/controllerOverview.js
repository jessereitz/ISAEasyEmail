import toggleClicksEnabled from './tutorialLib.js';
import { generateStandardButton } from '../lib.js';

export default (function init() {
  const substeps = [];
  let currentStep = 0;
  let controller;
  let controllerBtns;
  let mainModal;
  const nextBtn = generateStandardButton('Next');

  /**
   * getControllerAndButtons - map the Controller and its buttons to variables.
   *
   */
  function getControllerAndButtons() {
    controller = document.getElementById('controller');
    controllerBtns = {
      startOver: document.getElementById('startoverBtn'),
      copyCode: document.getElementById('copyCodeBtn'),
      saveLoad: document.getElementById('saveLoadBtn'),
      settings: document.getElementById('settingsBtn'),
    };
  }

  /**
   * nextSubStep - Proceed to the next substep in the substeps array. If the
   *  user is at the final substep, this function calls the overarching nextStep
   *  function to proceed to the next section.
   *
   */
  function nextSubStep() {
    currentStep += 1;
    if (!substeps[currentStep]) return this.nextStep();
    substeps[currentStep].call(this);
    return null;
  }

  /**
   * prepNextBtn - Prepares the nextBtn to be used. This must be called each
   *  time the nextBtn is to be used. Otherwise, the current step will be set to
   *  a previous value if the user exits then relaunches the tutorial.
   *
   */
  function prepNextBtn(handler) {
    if (nextBtn.handler) {
      nextBtn.removeEventListener('click', nextBtn.handler);
    }
    let finalHandler;
    if (handler && typeof handler === 'function') {
      finalHandler = handler.bind(this);
    } else {
      finalHandler = nextSubStep.bind(this);
    }
    nextBtn.handler = finalHandler;
    nextBtn.addEventListener('click', nextBtn.handler);
  }

  /**
   * intro - Provides a brief overview of the Controller section.
   *
   */
  substeps[0] = function intro() {
    this.$window.innerHTML = `
      <p>
        This is the Controller. It provides broad functionality that affects the
        editor and/or your email as a whole.
      </p>
    `;
    toggleClicksEnabled.call(this, nextBtn);
    this.positionWindow(controller);
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
  };

  /**
   * startOver - Provides a brief overview of the Start Over button.
   *
   */
  substeps[1] = function startOver() {
    this.$window.innerHTML = `
      <p>
        The "Start Over" button has a fairly obvious purpose. Just be careful as
        you will loose all your work if you press it.
      </p>
    `;
    this.positionWindow(controllerBtns.startOver);
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
  };

  /**
   * copyCodeOverview - Provides a brief overview of the Copy Code button.
   *
   * @returns {type} Description
   */
  substeps[2] = function copyCodeOverview() {
    this.$window.innerHTML = `
      <p>
        The "Copy Code" button will copy the source code of your email to your
        clipboard so you can paste it into the GRS HTML Template editor.
      </p>
    `;
    this.positionWindow(controllerBtns.copyCode);
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
  };

  /**
   * copyCodeOpen - Prompts the user to click the Copy Code button to view the
   *  copy code interface. Disables all clicks but on the copy code button.
   *
   */
  substeps[3] = function copyCodeOpen() {
    this.$window.innerHTML = `
      <p>Go ahead and give the "Copy Code" button a click to see what happens.</p>
    `;
    function resetCopyCodeHandler() {
      controllerBtns.copyCode.removeEventListener('click', controllerBtns.copyCode.tutClickHandler);
      toggleClicksEnabled.call(this);
      this.$window.display = 'none';
      setTimeout(() => {
        this.$window.display = 'block';
        this.positionWindow(mainModal);
      }, 100);
      nextSubStep.call(this);
    }
    // toggleClicksEnabled.call(this);
    toggleClicksEnabled.call(this, controllerBtns.copyCode);
    controllerBtns.copyCode.tutClickHandler = resetCopyCodeHandler.bind(this);
    controllerBtns.copyCode.addEventListener('click', controllerBtns.copyCode.tutClickHandler);
  };

  /**
   * copyCodeInterface - Demonstrates the functionality of the copy code
   *  interface.
   *
   */
  substeps[4] = function copyCodeInterface() {
    this.$window.innerHTML = `
      <p>
        This is the code copying interface. ISA Easy Email will attempt to copy
        the code straight to your clipboard as soon as you click the "Copy Code"
        button but this doesn't always work due to browser settings (especially
        Firefox).
      </p>
      <p>
        Regardless, you can view and copy the code in the textbox here. You can
        try to copy again using the "Copy" button or you can right-click to copy
        the text straight from the textbox.
      </p>
      <p>
        Press "Close" to continue.
      </p>
    `;
    const closeBtn = mainModal.lastChild.lastChild;
    function closeBtnClickHandler() {
      this.maximizeOverlay();
      toggleClicksEnabled.call(this);
      closeBtn.removeEventListener('click', closeBtn.tutClickHandler);
      nextSubStep.call(this);
    }
    closeBtn.tutClickHandler = closeBtnClickHandler.bind(this);
    closeBtn.addEventListener('click', closeBtn.tutClickHandler);
    toggleClicksEnabled.call(this, closeBtn);
    this.highlight(mainModal);
    this.minimizeOverlay();
    // setTimeout(() => this.positionWindow(mainModal), 50);
  };

  /**
   * saveLoadOverview - Provides a basic overview of the save and load
   *  functionality.
   *
   */
  substeps[5] = function saveLoadOverview() {
    this.$window.innerHTML = `
      <p>
        The "Save / Load" button, you guessed it, let's you save your email or
        load up previous emails! This is super helpful if you want to share a
        template with someone else or if you want to come back to your email
        later.
      </p>
    `;
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
    this.highlight(controller);
    this.positionWindow(controllerBtns.saveLoad);
  };

  substeps[6] = function settingsOverview() {
    this.$window.innerHTML = `
      <p>
        The "Settings" button allows you to adjust a few settings in the email.
      </p>
    `;
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
    this.positionWindow(controllerBtns.settings);
  };

  function main() {
    getControllerAndButtons();
    this.highlight(controller);
    mainModal = document.getElementById('main-modal');
    substeps[0].call(this);
    return null;
  }
  return main;
}());
