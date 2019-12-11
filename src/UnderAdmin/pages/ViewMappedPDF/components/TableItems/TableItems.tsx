import * as React from 'react';
import { Props } from './types';
import { Link } from 'react-router-dom';
import './TableItems.scss';

const TableItems = (props: Props) => {
  const { name } = props;

  return (
    <>
      <tr>
        <td className='col-pdf-name'>
          <Link to='#' title={name} className='text-link font-semibold'>
            {name}
          </Link>
        </td>
        <td className='col-date'>11/19/2019</td>
        <td className='col-date'>1</td>
        <td className='col-forms'>63</td>
      </tr>
    </>
  );
};

export default TableItems;
