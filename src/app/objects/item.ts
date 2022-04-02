import { Description } from './description';
import { Variant } from './variant';

export interface Item {
  id: string;
  name: string;
  brand: string;
  variants: Variant[];
  descriptions: Description[];
}
