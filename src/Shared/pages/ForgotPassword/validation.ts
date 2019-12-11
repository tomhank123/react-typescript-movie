import * as yup from 'yup';
import {
  validateErrorMessage,
  VALIDATION_EMAIL_MAXIMUM,
  VALIDATION_EMAIL_MINIMUM
} from 'Shared/constants/validateErrorMessage';

export const validationSchema = yup.object({
  email: yup
    .string()
    .email(validateErrorMessage['email/incorrect-format'])
    .min(VALIDATION_EMAIL_MINIMUM, validateErrorMessage['email/minimum-characters'])
    .max(VALIDATION_EMAIL_MAXIMUM, validateErrorMessage['email/maximum-characters'])
    .required(validateErrorMessage['email/required'])
});
