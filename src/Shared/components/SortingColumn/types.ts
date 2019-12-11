export interface SortRecord {
  name: string;
  sorting: string;
}

export interface Props {
  label: string;
  sortClass: string;
  sortBy: string;
  sorting: string;
  onChangeOrder(option: SortRecord): void;
}
