import { useState } from 'react';

const useRerender = () => {
  const [refreshed, setRefresh] = useState(false);

  const rerender = () => {
    setRefresh((prev) => !prev);
  };

  return { refreshed, rerender };
};

export default useRerender;
