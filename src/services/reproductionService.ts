import { API_URL } from './api';
import { Buffalo } from './buffaloService';

interface Funcionario {
  _id: string;
  nome: string;
  matricula?: string;
}

export interface Reproduction {
  _id: string;
  tagBufala: string;
  status: string;
  dataStatus: Date | string;
  dataInseminacao: Date | string;
  tipoInseminacao: string;
  vetResponsavel: string[]; // Array de IDs de funcionários
  tagPai: string;
  tagNascido?: string | null;
  bufala?: Buffalo | null;
  pai?: Buffalo;
  nascido?: Buffalo;
  veterinarios?: Funcionario[]; // Dados completos dos veterinários
}

interface ApiResponse {
  success: boolean;
  reproductions?: Reproduction[];
  reproduction?: Reproduction;
  buffalos?: Buffalo[];
  funcionarios?: Funcionario[];
}

const fetchBuffaloByTag = async (tag: string, token: string): Promise<Buffalo | null> => {
  try {
    const res = await fetch(`${API_URL}/buffalo/tag/${tag}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.buffalo || null;
  } catch {
    return null;
  }
};

export const getAllReproductions = async (token: string): Promise<Reproduction[]> => {
  try {
    const res = await fetch(`${API_URL}/reproductions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Erro ao buscar reproduções');
    const { reproductions }: ApiResponse = await res.json();
    if (!reproductions) return [];

    // Buscar dados dos búfalos individualmente
    const buffaloPromises = reproductions.map(r => fetchBuffaloByTag(r.tagBufala, token));
    const buffalosData = await Promise.all(buffaloPromises);

    // Montar resultado final incluindo os dados do búfalo
    return reproductions.map((reprod, idx) => ({
      ...reprod,
      buffalo: buffalosData[idx]
    }));

  } catch (error) {
    console.error('Erro no getAllReproductions:', error);
    throw error;
  }
};

export const getOneReproduction = async (id: string, token: string): Promise<Reproduction> => {
  try {
    const res = await fetch(`${API_URL}/reproduction/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Erro ao buscar reprodução');
    const { reproduction }: ApiResponse = await res.json();
    if (!reproduction) throw new Error('Reprodução não encontrada');

    const buffaloData = await fetchBuffaloByTag(reproduction.tagBufala, token);

    return {
      ...reproduction,
      bufala: buffaloData
    };

  } catch (error) {
    console.error('Erro no getOneReproduction:', error);
    throw error;
  }
};

export const postReproduction = async (data: any, token: string): Promise<any> => {
  const response = await fetch(`${API_URL}/reproduction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao criar Reprodução');
  }
  return await response.json();
};