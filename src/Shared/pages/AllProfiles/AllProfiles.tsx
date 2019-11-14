import * as React from "react";
import { Navbar, Dropdown, Form, Table } from "react-bootstrap";
import Scrollbar from "react-scrollbars-custom";
import "./AllProfiles.scss";
import Layout from "Shared/components/Layout/Layout";
import { TEXT_PROFILE } from "Shared/constants/texts";
import { Props } from "./types";
import TableItems from "./components/TableItems";

const tableListItems = require("./tableList.json");

const AllAccounts = (props: Props) => {
  return (
    <Layout className="all-profiles-page" documentTitle={TEXT_PROFILE}>
      <Navbar bg="white" className="px-4 py-3 sticky-top">
        <span className="text-md text-uppercase text-muted top-bar-title">
          All {TEXT_PROFILE}
        </span>
        <span className="text-muted text-capitalize border-left pl-2 ml-2 top-bar-count">
          11 Accounts
        </span>
        <div className="ml-auto d-flex align-items-center top-bar-filter">
          <Dropdown className="px2">
            <Dropdown.Toggle as="a" className="nav-link" id="action-top-bar-1">
              Subscription Level
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Send Form Link</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Embed</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Form.Group className="form-group-search mb-0">
            <span className="btn btn-icon">
              <i className="fal fa-search"></i>
            </span>
            <Form.Control type="text" placeholder="Search" />
          </Form.Group>
        </div>
      </Navbar>
      <div className="py-2 px-4">
        <Scrollbar className="table-fixed table-responsive">
          <Table className="table-parent" bordered>
            <thead>
              <tr>
                <th>Profiles name: </th>
                <th>End users</th>
                <th>Forms</th>
                <th>Subscription Level</th>
                <th>Last Active</th>
                <th>Statuses</th>
              </tr>
            </thead>
            <tbody>
              {tableListItems &&
                tableListItems.map((item: any, index: number) => (
                  <TableItems
                    key={index}
                    id={item.id}
                    name={item.title}
                    listItemChilds={item.listItemChilds}
                  />
                ))}

              {!tableListItems.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-muted text-uppercase text-no-result"
                  >
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Scrollbar>
      </div>
    </Layout>
  );
};

export default AllAccounts;
