import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="text-center mt-20 px-4">
      <h1 className="text-3xl font-bold mb-4">Animal Hotels</h1>
      <p className="text-gray-600 mb-8">Sistema de gerenciamento de pets</p>

      <div className="flex justify-center gap-4">
        <Link to="/tutores" className="bg-blue-500 text-white py-2 px-6 rounded">
          Tutores
        </Link>
        <Link to="/animais" className="bg-blue-500 text-white py-2 px-6 rounded">
          Animais
        </Link>
      </div>
    </div>
  );
}