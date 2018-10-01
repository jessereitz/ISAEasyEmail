import { generateStandardButton } from '../lib';

export default (function init() {
  let editor; let editBtns; let insertBtns; let firstEditorPar;
  // An Array of the substeps through which the user will proceed
  const substeps = [];
  let currentStep = 0;
  // Reusable button to proceed to the next substep
  const nextBtn = generateStandardButton('Next');
  // Length of time in ms which the demo will display the effects of each edit button
  const demoButtonDuration = 750;
  const demoButtonInitialDelay = 250;

  /**
   * selectNodeContents - Selects the contents of the given node.
   *
   * @param {Element} node The HTML Element to select.
   *
   */
  function selectNodeContents(node) {
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  /**
   * selectFirstParagraphContents - Finds and selects the very first paragraph
   *  in the editor.
   *
   */
  function selectFirstParagraphContents() {
    firstEditorPar = editor.firstChild.firstChild;
    selectNodeContents(firstEditorPar);
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
  function prepNextBtn() {
    if (nextBtn.handler) {
      nextBtn.removeEventListener('click', nextBtn.handler);
    }
    nextBtn.handler = nextSubStep.bind(this);
    nextBtn.addEventListener('click', nextBtn.handler);
  }

  /**
   * getEditButtons - Finds all buttons in the edit toolbar in the document.
   *  Returns these buttons in an object.
   *
   */
  function getEditButtons() {
    return {
      bold: document.querySelector('[title="Bold Selection"]'),
      italic: document.querySelector('[title="Italicize Selection"]'),
      heading: document.querySelector('[title="Wrap Selection with Heading"]'),
      link: document.querySelector('[title="Wrap Selection with Link"]'),
    };
  }

  /**
   * getInsertButtons - Finds all buttons in the insert toolbar in the document.
   *  Returns these buttons in an object.
   *
   */
  function getInsertButtons() {
    return {
      image: document.querySelector('[title="Insert an Image"]'),
      line: document.querySelector('[title="Insert a Horizontal Rule"]'),
    };
  }

  /**
   * toggleClicksEnabled - Disables or enables click, mousedown, and mouseup
   *  events in the document. Clicks are always enabled for the exit button and
   *  can be enabled for a given HTML element (the allowed parameter).
   *
   * @param {Element} allowed An HTML Element which should still be clickable.
   *
   */
  function toggleClicksEnabled(allowed) {
    function disableClicks(e) {
      if (allowed instanceof Element && allowed.contains(e.target)) return false;
      if (this.$exitBtn.contains(e.target)) return toggleClicksEnabled.call(this);
      e.preventDefault();
      e.stopPropagation();
      return true;
    }

    if (document.disableFunction) {
      document.removeEventListener('click', document.disableFunction, true);
      document.removeEventListener('mousedown', document.disableFunction, true);
      document.removeEventListener('mouseup', document.disableFunction, true);
      document.disableFunction = null;
    } else {
      document.disableFunction = disableClicks.bind(this);
      document.addEventListener('click', document.disableFunction, true);
      document.addEventListener('mousedown', document.disableFunction, true);
      document.addEventListener('mouseup', document.disableFunction, true);
    }
  }

  /**
   * intro - The introduction to the Editor. Displays a brief overview message.
   *
   */
  substeps[0] = function intro() {
    this.$window.innerHTML = `
      <p>
        Let's talk about the editor first. It allows you to easily compose an
        email complete with images, links, and common styling elements.
      </p>
    `;
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
  };

  /**
   * tryTyping - This substep has the user try typing in the editor. The user
   *  must type in the targetText completely and exactly in order to proceed.
   *
   */
  substeps[1] = function tryTyping() {
    const targetText = 'Hello Students!';
    this.$window.innerHTML = `
      <p>
        Let's see what this thing can do! Try typing "${targetText}" in the editor.
      </p>
    `;
    const boundIsHelloStudents = function isHelloStudents() {
      if (firstEditorPar.textContent === targetText) {
        editor.removeEventListener('keyup', boundIsHelloStudents);
        nextSubStep.call(this);
      }
    }.bind(this);
    editor.addEventListener('keyup', boundIsHelloStudents);
  };

  /**
   * displayEditToolbar - This substep selects the just-entered text to display
   *  the edit toolbar. It then adds the next button to the window for the user
   *  to proceed.
   *
   */
  substeps[2] = function displayEditToolbar() {
    this.$window.innerHTML = `
      <p>
        Perfect. Did you notice I highlighted the text you entered?
        Highlighting text will bring up the editing toolbar which allows you to
        manipulate the text.
      </p>
    `;
    toggleClicksEnabled.call(this, nextBtn);
    setTimeout(() => {
      selectFirstParagraphContents();
      setTimeout(() => {
        prepNextBtn.call(this);
        this.$window.appendChild(nextBtn);
      }, demoButtonDuration);
    }, demoButtonInitialDelay);
  };

  /**
   * highlightBoldBtn - Highlights and demonstrates the bold button.
   *
   */
  substeps[3] = function highlightBoldBtn() {
    this.$window.innerHTML = `
      <p>
        The "B" button bolds your selection.
      </p>
    `;
    selectFirstParagraphContents();
    setTimeout(() => {
      // temporarily reenable clicks, click on bold button, disable clicks
      toggleClicksEnabled.call(this);
      editBtns.bold.click();
      toggleClicksEnabled.call(this);
      setTimeout(() => {
        toggleClicksEnabled.call(this);
        editBtns.bold.click();
        toggleClicksEnabled.call(this, nextBtn);
        this.$window.appendChild(nextBtn);
      }, demoButtonDuration);
    }, demoButtonInitialDelay);
    prepNextBtn.call(this);
    editBtns.bold.prevBorder = editBtns.bold.style.borderColor;
    editBtns.bold.style.borderColor = 'white';
  };

  /**
   * highlightItalicBtn - Highlights and demonstrates the italic button.
   *
   */
  substeps[4] = function highlightItalicBtn() {
    this.$window.innerHTML = `
      <p>
        The "i" button italicizes your selection.
      </p>
    `;
    selectFirstParagraphContents();
    setTimeout(() => {
      // temporarily reenable clicks, click on italic button, disable clicks
      toggleClicksEnabled.call(this);
      editBtns.italic.click();
      toggleClicksEnabled.call(this);
      setTimeout(() => {
        toggleClicksEnabled.call(this);
        editBtns.italic.click();
        toggleClicksEnabled.call(this, nextBtn);
        this.$window.appendChild(nextBtn);
      }, demoButtonDuration);
    }, demoButtonInitialDelay);
    prepNextBtn.call(this);
    editBtns.bold.style.borderColor = editBtns.bold.prevBorder;
    editBtns.italic.prevBorder = editBtns.italic.style.borderColor;
    editBtns.italic.style.borderColor = 'white';
  };

  /**
   * highlightHeadingBtn - Highlights and demonstrates the heading button. It
   *  does this by cycling through all heading options and back to normal.
   *
   */
  substeps[5] = function highlightHeadingBtn() {
    this.$window.innerHTML = `
      <p>
        The "H" button wraps your selection in a heading. There are two heading
        styles to choose from. Clicking this button will cycle through the
        heading and normal styles.
      </p>
    `;
    selectFirstParagraphContents();
    setTimeout(() => {
      // temporarily reenable clicks, click on heading button, disable clicks
      toggleClicksEnabled.call(this);
      editBtns.heading.click();
      toggleClicksEnabled.call(this, nextBtn);
      selectFirstParagraphContents();
      setTimeout(() => {
        selectFirstParagraphContents();
        toggleClicksEnabled.call(this);
        editBtns.heading.click();
        toggleClicksEnabled.call(this, nextBtn);
        selectFirstParagraphContents();
        setTimeout(() => {
          selectFirstParagraphContents();
          toggleClicksEnabled.call(this);
          editBtns.heading.click();
          toggleClicksEnabled.call(this, nextBtn);
          selectFirstParagraphContents();
          this.$window.appendChild(nextBtn);
        }, demoButtonDuration);
      }, demoButtonDuration);
    }, demoButtonInitialDelay);
    prepNextBtn.call(this);
    editBtns.italic.style.borderColor = editBtns.italic.prevBorder;
    editBtns.heading.prevBorder = editBtns.heading.style.borderColor;
    editBtns.heading.style.borderColor = 'white';
  };

  /**
   * highlightLinkBtn - Highlights and demonstrates the link button.
   *
   */
  substeps[6] = function highlightLinkBtn() {
    this.$window.innerHTML = `
      <p>
        The link button wraps your selection in a link. Pressing this button
        will bring up an interface to insert your link. Just type or paste the URL,
        press enter, and you're good to go!
      </p>
    `;
    selectFirstParagraphContents();
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
    editBtns.heading.style.borderColor = editBtns.heading.prevBorder;
    editBtns.link.prevBorder = editBtns.link.style.borderColor;
    editBtns.link.style.borderColor = 'white';
  };

  /**
   * createHeading - Takes the user through the process of making their text
   *  into a heading. Disables all clicks except those on the heading button,
   *  then proceeds when the user clicks on the heading button.
   *
   */
  substeps[7] = function createHeading() {
    this.$window.innerHTML = `
      <p>
        Let's create a heading. Go ahead and click the heading button. (The one outlined in white.)
      </p>
      <p><i>Hint: if you can't see the editing toolbar, try selecting the text again</i></p>
    `;
    toggleClicksEnabled.call(this);
    toggleClicksEnabled.call(this, editBtns.heading);

    /**
     * headingNextStep - Resets the heading button's style, reenables clicks,
     *  then moves on to the next substep.
     *
     */
    function headingNextStep() {
      editBtns.heading.style.borderColor = editBtns.heading.prevBorder;
      toggleClicksEnabled.call(this);
      editBtns.heading.removeEventListener('click', editBtns.heading.tutClickHandler);
      nextSubStep.call(this);
    }
    editBtns.heading.tutClickHandler = headingNextStep.bind(this);
    editBtns.heading.addEventListener('click', editBtns.heading.tutClickHandler);

    selectFirstParagraphContents();
    editBtns.link.style.borderColor = editBtns.link.prevBorder;
    editBtns.heading.prevBorder = editBtns.heading.style.borderColor;
    editBtns.heading.style.borderColor = 'white';
  };

  /**
   * goToNewLine - Has the user move to a new line in order to demonstrate the
   *  insert toolbar.
   *
   */
  substeps[8] = function goToNewLine() {
    this.$window.innerHTML = `
      <p>
        Cool, right? Let's throw an image into the mix now. First, press "Enter"
        to go to a new line.
      </p>
    `;

    /**
     * checkForEnter - Checks if the user presses enter in the editor. If they do,
     *  proceeds to the next substep.
     *
     * @param {Event} e The click event to monitor.
     *
     */
    function checkForEnter(e) {
      if (e.key === 'Enter') {
        nextSubStep.call(this);
        editor.removeEventListener('keyup', editor.tutKeyListener);
      }
    }
    editor.tutKeyListener = checkForEnter.bind(this);
    editor.addEventListener('keyup', editor.tutKeyListener);
  };

  /**
   * startAddImage - Has the user start to add an image to their email.
   *
   */
  substeps[9] = function startAddImage() {
    this.$window.innerHTML = `
      <p>
        Are you on a new line? Is it empty? Awesome! You should now see the
        insert toolbar. This toolbar allows you to insert an image or a horizontal
        rule (a line to separate sections).
      </p>
      <p>
        To add an image, click the image button (it's highlighted in white).
      </p>
      <p><i>If you don't see the insert toolbar make sure you are on an empty line.</i></p>
    `;
    toggleClicksEnabled.call(this, insertBtns.image);
    function imageClickHandler() {
      insertBtns.image.style.borderColor = insertBtns.image.prevBorder;
      insertBtns.image.removeEventListener('click', insertBtns.image.tutClickHandler);
      toggleClicksEnabled.call(this);
      nextSubStep.call(this);
    }
    insertBtns.image.tutClickHandler = imageClickHandler.bind(this);
    insertBtns.image.addEventListener('click', insertBtns.image.tutClickHandler);
    insertBtns.image.prevBorder = insertBtns.image.style.borderColor;
    insertBtns.image.style.borderColor = 'white';
  };

  /**
   * endAddImage - Has the user finish up adding an image to their email.
   *
   */
  substeps[10] = function endAddImage() {
    this.positionWindow(editor);
    const imgURL = 'http://studiesabroad.com/html-email-files/images/scot.jpg';
    this.$window.innerHTML = `
      <p>
        Notice how the toolbar changed? You can now type or paste the url for
        the image you would like to add. Go ahead and copy and paste the URL below,
        then press enter.
      </p>
      <p>
        ${imgURL}
      </p>
    `;
    let atAltText = false;
    function enterHandler(e) {
      if (e.key !== 'Enter') return;
      if (!atAltText) {
        atAltText = true;
        this.$window.innerHTML = `
          <p>
            Now that you've entered the URL, you need to add the alt text. Your
            alt text should describe what the image is supposed to convey. For
            instance, you could put the following alt text in for the image you
            are adding:
          </p>
          <p>"The beautifully jagged landscape of Scotland at sunrise."</p>
          <p>
            Copy and paste the example text above and press enter again to
            finalize your image.
          </p>
          <p><i>If you loose the insert toolbar, just click on the empty line,
          then click the image icon and repaste the url:<br/><br/>
          ${imgURL}</i></p>
        `;
      } else {
        editor.removeEventListener('keyup', editor.tutEnterHandler);
        this.$window.innerHTML = `
          <p>
            Alt text is <strong>VERY</strong> important because it is displayed when
            the image doesn't load. This is important because many email clients
            disable automatic image loading by default and because those with
            visual impairments rely on the alt text to know what the image is
            supposed to convey.
          </p>
        `;
        prepNextBtn.call(this);
        this.$window.appendChild(nextBtn);
      }
    }
    editor.tutEnterHandler = enterHandler.bind(this);
    editor.addEventListener('keyup', editor.tutEnterHandler);
  };

  /**
   * wrapUp - Tell users how to delete images and add links.
   *
   */
  substeps[11] = function wrapUp() {
    this.$window.innerHTML = `
      <p>
        Our email is looking pretty good, now, isn't it? If you decide you don't
        like the image or anything else, you can just click in the line below it
        and press "Backspace." Oh, and remember that adding links is similar to
        adding images: just choose the text you want to use as your link, press
        the link button, and paste or type the URL to which you want to link.
      </p>
    `;
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
  };

  /**
   * end - Finish the Editor section of the tutorial. Have user move on to the
   *  next section.
   *
   */
  substeps[12] = function end() {
    this.$window.innerHTML = `
      <p>
        That just about wraps up the Editor section of this tutorial. There's a
        lot more to explore though so take some time after this tutorial to play
        around with it! In the meantime, click "Next" below to continue to the
        next section of this tutorial.
      </p>
    `;
    prepNextBtn.call(this);
    this.$window.appendChild(nextBtn);
  };

  function main() {
    prepNextBtn.call(this);
    editor = document.getElementById('wfeditor');
    editBtns = getEditButtons();
    insertBtns = getInsertButtons();
    firstEditorPar = editor.querySelector('.wf__text-section');
    this.highlight(editor);
    this.positionWindow(editor);
    currentStep = 0;
    substeps[0].call(this);
  }
  return main;
}());
