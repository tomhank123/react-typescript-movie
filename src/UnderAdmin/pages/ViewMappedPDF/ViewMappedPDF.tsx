import * as React from 'react';
import { Table, Form } from 'react-bootstrap';
import Scrollbar from 'react-scrollbars-custom';
import './ViewMappedPDF.scss';
import Layout from 'UnderAdmin/components/Layout/Layout';
import { TEXT_MAPPED_PDFS } from 'Shared/constants/texts';
import { Props } from './types';
import TableItems from './components/TableItems';
import ViewMappedPDFHeader from './components/ViewMappedPDFHeader';
import { SortingColumn } from 'Shared/components/SortingColumn';
import { SortRecord } from 'Shared/components/SortingColumn/types';

const tableListItems = require('./tableList.json');

const AllAccounts = (props: Props) => {
  const [sortBy, setSortBy] = React.useState<SortRecord>({
    name: '',
    sorting: ''
  });

  const onChangePageSize = (size: any) => {
    console.log('show size', size.target.value);
  };

  const onChangeSort = (option: SortRecord) => {
    setSortBy({ name: option.name, sorting: option.sorting });
  };

  React.useEffect(() => {
    console.log('sortBy', sortBy);
  }, [sortBy]);

  const tableHeaderFixed = (
    <Table className='table-parent sortable mb-0'>
      <thead>
        <tr>
          <SortingColumn
            sortBy='pdfName'
            label='PDF Name'
            sortClass='col-pdf-name'
            sorting={sortBy.name === 'pdfName' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />

          <SortingColumn
            sortBy='created'
            label='Created'
            sortClass='col-date'
            sorting={sortBy.name === 'created' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />

          <SortingColumn
            sortBy='lastModified'
            label='Last Modified'
            sortClass='col-date'
            sorting={sortBy.name === 'lastModified' ? sortBy.sorting : ''}
            onChangeOrder={(option: SortRecord) =>
              onChangeSort({ name: option.name, sorting: option.sorting })
            }
          />

          <SortingColumn
            sortBy='forms'
            label='Forms'
            sortClass='col-forms'
            sorting={sortBy.name === 'forms' ? sortBy.sorting : ''}
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
            <TableItems key={index} name={item.title} />
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
      className='all-mapped-pdf-page'
      documentTitle={TEXT_MAPPED_PDFS}
      pageTitle={TEXT_MAPPED_PDFS}
    >
      <ViewMappedPDFHeader />
      <div className='py-2 px-4'>
        <div className='group-table-paging'>
          {tableHeaderFixed}
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
        {retrievedMembers}
      </div>
    </Layout>
  );
};

export default AllAccounts;
