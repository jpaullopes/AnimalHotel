import { Link } from 'react-router-dom';

interface TutorProps {
  tutor: {
    id: number;
    nome: string;
    email: string;
    telefone: string;
  };
  onDelete?: (id: number) => void;
}

export function TutorCard({ tutor, onDelete }: TutorProps) {
  return (
    <div className="bg-white p-4 rounded shadow border">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">{tutor.nome}</h3>
          <p className="text-sm text-gray-600">{tutor.email}</p>
          <p className="text-xs text-gray-500">{tutor.telefone}</p>
        </div>
        <div className="flex flex-col gap-1">
          <Link to={`/tutores/editar/${tutor.id}`} className="text-blue-500 text-sm">Editar</Link>
          <button onClick={() => onDelete?.(tutor.id)} className="text-red-500 text-sm">Excluir</button>
        </div>
      </div>
    </div>
  );
}