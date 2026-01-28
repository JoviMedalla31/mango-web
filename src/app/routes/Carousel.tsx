import { useState, useRef, useLayoutEffect, type RefObject } from 'react';
import { animate, motion, MotionValue, PanInfo, useAnimationFrame, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
import { useWidthCheck } from '@/hooks/useWidthCheck';

function CarouselItem({
  parent,
  x,
  isPaused,
  isDragged,
  index,
  itemsRef,
  offset,
}: {
  parent: RefObject<HTMLDivElement | null>;
  x: MotionValue;
  isPaused: RefObject<boolean>;
  isDragged: RefObject<boolean>;
  index: number;
  itemsRef: RefObject<(HTMLDivElement | null)[]>;
  offset: RefObject<number>;
}) {
  const { isSm, isMd } = useWidthCheck();

  // Refs
  const itemRef = useRef<HTMLDivElement>(null);
  const fullWidth = useRef(isSm ? 50 : 25);
  const gap = useRef(3);
  const itemWidth = useRef(fullWidth.current - gap.current);

  const [rerender, setRerender] = useState(false);

  x.set(-itemWidth.current);
  const translateX = useTransform(x, (val) => `${val}dvw`);

  useMotionValueEvent(x, 'change', (val) => {
    if (val < -fullWidth.current * (index + 1)) {
      val += fullWidth.current * itemsRef.current.length;
      x.set(val);
      offset.current -= 1;
    } else if (val > fullWidth.current * (itemsRef.current.length - (index + 1))) {
      val -= fullWidth.current * itemsRef.current.length;
      x.set(val);
      offset.current += 1;
    }
  });

  // -----------------------
  // Effects
  // -----------------------

  function getWrappedOffset() {
    const m = itemsRef.current.length;
    const mod = ((((offset.current + index) % m) + m) % m) - index;
    return mod;
  }

  useLayoutEffect(() => {
    fullWidth.current = isSm ? 50 : isMd ? 33 : 25;
    gap.current = isSm ? 5 : 3;
    itemWidth.current = fullWidth.current - gap.current;
    x.set(-itemWidth.current / 2 + fullWidth.current * getWrappedOffset());
    setRerender((v) => !v);
  }, [isSm, isMd]);

  useLayoutEffect(() => {
    const measure = () => {
      const nextPos =
        isMd && !isSm ? gap.current / 2 + fullWidth.current * getWrappedOffset() : -itemWidth.current / 2 + fullWidth.current * getWrappedOffset();

      isPaused.current = true;
      animate(x, nextPos, {
        duration: 1,
        type: 'tween',
        ease: 'easeOut',
        onComplete: () => (isPaused.current = false),
      });
    };
    measure();
    const observer = new ResizeObserver(() => {
      measure();
    });
    if (itemsRef.current[index]) observer.observe(itemsRef.current[index]!);
    return () => observer.disconnect();
  }, [itemsRef.current[index], isSm, isMd]);

  useAnimationFrame((t, delta) => {
    if (isDragged.current) return;
    if (isPaused.current) return;

    const speed = 2;
    const current = x.get();
    let next = current - (delta / 1000) * speed;

    x.set(next);
  });

  return (
    <motion.div
      ref={(el) => {
        itemRef.current = el;
        itemsRef.current[index] = el;
      }}
      className="group h-140"
      style={{
        minWidth: `${fullWidth.current}dvw`,
        paddingRight: `${gap.current}dvw`,
        translateX,
      }}
      transition={{}}
    >
      <div className="h-full rounded-[8rem] border-2 border-black/50 group-first:bg-amber-200 group-nth-2:bg-emerald-200 group-nth-3:bg-sky-200 group-nth-4:bg-amber-800 group-nth-5:bg-slate-600 group-nth-6:bg-indigo-400" />
    </motion.div>
  );
}

function Carousel() {
  const windowWidth = useRef(window.innerWidth);
  const motionValues = useRef<MotionValue[]>([new MotionValue(0), new MotionValue(0), new MotionValue(0), new MotionValue(0), new MotionValue(0)]);
  const initItemPositions = useRef<number[]>([]);
  const isPaused = useRef(false);
  const isDragged = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const offset = useRef(0);
  const containerWidth = useRef(0);

  // -----------------------
  // Effects
  // -----------------------

  useLayoutEffect(() => {
    const measure = () => {
      windowWidth.current = window.innerWidth;
      containerWidth.current = containerRef.current?.offsetWidth ?? 0;
    };

    measure();
    const observer = new ResizeObserver(() => {
      measure();
    });

    if (itemsRef.current[0]) observer.observe(itemsRef.current[0]!);
    return () => observer.disconnect();
  }, [itemsRef.current[0]]);

  // -----------------------
  // Event Handlers
  // -----------------------

  const handleMouseEnter = () => {
    isPaused.current = true;
  };

  const handleMouseLeave = () => {
    isPaused.current = false;
  };

  const handleDragStart = () => {
    isDragged.current = true;
    initItemPositions.current = motionValues.current.map((x) => x.get());
    console.log(initItemPositions.current);
  };

  const handleDragEnd = () => {
    isDragged.current = false;
    initItemPositions.current = [];
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = (info.offset.x / windowWidth.current) * 100;
    motionValues.current.forEach((x, i) => {
      x.set((initItemPositions.current[i] ?? x.get()) + offset);
    });
  };

  return (
    <div className="max-w-full items-center overflow-x-hidden bg-gray-200 py-12" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        ref={containerRef}
        className="flex w-fit border"
      >
        {[...Array(5)].map((_, i) => (
          <CarouselItem
            x={motionValues.current[i]}
            key={i}
            index={i}
            parent={containerRef}
            isPaused={isPaused}
            isDragged={isDragged}
            itemsRef={itemsRef}
            offset={offset}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default Carousel;
