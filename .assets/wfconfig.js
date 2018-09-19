const containerStyle = {
  // margin: '20px',
  'box-sizing': 'border-box',
  padding: '20px',
  width: '600px',
  outline: 'none',
};

const largeHeadingStyle = {
  'font-family': "'Helvetica', sans-serif",
  'font-weight': 'normal',
  'font-size': '32px',
  color: '#333',
}

const smallHeadingStyle = {
  'font-family': "'Helvetica', sans-serif",
  'font-weight': 'normal',
  'font-size': '24px',
  color: '#888',
  'margin-top': '0',
}

const imgStyle = {
  'max-width': '100%',
  'text-align': 'center',
  'margin-left': 'auto',
  'margin-right': 'auto'
}

const sectionStyle = {
  width: '100%',
  overflow: 'hidden',
  'box-sizing': 'border-box',
  'font-family': 'Times',
  'font-size': '20px',

}

// const linkStyle = {
//   display: 'block'
// }


const options = {
  divOrPar: 'p',
  containerStyle,
  largeHeadingStyle,
  smallHeadingStyle,
  imgStyle,
  sectionStyle,
};

document.addEventListener('DOMContentLoaded', (e) => {
  let wfeditor = document.getElementById('wfeditor');
  wfeditor = WriteFree(wfeditor, options);
});