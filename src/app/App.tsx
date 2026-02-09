import { useEffect } from 'react';
import { DragEvent, MouseEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useScroll, useTransform, motion, useSpring, MotionValue } from 'motion/react';
import { useWidthCheck } from '@/hooks/useWidthCheck';

// Components
import Header from '@/components/Header';
import ProductCarousel from '@/components/ProductCarousel';
import Footer from '@/components/Footer';

// Hero Img
import logo from '/images/home/logo.svg';
import charA from '/images/home/char-a.svg';
import heroLogo from '/images/hero/hero-logo.svg';
import dividerA from '/images/divider-a.svg';
import dividerB from '/images/divider-b.svg';
// Shapes
import mango1 from '/images/shapes/mango-1.svg';
import mango2 from '/images/shapes/mango-2.svg';
import mango3 from '/images/shapes/mango-3.svg';
import mango3b from '/images/shapes/mango-3b.svg';
import mango4 from '/images/shapes/mango-4.svg';
import mango5 from '/images/shapes/mango-5.svg';
import mango6 from '/images/shapes/mango-6.svg';
import long1 from '/images/shapes/long-1.svg';
import long2 from '/images/shapes/long-2.svg';
import long3 from '/images/shapes/long-3.svg';
import long5 from '/images/shapes/long-5.svg';
import strips1 from '/images/shapes/strips-1.svg';
import strips2 from '/images/shapes/strips-2.svg';
import strips3 from '/images/shapes/strips-3.svg';
import strips4 from '/images/shapes/strips-4.svg';
import strips5 from '/images/shapes/strips-5.svg';
import strips6 from '/images/shapes/strips-6.svg';
import strips7 from '/images/shapes/strips-7.svg';
import strips8 from '/images/shapes/strips-8.svg';
import strips9 from '/images/shapes/strips-9.svg';
import strips10 from '/images/shapes/strips-10.svg';
import strips11 from '/images/shapes/strips-11.svg';
import strips12 from '/images/shapes/strips-12.svg';
import strips13 from '/images/shapes/strips-13.svg';
import strips14 from '/images/shapes/strips-14.svg';
import strips15 from '/images/shapes/strips-15.svg';
import dashedLine from '/images/shapes/dashed-line.svg';
import mapPin from '/images/shapes/map-pin.svg';

import tree from '/images/home/tree.svg';

