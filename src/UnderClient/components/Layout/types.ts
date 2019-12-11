export interface Props {
  children: any;
  className?: string;
  documentTitle?: string;
  pageTitle?: string;
  hideHeader?: boolean;
  hideSidebar?: boolean;
  showBackButton?: boolean;
  showStoreLocation?: boolean;
  onStoreLocationChange?(): void;
}

export interface State {}
