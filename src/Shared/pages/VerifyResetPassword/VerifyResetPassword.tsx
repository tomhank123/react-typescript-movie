import { useFormik } from 'formik';
import * as React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import Layout from 'UnderClient/components/Layout/Layout';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import { USER_EMAIL } from 'Shared/constants/cookieKey';
import { TEXT_RESET_PASSWORD } from 'Shared/constants/texts';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { UserRepository } from 'Shared/repositories/UserRepository';
import { ROUTE_LOGIN } from 'Shared/routers/routes';
import { Props, State } from './types';
import { validationSchema } from './validation';
import { validateErrorMessage } from 'Shared/constants/validateErrorMessage';
import { IMAGE_LOGO } from 'Shared/constants/images';
import { infoMessage } from 'Shared/constants/infoMessage';
import './VerifyResetPassword.scss';

const initialState: State = {
  code: '',
  password: '',
  email: '',
  confirmPassword: ''
};

const VerifyResetPassword = (props: Props) => {
  const userRepository = useInjection<UserRepository>('userRepository');
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');
  const email = cookieProvider.get(USER_EMAIL);
  const [loading, setLoading] = React.useState(false);

  const resendCode = () => {
    setLoading(true);

    userRepository
      .forgotPassword(email)
      .then(data => {
        useAlert
          .fire({
            icon: 'success',
            title: 'Success!',
            html: 'Resend code successfully, please check your email',
            showConfirmButton: true,
            confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
          })
          .then(() => {
            setLoading(false);
          });
      })
      .catch(error => {
        useAlert.fire({
          icon: 'error',
          title: 'Oops...',
          html: `${error.message}`,
          showConfirmButton: true,
          confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
        });
      });
  };
  initialState.email = email;
  const formik = useFormik({
    validationSchema,
    initialValues: initialState,
    onSubmit: async values => {
      userRepository
        .forgotPasswordSubmit(values.email, values.code, values.password)
        .then(data => {
          useAlert
            .fire({
              icon: 'success',
              title: 'Success!',
              text: infoMessage['forgot/success'],
              showConfirmButton: true,
              confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
            })
            .then(() => {
              cookieProvider.delete(USER_EMAIL);
              props.history.replace(ROUTE_LOGIN);
            });
        })
        .catch(error => {
          useAlert.fire({
            icon: 'error',
            title: 'Oops...',
            html: `${error.message}`,
            showConfirmButton: true,
            confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  return (
    <Layout
      className='verify-reset-password-page'
      hideHeader
      hideSidebar
      documentTitle={TEXT_RESET_PASSWORD}
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content border-0'>
          <div className='modal-body p-5'>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <img className='logo mb-3' src={IMAGE_LOGO} alt='logo' />
              <h3>{TEXT_RESET_PASSWORD}</h3>
              <Alert variant='info' className='py-2 px-3'>
                <small>{infoMessage['resetPassword/subText']}</small>
              </Alert>

              {formik.errors.generalError && (
                <Alert variant='danger'>{formik.errors.generalError}</Alert>
              )}
              <Form.Group>
                <Form.Label>
                  Verification Code<span>(*)</span>
                </Form.Label>

                <Form.Control
                  type='text'
                  name='code'
                  placeholder='Code'
                  value={formik.values.code}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.code && formik.touched.code}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.code}
                </Form.Control.Feedback>
                <div className='text-right mt-1'>
                  <a className='text-primary' onClick={resendCode}>
                    Re-send me the code
                  </a>
                </div>
              </Form.Group>
              <h3>Please input your new password and confirm it below</h3>
              <Form.Group>
                <Form.Label>
                  New Password<span>(*)</span>
                </Form.Label>

                <Form.Control
                  type='password'
                  name='password'
                  placeholder='New password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!formik.errors.password && formik.touched.password
                  }
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.password}
                </Form.Control.Feedback>
                <Alert variant='info' className='py-2 px-3 mt-2'>
                  <small>{validateErrorMessage['password/help-text']}</small>
                </Alert>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Confirm Password<span>(*)</span>
                </Form.Label>

                <Form.Control
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm password'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                  }
                />

                <Form.Control.Feedback type='invalid'>
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant='primary'
                className='btn-block'
                type='submit'
                disabled={loading}
              >
                Reset My Password
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyResetPassword;
