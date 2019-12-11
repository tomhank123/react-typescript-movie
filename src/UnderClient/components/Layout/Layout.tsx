import * as React from 'react';
import { withRouter } from 'react-router';
import { TEXT_DOCUMENT_TITLE } from 'Shared/constants/texts';
import { default as HeaderComponent } from 'UnderClient/components/Header';
import './Layout.scss';
import { Props } from './types';
import Sidebar from '../Sidebar';

const Header = withRouter(HeaderComponent);

const Layout = (props: Props) => {
  const {
    children,
    className = '',
    hideHeader = false,
    hideSidebar = false,
    pageTitle = '',
    showBackButton = false
  } = props;

  document.title = `${props.documentTitle} - ${TEXT_DOCUMENT_TITLE}`;

  const [showSidebar, setShowSidebar] = React.useState(true);

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const layoutClasses = [
    'layout',
    'full-height',
    className,
    showSidebar ? '' : 'hide-main-menu'
  ];

  const contentWrapperClasses = [
    'full-height',
    !hideSidebar ? 'content-wrapper' : ''
  ];

  return (
    <div className={layoutClasses.join(' ')}>
      {!hideHeader && (
        <Header
          pageTitle={pageTitle}
          onShowSidebar={handleShowSidebar}
          showSidebar={showSidebar}
          showBackButton={showBackButton}
        />
      )}
      {!hideSidebar && <Sidebar />}

      <div className={contentWrapperClasses.join(' ')}>{children}</div>
    </div>
  );
};

export default Layout;
