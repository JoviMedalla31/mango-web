import { useEffect } from 'react';
import { DragEvent, MouseEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
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
import mango3b from '/images/shapes/mango-3b.svg';
import mango4 from '/images/shapes/mango-4.svg';
import long1 from '/images/shapes/long-1.svg';
import long2 from '/images/shapes/long-2.svg';
import long3 from '/images/shapes/long-3.svg';
import long5 from '/images/shapes/long-5.svg';
import strips1 from '/images/shapes/strips-1.svg';
import strips2 from '/images/shapes/strips-2.svg';
import strips4 from '/images/shapes/strips-4.svg';
import strips6 from '/images/shapes/strips-6.svg';
import dashedLine from '/images/shapes/dashed-line.svg';
import mapPin from '/images/shapes/map-pin.svg';

import tree from '/images/home/tree.svg';

// Carousel Img
import chocolateImg from '/images/products/carousel/chocolate.png';
import sliceImg from '/images/products/carousel/slice.png';
import spaghettiImg from '/images/products/carousel/spaghetti.png';
import stripImg from '/images/products/carousel/strip.png';

// Footer
import email from '/images/footer/email.svg';
import phone from '/images/footer/phone.svg';
import instagram from '/images/footer/instagram.svg';
import facebook from '/images/footer/facebook.svg';

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
          <Header revealRef={carouselRef} revealOffset={-450} />
          <main id="hero" className="w-full relative overflow-x-clip">
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
                    className="absolute w-16 left-1/2 -translate-x-55 sm:-translate-x-64
                      lg:-left-20 bottom-7 lg:bottom-22 -rotate-70"
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
          <footer className="z-1 flex w-full flex-col items-center overflow-x-hidden">
            <div
              className="z-1 grid justify-items-center w-full max-w-180 grid-cols-1
                gap-x-8 px-4 text-2xl md:grid-cols-2 sm:text-lg/snug lg:max-w-240
                lg:grid-cols-3 lg:text-xl xl:max-w-300 xl:text-2xl"
            >
              <div className="col-start-1 mt-8 max-w-70 text-center md:mt-0 md:max-w-90">
                <div>
                  <svg
                    viewBox="0 0 333 86"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-mango-400 -mb-1 w-full"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M332.999 85.9998L333.004 16.0816L309.254 4.37001e-05L0.000336502 76.7506L0.000335693 86.0029L332.999 85.9998Z"
                    />
                  </svg>
                  <div
                    className="bg-mango-400 w-full text-mango-800 px-6 pt-8 pb-8 md:pb-24"
                  >
                    <h3
                      className="font-pt-serif text-2xl font-bold lg:text-3xl xl:text-4xl"
                    >
                      Bulk Orders?
                    </h3>
                    <p className="mt-4 text-base sm:text-lg lg:text-xl xl:text-2xl">
                      Please contact us with the following for bulk orders and wholesale
                      pricing
                    </p>
                    <div
                      className="mt-12 hidden md:flex text-base gap-4 flex-col
                        items-center"
                    >
                      <div className="flex gap-2">
                        <img src={phone} />
                        <p>(032)254-1572</p>
                      </div>
                      <div className="flex gap-2">
                        <img src={email} />
                        <p>camiluzenterprises@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-start-1 row-start-1 mx-auto max-w-100 md:col-start-2
                  lg:col-start-3"
              >
                <div
                  className="border-faded-mango-200 rounded-3xl border-4 border-dashed
                    px-8 py-8 text-center"
                >
                  <h3 className="font-pt-serif text-2xl font-bold lg:text-3xl xl:text-4xl">
                    Ready to order?
                  </h3>
                  <p className="mt-2 lg:mt-4">
                    click the link below to see how you can order
                  </p>
                </div>
                <div className="mx-auto -mt-1 w-fit">
                  <div
                    className="bg-mango-400 -mt-1 w-fit p-2 py-5 pb-3 text-lg
                      font-extrabold text-white lg:text-xl xl:text-2xl"
                  >
                    ORDER NOW
                  </div>
                  <svg
                    viewBox="0 0 171 47"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-mango-400 -mt-1"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 0L0 36.3851C0 37.7137 0.659704 38.9556 1.76059 39.6994L10.7729 45.7888C11.7146 46.425 12.8824 46.6307 13.9848 46.3544L167.975 7.75881C169.755 7.3128 171.003 5.7134 171.003 3.87882V0L0 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-faded-mango-200 relative -mt-20 h-20 w-full min-w-300">
              <svg
                preserveAspectRatio="none"
                height="51"
                viewBox="0 0 1440 51"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-faded-mango-200 w-full -translate-y-[98%]"
              >
                <path d="M431.76 21.8398L648.48 45.3604L863.52 16.7998L1080.24 40.3203L1295.28 38.6406L1440 24.0557V56.5H0V30.2402L216.72 0L431.76 21.8398Z" />
              </svg>
            </div>
            <div className="bg-mango-400 z-2 w-full min-h-10 relative">
              <svg
                preserveAspectRatio="none"
                height="51"
                viewBox="0 0 1440 51"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-mango-400 absolute left-1/2 -translate-x-1/2 top-0 w-full
                  min-w-300 -translate-y-[98%]"
              >
                <path d="M1440 51H0V14.5742L216.72 33.0537L431.76 7.85352L648.48 16.2539L863.521 33.0537L1080.24 43.1338L1295.28 7.85352L1440 0V51Z" />
              </svg>
              <div className="md:hidden flex text-base mt-12 gap-2 flex-col items-center">
                <div className="flex gap-2">
                  <img src={phone} />
                  <p>(032)254-1572</p>
                </div>
                <div className="flex gap-2">
                  <img src={email} />
                  <p>camiluzenterprises@gmail.com</p>
                </div>
              </div>
              <div className="md:hidden flex flex-col items-center my-8">
                <h3 className="font-pt-serif text-3xl italic text-mango-800">
                  Join the Community
                </h3>
                <div className="gap-8 mt-2 flex">
                  <img className="w-10" src={instagram} />
                  <img className="w-10" src={facebook} />
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
