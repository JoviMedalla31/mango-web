import { createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  {
    index: true,
    lazy: async () => {
      let Home = await import('@/app/App');
      return { Component: Home.default };
    },
  },
  {
    path: 'test',
    lazy: async () => {
      let Test = await import('@/app/Test');
      return { Component: Test.default };
    },
  },
  {
    path: 'products/:product',
    lazy: async () => {
      let Products = await import('@/app/routes/Product');
      return { Component: Products.default };
    },
  },
  // {
  //   path: 'carousel',
  //   lazy: async () => {
  //     let Carousel = await import('@/components/Carousel');
  //     return { Component: Carousel.default };
  //   },
  // },
]);

export default router;
