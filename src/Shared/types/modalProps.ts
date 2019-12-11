export interface ModalProps {
  children?: React.ReactChild;
  hideHeader?: boolean;
  hideFooter?: boolean;
  isCentered?: boolean;
  modalBackdrop?: any;
  modalTitle?: string;
  className?: string;
  onSave?: () => void;
  onClose?: () => void;
}
