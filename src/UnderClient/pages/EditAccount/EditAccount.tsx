import { useFormik } from 'formik';
import * as React from 'react';
import { Button, Col, Form, Navbar } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import Layout from 'UnderClient/components/Layout/Layout';
import { TEXT_EDIT_ACCOUNT } from 'Shared/constants/texts';
import useModal from 'Shared/hooks/UseModal/useModal';
import PasswordForm from './components/PasswordForm';
import './EditAccount.scss';
import { Props, State } from './types';
import { validationSchema } from './validation';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import { infoMessage } from 'Shared/constants/infoMessage';
import { ROUTE_LOGIN } from 'Shared/routers/routes';
import { UserRepository } from 'Shared/repositories/UserRepository';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';

const initialState: State = {
  workEmail: '',
  firstName: '',
  lastName: '',
  phone: ''
};

const EditAccount = (props: Props) => {
  const userRepository = useInjection<UserRepository>('userRepository');
  const {
    show: showChangePassword,
    Modal: ModalChangePassword,
    hide: hideChangePasswordModal
  } = useModal();

  const logout = () => {
    userRepository
      .logOut()
      .then(() => {
        props.history.replace(ROUTE_LOGIN);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: initialState,
    onSubmit: () => {
      console.log('Submitted!');
      useAlert.fire({
        icon: 'success',
        title: 'Success!',
        html: infoMessage['changeProfile/success'],
        showConfirmButton: true,
        confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
      });
    }
  });

  return (
    <Layout
      pageTitle={TEXT_EDIT_ACCOUNT}
      documentTitle={TEXT_EDIT_ACCOUNT}
      className='edit-account-module'
    >
      <Navbar bg='white' className='px-4 py-3 sticky-top'>
        <span className='text-md text-uppercase text-muted top-bar-title'>
          Account Overview
        </span>

        <span className='text-muted text-capitalize border-left pl-2 ml-2 top-bar-count'>
          Administrator
        </span>

        <div className='ml-auto d-flex align-items-center top-bar-filter'>
          <Button
            variant='secondary'
            className='mx-2'
            onClick={showChangePassword}
          >
            Change Password
          </Button>
          <Button
            variant='primary'
            type='submit'
            onClick={() => formik.handleSubmit()}
          >
            Save
          </Button>
        </div>
      </Navbar>

      <div className='p-4'>
        <div className='border bg-white p-4'>
          <h5 className='text-capitalize mb-4'>Joe's Plumbing Information</h5>

          <Form onSubmit={formik.handleSubmit}>
            <Form.Row className='mx--2'>
              <Form.Group
                className='px-2 mb-4'
                as={Col}
                md='4'
                controlId='formFirstName'
              >
                <Form.Label>
                  First Name <span className='text-danger'>(*)</span>
                </Form.Label>

                <Form.Control
                  type='text'
                  placeholder='First name'
                  name='firstName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!formik.errors.firstName && formik.touched.firstName
                  }
                />

                <Form.Control.Feedback type='invalid'>
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className='px-2 mb-4'
                as={Col}
                md='4'
                controlId='formLastName'
              >
                <Form.Label>
                  Last Name <span className='text-danger'>(*)</span>
                </Form.Label>

                <Form.Control
                  type='text'
                  placeholder='Last name'
                  name='lastName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!formik.errors.lastName && formik.touched.lastName
                  }
                />

                <Form.Control.Feedback type='invalid'>
                  {formik.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row className='mx--2'>
              <Form.Group
                className='px-2 mb-4'
                as={Col}
                md='4'
                controlId='formEmail'
              >
                <Form.Label>
                  Email<span className='text-danger'>(*)</span>
                </Form.Label>

                <Form.Control
                  type='email'
                  placeholder='Email'
                  name='workEmail'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!formik.errors.workEmail && formik.touched.workEmail
                  }
                />

                <Form.Control.Feedback type='invalid'>
                  {formik.errors.workEmail}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className='px-2 mb-4'
                as={Col}
                md='4'
                controlId='formPhone'
              >
                <Form.Label>
                  Phone Number <span className='text-danger'>(*)</span>
                </Form.Label>

                <NumberFormat
                  name='phone'
                  format='###-###-####'
                  mask=' '
                  placeholder=''
                  onChange={formik.handleChange}
                  customInput={Form.Control}
                  onBlur={formik.handleBlur}
                  isInvalid={!!formik.errors.phone && formik.touched.phone}
                />

                <Form.Control.Feedback type='invalid'>
                  {formik.errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row className='mx--2'>
              <Form.Group
                className='px-2 mb-4'
                as={Col}
                md='4'
                controlId='formCompany'
              >
                <Form.Label>Company</Form.Label>

                <Form.Control
                  type='text'
                  placeholder='Company'
                  name='companyName'
                  disabled
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </div>
      </div>

      <ModalChangePassword
        className='modal-edit-account'
        hideHeader
        hideFooter
        isCentered
      >
        <PasswordForm
          onClose={hideChangePasswordModal}
          onLogout={logout}
          {...props}
        />
      </ModalChangePassword>
    </Layout>
  );
};

export default EditAccount;
