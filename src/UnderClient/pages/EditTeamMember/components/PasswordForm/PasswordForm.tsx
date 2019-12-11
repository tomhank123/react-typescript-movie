import { useFormik } from 'formik';
import * as React from 'react';
import './PasswordForm.scss';
import { Props, State } from './types';
import { Form, Button, Alert } from 'react-bootstrap';
import { validationSchema } from './validation';
import { validateErrorMessage } from 'Shared/constants/validateErrorMessage';
import { infoMessage } from 'Shared/constants/infoMessage';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import { TeamRepository } from 'UnderClient/repositories/TeamRepository';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { SetMemberPasswordRequest } from 'UnderClient/types/team/setMemberPasswordRequest';

const initialState: State = {
  newPassword: '',
  confirmPassword: ''
};

const PasswordForm = (props: Props) => {
  const teamRepository = useInjection<TeamRepository>('teamRepository');

  const { onClose } = props;

  const companyId = props.match.params.companyId;
  const memberId = props.match.params.memberId;

  const formik = useFormik({
    validationSchema,
    initialValues: initialState,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const newPassword = values.newPassword;
      const requestSetPasswordMember: SetMemberPasswordRequest = {
        companyId,
        memberId,
        newPassword
      };
      const setPasswordMember = await teamRepository.setMemberPassword(
        requestSetPasswordMember
      );
      if (setPasswordMember) {
        useAlert
          .fire({
            icon: 'success',
            title: 'Success!',
            html: infoMessage['setMemberPassword/success'],
            showConfirmButton: true,
            confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
          })
          .then(() => {
            onClose();
          });
      } else {
        useAlert.fire({
          icon: 'error',
          title: 'Error!',
          html: infoMessage['setMemberPassword/fail'],
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
      <Form onSubmit={formik.handleSubmit}>
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
