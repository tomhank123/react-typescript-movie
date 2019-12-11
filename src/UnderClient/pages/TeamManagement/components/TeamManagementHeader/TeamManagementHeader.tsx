import * as React from 'react';
import { Dropdown, Form, Navbar } from 'react-bootstrap';
import { Util } from 'Shared/helpers/Utils';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { Props } from './types';
import {
  SEARCH_MINIMUM_CHARS,
  SEARCH_DEBOUNCE
} from 'Shared/constants/setting';
import { UserStatus } from 'Shared/constants/userStatus';
const debounce = require('lodash/debounce');
const capitalize = require('lodash/capitalize');

const TeamManagementHeader = (props: Props) => {
  const util = useInjection<Util>('util');

  const [status, setStatus] = React.useState<UserStatus>();

  const { totalMembers } = props;

  const onChangeFilterStatus = (status: UserStatus) => {
    setStatus(status);
    props.onChangeFilterStatus(status);
  };

  const onChangeKeyword = (keyword: string) => {
    if (!keyword || keyword.length >= SEARCH_MINIMUM_CHARS) {
      props.onChangeKeyword(keyword);
    }
  };

  const onChangeKeywordDebounce = debounce(onChangeKeyword, SEARCH_DEBOUNCE);

  const userStatusCapitalize = capitalize(
    status === UserStatus.INVITED ? UserStatus.INVITED_SENT : status
  );

  return (
    <div className='team-management-header-module'>
      <Navbar bg='white' className='px-4 py-3 sticky-top'>
        <span className='text-md text-uppercase text-muted top-bar-title'>
          USERS
        </span>

        <span className='text-muted text-capitalize border-left pl-2 ml-2 top-bar-count'>
          {totalMembers} {'User' + util.pluralize(totalMembers)}
        </span>

        <div className='ml-auto d-flex align-items-center top-bar-filter'>
          <Dropdown className='px2'>
            <Dropdown.Toggle as='a' className='nav-link' id='action-top-bar-1'>
              {userStatusCapitalize || 'All Status'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => onChangeFilterStatus(UserStatus.UNSET)}
              >
                All Status
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onChangeFilterStatus(UserStatus.ACTIVE)}
              >
                Active
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onChangeFilterStatus(UserStatus.INACTIVE)}
              >
                Inactive
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onChangeFilterStatus(UserStatus.INVITED)}
              >
                Invite Sent
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Form.Group className='form-group-search mb-0'>
            <span className='btn btn-icon'>
              <i className='fal fa-search'></i>
            </span>

            <Form.Control
              type='text'
              placeholder='Search'
              onChange={(event: any) =>
                onChangeKeywordDebounce(event.target.value)
              }
            />
          </Form.Group>
        </div>
      </Navbar>
    </div>
  );
};

export default TeamManagementHeader;
