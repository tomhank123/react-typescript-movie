import * as React from 'react';
import { Props } from './type';

const AuthContext = React.createContext<{
  pw: string;
  clear(): void;
  set(pw: string): void;
}>({
  pw: '',
  clear: () => {},
  set: pw => {}
});

const AuthContextProvider: React.FC<Props> = (props: Props) => {
  const [pw, setPw] = React.useState<string>('');

  const set = (pass: string) => {
    setPw(pass);
  };

  const clear = () => {
    setPw('');
  };

  return (
    <AuthContext.Provider value={{ pw, clear, set }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
export const useAuth = () => React.useContext(AuthContext);
