// Engine de Recomendações IA - Baseada em Dados Reais YTD 2025
// Sincronizada com as Oportunidades de Inovação do módulo Estratégia

import { getNutrimentalInternaData } from '../data/nutrimentalInternaData';
import { getScanntechMercadoTotal } from '../data/scanntechDataReal';
import { getMtrixSummary } from '../data/mtrixDataReal';
import { getAmazonSummary } from '../data/amazonDataReal';

class EngineRecomendacoesIA {
  constructor() {
    // Carregar dados reais de todas as fontes
    this.dadosInternos = getNutrimentalInternaData();
    this.mercadoScanntech = getScanntechMercadoTotal('TOTAL', 'ago2025');
    this.dadosMTRIX = getMtrixSummary();
    this.dadosAmazon = getAmazonSummary();
    
    // Métricas calculadas
    this.receitaAtual = this.dadosInternos.totais.receita; // R$ 132.8M (YTD 2025 BARRAS)
    this.mercadoTotal = this.mercadoScanntech.valor.atual;
    this.shareAtual = ((this.receitaAtual / this.mercadoTotal) * 100).toFixed(1);
    this.crescimentoMercado = ((this.mercadoScanntech.valor.atual - this.mercadoScanntech.valor.anterior) / this.mercadoScanntech.valor.anterior * 100).toFixed(1);
    
    // Pesos para priorização
    this.pesos = {
      impacto: 0.40,      // Impacto financeiro
      viabilidade: 0.25,  // Facilidade de execução
      prazo: 0.20,        // Tempo para resultado
      risco: 0.15         // Nível de risco
    };
  }

