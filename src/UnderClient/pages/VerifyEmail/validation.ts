import * as yup from 'yup';

export const validationSchema = yup.object({
  verificationCode: yup
    .string()
    .required('Verification Code is Required.')
    .max(50, 'Verification Code must be at most 50 characters')
});
