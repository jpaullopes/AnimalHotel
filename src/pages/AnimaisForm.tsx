import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

interface Tutor {
  id: string;
  nome: string;
}

// Formulário para cadastrar ou editar animal
export function AnimaisForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL se for edição

  // Estados do formulário
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('Cachorro');
  const [raca, setRaca] = useState('');
  const [status, setStatus] = useState('Aguardando');
  const [tutorId, setTutorId] = useState('');
  const [idade, setIdade] = useState<number | string>('');
  const [tutores, setTutores] = useState<Tutor[]>([]);

  // Carrega a lista de tutores
  useEffect(() => {
    fetch('http://localhost:3000/tutors')
      .then(r => r.json())
      .then(data => {
        setTutores(data);
        if (data.length > 0 && !id) {
          setTutorId(data[0].id);
        }
      });
  }, [id]);

  // Se for edição, carrega os dados do animal
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/animals/${id}`)
        .then(r => r.json())
        .then(data => {
          setNome(data.nome);
          setEspecie(data.especie);
          setRaca(data.raca);
          setStatus(data.status);
          setTutorId(data.tutorId);
          if(data.idade) setIdade(data.idade);
        });
    }
  }, [id]);

  // Função que salva o animal
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const animal = { nome, especie, raca, status, tutorId, idade};

    // Se tem ID é edição (PUT), senão é criação (POST)
    await fetch(id ? `http://localhost:3000/animals/${id}` : 'http://localhost:3000/animals', {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(animal),
    });

    navigate('/animais');
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{id ? 'Editar' : 'Novo'} Animal</h2>

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
          <label className="block mb-1">Espécie</label>
          <select 
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Raça</label>
          <input 
            type="text"
            required
            maxLength={30}
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Idade</label>
          <input 
            type="number"
            required
            min="0"
            max="50"
            value={idade}
            onChange={(e) => setIdade(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>

        {id && (
          <div>
            <label className="block mb-1">Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="Aguardando">Aguardando</option>
              <option value="Hospedado">Hospedado</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>
        )}

        <div>
          <label className="block mb-1">Tutor</label>
          <select 
            value={tutorId}
            onChange={(e) => setTutorId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            {tutores.map(t => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 mt-2">
          <Link to="/animais" className="text-gray-500">Cancelar</Link>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}