import * as React from 'react';
import { Props, State } from './types';
import { Navbar, Dropdown, Form } from 'react-bootstrap';
import { TEXT_APPLICATIONS } from 'Shared/constants/texts';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './custom-datepicker.scss';
import { ApplicationStatus } from 'Shared/constants/applicationStatus';
const capitalize = require('lodash/capitalize');

const ApplicationsHeader = (props: Props) => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [focusedInput, setFocusedInput] = React.useState(null);
  const [status, setStatus] = React.useState<ApplicationStatus>();

  const handleDatesChange = (option: State) => {
    setStartDate(option.startDate);
    setEndDate(option.endDate);
  };

  const handleFocusedInput = (focusedInput: any) => {
    setFocusedInput(focusedInput);
  };

  const onChangeFilterStatus = (status: ApplicationStatus) => {
    setStatus(status);
    props.onChangeFilterStatus(status);
  };

  const applicationStatusCapitalize = capitalize(status);

  return (
    <Navbar bg='white' className='px-4 py-3 sticky-top navbar-application'>
      <span className='text-md text-uppercase text-muted top-bar-title'>
        All {TEXT_APPLICATIONS}
      </span>
      <span className='text-muted text-capitalize border-left pl-2 ml-2 top-bar-count'>
        11 Accounts
      </span>
      <div className='ml-auto d-flex align-items-center top-bar-filter'>
        <DateRangePicker
          startDate={startDate}
          startDateId='startDateId'
          endDate={endDate}
          endDateId='endDateId'
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={handleFocusedInput}
          numberOfMonths={1}
          small
          showDefaultInputIcon
        />
        <Dropdown className='px2'>
          <Dropdown.Toggle as='a' className='nav-link' id='action-top-bar-1'>
            Form Type
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>Edit</Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Send Form Link</Dropdown.Item>
            <Dropdown.Item href='#/action-3'>Embed</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className='px2'>
          <Dropdown.Toggle as='a' className='nav-link' id='action-top-bar-1'>
            {applicationStatusCapitalize || 'All Status'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => onChangeFilterStatus(ApplicationStatus.UNSET)}
            >
              All Status
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onChangeFilterStatus(ApplicationStatus.APPROVED)}
            >
              Approved
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onChangeFilterStatus(ApplicationStatus.DENIED)}
            >
              Denied
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onChangeFilterStatus(ApplicationStatus.PENDING)}
            >
              Pending
            </Dropdown.Item>
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
