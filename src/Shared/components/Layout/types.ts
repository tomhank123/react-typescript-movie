export interface Props {
  children: any;
  className?: string;
  documentTitle?: string;
  hideHeader?: boolean;
  hideSidebar?: boolean;
  showStoreLocation?: boolean;
  onStoreLocationChange?(): void;
}

export interface State {}
