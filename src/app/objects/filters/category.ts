import { Filters } from './filters';
export interface Category {
  name: string;
  value: string;
  checked: boolean;
  expand: boolean;
  filters: Filters[];
}
