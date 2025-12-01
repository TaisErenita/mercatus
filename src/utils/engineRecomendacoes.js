// Engine de Recomendações IA - AIAAS Nutrimental
// Analisa dados estruturados + não estruturados para gerar recomendações estratégicas

class EngineRecomendacoesIA {
  constructor() {
    this.dadosEstruturados = this.carregarDadosEstruturados();
    this.dadosNaoEstruturados = this.carregarDadosNaoEstruturados();
    this.pesos = {
      marketShare: 0.25,
      crescimento: 0.20,
      competitividade: 0.20,
      sazonalidade: 0.15,
      elasticidade: 0.10,
      insights: 0.10
    };
  }

  carregarDadosEstruturados() {
    return {
      marketShare: {
        'São Paulo': 24.52,
        'Paraná': 15.35,
        'Minas Gerais': 11.52,
        'Rio de Janeiro': 11.25,
        'Santa Catarina': 6.57
      },
      crescimentoAmazon: 11.8,
      sazonalidadeAmazon: {
        'abril': 1.35,
        'maio': 1.25,
        'junho': 1.15,
        'setembro': 0.75
      },
      elasticidadePreco: -1.2,
      r2Modelo: 0.980
    };
  }

  carregarDadosNaoEstruturados() {
    return {
      posicionamentoCompetitivo: {
        'Crispy Protein': { status: 'premium', diferencial: '+10%' },
        'Tube Protein': { status: 'premium', diferencial: '+10%' },
        'Nutry Cereais': { status: 'premium', diferencial: '+20%' },
        'Aveia Nutry': { status: 'competitivo', diferencial: '-10%' }
      },
      concorrentesPrincipais: ['Banana Brasil', 'Ritter', 'Quaker', 'Nestlé'],
      publicoAlvo: ['fitness', 'pos-treino', 'health-conscious'],
      estrategiaPrecos: 'premium-proteinas'
    };
  }

  // Algoritmo principal de recomendações
  gerarRecomendacoes() {
    const recomendacoes = [];

    // 1. Análise de Market Share
    recomendacoes.push(...this.analisarMarketShare());

    // 2. Análise de Crescimento e Sazonalidade
    recomendacoes.push(...this.analisarCrescimento());

    // 3. Análise Competitiva
    recomendacoes.push(...this.analisarCompetitividade());

    // 4. Análise de Preços e Elasticidade
    recomendacoes.push(...this.analisarPrecos());

    // 5. Análise de Insights Não Estruturados
    recomendacoes.push(...this.analisarInsights());

    // 6. Análise de Distribuição (MTRIX)
    recomendacoes.push(...this.analisarDistribuicao());

    // Priorizar e ranquear recomendações
    return this.priorizarRecomendacoes(recomendacoes);
  }

  analisarMarketShare() {
    const recomendacoes = [];
    const dados = this.dadosEstruturados.marketShare;

    // Oportunidade em estados com baixo market share
    const estadosBaixoShare = Object.entries(dados)
      .filter(([estado, share]) => share < 5)
      .map(([estado]) => estado);

    if (estadosBaixoShare.length > 0) {
      recomendacoes.push({
        id: 'expand-low-share-states',
        categoria: 'Expansão Geográfica',
        titulo: 'Expandir em Estados de Baixo Market Share',
        descricao: `Oportunidade de crescimento em ${estadosBaixoShare.length} estados com share < 5%`,
        impacto: 'Alto',
        esforco: 'Médio',
        prazo: '3-6 meses',
        kpis: ['Market Share', 'Volume de Vendas', 'Penetração'],
        score: 85,
        acoes: [
          'Intensificar distribuição nos estados identificados',
          'Campanhas de marketing regionalizadas',
          'Parcerias com distribuidores locais'
        ]
      });
    }

    // Fortalecer liderança em SP
    if (dados['São Paulo'] > 20) {
      recomendacoes.push({
        id: 'strengthen-sp-leadership',
        categoria: 'Consolidação',
        titulo: 'Fortalecer Liderança em São Paulo',
        descricao: 'SP representa 24.52% do market share - oportunidade de consolidação',
        impacto: 'Muito Alto',
        esforco: 'Baixo',
        prazo: '1-3 meses',
        kpis: ['Market Share SP', 'Volume SP', 'Faturamento SP'],
        score: 92,
        acoes: [
          'Aumentar investimento em marketing em SP',
          'Expandir pontos de venda premium',
          'Lançar produtos exclusivos para SP'
        ]
      });
    }

    return recomendacoes;
  }

