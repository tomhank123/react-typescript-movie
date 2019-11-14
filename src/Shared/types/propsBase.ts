import { History, Location } from 'history';

export interface Match {
  params: any;
}

export interface PropsBase {
  history: History;
  location: Location;
  match: Match;
}