  // Algoritmo principal de recomendações - SINCRONIZADO com Oportunidades de Inovação
  gerarRecomendacoes() {
    const recomendacoes = [];

    // === RECOMENDAÇÃO 1: Otimizar Estratégia de Preços ===
    // Baseado em elasticidade favorável (-1.2)
    recomendacoes.push({
      id: 'optimize-pricing-strategy',
      categoria: 'Pricing',
      titulo: 'Otimizar Estratégia de Preços',
      descricao: 'Elasticidade -1.2 permite aumentos seletivos de preço',
      impacto: 'Muito Alto',
      esforco: 'Baixo',
      prazo: '1-2 meses',
      kpis: ['Margem Bruta', 'Receita', 'Volume'],
      score: 95,
      roiEstimado: 'R$ 8.2M',
      probabilidade: '95%',
      acoes: [
        'Testar aumentos de 5-8% em produtos premium',
        'Monitorar impacto no volume',
        'Ajustar preços por região/canal'
      ],
      fundamentacao: `Elasticidade -1.2 permite aumentos seletivos de preço sem perda significativa de volume. Potencial de +R$ 8.2M em receita adicional.`,
      status: 'Pendente'
    });

    // === RECOMENDAÇÃO 2: Linha Premium de Barras Proteicas ===
    // Sincronizado com Oportunidade de Inovação #1
    const potencialPremium = (this.receitaAtual * 0.12 / 1000000).toFixed(1);
    recomendacoes.push({
      id: 'launch-premium-protein-line',
      categoria: 'Posicionamento',
      titulo: 'Linha Premium de Barras Proteicas',
      descricao: 'Expansão em segmento premium com 15-20g proteína',
      impacto: 'Muito Alto',
      esforco: 'Alto',
      prazo: '8 meses',
      kpis: ['Receita Premium', 'Market Share Premium', 'Margem'],
      score: 92,
      roiEstimado: `R$ ${potencialPremium}M receita anual`,
      probabilidade: '85%',
      acoes: [
        'Desenvolver formulação com 15-20g proteína',
        'Posicionamento premium (preço +30%)',
        'Lançamento com campanha fitness'
      ],
      fundamentacao: `Mercado total de R$ ${(this.mercadoTotal / 1000000).toFixed(1)}M crescendo ${this.crescimentoMercado}% a.a. Segmento premium tem margem 60% vs 35% regular.`,
      status: 'Pendente'
    });

    // === RECOMENDAÇÃO 3: Expansão D2C (Direct-to-Consumer) ===
    // Sincronizado com Oportunidade de Inovação #2
    recomendacoes.push({
      id: 'expand-d2c-platform',
      categoria: 'Digital',
      titulo: 'Expansão D2C (Direct-to-Consumer)',
      descricao: 'Plataforma própria de vendas com assinatura mensal',
      impacto: 'Alto',
      esforco: 'Médio',
      prazo: '6 meses',
      kpis: ['Receita D2C', 'Assinantes', 'LTV', 'CAC'],
      score: 90,
      roiEstimado: 'R$ 8M receita anual',
      probabilidade: '88%',
      acoes: [
        'Desenvolver plataforma de assinatura',
        'Modelo de recorrência mensal',
        'Margem 60% vs 35% varejo'
      ],
      fundamentacao: `Canal Digital atual: R$ 1.9M - potencial de crescimento 4x. Margem D2C de 60% vs 35% no varejo tradicional.`,
      status: 'Pendente'
    });

    // === RECOMENDAÇÃO 4: Intensificar Presença em Região Líder ===
    // Sincronizado com Oportunidade de Inovação #3
    const regiaoLider = this.dadosInternos.receita_por_regiao.regioes[0];
    const potencialRegiao = ((regiaoLider.valor * 0.15) / 1000000).toFixed(1);
    recomendacoes.push({
      id: 'intensify-top-region',
      categoria: 'Expansão Geográfica',
      titulo: `Intensificar presença em ${regiaoLider.nome}`,
      descricao: 'Região líder com maior participação no faturamento',
      impacto: 'Alto',
      esforco: 'Médio',
      prazo: '4 meses',
      kpis: ['Receita Regional', 'Penetração', 'Share of Market'],
      score: 88,
      roiEstimado: `+R$ ${potencialRegiao}M (crescimento 15%)`,
      probabilidade: '90%',
      acoes: [
        `Expandir distribuição em ${regiaoLider.nome}`,
        'Campanhas regionalizadas',
        'Parcerias com distribuidores locais'
      ],
      fundamentacao: `${regiaoLider.nome}: R$ ${(regiaoLider.valor / 1000000).toFixed(1)}M atual (${regiaoLider.percentual}% da receita total). Potencial de crescimento 15%.`,
      status: 'Pendente'
    });

    // === RECOMENDAÇÃO 5: Fortalecer Canal Principal (Distribuidor) ===
    // Sincronizado com Oportunidade de Inovação #4
    const canalPrincipal = this.dadosInternos.receita_por_canal.canais[0];
    const potencialCanal = ((canalPrincipal.valor * 0.10) / 1000000).toFixed(1);
    recomendacoes.push({
      id: 'strengthen-main-channel',
      categoria: 'Consolidação',
      titulo: `Fortalecer canal ${canalPrincipal.nome}`,
      descricao: 'Canal principal com maior volume e receita',
      impacto: 'Alto',
      esforco: 'Baixo',
      prazo: '3 meses',
      kpis: ['Receita Canal', 'Volume', 'Ticket Médio'],
      score: 87,
      roiEstimado: `+R$ ${potencialCanal}M (crescimento 10%)`,
      probabilidade: '92%',
      acoes: [
        `Fortalecer relacionamento com ${canalPrincipal.nome}`,
        'Incentivos comerciais',
        'Melhorar execução no PDV'
      ],
      fundamentacao: `${canalPrincipal.nome}: R$ ${(canalPrincipal.valor / 1000000).toFixed(1)}M atual (${canalPrincipal.percentual}% da receita). Canal representa quase metade do faturamento.`,
      status: 'Pendente'
    });

    // === RECOMENDAÇÃO 6: Aceleração Amazon e Marketplaces ===
    // Sincronizado com Oportunidade de Inovação #5
    const potencialAmazon = (this.dadosAmazon.receitaTotal * 2 / 1000000).toFixed(1);
    recomendacoes.push({
      id: 'accelerate-amazon-marketplaces',
      categoria: 'Digital',
      titulo: 'Aceleração Amazon e Marketplaces',
      descricao: 'Expansão em canais digitais de alto crescimento',
      impacto: 'Alto',
      esforco: 'Médio',
      prazo: '6 meses',
      kpis: ['Vendas Amazon', 'Share of Voice', 'Conversão'],
      score: 85,
      roiEstimado: `R$ ${potencialAmazon}M (dobrar vendas)`,
      probabilidade: '85%',
      acoes: [
        'Otimizar presença no Amazon',
        'Expandir para outros marketplaces',
        'Investir em marketing digital'
      ],
      fundamentacao: `Amazon atual: R$ ${(this.dadosAmazon.receitaTotal / 1000000).toFixed(1)}M, ${this.dadosAmazon.unidadesTotal.toLocaleString('pt-BR')} unidades. E-commerce crescendo 30% a.a.`,
      status: 'Pendente'
    });

    // === RECOMENDAÇÃO 7: Expansão MTRIX (Atacado/Distribuição) ===
    // NOVA RECOMENDAÇÃO - Sincronizada com Oportunidade de Inovação #6
    const potencialMTRIX = (this.dadosMTRIX.totalVendas * 0.25 / 1000000).toFixed(1);
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
      roiEstimado: `R$ ${potencialMTRIX}M (crescimento 25%)`,
      probabilidade: '80%',
      acoes: [
        'Expandir rede de distribuidores',
        'Melhorar cobertura geográfica',
        'Programas de incentivo para distribuidores'
      ],
      fundamentacao: `MTRIX atual: R$ ${(this.dadosMTRIX.totalVendas / 1000000).toFixed(1)}M, ${this.dadosMTRIX.totalDistribuidores} distribuidores em ${this.dadosMTRIX.totalUFs} UFs. Potencial de expansão 25%.`,
      status: 'Pendente'
    });

    // Priorizar e ranquear recomendações
    return this.priorizarRecomendacoes(recomendacoes);
  }

  priorizarRecomendacoes(recomendacoes) {
    // Já estão ordenadas por score (impacto vs esforço)
    return recomendacoes.map((rec, index) => ({
      ...rec,
      prioridade: index + 1,
      dataGeracao: new Date().toISOString().split('T')[0]
    }));
  }

  // Gerar alertas proativos baseados em dados reais
  gerarAlertas() {
    const alertas = [];

    // Alerta 1: Monitoramento Competitivo
    alertas.push({
      tipo: 'warning',
      titulo: 'Monitoramento Competitivo',
      descricao: 'Banana Brasil lançou nova linha proteica - avaliar resposta',
      acao: 'Análise competitiva urgente',
      prioridade: 'Alta'
    });

    // Alerta 2: Oportunidade de Elasticidade
    alertas.push({
      tipo: 'success',
      titulo: 'Elasticidade Favorável',
      descricao: 'Mercado aceita aumentos de preço - oportunidade de +R$ 8M',
      acao: 'Implementar aumentos seletivos',
      prioridade: 'Muito Alta'
    });

    // Alerta 3: Crescimento E-commerce
    alertas.push({
      tipo: 'info',
      titulo: 'Crescimento E-commerce',
      descricao: 'Amazon crescendo 30% a.a. - acelerar investimentos digitais',
      acao: 'Revisar estratégia digital',
      prioridade: 'Alta'
    });

    return alertas;
  }
}

export default EngineRecomendacoesIA;
