import { API_URL } from './api';

interface Coletas {
  dataColeta: Date | string;
  quantidadeColetada: number;
  empresaColeta: string;
  valorPago: number;
  resultado: string;
  desc: string;
}

export interface Production {
    totalProduzido: number;
    totalRejeitado: number;
    totalRetirado: number;
    estoqueAtual: number;
    dataAtualizacao: Date | string;
    coletas: Coletas[];
}



export const getAllProductions = async (token: string): Promise<Production[]> => {
  const response = await fetch(`${API_URL}/productions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar produção');
  }

  const data = await response.json();
  return data.productions;
};

export const postProduction = async (data: any, id: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/production/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    return responseData;
  } catch (error) {
    console.error('Erro no postProduction:', error);
    throw error;
  }
};