// Carousel Img
import chocolateImg from '/images/products/shots/chocolate.png';
import sliceImg from '/images/products/shots/slice.png';
import spaghettiImg from '/images/products/shots/spaghetti.png';
import stripImg from '/images/products/shots/strip.png';

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
  const { isSm, isMd, isLg } = useWidthCheck();

  const x = useTransform(scrollY, [0, 1], [initialX, X], { clamp: true });
  const y = useTransform(scrollY, [0, 1], [initialY, Y], { clamp: true });
  const rot = useTransform(scrollY, [0, 1], [initialRotate, rotate], { clamp: true });

  const baseUnit = isSm ? 24 : 16;
  const transformX = useTransform(x, (val) => `${val / baseUnit}rem`);
  const transformY = useTransform(y, (val) => `${val / 16}rem`);

  return (
    <motion.img
      src={src}
      initial={{ x: X / baseUnit + 'rem', y: Y / 16 + 'rem', rotate }}
      animate={{
        x: initialX / baseUnit + 'rem',
        y: initialY / 16 + 'rem',
        rotate: initialRotate,
        transition: { duration: 0.7, ease: [0.07, 0.7, 0.2, 1.0] },
      }}
      style={{ x: transformX, y: transformY, rotate: rot, scale: isSm ? 0.7 : 1 }}
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
  const scrollYProgress = useTransform(scrollY, [0, 750], [0, 1], { clamp: true });
  const scrollYSpring = useSpring(scrollYProgress, { bounce: 0 });

  // Hero
  const heroLogoHeight = useTransform(scrollYProgress, [0, 1], [0, 800], { clamp: true });

  // --------------------
  // Effects
  // --------------------

  useEffect(() => {
    Promise.all([document.fonts.ready, preloadImages(pageImages)]).then(() =>
      setReady(true),
    );
  });

  return (
    <div className="font-poppins relative bg-mango-100 text-2xl">
      {!ready ? (
        <p>I AM LOADING</p>
      ) : (
        <>
          <Header
            key="home"
            revealRef={carouselRef}
            revealOffset={-450}
            initialHide={true}
          />
          <main id="hero" className="w-full relative overflow-x-clip">
            {/* Branding Nav Bar (Not real nav bar) */}
            <section className="bg-faded-mango-100 w-full">
              <div className="bg-mango-400 h-4 w-full" />
              <div className="relative h-16">
                <div className="absolute w-88 left-1/2 -translate-x-1/2 z-20">
                  <motion.div
                    className="w-full bg-mango-400 -mt-px"
                    style={{ height: heroLogoHeight }}
                  />
                  <img src={heroLogo} className="" />
                </div>
              </div>
            </section>
            {/* Hero Section */}
            <section className="bg-mango-100 relative z-0 h-270 w-full overflow-hidden">
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
                  x={[240, 203]}
                  y={[-250, -439]}
                  rotate={[34, 0]}
                />
                <HeroImg
                  src={mango5}
                  scrollY={scrollYSpring}
                  x={[40, 13]}
                  y={[80, -183]}
                  rotate={[20, 0]}
                />
                <HeroImg
                  src={strips12}
                  scrollY={scrollYSpring}
                  x={[-270, -245]}
                  y={[20, -121]}
                  rotate={[50, 0]}
                />
                <HeroImg
                  src={strips5}
                  scrollY={scrollYSpring}
                  x={[-68, -42]}
                  y={[200, 10]}
                  rotate={[-150, 0]}
                />
                <HeroImg
                  src={mango6}
                  scrollY={scrollYSpring}
                  x={[40, 72]}
                  y={[320, 182]}
                  rotate={[-60, 0]}
                />
                <HeroImg
                  src={strips8}
                  scrollY={scrollYSpring}
                  x={[-190, -180]}
                  y={[240, 100]}
                  rotate={[-20, -92]}
                />
                <HeroImg
                  src={strips4}
                  scrollY={scrollYSpring}
                  x={[-480, -436]}
                  y={[60, -109]}
                  rotate={[-60, -24]}
                />
                <HeroImg
                  src={strips14}
                  scrollY={scrollYSpring}
                  x={[-280, -209]}
                  y={[390, 236]}
                  rotate={[70, 31]}
                />
                <HeroImg
                  src={mango3}
                  scrollY={scrollYSpring}
                  x={[-440, -340]}
                  y={[410, 220]}
                  rotate={[-120, -20]}
                />
                <HeroImg
                  src={strips6}
                  scrollY={scrollYSpring}
                  x={[189, 159]}
                  y={[159, -50]}
                  rotate={[-70, 0]}
                />
                <HeroImg
                  src={long5}
                  scrollY={scrollYSpring}
                  x={[260, 283]}
                  y={[360, 140]}
                  rotate={[260, 40]}
                />
                <HeroImg
                  src={strips9}
                  scrollY={scrollYSpring}
                  x={[372, 372]}
                  y={[500, 250]}
                  rotate={[0, 40]}
                />
                <HeroImg
                  src={strips13}
                  scrollY={scrollYSpring}
                  x={[430, 370]}
                  y={[250, -20]}
                  rotate={[100, 23]}
                />
                <HeroImg
                  src={mango3}
                  scrollY={scrollYSpring}
                  x={[623, 543]}
                  y={[190, 50]}
                  rotate={[-100, 0]}
                />
                <HeroImg
                  src={strips7}
                  scrollY={scrollYSpring}
                  x={[780, 564]}
                  y={[460, -123]}
                  rotate={[240, 0]}
                />
                <HeroImg
                  src={mango1}
                  scrollY={scrollYSpring}
                  x={[370, 235]}
                  y={[0, -210]}
                  rotate={[120, 0]}
                />
                <HeroImg
                  src={strips11}
                  scrollY={scrollYSpring}
                  x={[450, 385]}
                  y={[0, -304]}
                  rotate={[-120, 5.8]}
                />
                <HeroImg
                  src={long3}
                  scrollY={scrollYSpring}
                  x={[380, 291]}
                  y={[-290, -550]}
                  rotate={[0, -20]}
                />
                <HeroImg
                  src={strips3}
                  scrollY={scrollYSpring}
                  x={[330, 355]}
                  y={[-90, -453]}
                  rotate={[120, 20]}
                />
                <HeroImg
                  src={mango2}
                  scrollY={scrollYSpring}
                  x={[570, 524]}
                  y={[-240, -559]}
                  rotate={[0, -48]}
                />
                <HeroImg
                  src={mango3}
                  scrollY={scrollYSpring}
                  x={[741, 621]}
                  y={[-140, -455]}
                  rotate={[-20, 70]}
                />
                <HeroImg
                  src={long1}
                  scrollY={scrollYSpring}
                  x={[-690, -640]}
                  y={[450, 267]}
                  rotate={[240, 0]}
                />
                <HeroImg
                  src={mango4}
                  scrollY={scrollYSpring}
                  x={[-920, -680]}
                  y={[320, -31]}
                  rotate={[0, -50]}
                />
                <HeroImg
                  src={strips15}
                  scrollY={scrollYSpring}
                  x={[-580, -693]}
                  y={[320, -309]}
                  rotate={[90, -20]}
                />
                <HeroImg
                  src={strips1}
                  scrollY={scrollYSpring}
                  x={[-720, -423]}
                  y={[80, -338]}
                  rotate={[-50, 30]}
                />
                <HeroImg
                  src={strips10}
                  scrollY={scrollYSpring}
                  x={[-470, -381]}
                  y={[-190, -505]}
                  rotate={[-170, 20]}
                />
                <HeroImg
                  src={mango1}
                  scrollY={scrollYSpring}
                  x={[-740, -555]}
                  y={[-190, -445]}
                  rotate={[-170, 20]}
                />
                <HeroImg
                  src={long2}
                  scrollY={scrollYSpring}
                  x={[-740, -580]}
                  y={[-420, -597]}
                  rotate={[80, 0]}
                />
              </div>
              <img
                src={dividerA}
                className="pointer-events-none absolute min-w-xl left-1/2 -translate-x-1/2
                  bottom-0 select-none translate-y-px"
              />
            </section>
            <section
              id="products"
              className="py-20 pb-22 md:py-28 md:pb-34 lg:py-34 lg:pb-39 xl:py-44 xl:pb-52
                relative"
            >
              <ProductCarousel ref={carouselRef} />
              <img
                src={dividerB}
                className="min-w-xl absolute left-1/2 -translate-x-1/2 pointer-events-none
                  bottom-0 w-full"
              />
            </section>
            <section
              id="about-us "
              className="text-mango-800 my-30 text-center max-w-304 px-16 sm:px-12 w-full
                mx-auto flex flex-col justify-stretch gap-8 sm:gap-12 md:gap-24"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-[0.7fr_1fr]
                  xl:grid-cols-[30rem_1fr]"
              >
                <div className="row-start-1 col-start-1 relative">
                  <img
                    src={tree}
                    className="absolute h-4/5 lg:h-auto md:h-full top-7/11
                      -translate-y-1/2 md:top-1/20 md:translate-y-0 lg:translate-y-0
                      -translate-x-full md:translate-x-0 lg:min-w-105 md:right-6
                      lg:top-40"
                  />
                  <img
                    src={mango3b}
                    className="hidden md:block absolute md:right-65 md:bottom-3
                      lg:bottom-0 lg:right-120 lg:top-58 -rotate-24"
                  />
                  <img
                    src={strips2}
                    className="hidden md:block absolute bottom-19 right-101 -rotate-30"
                  />
                </div>
                <div
                  className="row-start col-start-1 md:col-start-2 row-start-1 h-fit py-12
                    lg:h-200 items-center flex justify-center relative"
                >
                  <div className="z-1">
                    <h3 className="font-pt-serif text-3xl font-bold lg:text-6xl mb-8">
                      Who Are We?
                    </h3>
                    <p className="text-faded-mango-500 text-base sm:text-xl lg:text-2xl">
                      The Guadalupe Brand has been under the careful watch of{' '}
                      <span className="font-bold">Camiluz Enterprises Inc.</span> since
                      1979. <br className="hidden xl:block" /> A family owned business
                      aiming to for provide high-quality, additive-free dried mangoes that
                      travelers are excited to bring back home to share.
                    </p>
                  </div>
                  <img
                    src={strips4}
                    className="h-22 right-1/2 translate-x-38 top-0 lg:translate-x-0
                      lg:h-64 rotate-112 absolute lg:top-12 lg:-right-12"
                  />
                  <img
                    src={long5}
                    className="absolute w-10 right-0 translate-x-12/10 lg:right-auto
                      lg:w-auto lg:top-25 lg:translate-x-0 lg:-left-10"
                  />
                </div>
              </div>
              <div
                className="grid grid-cols-1 md:grid-cols-[1fr_0.7fr]
                  xl:grid-cols-[1fr_30rem]"
              >
                <div className="row-start-1 col-start-1 relative md:col-start-2">
                  <img
                    src={strips6}
                    className="absolute hidden md:block w-44 right-1/2 translate-x-1/2 z-1
                      lg:translate-x-0 rotate-0 lg:right-24 top-10 lg:-top-10
                      lg:rotate-20"
                  />
                </div>
                <div
                  className="row-start col-start-1 row-start-1 h-fit py-12 lg:h-200
                    items-center flex justify-center relative"
                >
                  <div className="z-1">
                    <h3 className="font-pt-serif text-3xl font-bold lg:text-6xl mb-8">
                      The Heart
                    </h3>
                    <p className="text-faded-mango-500 text-base sm:text-xl lg:text-2xl">
                      We invite you to visit our factory store on Happy Valley Road, where
                      our journey began. Shop our full range of classics and new
                      innovations directly from the source.
                    </p>
                    <div
                      className="mt-12 text-lg w-fit mx-auto px-4 font-semibold
                        text-mango-400 border-mango-400 flex gap-3 py-1 sm:text-2xl
                        lg:text-4xl border-5 rounded-xl border-dashed items-center"
                    >
                      <MapPin className="w-8 h-8 stroke-2" />
                      Locate Store
                    </div>
                  </div>
                  <img
                    src={dashedLine}
                    className="absolute hidden md:block left-1/2 md:-translate-x-90
                      lg:-translate-x-135 -top-10 md:min-w-220 lg:top-0 lg:min-w-385"
                  />
                  <img
                    src={long1}
                    className="absolute block md:hidden lg:block left-1/2 md:translate-x-0
                      -translate-x-55 md:w-auto w-25 top-5 md:-left-45 md:top-20
                      -rotate-5"
                  />
                  <img
                    src={mango4}
                    className="absolute w-16 lg:w-auto left-1/2 -translate-x-55
                      sm:-translate-x-64 lg:translate-x-0 lg:-left-20 bottom-7
                      lg:bottom-22 -rotate-70"
                  />
                  <img
                    src={mapPin}
                    className="absolute block md:hidden lg:block left-1/2 translate-x-28
                      sm:translate-x-36 lg:w-auto w-30 lg:translate-x-95 lg:bottom-auto
                      bottom-5 lg:top-32 z-1"
                  />
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
