import Products from '../Product';
import imgSrc from '/images/products/shots/spaghetti.png';
import csvRaw from '@/assets/products/spaghetti.csv?raw';

const Spaghetti = () => {
  return (
    <Products
      title={
        <div className="@container col-start-1 mx-auto w-full max-w-100 justify-center">
          <div className="text-mango-400 mx-auto mt-18 flex w-fit flex-col items-start">
            <h1>
              <span className="text-[clamp(1rem,14cqw,200rem)] leading-[80%]">
                Dried Mango
              </span>{' '}
              <br />
              <span
                className="text-mango-800 text-[clamp(1rem,16cqw,200rem)]/[120%]
                  font-extrabold"
              >
                SPAGHETTI
              </span>
            </h1>
          </div>
        </div>
      }
      imgSrc={imgSrc}
      description="Our Mango Spaghetti offers the authentic taste of Philippine mangoes in a fun, strip-style snack. Great for kids, parties, or anyone looking for a unique treat that brings a smile to every bite."
      csvRaw={csvRaw}
    />
  );
};

export default Spaghetti;
