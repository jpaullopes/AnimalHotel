import { Link } from 'react-router-dom';

interface AnimalCardProps {
  animal: {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    idade?: number;
    status: string;
    tutor?: {
      nome: string;
    };
  };
  onDelete?: (id: number) => void;
}

export function AnimalCard({ animal, onDelete }: AnimalCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow border">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">{animal.nome}</h3>
          <p className="text-sm text-gray-600">{animal.especie} - {animal.raca}</p>
          <p className="text-xs text-gray-500">Idade: {animal.idade ?? '-'} anos</p>
          <p className="text-xs text-gray-500">Status: {animal.status}</p>
          <p className="text-xs text-gray-500">Tutor: {animal.tutor?.nome || "Não informado"}</p>
        </div>
        <div className="flex flex-col gap-1">
          <Link to={`/animais/editar/${animal.id}`} className="text-blue-500 text-sm">Editar</Link>
          <button onClick={() => onDelete?.(animal.id)} className="text-red-500 text-sm">Excluir</button>
        </div>
      </div>
    </div>
  );
}