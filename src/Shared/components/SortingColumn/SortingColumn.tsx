import * as React from 'react';
import './SortingColumn.scss';
import { Props } from './types';
import { Sorter } from 'Shared/constants/sorter';

export const SortingColumn = (props: Props) => {
  const { sortBy, sorting, label, sortClass, onChangeOrder } = props;

  const sortingShow = sorting === 'desc' ? 'fa-sort-up' : 'fa-sort-down';

  let setSorting = Sorter.UNSET;
  if (sorting === Sorter.UNSET || sorting === Sorter.DESC) {
    setSorting = Sorter.ASC;
  } else {
    setSorting = Sorter.DESC;
  }

  return (
    <th
      className={sortClass}
      onClick={() => onChangeOrder({ name: sortBy, sorting: setSorting })}
    >
      {label}
      {sorting !== '' && (
        <span className='icon-sort text-primary'>
          <i className={'fas ' + sortingShow}></i>
        </span>
      )}
      {sorting === '' && (
        <span className='icon-sort text-muted'>
          <i className='fas fa-sort'></i>
        </span>
      )}
    </th>
  );
};

export default SortingColumn;
