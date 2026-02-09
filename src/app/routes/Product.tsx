import {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  ReactNode,
  type MouseEvent,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { clamp } from '@/util/math';
import { useWidthCheck } from '@/hooks/useWidthCheck';
import Papa from 'papaparse';

import Header from '@/components/Header';
import Footer from '@/components/FooterB';

// Images
import dividerB from '/images/divider-b.svg';
import catalogueImg from '/images/products/page/catalogue.svg';
import ProductCarousel from '@/components/ProductCarousel';

// Carousel Img
import chocolateImg from '/images/products/shots/chocolate.png';
import sliceImg from '/images/products/shots/slice.png';
import spaghettiImg from '/images/products/shots/spaghetti.png';
import stripImg from '/images/products/shots/strip.png';

const Products = ({
  title,
  imgSrc,
  description,
  csvRaw,
}: {
  title: ReactNode;
  imgSrc: string;
  description: string;
  csvRaw: string;
}) => {
  // Hooks
  const navigate = useNavigate();
  const { isSm } = useWidthCheck();

  // Local State
  const mouseDownPos = useRef<[number, number] | null>(null);

  // CSV Data
  const [data, setData] = useState<string[][]>([]);

  // Motion Variables
  const imgRef = useRef<HTMLImageElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const windowHeight = useRef<number>(0);
  const productHeight = useRef<number>(200);
  const mainRectBottom = useRef<number>(0);
  const { scrollY } = useScroll();
  // const [mainRectBottom, setMainRectBottom] = useState<number>(0);

  // ------------------------
  // Effects
  // ------------------------

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Parse product SVG Data on load
  useEffect(() => {
    const parseData = async () => {
      let { data: nextData }: { data: string[][] } = await Papa.parse(csvRaw);
      setData(nextData);
    };

    parseData();
  }, []);

  // Calculate container height
  useLayoutEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      // setMainRectBottom(
      //   (mainRef.current?.getBoundingClientRect().bottom ?? 0) + scrollY.get(),
      // );
      mainRectBottom.current =
        (mainRef.current?.getBoundingClientRect().bottom ?? 0) + scrollY.get();
      productHeight.current = imgRef.current?.offsetHeight ?? 0;
      windowHeight.current = screen.height;
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [mainRef, mainRef.current]);

  const productMargin = useTransform(scrollY, (scroll) => {
    if (isSm) return 0;

    const topMargin =
      mainRectBottom.current - scroll - 176 /*top margin*/ - productHeight.current;
    return clamp(topMargin, 0, -Infinity);
  });

  return (
    <div
      className="bg-mango-100 text-mango-800 flex min-h-dvh w-full flex-col items-center"
    >
      <Header key="product" revealOffset={0} />
      <main
        className="font-poppins mt-44 w-full items-center text-2xl sm:text-lg/snug
          lg:text-xl xl:text-2xl"
      >
        {!isSm && (
          <motion.div
            style={{ marginTop: productMargin }}
            transition={{ duration: 0 }}
            className="pointer-events-none fixed block w-dvw"
          >
            <div className="mx-auto max-w-180 lg:max-w-240 xl:max-w-300">
              <div className="mx-auto w-1/3 px-2">
                <img ref={imgRef} src={imgSrc} className="w-full" />
              </div>
            </div>
          </motion.div>
        )}
        <section className="w-full px-4" ref={mainRef}>
          <div
            className="mx-auto flex w-full max-w-180 flex-col gap-8 sm:grid
              sm:auto-rows-auto sm:grid-cols-3 lg:max-w-240 xl:max-w-300"
          >
            {title}
            {isSm && (
              <div className="px-4">
                <img src={imgSrc} className="mx-auto w-full max-w-100" />
              </div>
            )}
            <div className="col-start-1 mb-12 pt-6 text-center sm:col-start-3">
              {description}
            </div>
            {data.map((block, i) => (
              <div
                key={i}
                className={`${i % 2 == 0 ? 'col-start-1 sm:mt-60' : 'col-start-1 sm:col-start-3'}
                mt-14 flex flex-col items-center text-center sm:mt-0`}
              >
                <div className="px-2">
                  <img
                    src={import.meta.env.BASE_URL + `images/${block[0]}`}
                    className="max-w-full"
                  />
                </div>
                <h3
                  className={`font-pt-serif mt-8 text-2xl font-bold lg:text-3xl
                  xl:text-4xl`}
                >
                  {block[1]}
                </h3>
                <p className="mt-3 px-10">{block[2]}</p>
              </div>
            ))}
            <div className="mx-auto max-w-100 col-start-3">
              <div
                className="border-faded-mango-200 rounded-3xl border-4 border-dashed px-8
                  py-8 text-center"
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
                  className="bg-mango-400 -mt-1 w-fit p-2 py-5 pb-3 text-lg font-extrabold
                    text-white lg:text-xl xl:text-2xl"
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
        </section>
        <section id="divider" className="relative">
          <img src={dividerB} className="mt-40" />
        </section>
        <section
          id="products"
          className="pt-20 mb-15 pb-1 md:pt-28 lg:pt-34 xl:pt-44 relative"
        >
          <ProductCarousel />
          <div
            className="xl:pt-36 pt-16 lg:pt-28 flex justify-center md:justify-end px-12"
          >
            <button
              type="button"
              className="text-4xl text-mango-400 border-4 rounded-xl flex gap-2 p-2
                border-dashed"
            >
              <img src={catalogueImg} />
              Catalogue
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
