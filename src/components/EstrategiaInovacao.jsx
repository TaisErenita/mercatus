import React, { useState } from 'react';

const EstrategiaInovacao = () => {
  const [selectedCategory, setSelectedCategory] = useState('inovacao');

  // Dados reais do último ano móvel
  const receitaAtual = 173.0; // R$ 173.0M (Ano Móvel - BARRAS)
  const shareAtual = 32.2; // 32.2% (Scanntech YTD Brasil)
  const mercadoTotal = 314.1; // R$ 314.1M (Ano Móvel Out/24-Set/25 Scanntech)
  const crescimentoMercado = 5.3; // 5.3% (Ago/25 vs Ago/24)

  const oportunidadesInovacao = [
    {
      categoria: 'Novos Produtos',
      titulo: 'Barra Plant-Based Premium',
      descricao: 'Linha de barras 100% vegetal com proteínas alternativas',
      potencial: 'R$ 15M receita anual',
      investimento: 'R$ 2.5M',
      prazo: '8 meses',
      mercado: 'Crescimento 45% a.a.',
      status: 'Conceito',
      prioridade: 'Alta'
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
      prioridade: 'Alta'
    },
    {
      categoria: 'Tecnologia',
      titulo: 'IA para Personalização',
      descricao: 'Recomendações personalizadas baseadas em perfil nutricional',
      potencial: '+30% conversão',
      investimento: 'R$ 800k',
      prazo: '4 meses',
      mercado: 'Benchmark: +25% engagement',
      status: 'Prototipagem',
      prioridade: 'Média'
    }
  ];

  const cenariosFuturos = [
    {
      cenario: 'Otimista',
      probabilidade: '35%',
      crescimento: '+45%',
      fatores: ['Expansão plant-based', 'Sucesso D2C', 'Parcerias estratégicas'],
      receita: 'R$ 173M',
      share: '58%',
      cor: 'green'
    },
    {
      cenario: 'Realista',
      probabilidade: '50%',
      crescimento: '+25%',
      fatores: ['Crescimento orgânico', 'Melhoria operacional', 'Expansão gradual'],
      receita: 'R$ 149M',
      share: '52%',
      cor: 'blue'
    },
    {
      cenario: 'Conservador',
      probabilidade: '15%',
      crescimento: '+8%',
      fatores: ['Pressão competitiva', 'Desaceleração econômica', 'Custos elevados'],
      receita: 'R$ 129M',
      share: '48%',
      cor: 'orange'
    }
  ];

  const movimentosCompetitivos = [
    {
      competidor: 'Trio',
      movimento: 'Lançamento linha funcional',
      impacto: 'Médio',
      resposta: 'Acelerar inovação plant-based',
      prazo: '60 dias'
    },
    {
      competidor: 'Kobber',
      movimento: 'Expansão premium',
      impacto: 'Alto',
      resposta: 'Reforçar posicionamento premium',
      prazo: '30 dias'
    },
    {
      competidor: 'Integral Médica',
      movimento: 'Foco proteína whey',
      impacto: 'Baixo',
      resposta: 'Monitorar e diferenciar',
      prazo: '90 dias'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Conceito': return 'bg-purple-100 text-purple-800';
      case 'Planejamento': return 'bg-blue-100 text-blue-800';
      case 'Prototipagem': return 'bg-yellow-100 text-yellow-800';
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

  return (
    <div className="space-y-6">
      {/* Header */}
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
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Receita Atual (Último Ano Móvel)</p>
              <p className="text-2xl font-bold text-blue-600">R$ {receitaAtual.toFixed(1)}M</p>
              <p className="text-xs text-gray-500">Apenas BARRAS 🍫 📊</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Market Share</p>
              <p className="text-2xl font-bold text-green-600">{shareAtual.toFixed(1)}%</p>
              <p className="text-xs text-gray-500">vs Mercado Total</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Mercado Total</p>
              <p className="text-2xl font-bold text-purple-600">R$ {mercadoTotal.toFixed(1)}M</p>
              <p className="text-xs text-gray-500">Scanntech Ago/25</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Crescimento Mercado</p>
              <p className="text-2xl font-bold text-orange-600">{crescimentoMercado.toFixed(1)}%</p>
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
            <div key={idx} className="rounded-lg border bg-white shadow-sm">
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
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${getStatusColor(oportunidade.status)}`}>
                      {oportunidade.status}
                    </span>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Ver Detalhes →
                    </button>
                  </div>
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
            <h4 className="font-semibold text-slate-900 mb-3">💡 Recomendações Estratégicas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-slate-800 mb-2">Curto Prazo (6 meses):</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Acelerar desenvolvimento plant-based</li>
                  <li>• Implementar plataforma D2C</li>
                  <li>• Fortalecer posicionamento premium</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-slate-800 mb-2">Longo Prazo (18 meses):</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Expandir internacionalmente</li>
                  <li>• Desenvolver ecossistema nutricional</li>
                  <li>• Parcerias estratégicas tech</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCategory === 'competitivo' && (
        <div className="space-y-6">
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Movimentos Competitivos Recentes</h4>
              <div className="space-y-4">
                {movimentosCompetitivos.map((movimento, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-lg border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-medium text-slate-900">{movimento.competidor}</h5>
                        <p className="text-sm text-slate-600">{movimento.movimento}</p>
                      </div>
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                        movimento.impacto === 'Alto' ? 'bg-red-100 text-red-800' :
                        movimento.impacto === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {movimento.impacto}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs font-medium text-slate-600">Resposta Recomendada:</span>
                        <p className="text-xs text-slate-900 mt-1">{movimento.resposta}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-slate-600">Prazo de Ação:</span>
                        <p className="text-xs text-blue-600 mt-1">{movimento.prazo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-gradient-to-r from-red-50 to-orange-50 p-6">
            <h4 className="font-semibold text-slate-900 mb-3">🎯 Ações Prioritárias</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <h5 className="font-medium text-red-800 mb-2">🚨 Urgente (30 dias)</h5>
                <p className="text-sm text-slate-600">Reforçar posicionamento premium contra Kobber</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <h5 className="font-medium text-yellow-800 mb-2">⚠️ Importante (60 dias)</h5>
                <p className="text-sm text-slate-600">Acelerar inovação funcional vs Trio</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <h5 className="font-medium text-green-800 mb-2">📊 Monitorar (90 dias)</h5>
                <p className="text-sm text-slate-600">Acompanhar movimento proteína Integral</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstrategiaInovacao;
