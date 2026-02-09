import Products from '../Product';
import imgSrc from '/images/products/shots/slice.png';
import csvRaw from '@/assets/products/slices.csv?raw';

const Slices = () => {
  return (
    <Products
      title={
        <div className="@container col-start-1 mx-auto w-full max-w-100 justify-center">
          <div className="text-mango-400 mx-auto mt-18 flex w-fit flex-col items-start">
            <h1 className="text-[clamp(1rem,14cqw,200rem)]">
              Dried Mango <br />
              <span
                className="text-mango-800 text-[clamp(1rem,27cqw,200rem)]/[90%]
                  font-extrabold"
              >
                SLICES
              </span>
            </h1>
          </div>
        </div>
      }
      imgSrc={imgSrc}
      description=" Our classic dried mango slices offer a clean texture and long-lasting tropical flavor. 100% natural color, zero food enhancers, and packed with the real sweetness of premium Philippine mangoes."
      csvRaw={csvRaw}
    />
  );
};

export default Slices;
