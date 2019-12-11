import * as React from 'react';
import { Props } from './type';

const SpinnerContext = React.createContext<{
  show: boolean;
  open(): void;
  close(): void;
}>({
  show: false,
  open: () => {},
  close: () => {}
});

const SpinnerContextProvider: React.FC<Props> = (props: Props) => {
  const [show, setShow] = React.useState<boolean>(false);

  const open = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  return (
    <SpinnerContext.Provider value={{ show, close, open }}>
      {props.children}
    </SpinnerContext.Provider>
  );
};
export default SpinnerContextProvider;
export const useSpinner = () => React.useContext(SpinnerContext);
