import { type ReactNode, MouseEvent } from 'react';

const BigButton = ({
  img,
  children,
  onClick: handleClick,
}: {
  img?: string;
  children?: ReactNode;
  onClick?: (e: MouseEvent) => any;
}) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-3xl sm:text-4xl text-mango-400 border-4 rounded-xl font-semibold
        flex items-center gap-3 p-2 px-4 border-dashed"
    >
      {img && <img src={img} className="w-6 sm:w-8" />}
      {children}
    </button>
  );
};

export default BigButton;
