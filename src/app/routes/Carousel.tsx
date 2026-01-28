import { useState, useRef, useLayoutEffect, type RefObject } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, type MotionStyle } from 'motion/react';
import { useWidthCheck } from '@/hooks/useWidthCheck';
import { animate } from 'motion';

function CarouselItem({
  parent,
  pauseAnim,
  index,
  itemsRef,
  offset,
}: {
  parent: RefObject<HTMLDivElement | null>;
  pauseAnim: RefObject<boolean>;
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

  const x = useMotionValue(-itemWidth.current);
  const translateX = useTransform(x, (val) => `${val}dvw`);

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
    x.set(-itemWidth.current / 2);
    setRerender((v) => !v);
  }, [isSm, isMd]);

  useLayoutEffect(() => {
    const measure = () => {
      // console.log('medium', isMd);
      // console.log('small', isSm);
      pauseAnim.current = true;
      if (isMd && !isSm) {
        animate(x, gap.current / 2 + fullWidth.current * getWrappedOffset(), {
          duration: 1,
          type: 'tween',
          ease: 'easeOut',
          onComplete: () => (pauseAnim.current = false),
        });
      } else {
        console.log('this one');
        animate(x, -itemWidth.current / 2 + fullWidth.current * getWrappedOffset(), {
          duration: 1,
          type: 'tween',
          ease: 'easeOut',
          onComplete: () => (pauseAnim.current = false),
        });
      }
    };
    measure();
    const observer = new ResizeObserver(() => {
      measure();
    });
    if (itemsRef.current[index]) observer.observe(itemsRef.current[index]!);
    return () => observer.disconnect();
  }, [itemsRef.current[index], isSm, isMd]);

  useAnimationFrame((t, delta) => {
    if (pauseAnim.current) return;

    const speed = 10;
    const current = x.get();
    let next = current - (delta / 1000) * speed;

    if (next < -fullWidth.current * (index + 1)) {
      next += itemsRef.current.length * fullWidth.current;
      offset.current -= 1;
    }

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
  const isHovered = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const offset = useRef(0);

  const handleMouseEnter = () => {
    // isHovered.current = true;
  };

  const handleMouseLeave = () => {
    // isHovered.current = false;
  };

  return (
    <div className="max-w-full items-center overflow-x-hidden bg-gray-200 py-12" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div ref={containerRef} className="flex w-fit border">
        {[...Array(5)].map((_, i) => (
          <CarouselItem key={i} index={i} parent={containerRef} pauseAnim={isHovered} itemsRef={itemsRef} offset={offset} />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
