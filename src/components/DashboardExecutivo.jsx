import React, { useState } from 'react';

const DashboardExecutivo = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mensal');

  const kpisExecutivos = {
    marketShare: { valor: '50.16%', variacao: '+2.3%', status: 'crescimento' },
    receita: { valor: 'R$ 119.5M', variacao: '+18.7%', status: 'crescimento' },
    vendas: { valor: '351.804', variacao: '+12.4%', status: 'crescimento' },
    r2Modelo: { valor: '0.980', variacao: '+24.4%', status: 'crescimento' }
  };

  const recomendacoesPrioritarias = [
    {
      id: 1,
      titulo: 'Otimizar Estratégia de Preços',
      impacto: 'R$ 8.2M',
      prazo: '1-2 meses',
      probabilidade: '95%',
      status: 'critica'
    },
    {
      id: 2,
      titulo: 'Fortalecer Liderança em São Paulo',
      impacto: 'R$ 5.8M',
      prazo: '1-3 meses',
      probabilidade: '92%',
      status: 'alta'
    },
    {
      id: 3,
      titulo: 'Acelerar Crescimento Digital',
      impacto: 'R$ 4.1M',
      prazo: '2-4 meses',
      probabilidade: '88%',
      status: 'alta'
    }
  ];

  const alertasExecutivos = [
    {
      tipo: 'oportunidade',
      titulo: 'Elasticidade Favorável',
      descricao: 'Mercado aceita aumentos de preço - oportunidade de +R$ 8M',
      acao: 'Implementar aumentos seletivos'
    },
    {
      tipo: 'competitivo',
      titulo: 'Movimento Banana Brasil',
      descricao: 'Principal concorrente lançou linha proteica',
      acao: 'Resposta estratégica necessária'
    },
    {
      tipo: 'sazonal',
      titulo: 'Pico Digital Abril-Agosto',
      descricao: 'E-commerce 35% acima da média no período',
      acao: 'Intensificar investimentos digitais'
    }
  ];

  const roadmapEstrategico = [
    { mes: 'Nov 2025', acao: 'Otimização de Preços', impacto: 'R$ 2.1M', status: 'planejado' },
    { mes: 'Dez 2025', acao: 'Expansão SP Premium', impacto: 'R$ 1.8M', status: 'planejado' },
    { mes: 'Jan 2026', acao: 'Lançamento D2C', impacto: 'R$ 1.2M', status: 'planejado' },
    { mes: 'Fev 2026', acao: 'Campanha Fitness', impacto: 'R$ 0.9M', status: 'planejado' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'crescimento': return 'text-green-600';
      case 'estavel': return 'text-blue-600';
      case 'atencao': return 'text-yellow-600';
      case 'critico': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPrioridadeColor = (status) => {
    switch(status) {
      case 'critica': return 'border-l-red-500 bg-red-50';
      case 'alta': return 'border-l-orange-500 bg-orange-50';
      case 'media': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getAlertaIcon = (tipo) => {
    switch(tipo) {
      case 'oportunidade': return '🚀';
      case 'competitivo': return '⚔️';
      case 'sazonal': return '📅';
      case 'risco': return '⚠️';
      default: return '📊';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">👔 Dashboard Executivo</h3>
        <div className="flex items-center space-x-2">
          <select 
            value={periodoSelecionado}
            onChange={(e) => setPeriodoSelecionado(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            <option value="mensal">Mensal</option>
            <option value="trimestral">Trimestral</option>
            <option value="anual">Anual</option>
          </select>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            C-Level View
          </span>
        </div>
      </div>

      {/* KPIs Executivos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <h4 className="text-sm font-medium text-blue-600 mb-2">Market Share</h4>
          <p className="text-3xl font-bold text-blue-800 mb-1">{kpisExecutivos.marketShare.valor}</p>
          <p className={`text-sm font-medium ${getStatusColor(kpisExecutivos.marketShare.status)}`}>
            {kpisExecutivos.marketShare.variacao} vs período anterior
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <h4 className="text-sm font-medium text-green-600 mb-2">Receita Total</h4>
          <p className="text-3xl font-bold text-green-800 mb-1">{kpisExecutivos.receita.valor}</p>
          <p className={`text-sm font-medium ${getStatusColor(kpisExecutivos.receita.status)}`}>
            {kpisExecutivos.receita.variacao} vs período anterior
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
          <h4 className="text-sm font-medium text-purple-600 mb-2">Volume Vendas</h4>
          <p className="text-3xl font-bold text-purple-800 mb-1">{kpisExecutivos.vendas.valor}</p>
          <p className={`text-sm font-medium ${getStatusColor(kpisExecutivos.vendas.status)}`}>
            {kpisExecutivos.vendas.variacao} vs período anterior
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
          <h4 className="text-sm font-medium text-orange-600 mb-2">Precisão IA</h4>
          <p className="text-3xl font-bold text-orange-800 mb-1">{kpisExecutivos.r2Modelo.valor}</p>
          <p className={`text-sm font-medium ${getStatusColor(kpisExecutivos.r2Modelo.status)}`}>
            {kpisExecutivos.r2Modelo.variacao} melhoria modelo
          </p>
        </div>
      </div>

      {/* Alertas Executivos */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">🚨 Alertas Estratégicos</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alertasExecutivos.map((alerta, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">{getAlertaIcon(alerta.tipo)}</span>
                <h5 className="font-semibold text-gray-800">{alerta.titulo}</h5>
              </div>
              <p className="text-sm text-gray-600 mb-2">{alerta.descricao}</p>
              <p className="text-sm font-medium text-blue-600">→ {alerta.acao}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendações Prioritárias */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">🎯 Top 3 Recomendações IA</h4>
        <div className="space-y-4">
          {recomendacoesPrioritarias.map((rec) => (
            <div key={rec.id} className={`border-l-4 p-4 rounded-r-lg ${getPrioridadeColor(rec.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-gray-800">{rec.titulo}</h5>
                <div className="flex items-center space-x-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                    {rec.impacto}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                    {rec.probabilidade}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Prazo:</strong> {rec.prazo} | <strong>Confiança IA:</strong> {rec.probabilidade}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap Estratégico */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">🗓️ Roadmap Estratégico</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-3">
            {roadmapEstrategico.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded font-medium text-sm">
                    {item.mes}
                  </span>
                  <span className="font-medium text-gray-800">{item.acao}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 font-semibold">{item.impacto}</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resumo Executivo */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <h4 className="text-lg font-semibold mb-4">📋 Resumo Executivo</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold mb-2">🎯 Oportunidades Imediatas</h5>
            <ul className="space-y-1 text-sm">
              <li>• Otimização de preços: +R$ 8.2M potencial</li>
              <li>• Expansão premium SP: +R$ 5.8M potencial</li>
              <li>• Crescimento digital: +11.8% YoY</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">⚡ Ações Críticas</h5>
            <ul className="space-y-1 text-sm">
              <li>• Implementar aumentos de preço (1-2 meses)</li>
              <li>• Responder à Banana Brasil (imediato)</li>
              <li>• Intensificar marketing fitness (2-4 meses)</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm">
            <strong>Impacto Total Estimado:</strong> +R$ 18.1M (próximos 6 meses) | 
            <strong> Confiança IA:</strong> 98% (R² 0.980) | 
            <strong> ROI Médio:</strong> 3.2x
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardExecutivo;
