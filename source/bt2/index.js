const listItem = document.querySelector('#selectInput');
listItem.onchange = () => {
  higthLight(listItem.value);
};
const higthLight = (value) => {
  const listItem = document.getElementsByTagName('li');
  if (value >= 0 || value <= 6) {
    for (i = 0; i < listItem.length; i++) {
      if (value - 1 == i) listItem[i].style.background = 'yellow';
      else listItem[i].style.background = 'none';
    }
  } else if (value == 'odd') {
    for (i = 0; i < listItem.length; i++) {
      if (i % 2 == 1) listItem[i].style.background = 'yellow';
      else listItem[i].style.background = 'none';
    }
  } else if (value == 'even') {
    for (i = 0; i < listItem.length; i++) {
      if (i % 2 == 0) listItem[i].style.background = 'yellow';
      else listItem[i].style.background = 'none';
    }
  } else if (value == 'reset') {
    for (i = 0; i < listItem.length; i++) {
      listItem[i].style.background = 'none';
    }
  } else return;
};
