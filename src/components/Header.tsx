import { Link, useNavigate } from 'react-router-dom';

// Componente de cabeçalho da aplicação
export function Header() {
  const navigate = useNavigate();
  
  // Verifica se o usuário está logado
  const logado = !!localStorage.getItem('token');

  // Função para fazer logout
  function sair() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <header className="bg-white shadow p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">

        <Link to="/home" className="text-xl font-bold text-blue-600">
          Animal Hotels
        </Link>

        <nav className="flex gap-4">
          {logado ? (
            <>
              <Link to="/home" className="text-gray-600">Home</Link>
              <Link to="/tutores" className="text-gray-600">Tutores</Link>
              <Link to="/animais" className="text-gray-600">Animais</Link>
              <button onClick={sair} className="text-red-500">Sair</button>
            </>
          ) : (
            <>
              <Link to="/" className="text-gray-600">Login</Link>
              <Link to="/cadastro" className="text-gray-600">Cadastro</Link>
            </>
          )}
        </nav>

      </div>
    </header>
  );
}