  analisarCrescimento() {
    const recomendacoes = [];
    const crescimento = this.dadosEstruturados.crescimentoAmazon;
    const sazonalidade = this.dadosEstruturados.sazonalidadeAmazon;

    // Aproveitar crescimento digital
    if (crescimento > 10) {
      recomendacoes.push({
        id: 'boost-digital-growth',
        categoria: 'Digital',
        titulo: 'Acelerar Crescimento Digital',
        descricao: `E-commerce crescendo ${crescimento}% - intensificar investimentos`,
        impacto: 'Alto',
        esforco: 'Médio',
        prazo: '2-4 meses',
        kpis: ['Vendas Online', 'Conversão Digital', 'CAC'],
        score: 88,
        acoes: [
          'Aumentar investimento em marketing digital',
          'Otimizar presença no Amazon',
          'Desenvolver D2C próprio'
        ]
      });
    }

    // Aproveitar sazonalidade
    const melhorMes = Object.entries(sazonalidade)
      .sort(([,a], [,b]) => b - a)[0];

    recomendacoes.push({
      id: 'leverage-seasonality',
      categoria: 'Sazonalidade',
      titulo: 'Aproveitar Pico Sazonal',
      descricao: `${melhorMes[0]} tem índice ${melhorMes[1]} - planejar campanhas`,
      impacto: 'Médio',
      esforco: 'Baixo',
      prazo: '1-2 meses',
      kpis: ['Vendas Sazonais', 'ROI Campanhas'],
      score: 75,
      acoes: [
        `Intensificar marketing em ${melhorMes[0]}`,
        'Ajustar estoque para picos sazonais',
        'Campanhas temáticas específicas'
      ]
    });

    return recomendacoes;
  }

  analisarCompetitividade() {
    const recomendacoes = [];
    const posicionamento = this.dadosNaoEstruturados.posicionamentoCompetitivo;
    const concorrentes = this.dadosNaoEstruturados.concorrentesPrincipais;

    // Produtos premium - manter diferenciação
    const produtosPremium = Object.entries(posicionamento)
      .filter(([produto, dados]) => dados.status === 'premium');

    if (produtosPremium.length > 0) {
      recomendacoes.push({
        id: 'strengthen-premium-positioning',
        categoria: 'Posicionamento',
        titulo: 'Fortalecer Posicionamento Premium',
        descricao: `${produtosPremium.length} produtos com posicionamento premium`,
        impacto: 'Alto',
        esforco: 'Médio',
        prazo: '2-6 meses',
        kpis: ['Price Premium', 'Brand Equity', 'Market Share Premium'],
        score: 90,
        acoes: [
          'Comunicar valor agregado dos produtos premium',
          'Investir em qualidade e inovação',
          'Parcerias com influenciadores fitness'
        ]
      });
    }

    // Monitorar Banana Brasil (principal concorrente)
    if (concorrentes.includes('Banana Brasil')) {
      recomendacoes.push({
        id: 'monitor-banana-brasil',
        categoria: 'Inteligência Competitiva',
        titulo: 'Monitorar Banana Brasil',
        descricao: 'Principal concorrente em múltiplas categorias - ação defensiva',
        impacto: 'Alto',
        esforco: 'Baixo',
        prazo: 'Contínuo',
        kpis: ['Share vs Banana Brasil', 'Price Gap', 'Innovation Gap'],
        score: 82,
        acoes: [
          'Monitoramento semanal de preços',
          'Análise de lançamentos concorrentes',
          'Resposta rápida a movimentos competitivos'
        ]
      });
    }

    return recomendacoes;
  }

