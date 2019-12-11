export const VALIDATION_COMPANY_NAME_MINIMUM = 3;
export const VALIDATION_COMPANY_NAME_MAXIMUM = 100;

export const VALIDATION_EMAIL_MINIMUM = 3;
export const VALIDATION_EMAIL_MAXIMUM = 100;
export const VALIDATION_EMAIL_FORMAT
 = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const VALIDATION_FIRST_NAME_MINIMUM = 1;
export const VALIDATION_FIRST_NAME_MAXIMUM = 100;

export const VALIDATION_LAST_NAME_MINIMUM = 1;
export const VALIDATION_LAST_NAME_MAXIMUM = 100;

export const VALIDATION_PASSWORD_MINIMUM = 6;
export const VALIDATION_PASSWORD_MAXIMUM = 20;
export const VALIDATION_PASSWORD_FORMAT
 = /^(?=.*\d)(?=.*[a-z!@#$%^&*(),.?":{}|<>)\(+=._-])[0-9a-zA-Z!@#$%^&*(),.?":{}|<>)\(+=._-~]{0,}$/;

export const validateErrorMessage = {
  'company-name/required': 'Company Name is required',
  'company-name/maximum-characters': `Maximum ${VALIDATION_COMPANY_NAME_MAXIMUM} characters allowed`,
  'company-name/minimum-characters': `Minimum ${VALIDATION_COMPANY_NAME_MINIMUM} characters allowed`,

  'password/required': 'Password is required',
  'password/maximum-characters': 'Password does not meet requirements',
  'password/minimum-characters': 'Password does not meet requirements',
  'password/incorrect-format': 'Password does not meet requirements',
  'password/help-text': `Password must be 6 - 20 characters in length and contain both letters and numbers.
   Passwords may contain special characters, but may not contain spaces.`,
  'new-password/required': 'New Password is required',

  'confirm-password/required': 'Confirm Password is required',
  'confirm-password/matched': 'Passwords do not match',

  'email/required': 'Email is required',
  'email/incorrect-format': 'Incorrect email format. Please try again',
  'email/maximum-characters': `Maximum ${VALIDATION_EMAIL_MAXIMUM} characters allowed`,
  'email/minimum-characters': `Minimum ${VALIDATION_EMAIL_MINIMUM} characters allowed`,
  'email/existed':
    'Sorry, the email is being used by a user. Please try another email',

  'first-name/required': 'First Name is required',
  'first-name/maximum-characters': `Maximum ${VALIDATION_FIRST_NAME_MAXIMUM} characters allowed`,
  'first-name/minimum-characters': `Minimum ${VALIDATION_FIRST_NAME_MINIMUM} characters allowed`,

  'last-name/required': 'Last Name is required',
  'last-name/maximum-characters': `Maximum ${VALIDATION_LAST_NAME_MAXIMUM} characters allowed`,
  'last-name/minimum-characters': `Minimum ${VALIDATION_LAST_NAME_MINIMUM} characters allowed`,

  'phone-number/required': 'Phone Number is required',
  'phone-number/incorrect-format': 'Incorrect email format. Please try again',

  'code/required': 'Verification code is required'
};

export const validateErrorFormMessage = {
  'login/type': 'UserNotFoundException',
  'login/message': `The Under account doesn't exist. Please enter a different account`,

  'login/type/password': 'NotAuthorizedException',
  'login/password/message': `Password is incorrect. Please try again`,

  'register/type': 'already_exists',
  'register/message': `The Under account is already exists`,

  'another/message': 'Something went wrong!'
};
