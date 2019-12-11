import * as React from 'react';
import './ModalDialog.scss';
import { Props } from './types';
import { Modal, Button } from 'react-bootstrap';
import { TEXT_MODAL_CLOSE, TEXT_MODAL_SAVE } from 'Shared/constants/texts';

const ModalDialog = React.memo((props: Props) => {
  const {
    children,
    closeModal,
    hideHeader = false,
    hideFooter = false,
    isCentered = false,
    modalTitle = '',
    modalBackdrop = true,
    onSave,
    onClose = closeModal,
    className = ''
  } = props;

  const ModalDialogHeader = () => (
    <Modal.Header closeButton>
      <Modal.Title>{modalTitle}</Modal.Title>
    </Modal.Header>
  );

  const ModalDialogFooter = () => (
    <Modal.Footer>
      <Button variant='secondary' onClick={onClose}>
        {TEXT_MODAL_CLOSE}
      </Button>
      {onSave && <Button variant='primary' onClick={onSave}>
        {TEXT_MODAL_SAVE}
      </Button>}
    </Modal.Footer>
  );

  return (
    <Modal
      className={className}
      show={true}
      onHide={closeModal}
      centered={isCentered}
      backdrop={modalBackdrop}
    >
      {!hideHeader && <ModalDialogHeader />}
      <Modal.Body>{children}</Modal.Body>
      {!hideFooter && <ModalDialogFooter />}
    </Modal>
  );
});

export default ModalDialog;
