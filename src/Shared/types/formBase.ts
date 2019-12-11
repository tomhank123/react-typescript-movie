import { FormikHelpers } from 'formik';

export interface FormikFormSubmitData<State> {
  values: State;
  formikHelpers: FormikHelpers<State>;
}
