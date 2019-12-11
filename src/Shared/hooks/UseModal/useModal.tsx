import * as React from 'react';
import ModalDialog from '../../components/ModalDialog/ModalDialog';
import { Props } from './types';

const useModal = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const Modal = (props: Props) => {
    const { children } = props;

    return (
      <React.Fragment>
        {isVisible && <ModalDialog {...props} closeModal={hide}>{children}</ModalDialog>}
      </React.Fragment>
    );
  };

  return {
    show,
    hide,
    Modal,
  };
};

export default useModal;
