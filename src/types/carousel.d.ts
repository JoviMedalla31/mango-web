import { RefObject } from 'react';

export interface CarouselDimensions {
  full: RefObject<number>;
  gap: RefObject<number>;
  item: RefObject<number>;
}
