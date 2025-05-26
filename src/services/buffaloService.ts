import { API_URL } from './api';

// Interfaces
interface Funcionario {
  _id: string;
  nome: string;
}

interface Atividade {
  status: "Ativa" | "Inativa" | string;
  dataAtualizacao: string | Date;
  _id: string;
}

interface Zootecnico {
  peso: number;
  condicaoCorporal: string;
  dataAtualizacao: string | Date;
  funcionarioResponsavel: string[];
  observacao: string[]
  _id: string;
  funcionarios?: Funcionario[]; // Adicionado para armazenar os dados completos
}

interface Sanitario {
  tpSanitario: string;
  medicacaoAplicada: string;
  dataAplicacao: string | Date;
  dataRetorno?: string | Date;
  dosagem: number;
  unidadeMedidaDosagem: string;
  doencaCombatida: string;
  funcionarioResponsavel: string[];
  _id: string;
  funcionarios?: Funcionario[]; // Adicionado para armazenar os dados completos
}

export interface Buffalo {
  _id: string;
  tag: string;
  nome: string;
  sexo: "Fêmea" | "Macho";
  maturidade: string;
  raca: string;
  tagPai?: string;
  tagMae?: string;
  localizacao: string;
  grupo: string;
  atividade: Atividade[];
  zootecnico: Zootecnico[];
  sanitario: Sanitario[];
  __v?: number;
}

// Função auxiliar para buscar funcionários
const fetchFuncionarios = async (ids: string[], token: string): Promise<Funcionario[]> => {
  if (ids.length === 0) return [];
  
  try {
    const response = await fetch(`${API_URL}/users?ids=${ids.join(',')}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Erro ao buscar funcionários');
    
    const data = await response.json();
    return data.users || [];
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    return [];
  }
};

// Serviço principal
export const getBuffaloById = async (id: string, token: string): Promise<Buffalo> => {
  try {
    // 1. Busca os dados do búfalo
    const response = await fetch(`${API_URL}/buffalo/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao buscar búfalo');
    }

    const data = await response.json();
    const buffalo: Buffalo = data.buffalo;

    // 2. Coleta todos os IDs de funcionários únicos
    const funcionarioIds = [
      ...new Set([
        ...buffalo.zootecnico.flatMap(z => z.funcionarioResponsavel),
        ...buffalo.sanitario.flatMap(s => s.funcionarioResponsavel)
      ].filter(Boolean))
    ];

    // 3. Busca os funcionários
    const funcionarios = await fetchFuncionarios(funcionarioIds, token);

    // 4. Mapeia os funcionários para os registros
    buffalo.zootecnico.forEach(z => {
      z.funcionarios = z.funcionarioResponsavel
        .map(id => funcionarios.find(f => f._id === id))
        .filter(Boolean) as Funcionario[];
    });

    buffalo.sanitario.forEach(s => {
      s.funcionarios = s.funcionarioResponsavel
        .map(id => funcionarios.find(f => f._id === id))
        .filter(Boolean) as Funcionario[];
    });

    return buffalo;

  } catch (error) {
    console.error('Erro no serviço getBuffaloById:', error);
    throw error;
  }
};

export const getBuffalos = async (token: string): Promise<Buffalo[]> => {
  const response = await fetch(`${API_URL}/buffalos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar búfalos');
  }

  const data = await response.json();
  return data.buffalos;
};