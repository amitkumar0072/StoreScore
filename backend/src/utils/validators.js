exports.validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

exports.validatePassword = (password) => {
  // 8–16 chars, 1 uppercase, 1 special char
  const regex = /^(?=.*[A-Z])(?=.*[\W]).{8,16}$/;
  return regex.test(password);
};

exports.validateName = (name) => {
  return name.length >= 20 && name.length <= 60;
};
