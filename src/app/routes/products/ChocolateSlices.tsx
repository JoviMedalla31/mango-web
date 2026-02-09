import Products from '../Product';
import imgSrc from '/images/products/shots/chocolate-slices.png';
import csvRaw from '@/assets/products/chocolate-slices.csv?raw';

const ChocolateSlices = () => {
  return (
    <Products
      title={
        <div className="@container col-start-1 mx-auto w-full max-w-100 justify-center">
          <div className="text-mango-400 mx-auto mt-18 flex w-fit flex-col items-start">
            <h1>
              <span className="font-bold text-mango-800 text-[clamp(1rem,14.4cqw,200rem)]">
                CHOCOLATE
              </span>
              <br />
              <span className="text-[clamp(1rem,14cqw,200rem)] leading-[80%]">
                Dried Mango
              </span>{' '}
              <br />
              <span
                className="text-mango-800 text-[clamp(1rem,26cqw,200rem)]/[95%]
                  font-extrabold"
              >
                SLICES
              </span>
            </h1>
          </div>
        </div>
      }
      imgSrc={imgSrc}
      description="A match made in paradise. Our famous dried mangoes meets premium chocolate for a rich, tangy, and sweet sensation."
      csvRaw={csvRaw}
    />
  );
};

export default ChocolateSlices;
