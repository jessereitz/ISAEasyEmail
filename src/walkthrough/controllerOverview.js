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
   * openModalListener - Generates the listener for buttons which open up
   *  modals. Makes sure the tutorial window is positioned properly and that
   *  the user can interact with the modal. This function generates the actual
   *  listener and must be given the button to which the listener will be attached.
   *
   * @param {HTML Element} target The HTML Button to which the listener will be
   *  attached.
   *
   * @returns {Function} The listener to attach to the button.
   */
  function openModalListener(target) {
    const targetBtn = target;
    return function innerListener() {
      this.highlight(mainModal);
      this.minimizeOverlay();
      targetBtn.removeEventListener('click', targetBtn.tutClickHandler);
      toggleClicksEnabled.call(this);
      this.$window.display = 'none';
      setTimeout(() => {
        this.$window.display = 'block';
        this.positionWindow(mainModal);
      }, 100);
      nextSubStep.call(this);
    }.bind(this);
  }

  /**
   * closeModalListener - Generates the listener for buttons which close modals.
   *  Essentially disables all clicks, repositions the tutorial overlay, and
   *  calls the next step.
   *
   * @returns {Function} The listener to attach to the button.
   */
  function closeModalListener(close) {
    const closeBtn = close;
    return function innerListener() {
      this.maximizeOverlay();
      toggleClicksEnabled.call(this);
      closeBtn.removeEventListener('click', closeBtn.tutClickHandler);
      nextSubStep.call(this);
    }.bind(this);
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
    toggleClicksEnabled.call(this, controllerBtns.copyCode);
    controllerBtns.copyCode.tutClickHandler = openModalListener.call(this, controllerBtns.copyCode);
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
    closeBtn.tutClickHandler = closeModalListener.call(this, closeBtn);
    closeBtn.addEventListener('click', closeBtn.tutClickHandler);
    toggleClicksEnabled.call(this, closeBtn);
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
    toggleClicksEnabled.call(this, nextBtn);
    this.highlight(controller);
    this.positionWindow(controllerBtns.saveLoad);
  };

  substeps[6] = function settingsOverview() {
    this.$window.innerHTML = `
      <p>
        The "Settings" button allows you to adjust a few settings in the email.
        Go ahead and give it a click.
      </p>
    `;
    controllerBtns.settings.tutClickHandler = openModalListener.call(this, controllerBtns.settings);
    controllerBtns.settings.addEventListener('click', controllerBtns.settings.tutClickHandler);
    toggleClicksEnabled.call(this, controllerBtns.settings);
    this.positionWindow(controllerBtns.settings);
  };

  substeps[7] = function settingsInterface() {
    this.$window.innerHTML = `
      <p>
        Here you can see the settings you can adjust within your email.
      </p>
    `;
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
    toggleClicksEnabled.call(this, nextBtn);
  };

  substeps[8] = function emailTitle() {
    this.$window.innerHTML = `
      <p>
        The Email Title allows you to easily keep track of your ISA Easy Email
        files. Your email is automatically given a title based on the date and
        time it was created but you can change it here. The title of the current
        email is displayed in the bottom right of the screen and is used as the
        name of the file when you save your work.
      </p>
      <p>
        <i>Recipients of the email won't see the title.</i>
      </p>
    `;
    const emailTitleField = mainModal.querySelector('.settingsField');
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
    toggleClicksEnabled.call(this, nextBtn);
    this.positionWindow(emailTitleField);
  };

  substeps[9] = function changeTitle() {
    const targetText = 'Fun Tutorial Email';
    this.$window.innerHTML = `
      <p>
        Let's try changing the Email Title to something more useful. Try
        changing it to the following:
      </p>
      <p>
        "${targetText}"
      </p>
    `;
    const emailTitleField = mainModal.querySelector('.settingsField');
    const emailInput = emailTitleField.querySelector('input');
    function titleIsTarget() {
      if (emailInput.value === targetText) {
        emailInput.removeEventListener('keyup', emailInput.tutKeyHandler);
        nextSubStep.call(this);
      }
    }
    emailInput.tutKeyHandler = titleIsTarget.bind(this);
    emailInput.addEventListener('keyup', emailInput.tutKeyHandler);
    toggleClicksEnabled.call(this, emailTitleField);
  };

  substeps[10] = function linkOverview() {
    this.$window.innerHTML = `
      <p>
        Perfect. The following fields allow you to manipulate the two large
        buttons at the bottom of the email. These buttons provide links to a
        place to book an advising session (eg. SimpleBook.me) and to the online
        application. They have default values but you can choose to override
        them here.
      </p>
    `;
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
    toggleClicksEnabled.call(this, nextBtn);
  };

  substeps[11] = function switchingLinks() {
    this.$window.innerHTML = `
      <p>
        For instance, let's say we <strong>don't</strong> want to include an
        advising session link but <strong>do</strong> want to provide a link to
        an online application, but at a new location.
      </p>
      <p>
        First, let's get rid of that advising session link. You can remove it by
        clicking the toggle switch after "Include Advising Session Link". Try
        this now.
      </p>
    `;
    const advisingSeshField = mainModal.querySelectorAll('.settingsField')[1];
    const advisingSeshSwitch = advisingSeshField.querySelector('.switch');
    function changeToggle(e) {
      e.target.removeEventListener('change', e.target.tutChangeHandler);
      nextSubStep.call(this);
    }
    advisingSeshSwitch.tutChangeHandler = changeToggle.bind(this);
    advisingSeshSwitch.addEventListener('change', advisingSeshSwitch.tutChangeHandler);
    toggleClicksEnabled.call(this, advisingSeshField);
    this.highlight(advisingSeshField);
    this.positionWindow(advisingSeshField);
  };

  substeps[12] = function editingLinkURLs() {
    const targetText = 'google.com';
    this.$window.innerHTML = `
      <p>
        Did you notice how the text box for the advising session URL went away?
        Once you hit save the link itself will be removed from the email, too.
        Pretty neat, right?
      </p>
      <p>
        Now let's change the URL for the link to the online application. We'll
        just set it to something easy, like google for now. Change the contents
        of the Application Link URL box to say "${targetText}".
      </p>
    `;
    const applicationLinkField = mainModal.querySelectorAll('.settingsField')[2];
    const applicationLinkTextBox = applicationLinkField.querySelector('input[type="text"]');
    function isCorrectURL() {
      if (applicationLinkTextBox.value === targetText) {
        applicationLinkTextBox.removeEventListener('keyup', applicationLinkTextBox.tutKeyHandler);
        nextSubStep.call(this);
      }
    }
    applicationLinkTextBox.tutKeyHandler = isCorrectURL.bind(this);
    applicationLinkTextBox.addEventListener('keyup', applicationLinkTextBox.tutKeyHandler);
    this.highlight(applicationLinkField);
    this.positionWindow(applicationLinkField);
    toggleClicksEnabled.call(this, applicationLinkTextBox);
  };

  substeps[13] = function thatsIt() {
    this.$window.innerHTML = `
      <p>
        Awesome! Now click "Save" to save these settings.
      </p>
    `;
    const saveBtn = mainModal.lastChild.firstChild;
    saveBtn.tutClickHandler = closeModalListener.call(this, saveBtn);
    saveBtn.addEventListener('click', saveBtn.tutClickHandler);
    toggleClicksEnabled.call(this, saveBtn);
  };

  substeps[14] = function wrapUp() {
    this.$window.innerHTML = `
      <p>
        That's it for the controller section. Check out the email now: it only
        has the application link. You should also notice that the title in the
        bottom right of the corner has changed.
      </p>
    `;
    toggleClicksEnabled.call(this);
    this.positionWindow(controller);
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
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
