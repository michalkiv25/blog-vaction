export const validate = (val) => {
  let errorMessage = '';

  if (val.name.trim().length <= 1) {
    errorMessage += 'Name is required. ';
  }

  if (val.email.trim().length <= 1) {
    errorMessage += 'Email is required. ';
  } else if (!isValidEmail(val.email)) {
    errorMessage += 'Email is not valid. ';
  }

  if (val.number.trim().length <= 1) {
    errorMessage += 'Number is required. ';
  }

  if (val.message.trim().length <= 5) {
    errorMessage += 'Message should be at least 5 characters long. ';
  }

  return errorMessage.trim();
};


// Function to check if an email is valid
const isValidEmail = (email) => {
  // You can use a regular expression to validate the email format
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};