import * as React from 'react';
import './TableItems.scss';
import { Button, Collapse, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Props } from './types';
const lowerCase = require('lodash/lowerCase');

const TableItems = (props: Props) => {
  const [openItem, setShowItem] = React.useState(false);

  const { name, listItemChilds, id } = props;

  const handleShow = () => {
    return setShowItem(!openItem);
  };

  return (
    <>
      <tr>
        <td className='col-name cursor-pointer' onClick={handleShow}>
          <Button
            aria-controls={`user-profile-${id}`}
            aria-expanded={openItem}
            variant='primary'
            {...(listItemChilds ? { disabled: false } : { disabled: true })}
            className={[
              `btn-icon mr-2 float-left`,
              listItemChilds && openItem ? 'open' : ''
            ].join(' ')}
          >
            <i className='fal fa-angle-down'></i>
          </Button>
          <span>{name}</span>
        </td>
        <td className='col-appliction'>63</td>
        <td className='col-form'>1</td>
        <td className='col-status'>
          <span className='badge-statuses badge-statuses-approved mr-2'>1</span>
          <span className='badge-statuses badge-statuses-pending mr-2'>1</span>
          <span className='badge-statuses badge-statuses-denied mr-2'>1</span>
        </td>
        <td className='col-date'>11/19/2019</td>
      </tr>

      {listItemChilds && (
        <tr className='child'>
          <td className='child p-0' colSpan={6}>
            <Collapse in={openItem}>
              <div id={`user-profile-${id}`}>
                <Table className='table-child m-0' bordered>
                  <thead>
                    <tr>
                      <th className='col-form-title'>Form </th>
                      <th className='col-form-name'>Name</th>
                      <th className='col-contact'>Contact</th>
                      <th className='col-status'>Status</th>
                      <th className='col-date'>Date Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItemChilds.map((item, index) => (
                      <tr key={`form-${index}`}>
                        <td className='col-form-title'>
                          <Link to='#' className='text-hover text-underline'>
                            {item.formTitle}
                          </Link>
                        </td>
                        <td className='col-form-name'>
                          <Link to='#' className='text-hover text-underline'>
                            Maurice H.
                          </Link>
                        </td>
                        <td className='col-contact'>912-753-0596</td>
                        <td className='col-status text-center'>
                          {item.status ? (
                            <span
                              className={`badge-status badge-status-${lowerCase(
                                item.status
                              )} text-uppercase`}
                            >
                              {item.status}
                            </span>
                          ) : (
                            ' '
                          )}
                        </td>
                        <td className='col-date'>11/19/2019</td>
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
