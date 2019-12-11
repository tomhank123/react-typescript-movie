import { useFormik } from 'formik';
import * as React from 'react';
import './PasswordForm.scss';
import { Props, State } from './types';
import { Form, Button, Alert } from 'react-bootstrap';
import { validationSchema } from './validation';
import { validateErrorMessage } from 'Shared/constants/validateErrorMessage';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import { infoMessage } from 'Shared/constants/infoMessage';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { UserRepository } from 'Shared/repositories/UserRepository';

const initialState: State = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};

const PasswordForm = (props: Props) => {
  const { onClose, onLogout } = props;
  const userRepository = useInjection<UserRepository>('userRepository');

  const formik = useFormik({
    validationSchema,
    initialValues: initialState,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      const { oldPassword, newPassword } = values;
      const responseStatus = await userRepository.changePassword(
        oldPassword,
        newPassword
      );

      if (responseStatus) {
        useAlert
          .fire({
            icon: 'success',
            title: infoMessage['changePassword/success-title'],
            html: infoMessage['changePassword/success-content'],
            showConfirmButton: true,
            confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
          })
          .then(() => {
            onClose();
            onLogout();
          });
      } else {
        useAlert.fire({
          icon: 'error',
          title: infoMessage['changePassword/failure-title'],
          html: infoMessage['changePassword/failure-content'],
          showConfirmButton: true,
          confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
        });
      }

      setSubmitting(false);
    }
  });

  return (
    <>
      <h4 className='mb-3'>Change Your Password</h4>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>
            CURRENT PASSWORD <span className='text-danger'>(*)</span>
          </Form.Label>
          <Form.Control
            type='password'
            name='oldPassword'
            placeholder='Current password'
            autoFocus
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            isInvalid={
              !!formik.errors.oldPassword && formik.touched.oldPassword
            }
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.oldPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>PASSWORD</Form.Label>
          <Form.Control
            type='password'
            name='newPassword'
            placeholder='Password'
            autoFocus
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            isInvalid={
              !!formik.errors.newPassword && formik.touched.newPassword
            }
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.newPassword}
          </Form.Control.Feedback>
          <Alert variant='info' className='py-2 px-3 mt-2'>
            <small>{validateErrorMessage['password/help-text']}</small>
          </Alert>
        </Form.Group>

        <Form.Group>
          <Form.Label>CONFIRM PASSWORD</Form.Label>
          <Form.Control
            type='password'
            name='confirmPassword'
            placeholder='Confirm password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            isInvalid={
              !!formik.errors.confirmPassword && formik.touched.confirmPassword
            }
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='d-flex justify-content-between'>
          <Button
            variant='secondary'
            type='button'
            onClick={onClose}
            disabled={formik.isSubmitting}
          >
            Cancel
          </Button>

          <Button
            variant='primary'
            type='submit'
            disabled={formik.isSubmitting}
          >
            Change
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default PasswordForm;
