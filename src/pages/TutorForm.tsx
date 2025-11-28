import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

// Formulário para cadastrar ou editar tutor
export function TutorForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL se for edição

  // Estados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');

  // Se for edição, carrega os dados do tutor
  useEffect(() => {
    if (id) {
      fetch(`https://backend-animalhotels.onrender.com/tutors/${id}`)
        .then(r => r.json())
        .then(data => {
          setNome(data.nome);
          setEmail(data.email);
          setTelefone(data.telefone);
        });
    }
  }, [id]);

  // Função que salva o tutor
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    // Validação simples
    if (nome.length < 2) {
      setErro('Nome muito curto');
      return;
    }

    try {
      // Se tem ID é edição (PUT), senão é criação (POST)
      await fetch(id ? `https://backend-animalhotels.onrender.com/tutors/${id}` : 'https://backend-animalhotels.onrender.com/tutors', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone }),
      });

      navigate('/tutores');
    } catch {
      setErro('Erro ao salvar');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{id ? 'Editar' : 'Novo'} Tutor</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        
        <div>
          <label className="block mb-1">Nome</label>
          <input 
            type="text"
            required
            maxLength={50}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input 
            type="email"
            required
            maxLength={100}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Telefone</label>
          <input 
            type="text"
            required
            maxLength={15}
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {erro && <p className="text-red-500 text-sm">{erro}</p>}

        <div className="flex gap-3 mt-2">
          <Link to="/tutores" className="text-gray-500">Cancelar</Link>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}