import { useRef, useLayoutEffect, type RefObject } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, type MotionStyle } from 'motion/react';

function CarouselItem({ parent, pauseAnim, index }: { parent: RefObject<HTMLDivElement | null>; pauseAnim: RefObject<boolean>; index: number }) {
  const initX = useRef(0);
  const itemRef = useRef<HTMLDivElement>(null);

  // widths
  const parentWidth = useRef(0);
  const left = useRef(0);
  const width = useRef(0);

  // -----------------------
  // Motion Values
  // -----------------------

  const x = useMotionValue(0);
  const translateX = useTransform(x, (val) => `calc(${val}%`);

  // -----------------------
  // Effects
  // -----------------------

  useLayoutEffect(() => {
    const measure = () => {
      parentWidth.current = parent.current?.offsetWidth ?? 0;
      width.current = itemRef.current?.offsetWidth ?? 0;
      left.current = itemRef.current?.offsetLeft ?? 0;
    };

    measure();
    const observer = new ResizeObserver(() => measure());
    if (itemRef.current) observer.observe(itemRef.current);

    return () => observer.disconnect();
  }, [itemRef]);

  const getPosInPx = (x: number) => {
    return (x / 100) * width.current + left.current - width.current / 2;
  };

  useAnimationFrame((t, delta) => {
    if (pauseAnim.current) return;

    const speed = 10;
    const current = x.get();
    let next = current - (delta / 1000) * speed;

    if (index == 0) console.log(width, getPosInPx(next) + width.current);
    if (getPosInPx(next) + width.current < 0) {
      next += (parentWidth.current * 100) / width.current;
    }
    // if (getPosInPx(next) + width.current < 0) {
    //   // next += (parentWidth.current + width.current) / width.current;
    //   next += (parentWidth.current * 100) / width.current;
    // }

    x.set(next);
    // console.log(parentWidth.current, width.current, left.current);
  });

  return (
    <motion.div
      ref={itemRef}
      className="h-140 min-w-[21dvw] rounded-[8rem] border-2 border-black/50 first:bg-amber-200 nth-2:bg-emerald-200 nth-3:bg-sky-200 nth-4:bg-amber-800 nth-5:bg-slate-600 nth-6:bg-indigo-400"
      style={{
        translateX,
      }}
      transition={{}}
    ></motion.div>
  );
}

function Carousel() {
  const isHovered = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    console.log();
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
  };

  return (
    <div className="max-w-full items-center overflow-x-hidden bg-gray-200 py-12" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div ref={containerRef} className="flex w-fit -translate-x-[10.5dvw] gap-[4dvw] border pr-[4dvw]">
        {[...Array(5)].map((_, i) => (
          <CarouselItem key={i} index={i} parent={containerRef} pauseAnim={isHovered} />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
