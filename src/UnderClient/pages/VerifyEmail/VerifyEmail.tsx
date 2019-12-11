import { useFormik } from 'formik';
import * as React from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { SECURITY_LOGIN, USER_EMAIL } from 'Shared/constants/cookieKey';
import { IMAGE_VERIFY_EMAIL } from 'Shared/constants/images';

import { CookieProvider } from 'Shared/providers/CookieProvider';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { UserRepository } from 'Shared/repositories/UserRepository';
import { ROUTE_LOGIN } from 'Shared/routers/routes';
import { Props, State } from './types';
import { validationSchema } from './validation';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import { infoMessage } from 'Shared/constants/infoMessage';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import './VerifyEmail.scss';
import { Link } from 'react-router-dom';
import { useAuth } from 'Shared/contexts/AuthContext';
import { Util } from 'Shared/helpers/Utils';

const initialState: State = {
  verificationCode: ''
};

const VerifyEmail = (props: Props) => {
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');
  const userRepository = useInjection<UserRepository>('userRepository');

  const util = useInjection<Util>('util');

  const auth = useAuth();

  const email = cookieProvider.get(USER_EMAIL);

  const logout = () => {
    userRepository.clearUserInfo();
    props.history.replace(ROUTE_LOGIN);
  };

  const resendVerificattionCode = () => {
    userRepository
      .resendVerifyEmailCode(email)
      .then(() => {
        useAlert.fire({
          icon: 'success',
          title: 'Success!',
          html: infoMessage['auth/resend-verification-code-success'],
          showConfirmButton: true,
          confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
        });
      })
      .catch(error => {
        useAlert.fire({
          icon: 'error',
          title: 'Error!',
          html: error.message,
          showConfirmButton: true,
          confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
        });
      });
  };

  const FormValidateCode = () => {
    const formik = useFormik({
      validationSchema,
      initialValues: initialState,
      onSubmit: (values, { setSubmitting }) => {
        setSubmitting(true);
        userRepository
          .verifyEmailCode(email, values.verificationCode)
          .then(user => {
            useAlert
              .fire({
                icon: 'success',
                title: 'Success!',
                html: infoMessage['register/success'],
                showConfirmButton: true,
                confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
              })
              .then(() => {
                if (auth.pw) {
                  userRepository
                    .signIn({ username: email, password: auth.pw })
                    .then(user => {
                      auth.clear();
                      props.history.replace(props.authorizedRedirectRoute);
                    })
                    .catch(error => {
                      useAlert.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html: `
                        ${util.cognitoMessage(error.code)}
                      `,
                        showConfirmButton: true,
                        confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
                      });
                    });
                } else {
                  cookieProvider.set(SECURITY_LOGIN, 'true');
                  props.history.replace(ROUTE_LOGIN);
                }
              });
          })
          .catch(error => {
            formik.setErrors({ verificationCode: error.message });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
    });

    return (
      <Form noValidate onSubmit={formik.handleSubmit}>
        <InputGroup className='input-group my-3 col-md-8 offset-md-2'>
          <FormControl
            placeholder='Verification Code'
            aria-label='Verification Code'
            aria-describedby='basic-addon2'
            name='verificationCode'
            value={formik.values.verificationCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.verificationCode}
            isValid={
              formik.touched.verificationCode && !formik.errors.verificationCode
            }
          />

          <InputGroup.Append>
            <Button
              variant='primary'
              type='submit'
              disabled={formik.isSubmitting}
            >
              Verify
            </Button>
          </InputGroup.Append>

          <Form.Control.Feedback className='text-left' type='invalid'>
            {formik.errors.verificationCode}
          </Form.Control.Feedback>
        </InputGroup>
      </Form>
    );
  };

  const VerifyForm = () => {
    return (
      <>
        <h4 className='mb-3'>Verify Your Email Address</h4>
        <p className='img'>
          <img src={IMAGE_VERIFY_EMAIL} width='100' height='100' alt='' />
        </p>
        <div className='mb-4'>
          <p className='mb-2'>
            Enter the verification code we sent to&nbsp;
            <b>{email}</b>,
            <br />
            then click on verify and you're all set!
          </p>
          <FormValidateCode />
          If you can't find the email check your spam folder or click the link
          below to re-send.
        </div>

        <div className='d-flex justify-content-between'>
          <Link
            to=''
            className='text-primary'
            title='Resend Verification Email'
            onClick={resendVerificattionCode}
          >
            Resend Verification Email
          </Link>

          <Link
            to=''
            onClick={logout}
            className=' text-primary'
            title='Log out'
          >
            Log out
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className='verify-email-module modal-verify-email'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-body text-center p-5'>
            <VerifyForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
