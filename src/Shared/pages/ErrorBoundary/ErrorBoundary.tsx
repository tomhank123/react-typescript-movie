import * as React from 'react';
import { Props, State } from './types';
import { IMAGE_LOGO, IMAGE_RAIN, IMAGE_500 } from 'Shared/constants/images';
import { Link } from 'react-router-dom';
import './ErrorBoundary.scss';
import { ROUTE_HOME } from 'Shared/routers/routes';

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);


    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div className='u500-module'>
          <img className='img-logo' src={IMAGE_LOGO} alt='logo' />
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-body text-center p-5'>
                <img className='mb-4 img-rain' src={IMAGE_RAIN} alt='RAIN' width='200px' height='200px' />
                <img className='mb-4 img-500' src={IMAGE_500} alt='404' width='229px' height='103px' />
                <h5 className='text-uppercase'>Sorry... Something went wrong :(</h5>
                <p className='text-left'>
                  <small>
                    We are experiencing an internal server problem and cannot fullfill the request right not.
                  <br />
                    Please try to refresh this page or fell free to contact us for help.
                  </small>
                </p>
                <details className='text-left' style={{ whiteSpace: 'pre-wrap' }}>
                  <span className='text-danger'> {this.state.error && this.state.error.toString()} </span>
                  <br />
                  <span>
                    {this.state.errorInfo.componentStack}
                  </span>
                </details>
                <Link
                  className='btn btn-primary mt-4'
                  to={ROUTE_HOME}
                  title='Tell Us about This Error'>
                  Tell Us about This Error
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
