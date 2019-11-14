import * as React from "react";
import { TEXT_DOCUMENT_TITLE } from "Shared/constants/texts";
import Header from "../Header/Header";
import Sidebar from "../Sidebar";
import "./Layout.scss";
import { Props } from "./types";

const Layout = (props: Props) => {
  const {
    children,
    className = "",
    hideHeader = false,
    hideSidebar = false
  } = props;

  document.title = `${props.documentTitle} - ${TEXT_DOCUMENT_TITLE}`;

  const layoutClasses = ["layout", "full-height", className];

  const contentWrapperClasses = [
    "full-height",
    !hideSidebar ? "content-wrapper" : ""
  ];

  return (
    <div className={layoutClasses.join(" ")}>
      {!hideHeader && <Header />}
      {!hideSidebar && <Sidebar />}

      <div className={contentWrapperClasses.join(" ")}>{children}</div>
    </div>
  );
};

export default Layout;
