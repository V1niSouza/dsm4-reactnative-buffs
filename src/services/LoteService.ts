import { API_URL } from './api';
import { Buffalo } from './buffaloService';

export interface Lot {
  _id: string;
  nomeLote: string;
  tamanhoArea: number;
  unidadeMedida: string;
  qtdComporta: number;
  status: string;
  buffalos?: Buffalo[];
}

interface ApiResponse {
  success: boolean;
  lots?: Lot[];
  lot?: Lot;
  buffalos?: Buffalo[];
}

export const getLotsWithBuffalos = async (token: string): Promise<ApiResponse> => {
  const res = await fetch(`${API_URL}/lots`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const resBuffalos = await fetch(`${API_URL}/buffalos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok || !resBuffalos.ok) {
    throw new Error('Erro ao buscar lotes ou búfalos');
  }

  const dataLots = await res.json();
  const dataBuffalos = await resBuffalos.json();

  const lots = dataLots.lots;
  const buffalos = dataBuffalos.buffalos;

  // Relacionar búfalos com seus lotes pelo nome do lote
  const lotsWithBuffalos = lots.map((lot: Lot) => ({
    ...lot,
    buffalos: buffalos.filter((buffalo: Buffalo) => buffalo.localizacao === lot.nomeLote),
  }));

  return { success: true, lots: lotsWithBuffalos };
};
