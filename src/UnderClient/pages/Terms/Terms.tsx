import { useFormik } from 'formik';
import * as React from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import Layout from 'UnderClient/components/Layout/Layout';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import { USER_EMAIL } from 'Shared/constants/cookieKey';
import { IMAGE_LOGO } from 'Shared/constants/images';
import { TEXT_TERMS } from 'Shared/constants/texts';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { UserRepository } from 'Shared/repositories/UserRepository';
import { ROUTE_VERIFY_EMAIL } from 'Shared/routers/routes';
import { ROUTE_REGISTER } from 'UnderClient/routers/routes';
import './Terms.scss';
import { Props, State } from './types';
import { validationSchema } from './validation';
import { validateErrorMessage } from 'Shared/constants/validateErrorMessage';
import { Util } from 'Shared/helpers/Utils';
import { useAuth } from 'Shared/contexts/AuthContext';
import { useSpinner } from 'Shared/contexts/SpinnerContext';
const get = require('lodash/get');

export const initialState: State = {
  password: '',
  confirmPassword: ''
};

const Terms = (props: Props) => {
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');
  const userRepository = useInjection<UserRepository>('userRepository');
  const util = useInjection<Util>('util');

  const auth = useAuth();
  const spinner = useSpinner();

  const [isAgreed, setIsAgreed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const email = cookieProvider.get(USER_EMAIL);
  if (!email) {
    props.history.replace(ROUTE_REGISTER);
  }

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: initialState,
    onSubmit: async values => {
      setLoading(true);
      spinner.open();
      userRepository
        .sendProfile()
        .then(sessionCode => {
          return userRepository.signUp({
            email,
            sessionCode,
            password: values.password
          });
        })
        .then(user => {
          auth.set(values.password);
          props.history.replace(ROUTE_VERIFY_EMAIL);
        })
        .catch(error => {
          useAlert.fire({
            icon: 'error',
            title: 'Oops...',
            html: `
            ${util.cognitoMessage(
              get(error, 'response.data.errors[0].code', '')
            )}`,
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
      documentTitle={TEXT_TERMS}
      className='terms-module full-height'
      hideHeader
      hideSidebar
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content border-0'>
          <div className='modal-body p-0'>
            <Card className='card-popup'>
              <Card.Body>
                <img
                  src={IMAGE_LOGO}
                  alt='brand-logo'
                  className='card-logo mb-3'
                />
                <Card.Title>Create your account</Card.Title>
                <Card.Subtitle>
                  Almost done! Please review and agree to the Under Terms &amp;
                  Conditions.
                </Card.Subtitle>
                <a
                  href='https://google.com'
                  target='_blank'
                  className='btn btn-block btn-primary mt-3'
                >
                  View Terms &amp; Conditions
                </a>

                <hr />

                <Form
                  noValidate
                  onSubmit={formik.handleSubmit}
                  className='mt-3'
                >
                  <Form.Group>
                    <Form.Label>PASSWORD</Form.Label>
                    <Form.Control
                      type='password'
                      name='password'
                      placeholder=''
                      autoFocus
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.password}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {formik.errors.password}
                    </Form.Control.Feedback>
                    <Alert variant='info' className='py-2 px-3 mt-2'>
                      <small>
                        {validateErrorMessage['password/help-text']}
                      </small>
                    </Alert>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>CONFIRM PASSWORD</Form.Label>
                    <Form.Control
                      type='password'
                      name='confirmPassword'
                      placeholder=''
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.confirmPassword}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {formik.errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Check
                    custom
                    type={'checkbox'}
                    id={`termsandcondition`}
                    label={`I agree to the Terms & Conditions`}
                    defaultChecked={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                  />
                  <Button
                    variant='primary'
                    type='submit'
                    className='btn-block mt-4'
                    disabled={!isAgreed || loading}
                  >
                    Create Account
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
