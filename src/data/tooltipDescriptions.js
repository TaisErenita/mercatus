// Descrições detalhadas de todas as funcionalidades da plataforma AIAAS Nutrimental

export const tooltipDescriptions = {
  // Cards Principais
  marketShare: {
    titulo: "Market Share",
    descricao: "Participação de mercado consolidada da Nutrimental baseada em dados MTRIX e ScanTech. Atualizado mensalmente com análise comparativa vs concorrentes principais."
  },
  vendasTotais: {
    titulo: "Vendas Totais",
    descricao: "Volume total de unidades vendidas no período selecionado. Integra dados de sell-out físico (MTRIX) e e-commerce (Amazon) para visão 360° das vendas."
  },
  receita: {
    titulo: "Receita Total",
    descricao: "Faturamento total consolidado em reais. Calculado a partir do volume de vendas multiplicado pelo preço médio ponderado por canal e categoria."
  },
  iaPreditiva: {
    titulo: "IA Preditiva",
    descricao: "Precisão do modelo preditivo de machine learning (R²). Valor de 0.980 indica 98% de acurácia nas previsões de vendas, market share e tendências futuras."
  },

  // Filtros Temporais
  filtroTemporal: {
    titulo: "Filtros Temporais",
    descricao: "Selecione o período de análise para visualizar dados históricos e identificar tendências sazonais. Dados atualizados até Dezembro 2024."
  },

  // ScanTech Intelligence Center
  scantech: {
    titulo: "ScanTech Intelligence Center",
    descricao: "Central de inteligência competitiva baseada em dados ScanTech. Monitora market share, posicionamento, premium pricing e lançamentos de produtos em tempo real."
  },
  shareCategoria: {
    titulo: "Share por Categoria",
    descricao: "Participação de mercado da Nutrimental por tipo de barrinha (Cereais, Frutas, Nuts, Proteína). Identifica forças e oportunidades no portfólio."
  },

  // Market Share por Estado
  mapaBrasil: {
    titulo: "Market Share por Estado",
    descricao: "Visualização geográfica interativa da distribuição de market share nos 27 estados brasileiros. Dados MTRIX 2025 2º Semestre com faturamento e volume por região."
  },
  estadoInterativo: {
    titulo: "Estado Interativo",
    descricao: "Clique para ver detalhes completos: market share, faturamento, volume de vendas, densidade de mercado e comparação com média nacional."
  },
  rankingEstados: {
    titulo: "Ranking de Estados",
    descricao: "Top 10 estados por market share. São Paulo lidera com 24.52%, seguido por Paraná (15.35%) e Minas Gerais (11.52%). Identifica mercados prioritários."
  },

  // Análise Amazon
  analiseAmazon: {
    titulo: "Análise Amazon E-commerce",
    descricao: "Inteligência de vendas online baseada em 20.3K transações Amazon (Nov/2022 - Set/2025). Identifica sazonalidade digital, tendências de crescimento e correlação multi-canal."
  },
  sazonalidadeDigital: {
    titulo: "Sazonalidade Digital",
    descricao: "Padrões de vendas mensais no e-commerce. Período de ouro: Abril-Agosto (25-35% acima da média). Essencial para planejamento de estoque e campanhas digitais."
  },
  crescimentoAmazon: {
    titulo: "Crescimento E-commerce",
    descricao: "Taxa de crescimento anual das vendas Amazon. 2025 projeta +11.8% de crescimento sustentável, indicando forte aceitação digital do portfólio Nutrimental."
  },

  // Insights de Mercado
  insightsMercado: {
    titulo: "Insights de Mercado",
    descricao: "Alertas estratégicos e tendências extraídos do relatório RADAR SCANNTECH Set/2025. Identifica oportunidades, riscos e movimentos competitivos em tempo real."
  },
  alertasEstrategicos: {
    titulo: "Alertas Estratégicos",
    descricao: "Avisos proativos sobre mudanças de mercado, impactos climáticos, comportamento do consumidor e movimentos competitivos que requerem ação imediata."
  },
  tendenciasMercado: {
    titulo: "Tendências de Mercado",
    descricao: "Performance por categoria com insights acionáveis. Barras proteicas crescem +7%, trade up em indulgências, elasticidade favorável para aumentos de preço."
  },

  // Insights Não Estruturados
  insightsNaoEstruturados: {
    titulo: "Insights Não Estruturados",
    descricao: "26 insights estratégicos extraídos por IA de documentos qualitativos: briefings, brandbooks, relatórios de preços, pesquisas QBox. Diferencial competitivo único."
  },
  posicionamentoCompetitivo: {
    titulo: "Posicionamento Competitivo",
    descricao: "Análise produto vs concorrente por categoria. Identifica vantagens (ex: proteína superior em Nuts) e desvantagens (ex: preço alto em Cereais) para ação estratégica."
  },
  estrategiaPrecos: {
    titulo: "Estratégia de Preços",
    descricao: "Recomendações de pricing por categoria: Premium em proteínas, Competitivo em básicos, Intermediário em tradicionais. Baseado em análise PricePoint Set/25."
  },

  // Modelo Preditivo Aprimorado
  modeloPreditivo: {
    titulo: "Modelo Preditivo Aprimorado",
    descricao: "Engine de machine learning com R² 0.980 (98% de precisão). Integra 6 fontes de dados para previsões de vendas, market share e tendências com confiança excepcional."
  },
  evolucaoR2: {
    titulo: "Evolução do R²",
    descricao: "Jornada de aprimoramento: 0.788 → 0.980 (+24.4%). Cada fonte de dados (Amazon, Regional, MTRIX, Marketing) contribuiu para aumentar a precisão preditiva."
  },
  contribuicaoDados: {
    titulo: "Contribuição por Fonte",
    descricao: "Impacto de cada fonte no R²: Amazon (+15-25%), Base Regional (+8-14%), MTRIX Histórico (+10-18%), Marketing (+5-12%), Pesquisa (+3-8%)."
  },

  // Dashboard Executivo
  dashboardExecutivo: {
    titulo: "Dashboard Executivo",
    descricao: "Visão consolidada C-level com KPIs principais, top 3 recomendações prioritárias e roadmap estratégico. Impacto potencial: R$ 18.1M identificados."
  },
  top3Recomendacoes: {
    titulo: "Top 3 Recomendações",
    descricao: "Ações estratégicas priorizadas por score de impacto vs esforço: 1) Otimizar Preços (+R$ 8.2M), 2) Fortalecer SP (+R$ 5.8M), 3) Crescimento Digital (+R$ 4.1M)."
  },

  // Dashboard de Recomendações IA
  recomendacoesIA: {
    titulo: "Recomendações IA",
    descricao: "12 recomendações estratégicas geradas automaticamente pela engine de IA. Priorizadas por score, com ROI calculado, prazo de implementação e nível de confiança."
  },
  scoreRecomendacao: {
    titulo: "Score de Recomendação",
    descricao: "Pontuação 0-100 baseada em impacto potencial vs esforço de implementação. Score 90+ = Prioridade Crítica, 70-89 = Alta, 50-69 = Média, <50 = Baixa."
  },
  roiRecomendacao: {
    titulo: "ROI Estimado",
    descricao: "Retorno sobre investimento projetado para cada recomendação. Calculado com base em dados históricos, benchmarking de mercado e precisão do modelo (R² 0.980)."
  },

  // Estratégia e Inovação
  estrategiaInovacao: {
    titulo: "Estratégia e Inovação",
    descricao: "Central de oportunidades de inovação, cenários futuros e movimentos competitivos. Identifica tendências emergentes e recomenda ações estratégicas de curto e longo prazo."
  },
  oportunidadesInovacao: {
    titulo: "Oportunidades de Inovação",
    descricao: "Iniciativas de novos produtos, canais e tecnologia com potencial de receita, investimento necessário e prazo de implementação. Ex: Plant-Based Premium (R$ 15M potencial)."
  },
  cenariosFuturos: {
    titulo: "Cenários Futuros",
    descricao: "Projeções 2025-2027 em 3 cenários: Otimista (+45%, 35% prob), Realista (+25%, 50% prob), Conservador (+8%, 15% prob). Auxilia planejamento estratégico robusto."
  },
  movimentosCompetitivos: {
    titulo: "Movimentos Competitivos",
    descricao: "Monitoramento de ações dos concorrentes (Trio, Kobber, Integral) com análise de impacto e recomendações de resposta estratégica com prazo definido."
  },

  // Simulador de Elasticidade
  simuladorElasticidade: {
    titulo: "Simulador de Elasticidade",
    descricao: "Ferramenta de simulação 'what-if' que modela impacto de mudanças de preço no volume de vendas, receita e market share. Considera elasticidade preço-demanda real do mercado."
  },
  elasticidadePreco: {
    titulo: "Elasticidade Preço-Demanda",
    descricao: "Coeficiente que mede sensibilidade do volume às mudanças de preço. -1.2 (atual) = 10% aumento preço → 12% queda volume. Essencial para estratégia de pricing."
  },

  // Validação de Dados
  validacaoGeografica: {
    titulo: "Validação Geográfica",
    descricao: "Sistema automático de verificação de qualidade dos dados por estado. Identifica inconsistências, outliers e gaps de informação para garantir confiabilidade das análises."
  },
  indicadorQualidade: {
    titulo: "Indicador de Qualidade",
    descricao: "Score 0-100 da qualidade dos dados: Excelente (90+), Boa (70-89), Aceitável (50-69), Atenção (<50). Baseado em 15+ verificações automáticas de consistência."
  }
};

// Função helper para obter descrição
export const getTooltip = (key) => {
  return tooltipDescriptions[key] || { 
    titulo: "Funcionalidade", 
    descricao: "Descrição não disponível" 
  };
};

