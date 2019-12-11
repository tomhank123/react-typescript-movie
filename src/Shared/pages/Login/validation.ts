import * as yup from 'yup';
import {
  validateErrorMessage,
  VALIDATION_PASSWORD_FORMAT,
  VALIDATION_EMAIL_MAXIMUM,
  VALIDATION_EMAIL_MINIMUM,
  VALIDATION_PASSWORD_MINIMUM,
  VALIDATION_PASSWORD_MAXIMUM
} from 'Shared/constants/validateErrorMessage';

export const validationSchema = yup.object({
  email: yup
    .string()
    .email(validateErrorMessage['email/incorrect-format'])
    .min(VALIDATION_EMAIL_MINIMUM, validateErrorMessage['first-name/minimum-characters'])
    .max(VALIDATION_EMAIL_MAXIMUM, validateErrorMessage['email/maximum-characters'])
    .required(validateErrorMessage['email/required']),
  password: yup
    .string()
    .min(VALIDATION_PASSWORD_MINIMUM, validateErrorMessage['password/minimum-characters'])
    .max(VALIDATION_PASSWORD_MAXIMUM, validateErrorMessage['password/maximum-characters'])
    .matches(VALIDATION_PASSWORD_FORMAT, validateErrorMessage['password/incorrect-format'])
    .required(validateErrorMessage['password/required'])
});
