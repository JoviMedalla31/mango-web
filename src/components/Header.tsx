import { useState, RefObject, useLayoutEffect, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Link } from 'react-router-dom';

import logo from '/images/header-logo.svg';
import { Menu } from 'lucide-react';
import { useWidthCheck } from '@/hooks/useWidthCheck';

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
  const { isSm, isMd, isLg } = useWidthCheck();

  console.log('small', isSm)

  // Local States
  const [showHeader, setShowHeader] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

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
    if (!revealY?.current) {
      setHasRevealRef(false);
      setHeader(false);
      return;
    }

    setHasRevealRef(true);
    revealY.current = revealRef?.current?.offsetTop ?? 0;
  }, [revealRef, revealRef?.current]);

  useEffect(() => {
    if (showMenu) setShowMenu(false);
  }, [showHeader, isLg]);

  // ----------------
  // Event Handler
  // ----------------

  const handleHamburgerMenuClicked = () => {
    setShowMenu((prev) => !prev);
  };

  const closeHamburgerMenu = () => {
    setShowMenu(false);
  }

  return (
    <>
      <motion.header
        ref={ref}
        initial={{
          y: hasRevealRef ? HIDDEN : VISIBLE,
        }}
        animate={{
          y: showHeader ? VISIBLE : HIDDEN,
          backgroundColor: showMenu
            ? 'var(--color-mango-50)'
            : 'var(--color-faded-mango-100)',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.35 }}
        className={`${showMenu && 'menu'} fixed top-0 z-20 w-full`}
      >
        <div className="bg-mango-400 h-4" />
        <div className="w-full">
          <div
            className="relative mx-auto flex h-14 max-w-(--xl) items-center justify-end
              px-4 lg:h-auto"
          >
            <motion.div
              className="absolute w-46 lg:w-46 md:w-54 -top-px left-8  flex
                flex-col bg-red"
            >
              <motion.div
                animate={{
                  height: showMenu ? '70dvh' : 0,
                  paddingTop: showMenu ? '3rem' : '0rem',
                }}
                initial={{ height: 0 }}
                transition={{
                  type: showMenu ? 'spring' : 'tween',
                  ease: 'easeOut',
                }}
                className="flex justify-center items-center overflow-clip bg-mango-400"
              >
                <nav
                  className="flex lg:hidden flex-col gap-18 text-center font-semibold
                    text-2xl justify-center text-mango-800"
                >
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
              </motion.div>
              <img src={logo} className="pointer-events-none" />
            </motion.div>
            <div className="p-1 cursor-pointer">
              <Menu
                className="stroke-3 block lg:hidden stroke-mango-800"
                onClick={handleHamburgerMenuClicked}
              />
            </div>
            {!isLg && (
              <div className="grow">
                <nav
                  className="text-mango-800 flex justify-center gap-10 pt-4 pb-3 text-xl"
                >
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
            )}
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            id="testid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-19 top-0 left-0 w-screen h-screen bg-mango-50/88"
            onMouseDown={closeHamburgerMenu}
            onTouchStart={closeHamburgerMenu}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
