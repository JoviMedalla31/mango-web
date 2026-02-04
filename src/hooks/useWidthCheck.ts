import { useEffect, useState } from 'react';

export const useWidthCheck = () => {
  const [isSm, setIsSm] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const small = window.matchMedia('(max-width: 639px)');
    const medium = window.matchMedia('(max-width: 767px)');
    const large = window.matchMedia('(max-width: 959px)');

    const listener = () => {
      setIsSm(small.matches);
      setIsMd(medium.matches);
      setIsLg(large.matches);
    };

    listener();
    small.addEventListener('change', listener);
    medium.addEventListener('change', listener);
    large.addEventListener('change', listener);

    return () => {
      small.removeEventListener('change', listener);
      medium.removeEventListener('change', listener);
      large.removeEventListener('change', listener);
    };
  }, []);

  return { isSm, isMd, isLg };
};
