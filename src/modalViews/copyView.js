import { generateElement } from '../lib.js';

const CopyView = {
  $ctn: generateElement('div'),
  $heading: generateElement('h1', { textContent: 'Copy Your Email' }),
  $description: generateElement('p'),
  $textarea: generateElement(
    'textarea',
    {
      style: {
        width: '35rem',
        height: '10rem',
        resize: 'vertical',
      },
    },
  ),
  /**
   * init - Initialize the copy view. The copy view displays a text box filled
   *  with the content of the email editor.
   *
   * @param {Modal} modal The Modal in which the CopyView will be displayed.
   *
   * @returns {CopyView} Returns this view.
   */
  init(modal) {
    this.modal = modal;
    this.$description.textContent = 'Copy the code for your email below.';

    this.$ctn.appendChild(this.$heading);
    this.$ctn.appendChild(this.$description);
    this.$ctn.appendChild(this.$textarea);
    return this;
  },

  /**
   * fillText - Fill the view with the text to be copied.
   *
   * @param {string} text The text to be copied.
   *
   */
  fillText(text) {
    this.$textarea.value = text;
    return this.$textarea;
  },

  /**
   * copyContents - Copy the contents of the copy view.
   *
   * @returns {string} Returns the copied content.
   */
  copyContents() {
    this.$textarea.focus();
    this.$textarea.select();
    let successful;
    try {
      successful = document.execCommand('copy');
    } catch (exc) {
      successful = false;
    }
    if (successful) {
      this.$heading.textContent = 'Email Content Copied!';
      this.$description.textContent = 'You can now paste the email content into GRS.';
    } else {
      this.$heading.textContent = 'Uh oh...';
      this.$description.textContent = "We couldn't copy the email content. Try again or manually copy the content below";
    }
    return successful;
  },

  /**
   * display - Displays the view, utilizing the modal.
   *
   * @returns {Element} Returns the modal containing this view.
   */
  display() {
    this.modal.setSaveHandler('Copy', this.copyContents.bind(this));
    return this.modal.display(this.$ctn);
  },

  /**
   * displayAndCopy - This function fills, copies, and displays the copyView in
   *  one fell swoop.
   *
   * @param {string} content The content to be displayed/copied.
   *
   * @returns {boolean} Returns true if successfully copied. Else returns false.
   */
  displayAndCopy(content) {
    this.fillText(content);
    this.display();
    return this.copyContents();
  },
};

export default CopyView;
