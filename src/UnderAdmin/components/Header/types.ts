import { PropsBase } from 'Shared/types/propsBase';

export interface Props extends PropsBase {
  pageTitle?: string;
  showBackButton?: boolean;
  onShowSidebar?(): void;
  showSidebar?: boolean;
}
export interface State {}
