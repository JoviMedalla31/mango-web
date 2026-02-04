import { useEffect } from 'react';
import { DragEvent, MouseEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScroll, useTransform, motion, useSpring, MotionValue } from 'motion/react';
import Header from '@/components/Header';
import Carousel from '@/components/Carousel';

// Hero Img
import logo from '/images/home/logo.svg';
import charA from '/images/home/char-a.svg';
import heroLogo from '/images/hero/hero-logo.svg';
import dividerA from '/images/divider-a.svg';
import dividerB from '/images/divider-b.svg';
// Shapes
import mango2 from '/images/shapes/mango-2.svg';
import long3 from '/images/shapes/long-3.svg';
import long5 from '/images/shapes/long-5.svg';
import strips2 from '/images/shapes/strips-2.svg';
import strips4 from '/images/shapes/strips-4.svg';

import tree from '/images/home/tree.svg';

// Carousel Img
import chocolateImg from '/images/products/carousel/chocolate.png';
import sliceImg from '/images/products/carousel/slice.png';
import spaghettiImg from '/images/products/carousel/spaghetti.png';
import stripImg from '/images/products/carousel/strip.png';

const pageImages = [
  logo,
  charA,
  heroLogo,
  dividerA,
  chocolateImg,
  sliceImg,
  spaghettiImg,
  stripImg,
];

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

const HeroImg = ({
  src,
  scrollY,
  x: [X, initialX] = [0, 0],
  y: [Y, initialY] = [0, 0],
  rotate: [rotate, initialRotate] = [0, 0],
}: {
  src: string;
  scrollY: MotionValue<number>;
  x?: [number, number];
  y?: [number, number];
  rotate?: [number, number];
}) => {
  const x = useTransform(scrollY, [0, 1], [initialX, X], { clamp: true });
  const y = useTransform(scrollY, [0, 1], [initialY, Y], { clamp: true });
  const rot = useTransform(scrollY, [0, 1], [initialRotate, rotate], { clamp: true });

  const transformX = useTransform(x, (val) => `${val / 16}rem`);
  const transformY = useTransform(y, (val) => `${val / 16}rem`);

  return (
    <motion.img
      src={src}
      initial={{ x: X / 16 + 'rem', y: Y / 16 + 'rem', rotate }}
      animate={{
        x: initialX / 16 + 'rem',
        y: initialY / 16 + 'rem',
        rotate: initialRotate,
        transition: { duration: 0.7, ease: [0.07, 0.7, 0.2, 1.0] },
      }}
      style={{ x: transformX, y: transformY, rotate: rot }}
      className="absolute"
    />
  );
};

