const fullnameEl = document.querySelector('#fullname');
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone');
const birthdayEl = document.querySelector('#birthday');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm');
const fullnameError = document.querySelector('#fullname-error');
const emailError = document.querySelector('#email-error');
const phoneError = document.querySelector('#phone-error');
const birthdayError = document.querySelector('#birthday-error');
const passwordError = document.querySelector('#password-error');
const confirmError = document.querySelector('#confirm-error');
const addBtn = document.querySelector('#add');
const resetBtn = document.querySelector('#clear');
const checkUsername = (elementFullname) => {
  let valid = false;
  const regexFullName =
    /[\[\]\:\'\"\:\{\}\`\;\|\<\>\.\?\,\!\@\#\$\%\^\&\*\(\)\/\\\~\-\_\+\=\d]+/g;
  const min = 3;
  const max = 25;
  const fullname = elementFullname.value.trim();
  if (!isRequired(fullname)) {
    showError(elementFullname, 'Full name cannot be blank.');
  } else if (checkRegex(regexFullName, fullname)) {
    showError(elementFullname, 'Full name is not valid');
  } else if (!isBetween(fullname.length, min, max)) {
    showError(elementFullname, 'Full name must be between 3 and 25 chacracter');
  } else {
    const fullnameFormat = fullname
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');
    elementFullname.value = fullnameFormat;
    valid = true;
    showSuccess(elementFullname);
  }
  return valid;
};
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
  const phoneFormat = phone
    .split('-')
    .join('');
  if (!isRequired(phone)) {
    showError(elementPhone, 'Phone cannot be blank.');
  } else if (!checkRegex(regexPhone, phoneFormat)) {
    showError(elementPhone, 'Phone is not valid.');
  } else {
    valid = true;
    showSuccess(elementPhone);
  }
  return valid;
};
const checkBirth = (elementBirthday) => {
  let valid = false;
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (!isRequired(elementBirthday.value)) {
    showError(elementBirthday, 'Birthday cannot be blank');
  } else {
    const birthdaySplit = elementBirthday.value.split('-');
    const dateVal = parseInt(birthdaySplit[2]);
    const mmVal = parseInt(birthdaySplit[1]);
    const yyyyVal = parseInt(birthdaySplit[0]);
    if ((dateVal >= dd && mmVal >= mm && yyyyVal >= yyyy) || yyyyVal > yyyy) {
      showError(
        elementBirthday,
        `Your date of birth must be less than the current date: ${today}`,
      );
      valid = false;
    } else {
      valid = true;
      showSuccess(elementBirthday);
    }
    return valid;
  }
};
const checkPassword = (elementPassword) => {
  let valid = false;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const password = elementPassword.value.trim();
  if (!isRequired(password)) {
    showError(elementPassword, 'Password cannot be blank.');
  } else if (!isBetween(password.length, 8, 30)) {
    showError(elementPassword, 'Full name must be between 8 and 30 chacracter');
  } else if (!checkRegex(regexPassword, password)) {
    showError(
      elementPassword,
      'Password must has at least 8 characters: 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character',
    );
  } else {
    showSuccess(elementPassword);
    valid = true;
  }
  return valid;
};
const checkConfirmPassword = (elementPassword, elementConfirm) => {
  let valid = false;
  const confirmPassword = elementConfirm.value.trim();
  const password = elementPassword.value.trim();
  if (!isRequired(confirmPassword)) {
    showError(elementConfirm, 'Please enter the password again');
  } else if (password !== confirmPassword) {
    showError(elementConfirm, 'The password does not match');
  } else {
    showSuccess(elementConfirm);
    valid = true;
  }
  return valid;
};
const checkRegex = (regex, value) => regex.test(value);
const isRequired = (value) => (value === '' ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;
const showError = (input, message) => {
  const parent = input.parentElement;
  const errorEl = parent.querySelector('.form-error');
  const inputEl = parent.querySelector('input');
  inputEl.classList.add('invalid');
  errorEl.innerText = message;
};
const showSuccess = (input) => {
  const parent = input.parentElement;
  const errorEl = parent.querySelector('.form-error');
  const inputEl = parent.querySelector('input');
  inputEl.classList.remove('invalid');
  errorEl.innerText = '';
};
const addImage = document.querySelector('.file-upload');
const avatar = document.querySelector('#profile-pic');
addImage.onchange = (e) => {
  const files = e.target.files;
  const file = files[0];
  const fileType = file['type'];
  const imageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  if (!imageTypes.includes(fileType)) {
    alert("Choose a picture");
    return;
  }
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    const url = fileReader.result;
    avatar.setAttribute('src', url);
  };
};
emailEl.onblur = () => {
  checkEmail(emailEl);
};
phoneEl.onblur = () => {
  checkPhone(phoneEl);
};
birthdayEl.onblur = () => {
  checkBirth(birthdayEl);
};
passwordEl.onblur = () => {
  checkPassword(passwordEl);
};
confirmPasswordEl.onblur = () => {
  checkConfirmPassword(passwordEl, confirmPasswordEl);
};
addBtn.addEventListener('click', function() {
  add();
});
resetBtn.addEventListener('click', function() {
  reset();
});
const add = () => {
  let isValid = false;
  isValid = checkAll();
  if (isValid) {
    showResult();
  }
};
document.onkeyup = (e) => {
  const shiftBtn = 16;
  const deleteBtn = 46;
  if (e.keyCode == shiftBtn) add(e);
  if (e.keyCode == deleteBtn) reset();
};
const reset = () => {
  resetError();
  avatar.setAttribute('src', 'avatar.png');
};
const checkAll = () => {
  checkUsername(fullnameEl);
  checkEmail(emailEl);
  checkPhone(phoneEl);
  checkBirth(birthdayEl);
  checkPassword(passwordEl);
  checkConfirmPassword(passwordEl, confirmPasswordEl);
  return (
    checkUsername(fullnameEl) &&
    checkEmail(emailEl) &&
    checkPhone(phoneEl) &&
    checkBirth(birthdayEl) &&
    checkPassword(passwordEl) &&
    checkConfirmPassword(passwordEl, confirmPasswordEl)
  );
};
const resetError = () => {
  fullnameEl.classList.remove('invalid');
  emailEl.classList.remove('invalid');
  phoneEl.classList.remove('invalid');
  birthdayEl.classList.remove('invalid');
  passwordEl.classList.remove('invalid');
  confirmPasswordEl.classList.remove('invalid');
  fullnameError.innerText = '';
  emailError.innerText = '';
  phoneError.innerText = '';
  birthdayError.innerText = '';
  passwordError.innerText = '';
  confirmError.innerText = '';
};
const showResult = () => {
  const fullname = document.querySelector('#fullname').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  const birthday = document.querySelector('#birthday').value;
  const avartar = document.querySelector('#profile-pic').getAttribute('src');
  const fullnameResult = document.querySelector('#fullnameResult');
  const emailResult = document.querySelector('#emailResult');
  const phoneResult = document.querySelector('#phoneResult');
  const birthdayResult = document.querySelector('#birthdayResult');
  const avartarReslt = document.querySelector('#avartarResult');
  const birthdayInput= birthday.split('-');
  fullnameResult.innerText = fullname;
  emailResult.innerText = email;
  phoneResult.innerText = phone;
  birthdayResult.innerText = birthdayInput[2]+'/'+birthdayInput[1]+'/'+ birthdayInput[0];
  avartarReslt.src = avartar;
};
