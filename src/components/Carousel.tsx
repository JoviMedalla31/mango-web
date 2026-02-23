import {
  useRef,
  useLayoutEffect,
  ReactNode,
  RefObject,
  MouseEvent as RMouseEvent,
  useState,
} from 'react';
import {
  motion,
  animate,
  MotionValue,
  useTransform,
  PanInfo,
  AnimationPlaybackControlsWithThen,
  useAnimationFrame,
  AnimatePresence,
} from 'motion/react';
import { CarouselDimensions } from '@/types/carousel';
import { clamp, modulo, moduloOffset } from '@/util/math';
import useRerender from '@/hooks/useRerender';
import { useWidthCheck } from '@/hooks/useWidthCheck';

const FULL_ITEM_WIDTH = {
  SM: 50,
  MD: 50,
  LG: 25,
};

const GAP_WIDTH = {
  SM: 3,
  MD: 3,
  LG: 2,
};

const CarouselItem = ({
  children,
  index,
  x,
  itemsRef,
  onRefsAssigned: handleRefsAssigned,
  itemCount,
  dimensions,
}: {
  children?: ReactNode;
  index: number;
  x: MotionValue;
  itemsRef: RefObject<(HTMLDivElement | null)[]>;
  onRefsAssigned: () => void;
  itemCount: RefObject<number>;
  dimensions: CarouselDimensions;
}) => {
  const { isSm, isMd } = useWidthCheck();

  const translateX = useTransform(x, (val) => {
    // full width of the carousel
    const containerWidth = dimensions.full.current * itemCount.current;
    const scrollOffset = -((index + 1) * dimensions.full.current);

    const layoutOffset = dimensions.item.current / 2;
    // const smLayoutOffset = dimensions.item.current / 2;
    // const mdLayoutOffset = dimensions.item.current / 2;
    // const lgLayoutOffset = dimensions.item.current / 2;

    // Add offset to items
    val += dimensions.gap.current + dimensions.item.current / 2;
    // Wrap item on container
    val = moduloOffset(val, containerWidth, scrollOffset);

    return `${val}dvw`;
  });

  return (
    <motion.div
      initial={{
        x: translateX.get(),
      }}
      style={{
        minWidth: `${dimensions.full.current}dvw`,
        width: `${dimensions.full.current}dvw`,
        paddingRight: `${dimensions.gap.current}dvw`,
        x: translateX,
      }}
      ref={(el) => {
        itemsRef.current[index] = el;
        handleRefsAssigned();
      }}
    >
      <div
        className={`border-faded-mango-100 flex aspect-3/4 w-full cursor-pointer
          items-center justify-center rounded-[4rem] border-5 px-2 py-4`}
      >
        <div className="select-none">{children}</div>
      </div>
    </motion.div>
  );
};

