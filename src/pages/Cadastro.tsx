import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validarEmail, validarNome, validarSenha } from '../utils/validacao';

export function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    // Validações
    if (!validarNome(nome)) {
      setErro('Nome inválido (não pode conter números)');
      return;
    }

    if (!validarEmail(email)) {
      setErro('Email inválido');
      return;
    }

    if (!validarSenha(senha)) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setEnviando(true);

    try {
      // Verifica se email já existe
      const check = await fetch(`https://backend-animalhotels.onrender.com/users?email=${email}`);
      const existe = await check.json();

      if (existe.length > 0) {
        setErro('Este email já está cadastrado');
        setEnviando(false);
        return;
      }

      // Cria usuário
      await fetch('https://backend-animalhotels.onrender.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome, email, password: senha }),
      });

      alert('Cadastro realizado!');
      navigate('/');
    } catch {
      setErro('Erro ao conectar com servidor');
      setEnviando(false);
    }
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-white p-6 rounded shadow w-96">
        
        <h2 className="text-2xl font-bold mb-4 text-center">Cadastro</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div>
            <label className="block mb-1">Nome</label>
            <input
              type="text"
              required
              maxLength={50}
              disabled={enviando}
              className="w-full border p-2 rounded"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              required
              maxLength={100}
              disabled={enviando}
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
              disabled={enviando}
              className="w-full border p-2 rounded"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          <button 
            type="submit" 
            disabled={enviando}
            className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
          >
            {enviando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Já tem conta? <Link to="/" className="text-blue-500">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}