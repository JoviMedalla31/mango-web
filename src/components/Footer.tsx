// Footer
import email from '/images/footer/email.svg';
import phone from '/images/footer/phone.svg';
import instagram from '/images/footer/instagram.svg';
import facebook from '/images/footer/facebook.svg';

const Footer = () => {
  return (
    <footer className="z-1 flex w-full flex-col items-center overflow-x-hidden">
      <div
        className="z-1 grid justify-items-center w-full max-w-180 grid-cols-1 gap-x-8 px-4
          text-2xl md:grid-cols-2 sm:text-lg/snug lg:max-w-240 lg:grid-cols-3 lg:text-xl
          xl:max-w-300 xl:text-2xl"
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
            <div className="bg-mango-400 w-full text-mango-800 px-6 pt-8 pb-8 md:pb-24">
              <h3 className="font-pt-serif text-2xl font-bold lg:text-3xl xl:text-4xl">
                Bulk Orders?
              </h3>
              <p className="mt-4 text-base sm:text-lg lg:text-xl xl:text-2xl">
                Please contact us with the following for bulk orders and wholesale pricing
              </p>
              <div className="mt-12 hidden md:flex text-base gap-4 flex-col items-center">
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
            className="border-faded-mango-200 rounded-3xl border-4 border-dashed px-8 py-8
              text-center"
          >
            <h3 className="font-pt-serif text-2xl font-bold lg:text-3xl xl:text-4xl">
              Ready to order?
            </h3>
            <p className="mt-2 lg:mt-4">click the link below to see how you can order</p>
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
          <h3 className="font-pt-serif text-3xl gititalic text-mango-800">
            Join the Community
          </h3>
          <div className="gap-8 mt-2 flex">
            <img className="w-10" src={instagram} />
            <img className="w-10" src={facebook} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
