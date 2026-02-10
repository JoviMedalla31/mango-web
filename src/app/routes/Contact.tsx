import Header from '@/components/Header';
import BigButton from '@/components/BigButton';

import bgB from '/images/hero/bg-b.svg';
import email from '/images/footer/email.svg';
import phone from '/images/footer/phone.svg';
import pin from '/images/products/pin-white.svg';

// Shapes
import mango3b from '/images/shapes/mango-3b.svg';
import mango4 from '/images/shapes/mango-4.svg';
import long1 from '/images/shapes/long-1.svg';
import long5 from '/images/shapes/long-5.svg';
import strips2 from '/images/shapes/strips-2.svg';
import strips4 from '/images/shapes/strips-4.svg';
import strips6 from '/images/shapes/strips-6.svg';
import dashedLine from '/images/shapes/dashed-line.svg';
import mapPin from '/images/shapes/map-pin.svg';

import tree from '/images/home/tree.svg';
import Footer from '@/components/FooterB';

const Contact = () => {
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
            <h1 className="font-pt-serif font-bold text-5xl sm:text-6xl">Contact</h1>
            <p className="mt-8 mb-12 sm:text-2xl text-xl text-faded-mango-500">
              Contact us through the following channels
            </p>
            <div className="flex flex-col gap-4 w-full items-center">
              <div className="flex gap-2 w-full justify-center">
                <img className="sm:w-7 w-5" src={phone} />
                <p className="sm:text-2xl text-lg">+63 955 622 2783</p>
              </div>
              <div className="flex gap-2">
                <img className="sm:w-7 w-5" src={email} />
                <p className="sm:text-2xl text-lg">camiluzenterprises@gmail.com</p>
              </div>
            </div>
          </div>
          <img
            src={bgB}
            className="pointer-events-none absolute min-w-230 sm:min-w-332 left-1/2
              top-1/2 -translate-1/2"
          />
        </section>
        <section
          id="about-us "
          className="text-mango-800 sm:mt-30 mt-0 my-30 text-center max-w-304 px-16
            sm:px-12 w-full mx-auto flex flex-col justify-stretch gap-8 sm:gap-12
            md:gap-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_0.7fr]
            xl:grid-cols-[1fr_30rem]">
            <div className="row-start-1 col-start-1 relative md:col-start-2">
              <img
                src={strips6}
                className="absolute hidden md:block w-44 right-1/2 translate-x-1/2 z-1
                  lg:translate-x-0 rotate-0 lg:right-24 top-10 lg:-top-10 lg:rotate-20"
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
                  We invite you to visit our factory store on Happy Valley Road, where our
                  journey began. Shop our full range of classics and new innovations
                  directly from the source.
                </p>

                <button
                  type="button"
                  className="mx-auto mt-10 sm:mt-16 flex gap-3 font-semibold text-2xl
                    sm:text-4xl text-white bg-mango-400 rounded-2xl px-4 py-2"
                >
                  <img src={pin} className="w-6 sm:w-8" />
                  Location
                </button>
              </div>
              <img
                src={dashedLine}
                className="absolute hidden md:block left-1/2 md:-translate-x-90
                  lg:-translate-x-135 -top-10 md:min-w-220 lg:top-0 lg:min-w-385"
              />
              <img
                src={long1}
                className="absolute block md:hidden lg:block left-1/2 md:translate-x-0
                  -translate-x-55 md:w-auto w-25 top-5 md:-left-45 md:top-20 -rotate-5"
              />
              <img
                src={mango4}
                className="absolute w-16 lg:w-auto left-1/2 -translate-x-55
                  sm:-translate-x-64 lg:translate-x-0 lg:-left-20 bottom-7 lg:bottom-22
                  -rotate-70"
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
    </div>
  );
};

export default Contact;