  analisarPrecos() {
    const recomendacoes = [];
    const elasticidade = this.dadosEstruturados.elasticidadePreco;

    // Elasticidade favorável para aumento de preços
    if (elasticidade > -1.5) {
      recomendacoes.push({
        id: 'optimize-pricing',
        categoria: 'Pricing',
        titulo: 'Otimizar Estratégia de Preços',
        descricao: `Elasticidade ${elasticidade} permite aumentos seletivos de preço`,
        impacto: 'Muito Alto',
        esforco: 'Baixo',
        prazo: '1-2 meses',
        kpis: ['Margem Bruta', 'Volume', 'Receita'],
        score: 95,
        acoes: [
          'Testar aumentos de 5-8% em produtos premium',
          'Monitorar impacto no volume',
          'Ajustar preços por região/canal'
        ]
      });
    }

    return recomendacoes;
  }

  analisarInsights() {
    const recomendacoes = [];
    const publico = this.dadosNaoEstruturados.publicoAlvo;

    // Foco em público fitness
    if (publico.includes('fitness')) {
      recomendacoes.push({
        id: 'expand-fitness-marketing',
        categoria: 'Marketing',
        titulo: 'Expandir Marketing Fitness',
        descricao: 'Público fitness identificado como core - intensificar comunicação',
        impacto: 'Alto',
        esforco: 'Médio',
        prazo: '2-4 meses',
        kpis: ['Awareness Fitness', 'Conversão Fitness', 'Share of Voice'],
        score: 87,
        acoes: [
          'Parcerias com academias e personal trainers',
          'Conteúdo educativo sobre nutrição esportiva',
          'Patrocínio de eventos fitness'
        ]
      });
    }

    return recomendacoes;
  }

  analisarDistribuicao() {
    const recomendacoes = [];

    // Expansão MTRIX - Baseado em dados reais
    // MTRIX atual: R$ 10.7M (Set/2025), 10 distribuidores, 24 UFs
    recomendacoes.push({
      id: 'expand-mtrix-distribution',
      categoria: 'Distribuição',
      titulo: 'Expansão MTRIX (Atacado/Distribuição)',
      descricao: 'Ampliar presença em distribuidores regionais',
      impacto: 'Alto',
      esforco: 'Médio',
      prazo: '5 meses',
      kpis: ['Distribuidores Ativos', 'Cobertura UFs', 'Volume'],
      score: 83,
      acoes: [
        'Expandir rede de distribuidores (meta: 15 distribuidores)',
        'Melhorar cobertura geográfica (meta: 27 UFs)',
        'Programas de incentivo para distribuidores',
        'Potencial de crescimento 25% (R$ 13.3M)'
      ]
    });

    return recomendacoes;
  }

  priorizarRecomendacoes(recomendacoes) {
    // Ordenar por score (impacto vs esforço)
    return recomendacoes
      .sort((a, b) => b.score - a.score)
      .map((rec, index) => ({
        ...rec,
        prioridade: index + 1,
        status: 'Pendente',
        dataGeracao: new Date().toISOString().split('T')[0]
      }));
  }

  // Gerar alertas proativos
  gerarAlertas() {
    const alertas = [];

    // Alerta de sazonalidade
    const mesAtual = new Date().getMonth() + 1;
    if (mesAtual === 9) { // Setembro
      alertas.push({
        tipo: 'warning',
        titulo: 'Impacto Sazonal Setembro',
        descricao: 'Setembro historicamente 25% abaixo da média - ajustar expectativas',
        acao: 'Revisar metas mensais e intensificar marketing'
      });
    }

    // Alerta competitivo
    alertas.push({
      tipo: 'info',
      titulo: 'Monitoramento Competitivo',
      descricao: 'Banana Brasil lançou nova linha proteica - avaliar resposta',
      acao: 'Análise competitiva urgente'
    });

    return alertas;
  }

  // Calcular ROI potencial das recomendações
  calcularROI(recomendacao) {
    const baseROI = {
      'Expansão Geográfica': 2.5,
      'Consolidação': 3.2,
      'Digital': 4.1,
      'Posicionamento': 2.8,
      'Pricing': 5.5,
      'Marketing': 3.0
    };

    return baseROI[recomendacao.categoria] || 2.0;
  }
}

export default EngineRecomendacoesIA;
