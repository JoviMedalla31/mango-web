import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';

import logo from '/images/logo.png';
import strips from '@/assets/products/strips.csv?raw';
import { Link } from 'react-router-dom';

const Products = () => {
  const { product } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const parseData = async () => {
      let nextData = await Papa.parse(strips);
      setData(nextData);

      console.log(nextData);
    };

    parseData();
  }, []);

  console.log('image url: ', `/images/${data?.data?.[0][0]}`);

  return (
    <div className="bg-mango-100 min-h-dvh w-full">
      <header className="flex w-full flex-col items-center">
        <nav className="poppins bg-mango-400 flex h-12 w-full items-center justify-center gap-10 text-xl text-white">
          <p>About Us</p>
          <p>Products</p>
          <p>How to Order?</p>
          <p>Contact Us</p>
        </nav>
        <div className="w-full max-w-300">
          <Link to="/">
            <img src={logo} className="ml-28" />
          </Link>
        </div>
      </header>
      <div className="mt-5 flex flex-col items-center">
        <img src={import.meta.env.BASE_URL + `images/${data?.data?.[0][0]}`} />
        <h3 className="font-pt-serif text-mango-800 mt-10 text-4xl font-bold">{data?.data?.[0][1]}</h3>
        <p className="font-poppins text-mango-800 mt-3 max-w-78 text-center text-2xl">{data?.data?.[0][2]}</p>
      </div>
    </div>
  );
};

export default Products;
