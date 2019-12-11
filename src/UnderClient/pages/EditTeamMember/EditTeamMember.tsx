import { useFormik } from 'formik';
import * as React from 'react';
import { Button, Col, Form, Navbar } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import Layout from 'UnderClient/components/Layout/Layout';
import {
  TEXT_EDIT_TEAM_MEMBER,
  TEXT_MY_PROFILE_DETAILS
} from 'Shared/constants/texts';
import useModal from 'Shared/hooks/UseModal/useModal';
import PasswordForm from './components/PasswordForm';
import './EditTeamMember.scss';
import { Props, State } from './types';
import { validationSchema } from './validation';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { infoMessage } from 'Shared/constants/infoMessage';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import { TeamRepository } from 'UnderClient/repositories/TeamRepository';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { GetMemberDetailRequest } from 'UnderClient/types/team/getMemberDetailRequest';
import { UserRole } from 'Shared/constants/userRole';
import { UserStatus } from 'Shared/constants/userStatus';
import { UpdateMemberProfileRequest } from 'UnderClient/types/team/updateMemberProfileRequest';
import { useSpinner } from 'Shared/contexts/SpinnerContext';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import {
  USER_ID,
  USER_FIRST_NAME,
  USER_LAST_NAME
} from 'Shared/constants/cookieKey';
import { Util } from 'Shared/helpers/Utils';
import { default as PasswordMyAccount } from '../EditAccount/components/PasswordForm';
import { UserRepository } from 'Shared/repositories/UserRepository';
import { ROUTE_LOGIN } from 'Shared/routers/routes';

const initialState: State = {
  workEmail: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  role: '',
  status: '',
  companyName: ''
};

