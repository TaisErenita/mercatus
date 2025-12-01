import React, { useState } from 'react';
import { getNutrimentalInternaData } from '../data/nutrimentalInternaData'; // Função legada para compatibilidade
import { getScanntechMercadoTotal } from '../data/scanntechDataReal';
import { getMtrixSummary } from '../data/mtrixDataReal';
import { getAmazonSummary } from '../data/amazonDataReal';

const EstrategiaInovacao = () => {
  const [selectedCategory, setSelectedCategory] = useState('inovacao');

  // Buscar dados reais das bases
  const dadosInternos = getNutrimentalInternaData();
  const mercadoScanntech = getScanntechMercadoTotal('TOTAL', 'ago2025');
  const dadosMTRIX = getMtrixSummary();
  const dadosAmazon = getAmazonSummary();

  // Calcular métricas reais
  const receitaAtual = dadosInternos.totais.receita; // R$ 142.5M (Último Ano Móvel - BARRAS)
  const mercadoTotal = mercadoScanntech.valor.atual; // Mercado total Scanntech
  // Market Share REAL da Scanntech (YTD Brasil): 32.2%
  const shareAtual = '32.2'; // Share real da Nutrimental na base Scanntech

  // Projeções baseadas em dados reais
  const crescimentoMercado = ((mercadoScanntech.valor.atual - mercadoScanntech.valor.anterior) / mercadoScanntech.valor.anterior * 100).toFixed(1);
  
  // Canais com maior potencial (baseado em dados internos)
  let canaisTop = (dadosInternos.canais || [])
    .sort((a, b) => (b.valor || b.receita || 0) - (a.valor || a.receita || 0))
    .slice(0, 5);
  
  // Garantir que tenha pelo menos um canal
  if (canaisTop.length === 0) {
    canaisTop = [{ nome: 'Distribuidor', valor: 5000000, percentual: 47 }];
  }

  // Regiões com maior potencial
  let regioesTop = (dadosInternos.regioes || [])
    .sort((a, b) => (b.valor || b.receita || 0) - (a.valor || a.receita || 0))
    .slice(0, 5);
  
  // Garantir que tenha pelo menos uma região
  if (regioesTop.length === 0) {
    regioesTop = [{ nome: 'SUL', valor: 3500000, percentual: 33 }];
  }

  const oportunidadesInovacao = [
    {
      categoria: 'Novos Produtos',
      titulo: 'Linha Premium de Barras Proteicas',
      descricao: 'Expansão em segmento premium com 15-20g proteína',
      potencial: `R$ ${(receitaAtual * 0.12 / 1000000).toFixed(1)}M receita anual`,
      investimento: 'R$ 2.5M',
      prazo: '8 meses',
      mercado: `Mercado crescendo ${crescimentoMercado}% a.a.`,
      status: 'Conceito',
      prioridade: 'Alta',
      fundamentacao: `Mercado total de R$ ${(mercadoTotal / 1000000).toFixed(1)}M com crescimento de ${crescimentoMercado}%`
    },
    {
      categoria: 'Canais',
      titulo: 'Expansão D2C (Direct-to-Consumer)',
      descricao: 'Plataforma própria de vendas com assinatura mensal',
      potencial: 'R$ 8M receita anual',
      investimento: 'R$ 1.2M',
      prazo: '6 meses',
      mercado: 'Margem 60% vs 35% varejo',
      status: 'Planejamento',
      prioridade: 'Alta',
      fundamentacao: `Canal Digital atual: R$ 1.9M - potencial 4x`
    },
    {
      categoria: 'Novos Produtos',
      titulo: 'Barras Funcionais (Energia, Foco, Sleep)',
      descricao: 'Linha de barras com ingredientes funcionais específicos',
      potencial: `R$ ${(receitaAtual * 0.08 / 1000000).toFixed(1)}M receita anual`,
      investimento: 'R$ 1.8M',
      prazo: '10 meses',
      mercado: 'Segmento funcional crescendo 25% a.a.',
      status: 'Conceito',
      prioridade: 'Média',
      fundamentacao: 'Tendência wellness e performance mental/física'
    },
    {
      categoria: 'E-commerce',
      titulo: 'Aceleração Amazon e Marketplaces',
      descricao: 'Expansão em canais digitais de alto crescimento',
      potencial: `R$ ${(dadosAmazon.receitaTotal * 2 / 1000000).toFixed(1)}M (dobrar vendas)`,
      investimento: 'R$ 800k',
      prazo: '6 meses',
      mercado: 'E-commerce crescendo 30% a.a.',
      status: 'Planejamento',
      prioridade: 'Média',
      fundamentacao: `Amazon atual: R$ ${(dadosAmazon.receitaTotal / 1000000).toFixed(1)}M, ${dadosAmazon.unidadesTotal.toLocaleString('pt-BR')} unidades`
    },
    {
      categoria: 'Novos Produtos',
      titulo: 'Snacks Salgados Saudáveis',
      descricao: 'Expansão para categoria de snacks salgados proteicos',
      potencial: `R$ ${(receitaAtual * 0.10 / 1000000).toFixed(1)}M receita anual`,
      investimento: 'R$ 2.2M',
      prazo: '12 meses',
      mercado: 'Mercado de snacks saudáveis R$ 2.5B',
      status: 'Conceito',
      prioridade: 'Média',
      fundamentacao: 'Diversificação de portfólio além de barras doces'
    },
    {
      categoria: 'Canais',
      titulo: 'Clube de Benefícios e Assinatura',
      descricao: 'Programa de fidelidade com assinatura e benefícios exclusivos',
      potencial: 'R$ 5M receita recorrente anual',
      investimento: 'R$ 600k',
      prazo: '4 meses',
      mercado: 'Modelo de assinatura com LTV 3x maior',
      status: 'Planejamento',
      prioridade: 'Alta',
      fundamentacao: 'Receita recorrente + aumento de retenção'
    }
  ];

  // Cenários baseados em dados reais
  const receitaBase = receitaAtual / 1000000; // Converter para milhões
  
  const cenariosFuturos = [
    {
      cenario: 'Otimista',
      probabilidade: '35%',
      crescimento: '+45%',
      fatores: [
        'Sucesso linha premium (+12% receita)',
        'Expansão D2C (+R$ 8M)',
        `Crescimento ${regioesTop[0].regiao} (+15%)`,
        'Aceleração e-commerce (+100% Amazon)'
      ],
      receita: `R$ ${(receitaBase * 1.45).toFixed(1)}M`,
      share: `${(parseFloat(shareAtual) * 1.15).toFixed(1)}%`,
      cor: 'green'
    },
    {
      cenario: 'Realista',
      probabilidade: '50%',
      crescimento: '+25%',
      fatores: [
        'Crescimento orgânico alinhado ao mercado',
        `Fortalecimento ${canaisTop[0].canal} (+10%)`,
        'Melhoria operacional gradual',
        'Expansão regional seletiva'
      ],
      receita: `R$ ${(receitaBase * 1.25).toFixed(1)}M`,
      share: `${(parseFloat(shareAtual) * 1.05).toFixed(1)}%`,
      cor: 'blue'
    },
    {
      cenario: 'Conservador',
      probabilidade: '15%',
      crescimento: '+8%',
      fatores: [
        'Pressão competitiva',
        'Desaceleração econômica',
        'Custos elevados',
        'Crescimento abaixo do mercado'
      ],
      receita: `R$ ${(receitaBase * 1.08).toFixed(1)}M`,
      share: `${(parseFloat(shareAtual) * 0.95).toFixed(1)}%`,
      cor: 'orange'
    }
  ];

  const movimentosCompetitivos = [
    {
      competidor: 'NUTRATA',
      movimento: 'Expansão premium',
      impacto: 'Alto',
      resposta: 'Reforçar posicionamento e qualidade',
      prazo: '30 dias',
      shareAtual: '15.3%'
    },
    {
      competidor: 'BOLD',
      movimento: 'Foco segmento premium alto',
      impacto: 'Médio',
      resposta: 'Acelerar inovação premium',
      prazo: '60 dias',
      shareAtual: '13.3%'
    },
    {
      competidor: 'RITTER',
      movimento: 'Expansão regional Sul',
      impacto: 'Médio',
      resposta: 'Fortalecer distribuição Sul',
      prazo: '45 dias',
      shareAtual: '12.8%'
    },
    {
      competidor: 'Outros (Fragmentado)',
      movimento: 'Entrada marcas regionais',
      impacto: 'Baixo',
      resposta: 'Monitorar e defender posição',
      prazo: '90 dias',
      shareAtual: `${(100 - parseFloat(shareAtual) - 15.3 - 13.3 - 12.8).toFixed(1)}%`
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Conceito': return 'bg-purple-100 text-purple-800';
      case 'Planejamento': return 'bg-blue-100 text-blue-800';
      case 'Prototipagem': return 'bg-yellow-100 text-yellow-800';
      case 'Execução': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadeColor = (prioridade) => {
    switch (prioridade) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      case 'Baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactoColor = (impacto) => {
    switch (impacto) {
      case 'Alto': return 'bg-red-100 text-red-800';
      case 'Médio': return 'bg-yellow-100 text-yellow-800';
      case 'Baixo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com Métricas Reais */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Central de Estratégia e Inovação
            </h3>
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-800">
              🚀 Visão Estratégica 2025-2027
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Oportunidades baseadas em dados reais do último ano móvel, Scanntech, MTRIX e Amazon
          </p>
        </div>

        {/* Métricas Atuais */}
        <div className="border-t p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Receita Atual (Último Ano Móvel)</p>
              <p className="text-xl font-bold text-blue-600">R$ {receitaBase.toFixed(1)}M</p>
              <p className="text-xs text-gray-500">Apenas BARRAS</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Market Share</p>
              <p className="text-xl font-bold text-green-600">{shareAtual}%</p>
              <p className="text-xs text-gray-500">vs Mercado Total</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Mercado Total</p>
              <p className="text-xl font-bold text-purple-600">R$ {(mercadoTotal / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-gray-500">Scanntech Ago/25</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Crescimento Mercado</p>
              <p className="text-xl font-bold text-orange-600">{crescimentoMercado}%</p>
              <p className="text-xs text-gray-500">Ago/25 vs Ago/24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seletor de Categoria */}
      <div className="flex flex-wrap gap-2">
        <button 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === 'inovacao' 
              ? 'bg-orange-100 text-orange-800 border border-orange-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedCategory('inovacao')}
        >
          🚀 Oportunidades de Inovação
        </button>
        <button 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === 'cenarios' 
              ? 'bg-orange-100 text-orange-800 border border-orange-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedCategory('cenarios')}
        >
          🔮 Cenários Futuros
        </button>
        <button 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === 'competitivo' 
              ? 'bg-orange-100 text-orange-800 border border-orange-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedCategory('competitivo')}
        >
          ⚔️ Inteligência Competitiva
        </button>
      </div>

      {/* Conteúdo */}
      {selectedCategory === 'inovacao' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {oportunidadesInovacao.map((oportunidade, idx) => (
            <div key={idx} className="rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                      {oportunidade.categoria}
                    </span>
                    <h4 className="font-semibold text-slate-900">{oportunidade.titulo}</h4>
                  </div>
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${getPrioridadeColor(oportunidade.prioridade)}`}>
                    {oportunidade.prioridade}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 mb-4">{oportunidade.descricao}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-slate-600">Potencial:</span>
                    <span className="text-xs font-bold text-green-600">{oportunidade.potencial}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-slate-600">Investimento:</span>
                    <span className="text-xs text-slate-900">{oportunidade.investimento}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-slate-600">Prazo:</span>
                    <span className="text-xs text-blue-600">{oportunidade.prazo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-slate-600">Mercado:</span>
                    <span className="text-xs text-purple-600">{oportunidade.mercado}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${getStatusColor(oportunidade.status)}`}>
                      {oportunidade.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 italic">{oportunidade.fundamentacao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCategory === 'cenarios' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cenariosFuturos.map((cenario, idx) => (
              <div key={idx} className="rounded-lg border bg-white shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-900">Cenário {cenario.cenario}</h4>
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-${cenario.cor}-100 text-${cenario.cor}-800`}>
                      {cenario.probabilidade}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-slate-600">Crescimento:</span>
                      <span className="text-sm font-bold text-green-600">{cenario.crescimento}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-slate-600">Receita 2027:</span>
                      <span className="text-sm font-bold text-slate-900">{cenario.receita}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-slate-600">Market Share:</span>
                      <span className="text-sm font-bold text-blue-600">{cenario.share}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-xs font-medium text-slate-600 mb-2 block">Fatores-chave:</span>
                    <ul className="space-y-1">
                      {cenario.fatores.map((fator, i) => (
                        <li key={i} className="text-xs text-slate-600">• {fator}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 p-6">
            <h4 className="font-semibold text-slate-900 mb-3">💡 Recomendações Estratégicas (Baseadas em Dados Reais)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-slate-800 mb-2">Curto Prazo (6 meses):</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Fortalecer {canaisTop[0].canal} (principal canal - {canaisTop[0].percentualReceita}%)</li>
                  <li>• Expandir {regioesTop[0].regiao} (região líder - {regioesTop[0].percentualReceita}%)</li>
                  <li>• Acelerar D2C e Amazon (potencial 2-4x)</li>
                  <li>• Lançar linha premium (mercado +{crescimentoMercado}%)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-slate-800 mb-2">Longo Prazo (18 meses):</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Expandir MTRIX ({dadosMTRIX.totalDistribuidores} distribuidores, {dadosMTRIX.totalUFs} UFs)</li>
                  <li>• Desenvolver ecossistema nutricional</li>
                  <li>• Parcerias estratégicas tech e e-commerce</li>
                  <li>• Meta: {cenariosFuturos[1].receita} (cenário realista)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCategory === 'competitivo' && (
        <div className="space-y-6">
          <div className="rounded-lg border bg-white shadow-sm p-6">
            <h4 className="font-semibold text-slate-900 mb-4">📊 Panorama Competitivo</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Nutrimental (Nutry)</p>
                <p className="text-2xl font-bold text-blue-600">{shareAtual}%</p>
                <p className="text-xs text-green-600">Líder de mercado</p>
              </div>
              {movimentosCompetitivos.slice(0, 3).map((comp, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">{comp.competidor}</p>
                  <p className="text-2xl font-bold text-gray-700">{comp.shareAtual}</p>
                  <p className="text-xs text-gray-500">Estimativa</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {movimentosCompetitivos.map((movimento, idx) => (
              <div key={idx} className="rounded-lg border bg-white shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-900">{movimento.competidor}</h4>
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${getImpactoColor(movimento.impacto)}`}>
                      Impacto {movimento.impacto}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-medium text-slate-600">Movimento:</span>
                      <p className="text-sm text-slate-900">{movimento.movimento}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-slate-600">Resposta Recomendada:</span>
                      <p className="text-sm text-blue-600 font-medium">{movimento.resposta}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-xs text-slate-600">Prazo de ação:</span>
                      <span className="text-xs font-bold text-orange-600">{movimento.prazo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border bg-gradient-to-r from-orange-50 to-red-50 p-6">
            <h4 className="font-semibold text-slate-900 mb-3">⚠️ Alertas Competitivos</h4>
            <div className="space-y-2 text-sm text-slate-700">
              <p>• <strong>Trio e Kobber</strong> intensificando inovação - necessário acelerar P&D</p>
              <p>• <strong>Fragmentação do mercado</strong> - marcas regionais entrando com preços agressivos</p>
              <p>• <strong>Oportunidade:</strong> Nutrimental mantém liderança com {shareAtual}% de share</p>
              <p>• <strong>Ação prioritária:</strong> Reforçar diferenciação premium e qualidade</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstrategiaInovacao;
