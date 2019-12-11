import * as yup from 'yup';
import { validateErrorMessage, VALIDATION_PASSWORD_FORMAT } from 'Shared/constants/validateErrorMessage';

export const validationSchema = yup.object({
  password: yup
    .string()
    .required(validateErrorMessage['password/required'])
    .min(6, validateErrorMessage['password/minimum-characters'])
    .matches(VALIDATION_PASSWORD_FORMAT, validateErrorMessage['password/incorrect-format'])
    .max(20, validateErrorMessage['password/maximum-characters']),
  confirmPassword: yup
    .string()
    .required(validateErrorMessage['confirm-password/required'])
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], validateErrorMessage['confirm-password/matched'])
    })
});
