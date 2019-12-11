import { injectable } from 'inversify';
import { State } from 'UnderAdmin/pages/Home/types';

export interface HomeRepository {
  increase(currentValue: number): State;
  decrease(currentValue: number): State;
}

@injectable()
export class HomeRepositoryImpl implements HomeRepository {
  public increase(currentValue: number): State {
    return { count: currentValue + 1 };
  }

  public decrease(currentValue: number): State {
    return { count: currentValue - 1 };
  }
}
