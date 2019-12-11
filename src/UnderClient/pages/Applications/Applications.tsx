import * as React from 'react';
import { Table, Form } from 'react-bootstrap';
import Scrollbar from 'react-scrollbars-custom';
import { TEXT_APPLICATIONS } from 'Shared/constants/texts';
import { Props } from './types';
import TableItems from './components/TableItems';
import ApplicationsHeader from './components/ApplicationsHeader';
import { SortingColumn } from 'Shared/components/SortingColumn';
import { SortRecord } from 'Shared/components/SortingColumn/types';
import { SpinnerBlock } from 'Shared/components/SpinnerBlock';
import { ApplicationStatus } from 'Shared/constants/applicationStatus';
import Layout from 'UnderClient/components/Layout/Layout';
import './Applications.scss';

const tableListItems = require('./tableList.json');

const AllAccounts = (props: Props) => {
  const [spinnerBlock, setSpinnerBlock] = React.useState<boolean>(true);
  const [status, setStatus] = React.useState<ApplicationStatus>();

  const [sortBy, setSortBy] = React.useState<SortRecord>({
    name: '',
    sorting: ''
  });

  const onChangeSort = (option: SortRecord) => {
    setSortBy({ name: option.name, sorting: option.sorting });
  };

  const onChangePageSize = (size: any) => {
    console.log('Changed Size!!');
  };

  const onChangeFilterStatus = (status: ApplicationStatus) => {
    setStatus(status);
  };

  React.useEffect(() => {
    setSpinnerBlock(false);
    console.log('sortBy', sortBy);
    console.log('status', status);
  }, [sortBy, status]);

  const tableFixed = (
    <Table className='table-parent sortable mb-0'>
      <thead>
        <tr>
          <SortingColumn
            sortBy='companyName'
            label='Company Name'
            sortClass='col-company-name'
            sorting={sortBy.name === 'companyName' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />

          <SortingColumn
            sortBy='applications'
            label='Applications'
            sortClass='col-application'
            sorting={sortBy.name === 'applications' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />

          <SortingColumn
            sortBy='forms'
            label='Forms'
            sortClass='col-form'
            sorting={sortBy.name === 'forms' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />

          <SortingColumn
            sortBy='statuses'
            label='Statuses'
            sortClass='col-status'
            sorting={sortBy.name === 'statuses' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />

          <SortingColumn
            sortBy='lastSubmittedDate'
            label='Last submitted date'
            sortClass='col-date'
            sorting={sortBy.name === 'lastSubmittedDate' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />
        </tr>
      </thead>
    </Table>
  );

  const retrievedMembers = tableListItems.length ? (
    <Scrollbar className='table-fixed table-responsive table-paging'>
      <Table className='table-parent sortable mb-0' bordered>
        <tbody>
          {tableListItems.map((item: any, index: number) => (
            <TableItems
              key={index}
              id={item.id}
              name={item.title}
              listItemChilds={item.listItemChilds}
            />
          ))}
        </tbody>
      </Table>
    </Scrollbar>
  ) : (
    <div className='text-center text-muted text-uppercase text-no-result bg-white border'>
      No data
    </div>
  );

  return (
    <Layout
      className='all-applications-page'
      documentTitle={TEXT_APPLICATIONS}
      pageTitle={TEXT_APPLICATIONS}
    >
      <ApplicationsHeader onChangeFilterStatus={onChangeFilterStatus} />
      <div className='py-2 px-4'>
        <div className='group-table-paging'>
          {tableFixed}
          {tableListItems.length ? (
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

export default AllAccounts;
