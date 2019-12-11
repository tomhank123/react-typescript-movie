import * as yup from 'yup';
import {
  validateErrorMessage,
  VALIDATION_PASSWORD_FORMAT,
  VALIDATION_PASSWORD_MINIMUM,
  VALIDATION_PASSWORD_MAXIMUM
} from 'Shared/constants/validateErrorMessage';

export const validationSchema = yup.object({
  code: yup.string().required(validateErrorMessage['code/required']),
  password: yup
    .string()
    .required(validateErrorMessage['new-password/required'])
    .min(VALIDATION_PASSWORD_MINIMUM, validateErrorMessage['password/minimum-characters'])
    .matches(VALIDATION_PASSWORD_FORMAT, validateErrorMessage['password/incorrect-format'])
    .max(VALIDATION_PASSWORD_MAXIMUM, validateErrorMessage['password/maximum-characters']),
  confirmPassword: yup
    .string()
    .required(validateErrorMessage['confirm-password/required'])
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], validateErrorMessage['confirm-password/matched'])
    })
});
