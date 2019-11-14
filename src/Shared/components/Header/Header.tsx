import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMAGE_LOGO } from "Shared/constants/images";
import { TEXT_DOCUMENT_TITLE, TEXT_LOG_OUT } from "Shared/constants/texts";
import { ROUTE_HOME } from "Shared/routers/routes";
import "./Header.scss";
import { Props } from "./types";

const Header = (props: Props) => {
  return (
    <header className="header-component d-flex border-bottom">
      <div className="block block-logo border-right navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to={ROUTE_HOME} className="logo nav-link p-0">
              <img src={IMAGE_LOGO} alt={TEXT_DOCUMENT_TITLE} />
            </Link>
          </li>
        </ul>
      </div>
      <nav className="main-header navbar navbar-expand bg-white navbar-light flex-fill px-4">
        <ul className="navbar-nav">
          <li className="nav-item nav-item-title-page">Admin Tools</li>
        </ul>

        <ul className="navbar-nav ml-auto d-flex align-items-center">
          <Dropdown as="li" className="nav-item">
            <Dropdown.Toggle
              as="a"
              className="nav-link"
              id="user-menu"
              split={false}
            >
              Administrator
              <span className="avatar">
                &nbsp;<i className="fas fa-user-circle"></i>
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => {}}>{TEXT_LOG_OUT}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
