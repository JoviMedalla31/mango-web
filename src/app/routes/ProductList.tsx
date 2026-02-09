import Footer from '@/components/FooterB';
import Header from '@/components/Header';

import bgA from '/images/hero/bg-a.svg';
import BigButton from '@/components/BigButton';
import messengerImg from '/images/products/messenger.svg';
import shippingDelivery from '/images/products/shipping-delivery.svg';
import map from '/images/products/map.svg';
import pin from '/images/products/pin.svg';
import dividerTop from '/images/products/divider-top.svg';
// import dividerBottom from 'images/products/divider-bottom.svg';

const ProductList = () => {
  return (
    <div className="font-poppins text-mango-800 pt-18 relative bg-mango-100 text-2xl">
      <Header />
      <main>
        <section
          id="hero"
          className="h-164 sm:h-190 relative px-8 flex items-center justify-center
            overflow-hidden"
        >
          <div className="z-1 max-w-132 flex items-center flex-col text-center">
            <h1 className="font-pt-serif font-bold text-5xl sm:text-6xl">Product List</h1>
            <p className="mt-8 mb-12 sm:text-2xl text-xl">
              Click below to connect to our <br className="sm:hidden block" />
              facebook to place your order!
            </p>
            <BigButton img={messengerImg}>ORDER NOW</BigButton>
          </div>
          <img
            src={bgA}
            className="pointer-events-none absolute min-w-240 sm:min-w-323 left-1/2
              top-1/2 -translate-1/2"
          />
        </section>
        <div className="bg-faded-mango-100">
          <section
            className="grid grid-cols-2 py-12 justify-items-center max-w-300 mx-auto
              gap-32"
          >
            <div
              className="text-faded-mango-500 max-w-110 flex flex-col gap-6 items-center"
            >
              <img src={shippingDelivery} />
              <h3 className="italic text-4xl font-bold">Shipping & Delivery</h3>
              <p className="mt-4">
                <span className="font-bold">Within Cebu:</span> Delivery via Lalamove.
                <br />
                <span className="font-bold">Outside Cebu:</span> Shipping via Docs Cargo,
                <span className="italic">
                  Flying Tigers Express &#40;FTE&#41;, or LBC.
                </span>
              </p>
              <ul className="italic list-disc">
                <li>2&#45;3 days &#40;Docs Cargo/FTE&#41;</li>
                <li>5&#45;7 days &#40;LBC&#41;</li>
              </ul>
              <p className="font-extralight italic">
                Fees apply and will be quoted upon order confirmation.
              </p>
            </div>
            <div
              className="text-faded-mango-500 max-w-110 flex flex-col gap-6 items-center"
            >
              <img src={map} />
              <h3 className="italic text-4xl font-bold">Find a Store Near You</h3>
              <p className="mt-4">
                View our list of stores where our products are available
              </p>
              <BigButton img={pin}>Locate Store</BigButton>
            </div>
          </section>
          <section
            className="text-center bg-faded-mango-200 relative z-1 overflow-visible my-20"
          >
            <svg
              viewBox="0 0 1440 61"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full min-w-100 absolute top-0 -translate-y-1/1
                fill-faded-mango-200"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M503.053 30.2676L771.054 25.2012L1047.51 53.8096L1280.4 6.72656L1440 32.7832V61H0V50.125L182.042 0L503.053 30.2676Z"
              />
            </svg>
            <div className="w-250 mx-auto">
              <h2 className="font-pt-serif text-6xl font-bold">Classic</h2>
              <p className="text-faded-mango-500">
                Pure. Authentic. Iconic. The clean texture and long-lasting flavor of the
                original Cebuano mango.
              </p>
            </div>
            <svg
              viewBox="0 0 1440 63"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full min-w-100 absolute bottom-0 translate-y-1/1
                fill-faded-mango-200"
            >
              <path
                d="M1440 18.4805L1352.58 4.9834L1137.54 23.0479L683.892 62.6377L435.577 36.6377L179.308 51.0654L0 48.4014V0H1440V18.4805Z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </section>
          <section className="h-200 grid grid-cols-3"></section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductList;
