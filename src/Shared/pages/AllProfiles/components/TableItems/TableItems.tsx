import * as React from "react";
import "./TableItems.scss";
import { Button, Collapse, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Props } from "./types";

const TableItems = (props: Props) => {
  // const [open, setOpen] = React.useState(false);
  const [idItem, setIdItem] = React.useState(0);

  const { name, listItemChilds, id } = props;
  const openItem = idItem !== 0;

  return (
    <>
      <tr>
        <td>
          <Button
            onClick={() => setIdItem(id)}
            aria-controls={`user-profile-${id}`}
            aria-expanded={openItem}
            variant="primary"
            {...(listItemChilds ? {} : { disabled: true })}
            className={[
              `btn-icon mr-2`,
              listItemChilds && openItem ? "open" : ""
            ].join(" ")}
          >
            <i className="fal fa-angle-down"></i>
          </Button>
          <Link to="#" className="text-underline text-hover">
            {name}
          </Link>
        </td>
        <td>63</td>
        <td>1</td>
        <td>1</td>
        <td>11/19/2019</td>
        <td>
          <span className="badge-statuses badge-statuses-approved mr-2">1</span>
          <span className="badge-statuses badge-statuses-pending mr-2">1</span>
          <span className="badge-statuses badge-statuses-denied mr-2">1</span>
        </td>
      </tr>

      {listItemChilds && (
        <tr className="child">
          <td className="child p-0" colSpan={6}>
            <Collapse in={openItem}>
              <div id={`user-profile-${id}`}>
                <Table className="table-child m-0" bordered>
                  <thead>
                    <tr>
                      <th colSpan={2}>Form </th>
                      <th>Created</th>
                      <th>Last Modified</th>
                      <th>Last activity</th>
                      <th className="text-center w-120">
                        <span className="badge-status badge-status-approved">
                          Approved
                        </span>
                      </th>
                      <th className="text-center w-120">
                        <span className="badge-status badge-status-pending">
                          Pending
                        </span>
                      </th>
                      <th className="text-center w-120">
                        <span className="badge-status badge-status-denied">
                          Denied
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItemChilds.map((item, index) => (
                      <tr key={`form-${index}`}>
                        <td colSpan={2}>
                          <Link to="#" className="text-hover text-underline">
                            {item.formTitle}
                          </Link>
                        </td>
                        <td>
                          <span className="label">11/28/2019</span>
                        </td>
                        <td>
                          <span className="label">11/28/2019 </span>
                        </td>
                        <td>
                          <span className="label">11/28/2019</span>
                        </td>
                        <td className="text-center w-120">2</td>
                        <td className="text-center w-120">4</td>
                        <td className="text-center w-120">3</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Collapse>
          </td>
        </tr>
      )}
    </>
  );
};

export default TableItems;
