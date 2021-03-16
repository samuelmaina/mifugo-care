export const AssertAndValidateLogin = (data) => {
  if (data.password === '' || data.email === '') {
    return 'null fields';
  }
  return credentialsMeetConstraints(data);
};

export const AssertAndValidateSignup = (data) => {
  if (data.fullName === '' || data.email === '' || data.password === '') {
    return 'key in all the fields';
  }
  return credentialsMeetConstraints(data);
};

const credentialsMeetConstraints = (data) => {
  if (!checkPasswordValid(data.password)) {
    return 'invalid password';
  }
  if (!checkEmailValid(data.email)) {
    return 'invalid email';
  }
  return 'valid';
};

const checkPasswordValid = (pass) => {
  var regE = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  return regE.test(pass);
};

const checkEmailValid = (email) => {
  var regE = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regE.test(email);
};
