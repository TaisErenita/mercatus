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
      // Dados de Distribuição Numérica (DN) por região - Fonte: Scanntech
      distribuicaoNumerica: {
        'SE atc': { dn: 0.32, giro: 830.16, vendas: 28018113.87 },  // Sudeste Atacado - MAIOR RECEITA
        'NE atc': { dn: 0.26, giro: 853.46, vendas: 13068795.34 },  // Nordeste Atacado
        'CO atc': { dn: 0.24, giro: 1036.25, vendas: 7900463.91 },  // Centro-Oeste Atacado
        'NO atc': { dn: 0.22, giro: 955.90, vendas: 2737450.74 },   // Norte Atacado
        'SUL atc': { dn: 0.19, giro: 729.50, vendas: 7508538.81 },  // Sul Atacado - BAIXA DN!
        'SUL 10+': { dn: 0.20, giro: 417.16, vendas: 9020237.48 },
        'SE 10+': { dn: 0.19, giro: 304.99, vendas: 18865184.41 },
        'CO 10+': { dn: 0.12, giro: 294.77, vendas: 1609672.54 },   // BAIXA DN!
        'NE 10+': { dn: 0.15, giro: 216.14, vendas: 3090381.35 },
        'SUL 5a9': { dn: 0.10, giro: 141.95, vendas: 2493634.28 },  // BAIXA DN!
        'SE 5a9': { dn: 0.13, giro: 160.98, vendas: 8099512.17 }
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
    const dadosMarketShare = this.dadosEstruturados.marketShare;
    const dadosDN = this.dadosEstruturados.distribuicaoNumerica;

    // === ESTRATÉGIA 1: DEFESA - Proteger Liderança no Sudeste ===
    // SE atc: DN 32%, R$ 28M - MAIOR RECEITA E MELHOR DISTRIBUIÇÃO
    const seAtc = dadosDN['SE atc'];
    if (seAtc && seAtc.dn > 0.30) {
      recomendacoes.push({
        id: 'defend-southeast-leadership',
        categoria: 'Distribuição',
        titulo: 'Defender Liderança no Sudeste (Atacado)',
        descricao: `DN de ${(seAtc.dn * 100).toFixed(0)}% - maior cobertura e R$ ${(seAtc.vendas / 1000000).toFixed(1)}M em vendas`,
        impacto: 'Muito Alto',
        esforco: 'Baixo',
        prazo: '1-3 meses',
        kpis: ['DN Sudeste', 'Market Share', 'Faturamento'],
        score: 94,
        acoes: [
          `Manter DN acima de 30% (atual: ${(seAtc.dn * 100).toFixed(0)}%)`,
          'Monitorar concorrentes ativamente (Banana Brasil, Ritter)',
          'Expandir em canais premium (+50 PDVs)',
          `Proteger R$ ${(seAtc.vendas / 1000000).toFixed(1)}M em receita`
        ]
      });
    }

    // === ESTRATÉGIA 2: EXPANSÃO - Aumentar DN no Sul (Atacado) ===
    // SUL atc: DN apenas 19% - GRANDE OPORTUNIDADE!
    const sulAtc = dadosDN['SUL atc'];
    if (sulAtc && sulAtc.dn < 0.25) {
      const potencialVendas = sulAtc.vendas * 1.5; // Potencial de crescimento 50%
      recomendacoes.push({
        id: 'expand-south-distribution',
        categoria: 'Distribuição',
        titulo: 'Expandir Distribuição no Sul (Atacado)',
        descricao: `DN de apenas ${(sulAtc.dn * 100).toFixed(0)}% - grande oportunidade de expansão`,
        impacto: 'Alto',
        esforco: 'Médio',
        prazo: '3-5 meses',
        kpis: ['DN Sul', 'Cobertura PDVs', 'Volume'],
        score: 91,
        acoes: [
          `Aumentar DN de ${(sulAtc.dn * 100).toFixed(0)}% para 28% (+9 p.p.)`,
          'Expandir cobertura em PR, SC e RS (+120 PDVs)',
          'Parcerias com redes regionais (Angeloni, Giassi)',
          `Potencial: R$ ${(potencialVendas / 1000000).toFixed(1)}M (+50%)`
        ]
      });
    }

    // === ESTRATÉGIA 3: EXPANSÃO - Fortalecer Nordeste ===
    // NE atc: DN 26%, R$ 13.1M - BOA DN, mas pode crescer
    const neAtc = dadosDN['NE atc'];
    if (neAtc && neAtc.dn > 0.20) {
      const potencialVendas = neAtc.vendas * 1.25;
      recomendacoes.push({
        id: 'expand-northeast-coverage',
        categoria: 'Distribuição',
        titulo: 'Fortalecer Presença no Nordeste',
        descricao: `DN de ${(neAtc.dn * 100).toFixed(0)}% e R$ ${(neAtc.vendas / 1000000).toFixed(1)}M - consolidar posição`,
        impacto: 'Alto',
        esforco: 'Médio',
        prazo: '3-6 meses',
        kpis: ['DN Nordeste', 'Market Share', 'Volume'],
        score: 88,
        acoes: [
          `Aumentar DN de ${(neAtc.dn * 100).toFixed(0)}% para 32% (+6 p.p.)`,
          'Expandir em BA, PE, CE (+80 PDVs)',
          'Campanhas regionalizadas para público nordestino',
          `Potencial: R$ ${(potencialVendas / 1000000).toFixed(1)}M (+25%)`
        ]
      });
    }

    // === ESTRATÉGIA 4: EXPANSÃO - Penetrar em Centro-Oeste (Lojas 10+) ===
    // CO 10+: DN apenas 12% - BAIXA COBERTURA!
    const co10 = dadosDN['CO 10+'];
    if (co10 && co10.dn < 0.15) {
      const potencialVendas = co10.vendas * 2.0; // Potencial de dobrar
      recomendacoes.push({
        id: 'expand-midwest-large-stores',
        categoria: 'Distribuição',
        titulo: 'Penetrar em Centro-Oeste (Lojas 10+ checkouts)',
        descricao: `DN de apenas ${(co10.dn * 100).toFixed(0)}% - oportunidade em lojas grandes`,
        impacto: 'Médio',
        esforco: 'Médio',
        prazo: '4-6 meses',
        kpis: ['DN Centro-Oeste', 'Cobertura Lojas 10+', 'Volume'],
        score: 85,
        acoes: [
          `Aumentar DN de ${(co10.dn * 100).toFixed(0)}% para 25% (+13 p.p.)`,
          'Foco em GO, DF, MT (+40 lojas grandes)',
          'Parcerias com redes como Extra, Carrefour',
          `Potencial: R$ ${(potencialVendas / 1000000).toFixed(1)}M (+100%)`
        ]
      });
    }

    // === ESTRATÉGIA 5: EXPANSÃO - Aumentar DN em Lojas Pequenas (5-9 checkouts) ===
    // SUL 5a9, SE 5a9: DN 10-13% - BAIXA COBERTURA EM LOJAS PEQUENAS!
    const sul5a9 = dadosDN['SUL 5a9'];
    const se5a9 = dadosDN['SE 5a9'];
    if (sul5a9 && se5a9 && (sul5a9.dn < 0.15 || se5a9.dn < 0.15)) {
      const potencialTotal = (sul5a9.vendas + se5a9.vendas) * 1.8;
      recomendacoes.push({
        id: 'expand-small-stores-coverage',
        categoria: 'Distribuição',
        titulo: 'Expandir em Lojas Pequenas (5-9 checkouts)',
        descricao: `DN de ${(sul5a9.dn * 100).toFixed(0)}-${(se5a9.dn * 100).toFixed(0)}% - penetrar em varejo de vizinhança`,
        impacto: 'Médio',
        esforco: 'Alto',
        prazo: '6-9 meses',
        kpis: ['DN Lojas 5-9', 'Cobertura Nacional', 'Volume'],
        score: 82,
        acoes: [
          'Aumentar DN em lojas pequenas para 22% (+10 p.p.)',
          'Programa de incentivo para distribuidores regionais',
          'Foco em bairros residenciais (+200 PDVs)',
          `Potencial: R$ ${(potencialTotal / 1000000).toFixed(1)}M (+80%)`
        ]
      });
    }

    // ========================================
    // RECOMENDAÇÕES DE EXPANSÃO GEOGRÁFICA (POR ESTADO)
    // ========================================

    // === ESTRATÉGIA 1: DEFENDER - São Paulo (Líder) ===
    // SP: 24.52% market share - ESTADO LÍDER
    if (dadosMarketShare['São Paulo'] > 20) {
      recomendacoes.push({
        id: 'defend-sao-paulo-state',
        categoria: 'Expansão Geográfica',
        titulo: 'Defender Liderança em São Paulo',
        descricao: `SP representa ${dadosMarketShare['São Paulo'].toFixed(1)}% do market share - proteger posição dominante`,
        impacto: 'Muito Alto',
        esforco: 'Baixo',
        prazo: '1-3 meses',
        kpis: ['Market Share SP', 'Volume SP', 'Faturamento SP'],
        score: 93,
        acoes: [
          `Manter liderança de ${dadosMarketShare['São Paulo'].toFixed(1)}% em SP`,
          'Investir em marketing regional (+20% budget SP)',
          'Expandir em canais premium (Zona Sul, Jardins)',
          'Monitorar concorrentes: Banana Brasil, Ritter, Quaker'
        ]
      });
    }

    // === ESTRATÉGIA 2: ATACAR - Paraná (2º maior) ===
    // PR: 15.35% market share - OPORTUNIDADE DE CRESCIMENTO
    if (dadosMarketShare['Paraná'] > 10) {
      const potencialShare = dadosMarketShare['Paraná'] * 1.2; // Crescer 20%
      recomendacoes.push({
        id: 'attack-parana-state',
        categoria: 'Expansão Geográfica',
        titulo: 'Acelerar Crescimento no Paraná',
        descricao: `PR é o 2º maior mercado (${dadosMarketShare['Paraná'].toFixed(1)}%) - expandir agressivamente`,
        impacto: 'Alto',
        esforco: 'Médio',
        prazo: '2-4 meses',
        kpis: ['Market Share PR', 'Volume PR', 'Penetração PR'],
        score: 90,
        acoes: [
          `Crescer de ${dadosMarketShare['Paraná'].toFixed(1)}% para ${potencialShare.toFixed(1)}% (+20%)`,
          'Foco em Curitiba, Londrina, Maringá',
          'Parcerias com redes regionais (Condor, Festval)',
          'Campanhas para público fitness e saudável'
        ]
      });
    }

    // === ESTRATÉGIA 3: ATACAR - Cluster MG + RJ ===
    // MG (11.52%) + RJ (11.25%) = 22.77% - CLUSTER ESTRATÉGICO
    const mgShare = dadosMarketShare['Minas Gerais'] || 0;
    const rjShare = dadosMarketShare['Rio de Janeiro'] || 0;
    if (mgShare > 10 || rjShare > 10) {
      const totalShare = mgShare + rjShare;
      const potencialTotal = totalShare * 1.15; // Crescer 15%
      recomendacoes.push({
        id: 'attack-mg-rj-cluster',
        categoria: 'Expansão Geográfica',
        titulo: 'Expandir em Minas Gerais e Rio de Janeiro',
        descricao: `MG (${mgShare.toFixed(1)}%) + RJ (${rjShare.toFixed(1)}%) = ${totalShare.toFixed(1)}% - cluster Sudeste`,
        impacto: 'Alto',
        esforco: 'Médio',
        prazo: '3-5 meses',
        kpis: ['Market Share MG+RJ', 'Volume', 'Cobertura'],
        score: 87,
        acoes: [
          `Crescer de ${totalShare.toFixed(1)}% para ${potencialTotal.toFixed(1)}% (+15%)`,
          'MG: Foco em BH, Uberlândia, Juiz de Fora',
          'RJ: Foco em Rio Capital, Niterói, região dos Lagos',
          'Aproveitar logística compartilhada SP-MG-RJ'
        ]
      });
    }

    // === ESTRATÉGIA 4: ATACAR - Santa Catarina ===
    // SC: 6.57% market share - OPORTUNIDADE NO SUL
    if (dadosMarketShare['Santa Catarina'] > 5) {
      const potencialShare = dadosMarketShare['Santa Catarina'] * 1.3; // Crescer 30%
      recomendacoes.push({
        id: 'attack-santa-catarina-state',
        categoria: 'Expansão Geográfica',
        titulo: 'Intensificar Presença em Santa Catarina',
        descricao: `SC representa ${dadosMarketShare['Santa Catarina'].toFixed(1)}% - crescimento no Sul`,
        impacto: 'Médio',
        esforco: 'Médio',
        prazo: '4-6 meses',
        kpis: ['Market Share SC', 'Volume SC', 'Penetração SC'],
        score: 84,
        acoes: [
          `Crescer de ${dadosMarketShare['Santa Catarina'].toFixed(1)}% para ${potencialShare.toFixed(1)}% (+30%)`,
          'Foco em Florianópolis, Joinville, Blumenau',
          'Parcerias com Angeloni, Giassi, Bistek',
          'Aproveitar perfil saudável do público catarinense'
        ]
      });
    }

    // === ESTRATÉGIA 5: PENETRAR - Estados com baixo share ===
    // Estados < 5% - NORDESTE, CENTRO-OESTE, NORTE
    const estadosBaixoShare = Object.entries(dadosMarketShare)
      .filter(([estado, share]) => share < 5)
      .map(([estado]) => estado);

    if (estadosBaixoShare.length > 0) {
      recomendacoes.push({
        id: 'penetrate-low-share-states',
        categoria: 'Expansão Geográfica',
        titulo: 'Penetrar em Estados de Baixo Market Share',
        descricao: `${estadosBaixoShare.length} estados com share < 5% - oportunidade de penetração`,
        impacto: 'Médio',
        esforco: 'Alto',
        prazo: '6-12 meses',
        kpis: ['Market Share', 'Volume', 'Penetração'],
        score: 79,
        acoes: [
          'Nordeste: Foco em BA, PE, CE (mercados grandes)',
          'Centro-Oeste: Foco em GO, DF (crescimento econômico)',
          'Norte: Foco em AM, PA (capitais)',
          'Estratégia: Distribuidores locais + marketing digital'
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
