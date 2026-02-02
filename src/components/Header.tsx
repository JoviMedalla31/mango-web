import { RefObject, useLayoutEffect, useRef } from 'react';
import { motion, MotionStyle, MotionValue, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';

import logo from '/images/header-logo.svg';

const Header = ({
  ref = useRef<HTMLDivElement>(null),
  revealRef,
}: {
  ref?: RefObject<HTMLDivElement | null>;
  revealRef?: RefObject<HTMLDivElement | null>;
}) => {
  const revealY = useRef<number>(0);

  const { scrollY } = useScroll();

  // Motion Values
  const nextY = new MotionValue(0);
  const translateY = useTransform(scrollY, (scroll) => {
    console.log(revealY.current);
    // console.log(revealRef?.current?.offsetTop);
    if (!revealRef?.current) return nextY.get();
    return nextY.get();
  });

  useLayoutEffect(() => {
    revealY.current = revealRef?.current?.offsetTop ?? 0;
  }, [revealRef, revealRef?.current]);

  return (
    <motion.header
      ref={ref}
      style={{ y: translateY }}
      className="bg-faded-mango-100 fixed top-0 z-20 w-full"
    >
      <div className="bg-mango-400 h-4" />
      <div className="w-full">
        <div className="relative mx-auto max-w-(--xl)">
          <img src={logo} className="absolute top-0 left-8" />
          <nav className="text-mango-800 flex justify-center gap-10 pt-4 pb-3 text-xl">
            <Link to="/">
              <p>Home</p>
            </Link>
            <Link to="/">
              <p>Prodcuts</p>
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
    </motion.header>
  );
};

export default Header;
