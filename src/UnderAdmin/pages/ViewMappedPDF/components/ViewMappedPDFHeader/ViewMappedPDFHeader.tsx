import * as React from 'react';
import { Props } from './types';
import { Navbar, Dropdown, Form } from 'react-bootstrap';
import { TEXT_MAPPED_PDFS } from 'Shared/constants/texts';

const ApplicationsHeader = (props: Props) => {
  return (
    <Navbar bg='white' className='px-4 py-3 sticky-top navbar-application'>
      <span className='text-md text-uppercase text-muted top-bar-title'>
        All {TEXT_MAPPED_PDFS}
      </span>
      <span className='text-muted text-capitalize border-left pl-2 ml-2 top-bar-count'>
        3 PDFs
      </span>
      <div className='ml-auto d-flex align-items-center top-bar-filter'>
        <Dropdown className='px2'>
          <Dropdown.Toggle as='a' className='nav-link' id='action-top-bar-1'>
            Status
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>Edit</Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Send Form Link</Dropdown.Item>
            <Dropdown.Item href='#/action-3'>Embed</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Group className='form-group-search mb-0'>
          <span className='btn btn-icon'>
            <i className='fal fa-search'></i>
          </span>
          <Form.Control type='text' placeholder='Search' />
        </Form.Group>
      </div>
    </Navbar>
  );
};

export default ApplicationsHeader;
