import mangoes from '@/assets/mangoes.jpg';

function Test() {
  console.log(import.meta.env.BASE_URL);
  return (
    <div className="bg-mango-100">
      <header className="bg-mango-400 h-16 w-full"></header>
      <main className="flex flex-col items-center justify-center pt-20">
        <div className="pointer-events-none fixed inset-x-auto top-30 z-1 w-full max-w-254 px-8 select-none">
          <div className="mx-auto w-1/3">
            <img className="" src={mangoes} />
          </div>
        </div>
        <div className="relative grid w-full max-w-254 grid-cols-3">
          <div className="text-mango-400 relative">
            <div className="mx-auto flex w-fit flex-col">
              <h1 className="text-4xl/tight font-semibold">
                Dried <br />
                Mango
              </h1>
              <h1 className="text-6xl font-bold text-black">STRIPS</h1>
              <h3 className="text-right text-3xl">100g</h3>
            </div>
          </div>
          <div className="row-span-2" />
          <div className="px-6 pt-30 pb-42">
            <p className="text-center text-xl/snug">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="px-6 pb-16">
            <p className="text-center text-xl/snug">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="px-6 pt-40 pb-16">
            <p className="text-center text-xl/snug">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="h-1000 px-6 pt-50 pb-16">
            <p className="text-center text-xl/snug">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Test;
