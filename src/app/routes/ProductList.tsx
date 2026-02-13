import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '@/components/FooterB';
import Header from '@/components/Header';

import BigButton from '@/components/BigButton';

import bgA from '/images/hero/bg-a.svg';
import bgB from '/images/hero/bg-b.svg';
import messengerImg from '/images/products/messenger.svg';
import shippingDelivery from '/images/products/shipping-delivery.svg';
import map from '/images/products/map.svg';
import pin from '/images/products/pin.svg';
import email from '/images/footer/email.svg';
import phone from '/images/footer/phone.svg';

import G100 from '/images/products/shots/G100.png';
import G200 from '/images/products/shots/G200.png';
import GS100 from '/images/products/shots/GS100.png';
import EXDST from '/images/products/shots/EXDST.png';
import DST from '/images/products/shots/DST.png';
import MST from '/images/products/shots/MST.png';
import DSL from '/images/products/shots/DSL.png';
import MSL from '/images/products/shots/MSL.png';
import WSL from '/images/products/shots/WSL.png';
import MINIBOX from '/images/products/shots/MINIBOX.png';
import SPAG90 from '/images/products/shots/SPAG90.png';
import SPAG240 from '/images/products/shots/SPAG240.png';
import SPAG500 from '/images/products/shots/SPAG500.png';

const DividerTitle = ({ children }: { children?: ReactNode }) => {
  return (
    <section
      className="text-center bg-faded-mango-200 relative z-1 overflow-y-visible
        overflow-x-clip my-20"
    >
      <svg
        viewBox="0 0 1440 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full min-w-100 absolute top-px -translate-y-1/1 fill-faded-mango-200"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M503.053 30.2676L771.054 25.2012L1047.51 53.8096L1280.4 6.72656L1440 32.7832V61H0V50.125L182.042 0L503.053 30.2676Z"
        />
      </svg>
      <div className="max-w-250 mx-auto flex flex-col gap-3 py-10 px-4 md:py-2 lg:py-0">
        {children}
      </div>
      <svg
        viewBox="0 0 1440 63"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full min-w-100 absolute bottom-px translate-y-1/1
          fill-faded-mango-200"
      >
        <path
          d="M1440 18.4805L1352.58 4.9834L1137.54 23.0479L683.892 62.6377L435.577 36.6377L179.308 51.0654L0 48.4014V0H1440V18.4805Z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    </section>
  );
};

const ProductItem = ({
  code,
  name,
  desc,
  img,
}: {
  code: string;
  name: string;
  desc: string;
  img: string;
}) => {
  return (
    <div className="flex items-center flex-col gap-3 py-6">
      <h4 className="font-bold text-3xl text-mango-800/56">{code}</h4>
      <img src={img} />
      <div>
        <h3 className="font-bold max-w-80 text-3xl font-pt-serif mb-2">{name}</h3>
        <p className="text-[0.938rem] mx-auto max-w-64 w-full">{desc}</p>
      </div>
    </div>
  );
};

