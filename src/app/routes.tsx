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
]);

export default router;
