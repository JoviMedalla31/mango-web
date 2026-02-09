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
    Component: Outlet,
    children: [
      {
        path: 'strips',
        lazy: async () => {
          let Products = await import('@/app/routes/products/Strips');
          return { Component: Products.default };
        },
      },
      {
        path: 'slices',
        lazy: async () => {
          let Products = await import('@/app/routes/products/Slices');
          return { Component: Products.default };
        },
      },
      {
        path: 'spaghetti',
        lazy: async () => {
          let Products = await import('@/app/routes/products/Spaghetti');
          return { Component: Products.default };
        },
      },
      {
        path: 'chocolate-slices',
        lazy: async () => {
          let Products = await import('@/app/routes/products/ChocolateSlices');
          return { Component: Products.default };
        },
      },
      {
        path: 'chocolate-strips',
        lazy: async () => {
          let Products = await import('@/app/routes/products/ChocolateStrips');
          return { Component: Products.default };
        },
      },
    ],
  },
]);

export default router;
