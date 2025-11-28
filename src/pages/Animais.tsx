import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimalCard } from '../components/AnimalList';

// Interface que define a estrutura de um animal
interface AnimalProps {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  status: string;
  tutorId: number;
  tutor?: {
    nome: string;
  };
}

// Página que lista todos os animais
export function Animais() {
  const [animals, setAnimals] = useState<AnimalProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para excluir um animal
  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza?')) return;
    await fetch(`http://localhost:3000/animals/${id}`, { method: 'DELETE' });
    setAnimals(animals.filter(a => a.id !== id));
  };

  // Carrega os animais quando a página abre
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/animals').then(r => r.json()),
      fetch('http://localhost:3000/tutors').then(r => r.json())
    ])
      .then(([animaisData, tutoresData]) => {
        // Junta cada animal com seu tutor
        const animaisComTutor = animaisData.map((animal: AnimalProps) => ({
          ...animal,
          tutor: tutoresData.find((t: { id: string }) => t.id === String(animal.tutorId))
        }));
        setAnimals(animaisComTutor);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="mt-8 p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Animais</h2>
        <Link to="/animais/cadastro" className="bg-blue-500 text-white px-4 py-2 rounded">
          Novo Animal
        </Link>
      </div>

      <div className="grid gap-4">
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} onDelete={handleDelete} />
        ))}
      </div>

      {animals.length === 0 && (
        <p className="text-gray-500">Nenhum animal cadastrado.</p>
      )}
    </div>
  );
}