import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  ReactNode,
  RefObject,
} from 'react';
import {
  motion,
  animate,
  MotionValue,
  useTransform,
  useMotionValueEvent,
  PanInfo,
  AnimationPlaybackControlsWithThen,
  useAnimate,
} from 'motion/react';
import { CarouselDimensions } from '@/types/carousel';
import { modulo, moduloOffset } from '@/util/math';

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

const CarouselItem = ({
  children,
  index,
  color,
  x,
  itemsRef,
  itemCount,
  dimensions,
}: {
  children?: ReactNode;
  index: number;
  color: string;
  x: MotionValue;
  itemsRef: RefObject<(HTMLDivElement | null)[]>;
  itemCount: RefObject<number>;
  dimensions: CarouselDimensions;
}) => {
  const translateX = useTransform(x, (val) => {
    const containerWidth = dimensions.full.current * itemCount.current;
    const containerOffset = -((index + 1) * dimensions.full.current);

    // Add offset to items
    console.log(dimensions.full.current, dimensions.gap.current, dimensions.item.current);
    val += dimensions.item.current / 2;
    // Wrap item on container
    val = moduloOffset(val, containerWidth, containerOffset);

    return `${val}dvw`;
  });

  return (
    <motion.div
      style={{
        minWidth: `${dimensions.full.current}dvw`,
        width: `${dimensions.full.current}dvw`,
        paddingRight: `${dimensions.gap.current}dvw`,
        x: translateX,
      }}
      ref={(el) => {
        itemsRef.current[index] = el;
      }}
    >
      <div
        className={`${color} flex h-full w-full items-center justify-center rounded-[4rem]`}
      >
        <div className="select-none">{children}</div>
      </div>
    </motion.div>
  );
};

const Carousel = () => {
  const itemCount = useRef(items.length);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const motionValues = useRef<MotionValue[]>(items.map((_) => new MotionValue(0)));

  // Carousel Dimensions
  const windowWidth = useRef(0);
  const fullItemWidth = useRef(25);
  const gapWidth = useRef(2);
  const itemWidth = useRef(fullItemWidth.current - gapWidth.current);

  // Drag & Carousel Props
  const translateX = new MotionValue(0);
  const animation = useRef<AnimationPlaybackControlsWithThen>(null);
  const offset = useRef(0);
  const dragStartX = useRef<number | null>(null);

  // -----------------------
  // Effects
  // -----------------------

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
  }, [itemsRef.current[0]]);

  // -----------------------
  // Event Hanlders
  // -----------------------

  const handleDragStart = () => {
    dragStartX.current = translateX.get();
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dvwOffset = (info.offset.x / windowWidth.current) * 100;
    let draggedOffset = Math.round(dvwOffset / fullItemWidth.current);
    let nextX: number;

    if (draggedOffset == 0 && Math.abs(info.velocity.x) > 1000)
      draggedOffset = info.velocity.x > 0 ? 1 : -1;

    offset.current += draggedOffset;
    dragStartX.current = null;
    nextX = offset.current * fullItemWidth.current;

    translateX.stop();
    console.log(info.velocity.x);
    animation.current = animate(translateX, nextX, {
      type: 'spring',
      velocity: Math.max(Math.min(info.velocity.x, 100), -100),
      duration: 1.2,
    });

    motionValues.current.map((x, i) => {});
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (dragStartX.current == null) {
      animation.current?.stop();
      return;
    }

    const dragOffset = (info.offset.x / windowWidth.current) * 100;
    translateX.set((dragStartX.current ?? translateX.get()) + dragOffset);
  };

  return (
    <div className="max-w-full overflow-x-hidden bg-gray-200 py-12">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="flex h-60"
      >
        {items.map((color, i) => (
          <CarouselItem
            key={i}
            index={i}
            color={color}
            x={translateX}
            itemsRef={itemsRef}
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
