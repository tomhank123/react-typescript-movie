import * as React from "react";
import { Container, interfaces } from "inversify";

const InversifyContext = React.createContext<{ container: Container | null }>({
  container: null
});

type Props = {
  container: Container;
  children: any;
};

export const DependencyInjectionProvider: React.FC<Props> = (props: Props) => {
  return (
    <InversifyContext.Provider value={{ container: props.container }}>
      {props.children}
    </InversifyContext.Provider>
  );
};

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const { container } = React.useContext(InversifyContext);

  if (!container) {
    throw new Error();
  }

  return container.get<T>(identifier);
}