const ProductList = () => {
  // hooks
  const location = useLocation();

  // Ref
  const bulkOrdersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('running');

    if (location.hash) {
      requestAnimationFrame(() => {
        bulkOrdersRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
      return;
    }

    scrollTo({ top: 0 });
  }, [location]);

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
            <BigButton
              link="https://www.facebook.com/GuadalupeDriedMangoes/"
              img={messengerImg}
            >
              ORDER NOW
            </BigButton>
          </div>
          <img
            src={bgA}
            className="pointer-events-none absolute min-w-240 sm:min-w-323 left-1/2
              top-1/2 -translate-1/2"
          />
        </section>
        <div className="bg-faded-mango-100">
          <section
            className="grid grid-cols-1 px-5 md:px-8 md:grid-cols-2 py-12
              justify-items-center max-w-300 mx-auto gap-32"
          >
            <div
              className="text-faded-mango-500 max-w-110 flex flex-col gap-6 items-center"
            >
              <img src={shippingDelivery} />
              <h3 className="italic text-3xl md:text-4xl font-bold text-center">
                Shipping & Delivery
              </h3>
              <p className="mt-4 text-base md:text-2xl">
                <span className="font-bold">Within Cebu:</span> Delivery via Lalamove.
                <br />
                <span className="font-bold">Outside Cebu:</span> Shipping via Docs Cargo,
                <span className="italic">
                  {' '}
                  Flying Tigers Express &#40;FTE&#41;, or LBC.
                </span>
              </p>
              <ul className="italic list-disc w-full pl-6 text-base md:text-2xl">
                <li>2&#45;3 days &#40;Docs Cargo/FTE&#41;</li>
                <li>5&#45;7 days &#40;LBC&#41;</li>
              </ul>
              <p className="font-extralight italic text-base md:text-2xl text-center">
                Fees apply and will be quoted upon order confirmation.
              </p>
            </div>
            <div
              className="text-faded-mango-500 max-w-110 flex flex-col gap-6 items-center"
            >
              <img src={map} />
              <h3 className="italic text-3xl md:text-4xl font-bold text-center">
                Find a Store Near You
              </h3>
              <p className="mt-4 text-base md:text-2xl text-center">
                View our list of stores where our products are available
              </p>
              <BigButton
                link="https://www.google.com/maps/d/viewer?hl=en&mid=1oaTuY8CJkk-KMWyK2WHyHFWxptXPyiw6&ll=10.303844621040035%2C123.89564333246445&z=14"
                img={pin}
              >
                Locate Store
              </BigButton>
            </div>
          </section>
          <DividerTitle>
            <h2 className="font-pt-serif text-5xl sm:text-6xl font-bold">Classic</h2>
            <p className="text-faded-mango-500 sm:text-2xl text-xl">
              Pure. Authentic. Iconic. The clean texture and long-lasting flavor of the
              original Cebuano mango.
            </p>
          </DividerTitle>
          <section
            className="grid px-4 text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3
              max-w-300 mx-auto gap-8 gap-y-10 py-12"
          >
            <ProductItem
              img={G200}
              code="G200"
              name="Dried Mango Slice"
              desc="200 grams. Our signature slices in a larger format ideal for sharing"
            />
            <ProductItem
              img={G100}
              code="G100"
              name="Dried Mango Slice"
              desc="100 grams. Our classic recipe perfected for quick, authentic snacking."
            />
            <ProductItem
              img={GS100}
              code="GS100"
              name="Dried Mango Strips"
              desc="100 grams. The same authentic flavor, cut into uniform strips for a clean, consistent bite."
            />
          </section>
          <DividerTitle>
            <h2 className="font-pt-serif text-5xl sm:text-6xl font-bold">Chocolate</h2>
            <p className="text-faded-mango-500 sm:text-2xl text-xl">
              Premium chocolate meets our classic mango in a
              <br className="md:block hidden" />
              presentation designed to impress.
            </p>
          </DividerTitle>
          <section
            className="grid px-4 text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3
              max-w-300 mx-auto gap-8 gap-y-10 py-12"
          >
            <ProductItem
              img={EXDST}
              code="EXDST"
              name="Extra Dark Chocolate Dried Mango Strips"
              desc="120 grams. Intense, high-cacao chocolate over chewy mango strips"
            />
            <ProductItem
              img={DST}
              code="DST"
              name="Dark Chocolate Dried Mango Strips"
              desc="120 grams. The perfect balance of bittersweet cacao and tangy mango strips."
            />
            <ProductItem
              img={MST}
              code="MST"
              name="Milk Chocolate Dried Mango Strips"
              desc="120 grams. A sweet, velvety treat featuring our signature mango strips."
            />
            <ProductItem
              img={DSL}
              code="DSL"
              name="Dark Chocolate Dried Mango Slices"
              desc="120 grams. Classic slices coated in a rich, bittersweet dark chocolate blend."
            />
            <ProductItem
              img={MSL}
              code="MSL"
              name="Milk Chocolate Dried Mango Slices"
              desc="120 grams. Classic slices dipped in a creamy, smooth milk chocolate coating."
            />
            <ProductItem
              img={WSL}
              code="WSL"
              name="White Chocolate Dried Mango Slices"
              desc="120 grams. Classic slices finished with a milky, buttery white chocolate glaze."
            />
            <ProductItem
              img={MINIBOX}
              code="MINIBOX"
              name="Assorted Chocolate Dried Mango Sampler"
              desc="60 grams. Features 6 individually wrapped strips: two each of Milk, Dark, and Extra Dark chocolate."
            />
          </section>
          <DividerTitle>
            <h2 className="font-pt-serif text-5xl sm:text-6xl font-bold">Fun</h2>
            <p className="text-faded-mango-500 sm:text-2xl text-xl">
              Designed to spark a smile and a little bit
              <br className="sm:block hidden" /> of wonder before your first bite.
            </p>
          </DividerTitle>
          <section
            className="grid px-4 text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3
              max-w-300 mx-auto gap-8 gap-y-10 py-12"
          >
            <ProductItem
              img={SPAG90}
              code="SPAG90"
              name="Spaghetti Dried Mango"
              desc='90 grams. The perfect "on-the-go" size. A compact, snack-ready pouch'
            />
            <ProductItem
              img={SPAG240}
              code="SPAG240"
              name="Spaghetti Dried Mango"
              desc="240 grams. Ideal for keeping at your desk or sharing a unique tropical treat with a friend."
            />
            <ProductItem
              img={SPAG500}
              code="SPAG500"
              name="Spaghetti Dried Mango"
              desc="500 grams. The ultimate party size. designed for family gatherings, office sharing, or pure indulgence."
            />
          </section>
        </div>
        <section
          ref={bulkOrdersRef}
          id="bulk-orders"
          className="h-164 sm:h-205 relative px-8 flex items-center justify-center
            overflow-hidden"
        >
          <div className="z-1 max-w-132 flex items-center flex-col text-center">
            <h1 className="font-pt-serif font-bold text-5xl sm:text-6xl">Bulk Orders?</h1>
            <p className="mt-8 mb-12 sm:text-2xl text-xl text-faded-mango-500">
              Contact us through the following channels to get a quote
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
      </main>
      <Footer />
    </div>
  );
};

export default ProductList;
