// import { generateStandardButton } from '../lib';

function type(target, string) {
  const targetHTML = target;
  const baseDelay = 300;
  let delay = baseDelay;
  return new Promise((resolve, reject) => {
    if (!(targetHTML instanceof Element)) reject(Error('Given target is not HTML'));
    if (typeof string !== 'string') reject(Error('Given string is not a string'));
    targetHTML.textContent = '';
    string.split('').forEach((char, index, arr) => {
      setTimeout(() => {
        targetHTML.textContent += char;
        if (index === arr.length - 1) {
          setTimeout(() => resolve(targetHTML.textContent), baseDelay);
        }
      }, delay);
      delay += 100;
    });
  });
}

function getEditButtons() {
  return {
    bold: document.querySelector('[title="Bold Selection"]'),
    italic: document.querySelector('[title="Italicize Selection"]'),
    heading: document.querySelector('[title="Wrap Selection with Heading"]'),
    link: document.querySelector('[title="Wrap Selection with Link"]'),
  };
}

function getInsertButtons() {
  return {
    image: document.querySelector('[title="Insert an Image"]'),
    line: document.querySelector('[title="Insert a Horizontal Rule"]'),
  };
}

const introHTML = `
  <p>The editor is where you can do stuff.</p>
`;

export default function editorOverview() {
  const editor = document.getElementById('wfeditor');
  const editBtns = getEditButtons();
  const insertBtns = getInsertButtons();
  const firstEditorPar = editor.querySelector('.wf__text-section');
  this.highlight(editor);
  this.positionWindow(editor);
  this.$window.innerHTML = introHTML;
  const text = 'Testing this out.';
  type(firstEditorPar, text).then(() => {
    this.$window.textContent = 'cool, it worked';
  });
  // prom.then(() => {
  // });
  const sel = window.getSelection();
  const newRange = document.createRange();
  // newRange.selectNodeContents(firstEditorPar);
  sel.removeAllRanges();
  sel.addRange(newRange);
  // this.nextStep();
}