function App() {
  // Hooks
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Ref
  const carouselRef = useRef<HTMLDivElement>(null);

  const mouseDownPos = useRef<[number, number] | null>(null);
  const [ready, setReady] = useState(false);

  // Motion Values
  const scrollYProgress = useTransform(scrollY, [0, 500], [0, 1], { clamp: true });
  const scrollYSpring = useSpring(scrollYProgress, { bounce: 0 });

  // --------------------
  // Effects
  // --------------------

  useEffect(() => {
    Promise.all([document.fonts.ready, preloadImages(pageImages)]).then(() =>
      setReady(true),
    );
  });

  // --------------------
  // Event Handler
  // --------------------

  const handleCarouselMouseDown = (e: MouseEvent) => {
    mouseDownPos.current = [e.screenX, e.screenY];
  };

  // Navigate to product page if carousel ends on the same position.
  // (will still navigate even if carousel was dragged and returned to the same position)
  const handleCarouselClicked = (path: string) => (e: MouseEvent) => {
    const mouseOffset = [
      Math.abs((mouseDownPos.current?.[0] ?? 0) - e.screenX),
      Math.abs((mouseDownPos.current?.[1] ?? 0) - e.screenY),
    ];

    mouseDownPos.current = null;
    if (mouseOffset[0] > 10 || mouseOffset[1] > 10) return;

    navigate(`products/${path}`);
    console.log('item clicked');
  };

  return (
    <div className="font-poppins relative bg-mango-100 text-2xl">
      {!ready ? (
        <p>I AM LOADING</p>
      ) : (
        <>
          <Header revealRef={carouselRef} revealOffset={-750} />
          <main id="hero" className="w-full relative">
            {/* Branding Nav Bar (Not real nav bar) */}
            <section className="bg-faded-mango-100 w-full">
              <div className="bg-mango-400 h-4 w-full" />
              <div className="relative h-16">
                <img src={heroLogo} className="absolute left-1/2 z-20 -translate-x-1/2" />
              </div>
            </section>
            {/* Hero Section */}
            <section className="bg-mango-100 relative z-0 h-270 w-full overflow-x-hidden">
              {/* <img
                src={logo}
                className="absolute top-82 left-1/2 -translate-x-1/2 -rotate-[9.6deg]"
              /> */}
              <div className="absolute top-1/2 left-1/2 h-50 w-50">
                {/* <div className="h-20 w-20 bg-red-500" /> */}
                <HeroImg
                  src={mango2}
                  scrollY={scrollYSpring}
                  x={[-230, -210]}
                  y={[-190, -270]}
                  rotate={[-30, 0]}
                />
                <HeroImg
                  src={long3}
                  scrollY={scrollYSpring}
                  x={[-65, -70]}
                  y={[-200, -320]}
                  rotate={[-50, 0]}
                />
                <HeroImg
                  src={strips2}
                  scrollY={scrollYSpring}
                  x={[240, 200]}
                  y={[-250, -430]}
                  rotate={[34, 0]}
                />
              </div>
              <img
                src={dividerA}
                className="pointer-events-none absolute min-w-xl left-1/2 -translate-x-1/2
                  bottom-0 select-none"
              />
            </section>
            <section
              id="products"
              className="py-20 pb-22 md:py-28 md:pb-34 lg:py-34 lg:pb-39 xl:py-44 xl:pb-52
                relative"
            >
              <Carousel
                ref={carouselRef}
                items={[
                  <div
                    onMouseDown={handleCarouselMouseDown}
                    onClick={handleCarouselClicked('strips')}
                  >
                    <img src={sliceImg} className="pointer-events-none select-none" />
                  </div>,
                  <div
                    onMouseDown={handleCarouselMouseDown}
                    onClick={handleCarouselClicked('strips')}
                  >
                    <img src={stripImg} className="pointer-events-none select-none" />
                  </div>,
                  <div
                    onMouseDown={handleCarouselMouseDown}
                    onClick={handleCarouselClicked('strips')}
                  >
                    <img src={spaghettiImg} className="pointer-events-none select-none" />
                  </div>,
                  <div
                    onMouseDown={handleCarouselMouseDown}
                    onClick={handleCarouselClicked('strips')}
                  >
                    <img src={chocolateImg} className="pointer-events-none select-none" />
                  </div>,
                ]}
              />
              <img
                src={dividerB}
                className="min-w-xl absolute left-1/2 -translate-x-1/2 pointer-events-none
                  bottom-0 w-full"
              />
            </section>
            <section
              id="about-us "
              className="text-mango-800 text-center max-w-360 w-full mx-auto flex flex-col
                justify-stretch px-40"
            >
              <div className="flex">
                <div className="grow border relative border-red-500">
                  <img src={tree} className="absolute right-5 top-40" />
                </div>
                <div
                  className="w-160 border-red-500 border h-200 items-center flex
                    justify-center relative"
                >
                  <div className="z-1">
                    <h3 className="font-pt-serif font-bold text-6xl mb-8">Who Are We?</h3>
                    <p className="text-faded-mango-500">
                      The Guadalupe Brand has been under the careful watch of{' '}
                      <span className="font-bold">Camiluz Enterprises Inc.</span> since
                      1979. <br /> A family owned business aiming to for provide
                      high-quality, additive-free dried mangoes that travelers are excited
                      to bring back home to share.
                    </p>
                  </div>
                  <img
                    src={strips4}
                    className="h-64 rotate-112 absolute top-12 -right-12"
                  />
                  <img src={long5} className="absolute top-25 left-0" />
                </div>
              </div>
            </section>
          </main>
          <div className="h-300" />
          {/* <Link to="/products/strips">
            <p className="h-300">Strips</p>
          </Link> */}
        </>
      )}
    </div>
  );
}

export default App;
