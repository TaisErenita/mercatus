// Descrições dos tooltips para todas as funcionalidades do dashboard

export const tooltipDescriptions = {
  // KPIs Principais
  marketShare: "Participação de mercado da Nutrimental no segmento de barrinhas. Indica nossa posição competitiva e liderança no setor.",
  
  totalSales: "Volume total de unidades vendidas no período selecionado. Métrica fundamental para avaliar performance comercial.",
  
  revenue: "Faturamento total gerado pelas vendas. Calculado multiplicando volume vendido pelo preço médio de venda.",
  
  iaPreditiva: "Coeficiente de determinação (R²) do modelo preditivo. Quanto mais próximo de 1, maior a precisão das previsões de vendas.",
  
  // Filtros Temporais
  ultimoMes: "Visualizar dados apenas do último mês completo (Dezembro 2024). Ideal para análise de curto prazo.",
  
  ultimos3M: "Dados consolidados dos últimos 3 meses (Out-Dez/24). Útil para identificar tendências trimestrais.",
  
  ultimos6M: "Período de 6 meses (Jul-Dez/24). Equilibra visão de médio prazo com detalhamento suficiente.",
  
  ultimoAno: "Dados anuais completos de 2024. Essencial para análises estratégicas e comparações anuais.",
  
  anoAnterior: "Dados de 2023 para comparação year-over-year. Permite avaliar crescimento e evolução.",
  
  // Market Share
  posicao: "Ranking da Nutrimental no mercado de barrinhas. #1 indica liderança consolidada no segmento.",
  
  premiumPreco: "Diferença percentual entre nosso preço médio e a média do mercado. Indica posicionamento premium.",
  
  lancamentos: "Número de novos produtos lançados no período. Métrica de inovação e renovação de portfólio.",
  
  // Categorias
  cereais: "Market share em barrinhas de cereais. Nosso segmento mais forte com 52.3% de participação.",
  
  frutas: "Participação em barrinhas de frutas. Segundo melhor desempenho com 34.8%.",
  
  nuts: "Share em barrinhas de nuts/castanhas. Segmento com 28.9% e leve declínio.",
  
  proteina: "Market share em barrinhas proteicas. Área de atenção com 15.6% e queda de 3.2%.",
  
  // Análise Amazon
  receitaAmazon: "Faturamento total no canal e-commerce Amazon. Análise de 20.318 transações (Nov/22 - Set/25).",
  
  unidadesAmazon: "Volume de unidades vendidas via Amazon. Complementa dados de sell-out físico.",
  
  crescimentoAmazon: "Taxa de crescimento ano sobre ano no canal Amazon. Indica evolução do e-commerce.",
  
  impactoR2: "Contribuição dos dados Amazon para melhoria do modelo preditivo. Aumenta precisão em +0.20.",
  
  sazonalidadeAmazon: "Índices mensais de sazonalidade no e-commerce. 1.0 = média anual, >1.0 = acima da média.",
  
  // Modelo Preditivo
  r2Anterior: "Precisão do modelo preditivo antes da integração de novas fontes de dados.",
  
  r2Novo: "Precisão atual do modelo após integração de 5 fontes de dados e 40 variáveis.",
  
  melhoria: "Percentual de melhoria na precisão do modelo. +24.4% representa avanço significativo.",
  
  fontesIntegradas: "Número de fontes de dados diferentes alimentando o modelo (Amazon, Regional, Marketing, etc).",
  
  variaveis: "Quantidade de variáveis consideradas pelo modelo para fazer previsões precisas.",
  
  precisao: "Percentual de acurácia do modelo. 98% significa que 98 em cada 100 previsões estão corretas.",
  
  // Insights de Mercado
  crescimentoPremium: "Barras proteicas crescem 7% ao ano. Oportunidade para expansão em segmento premium.",
  
  sazonalidadeClimatica: "Setembro 5% abaixo da média devido ao calor. Importante para ajustar previsões sazonais.",
  
  elasticidadePrecos: "Mercado aceita aumentos de até 7.3% sem perda significativa de volume. Oportunidade de pricing.",
  
  // Insights Não Estruturados
  posicionamentoCompetitivo: "Análise de preço e posicionamento vs principais concorrentes em cada categoria.",
  
  estrategiaPrecos: "Recomendações de pricing baseadas em posição competitiva e elasticidade de demanda.",
  
  inteligenciaCompetitiva: "Movimentos dos concorrentes detectados por IA: lançamentos, mudanças de preço, campanhas.",
  
  publicoComunicacao: "Insights sobre público-alvo e estratégias de comunicação mais efetivas.",
  
  // Movimentos Competitivos
  trio: "Trio lançou mini barra 18g com crescimento de 15% nas vendas. Requer monitoramento.",
  
  kobber: "Kobber adotou posicionamento premium com aumento de 8% no preço médio. Atenção necessária.",
  
  integralmédica: "Integralmédica pressiona segmento de proteínas causando queda de 3.2% no nosso share. Situação crítica.",
  
  // Simulador
  investimento: "Valor total a ser investido em ações estratégicas (marketing, expansão, inovação).",
  
  aumentoPreco: "Percentual de aumento de preço a simular. Considerar elasticidade de 7.3% aceita pelo mercado.",
  
  marketingInvestment: "Investimento específico em marketing e comunicação para impulsionar vendas.",
  
  expansao: "Número de novos estados/regiões para expansão geográfica da distribuição.",
  
  // Estratégia
  recomendacoesIA: "Ações recomendadas pela engine de IA baseadas em análise de dados e tendências.",
  
  inovacoes: "Oportunidades de inovação identificadas: Mini Barras, Ingredientes Amazônicos, Plant-Based.",
  
  roi: "Retorno sobre investimento esperado. ROI de 180% significa R$ 1.80 de retorno para cada R$ 1.00 investido.",
  
  payback: "Tempo necessário para recuperar o investimento inicial. 4-6 meses é considerado excelente.",
  
  // Mapa Brasil
  estadosSP: "São Paulo: 24.52% do market share nacional. Líder absoluto em volume e receita.",
  
  estadosPR: "Paraná: 15.35% do market share. Segundo maior mercado com forte presença.",
  
  estadosMG: "Minas Gerais: 11.52% do share. Terceiro mercado mais importante.",
  
  estadosRJ: "Rio de Janeiro: 11.25% do share. Quarto maior mercado com potencial de crescimento.",
  
  estadosSC: "Santa Catarina: 6.57% do share. Quinto mercado em importância.",
  
  // Dashboard Executivo
  dashboardExecutivo: "Visão consolidada de todas as métricas principais para tomada de decisão estratégica.",
  
  alertasEstrategicos: "Alertas automáticos gerados por IA sobre oportunidades, riscos e ações necessárias.",
  
  // Geral
  atualizacao: "Data da última atualização dos dados. Informações sempre atualizadas em tempo real.",
  
  monitoramento24x7: "Sistema monitora dados continuamente, 24 horas por dia, 7 dias por semana.",
};

export default tooltipDescriptions;
