const addRow = () => {
  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  checkPhone(phone);
  checkEmail(email);
  if (isRequired(name.value) && checkPhone(phone) && checkEmail(email)) {
    const tb = document.getElementById('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML =
      '<td><input class="checkbox"type="checkbox" value="" /></td>' +
      '<td onclick="enabledInput(this)"><input class="name" type="text" value="' +
      name.value +
      '"  onblur="disabledInput(this)" disabled/></td>' +
      '<td onclick="enabledInput(this)"><input type="text" value="' +
      phone.value +
      '" onblur="disabledInput(this)" disabled/></td>' +
      '<td onclick="enabledInput(this)"><input type="text" value="' +
      email.value +
      '" onblur="disabledInput(this)" disabled/></td>' +
      '<td><input type="button" value="Deleted" onclick="deleted(this)"/></td>';
    tb.append(tr);
    reset();
  }
};
const isRequired = (value) => (value === '' ? false : true);
const checkRegex = (regex, value) => regex.test(value);
const checkEmail = (elementEmail) => {
  let valid = false;
  const regexMail =
    /^([a-z]|[A-Z]|[0-9])+((\.?)([a-z]|[A-Z]|[0-9])+)*\@([a-z]|[A-Z]|[0-9])+(\.([a-z]|[A-Z]|[0-9])+)*$/g;
  const email = elementEmail.value.trim();
  if (!isRequired(email)) {
    showError(elementEmail, 'Email cannot be blank.');
  } else if (!checkRegex(regexMail, email)) {
    showError(elementEmail, 'Email is not valid.');
  } else {
    showSuccess(elementEmail);
    valid = true;
  }
  return valid;
};
const checkPhone = (elementPhone) => {
  let valid = false;
  const regexPhone = /^[0][0-9]{2}[0-9]{3}[0-9]{4}$/;
  const phone = elementPhone.value.trim();
  if (!isRequired(phone)) {
    showError(elementPhone, 'Phone cannot be blank.');
  } else if (!checkRegex(regexPhone, phone)) {
    showError(elementPhone, 'Phone is not valid.');
  } else {
    valid = true;
    showSuccess(elementPhone);
  }
  return valid;
};
const showError = (input, message) => {
  const parent = input.parentElement;
  const errorEl = parent.querySelector('.error');
  const inputEl = parent.querySelector('input');
  inputEl.classList.add('invalid');
  errorEl.innerText = message;
};
const showSuccess = (input) => {
  const parent = input.parentElement;
  const errorEl = parent.querySelector('.error');
  const inputEl = parent.querySelector('input');
  inputEl.classList.remove('invalid');
  errorEl.innerText = '';
};
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
  const checkboxs = document.getElementsByClassName('checkbox');
  for (let i = 0; i < checkboxs.length; i++) {
    if (checkboxs[i].type == 'checkbox' && checkboxs[i].checked == true) {
      deleted(checkboxs[i]);
      i--;
    }
  }
};
const check = document.getElementById('table');
check.ondbclick = (e) => {
  disabledInput(e);
  enabledInput(e);
};
const checkbox = document.getElementById('checkbox');
checkbox.onclick = () => {
  const checkboxs = document.getElementsByClassName('checkbox');
  if (checkbox.checked == true) {
    for (let i = 0; i < checkboxs.length; i++) {
      checkboxs[i].checked = true;
    }
  } else {
    for (let i = 0; i < checkboxs.length; i++) {
      checkboxs[i].checked = false;
    }
  }
};
document.getElementById('add').addEventListener('click', addRow);
document.getElementById('deleted').addEventListener('click', deletedOption);
