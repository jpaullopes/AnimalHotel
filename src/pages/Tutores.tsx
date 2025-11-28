import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TutorCard } from '../components/TutorCard';

// Interface que define a estrutura de um tutor
interface Tutor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

// Página que lista todos os tutores
export function Tutores() {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  // Função para excluir um tutor
  const handleDelete = async (id: number) => {
    if (!confirm('Excluir tutor?')) return;
    
    // Primeiro deleta os animais do tutor
    const animals = await fetch(`http://localhost:3000/animals?tutorId=${id}`).then(r => r.json());
    for (const animal of animals) {
      await fetch(`http://localhost:3000/animals/${animal.id}`, { method: 'DELETE' });
    }
    
    // Depois deleta o tutor
    await fetch(`http://localhost:3000/tutors/${id}`, { method: 'DELETE' });
    setTutors(tutors.filter(t => t.id !== id));
  };

  // Carrega os tutores quando a página abre
  useEffect(() => {
    fetch('http://localhost:3000/tutors')
      .then(r => r.json())
      .then(dados => setTutors(dados));
  }, []);

  return (
    <div className="mt-8 p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Tutores</h2>
        <Link to="/tutores/cadastro" className="bg-blue-500 text-white px-4 py-2 rounded">
          Novo Tutor
        </Link>
      </div>

      <div className="grid gap-4">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} onDelete={handleDelete} />
        ))}
      </div>

      {tutors.length === 0 && (
        <p className="text-gray-500">Nenhum tutor encontrado.</p>
      )}
    </div>
  );
}