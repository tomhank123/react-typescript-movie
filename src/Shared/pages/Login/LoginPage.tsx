import { useFormik } from 'formik';
import * as React from 'react';
import {
  Alert,
  Button,
  Col,
  Form,
  OverlayTrigger,
  Popover,
  Row
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from 'UnderClient/components/Layout/Layout';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import { SECURITY_LOGIN, USER_STATUS } from 'Shared/constants/cookieKey';
import { IMAGE_LOGO } from 'Shared/constants/images';
import {
  TEXT_DOCUMENT_TITLE,
  TEXT_LOGIN,
  TEXT_SIGN_IN,
  TEXT_SIGN_IN_INFO,
  TEXT_SIGN_IN_INFO_DETAIL
} from 'Shared/constants/texts';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { UserRepository } from 'Shared/repositories/UserRepository';
import {
  ROUTE_REGISTER,
  ROUTE_VERIFY_EMAIL,
  ROUTE_DEACTIVATED_ACCOUNT
} from 'UnderClient/routers/routes';
import './Login.scss';
import { Props, State } from './types';
import { Util } from 'Shared/helpers/Utils';
import { validationSchema } from './validation';
import { ROUTE_FORGOT_PASSWORD } from 'Shared/routers/routes';
import { infoMessage } from 'Shared/constants/infoMessage';
import { useSpinner } from 'Shared/contexts/SpinnerContext';
import { useAuth } from 'Shared/contexts/AuthContext';
import { UserStatus } from 'Shared/constants/userStatus';

export const initialState: State = {
  email: '',
  password: ''
};

const LoginPage = (props: Props) => {
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');
  const userRepository = useInjection<UserRepository>('userRepository');
  const securityLogin = cookieProvider.get(SECURITY_LOGIN);
  const [loading, setLoading] = React.useState(false);
  const util = useInjection<Util>('util');

  const spinner = useSpinner();
  const auth = useAuth();

  const formik = useFormik({
    validationSchema,
    initialValues: initialState,
    onSubmit: values => {
      spinner.open();
      setLoading(true);

      userRepository
        .signIn({ username: values.email, password: values.password })
        .then(user => {
          if (user == 'UserNotConfirmedException') {
            auth.set(values.password);
            props.history.replace(ROUTE_VERIFY_EMAIL);
            return;
          }
          if (cookieProvider.get(USER_STATUS) === UserStatus.INACTIVE) {
            props.history.replace(ROUTE_DEACTIVATED_ACCOUNT);
            return;
          }
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
        })
        .finally(() => {
          setLoading(false);
          spinner.close();
        });
    }
  });

  return (
    <Layout
      className='login-page'
      hideHeader
      hideSidebar
      documentTitle={TEXT_LOGIN}
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content border-0'>
          <div className='modal-body p-0'>
            <Row>
              <Col xs={12} md={5}>
                <div className='p-4'>
                  <img
                    className='logo mb-3'
                    src={IMAGE_LOGO}
                    alt={TEXT_DOCUMENT_TITLE}
                  />
                  <h3 className='login-title'>{TEXT_SIGN_IN}</h3>
                  {securityLogin && (
                    <OverlayTrigger
                      placement='right'
                      overlay={
                        <Popover id='popover-basic'>
                          <Popover.Content>
                            {TEXT_SIGN_IN_INFO_DETAIL}
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Alert variant='info' className='py-2 px-3'>
                        <small>
                          {TEXT_SIGN_IN_INFO}
                          <i className='fas fa-question-circle ml-1'></i>
                        </small>
                      </Alert>
                    </OverlayTrigger>
                  )}

                  <Form noValidate onSubmit={formik.handleSubmit}>
                    {formik.errors.generalError && (
                      <Alert variant='danger'>
                        {formik.errors.generalError}
                      </Alert>
                    )}

                    <Form.Group controlId='formBasicEmail'>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type='email'
                        name='email'
                        placeholder='Enter email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          !!formik.errors.email && formik.touched.email
                        }
                      />
                      <Form.Control.Feedback type='invalid'>
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        name='password'
                        placeholder='Password'
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
                    </Form.Group>

                    <Button
                      variant='primary'
                      className='btn-block'
                      type='submit'
                      disabled={loading}
                    >
                      Sign In
                    </Button>

                    <hr />
                  </Form>
                  <Button
                    className='btn-block'
                    variant='secondary'
                    onClick={() => props.history.push(ROUTE_REGISTER)}
                  >
                    Create Account
                  </Button>
                  <Link
                    to={ROUTE_FORGOT_PASSWORD}
                    className='btn btn-link btn-block'
                  >
                    {infoMessage['forgot/link']}
                  </Link>
                </div>
              </Col>

              <Col xs={12} md={7} className='pl-0'>
                <div className='login-banner'>
                  <div className='login-banner-body'>
                    <h4>Welcome to Under</h4>
                    <p className='login-banner-text'>
                      Gather data from your client once and never again.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default LoginPage;
