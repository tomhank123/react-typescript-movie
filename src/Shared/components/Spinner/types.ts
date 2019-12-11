export interface SpinnerState {
  show: boolean;
}

export interface SpinnerActions {
  show: () => void;
  hide: () => void;
}

export interface Props {
  open?: boolean;
  block?: boolean;
}
