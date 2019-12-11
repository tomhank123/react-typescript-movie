import * as React from 'react';
import { withRouter } from 'react-router';
import { IMAGE_404, IMAGE_RAIN, IMAGE_LOGO } from 'Shared/constants/images';
import { Link } from 'react-router-dom';
import './404.scss';
import { ROUTE_HOME } from 'Shared/routers/routes';

const NotFound = () => {

  return (
    <div className='u404-module'>
      <img className='img-logo' src={IMAGE_LOGO} alt='logo' />
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-body text-center p-5'>
            <img
              className='mb-4 img-rain'
              src={IMAGE_RAIN}
              alt='RAIN'
              width='200px'
              height='200px'
            />
            <img
              className='mb-4 img-404'
              src={IMAGE_404}
              alt='404'
              width='235px'
              height='103px'
            />
            <h5 className='text-uppercase'>oops! nothing was found</h5>
            <p>
              <small>
                The page you are looking for might have been removed or it is
                temporarily unavailable
              </small>
            </p>
            <Link
              className='btn btn-primary mt-4'
              to={ROUTE_HOME}
              title='Return to Home Page'
            >
              Return to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(NotFound);
