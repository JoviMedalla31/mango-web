import Products from '../Product';
import imgSrc from '/images/products/shots/strip.png';
import csvRaw from '@/assets/products/strips.csv?raw';

const Strips = () => {
  return (
    <Products
      title={
        <div className="@container col-start-1 mx-auto w-full max-w-100 justify-center">
          <div className="text-mango-400 mx-auto mt-18 flex w-fit flex-col items-start">
            <h1 className="text-[clamp(1rem,14cqw,200rem)]">
              Dried Mango <br />
              <span
                className="text-mango-800 text-[clamp(1rem,26cqw,200rem)]/[90%]
                  font-extrabold"
              >
                STRIPS
              </span>
            </h1>
          </div>
        </div>
      }
      imgSrc={imgSrc}
      description="Made from 100% real mangoes. To achieve a smooth, strip-style texture, we carefully refine the fruit’s natural texture before drying and shaping."
      csvRaw={csvRaw}
    />
  );
};

export default Strips;
