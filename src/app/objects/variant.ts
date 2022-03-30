import { Image } from './image';
import { Size } from "./size";

export interface Variant {
  id: string;
  productId: string;
  currency: string;
  originalPrice: string;
  currentPrice: string;
  sizes: Size[];
  images: Image[];
}
