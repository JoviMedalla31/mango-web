import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';

import logo from '/images/logo.svg';
import strips from '@/assets/products/strips.csv?raw';
import stripsImg from '/images/strips/product.png';
import ingredientsTop from '/images/products/ingredients-top.svg';
import footerA from '/images/footer/footer-a.svg';
import footerB from '/images/footer/footer-b.svg';
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
  const { product } = useParams();
  const [data, setData] = useState<string[][]>([]);

  useEffect(() => {
    const parseData = async () => {
      let { data: nextData }: { data: string[][] } = await Papa.parse(strips);
      setData(nextData);

      console.log(nextData);
    };

    parseData();
  }, []);

  // console.log('image url: ', `/images/${data?.data?.[0][0]}`);

  return (
    <div className="bg-mango-100 text-mango-800 flex min-h-dvh w-full flex-col items-center">
      <Header />
      <main className="font-poppins mt-8 mb-60 w-full items-center px-4 text-2xl">
        <div className="pointer-events-none fixed left-1/2 w-full max-w-300 -translate-x-1/2">
          <div className="mx-auto w-1/3 px-2">
            <img src={stripsImg} />
          </div>
        </div>
        <div className="mx-auto w-full max-w-300">
          <div className="grid w-full auto-rows-auto grid-cols-3 gap-8">
            <div className="relative col-start-2 row-span-full"> {/* This div will create empty space between the grid*/}</div>
            <div className="col-start-1">
              <div className="text-mango-400 mx-auto mt-18 flex w-fit flex-col items-start">
                <h1 className="text-5xl">
                  Dried Mango <br />
                  <span className="text-mango-800 text-8xl font-extrabold">STRIPS</span>
                </h1>
                <h2 className="self-end text-right text-5xl">100g</h2>
              </div>
            </div>
            <div className="col-start-3 pt-6 text-center">
              We make use of all parts of the mango, this product is made from the mango surrounding the seeds to create a unique product
              that taste the same as the Original Slices
            </div>
            {data.map((block, i) => (
              <div className={`${i % 2 == 0 ? 'col-start-1 mt-60' : 'col-start-3'} flex flex-col items-center`}>
                <img src={import.meta.env.BASE_URL + `images/${block[0]}`} />
                <h3 className={`font-pt-serif mt-8 text-4xl font-bold`}>{block[1]}</h3>
                <p className="mt-3 text-center text-2xl">{block[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="z-1 flex w-full flex-col items-center">
        <div className="z-1 col-span-3 col-start-1 grid max-w-300 grid-cols-3 gap-x-8">
          <div className="col-start-1 px-8 text-center">
            <div>
              <img src={ingredientsTop} className="-mb-0.5 w-full" />
              <div className="bg-mango-400 w-full px-6 pt-8 pb-24">
                <h3 className="font-pt-serif text-4xl font-bold">Ingredients</h3>
                <p className="mt-4 text-2xl">
                  Selected ripe mangoes, refined sugar, sweeteners (glucose & sorbitol), iodized salt, sodium metabisulfate as perservative
                </p>
              </div>
            </div>
          </div>
          <div className="col-start-3">
            <div className="border-faded-mango-200 rounded-3xl border-4 border-dashed px-8 py-4 text-center">
              <h3 className="font-pt-serif text-4xl font-bold">Ready to order?</h3>
              <p className="mt-4">click the link below to see how you can order</p>
            </div>
          </div>
        </div>
        <div className="bg-faded-mango-200 relative -mt-20 h-20 w-full">
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
        <div className="bg-mango-400 z-2 h-20 w-full">
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
