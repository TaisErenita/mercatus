import React, { useState, useEffect } from 'react';
import EngineRecomendacoesIA from '../utils/engineRecomendacoes';

const DashboardRecomendacoes = () => {
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [engine] = useState(new EngineRecomendacoesIA());

  useEffect(() => {
    const recs = engine.gerarRecomendacoes();
    const alerts = engine.gerarAlertas();
    setRecomendacoes(recs);
    setAlertas(alerts);
  }, [engine]);

  const categorias = ['todas', 'Expansão Geográfica', 'Consolidação', 'Digital', 'Distribuição', 'Posicionamento', 'Pricing', 'Marketing', 'Inteligência Competitiva', 'Sazonalidade'];

  const recomendacoesFiltradas = filtroCategoria === 'todas' 
    ? recomendacoes 
    : recomendacoes.filter(rec => rec.categoria === filtroCategoria);

  const getImpactoColor = (impacto) => {
    switch(impacto) {
      case 'Muito Alto': return 'bg-red-100 text-red-800';
      case 'Alto': return 'bg-orange-100 text-orange-800';
      case 'Médio': return 'bg-yellow-100 text-yellow-800';
      case 'Baixo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEsforcoColor = (esforco) => {
    switch(esforco) {
      case 'Alto': return 'bg-red-100 text-red-800';
      case 'Médio': return 'bg-yellow-100 text-yellow-800';
      case 'Baixo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getAlertaIcon = (tipo) => {
    switch(tipo) {
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'success': return '✅';
      default: return '📊';
    }
  };

  const marcarComoImplementada = (id) => {
    setRecomendacoes(prev => 
      prev.map(rec => 
        rec.id === id 
          ? { ...rec, status: 'Implementada', dataImplementacao: new Date().toISOString().split('T')[0] }
          : rec
      )
    );
  };

  const estatisticas = {
    total: recomendacoes.length,
    pendentes: recomendacoes.filter(r => r.status === 'Pendente').length,
    implementadas: recomendacoes.filter(r => r.status === 'Implementada').length,
    scoreMedia: recomendacoes.length > 0 ? Math.round(recomendacoes.reduce((acc, r) => acc + r.score, 0) / recomendacoes.length) : 0
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">🤖 Engine de Recomendações IA</h3>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            R² 0.980
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            IA Ativa
          </span>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-600">Total Recomendações</h4>
          <p className="text-2xl font-bold text-blue-800">{estatisticas.total}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-yellow-600">Pendentes</h4>
          <p className="text-2xl font-bold text-yellow-800">{estatisticas.pendentes}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-600">Implementadas</h4>
          <p className="text-2xl font-bold text-green-800">{estatisticas.implementadas}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-purple-600">Score Médio</h4>
          <p className="text-2xl font-bold text-purple-800">{estatisticas.scoreMedia}</p>
        </div>
      </div>

      {/* Alertas */}
      {alertas.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">🚨 Alertas Inteligentes</h4>
          <div className="space-y-3">
            {alertas.map((alerta, index) => (
              <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{getAlertaIcon(alerta.tipo)}</span>
                  <h5 className="font-semibold text-gray-800">{alerta.titulo}</h5>
                </div>
                <p className="text-sm text-gray-600 mb-2">{alerta.descricao}</p>
                <p className="text-sm font-medium text-yellow-700">💡 {alerta.acao}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">📊 Recomendações Estratégicas</h4>
        <div className="flex flex-wrap gap-2">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setFiltroCategoria(categoria)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filtroCategoria === categoria
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {categoria === 'todas' ? 'Todas' : categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Recomendações */}
      <div className="space-y-4">
        {recomendacoesFiltradas.map((recomendacao) => (
          <div key={recomendacao.id} className="bg-gray-50 rounded-lg p-6 border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    #{recomendacao.prioridade}
                  </span>
                  <h5 className="text-lg font-semibold text-gray-800">{recomendacao.titulo}</h5>
                  <span className={`text-2xl font-bold ${getScoreColor(recomendacao.score)}`}>
                    {recomendacao.score}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{recomendacao.descricao}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                    {recomendacao.categoria}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactoColor(recomendacao.impacto)}`}>
                    Impacto: {recomendacao.impacto}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getEsforcoColor(recomendacao.esforco)}`}>
                    Esforço: {recomendacao.esforco}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                    {recomendacao.prazo}
                  </span>
                </div>
              </div>
              
              <div className="ml-4">
                {recomendacao.status === 'Pendente' ? (
                  <button
                    onClick={() => marcarComoImplementada(recomendacao.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Marcar como Implementada
                  </button>
                ) : (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                    ✅ Implementada
                  </span>
                )}
              </div>
            </div>

            {/* Ações Detalhadas */}
            <div className="mb-4">
              <h6 className="font-medium text-gray-800 mb-2">🎯 Ações Recomendadas:</h6>
              <ul className="space-y-1">
                {recomendacao.acoes.map((acao, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {acao}
                  </li>
                ))}
              </ul>
            </div>

            {/* KPIs */}
            <div className="flex items-center justify-between">
              <div>
                <h6 className="font-medium text-gray-800 mb-1">📈 KPIs de Acompanhamento:</h6>
                <div className="flex flex-wrap gap-1">
                  {recomendacao.kpis.map((kpi, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                      {kpi}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">ROI Estimado</p>
                <p className="text-lg font-bold text-green-600">
                  {engine.calcularROI(recomendacao).toFixed(1)}x
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo de Impacto */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">🚀 Impacto Potencial Total</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-blue-700 font-medium">• Crescimento de Receita: +15-25%</p>
            <p className="text-green-700 font-medium">• Melhoria de Margem: +3-5pp</p>
          </div>
          <div>
            <p className="text-purple-700 font-medium">• Expansão Market Share: +2-4pp</p>
            <p className="text-orange-700 font-medium">• ROI Médio Esperado: 3.2x</p>
          </div>
          <div>
            <p className="text-red-700 font-medium">• Tempo de Implementação: 2-6 meses</p>
            <p className="text-gray-700 font-medium">• Confiança IA: 98% (R² 0.980)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRecomendacoes;
