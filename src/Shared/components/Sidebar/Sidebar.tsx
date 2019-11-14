import * as React from "react";
import { Accordion, Card } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { IMAGE_CARET_DOWN } from "Shared/constants/images";
import {
  TEXT_ADMIN_TOOLS,
  TEXT_APPLICATIONS,
  TEXT_CREATE_FORMS,
  TEXT_MENU,
  TEXT_OVERVIEW,
  TEXT_PROFILE,
  TEXT_VIEW_ALL_FORMS
} from "Shared/constants/texts";
import {
  ROUTE_ALL_FORM,
  ROUTE_ALL_PROFILE,
  ROUTE_APPLICATIONS,
  ROUTE_HOME,
  ROUTE_OVERVIEW
} from "Shared/routers/routes";
import "./Sidebar.scss";
import { Props } from "./types";

const Sidebar = (props: Props) => {
  const [openMenu, setOpenMenu] = React.useState(0);

  const { pathname = "" } = props.location;

  return (
    <aside className="sidebar-component main-sidebar main-sidebar-notification border-right pt-1">
      <div className="sidebar mb-3 ">
        <nav className="block block-sidebar-menu">
          <h3 className="block-title">{TEXT_MENU}</h3>
          <ul
            className="nav nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link
                to={ROUTE_OVERVIEW}
                className={[
                  "nav-link",
                  pathname === ROUTE_OVERVIEW ? "active" : ""
                ].join(" ")}
              >
                <i className="nav-icon pr-3 fas fa-home-alt"></i>
                {TEXT_OVERVIEW}
              </Link>
              {/* <Link to={ROUTE_HOME} className={['nav-link', pathname === (ROUTE_HOME) ? 'active' : ''].join(' ')}
              >
                <i className="nav-icon pr-3 fas fa-home-alt"></i>
                {TEXT_OVERVIEW}
              </Link> */}
            </li>
            <li className="nav-item">
              <Link
                to={ROUTE_APPLICATIONS}
                className={[
                  "nav-link",
                  pathname.includes(ROUTE_APPLICATIONS) ? "active" : ""
                ].join(" ")}
              >
                <i className="nav-icon pr-3 fas fa-chart-bar"></i>
                {TEXT_APPLICATIONS}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={ROUTE_ALL_PROFILE}
                className={[
                  "nav-link",
                  pathname === ROUTE_ALL_PROFILE ? "active" : ""
                ].join(" ")}
              >
                <i className="nav-icon pr-3 fas fa-chart-bar"></i>
                Under Client {TEXT_PROFILE}
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="block block-sidebar-menu expanded">
          <Accordion
            defaultActiveKey="0"
            onSelect={() => setOpenMenu(openMenu === 0 ? 1 : 0)}
          >
            <Accordion.Toggle
              aria-expanded="false"
              className={openMenu === 0 ? "active" : ""}
              as={Card.Header}
              eventKey="0"
            >
              <h3 className="block-title">
                {TEXT_ADMIN_TOOLS}
                <img
                  src={IMAGE_CARET_DOWN}
                  width="8"
                  height="8"
                  alt="caret-down"
                />
              </h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <ul
                className="nav nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link to={ROUTE_HOME} className="nav-link">
                    <i className="nav-icon pr-3 fas fa-star"></i>
                    {TEXT_CREATE_FORMS}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={ROUTE_ALL_FORM}
                    className={[
                      "nav-link",
                      pathname === ROUTE_ALL_FORM ? "active" : ""
                    ].join(" ")}
                  >
                    <i className="nav-icon pr-3 fas fa-suitcase"></i>
                    {TEXT_VIEW_ALL_FORMS}
                  </Link>
                </li>
              </ul>
            </Accordion.Collapse>
          </Accordion>
        </nav>
      </div>

      <div className="block block-notifications">
        <h3 className="block-title mb-3">Notifications</h3>
        <div className="list-group">
          <div className="list-group-item ">
            <p className="mb-0">Joe's Plumbing</p>
            <small className="text-muted">
              <i className="status status-error"></i> Has Been Denied
            </small>
          </div>
          <div className="list-group-item ">
            <p className="mb-0">Joe's Plumbing</p>
            <small className="text-muted"> New Message Received</small>
          </div>
          <div className="list-group-item">
            <p className="mb-0">Joe's Plumbing</p>
            <small className="text-muted">
              <i className="status status-success"></i> Has Been Approved
            </small>
          </div>
        </div>
        <div className="block-footer py-2">
          <Link to={ROUTE_HOME} className="nav-link nav-link-other">
            <small className="text-underline">
              {" "}
              Under Terms &amp; Conditions
            </small>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default withRouter(Sidebar);
