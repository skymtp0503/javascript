const listItem = document.querySelector('#selectInput');
listItem.onchange = () => {
  higthLight(listItem.value);
};
const higthLight = (value) => {
  const listItem = document.getElementsByTagName('li');
  for (i = 0; i < listItem.length; i++) {
    if (value > 0 || value <= 6) {
      if (value - 1 == i) listItem[i].style.background = 'yellow';
      else listItem[i].style.background = 'none';
    } else if (value == 'odd') {
      if (i % 2 == 1) listItem[i].style.background = 'yellow';
      else listItem[i].style.background = 'none';
    } else if (value == 'even') {
      if (i % 2 == 0) listItem[i].style.background = 'yellow';
      else listItem[i].style.background = 'none';
    } else if (value == 'even') {
      if (i % 2 == 0) listItem[i].style.background = 'yellow';
      else listItem[i].style.background = 'none';
    } else if (value == 'reset') {
      listItem[i].style.background = 'none';
    }
  }
};

