import { API_URL } from './api';
import { Buffalo } from './buffaloService';

interface Metrica {
    quantidade: number,
    unidadeMedida: string,
    dataMedida: Date  | string,
    dataInicio: Date | string,
    dataFim: Date | string,
  _id: string;
}

export interface Lactation {
  _id: string;
  tagBufala: string;
  status: string;
  dataAtualizacao: Date | string;
  metrica: Metrica[];
  bufala?: Buffalo | null;
}

interface ApiResponse {
  success: boolean;
  lactations?: Lactation[];
  lactation?: Lactation;
  buffalos?: Buffalo[];
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

export const getAllLactations = async (token: string): Promise<Lactation[]> => {
  try {
    const res = await fetch(`${API_URL}/lactations`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Erro ao buscar lactações');
    const { lactations }: ApiResponse = await res.json();
    if (!lactations) return [];

    // Buscar dados dos búfalos individualmente
    const buffaloPromises = lactations.map(r => fetchBuffaloByTag(r.tagBufala, token));
    const buffalosData = await Promise.all(buffaloPromises);

    // Montar resultado final incluindo os dados do búfalo
    return lactations.map((reprod, idx) => ({
      ...reprod,
      buffalo: buffalosData[idx]
    }));

  } catch (error) {
    console.error('Erro no getAllLactations:', error);
    throw error;
  }
};

export const getOneLactation = async (id: string, token: string): Promise<Lactation> => {
  try {
    const res = await fetch(`${API_URL}/lactation/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Erro ao buscar lactação');
    const { lactation }: ApiResponse = await res.json();
    if (!lactation) throw new Error('Lactação não encontrada');

    const buffaloData = await fetchBuffaloByTag(lactation.tagBufala, token);

    return {
      ...lactation,
      bufala: buffaloData
    };

  } catch (error) {
    console.error('Erro no getOneLactation:', error);
    throw error;
  }
};
