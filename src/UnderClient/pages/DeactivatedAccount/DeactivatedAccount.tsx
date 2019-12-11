import * as React from 'react';

import DeactivatedForm from './components/DeactivatedForm';
import './DeactivatedAccount.scss';
import { Props } from './types';
import { Modal } from 'react-bootstrap';

const DeactivatedAccount = (props: Props) => {
  return (
    <div className='deactivated-account-module'>
      <Modal
        className='modal-deactivated-account'
        backdrop='static'
        backdropClassName='modal-backdrop-bg'
        centered
        show={true}
      >
        <Modal.Body>
          <DeactivatedForm {...props} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeactivatedAccount;
