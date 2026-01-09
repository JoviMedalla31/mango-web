import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <h1 className="text-4xl font-extrabold">
        <span className="text-xl font-bold">Home of</span>
        <br /> <Link to="test">Guadalupe Dried Mangoes</Link>
      </h1>
    </div>
  );
}

export default App;