const EditTeamMember = (props: Props) => {
  const teamRepository = useInjection<TeamRepository>('teamRepository');
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');
  const userRepository = useInjection<UserRepository>('userRepository');
  const util = useInjection<Util>('util');

  const {
    show: showChangePassword,
    Modal: ModalChangePassword,
    hide: hideChangePasswordModal
  } = useModal();

  const spinner = useSpinner();

  const logout = () => {
    userRepository
      .logOut()
      .catch(error => {
        useAlert.fire({
          icon: 'error',
          title: 'Error!',
          html: util.cognitoMessage(error.code),
          showConfirmButton: true,
          confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
        });
      })
      .finally(() => {
        props.history.replace(ROUTE_LOGIN);
      });
  };

  const companyId = props.match.params.companyId;
  const memberId = props.match.params.memberId;
  const checkMyProfile =
    memberId === cookieProvider.get(USER_ID) ? true : false;
  const [roleMemberState, setRoleMemberState] = React.useState<string>('');
  const [fullNameMember, setFullNameMember] = React.useState<string>('');

  React.useEffect(() => {
    spinner.open();
    const requestMemberDetail: GetMemberDetailRequest = { companyId, memberId };
    teamRepository
      .getMemberDetail(requestMemberDetail)
      .then(response => {
        const {
          firstName,
          lastName,
          status,
          role,
          workEmail,
          companyName,
          phoneNumber
        } = response;
        setRoleMemberState(role);
        setFullNameMember(firstName + ' ' + lastName);
        formik.setValues({
          firstName,
          lastName,
          status,
          role,
          workEmail,
          companyName,
          phoneNumber
        });
      })
      .finally(() => {
        spinner.close();
      });
  }, []);

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: initialState,
    onSubmit: values => {
      spinner.open();
      values.phoneNumber = values.phoneNumber.replace(/-/g, '');
      const requestMemberProfile: UpdateMemberProfileRequest = {
        ...values,
        companyId,
        memberId
      };
      teamRepository
        .updateProfileMember(requestMemberProfile)
        .then(response => {
          useAlert
            .fire({
              icon: 'success',
              title: 'Success!',
              html: infoMessage['updateMemberProfile/success'],
              showConfirmButton: true,
              confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
            })
            .then(() => {
              cookieProvider.set(
                USER_FIRST_NAME,
                requestMemberProfile.firstName
              );
              cookieProvider.set(USER_LAST_NAME, requestMemberProfile.lastName);
              const current = props.location.pathname;
              props.history.replace(current);
            });
        })
        .catch(error => {
          useAlert.fire({
            icon: 'error',
            title: 'Error!',
            html: infoMessage['updateMemberProfile/fail'],
            showConfirmButton: true,
            confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
          });
        })
        .finally(() => {
          spinner.close();
        });
    }
  });

  const setMemberRole = (role: string) => {
    formik.setFieldValue('role', role);
  };

  const setStatus = (status: string) => {
    const setStatus =
      status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE;
    formik.setFieldValue('status', setStatus);
  };

  return (
    <Layout
      documentTitle={TEXT_EDIT_TEAM_MEMBER}
      className='edit-member-module'
      showBackButton={!checkMyProfile}
      pageTitle={
        checkMyProfile ? TEXT_MY_PROFILE_DETAILS : TEXT_EDIT_TEAM_MEMBER
      }
    >
      <Navbar bg='white' className='px-4 py-3 sticky-top'>
        <span className='text-md text-uppercase text-muted top-bar-title'>
          {fullNameMember}
        </span>

        <span className='text-muted text-capitalize border-left pl-2 ml-2 top-bar-count'>
          {util.replaceRole(roleMemberState, true)}
        </span>

        <div className='ml-auto d-flex align-items-center top-bar-filter'>
          <Button
            variant='secondary'
            className='mx-2'
            onClick={() => showChangePassword()}
          >
            Change Password
          </Button>
          <Button
            variant='primary'
            type='button'
            onClick={() => formik.handleSubmit()}
          >
            Save
          </Button>
        </div>
      </Navbar>

      <div className='p-4'>
        <div className='border bg-white p-4'>
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
                  value={formik.values.firstName}
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
                  value={formik.values.lastName}
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
                  Email&nbsp;<span className='text-danger'>(*)</span>
                </Form.Label>

                <Form.Control
                  type='email'
                  placeholder='Email'
                  value={formik.values.workEmail}
                  name='workEmail'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!formik.errors.workEmail && formik.touched.workEmail
                  }
                  readOnly={true}
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
                  name='phoneNumber'
                  value={formik.values.phoneNumber}
                  format='###-###-####'
                  mask=' '
                  placeholder=''
                  onChange={formik.handleChange}
                  customInput={Form.Control}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!formik.errors.phoneNumber && formik.touched.phoneNumber
                  }
                />

                <Form.Control.Feedback type='invalid'>
                  {formik.errors.phoneNumber}
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
                  value={formik.values.companyName}
                  readOnly={true}
                />
              </Form.Group>
              <Form.Group
                className={`px-2 mb-4 ${checkMyProfile ? 'd-none' : ''}`}
                as={Col}
                md='4'
              >
                <Form.Label>Role</Form.Label>
                <div>
                  <Form.Check
                    custom
                    inline
                    checked={formik.values.role === UserRole.CLIENT_USER}
                    type='radio'
                    label='Standard'
                    name='role'
                    id='memberRoleStandard'
                    onClick={() => setMemberRole(UserRole.CLIENT_USER)}
                  />
                  <Form.Check
                    custom
                    checked={formik.values.role === UserRole.CLIENT_ADMIN}
                    inline
                    type='radio'
                    label='Admin'
                    name='role'
                    id='memberRoleAdmin'
                    onClick={() => setMemberRole(UserRole.CLIENT_ADMIN)}
                  />
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row className='mx--2'>
              <Form.Group
                className={`px-2 mb-4 ${checkMyProfile ? 'd-none' : ''}`}
                as={Col}
                md='4'
              >
                <Form.Check
                  custom
                  inline
                  type='checkbox'
                  checked={formik.values.status === UserStatus.ACTIVE}
                  label='Is Active'
                  name='memberIsActived'
                  id='memberIsActived'
                  onClick={() => setStatus(formik.values.status)}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </div>
      </div>

      <ModalChangePassword
        className='modal-edit-member'
        hideHeader
        hideFooter
        isCentered
      >
        {checkMyProfile ? (
          <PasswordMyAccount
            onClose={hideChangePasswordModal}
            onLogout={logout}
            {...props}
          />
        ) : (
          <PasswordForm onClose={hideChangePasswordModal} {...props} />
        )}
      </ModalChangePassword>
    </Layout>
  );
};

export default EditTeamMember;
