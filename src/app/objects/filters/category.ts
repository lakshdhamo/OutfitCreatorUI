import { Filters } from './filters';
export interface Category {
  name: string;
  value: string;
  filters: Filters[];
}
