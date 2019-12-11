import { useFormik } from 'formik';
import * as React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import Layout from 'UnderClient/components/Layout/Layout';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import {
  USER_COMPANY_NAME,
  USER_EMAIL,
  USER_FIRST_NAME,
  USER_INVITAION_CODE,
  USER_LAST_NAME,
  USER_PHONE
} from 'Shared/constants/cookieKey';
import { IMAGE_LOGO } from 'Shared/constants/images';
import {
  TEXT_REGISTER,
  TEXT_SIGN_IN,
  TEXT_SIGN_UP
} from 'Shared/constants/texts';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { UserRepository } from 'Shared/repositories/UserRepository';
import { ROUTE_FORGOT_PASSWORD, ROUTE_LOGIN } from 'Shared/routers/routes';
import { UserProfileTemporaryRequest } from 'Shared/types/user/UserProfileTemporaryRequest';
import { ROUTE_TERMS } from 'UnderClient/routers/routes';
import './Register.scss';
import { Props, State } from './types';
import { validationSchema } from './validation';
import {
  validateErrorMessage,
  VALIDATION_EMAIL_FORMAT
} from 'Shared/constants/validateErrorMessage';
import { infoMessage } from 'Shared/constants/infoMessage';
import { Util } from 'Shared/helpers/Utils';
const get = require('lodash/get');

const initialState: State = {
  companyName: '',
  workEmail: '',
  firstName: '',
  lastName: '',
  phone: ''
};

