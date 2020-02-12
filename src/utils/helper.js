export function validateLogin({ username, password }) {
  const errors = {};

  if (!username.trim()) {
    errors.username = 'This field is required';
  }

  if (!password.trim()) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

export function validateBusiness({
  name,
  description,
  email,
  category
}) {
  const errors = {};

  if (name && !name.trim()) {
    errors.name = 'This field is required';
  }

  if (description && !description.trim()) {
    errors.description = 'This field is required';
  }

  if (email && !email.trim()) {
    errors.email = 'This field is required';
  }

  if (!category.length) {
    errors.category = 'This field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
