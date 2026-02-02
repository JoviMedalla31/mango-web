import { useState, RefObject, useLayoutEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Link } from 'react-router-dom';

import logo from '/images/header-logo.svg';

const HIDDEN = -150;
const VISIBLE = 0;

const Header = ({
  ref = useRef<HTMLDivElement>(null),
  revealRef,
  revealOffset = -200,
}: {
  ref?: RefObject<HTMLDivElement | null>;
  revealRef?: RefObject<HTMLDivElement | null>;
  revealOffset?: number;
}) => {
  // Hooks
  const { scrollY } = useScroll();

  // Local States
  const [showHeader, setShowHeader] = useState(true);

  // Reference Object
  const [hasRevealRef, setHasRevealRef] = useState(revealRef != null);
  const revealY = useRef<number>(0);

  // ----------------
  // Custom Function
  // ----------------

  const setHeader = (state: boolean) => {
    if (showHeader != state) setShowHeader(state);
  };

  // ----------------
  // Framer Motion
  // ----------------

  useMotionValueEvent(scrollY, 'change', (scroll) => {
    const reveal = revealY.current;
    if (reveal <= 0) {
      setHeader(true);
      return;
    }

    const showHeader = scroll >= reveal + revealOffset;
    setHeader(showHeader);
  });

  // ----------------
  // Effects
  // ----------------

  useLayoutEffect(() => {
    const measure = () => {
      revealY.current = revealRef?.current?.offsetTop ?? 0;
    };

    const observer = new ResizeObserver(() => {
      measure();
    });

    measure();
    if (revealRef?.current) observer.observe(revealRef.current);
    return () => observer.disconnect();
  }, [revealRef, revealRef?.current]);

  useLayoutEffect(() => {
    console.log('reveal ref: ', hasRevealRef);
    if (!revealY?.current) {
      setHasRevealRef(false);
      setHeader(false);
      return;
    }

    setHasRevealRef(true);
    revealY.current = revealRef?.current?.offsetTop ?? 0;
  }, [revealRef, revealRef?.current]);

  return (
    <motion.header
      ref={ref}
      initial={{
        y: hasRevealRef ? HIDDEN : VISIBLE,
      }}
      animate={{
        y: showHeader ? VISIBLE : HIDDEN,
      }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.35 }}
      className="bg-faded-mango-100 fixed top-0 z-20 w-full"
    >
      <div className="bg-mango-400 h-4" />
      <div className="w-full">
        <div className="relative mx-auto max-w-(--xl)">
          <img src={logo} className="absolute -top-px left-8" />
          <div className="hidden sm:block">
            <nav className="text-mango-800 flex justify-center gap-10 pt-4 pb-3 text-xl">
              <Link to="/">
                <p>Home</p>
              </Link>
              <Link to="/">
                <p>Products</p>
              </Link>
              <Link to="/">
                <p>Bulk Orders</p>
              </Link>
              <Link to="/">
                <p>Contact Us</p>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
