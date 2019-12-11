import { useFormik } from 'formik';
import * as React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from 'UnderClient/components/Layout/Layout';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import { USER_EMAIL } from 'Shared/constants/cookieKey';
import { TEXT_FORGOT_PASSWORD } from 'Shared/constants/texts';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { UserRepository } from 'Shared/repositories/UserRepository';
import { ROUTE_VERIFY_RESET_PASSWORD } from 'Shared/routers/routes';
import './ForgotPassword.scss';
import { Props, State } from './types';
import { validationSchema } from './validation';
import { IMAGE_LOGO } from 'Shared/constants/images';
import { infoMessage } from 'Shared/constants/infoMessage';
import { Util } from 'Shared/helpers/Utils';
import { ROUTE_REGISTER } from 'UnderClient/routers/routes';
import Swal from 'sweetalert2';

const initialState: State = {
  email: ''
};

const ForgotPassword = (props: Props) => {
  const userRepository = useInjection<UserRepository>('userRepository');
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');
  const util = useInjection<Util>('util');
  const [loading, setLoading] = React.useState(false);

  const toRegister = () => {
    Swal.close();
    props.history.push(ROUTE_REGISTER);
  };

  const MessageError = (error: any) => {
    return (
      <>
        {util.cognitoMessage(error.error.code)}
        <br /> or <br />
        <span
          onClick={toRegister}
          className='text-info btn-link cursor-pointer'
        >
          Create a new one
        </span>
      </>
    );
  };

  const formik = useFormik({
    validationSchema,
    initialValues: initialState,
    onSubmit: async values => {
      setLoading(true);

      userRepository
        .forgotPassword(values.email)
        .then(data => {
          cookieProvider.set(USER_EMAIL, values.email);
          useAlert
            .fire({
              icon: 'success',
              title: 'Success!',
              html: infoMessage['forgot/email/success'],
              showConfirmButton: true,
              confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
            })
            .then(() => {
              props.history.replace(ROUTE_VERIFY_RESET_PASSWORD);
            });
        })
        .catch(error => {
          useAlert.fire({
            icon: 'error',
            title: 'Oops...',
            html: <MessageError error={error} />,
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
      className='forgot-password-page'
      hideHeader
      hideSidebar
      documentTitle={TEXT_FORGOT_PASSWORD}
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content border-0'>
          <div className='modal-body p-5'>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <img className='logo mb-3' src={IMAGE_LOGO} alt='logo' />
              <h3>{TEXT_FORGOT_PASSWORD}</h3>
              <Alert variant='info' className='py-2 px-3'>
                <small>{infoMessage['forgot/subText']}</small>
              </Alert>

              {formik.errors.generalError && (
                <Alert variant='danger'>{formik.errors.generalError}</Alert>
              )}

              <Form.Group>
                <Form.Label>
                  Your Email<span>(*)</span>
                </Form.Label>

                <Form.Control
                  type='email'
                  name='email'
                  autoFocus
                  placeholder='Enter email'
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.email && formik.touched.email}
                />

                <Form.Control.Feedback type='invalid'>
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                className='btn-block my-4'
                variant='primary'
                type='submit'
                disabled={loading}
              >
                Send email
              </Button>
            </Form>

            <div className='d-block text-right'>
              <Link to='/login' className='text-primary'>
                Back to log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
