export const loginValidate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  //   Password validation
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

export const registerValidate = (values) => {
  const errors = {};
  // FullName validation
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 8) {
    errors.name = "Enter Your Full Name";
  }

  // Email validation
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  //   Password validation
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password Must be greater than 8 characters long";
  }
  // Confirm password validation
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password not matched";
  }
  // All fields required validation
  if (!values.name || !values.email || !values.password || !values.cpassword) {
    errors.allFields = "All fields are required";
  }
  return errors;
};

export const updateValidate = (values) => {
  const errors = {};

  // Check if the name field is not empty before applying validation
  if (values.name.trim() !== "" && values.name.length < 8) {
    errors.name = "Enter Your Full Name";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (values.newPassword.length < 8) {
    errors.newPassword = "Password Must be greater than 8 characters long";
  }

  return errors;
};
