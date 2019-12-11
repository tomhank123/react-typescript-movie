import * as yup from 'yup';
import {
  validateErrorMessage,
  VALIDATION_FIRST_NAME_MAXIMUM,
  VALIDATION_FIRST_NAME_MINIMUM,
  VALIDATION_LAST_NAME_MINIMUM,
  VALIDATION_LAST_NAME_MAXIMUM,
  VALIDATION_EMAIL_MAXIMUM,
  VALIDATION_EMAIL_MINIMUM
} from 'Shared/constants/validateErrorMessage';

export const validationSchema = yup.object({
  firstName: yup
    .string()
    .label('First name')
    .required()
    .min(
      VALIDATION_FIRST_NAME_MINIMUM,
      validateErrorMessage['first-name/minimum-characters']
    )
    .max(
      VALIDATION_FIRST_NAME_MAXIMUM,
      validateErrorMessage['first-name/maximum-characters']
    ),
  lastName: yup
    .string()
    .label('Last name')
    .required()
    .min(
      VALIDATION_LAST_NAME_MINIMUM,
      validateErrorMessage['last-name/minimum-characters']
    )
    .max(
      VALIDATION_LAST_NAME_MAXIMUM,
      validateErrorMessage['last-name/maximum-characters']
    ),
  phoneNumber: yup
    .string()
    .label('Phone number')
    .required(),
  workEmail: yup
    .string()
    .label('Work email')
    .email(validateErrorMessage['email/incorrect-format'])
    .min(
      VALIDATION_EMAIL_MINIMUM,
      validateErrorMessage['email/minimum-characters']
    )
    .max(
      VALIDATION_EMAIL_MAXIMUM,
      validateErrorMessage['email/maximum-characters']
    )
    .required()
});
