import { ActionBase } from 'Shared/types/actionBase';
import { State } from './types';
import { container } from 'UnderAdmin/Container';
import { HomeRepository } from 'UnderAdmin/repositories/HomeRepository';

const homeRepository = container.get<HomeRepository>('homeRepository');

export function reducer(state: State, action: ActionBase) {
  switch (action.type) {
    case 'increment':
      return homeRepository.increase(state.count);

    case 'decrement':
      return homeRepository.decrease(state.count);

    default:
      throw new Error();
  }
}
