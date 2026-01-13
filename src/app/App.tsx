import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="bg-mango-300 flex h-dvh w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold">
        <span className="text-xl font-bold">Home of</span>
        <br /> <Link to="test">Guadalupe Dried Mangoes</Link>
      </h1>

      <Link to="/products/strips">
        <p>Strips</p>
      </Link>
    </div>
  );
}

export default App;
