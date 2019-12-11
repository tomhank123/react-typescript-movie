import * as yup from 'yup';
import {
  validateErrorMessage,
  VALIDATION_PASSWORD_MINIMUM,
  VALIDATION_PASSWORD_MAXIMUM,
  VALIDATION_PASSWORD_FORMAT
} from 'Shared/constants/validateErrorMessage';

export const validationSchema = yup.object({
  newPassword: yup
    .string()
    .label('Password')
    .required(validateErrorMessage['password/required'])
    .min(
      VALIDATION_PASSWORD_MINIMUM,
      validateErrorMessage['password/minimum-characters']
    )
    .max(
      VALIDATION_PASSWORD_MAXIMUM,
      validateErrorMessage['password/maximum-characters']
    )
    .matches(
      VALIDATION_PASSWORD_FORMAT,
      validateErrorMessage['password/incorrect-format']
    ),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test(
      'passwords-match',
      validateErrorMessage['confirm-password/matched'],
      function(value) {
        return this.parent.newPassword === value;
      }
    )
});
