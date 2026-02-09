import { useRef, type RefObject, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from '@/components/Carousel';

// Carousel Img
import chocolateImg from '/images/products/shots/chocolate.png';
import sliceImg from '/images/products/shots/slice.png';
import spaghettiImg from '/images/products/shots/spaghetti.png';
import stripImg from '/images/products/shots/strip.png';
import chocolateSlicesImg from '/images/products/shots/chocolate-slices.png';

const ProductCarousel = ({ ref }: { ref?: RefObject<HTMLDivElement | null> }) => {
  const navigate = useNavigate();
  const mouseDownPos = useRef<[number, number] | null>(null);

  // --------------------
  // Event Handler
  // --------------------

  const handleCarouselMouseDown = (e: MouseEvent) => {
    mouseDownPos.current = [e.screenX, e.screenY];
  };

  // Navigate to product page if carousel ends on the same position.
  // (will still navigate even if carousel was dragged and returned to the same position)
  const handleCarouselClicked = (path: string) => (e: MouseEvent) => {
    const mouseOffset = [
      Math.abs((mouseDownPos.current?.[0] ?? 0) - e.screenX),
      Math.abs((mouseDownPos.current?.[1] ?? 0) - e.screenY),
    ];

    mouseDownPos.current = null;
    if (mouseOffset[0] > 10 || mouseOffset[1] > 10) return;

    navigate(`/products/${path}`);
    console.log('item clicked');
  };

  return (
    <Carousel
      {...{ ref }}
      onMouseDown={handleCarouselMouseDown}
      items={[
        <Link
          to="/products/slices"
          onMouseDownCapture={(e) => e.preventDefault()}
          onClick={(e) => e.preventDefault()}
        >
          <div onClick={handleCarouselClicked('slices')}>
            <img src={sliceImg} className="pointer-events-none select-none" />
          </div>
        </Link>,
        <Link
          to="/products/strips"
          onMouseDownCapture={(e) => e.preventDefault()}
          onClick={(e) => e.preventDefault()}
        >
          <div onClick={handleCarouselClicked('strips')}>
            <img src={stripImg} className="pointer-events-none select-none" />
          </div>
        </Link>,
        <Link
          to="/products/spaghetti"
          onMouseDownCapture={(e) => e.preventDefault()}
          onClick={(e) => e.preventDefault()}
        >
          <div onClick={handleCarouselClicked('spaghetti')}>
            <img src={spaghettiImg} className="pointer-events-none select-none" />
          </div>
        </Link>,
        <Link
          to="/products/chocolate-strips"
          onMouseDownCapture={(e) => e.preventDefault()}
          onClick={(e) => e.preventDefault()}
        >
          <div onClick={handleCarouselClicked('chocolate-strips')}>
            <img src={chocolateImg} className="pointer-events-none select-none" />
          </div>
        </Link>,
        <Link
          to="/products/chocolate-slices"
          onMouseDownCapture={(e) => e.preventDefault()}
          onClick={(e) => e.preventDefault()}
        >
          <div onClick={handleCarouselClicked('chocolate-slices')}>
            <img src={chocolateSlicesImg} className="pointer-events-none select-none" />
          </div>
        </Link>,
      ]}
    />
  );
};

export default ProductCarousel;
