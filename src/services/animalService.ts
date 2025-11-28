import { api } from './api';
import { Animal } from '../types/animal';

// Busca todos os animais
export const getAnimals = async (): Promise<Animal[]> => {
  const response = await api.get<Animal[]>('/animals');
  return response.data;
};

// Exemplo para deletar (já preparando para o CRUD completo)
export const deleteAnimal = async (id: number): Promise<void> => {
  await api.delete(`/animals/${id}`);
};