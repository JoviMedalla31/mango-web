import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/FooterB';

import bgB from '/images/hero/bg-b.svg';

const Error = () => {
  useEffect(() => {
    scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="font-poppins text-mango-800 pt-18 relative bg-mango-100 text-2xl">
      <Header />
      <main className="overflow-x-clip">
        <section
          id="bulk-orders"
          className="h-164 sm:h-205 relative px-8 flex items-center justify-center
            overflow-hidden"
        >
          <div className="z-1 max-w-132 flex items-center flex-col text-center">
            <h1 className="font-pt-serif font-bold text-5xl sm:text-6xl">404</h1>
            <p className="mt-8 sm:text-2xl text-xl text-faded-mango-500">
              Page not found
            </p>
            <Link to="/">
              <p className="sm:text-1xl text-lg text-mango-800 underline cursor-pointer">
                retrun to home
              </p>
            </Link>
          </div>
          <img
            src={bgB}
            className="pointer-events-none absolute min-w-230 sm:min-w-332 left-1/2
              top-1/2 -translate-1/2"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Error;
