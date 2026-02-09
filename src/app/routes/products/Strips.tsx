import Products from '../Product';
import imgSrc from '/images/products/shots/strip.png';
import csvRaw from '@/assets/products/strips.csv?raw';

const Strips = () => {
  return (
    <Products
      title={
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
          <h2 className="self-end text-right text-[clamp(1rem,13cqw,200rem)]">100g</h2>
        </div>
      }
      imgSrc={imgSrc}
      description="We make use of all parts of the mango, this product is made from the mango surrounding the seeds to create a unique product that taste the same as the Original Slices"
      csvRaw={csvRaw}
    />
  );
};

export default Strips;
