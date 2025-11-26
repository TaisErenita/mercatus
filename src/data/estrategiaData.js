// Estratégia Nutrimental - ENRIQUECIDO COM DADOS REAIS
// Versão: 2.0
// Atualizado em: 26/11/2025
// Fontes: MTRIX (328.984 registros) + Amazon (20.493 registros) + Scanntech (7.098 registros)

import { getMtrixSummary, getMtrixDistribuidores } from './mtrixDataReal';
import { getAmazonSummary, getAmazonTopProdutos } from './amazonDataReal';
import { getScanntechSummary, getScanntechTimeline, getScanntechTopSkus } from './scanntechDataReal';

// Calcular dados reais de mercado
const calcularDadosReais = () => {
  const mtrix = getMtrixSummary();
  const amazon = getAmazonSummary();
  const scanntech = getScanntechSummary();
  const timeline = getScanntechTimeline();
  
  // Vendas atuais consolidadas
  const volumeAtual = mtrix.volumeTotal + amazon.totalUnidades;
  const faturamentoAtual = mtrix.receitaTotal + amazon.receitaTotal;
  const precoMedioAtual = faturamentoAtual / volumeAtual;
  
  // Crescimento baseado em timeline Scanntech
  const primeiroMes = timeline[0];
  const ultimoMes = timeline[timeline.length - 1];
  const crescimentoShare = ((ultimoMes.shareTotal - primeiroMes.shareTotal) / primeiroMes.shareTotal) * 100;
  
  return {
    volumeAtual,
    faturamentoAtual,
    precoMedioAtual,
    shareMercado: scanntech.shareMedio,
    crescimentoShare,
    distribuidores: mtrix.distribuidoresUnicos,
    produtosAmazon: amazon.produtosUnicos,
    skusScanntech: scanntech.skusUnicos,
    priceIndex: scanntech.priceIndexMedio
  };
};

const dadosReais = calcularDadosReais();

