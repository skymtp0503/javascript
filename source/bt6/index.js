const addRow = () => {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  if (!checkNull(name) && !checkNull(phone) && !checkNull(email)) {
    const tb = document.getElementById('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML =
      '<td><input type="checkbox" value="" /></td>' +
      '<td ondblclick="enabledInput(this)"><input class="name" type="text" value="' +
      name +
      '"  onblur="disabledInput(this)" disabled/></td>' +
      '<td ondblclick="enabledInput(this)"><input type="text" value="' +
      phone +
      '" onblur="disabledInput(this)" disabled/></td>' +
      '<td ondblclick="enabledInput(this)"><input type="text" value="' +
      email +
      '" onblur="disabledInput(this)" disabled/></td>' +
      '<td><input type="button" value="Deleted" onclick="deleted(this)"/></td>';
    tb.append(tr);
    reset();
  }
};
const checkNull = (value) => (value === '' ? true : false);
const reset = () => {
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
};
const disabledInput = (element) => {
  element.disabled = true;
};
const enabledInput = (element) => {
  element.firstChild.disabled = false;
};
const deleted = (element) => {
  element.parentNode.parentNode.remove();
};
const deletedOption = () => {
  checkboxs = document.getElementsByTagName('input');
  for (let i = 0; i < checkboxs.length; i++) {
    if (checkboxs[i].type == 'checkbox' && checkboxs[i].checked == true) {
      deleted(checkboxs[i]);
      i--;
    }
  }
};
const checkbox = document.getElementById('checkbox');
checkbox.onclick = (e) => {
  disabledInput(e);
  enabledInput(e);
};
document.getElementById('add').addEventListener('click', addRow);
document.getElementById('deleted').addEventListener('click', deletedOption);
