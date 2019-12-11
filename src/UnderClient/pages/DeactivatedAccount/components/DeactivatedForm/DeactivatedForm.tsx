import * as React from 'react';
import { Props } from './types';
import { IMAGE_DEACTIVATED_ACCOUNT } from 'Shared/constants/images';
import { Link } from 'react-router-dom';
import './DeactivatedForm.scss';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { UserRepository } from 'Shared/repositories/UserRepository';
import { ROUTE_LOGIN } from 'Shared/routers/routes';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import { Util } from 'Shared/helpers/Utils';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { USER_COMPANY_NAME } from 'Shared/constants/cookieKey';

const DeactivatedForm = (props: Props) => {
  const userRepository = useInjection<UserRepository>('userRepository');
  const util = useInjection<Util>('util');
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');

  const companyName = cookieProvider.get(USER_COMPANY_NAME);

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

  return (
    <>
      <h4>Your Account Has Been Deactivated</h4>
      <p>We're sorry for the inconvenience</p>
      <p className='img mb-4'>
        <img
          src={IMAGE_DEACTIVATED_ACCOUNT}
          width='100'
          height='100'
          alt='Deactivated Account'
        />
      </p>
      <p className='mb-4'>
        All your features on Under Project are blocked and inaccessible
        temporarily due to Admin of <b>{companyName}</b> has deactivated your
        account or your organization reached the quota of users according to
        your organization membership.
      </p>
      <p>
        If you think your account was deactivated by mistake, please contact
        your Admin of <b>{companyName}</b> to get help.
      </p>

      <div className='d-flex justify-content-end'>
        <Link to='' onClick={logout} className='text-primary'>
          Log out
        </Link>
      </div>
    </>
  );
};

export default DeactivatedForm;
