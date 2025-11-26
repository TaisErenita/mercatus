// MTRIX Data - Atualizado em 26/11/2025
// Fonte: MTRIX-Sellout-Nutry-2025-2semestre-atualizado-12112025.csv
// Total: 328.984 registros processados
// Integrado com mtrixDataReal.js

import { getMtrixDistribuidores, getMtrixVendasPorUF, getMtrixSummary } from './mtrixDataReal';

// Função auxiliar para agrupar dados por região
const agruparPorRegiao = (dados, regiaoMap) => {
  const resultado = {};
  
  Object.entries(regiaoMap).forEach(([regiao, ufs]) => {
    resultado[regiao] = dados.filter(item => ufs.includes(item.UF));
  });
  
  return resultado;
};

// Mapeamento de UFs para regiões
const regiaoMap = {
  brasil: ['SP', 'RJ', 'MG', 'ES', 'RS', 'SC', 'PR', 'BA', 'CE', 'PE', 'MA', 'GO', 'DF', 'MT', 'MS', 'PA', 'AM', 'RO', 'AC', 'TO', 'AL', 'SE', 'PB', 'RN', 'PI'],
  sp_rj_mg_es: ['SP', 'RJ', 'MG', 'ES'],
  sul: ['RS', 'SC', 'PR'],
  ne_no_co: ['BA', 'CE', 'PE', 'MA', 'GO', 'DF', 'MT', 'MS', 'PA', 'AM', 'RO', 'AC', 'TO', 'AL', 'SE', 'PB', 'RN', 'PI']
};

// Função para gerar estrutura compatível com o formato antigo
const gerarEstruturaMtrix = () => {
  const distribuidores = getMtrixDistribuidores();
  const vendasPorUF = getMtrixVendasPorUF();
  const summary = getMtrixSummary();
  
  // Agrupar distribuidores por região
  const distribPorRegiao = agruparPorRegiao(distribuidores, regiaoMap);
  
  // Estrutura compatível com formato antigo
  const estrutura = {
    total: {
      mes_yoy: {},
      trimestre_yoy: {},
      ytd: {}
    },
    cereais: {
      mes_yoy: {},
      trimestre_yoy: {},
      ytd: {}
    },
    frutas: {
      mes_yoy: {},
      trimestre_yoy: {},
      ytd: {}
    },
    nuts: {
      mes_yoy: {},
      trimestre_yoy: {},
      ytd: {}
    },
    proteina: {
      mes_yoy: {},
      trimestre_yoy: {},
      ytd: {}
    }
  };
  
  // Preencher cada categoria e período com dados reais
  Object.keys(estrutura).forEach(categoria => {
    Object.keys(estrutura[categoria]).forEach(periodo => {
      Object.keys(regiaoMap).forEach(regiao => {
        const dadosRegiao = distribPorRegiao[regiao] || [];
        
        // Pegar top 5 distribuidores da região
        estrutura[categoria][periodo][regiao] = dadosRegiao
          .slice(0, 5)
          .map(d => ({
            distribuidor: d['Agente de Distribuição'],
            faturamento: d['Faturamento (R$)'],
            volume: d['# Sell-Out \n(Und)'],
            precoMedio: d['Preço Médio Unitário (R$)'],
            uf: d.UF
          }));
      });
    });
  });
  
  return estrutura;
};

// Exportar dados no formato compatível
export const mtrixData = gerarEstruturaMtrix();

// Exportar também funções auxiliares
export const getMtrixDataByCategoria = (categoria) => {
  return mtrixData[categoria] || mtrixData.total;
};

export const getMtrixDataByPeriodo = (categoria, periodo) => {
  return mtrixData[categoria]?.[periodo] || {};
};

export const getMtrixDataByRegiao = (categoria, periodo, regiao) => {
  return mtrixData[categoria]?.[periodo]?.[regiao] || [];
};

// Estatísticas gerais
export const getMtrixStats = () => {
  const summary = getMtrixSummary();
  return {
    totalRegistros: summary.totalRegistros,
    totalDistribuidores: summary.distribuidoresUnicos,
    totalUFs: summary.ufsUnicas,
    receitaTotal: summary.receitaTotal,
    volumeTotal: summary.volumeTotal,
    precoMedio: summary.precoMedio
  };
};

export default mtrixData;
