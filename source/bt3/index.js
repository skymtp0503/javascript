const btnBold1 = document.getElementById('btn-bold-1');
const btnBold2 = document.getElementById('btn-bold-2');
const btnItalic1 = document.getElementById('btn-italic-1');
const btnItalic2 = document.getElementById('btn-italic-2');
const btnReset1 = document.getElementById('btn-reset-1');
const btnReset2 = document.getElementById('btn-reset-2');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');
const send1 = () => {
  if (msg1.value != '') {
    const boxChat1 = document.getElementById('boxchat1');
    const boxChat2 = document.getElementById('boxchat2');
    const bold = msg1.style.fontWeight;
    const italic = msg1.style.fontStyle;
    const divElement1 = document.createElement('div');
    const divElement2 = document.createElement('div');
    divElement1.classList.add('msg1');
    divElement2.classList.add('msg2');
    divElement1.style.fontWeight=bold;
    divElement1.style.fontStyle=italic;
    divElement2.style.fontWeight=bold;
    divElement2.style.fontStyle=italic;

    divElement1.innerHTML = '<div class="left">' + msg1.value + '</div>';
    divElement2.innerHTML = '<div class="right">' + msg1.value + '</div>';
    boxChat1.append(divElement1);
    boxChat2.append(divElement2);
    msg1.value = '';
  }
};
const send2 = () => {
  if (msg2.value != '') {
    const boxChat1 = document.getElementById('boxchat1');
    const boxChat2 = document.getElementById('boxchat2');
    const bold = msg2.style.fontWeight;
    const italic = msg2.style.fontStyle;
    const divElement1 = document.createElement('div');
    const divElement2 = document.createElement('div');
    divElement2.classList.add('msg1');
    divElement1.classList.add('msg2');
    divElement1.style.fontWeight=bold;
    divElement1.style.fontStyle=italic;
    divElement2.style.fontWeight=bold;
    divElement2.style.fontStyle=italic;
    divElement1.innerHTML = '<div class="right">' + msg2.value + '</div>';
    divElement2.innerHTML = '<div class="left">' + msg2.value + '</div>';
    boxChat1.append(divElement1);
    boxChat2.append(divElement2);
    msg2.value = '';
  }
};
btnBold1.onclick = () => {
  boldText(btnBold1, msg1);
};
btnBold2.onclick = () => {
  boldText(btnBold2, msg2);
};
btnItalic1.onclick = () => {
  activeText(btnItalic1, msg1);
};
btnItalic2.onclick = () => {
  activeText(btnItalic2, msg2);
};
btnReset1.onclick = () => {
  resetText(btnBold1, btnItalic1, msg1);
};
btnReset2.onclick = () => {
  resetText(btnBold2, btnItalic2, msg2);
};
const boldText = (btnActive, message) => {
  const bold = message.style.fontWeight;
  if (bold === 'bold') {
    message.style.fontWeight = 'unset';
    btnActive.classList.remove('active');
  } else {
    message.style.fontWeight = 'bold';
    btnActive.classList.add('active');
  }
};
const activeText = (btnActive, message) => {
  const italic = message.style.fontStyle;
  if (italic === 'italic') {
    message.style.fontStyle = 'unset';
    btnActive.classList.remove('active');
  } else {
    message.style.fontStyle = 'italic';
    btnActive.classList.add('active');
  }
};
const resetText = (btnBold, btnItalic, message) => {
  message.style.fontWeight = 'unset';
  message.style.fontStyle = 'unset';
  btnBold.classList.remove('active');
  btnItalic.classList.remove('active');
};
document.getElementById('send1').addEventListener('click', send1);
document.getElementById('send2').addEventListener('click', send2);
