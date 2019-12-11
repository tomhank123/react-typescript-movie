import * as yup from 'yup';
import {
  VALIDATION_COMPANY_NAME_MINIMUM,
  VALIDATION_COMPANY_NAME_MAXIMUM,
  VALIDATION_FIRST_NAME_MINIMUM,
  VALIDATION_FIRST_NAME_MAXIMUM,
  VALIDATION_LAST_NAME_MINIMUM,
  VALIDATION_LAST_NAME_MAXIMUM,
  validateErrorMessage,
  VALIDATION_EMAIL_MINIMUM,
  VALIDATION_EMAIL_MAXIMUM
} from 'Shared/constants/validateErrorMessage';

export const validationSchema = yup.object({
  companyName: yup
    .string()
    .label('Company name')
    .required(validateErrorMessage['company-name/required'])
    .min(VALIDATION_COMPANY_NAME_MINIMUM)
    .max(VALIDATION_COMPANY_NAME_MAXIMUM),
  firstName: yup
    .string()
    .label('First name')
    .required(validateErrorMessage['first-name/required'])
    .min(VALIDATION_FIRST_NAME_MINIMUM, validateErrorMessage['first-name/minimum-characters'])
    .max(VALIDATION_FIRST_NAME_MAXIMUM, validateErrorMessage['first-name/maximum-characters']),
  lastName: yup
    .string()
    .label('Last name')
    .required(validateErrorMessage['last-name/required'])
    .min(VALIDATION_LAST_NAME_MINIMUM, validateErrorMessage['last-name/minimum-characters'])
    .max(VALIDATION_LAST_NAME_MAXIMUM, validateErrorMessage['last-name/maximum-characters']),
  phone: yup
    .string()
    .label('Phone number')
    .required(validateErrorMessage['phone-number/required']),
  workEmail: yup
    .string()
    .label('Work email')
    .email(validateErrorMessage['email/incorrect-format'])
    .min(VALIDATION_EMAIL_MINIMUM, validateErrorMessage['email/minimum-characters'])
    .max(VALIDATION_EMAIL_MAXIMUM, validateErrorMessage['email/maximum-characters'])
    .required(validateErrorMessage['email/required'])
});