const Carousel = ({
  ref,
  items,
  onMouseDown: handleMouseDown,
}: {
  ref?: RefObject<HTMLDivElement | null>;
  items: ReactNode[];
  onMouseDown?: (e: RMouseEvent) => any;
}) => {
  // Carousel Items
  const carouselItems = [...items, ...items];
  // const carouselItems = true ? [...items, ...items] : [items];

  // Hooks
  const { refreshed, rerender } = useRerender();
  const { isSm, isMd } = useWidthCheck();

  // Meta
  const itemCount = useRef(carouselItems.length);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Carousel Dimensions
  const windowWidth = useRef(0);
  const fullItemWidth = useRef(25);
  const gapWidth = useRef(2);
  const itemWidth = useRef(fullItemWidth.current - gapWidth.current);

  // Drag & Carousel Props
  // const translateX = new MotionValue(0);
  const translateX = useRef<MotionValue>(new MotionValue(0));
  const animation = useRef<AnimationPlaybackControlsWithThen>(null);
  const [offset, setOffset] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const offsetPagination = modulo(items.length - offset, items.length);
  // console.log('offset', offset);
  // console.log('offsetPagination', offsetPagination);

  // Autoscroll
  const scrollProgress = useRef(fullItemWidth.current / 2);
  const pauseScroll = useRef(false);

  // -----------------------
  // Effects
  // -----------------------

  // Reposition Items when breakpoints are changed
  useLayoutEffect(() => {
    if (isMd) {
      fullItemWidth.current = FULL_ITEM_WIDTH.SM;
    } else {
      fullItemWidth.current = FULL_ITEM_WIDTH.LG;
    }

    animation.current?.stop();
    itemWidth.current = fullItemWidth.current - gapWidth.current;
    translateX.current.set(offset * fullItemWidth.current);

    rerender();
  }, [isSm, isMd]);

  useLayoutEffect(() => {
    const measure = () => {
      windowWidth.current = window.innerWidth;
    };
    const observer = new ResizeObserver(() => {
      measure();
    });

    measure();
    if (itemsRef.current[0]) observer.observe(itemsRef.current[0]);
    return () => observer.disconnect();
  }, [itemsRef.current[0], refreshed]);

  useLayoutEffect(() => {
    const measure = () => {
      const next = offset * fullItemWidth.current;

      scrollProgress.current = 0;
      translateX.current.set(next);
    };
    const observer = new ResizeObserver(() => {
      measure();
    });

    measure();
    if (itemsRef.current[0]) observer.observe(itemsRef.current[0]);
    return () => observer.disconnect();
  }, [itemsRef.current]);

  // -----------------------
  // Framer Animation
  // -----------------------

  // Animates the carousel automatically, making it move slowly over time.
  useAnimationFrame((t, delta) => {
    // Stop the animation at certain breakpoints & when paused.
    if (isSm) return;
    if (pauseScroll.current) return;

    const speed = 2;
    const change = (delta / 1000) * speed;
    const next = translateX.current.get() - change;

    scrollProgress.current += change;
    translateX.current.set(next);

    if (scrollProgress.current >= fullItemWidth.current) {
      setOffset((prev) => prev - 1);
      scrollProgress.current -= fullItemWidth.current;
    }
  });

  // -----------------------
  // Event Hanlders
  // -----------------------

  const handleDragStart = () => {
    dragStartX.current = translateX.current.get();
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    // threshold from drag speed to check if offset should change
    const velocityThreshold = 500;
    // pointer movement offset from px to % (percent of screen)
    const dvwOffset = (info.offset.x / windowWidth.current) * 100;

    // offset of how many items user dragged between.
    let draggedOffset = Math.round(
      (dvwOffset - scrollProgress.current) / fullItemWidth.current,
    );
    let nextX: number;

    // if no offset is detected, adds offset based on pointer velocity
    if (draggedOffset == 0 && Math.abs(info.velocity.x) > velocityThreshold)
      draggedOffset = info.velocity.x > 0 ? 1 : -1;

    const nextOffset = offset + draggedOffset;
    dragStartX.current = null;
    nextX = nextOffset * fullItemWidth.current;
    scrollProgress.current = 0;

    setOffset(nextOffset);
    translateX.current.stop();
    animation.current = animate(translateX.current, nextX, {
      type: 'spring',
      velocity: clamp(info.velocity.x, 100, -100),
      duration: 1.2,
    });
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (dragStartX.current == null) {
      // Stop the animation because if not it will still play & calculate in the BG.
      animation.current?.stop();
      return;
    }

    const dragOffset = (info.offset.x / windowWidth.current) * 100;
    translateX.current.set((dragStartX.current ?? translateX.current.get()) + dragOffset);
  };

  const handleMouseEnter = () => {
    pauseScroll.current = true;
  };

  const handleMouseLeave = () => {
    pauseScroll.current = false;
  };

  const handleRefsAssigned = () => {
    rerender();
  };

  const handlePaginationClicked = (i: number) => () => {
    let offsetDiff = offsetPagination - i;
    if (offsetDiff > items.length / 2) offsetDiff -= items.length;
    if (offsetDiff < -items.length / 2) offsetDiff += items.length;

    const nextOffset = offset + offsetDiff;
    setOffset(nextOffset);
    animation.current?.stop();

    console.log(nextOffset);

    animation.current = animate(translateX.current, nextOffset * fullItemWidth.current, {
      type: 'spring',
      velocity: offsetDiff < 0 ? -100 : 100,
      duration: 1.2,
    });
  };

  return (
    <div
      {...{ ref }}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="max-w-full overflow-x-hidden"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ width: `${carouselItems.length * fullItemWidth.current}dvw` }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="flex"
      >
        {carouselItems.map((node, i) => (
          <CarouselItem
            key={i}
            index={i}
            x={translateX.current}
            itemsRef={itemsRef}
            onRefsAssigned={handleRefsAssigned}
            itemCount={itemCount}
            dimensions={{ full: fullItemWidth, gap: gapWidth, item: itemWidth }}
          >
            {node}
          </CarouselItem>
        ))}
      </motion.div>
      <div className="mx-auto w-fit flex gap-2 mt-8">
        {items.map((_, i) => (
          <div
            key={i}
            onClick={handlePaginationClicked(i)}
            className="w-7 h-7 aspect-square border-2 border-faded-mango-200 rounded-full
              cursor-pointer flex items-center justify-center"
          >
            <AnimatePresence>
              {offsetPagination == i && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.05,
                  }}
                  className="w-5 bg-mango-400 rounded-full h-5 aspect-square"
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