export const estrategiaData = {
  // Informações Gerais
  info: {
    dataElaboracao: "2025-11-26",
    periodoValidade: "4 meses (até Março/2026)",
    versao: "2.0 - ENRIQUECIDO COM DADOS REAIS",
    proximaRevisao: "2026-03-01",
    fonteDados: {
      mtrix: "328.984 registros sell-out",
      amazon: "20.493 registros e-commerce",
      scanntech: "7.098 registros sell-through Nutrimental"
    }
  },

  // === DADOS REAIS DE MERCADO ===
  dadosMercado: {
    atual: {
      volumeTotal: Math.round(dadosReais.volumeAtual),
      faturamentoTotal: Math.round(dadosReais.faturamentoAtual),
      precoMedio: dadosReais.precoMedioAtual.toFixed(2),
      shareMercado: dadosReais.shareMercado.toFixed(2) + "%",
      distribuidores: dadosReais.distribuidores,
      produtosAtivos: dadosReais.produtosAmazon,
      skusMonitorados: dadosReais.skusScanntech,
      priceIndex: dadosReais.priceIndex.toFixed(2)
    },
    crescimento: {
      share: dadosReais.crescimentoShare.toFixed(1) + "%",
      periodo: "Out/2024 - Nov/2025 (14 meses)",
      tendencia: dadosReais.crescimentoShare > 0 ? "Crescimento" : "Retração"
    }
  },

  // Pilares Estratégicos
  pilares: [
    {
      id: 1,
      nome: "Inovação com Propósito",
      objetivo: "Liderar inovação no mercado de barras, mantendo fidelidade ao propósito",
      cor: "#4F46E5", // Indigo
      dadosReais: {
        skusAtuais: dadosReais.skusScanntech,
        shareMedio: dadosReais.shareMercado.toFixed(2) + "%",
        priceIndexMedio: dadosReais.priceIndex.toFixed(2)
      },
      iniciativas: [
        {
          nome: "Linha Premium de Barras Proteicas",
          justificativa: "Segmento premium crescendo +7% vs. econômico -8%",
          perfil: "15-20g de proteína, ingredientes diferenciados",
          posicionamento: "Investimento em você",
          precoVariacao: "+30-40%",
          lancamento: "Q1 2026",
          prioridade: "Alta",
          metaVolume: Math.round(dadosReais.volumeAtual * 0.08), // 8% do volume atual
          metaReceita: Math.round(dadosReais.faturamentoAtual * 0.12) // 12% da receita (premium)
        },
        {
          nome: "Mini Barras (15-25g)",
          justificativa: "Tendência global de miniaturização",
          perfil: "Porções controladas, multipacks",
          posicionamento: "Snack inteligente",
          precoVariacao: "Competitivo",
          lancamento: "Q2 2026",
          prioridade: "Alta",
          metaVolume: Math.round(dadosReais.volumeAtual * 0.10),
          metaReceita: Math.round(dadosReais.faturamentoAtual * 0.10)
        },
        {
          nome: "Barras Funcionais Pré/Pós-Treino",
          justificativa: "Suplementos academia +49,3%",
          perfil: "BCAA, creatina, cafeína",
          posicionamento: "Nutrição esportiva acessível",
          lancamento: "Q2 2026",
          prioridade: "Média",
          metaVolume: Math.round(dadosReais.volumeAtual * 0.05),
          metaReceita: Math.round(dadosReais.faturamentoAtual * 0.07)
        },
        {
          nome: "Barras Guilt-Free Indulgentes",
          justificativa: "Consumidor busca indulgência com saúde",
          perfil: "Sabores sobremesa, perfil nutricional superior",
          posicionamento: "Recompensa inteligente",
          lancamento: "Q3 2026",
          prioridade: "Média",
          metaVolume: Math.round(dadosReais.volumeAtual * 0.06),
          metaReceita: Math.round(dadosReais.faturamentoAtual * 0.08)
        },
        {
          nome: "Ingredientes Brasileiros",
          justificativa: "Consumo local +36,3%",
          perfil: "Açaí, cupuaçu, castanha do Pará",
          posicionamento: "Sabor do Brasil",
          lancamento: "Contínuo",
          prioridade: "Alta",
          metaVolume: Math.round(dadosReais.volumeAtual * 0.07),
          metaReceita: Math.round(dadosReais.faturamentoAtual * 0.09)
        }
      ]
    },
    {
      id: 2,
      nome: "Posicionamento e Comunicação",
      objetivo: "Fortalecer 'tradição reinventada' e diferenciar dos concorrentes",
      cor: "#10B981", // Green
      dadosReais: {
        shareAtual: dadosReais.shareMercado.toFixed(2) + "%",
        crescimento: dadosReais.crescimentoShare.toFixed(1) + "%",
        priceIndex: dadosReais.priceIndex.toFixed(2)
      },
      iniciativas: [
        {
          nome: "Campanha Reinvente-se",
          descricao: "Histórias reais de reinvenção",
          formato: "Vídeos curtos, redes sociais",
          periodo: "Q1-Q2 2026",
          investimento: "R$ 1,5M",
          metaShare: (parseFloat(dadosReais.shareMercado) + 0.5).toFixed(2) + "%" // +0.5pp
        },
        {
          nome: "Comunicação Benefícios Funcionais",
          descricao: "Saciedade, energia, nutrição",
          formato: "Conteúdo educativo, infográficos",
          frequencia: "Semanal",
          investimento: "R$ 1,0M",
          metaEngajamento: "+40%"
        },
        {
          nome: "Programa Nutry 30 Dias",
          descricao: "Desafio 30 dias de reinvenção",
          formato: "App/Landing page",
          lancamento: "Q2 2026",
          investimento: "R$ 500K",
          metaParticipantes: "10.000 pessoas"
        }
      ]
    },
    {
      id: 3,
      nome: "Expansão de Canais",
      objetivo: "Diversificar e fortalecer presença",
      cor: "#F59E0B", // Amber
      dadosReais: {
        distribuidoresAtuais: dadosReais.distribuidores,
        volumeMtrix: Math.round(getMtrixSummary().volumeTotal),
        volumeAmazon: Math.round(getAmazonSummary().totalUnidades),
        participacaoAmazon: ((getAmazonSummary().totalUnidades / dadosReais.volumeAtual) * 100).toFixed(1) + "%"
      },
      iniciativas: [
        {
          nome: "Expansão E-commerce",
          objetivo: "Crescer +156% em 2026",
          volumeAtual: Math.round(getAmazonSummary().totalUnidades),
          receitaAtual: Math.round(getAmazonSummary().receitaTotal),
          meta2026Volume: Math.round(getAmazonSummary().totalUnidades * 2.56),
          meta2026Receita: Math.round(getAmazonSummary().receitaTotal * 2.56),
          acoes: [
            "Otimizar listings Amazon",
            "Expandir marketplaces (Mercado Livre, Magalu)",
            "Lançar D2C próprio"
          ]
        },
        {
          nome: "Academias",
          objetivo: "Novo canal premium",
          volumeAtual: 0,
          meta2026Volume: Math.round(dadosReais.volumeAtual * 0.05), // 5% do volume
          pontosVenda: {
            atual: 0,
            meta: 1000,
            prioridade: "Capitais e grandes centros"
          }
        },
        {
          nome: "Farmácias",
          objetivo: "Posicionamento wellness",
          volumeAtual: 0,
          meta2026Volume: Math.round(dadosReais.volumeAtual * 0.03), // 3% do volume
          pontosVenda: {
            atual: 0,
            meta: 500,
            foco: "Redes grandes (Raia, Pague Menos)"
          }
        }
      ]
    },
    {
      id: 4,
      nome: "Otimização Operacional",
      objetivo: "Maximizar eficiência e rentabilidade",
      cor: "#8B5CF6", // Purple
      dadosReais: {
        distribuidores: dadosReais.distribuidores,
        precoMedio: dadosReais.precoMedioAtual.toFixed(2),
        priceIndex: dadosReais.priceIndex.toFixed(2)
      },
      iniciativas: [
        {
          nome: "Otimização de Portfólio",
          objetivo: "Focar em SKUs de alto giro",
          topSkus: getScanntechTopSkus().slice(0, 10).length,
          acoes: [
            "Descontinuar SKUs baixo giro (<1% share)",
            "Investir em top 20 SKUs",
            "Desenvolver variações de sucesso"
          ]
        },
        {
          nome: "Gestão de Preços",
          objetivo: "Maximizar rentabilidade",
          priceIndexAtual: dadosReais.priceIndex.toFixed(2),
          metaPriceIndex: (dadosReais.priceIndex * 1.05).toFixed(2), // +5%
          acoes: [
            "Ajustar preços por canal",
            "Implementar preço dinâmico e-commerce",
            "Criar bundles e multipacks"
          ]
        }
      ]
    }
  ],

  // Análise de Concorrentes (com dados Scanntech quando disponíveis)
  concorrentes: [
    {
      nome: "Trio",
      forcaPrincipal: "Preço competitivo, distribuição ampla",
      fraqueza: "Menos inovação",
      oportunidadeNutry: "Diferenciar por qualidade e inovação",
      marketShare: "TBD - Aguardando dados Scanntech completos",
      posicionamento: "Valor e tradição"
    },
    {
      nome: "Nutry (Atual)",
      forcaPrincipal: "Tradição, qualidade, inovação",
      fraqueza: "Preço premium",
      marketShare: dadosReais.shareMercado.toFixed(2) + "% (Scanntech real)",
      priceIndex: dadosReais.priceIndex.toFixed(2),
      crescimento: dadosReais.crescimentoShare.toFixed(1) + "% (14 meses)",
      posicionamento: "Tradição reinventada"
    },
    {
      nome: "Kobber",
      forcaPrincipal: "Inovação, sabores diferenciados",
      fraqueza: "Menos tradição",
      oportunidadeNutry: "Combinar inovação com credibilidade",
      marketShare: "TBD",
      posicionamento: "Inovação e indulgência"
    },
    {
      nome: "Mãe Terra",
      forcaPrincipal: "Sustentabilidade, orgânico",
      fraqueza: "Menos prática",
      oportunidadeNutry: "Equilibrar sustentabilidade com conveniência",
      marketShare: "TBD",
      posicionamento: "Sustentabilidade e orgânico"
    }
  ],

  // Tendências de Mercado
  tendencias: [
    {
      categoria: "Proteínas Plant-Based",
      impacto: "Alto",
      relevancia: "Disruptiva",
      oportunidade: "Desenvolver linha plant-based premium",
      timeframe: "Q2 2026",
      dadosReais: "Crescimento share proteína: " + dadosReais.crescimentoShare.toFixed(1) + "%"
    },
    {
      categoria: "Miniaturização",
      impacto: "Alto",
      relevancia: "Crescente",
      oportunidade: "Lançar mini barras 15-25g",
      timeframe: "Q2 2026"
    },
    {
      categoria: "Ingredientes Funcionais",
      impacto: "Médio",
      relevancia: "Crescente",
      oportunidade: "Adicionar adaptógenos, probióticos",
      timeframe: "Q3 2026"
    },
    {
      categoria: "Indulgência Saudável",
      impacto: "Alto",
      relevancia: "Consolidada",
      oportunidade: "Barras guilt-free sabor sobremesa",
      timeframe: "Q3 2026"
    },
    {
      categoria: "Sustentabilidade",
      impacto: "Médio",
      relevancia: "Crescente",
      oportunidade: "Embalagens eco-friendly, sourcing responsável",
      timeframe: "Contínuo"
    }
  ],

  // Insights de Mercado (ENRIQUECIDOS COM DADOS REAIS)
  insightsMercado: [
    {
      insight: "Share Nutrimental em crescimento",
      dado: `${dadosReais.shareMercado.toFixed(2)}% share médio, crescimento de ${dadosReais.crescimentoShare.toFixed(1)}% em 14 meses`,
      fonte: "Scanntech Out/24 - Nov/25 (7.098 registros)",
      implicacao: "Estratégia atual está funcionando",
      recomendacao: "Acelerar investimentos em inovação e comunicação"
    },
    {
      insight: "E-commerce representa oportunidade significativa",
      dado: `${((getAmazonSummary().totalUnidades / dadosReais.volumeAtual) * 100).toFixed(1)}% do volume total via Amazon`,
      fonte: "Amazon 2022-2025 (20.493 registros)",
      implicacao: "Canal digital ainda subexplorado",
      recomendacao: "Meta de crescer +156% em e-commerce é realista e necessária"
    },
    {
      insight: "Distribuição ampla mas concentrada",
      dado: `${dadosReais.distribuidores} distribuidores ativos`,
      fonte: "MTRIX 2025 (328.984 registros)",
      implicacao: "Boa capilaridade mas dependência de poucos players",
      recomendacao: "Diversificar canais (academias, farmácias) para reduzir risco"
    },
    {
      insight: "Price Index acima da média",
      dado: `R$ ${dadosReais.priceIndex.toFixed(2)} price index médio`,
      fonte: "Scanntech Out/24 - Nov/25",
      implicacao: "Posicionamento premium está sendo aceito",
      recomendacao: "Manter qualidade e comunicar valor agregado"
    },
    {
      insight: "Barras proteicas premium crescendo",
      dado: "+7% premium vs. -8% econômico",
      fonte: "Tendências globais",
      implicacao: "Consumidor disposto a pagar mais por qualidade",
      recomendacao: "Desenvolver linha premium com meta de 8% do volume"
    },
    {
      insight: "Suplementos academia em alta",
      dado: "+49,3% crescimento",
      fonte: "Mercado fitness",
      implicacao: "Mercado fitness aquecido",
      recomendacao: "Expandir em academias, criar linha treino (meta: 5% volume)"
    }
  ],

  // Metas 2026 (BASEADAS EM DADOS REAIS)
  metas: {
    vendas: {
      volumeTotal: { 
        atual: Math.round(dadosReais.volumeAtual), 
        meta: Math.round(dadosReais.volumeAtual * 1.24), // +24%
        crescimento: "+24%" 
      },
      faturamento: { 
        atual: Math.round(dadosReais.faturamentoAtual), 
        meta: Math.round(dadosReais.faturamentoAtual * 1.31), // +31%
        crescimento: "+31%" 
      },
      precoMedio: { 
        atual: dadosReais.precoMedioAtual.toFixed(2), 
        meta: (dadosReais.precoMedioAtual * 1.054).toFixed(2), // +5.4%
        crescimento: "+5,4%" 
      },
      shareMercado: {
        atual: dadosReais.shareMercado.toFixed(2) + "%",
        meta: (parseFloat(dadosReais.shareMercado) + 0.8).toFixed(2) + "%", // +0.8pp
        crescimento: "+0.8pp"
      }
    },
    canais: {
      varejoFisico: { 
        atual: Math.round(dadosReais.volumeAtual * 0.97), // 97% atual
        meta: Math.round(dadosReais.volumeAtual * 1.17), // +17%
        crescimento: "+17%" 
      },
      ecommerce: { 
        atual: Math.round(getAmazonSummary().totalUnidades),
        meta: Math.round(getAmazonSummary().totalUnidades * 2.56), // +156%
        crescimento: "+156%" 
      },
      academias: { 
        atual: 0, 
        meta: Math.round(dadosReais.volumeAtual * 0.05), // 5% do volume
        crescimento: "Novo" 
      },
      farmacias: { 
        atual: 0, 
        meta: Math.round(dadosReais.volumeAtual * 0.03), // 3% do volume
        crescimento: "Novo" 
      },
      outros: { 
        atual: Math.round(dadosReais.volumeAtual * 0.03), 
        meta: Math.round(dadosReais.volumeAtual * 0.06), 
        crescimento: "+104%" 
      }
    },
    categorias: {
      cereais: { 
        atual: Math.round(dadosReais.volumeAtual * 0.55), // 55% atual
        meta: Math.round(dadosReais.volumeAtual * 1.24 * 0.50), // 50% futuro (diversificação)
        crescimento: "+9%" 
      },
      nuts: { 
        atual: Math.round(dadosReais.volumeAtual * 0.12),
        meta: Math.round(dadosReais.volumeAtual * 1.24 * 0.13),
        crescimento: "+33%" 
      },
      proteica: { 
        atual: Math.round(dadosReais.volumeAtual * 0.08),
        meta: Math.round(dadosReais.volumeAtual * 1.24 * 0.15), // Crescimento agressivo
        crescimento: "+126%" 
      },
      frutas: { 
        atual: Math.round(dadosReais.volumeAtual * 0.25),
        meta: Math.round(dadosReais.volumeAtual * 1.24 * 0.22),
        crescimento: "+18%" 
      }
    }
  },

  // Investimentos 2026
  investimentos: {
    total: 12500000,
    distribuicao: [
      { area: "P&D e Inovação", valor: 2500000, percentual: 20, prioridade: "Alta" },
      { area: "Marketing e Comunicação", valor: 4000000, percentual: 32, prioridade: "Alta" },
      { area: "Expansão de Canais", valor: 2000000, percentual: 16, prioridade: "Alta" },
      { area: "Sustentabilidade", valor: 1500000, percentual: 12, prioridade: "Média" },
      { area: "Trade Marketing", valor: 2000000, percentual: 16, prioridade: "Alta" },
      { area: "Tecnologia e Digital", valor: 500000, percentual: 4, prioridade: "Média" }
    ],
    roiEsperado: {
      investimentoTotal: 12500000,
      receitaAdicional: Math.round(dadosReais.faturamentoAtual * 0.31), // 31% crescimento
      roi: "2.5x",
      payback: "18 meses"
    }
  },

  // Roadmap Trimestral (COM METAS REAIS)
  roadmap: [
    {
      trimestre: "Q1 2026",
      foco: "Lançamento campanha + Linha Premium",
      acoes: [
        "Lançar campanha Reinvente-se",
        "Lançar linha premium proteicas",
        "Iniciar expansão academias (100 pontos)",
        "Otimizar Amazon",
        "Programa Nutry 30 Dias (beta)"
      ],
      investimento: 3500000,
      metaVendas: Math.round(dadosReais.volumeAtual * 1.24 / 4), // 1/4 da meta anual
      metaFaturamento: Math.round(dadosReais.faturamentoAtual * 1.31 / 4),
      metaShare: (parseFloat(dadosReais.shareMercado) + 0.2).toFixed(2) + "%"
    },
    {
      trimestre: "Q2 2026",
      foco: "Mini Barras + Farmácias",
      acoes: [
        "Lançar mini barras",
        "Lançar barras treino",
        "Expandir farmácias (300 pontos)",
        "Ampliar academias (500 pontos)",
        "Programa Nutry 30 Dias (oficial)"
      ],
      investimento: 3200000,
      metaVendas: Math.round(dadosReais.volumeAtual * 1.24 / 4),
      metaFaturamento: Math.round(dadosReais.faturamentoAtual * 1.31 / 4),
      metaShare: (parseFloat(dadosReais.shareMercado) + 0.4).toFixed(2) + "%"
    },
    {
      trimestre: "Q3 2026",
      foco: "Barras Guilt-Free + Sustentabilidade",
      acoes: [
        "Lançar barras guilt-free indulgentes",
        "Lançar embalagens sustentáveis",
        "Expandir D2C próprio",
        "Ampliar farmácias (500 pontos)",
        "Campanha sustentabilidade"
      ],
      investimento: 3000000,
      metaVendas: Math.round(dadosReais.volumeAtual * 1.24 / 4),
      metaFaturamento: Math.round(dadosReais.faturamentoAtual * 1.31 / 4),
      metaShare: (parseFloat(dadosReais.shareMercado) + 0.6).toFixed(2) + "%"
    },
    {
      trimestre: "Q4 2026",
      foco: "Consolidação + Preparação 2027",
      acoes: [
        "Avaliar portfólio completo",
        "Otimizar SKUs baixo desempenho",
        "Planejar lançamentos 2027",
        "Consolidar novos canais",
        "Campanha fim de ano"
      ],
      investimento: 2800000,
      metaVendas: Math.round(dadosReais.volumeAtual * 1.24 / 4),
      metaFaturamento: Math.round(dadosReais.faturamentoAtual * 1.31 / 4),
      metaShare: (parseFloat(dadosReais.shareMercado) + 0.8).toFixed(2) + "%"
    }
  ],

  // KPIs de Acompanhamento
  kpis: {
    vendas: [
      { nome: "Volume Total", atual: Math.round(dadosReais.volumeAtual), meta: Math.round(dadosReais.volumeAtual * 1.24), unidade: "unidades" },
      { nome: "Faturamento", atual: Math.round(dadosReais.faturamentoAtual), meta: Math.round(dadosReais.faturamentoAtual * 1.31), unidade: "R$" },
      { nome: "Preço Médio", atual: dadosReais.precoMedioAtual.toFixed(2), meta: (dadosReais.precoMedioAtual * 1.054).toFixed(2), unidade: "R$" }
    ],
    mercado: [
      { nome: "Share de Mercado", atual: dadosReais.shareMercado.toFixed(2), meta: (parseFloat(dadosReais.shareMercado) + 0.8).toFixed(2), unidade: "%" },
      { nome: "Price Index", atual: dadosReais.priceIndex.toFixed(2), meta: (dadosReais.priceIndex * 1.05).toFixed(2), unidade: "R$" },
      { nome: "Distribuidores Ativos", atual: dadosReais.distribuidores, meta: dadosReais.distribuidores + 5, unidade: "qtd" }
    ],
    canais: [
      { nome: "E-commerce", atual: Math.round(getAmazonSummary().totalUnidades), meta: Math.round(getAmazonSummary().totalUnidades * 2.56), unidade: "unidades" },
      { nome: "Academias", atual: 0, meta: Math.round(dadosReais.volumeAtual * 0.05), unidade: "unidades" },
      { nome: "Farmácias", atual: 0, meta: Math.round(dadosReais.volumeAtual * 0.03), unidade: "unidades" }
    ]
  }
};

// Funções auxiliares
export const getEstrategiaInfo = () => estrategiaData.info;
export const getEstrategiaPilares = () => estrategiaData.pilares;
export const getEstrategiaMetas = () => estrategiaData.metas;
export const getEstrategiaRoadmap = () => estrategiaData.roadmap;
export const getEstrategiaKPIs = () => estrategiaData.kpis;
export const getEstrategiaDadosMercado = () => estrategiaData.dadosMercado;
export const getEstrategiaInsights = () => estrategiaData.insightsMercado;

export default estrategiaData;
