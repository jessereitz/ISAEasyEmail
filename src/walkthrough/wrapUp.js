import { generateStandardButton } from '../lib';

export default function wrapUp() {
  const closeBtn = generateStandardButton('Exit Tutorial');
  closeBtn.addEventListener('click', this.hide.bind(this));
  this.$window.innerHTML = `
    <h1>And That's It!</h1>
    <p>
      Hopefully this tutorial has given you a bit of insight into how to
      effectively use ISA Easy Email. I encourage you to play around with the
      editor and explore all its functionality! You should also read the "GRS
      Help" and "Images Help" in the Help section so you can take full advantage
      of ISA Easy Email!
    </p>
  `;
  this.$window.appendChild(closeBtn);
  this.centerWindow();
}
