import * as React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMAGE_LOGO } from 'Shared/constants/images';
import {
  TEXT_ACCOUNT_SETTINGS,
  TEXT_DOCUMENT_TITLE,
  TEXT_MANAGE_SUBSCRIPTION,
  TEXT_SALESFORCE_API,
  TEXT_SIGN_OUT,
  TEXT_TEAM_MANAGEMENT
} from 'Shared/constants/texts';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { UserRepository } from 'Shared/repositories/UserRepository';
import { ROUTE_HOME, ROUTE_LOGIN } from 'Shared/routers/routes';
import { Props } from './types';
import './Header.scss';
import {
  ROUTE_TEAM_MANAGEMENT,
  ROUTE_MEMBER_EDITED
} from 'UnderClient/routers/routes';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { Util } from 'Shared/helpers/Utils';
import { COMPANY_ID, USER_ROLE, USER_ID } from 'Shared/constants/cookieKey';
import { USER_FIRST_NAME, USER_LAST_NAME } from '../../../Shared/constants/cookieKey';
import { UserRole } from 'Shared/constants/userRole';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';

const Header = (props: Props) => {
  const userRepository = useInjection<UserRepository>('userRepository');
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');
  const util = useInjection<Util>('util');

  const companyId = cookieProvider.get(COMPANY_ID);
  const firstName = cookieProvider.get(USER_FIRST_NAME);
  const lastName = cookieProvider.get(USER_LAST_NAME);
  const userRole = cookieProvider.get(USER_ROLE);
  const memberId = cookieProvider.get(USER_ID);
  const fullName = firstName + ' ' + lastName;

  const teamMemberRouter = util.formatString(ROUTE_TEAM_MANAGEMENT, {
    companyId
  });

  const routeMemberEdit = util.formatString(ROUTE_MEMBER_EDITED, {
    companyId,
    memberId
  });

  const logout = () => {
    userRepository
      .logOut()
      .then(() => {
        props.history.replace(ROUTE_LOGIN);
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
  };
  const {
    pageTitle,
    showBackButton,
    onShowSidebar = () => {},
    showSidebar
  } = props;

  const onGoBack = () => {
    props.history.goBack();
  };

  const RetrievedBackButton = () => {
    if (!showBackButton) {
      return null;
    }

    return (
      <Button variant='secondary' className='mr-3' onClick={onGoBack}>
        <i className='fal fa-angle-left'></i>
      </Button>
    );
  };

  return (
    <header className='header-component d-flex border-bottom'>
      <div className='block block-logo border-right navbar'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link to={ROUTE_HOME} className='logo nav-link p-0'>
              <img src={IMAGE_LOGO} alt={TEXT_DOCUMENT_TITLE} />
            </Link>
            <a
              onClick={onShowSidebar}
              className={`nav-toggle ${showSidebar ? 'active' : ''}`}
            >
              <span></span>
            </a>
          </li>
        </ul>
      </div>
      <nav className='main-header navbar navbar-expand bg-white navbar-light flex-fill px-4'>
        <ul className='navbar-nav'>
          <li className='nav-item nav-item-title-page'>
            <RetrievedBackButton />
            {pageTitle}
          </li>
        </ul>

        <ul className='navbar-nav ml-auto d-flex align-items-center'>
          <Dropdown as='li' className='nav-item' alignRight>
            <Dropdown.Toggle
              as='a'
              className='nav-link'
              id='user-menu'
              split={false}
            >
              {fullName}
              <span className='avatar'>
                <i className='fas fa-user-circle'></i>
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={routeMemberEdit}>
                {TEXT_ACCOUNT_SETTINGS}
              </Dropdown.Item>
              {userRole === UserRole.CLIENT_ADMIN && (
                <Dropdown.Item to={teamMemberRouter} as={Link}>
                  {TEXT_TEAM_MANAGEMENT}
                </Dropdown.Item>
              )}
              {userRole === UserRole.CLIENT_ADMIN && (
                <Dropdown.Item onClick={() => {}}>
                  {TEXT_MANAGE_SUBSCRIPTION}
                </Dropdown.Item>
              )}
              {userRole === UserRole.CLIENT_ADMIN && (
                <Dropdown.Item onClick={() => {}}>
                  {TEXT_SALESFORCE_API}
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={logout}>{TEXT_SIGN_OUT}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
