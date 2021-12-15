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
const form = document.querySelector('#form');
const regexFullName =
  /[\[\]\:\'\"\:\{\}\`\;\|\<\>\.\?\,\!\@\#\$\%\^\&\*\(\)\/\\\~\-\_\+\=\d]+/g;
const regexEmail = /^([\w]*[\w\.]*(?!\.)@gmail.com)/;
const regexPhone = /^[0][0-9]{2}[0-9]{3}[0-9]{4}$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const checkUsername = () => {
  let valid = false;
  const min = 3;
  const max = 25;
  const fullname = fullnameEl.value.trim();
  if (!isRequired(fullname)) {
    showError(fullnameEl, 'Full name cannot be blank.');
  } else if (checkRegex(regexFullName, fullname)) {
    showError(fullnameEl, 'Full name is not valid');
  } else if (!isBetween(fullname.length, min, max)) {
    showError(fullnameEl, 'Full name must be between 3 and 25 chacracter');
  } else {
    const fullnameFormat = fullname
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');
    fullnameEl.value = fullnameFormat;
    valid = true;
    showSuccess(fullnameEl);
  }
  return valid;
};
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!checkRegex(regexEmail, email)) {
    showError(emailEl, 'Email cannot be blank.');
  } else if (!isEmailValid(email)) {
    showError(emailEl, 'Email is not valid.');
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};
const checkPhone = () => {
  let valid = false;
  const phone = phoneEl.value.trim();
  if (!isRequired(phone)) {
    showError(phoneEl, 'Phone cannot be blank.');
  } else if (!checkRegex(regexPhone, phone)) {
    showError(phoneEl, 'Phone is not valid.');
  } else {
    valid = true;
    showSuccess(phoneEl);
  }
  return valid;
};
const checkBirth = () => {
  let valid = false;
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (!isRequired(birthdayEl.value)) {
    showError(birthdayEl, 'Birthday cannot be blank');
  } else {
    const birthdaySplit = birthdayEl.value.split('-');
    const dateVal = parseInt(birthdaySplit[2]);
    const mmVal = parseInt(birthdaySplit[1]);
    const yyyyVal = parseInt(birthdaySplit[0]);
    if ((dateVal >= dd && mmVal >= mm && yyyyVal >= yyyy) || yyyyVal > yyyy) {
      showError(
        birthdayEl,
        `Your date of birth must be less than the current date: ${today}`,
      );
      valid = false;
    } else {
      valid = true;
      showSuccess(birthdayEl);
    }
    return valid;
  }
};
const checkPassword = () => {
  let valid = false;
  const password = passwordEl.value.trim();
  if (!isRequired(password)) {
    showError(passwordEl, 'Password cannot be blank.');
  } else if (!checkRegex(regexPassword, password)) {
    showError(
      passwordEl,
      'Password must has at least 8 characters: 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)',
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }
  return valid;
};
const checkConfirmPassword = () => {
  let valid = false;
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();
  if (!checkPassword()) {
    valid = false;
    return valid;
  } else if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, 'Please enter the password again');
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, 'The password does not match');
  } else {
    showSuccess(confirmPasswordEl);
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
const addImg = document.querySelector('.file-upload');
const avatar = document.querySelector('#profile-pic');
addImg.onchange = (e) => {
  const files = e.target.files;
  const file = files[0];
  const fileReader = new FileReader();
  console.log(fileReader);
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    const url = fileReader.result;
    avatar.setAttribute('src', url);
  };
};
fullnameEl.addEventListener('blur', checkUsername);
emailEl.addEventListener('blur', checkEmail);
phoneEl.addEventListener('blur', checkPhone);
birthdayEl.addEventListener('blur', checkBirth);
passwordEl.addEventListener('blur', checkPassword);
confirmPasswordEl.addEventListener('blur', checkConfirmPassword);
form.addEventListener('submit', function(e) {
  add(e);
});
form.addEventListener('reset', function(e) {
  reset();
});
const add = (e) => {
  e.preventDefault();
  const fullname = document.querySelector('#fullname').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  const birthday = document.querySelector('#birthday').value;
  const avartar = document.querySelector('#profile-pic').getAttribute('src');
  let isValid = false;
  isValid = checkAll();
  if (isValid) {
    showResult(fullname, email, phone, birthday, avartar);
  }
};
document.onkeyup = (e) => {
  if (e.keyCode == 16) add(e);
  if (e.keyCode == 46) reset();
};
const reset = () => {
  resetError();
  avatar.setAttribute('src', 'avatar.png');
};
const checkAll = () => {
  checkUsername();
  checkEmail();
  checkPhone();
  checkBirth();
  checkPassword();
  checkConfirmPassword();
  return (
    checkUsername() &&
    checkEmail() &&
    checkPhone() &&
    checkBirth() &&
    checkPassword() &&
    checkConfirmPassword()
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
const showResult = (fullname, email, phone, birthday, avartar) => {
  const fullnameResult = document.querySelector('#fullnameResult');
  const emailResult = document.querySelector('#emailResult');
  const phoneResult = document.querySelector('#phoneResult');
  const birthdayResult = document.querySelector('#birthdayResult');
  const avartarReslt = document.querySelector('#avartarResult');
  fullnameResult.innerText = fullname;
  emailResult.innerText = email;
  phoneResult.innerText = phone;
  birthdayResult.innerText = birthday;
  avartarReslt.src = avartar;
};
