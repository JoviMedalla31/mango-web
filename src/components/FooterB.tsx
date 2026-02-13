// Footer
import email from '/images/footer/email.svg';
import phone from '/images/footer/phone.svg';
import instagram from '/images/footer/instagram.svg';
import facebook from '/images/footer/facebook.svg';

const Footer = () => {
  return (
    <footer className="z-1 flex w-full flex-col items-center overflow-x-hidden">
      <div
        className="z-1 grid h-28 justify-items-center w-full max-w-180 grid-cols-1 gap-x-8
          px-4 text-2xl md:grid-cols-2 sm:text-lg/snug lg:max-w-240 lg:grid-cols-3
          lg:text-xl xl:max-w-300 xl:text-2xl"
      >
        <div className="col-start-1 mt-8 max-w-70 text-center md:mt-0 md:max-w-90"></div>
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
        <div className="max-w-300 mx-auto mb-10 px-8 text-mango-800">
          <div
            className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[3fr_4fr_3fr]
              items-end"
          >
            <div
              id="contact-info"
              className="flex mb-8 md:mb-0 text-base items-center md:justify-start mt-12
                gap-2 flex-col md:items-baseline justify-center"
            >
              <div className="flex gap-2">
                <img src={phone} />
                <p className="w-full whitespace-nowrap">+63 955 622 2783</p>
              </div>
              <div className="flex gap-2">
                <img src={email} />
                <p>camiluzenterprises@gmail.com</p>
              </div>
            </div>
            <div
              id="copyright"
              className="xl:row-start-auto xl:col-span-1 col-span-full row-start-3
                md:row-start-2 xl:pt-0 xl:border-0 text-center md:text-left text-base
                font-poppins xl:mt-0 mt-8 border-t border-mango-800/20 pt-4"
            >
              © 2026 Camiluz Enterprises. All Rights Reserved.
            </div>
            <div
              id="join-community"
              className="flex justify-end items-center md:flex-row flex-col gap-1
                md:gap-2"
            >
              <h3 className="font-pt-serif text-right text-3xl italic text-mango-800">
                Join the <br className="hidden md:block" />
                Community
              </h3>
              <div className="gap-8 md:gap-2 mt-2 flex flex-row md:flex-col">
                <a
                  href="https://www.instagram.com/guadalupe_dried_mangoes/"
                  target="_blank"
                  className="cursor-pointer"
                >
                  <img className="w-10" src={instagram} />
                </a>
                <a
                  href="https://www.facebook.com/GuadalupeDriedMangoes/"
                  target="_blank"
                  className="cursor-pointer"
                >
                  <img className="w-10" src={facebook} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
