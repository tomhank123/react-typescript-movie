import * as React from 'react';
import './SpinnerBlock.scss';
import { Props } from './types';
import { Spinner } from '../Spinner';


export const SpinnerBlock = (props: Props) => {
  return props.isShow ? <Spinner block={true} open={true} /> : null;
};
