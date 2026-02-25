import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { RefObject, useState } from 'react';

const Mouse = () => {
  return (
    <div>
      <div className="relative rounded-full w-8 h-12 border-3 border-mango-800">
        <motion.div
          animate={{
            y: [0, 5, -1, 0],
          }}
          transition={{
            duration: 0.6,
            times: [0, 0.5, 0.95, 1],
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-3 rounded-full
            bg-mango-800"
        />
      </div>
    </div>
  );
};

const ScrollHint = ({
  scrollToRef,
}: {
  scrollToRef: RefObject<HTMLDivElement | null>;
}) => {
  const { scrollY } = useScroll();
  const [showScroll, setShowScroll] = useState(true);

  const changeShowScroll = (val: boolean) => {
    if (showScroll != val) setShowScroll(val);
  };

  useMotionValueEvent(scrollY, 'change', (scroll) => {
    changeShowScroll(scroll <= 100);
  });

  const handleScrollClicked = () => {
    // scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Fallback for browsers that don't support scrollIntoView with smooth behavior
    if (scrollToRef.current) {
      const targetPosition =
        scrollToRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.12,
          }}
          className="h-dvh w-dvw pointer-events-none absolute z-20"
        >
          <div
            className="bottom-8 absolute left-1/2 -translate-x-1/2 pointer-events-auto
              cursor-pointer"
            onClick={handleScrollClicked}
          >
            <Mouse />
            <div>
              <motion.div
                className="not-first:-mt-4"
                animate={{
                  y: [0, 5, -1, 0],
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.6,
                  times: [0, 0.5, 0.95, 1],
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <ChevronDown className="text-mango-800 stroke-2 w-8 h-8" />
              </motion.div>
              <motion.div
                className="not-first:-mt-4"
                animate={{
                  y: [0, 5, -1, 0],
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                  times: [0, 0.5, 0.95, 1],
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <ChevronDown className="text-mango-800 stroke-2 w-8 h-8" />
              </motion.div>
              <motion.div
                className="not-first:-mt-4"
                animate={{
                  y: [0, 5, -1, 0],
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.6,
                  times: [0, 0.5, 0.95, 1],
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <ChevronDown className="text-mango-800 stroke-2 w-8 h-8" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollHint;
