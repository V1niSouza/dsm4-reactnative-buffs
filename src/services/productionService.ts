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

