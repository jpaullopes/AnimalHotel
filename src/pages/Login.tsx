import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Página de login
export function Login() {
  const navigate = useNavigate();
  
  // Estados do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  // Função que faz o login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    try {
      // Busca usuário no banco
      const response = await fetch(`http://localhost:3000/users?email=${email}&password=${senha}`);
      const users = await response.json();

      if (users.length > 0) {
        // Cria token e salva no localStorage
        const user = users[0];
        const token = btoa(JSON.stringify({ id: user.id, name: user.name, email: user.email }));
        localStorage.setItem('token', token);
        navigate('/home');
      } else {
        setErro('Email ou senha inválidos');
      }
    } catch {
      setErro('Erro ao conectar com o servidor');
    }
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-white p-6 rounded shadow w-96">
        
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              required
              maxLength={100}
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Senha</label>
            <input
              type="password"
              required
              maxLength={50}
              className="w-full border p-2 rounded"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Não tem conta? <Link to="/cadastro" className="text-blue-500">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}