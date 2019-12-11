import { useFormik } from 'formik';
import * as React from 'react';
import { Alert, Button, Form, Jumbotron } from 'react-bootstrap';
import Layout from 'UnderClient/components/Layout/Layout';
import { TEXT_RESET_PASSWORD } from 'Shared/constants/texts';
import './ResetPassword.scss';
import { Props, State } from './types';
import { validationSchema } from './validation';
import { IMAGE_LOGO } from 'Shared/constants/images';

export const initialState: State = {
  password: '',
  confirmPassword: ''
};

const ResetPassword = (props: Props) => {
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: initialState,
    onSubmit: () => {}
  });

  return (
    <Layout
      className='reset-password-page'
      hideHeader
      hideSidebar
      documentTitle={TEXT_RESET_PASSWORD}
    >
      <Jumbotron>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <img className='logo mb-3' src={IMAGE_LOGO} alt='logo' />
          <h3>{TEXT_RESET_PASSWORD}</h3>
          <Alert variant='info' className='py-2 px-3'>
            <small>
              We've send to you a code to confirm your request of resetting
              password. Please input the code below.
            </small>
          </Alert>

          {formik.errors.generalError && (
            <Alert variant='danger'>{formik.errors.generalError}</Alert>
          )}

          <Form.Group>
            <Form.Label>
              New Password<span>(*)</span>
            </Form.Label>

            <Form.Control
              type='password'
              name='password'
              autoFocus
              placeholder='Password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.password && formik.touched.password}
            />

            <Form.Control.Feedback type='invalid'>
              {formik.errors.password}
            </Form.Control.Feedback>
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

          <Button variant='primary' type='submit'>
            Reset My Password
          </Button>
        </Form>
      </Jumbotron>
    </Layout>
  );
};

export default ResetPassword;
