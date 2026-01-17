import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScroll, useTransform, motion, useSpring, MotionValue } from 'motion/react';

import logo from '/images/home/logo.svg';
import charA from '/images/home/char-a.svg';
import { useEffect } from 'react';

const pageImages = [logo, charA];

function preloadImages(srcs: string[]) {
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = reject;
        }),
    ),
  );
}

const Img = ({
  src,
  scrollY,
  initialX,
  X,
  initialY,
  Y,
  initialRotate,
  rotate,
}: {
  src: string;
  scrollY: MotionValue<number>;
  initialX: number;
  X: number;
  initialY: number;
  Y: number;
  initialRotate: number;
  rotate: number;
}) => {
  const x = useTransform(scrollY, [0, 1], [initialX, X], { clamp: true });
  const y = useTransform(scrollY, [0, 1], [initialY, Y], { clamp: true });
  const rot = useTransform(scrollY, [0, 1], [initialRotate, rotate], { clamp: true });

  return (
    <motion.img
      src={src}
      initial={{ x: X, y: Y, rotate }}
      animate={{ x: initialX, y: initialY, rotate: initialRotate, transition: { duration: 0.7, ease: [0.07, 0.7, 0.2, 1.0] } }}
      style={{ x, y, rotate: rot }}
    />
  );
};

function App() {
  const [ready, setReady] = useState(false);
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, 300], [0, 1], { clamp: true });
  const scrollYSpring = useSpring(scrollYProgress, { bounce: 0 });

  useEffect(() => {
    Promise.all([document.fonts.ready, preloadImages(pageImages)]).then(() => setReady(true));
  });

  return (
    <div className="font-poppins text-2xl">
      {!ready ? (
        <p>I AM LOADING</p>
      ) : (
        <>
          <header className="bg-mango-400 flex h-12 w-full items-center justify-center gap-8 text-xl text-white">
            <p>About Us</p>
            <p>Products</p>
            <p>How to Order?</p>
            <p>Contact Us</p>
          </header>
          <main className="w-full">
            <section className="bg-mango-100 relative h-312">
              <img src={logo} className="absolute top-82 left-1/2 -translate-x-1/2 -rotate-[9.6deg]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Img src={charA} scrollY={scrollYSpring} initialX={150} X={290} initialY={-10} Y={200} rotate={120} initialRotate={-6.64} />
              </div>
            </section>
          </main>
          <Link to="/products/strips">
            <p className="h-300">Strips</p>
          </Link>
        </>
      )}
    </div>
  );
}

export default App;
