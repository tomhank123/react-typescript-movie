import * as React from 'react';
import './Spinner.scss';
import { useSpinner } from 'Shared/contexts/SpinnerContext';
import { Props } from './types';

export const Spinner = (props: Props) => {
  const spinner = useSpinner();
  return spinner.show || props.open ? (
    <div className={`spinner ${props.block ? 'spinner-block' : ''}`}>
      <div className='spinner-icon'></div>
    </div>
  ) : null;
};
