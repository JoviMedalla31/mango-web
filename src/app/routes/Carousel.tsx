import { useRef, useLayoutEffect, ReactNode, RefObject } from 'react';
import {
  motion,
  animate,
  MotionValue,
  useTransform,
  PanInfo,
  AnimationPlaybackControlsWithThen,
  useAnimationFrame,
} from 'motion/react';
import { CarouselDimensions } from '@/types/carousel';
import { clamp, moduloOffset } from '@/util/math';
import useRerender from '@/hooks/useRerender';
import { useWidthCheck } from '@/hooks/useWidthCheck';

const items = [
  'bg-orange-300',
  'bg-amber-300',
  'bg-lime-300',
  'bg-emerald-300',
  'bg-cyan-300',
  'bg-indigo-400',
  'bg-violet-400',
  'bg-rose-400',
];

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
  color,
  x,
  itemsRef,
  onRefsAssigned: handleRefsAssigned,
  itemCount,
  dimensions,
}: {
  children?: ReactNode;
  index: number;
  color: string;
  x: MotionValue;
  itemsRef: RefObject<(HTMLDivElement | null)[]>;
  onRefsAssigned: () => void;
  itemCount: RefObject<number>;
  dimensions: CarouselDimensions;
}) => {
  const { isSm, isMd } = useWidthCheck();

  const translateX = useTransform(x, (val) => {
    const containerWidth = dimensions.full.current * itemCount.current;
    const scrollOffset = -((index + 1) * dimensions.full.current);

    const smLayoutOffset = dimensions.gap.current / 2;
    const mdLayoutOffset = dimensions.item.current / 2;
    const lgLayoutOffset = dimensions.item.current / 2;

    console.log(mdLayoutOffset);

    // Add offset to items
    val += isSm ? smLayoutOffset : isMd ? mdLayoutOffset : lgLayoutOffset;
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
        className={`${color} flex aspect-3/4 w-full items-center justify-center rounded-[4rem]`}
      >
        <div className="select-none">{children}</div>
      </div>
    </motion.div>
  );
};

const Carousel = () => {
  // Hooks
  const { refreshed, rerender } = useRerender();
  const { isSm, isMd } = useWidthCheck();

  // Meta
  const itemCount = useRef(items.length);
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
  const offset = useRef(0);
  const dragStartX = useRef<number | null>(null);

  // Autoscroll
  const scrollProgress = useRef(fullItemWidth.current / 2);
  const isResizing = useRef(false);
  const pauseScroll = useRef(false);

  // -----------------------
  // Effects
  // -----------------------

  useLayoutEffect(() => {
    if (isMd) {
      fullItemWidth.current = FULL_ITEM_WIDTH.SM;
    } else {
      fullItemWidth.current = FULL_ITEM_WIDTH.LG;
    }

    itemWidth.current = fullItemWidth.current - gapWidth.current;

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
      const next = offset.current * fullItemWidth.current;

      isResizing.current = true;
      scrollProgress.current = 0;
      // translateX.set(next);
      animation.current?.stop();
      animation.current = animate(translateX.current, next, {
        type: 'spring',
      });
    };
    const observer = new ResizeObserver(() => {
      measure();
    });

    measure();
    if (itemsRef.current[0]) observer.observe(itemsRef.current[0]);
    return () => observer.disconnect();
  });

  // -----------------------
  // Framer Animation
  // -----------------------

  useAnimationFrame((t, delta) => {
    // return;
    if (isSm) return;
    if (pauseScroll.current) return;

    const speed = 3;
    const change = (delta / 1000) * speed;
    const next = translateX.current.get() - change;

    scrollProgress.current += change;
    translateX.current.set(next);

    if (scrollProgress.current >= fullItemWidth.current) {
      offset.current -= 1;
      scrollProgress.current -= fullItemWidth.current;
    }
  });

  // -----------------------
  // Event Hanlders
  // -----------------------

  const handleDragStart = () => {
    scrollProgress.current = fullItemWidth.current / 2;
    dragStartX.current = translateX.current.get();
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const velocityThreshold = 500;
    const dvwOffset = (info.offset.x / windowWidth.current) * 100;
    let draggedOffset = Math.round(dvwOffset / fullItemWidth.current);
    let nextX: number;

    if (draggedOffset == 0 && Math.abs(info.velocity.x) > velocityThreshold)
      draggedOffset = info.velocity.x > 0 ? 1 : -1;

    offset.current += draggedOffset;
    dragStartX.current = null;
    nextX = offset.current * fullItemWidth.current;

    translateX.current.stop();
    animation.current = animate(translateX.current, nextX, {
      type: 'spring',
      velocity: clamp(info.velocity.x, 100, -100),
      duration: 1.2,
    });
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (dragStartX.current == null) {
      // Stop the animation because if not it will still play in the BG.
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

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="max-w-full overflow-x-hidden bg-gray-200 py-12"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="flex"
      >
        {items.map((color, i) => (
          <CarouselItem
            key={i}
            index={i}
            color={color}
            x={translateX.current}
            itemsRef={itemsRef}
            onRefsAssigned={handleRefsAssigned}
            itemCount={itemCount}
            dimensions={{ full: fullItemWidth, gap: gapWidth, item: itemWidth }}
          >
            Items
          </CarouselItem>
        ))}
      </motion.div>
    </div>
  );
};

export default Carousel;
