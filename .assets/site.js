(function InitializeInsideISAEmailGenerator() {
  'use strict';

/////////////////////////////
/////     UTILITIES     /////
/////////////////////////////
function generateElement(tagName, klasses, id) {
  /* Provides a simple function to create an element with classes and an id.*/
  if (!tagName) {
    return false;
  }
  var el = document.createElement(tagName);
  if (id) {
    el.setAttribute('id', id);
  }
  if (klasses) {
    for (let klass of klasses) {
      el.classList.add(klass);
    }
  }
    return el;
}

//////////////////////////
/////     Popout     /////
//////////////////////////
var Popout = {
  /* A generic pop-up box used for containing dynamic content.

  Attributes:
    $ctn (HTML element): the container which acts as the actual popup.
    popoutDefaultOffClickHandler (function): the default function called when
      a user clicks off this popout.
  */
  initPopout: function() {
    /* Initialize the popout. */
    this.$ctn = generateElement('div', ['popoutCtn', 'hide']);
    document.body.append(this.$ctn);
    this.replaceOffClickHandler(this.popoutDefaultOffClickHandler.bind(this));
    this.$ctn.addEventListener('paste', pasteAsPlainText.bind(this));
  },
  fillWithContent: function($content) {
    // fill $ctn with content.
    this.$ctn.append($content);
  },
  displayPopout: function(xPos, yPos) {
    // Displays the popout at given coorddinates.
    this.$ctn.style.top = yPos;
    this.$ctn.style.left = xPos;
    this.$ctn.classList.remove('hide');
    this.hidden = false;
  },
  displayAtElement($el, includeOffset) {
    /* Displays the Popout just next to the given element.

    Params:
      $el (HTML element): the HTML element next to which the Popout will be
        displayed.
      includeOffset (boolean): If true, the current Y scroll position will
        be included in the vertical position of the Popout. If false, it will
        not be included.
    */
    var rect = $el.getBoundingClientRect();
    var right = rect.right + 25;
    var offset;
    if (includeOffset) {
      offset = window.scrollY;
    } else {
      offset = 0;
    }
    var top = rect.top + offset;
    this.displayPopout(right, top);
  },
  hidePopout: function() {
    // while (this.$ctn.firstChild) {
    //   this.$ctn.removeChild(this.$ctn.firstChild);
    // }
    this.$ctn.classList.add('hide');
    this.hidden = true;
  },
  empty() {
    // removes all children from $ctn.
    while(this.$ctn.firstChild) {
      this.$ctn.removeChild(this.$ctn.firstChild);
    }
  },
  popoutDefaultOffClickHandler(e) {
    /* Auto-hide Popout if user clicks off.

    This is the default method for auto-hiding the Popout if a user
    clicks off the editor. If the user clicks on any element other than the
    current editable or the Popout, the Popout will be hidden and
    all changes will be lost.
   */
    if (!this.hidden && (!this.$ctn.contains(e.target))) {
      this.hidePopout();
    }
  },
  replaceOffClickHandler(handler) {
    if (this.offClickHandler) {
      document.removeEventListener('click', this.offClickHandler);
    }
    this.offClickHandler = handler;
    document.addEventListener('click', this.offClickHandler);
  }
};

var EmailGenerator = {
  /* The overall generator tool. Encompasses the entire email.

  The EmailGenerator encompasses the entire InsideISA email. From the
  intro section to each ContentSection, to the bottom buttons, this
  object contains it all and provides the broad functionality of the web
  app (add section, copy the code, etc).

  Attributes
    contentSections (Array of ContentSection): The ContentSections
      contained within the EmailGenerator.
    $contentSectionsCtn (HTML Element): The HTML element to act as the
      container for the rendered ContentSections.
    $bottomBtns (HTML Element): The HTML Element containing the buttons
      at the bottom of the $contentSectionsCtn. ContentSections are
      inserted before these buttons.
    $copyTarget (HTML Element): The target to which the final code will
      be briefly attached in order to allow it to copied to the
      clipboard.
  */
  init: function() {
    /* Initializes the EmailGenerator. */
    this.$copyTarget = document.getElementById('copyTarget');
    this.createCopyPopout();
  },
  createCopyTextarea: function(content) {
    // Create and return a textarea with correct style filled with given content
    var copyTextarea = document.createElement('textarea');
    // copyTextarea.setAttribute('style', COPY_TEXTAREA_STYLE);
    copyTextarea.value = content;
    return copyTextarea;
  },
  createCopyPopout: function() {
    /* Create a Popout to contain and display HTML content from email.

    This method creates a new object linked to Popout. It also creates the
    needed elements and methods contained within.
    */
    if (!this.copyPopout) {
      this.copyPopout = Object.create(Popout);
      this.copyPopout.initPopout();
      this.copyPopout.$ctn.classList.add('copyPopout');
    }
    // Create message area
    this.copyPopout.$messageHeading = generateElement('h2');
    this.copyPopout.$message = generateElement('div');
    // Create button to close the Popout
    this.copyPopout.$copyBtn = generateElement('button', ['standardBtn']);
    this.copyPopout.$copyBtn.addEventListener('click', this.copyPopout.hidePopout.bind(this.copyPopout));
    this.copyPopout.$copyBtn.textContent = "Done";
    // Create the textarea element to which the HTML will be copied
    this.copyPopout.textArea = generateElement('textarea', ['copyTextarea']);

    // Insert the newly created elements in the Popout
    this.copyPopout.fillWithContent(this.copyPopout.$messageHeading);
    this.copyPopout.fillWithContent(this.copyPopout.$message);
    this.copyPopout.fillWithContent(this.copyPopout.textArea);
    this.copyPopout.fillWithContent(this.copyPopout.$copyBtn);
    // method for filling the textarea with content
    this.copyPopout.fillTextarea = function(content) {
      this.textArea.value = content;
    };
    // method for copying the content.
    this.copyPopout.copyContent = function() {
      /* Copy the contents of the textarea to clipboard and display a success message. */
      this.textArea.focus();
      this.textArea.select();
      var successful;
      try {
        successful = document.execCommand('copy');
      } catch (err) {
        successful = false;
      }
      if (successful) {
        this.$messageHeading.textContent = "Email content copied!";
        this.$message.textContent = "You can now paste the email content into GRS.";
      } else {
        this.$messageHeading.textContent = "Uh oh...";
        this.$message.textContent = "We couldn't copy the email content. Try again or manually copy the content below";
      }
      return successful;
    };
  },
  copyToClipboard: function($displayEl) {
    /* Copy the content of the email to the clipboard.

    In order to make the transferring of the InsideISA content to GRS as
    easy as possible, the contents are automatically copied to the user's
    clipboard. This takes some finagling but works pretty well.

    First, a copy of the copyTarget is made so that allowing the user to
    copy multiple times is a bit easier on our end (we can just throw
    away the copy of the copyTarget). The contents of the introduction
    and each ContentSection is then rendered and attached to the
    copyTarget.

    After this, a dummy TextArea HTML Element is temporarily created with
    style that effectively hides it from view. This allows us to paste
    the outerHTML of the copyTarget in an element which allows for
    focusing and selecting, allowing us to copy the code to the
    clipboard. The TextArea is then removed.
    */
    var copyTarget = this.$copyTarget.cloneNode(true);
    var contentCtn = copyTarget.querySelector('#copyTarget-contentSectionsCtn');
    var introCtn = copyTarget.querySelector('#copyTarget-introCtn');
    var bottomBtns = copyTarget.querySelector('#copyTarget-bottomBtns');

    introCtn.append(this.introduction.renderFinal());
    for (let contentSection of this.contentSections) {
      var sec = contentSection.renderFinal();
      contentCtn.insertBefore(sec, bottomBtns);
    }
    this.copyPopout.fillTextarea(copyTarget.outerHTML);
    this.copyPopout.displayAtElement($displayEl, false);
    this.copyPopout.copyContent();
  },
};

var Controller = {
  /* The controller/menu for controlling broad functions of the web app.

  The Controller contains several buttons which allow the user to operate
  on the generator itself. See below:

  Attributes:
    $copyCodeBtn (HTML Element): The button which allows users to copy
      the generated code to the clipboard.
    $addSectionBtn (HTML Element): The button which allows user to add a
      ContentSection to the EmailGenerator.
    $startOverBtn (HTML Element): Refreshes the page to discard all
      changes.
  */
  init: function() {
    this.$copyCodeBtn = document.getElementById('copyCodeBtn');
    this.$addSectionBtn = document.getElementById('addSectionBtn');
    this.$startOverBtn = document.getElementById('startoverBtn');

    this.$copyCodeBtn.addEventListener('click', this.copyCodeHandler.bind(this));
    this.$addSectionBtn.addEventListener('click', this.addSectionHandler.bind(this));
    this.$startOverBtn.addEventListener('click', this.startOverHandler.bind(this));
  },

  copyCodeHandler: function(e) {
    // click handler to copy code.
    e.preventDefault();
    // stop propogation to prevent automatically closing the Popout
    e.stopPropagation();
    EmailGenerator.copyToClipboard(e.target);
  },
  addSectionHandler: function(e) {
    // click handler to add a ContentSection.
    e.preventDefault();
    EmailGenerator.generateSection();
  },
  startOverHandler: function(e) {
    // click handler to refresh the page and start over.
    e.preventDefault();
    location.reload();
  }
};

document.addEventListener('DOMContentLoaded', function(e) {
  // Prep the web app when the page has loaded.
  EmailGenerator.init();
  PopoutEditor.init();
  Controller.init();
});
})();
