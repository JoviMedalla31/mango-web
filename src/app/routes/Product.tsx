import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';

import logo from '/images/logo.svg';
import strips from '@/assets/products/strips.csv?raw';
import stripsImg from '/images/strips/product.png';
import ingredientsTop from '/images/footer/tab-top2.svg';
import footerA from '/images/footer/footer-a.svg';
import footerB from '/images/footer/footer-b.svg';
import orderNow from '/images/footer/order-now.svg';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex w-full flex-col items-center">
      <nav className="poppins bg-mango-400 flex h-12 w-full items-center justify-center text-xl text-white">
        <div className="hidden items-center justify-center gap-8 sm:flex">
          <p>About Us</p>
          <p>Products</p>
          <p>How to Order?</p>
          <p>Contact Us</p>
        </div>
        <div className="flex w-full items-center justify-between px-6 sm:hidden">
          <p className="font-semibold">Guadalupe</p>
          <Menu className="" />
        </div>
      </nav>
      <div className="hidden w-full max-w-300 -translate-y-0.5 sm:block">
        <Link to="/">
          <img src={logo} className="ml-28" />
        </Link>
      </div>
    </header>
  );
};

const Products = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  const { product } = useParams();
  const [data, setData] = useState<string[][]>([]);
  const { scrollY } = useScroll();

  const [mainRectBottom, setMainRectBottom] = useState<number>(0);
  const [isSm, setIsSm] = useState<boolean>(false);

  // ------------------------
  // Effects
  // ------------------------

  useEffect(() => {
    const parseData = async () => {
      let { data: nextData }: { data: string[][] } = await Papa.parse(strips);
      setData(nextData);

      console.log(nextData);
    };

    parseData();
  }, []);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      setMainRectBottom((mainRef.current?.getBoundingClientRect().bottom ?? 0) + scrollY.get());
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const productMargin = useTransform(scrollY, (scroll) => {
    if (isSm) return 0;

    const topMargin = mainRectBottom - scroll - 240;
    return topMargin > 0 ? 0 : topMargin;
  });

  // Detect window change size
  useEffect(() => {
    const media = window.matchMedia('(max-width: 641px)');
    if (media.matches !== isSm) setIsSm(media.matches);

    const listener = () => setIsSm(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, []);

  console.log('is small: ', isSm);

  return (
    <div className="bg-mango-100 text-mango-800 flex min-h-dvh w-full flex-col items-center">
      <Header />
      <main ref={mainRef} className="font-poppins mt-8 mb-20 w-full items-center text-2xl sm:mb-60 sm:text-lg/snug lg:text-xl xl:text-2xl">
        {!isSm && (
          <motion.div style={{ marginTop: productMargin }} transition={{ duration: 0 }} className="pointer-events-none fixed block w-dvw">
            <div className="mx-auto max-w-180 lg:max-w-240 xl:max-w-300">
              <div className="mx-auto w-1/3 px-2">
                <img src={stripsImg} className="w-full" />
              </div>
            </div>
          </motion.div>
        )}
        <div className="w-full px-4">
          <div className="mx-auto flex w-full max-w-180 flex-col gap-8 sm:grid sm:auto-rows-auto sm:grid-cols-3 lg:max-w-240 xl:max-w-300">
            <div className="@container col-start-1 mx-auto w-full max-w-100 justify-center">
              <div className="text-mango-400 mx-auto mt-18 flex w-fit flex-col items-start">
                <h1 className="text-[clamp(1rem,14cqw,200rem)]">
                  Dried Mango <br />
                  <span className="text-mango-800 text-[clamp(1rem,26cqw,200rem)]/[90%] font-extrabold">STRIPS</span>
                </h1>
                <h2 className="self-end text-right text-[clamp(1rem,13cqw,200rem)]">100g</h2>
              </div>
            </div>
            {isSm && (
              <div className="px-4">
                <img src={stripsImg} className="mx-auto w-full max-w-100" />
              </div>
            )}
            <div className="col-start-1 mb-12 pt-6 text-center sm:col-start-3">
              We make use of all parts of the mango, this product is made from the mango surrounding the seeds to create a unique product
              that taste the same as the Original Slices
            </div>
            {data.map((block, i) => (
              <div
                className={`${i % 2 == 0 ? 'col-start-1 sm:mt-60' : 'col-start-1 sm:col-start-3'} mt-14 flex flex-col items-center text-center sm:mt-0`}
              >
                <div className="px-2">
                  <img src={import.meta.env.BASE_URL + `images/${block[0]}`} className="max-w-full" />
                </div>
                <h3 className={`font-pt-serif mt-8 text-2xl font-bold lg:text-3xl xl:text-4xl`}>{block[1]}</h3>
                <p className="mt-3">{block[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="z-1 flex w-full flex-col items-center">
        <div className="z-1 grid w-full max-w-180 grid-cols-1 gap-x-8 px-4 text-2xl sm:grid-cols-2 sm:text-lg/snug lg:max-w-240 lg:grid-cols-3 lg:text-xl xl:max-w-300 xl:text-2xl">
          <div className="col-start-1 mt-8 max-w-70 px-8 text-center sm:mt-0 sm:max-w-90">
            <div>
              <svg viewBox="0 0 333 86" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-mango-400 -mb-1 w-full">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M332.999 85.9998L333.004 16.0816L309.254 4.37001e-05L0.000336502 76.7506L0.000335693 86.0029L332.999 85.9998Z"
                />
              </svg>
              <div className="bg-mango-400 w-full px-6 pt-8 pb-24">
                <h3 className="font-pt-serif text-2xl font-bold lg:text-3xl xl:text-4xl">Ingredients</h3>
                <p className="mt-4 text-base sm:text-lg lg:text-xl xl:text-2xl">
                  Selected ripe mangoes, refined sugar, sweeteners (glucose & sorbitol), iodized salt, sodium metabisulfate as perservative
                </p>
              </div>
            </div>
          </div>
          <div className="col-start-1 row-start-1 mx-auto max-w-100 sm:col-start-2 lg:col-start-3">
            <div className="border-faded-mango-200 rounded-3xl border-4 border-dashed px-8 py-4 text-center">
              <h3 className="font-pt-serif text-2xl font-bold lg:text-3xl xl:text-4xl">Ready to order?</h3>
              <p className="mt-2 lg:mt-4">click the link below to see how you can order</p>
            </div>
            <div className="mx-auto -mt-1 w-fit" mx-auto>
              <div className="bg-mango-400 -mt-1 w-fit p-2 pb-0 text-lg font-extrabold text-white lg:text-xl xl:text-2xl">ORDER NOW</div>
              <svg viewBox="0 0 171 47" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-mango-400 -mt-1">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
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
        <div className="bg-mango-400 z-2 h-400 w-full min-w-300">
          <svg
            preserveAspectRatio="none"
            height="51"
            viewBox="0 0 1440 51"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-mango-400 w-full -translate-y-[98%]"
          >
            <path d="M1440 51H0V14.5742L216.72 33.0537L431.76 7.85352L648.48 16.2539L863.521 33.0537L1080.24 43.1338L1295.28 7.85352L1440 0V51Z" />
          </svg>
        </div>
      </footer>
    </div>
  );
};

export default Products;
