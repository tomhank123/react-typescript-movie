import * as React from 'react';
import {
  Dropdown,
  Table,
  Form,
  Badge,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import Layout from 'UnderClient/components/Layout/Layout';
import {
  TEXT_TEAM_MANAGEMENT,
  STATUS_INACTIVE,
  STATUS_ACTIVE
} from 'Shared/constants/texts';
import FormInvitation from './components/FormInvitation';
import { Props, StatusMember, ErrorMember } from './types';
import { Link } from 'react-router-dom';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { TeamRepository } from 'UnderClient/repositories/TeamRepository';
import TeamManagementHeader from './components/TeamManagementHeader';
import { Util } from 'Shared/helpers/Utils';
import { FIRST_PAGE, PAGE_SIZE } from 'Shared/constants/setting';
import { UserStatus } from 'Shared/constants/userStatus';
import { TeamMemberType } from 'Shared/constants/teamMemberType';
import Scrollbar from 'react-scrollbars-custom';
import { COLOR_ALERT_CONFIRM_BUTTON } from 'Shared/constants/colors';
import useAlert from 'Shared/hooks/useAlert/useAlert';
import { infoMessage } from 'Shared/constants/infoMessage';
import { GetTeamMemberItemResponse } from 'UnderClient/types/team/getTeamMemberResponse';
import { GetTeamMemberRequest } from 'UnderClient/types/team/getTeamMemberRequest';
import { SetMemberStatusRequest } from 'UnderClient/types/team/setMemberStatusRequest';
import { CookieProvider } from 'Shared/providers/CookieProvider';
import { USER_EMAIL } from 'Shared/constants/cookieKey';
import { UserRole } from 'Shared/constants/userRole';
import { SetMemberRoleRequest } from 'UnderClient/types/team/setMemberRoleRequest';
const get = require('lodash/get');
import { ResendMemberInviteRequest } from 'UnderClient/types/team/resendMemberInviteRequest';
import { SpinnerBlock } from 'Shared/components/SpinnerBlock';
import { ROUTE_MEMBER_EDITED } from 'UnderClient/routers/routes';
import './TeamManagement.scss';
import { SortingColumn } from 'Shared/components/SortingColumn';
import { SortRecord } from 'Shared/components/SortingColumn/types';

const TeamManagement = (props: Props) => {
  const util = useInjection<Util>('util');
  const cookieProvider = useInjection<CookieProvider>('cookieProvider');
  const teamRepository = useInjection<TeamRepository>('teamRepository');

  const [members, setMembers] = React.useState<GetTeamMemberItemResponse[]>([]);
  const [totalMembers, setTotalMembers] = React.useState<number>(0);
  const [status, setStatus] = React.useState<UserStatus>();
  const [keyword, setKeyword] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(FIRST_PAGE);
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE);
  const [type] = React.useState<TeamMemberType>(TeamMemberType.UNSET);
  const [totalPage, setTotalPage] = React.useState<number>(FIRST_PAGE);
  const [sortBy, setSortBy] = React.useState<SortRecord>({
    name: '',
    sorting: ''
  });

  const [spinnerBlock, setSpinnerBlock] = React.useState<boolean>(true);

  const [reRenderMember, setReRenderMember] = React.useState<boolean>(false);

  const scrollbarRef = React.useRef(null);

  const companyId = props.match.params.companyId;

  const email = cookieProvider.get(USER_EMAIL);

  const teamMembers: GetTeamMemberRequest = {
    role: '',
    status: status,
    type: type,
    q: keyword,
    sort: sortBy.name,
    order: sortBy.sorting,
    page: page,
    pageSize: pageSize
  };

  const setMemberStatus = (memberId: string, status: string) => {
    const requestStatusMember: SetMemberStatusRequest = {
      companyId,
      memberId,
      status
    };
    teamRepository
      .setMemberStatus(requestStatusMember)
      .then(response => {
        useAlert
          .fire({
            icon: 'success',
            title: 'Success!',
            html: infoMessage['statusMember/success'],
            showConfirmButton: true,
            confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
          })
          .then(() => {
            setReRenderMember(!reRenderMember);
          });
      })
      .catch(error => {
        useAlert.fire({
          icon: 'error',
          title: 'Error!',
          html: infoMessage['statusMember/fail'],
          showConfirmButton: true,
          confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
        });
      });
  };

  const setMemberRole = (memberId: string, role: string) => {
    const requestRoleMember: SetMemberRoleRequest = {
      companyId,
      memberId,
      role
    };
    teamRepository
      .setMemberRole(requestRoleMember)
      .then(response => {
        useAlert
          .fire({
            icon: 'success',
            title: 'Success!',
            html: infoMessage['roleMember/success'],
            showConfirmButton: true,
            confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
          })
          .then(() => {
            setReRenderMember(!reRenderMember);
          });
      })
      .catch(error => {
        useAlert.fire({
          icon: 'error',
          title: 'Error!',
          html: infoMessage['roleMember/fail'],
          showConfirmButton: true,
          confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
        });
      });
  };

  const resendInviteMember = (memberId: string) => {
    const requestInviteMember: ResendMemberInviteRequest = {
      companyId,
      memberId
    };
    teamRepository
      .resendInviteMember(requestInviteMember)
      .then(response => {
        useAlert
          .fire({
            icon: 'success',
            title: 'Success!',
            html: infoMessage['resendInviteMember/success'],
            showConfirmButton: true,
            confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
          })
          .then(() => {
            setReRenderMember(!reRenderMember);
          });
      })
      .catch(error => {
        useAlert.fire({
          icon: 'error',
          title: 'Error!',
          html: infoMessage['resendInviteMember/fail'],
          showConfirmButton: true,
          confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
        });
      });
  };

  React.useEffect(() => {
    teamMembers.page = FIRST_PAGE;
    setSpinnerBlock(true);
    switch (status) {
      case UserStatus.INVITED:
        teamMembers.type = TeamMemberType.INVITATION;
        break;
      case UserStatus.ACTIVE:
        teamMembers.type = TeamMemberType.USER;
        break;
      case UserStatus.INACTIVE:
        teamMembers.type = TeamMemberType.USER;
        break;
      default:
        teamMembers.type = '';
    }
    teamMembers.status =
      status === UserStatus.INVITED ? UserStatus.UNSET : status;

    setPage(FIRST_PAGE);
    teamRepository
      .getTeamMembers(companyId, teamMembers)
      .then(responseMembers => {
        const totalPages = Math.ceil(responseMembers.totalCount / pageSize);
        setTotalPage(totalPages);
        setMembers(responseMembers.items);
        setTotalMembers(responseMembers.totalCount);
      })
      .finally(() => {
        setSpinnerBlock(false);
      });
  }, [status, keyword, sortBy, reRenderMember, scrollbarRef, pageSize, type]);

  React.useEffect(() => {
    if (page > 1) {
      setSpinnerBlock(true);
      switch (status) {
        case UserStatus.INVITED:
          teamMembers.type = TeamMemberType.INVITATION;
          break;
        case UserStatus.ACTIVE:
          teamMembers.type = TeamMemberType.USER;
          break;
        case UserStatus.INACTIVE:
          teamMembers.type = TeamMemberType.USER;
          break;
        default:
          teamMembers.type = '';
      }
      teamMembers.status =
        status === UserStatus.INVITED ? UserStatus.UNSET : status;

      teamRepository
        .getTeamMembers(companyId, teamMembers)
        .then(responseMembers => {
          setMembers([...members, ...responseMembers.items]);
          setTotalMembers(responseMembers.totalCount);
        })
        .finally(() => {
          setSpinnerBlock(false);
        });
    }
  }, [page]);

  const onChangeFilterStatus = (status: UserStatus) => {
    setStatus(status);
  };

  const onChangeKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const nextPage = () => {
    const pageSend = page + 1;
    if (pageSend <= totalPage) {
      setPage(pageSend);
    }
  };

  const onChangePageSize = (size: any) => {
    setPageSize(size.target.value);
  };

  const onChangeSort = (option: SortRecord) => {
    setSortBy({ name: option.name, sorting: option.sorting });
  };

  const handleStatus = (
    status: string,
    type: string,
    lowercase: boolean = false
  ) => {
    let result: string = '';

    switch (status) {
      case UserStatus.INACTIVE:
        result =
          type === TeamMemberType.USER ? UserStatus.ACTIVE : UserStatus.INVITED;
        break;

      case UserStatus.ACTIVE:
        result =
          type === TeamMemberType.USER
            ? UserStatus.INACTIVE
            : UserStatus.INVITED;
        break;

      default:
        result = status;
    }

    return lowercase ? result.toLowerCase() : result;
  };

  const handleRole = (role: string, lowercase: boolean = false) => {
    const result =
      role === UserRole.CLIENT_USER
        ? UserRole.CLIENT_ADMIN
        : UserRole.CLIENT_USER;

    return lowercase ? result.toLowerCase() : result;
  };

  const InviteError = (list: ErrorMember) => {
    return (
      <>
        <div className='bg-main py-2 px-20 text-left border-top border-bottom mt-2'>
          Have {list.messageInviteError.length} of &nbsp;
          {list.messageInviteError.length +
            list.messageInviteSuccess.length}{' '}
          members were invited to fail.
        </div>
        <Table className='text-left border-bottom'>
          <tbody>
            {list.messageInviteError.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  };

  const sendInvitation = async (invitedEmailList: Array<string>) => {
    let reRender = false;
    let countInvite = 0;
    const messageInviteSuccess: any[] = [];
    const messageInviteError: any[] = [];

    for (let i = 0; i < invitedEmailList.length; i++) {
      const invitedEmail = invitedEmailList[i];
      const responseStatus = await teamRepository
        .sendEmailInvitation(companyId, { invitedEmail: invitedEmail })
        .then(response => {
          countInvite++;
          if (response) {
            messageInviteSuccess.push(invitedEmail);
          } else {
            messageInviteError.push(invitedEmail);
          }
          return response;
        });
      reRender = reRender || responseStatus;
    }

    if (countInvite === invitedEmailList.length) {
      if (messageInviteError.length) {
        useAlert.fire({
          customClass: {
            popup: 'swal-popup-invite-member px-0',
            title: 'px-3'
          },
          title: 'Invite team members',
          html: (
            <InviteError
              messageInviteError={messageInviteError}
              messageInviteSuccess={messageInviteSuccess}
            />
          ),
          showConfirmButton: true,
          confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
        });
      } else if (messageInviteSuccess.length) {
        useAlert.fire({
          icon: 'success',
          html: infoMessage['invite/success'],
          showConfirmButton: true,
          confirmButtonColor: COLOR_ALERT_CONFIRM_BUTTON
        });
      }
    }

    if (reRender) {
      await setReRenderMember(!reRenderMember);
    }
  };

  const handelScrollbar = (event: any) => {
    if (event.scrollTop + event.clientHeight + 30 > event.scrollHeight) {
      nextPage();
    }
  };

  const routerMemberEdit = (memberId: string) => {
    return util.formatString(ROUTE_MEMBER_EDITED, { companyId, memberId });
  };

  const StatusMember = (option: StatusMember) => {
    const statusPare = option['status'].toLowerCase();

    const makup = (optionHTML: string) => {
      switch (optionHTML) {
        case STATUS_ACTIVE:
          return (
            <Badge className='text-uppercase' variant='success'>
              {optionHTML}
            </Badge>
          );

        case STATUS_INACTIVE:
          return (
            <Badge className='text-uppercase' variant='danger'>
              {optionHTML}
            </Badge>
          );

        default:
          return (
            <Badge className='text-uppercase' variant='secondary'>
              {optionHTML}
            </Badge>
          );
      }
    };

    return (
      <>
        <div>
          {option.type === TeamMemberType.USER ? (
            makup(statusPare)
          ) : (
            <Badge className='text-uppercase' variant='warning'>
              Invite Sent
            </Badge>
          )}
        </div>
      </>
    );
  };

  const renderTooltip = (member: any) => {
    return <Tooltip id={`tooltip-${member.id}`}>{member.email}</Tooltip>;
  };

  const retrievedMembers = members.length ? (
    <Scrollbar
      className='table-fixed table-responsive table-paging'
      onScroll={handelScrollbar}
      ref={scrollbarRef}
    >
      <Table
        className='table-parent sortable mb-0'
        bordered
        onScroll={() => nextPage}
      >
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td className='col-email'>
                <OverlayTrigger
                  placement='left'
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip(member)}
                >
                  <span className='tooltip-content'>{member.email}</span>
                </OverlayTrigger>
              </td>
              <td className='col-full-name'>
                {member.firstName
                  ? member.firstName + ' ' + member.lastName
                  : '--'}
              </td>
              <td className='col-create-at'>
                {util.formatDate(member.createdAt)}
              </td>
              <td className='col-role'>
                {member.type === TeamMemberType.USER
                  ? util.replaceRole(
                      get(member, 'role', ''),
                      false,
                      UserRole.CLIENT_ADMIN
                    )
                  : ''}
              </td>
              <td className='col-status'>
                <StatusMember status={member.status} type={member.type} />
              </td>

              <td className='col-action'>
                {member.email !== email && (
                  <Dropdown alignRight>
                    <Dropdown.Toggle
                      className='dropdown-toggle-default ml-auto'
                      variant='secondary'
                      id='action-menu-2'
                    >
                      Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {member.type === TeamMemberType.USER && (
                        <Dropdown.Item
                          className='text-capitalize'
                          to={routerMemberEdit(member.id)}
                          as={Link}
                        >
                          Edit
                        </Dropdown.Item>
                      )}
                      {member.type === TeamMemberType.INVITATION && (
                        <Dropdown.Item
                          className='text-capitalize'
                          onClick={() => resendInviteMember(member.id)}
                        >
                          Resend Invite
                        </Dropdown.Item>
                      )}
                      {member.type === TeamMemberType.USER && (
                        <Dropdown.Item
                          className='text-capitalize'
                          onClick={() =>
                            setMemberRole(
                              member.id,
                              handleRole(get(member, 'role', ''))
                            )
                          }
                        >
                          {member.role === UserRole.CLIENT_USER
                            ? 'Make Admin'
                            : 'Make Standard'}
                        </Dropdown.Item>
                      )}
                      {member.type === TeamMemberType.USER && (
                        <Dropdown.Item
                          className='text-capitalize'
                          onClick={() =>
                            setMemberStatus(
                              member.id,
                              handleStatus(member.status, member.type)
                            )
                          }
                        >
                          {handleStatus(member.status, member.type, true)}
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Scrollbar>
  ) : (
    <div className='text-center text-muted text-uppercase text-no-result bg-white border'>
      No data
    </div>
  );

  const tableHeaderFixed = (
    <Table className='table-parent sortable mb-0' bordered>
      <thead>
        <tr>
          <SortingColumn
            sortClass='col-email'
            sortBy='email'
            label='email'
            sorting={sortBy.name === 'email' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />

          <SortingColumn
            sortClass='col-full-name'
            sortBy='fullName'
            label='Name'
            sorting={sortBy.name === 'fullName' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />

          <SortingColumn
            sortClass='col-create-at'
            sortBy='createdAt'
            label='Date Added'
            sorting={sortBy.name === 'createdAt' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />

          <SortingColumn
            sortClass='col-role'
            sortBy='role'
            label='Role'
            sorting={sortBy.name === 'role' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />

          <SortingColumn
            sortClass='col-status'
            sortBy='status'
            label='Status'
            sorting={sortBy.name === 'status' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />

          <th className='col-action'>&nbsp;</th>
        </tr>
      </thead>
    </Table>
  );

  return (
    <Layout
      className='team-management-module'
      documentTitle={TEXT_TEAM_MANAGEMENT}
      pageTitle={TEXT_TEAM_MANAGEMENT}
    >
      <TeamManagementHeader
        totalMembers={totalMembers}
        onChangeFilterStatus={onChangeFilterStatus}
        onChangeKeyword={onChangeKeyword}
      />
      <div className='py-4 px-4'>
        <FormInvitation onSubmit={sendInvitation} />
        <div className='group-table-paging'>
          {tableHeaderFixed}
          {members.length ? (
            <Form.Group className='form-inline form-group-paging'>
              <Form.Label>Size: &nbsp;</Form.Label>
              <Form.Control
                as='select'
                onChange={value => onChangePageSize(value)}
              >
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value='75'>75</option>
                <option value='100'>100</option>
              </Form.Control>
            </Form.Group>
          ) : (
            ''
          )}
        </div>

        <div className='position-relative'>
          <SpinnerBlock isShow={spinnerBlock} />
          {retrievedMembers}
        </div>
      </div>
    </Layout>
  );
};

export default TeamManagement;
