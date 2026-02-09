import { createHashRouter, Outlet } from 'react-router-dom';

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
    path: 'products',
    // lazy: async () => {
    //   let Products = await import('@/app/routes/Product');
    //   return { Component: Products.default };
    // },
    Component: Outlet,
    children: [
      {
        path: 'strips',
        lazy: async () => {
          let Products = await import('@/app/routes/products/Strips');
          return { Component: Products.default };
        },
      },
    ],
  },
]);

export default router;