const Register = (props: Props) => {
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');
  const userRepository = useInjection<UserRepository>('userRepository');
  const util = useInjection<Util>('util');

  const getParamUrl = util.getUrlParams(props.location.search);
  const invitationCode = get(getParamUrl, 'invitationCode', '');
  const [companyName, setCompanyName] = React.useState<string>('');
  const [workEmail, setWorkEmail] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [exceptErrors, setExceptErrors] = React.useState<object>({});

  const infoUser = {
    [USER_COMPANY_NAME]: cookieProvider.get(USER_COMPANY_NAME),
    [USER_FIRST_NAME]: cookieProvider.get(USER_FIRST_NAME),
    [USER_PHONE]: cookieProvider.get(USER_PHONE),
    [USER_LAST_NAME]: cookieProvider.get(USER_LAST_NAME),
    [USER_EMAIL]: cookieProvider.get(USER_EMAIL)
  };

  const defaultInfoUser = { ...initialState, ...infoUser };

  const checkExistEmail = async (email: string) => {
    const emailExisted = await userRepository
      .checkExistEmail(email)
      .then(data => data);

    return emailExisted;
  };

  const formik = useFormik({
    validateOnBlur: false,
    validationSchema,
    initialValues: defaultInfoUser,
    onSubmit: async values => {
      setLoading(true);

      const phone = values.phone.replace(/-/g, '');

      cookieProvider.set(USER_COMPANY_NAME, values.companyName);
      cookieProvider.set(USER_FIRST_NAME, values.firstName);
      cookieProvider.set(USER_LAST_NAME, values.lastName);
      cookieProvider.set(USER_PHONE, phone);
      cookieProvider.set(USER_EMAIL, values.workEmail);

      const profile: UserProfileTemporaryRequest = {
        companyName: values.companyName,
        workEmail: values.workEmail,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: phone
      };

      if (companyName && workEmail) {
        profile.invitationCode = invitationCode;
      }
      setLoading(false);
      props.history.push(ROUTE_TERMS);
    },
    validate: () => {
      const errors = { ...exceptErrors };

      return errors;
    }
  });

  const validateEmail = async (event: any) => {
    const errors = {};
    const email = event.target.value;
    const isEmail = VALIDATION_EMAIL_FORMAT.test(email);

    if (email && isEmail) {
      const emailExisted = await checkExistEmail(email);

      if (emailExisted) {
        errors[USER_EMAIL] = validateErrorMessage['email/existed'];
        setExceptErrors(errors);
        formik.setFieldTouched(USER_EMAIL);
        formik.setFieldError(USER_EMAIL, errors[USER_EMAIL]);
      } else {
        setExceptErrors({});
        formik.setFieldTouched(USER_EMAIL);
        formik.setFieldError(USER_EMAIL, '');
      }
    }
  };

  React.useEffect(() => {
    const loadInfoUser = async () => {
      if (invitationCode) {
        try {
          const userInvitation = await userRepository.getInfoInvitation(
            invitationCode
          );

          infoUser[USER_COMPANY_NAME] = userInvitation.companyName;
          infoUser[USER_EMAIL] = userInvitation.invitedEmail;
          cookieProvider.set(USER_INVITAION_CODE, invitationCode);
          formik.setValues(infoUser);
          setCompanyName(infoUser[USER_COMPANY_NAME]);
          setWorkEmail(infoUser[USER_EMAIL]);
        } catch (error) {
          useAlert.fire({
            icon: 'error',
            title: 'Oops...',
            html: `InvitationCode invalid`,
            showConfirmButton: true,
            confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
          });
        }
      }
    };
    loadInfoUser();
  }, []);

  return (
    <Layout
      documentTitle={TEXT_REGISTER}
      className='terms-module full-height'
      hideHeader
      hideSidebar
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content border-0'>
          <div className='modal-body p-0'>
            <Card className='card-popup'>
              <Card.Body className='p-0'>
                <img
                  src={IMAGE_LOGO}
                  alt='brand-logo'
                  className='card-logo mb-3'
                />
                <Card.Title className='mb-3'>
                  Please enter the following information
                </Card.Title>

                <Form
                  onSubmit={formik.handleSubmit}
                  className='border-bottom mb-3 pb-3'
                >
                  <Form.Group>
                    <Form.Label>
                      Company Name <span className='text-danger'>(*)</span>
                    </Form.Label>

                    <Form.Control
                      type='text'
                      name='companyName'
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        !!formik.errors.companyName &&
                        formik.touched.companyName
                      }
                      disabled={companyName ? true : false}
                    />

                    <Form.Control.Feedback type='invalid'>
                      {formik.errors.companyName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      Work Email <span className='text-danger'>(*)</span>
                    </Form.Label>

                    <Form.Control
                      name='workEmail'
                      value={formik.values.workEmail}
                      onChange={formik.handleChange}
                      onBlur={(event: any) => {
                        validateEmail(event);
                        formik.handleBlur;
                      }}
                      isInvalid={
                        !!formik.errors.workEmail && formik.touched.workEmail
                      }
                      disabled={workEmail ? true : false}
                    />

                    <Form.Control.Feedback type='invalid'>
                      {formik.errors.workEmail}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      First Name <span className='text-danger'>(*)</span>
                    </Form.Label>

                    <Form.Control
                      name='firstName'
                      value={formik.values.firstName}
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

                  <Form.Group>
                    <Form.Label>
                      Last Name <span className='text-danger'>(*)</span>
                    </Form.Label>

                    <Form.Control
                      name='lastName'
                      value={formik.values.lastName}
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

                  <Form.Group>
                    <Form.Label>
                      Phone Number <span className='text-danger'>(*)</span>
                    </Form.Label>

                    <NumberFormat
                      name='phone'
                      value={formik.values.phone}
                      format='###-###-####'
                      mask=' '
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      customInput={Form.Control}
                      isInvalid={!!formik.errors.phone && formik.touched.phone}
                    />

                    <Form.Control.Feedback type='invalid'>
                      {formik.errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant='primary'
                    className='btn-block'
                    type='submit'
                    disabled={formik.isSubmitting || loading}
                  >
                    {TEXT_SIGN_UP}
                  </Button>
                </Form>

                <Link to={ROUTE_LOGIN} className='btn btn-secondary btn-block'>
                  Already have an Under account? {TEXT_SIGN_IN}
                </Link>

                <Link
                  to={ROUTE_FORGOT_PASSWORD}
                  className='btn btn-link btn-block'
                >
                  {infoMessage['forgot/link']}
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
