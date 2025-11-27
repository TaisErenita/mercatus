import React, { useState } from 'react';
import { getScanntechMercadoTotal, getScanntechShareNutrimental } from '../data/scanntechDataReal';

const InsightsMercado = ({ selectedCategory, selectedPeriod }) => {
  const [segmentosExpandidos, setSegmentosExpandidos] = useState(true);
  const [insightSelecionado, setInsightSelecionado] = useState('tendencias');

  // Dados reais da Scanntech
  const mercadoTotal = getScanntechMercadoTotal(selectedCategory, selectedPeriod);
  const shareNutrimental = getScanntechShareNutrimental(selectedCategory, selectedPeriod);

  // Calcular variações do mercado total
  const variacaoValor = ((mercadoTotal.valor.atual - mercadoTotal.valor.anterior) / mercadoTotal.valor.anterior * 100).toFixed(1);
  const variacaoVolume = ((mercadoTotal.volume.atual - mercadoTotal.volume.anterior) / mercadoTotal.volume.anterior * 100).toFixed(1);
  const variacaoPreco = ((mercadoTotal.preco.atual - mercadoTotal.preco.anterior) / mercadoTotal.preco.anterior * 100).toFixed(1);

  const insights = {
    tendencias: {
      titulo: "🔥 Tendências de Mercado",
      dados: [
        {
          categoria: "Barra Proteica",
          variacao: "+7%",
          status: "crescimento",
          insight: "Segmento premium em alta, consumidores investem em benefícios específicos"
        },
        {
          categoria: "Energético", 
          variacao: "+2%",
          status: "crescimento",
          insight: "Crescimento sustentado mesmo em cenário de trade down"
        },
        {
          categoria: "Chocolate/Biscoito",
          variacao: "-15%",
          status: "queda",
          insight: "Impacto climático - categorias sensíveis ao calor em setembro"
        }
      ]
    },
    sazonalidade: {
      titulo: "🌡️ Impactos Climáticos",
      dados: [
        {
          mes: "Setembro 2025",
          temperatura: "Mais quente em 63 anos",
          impacto: "-3,6% vs 2024",
          oportunidade: "Posicionar barrinhas como alternativa refrescante"
        },
        {
          mes: "Abril 2025", 
          evento: "Páscoa",
          impacto: "+14,8% pico",
          estrategia: "Aproveitar sazonalidade para lançamentos"
        }
      ]
    },
    consumidor: {
      titulo: "🎯 Comportamento do Consumidor",
      dados: [
        {
          tendencia: "Trade Down",
          categoria: "Itens Básicos",
          impacto: "Economia em óleo, leite, sabão",
          percentual: "-4% a -8%"
        },
        {
          tendencia: "Trade Up",
          categoria: "Indulgências",
          impacto: "Investimento em produtos com propósito",
          percentual: "+2% a +7%"
        }
      ]
    }
  };

  const alertas = [
    {
      tipo: "oportunidade",
      titulo: "Crescimento Premium",
      descricao: "Barras proteicas crescem 7% - oportunidade para expansão",
      prioridade: "alta"
    },
    {
      tipo: "atencao",
      titulo: "Sazonalidade Climática", 
      descricao: "Setembro foi 5% abaixo da média - ajustar previsões",
      prioridade: "media"
    },
    {
      tipo: "estrategia",
      titulo: "Elasticidade de Preços",
      descricao: "Mercado aceita +7,3% em preços - revisar estratégia",
      prioridade: "alta"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'crescimento': return 'text-green-600 bg-green-100';
      case 'queda': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPrioridadeColor = (prioridade) => {
    switch(prioridade) {
      case 'alta': return 'border-l-red-500 bg-red-50';
      case 'media': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getTipoIcon = (tipo) => {
    switch(tipo) {
      case 'oportunidade': return '🚀';
      case 'atencao': return '⚠️';
      case 'estrategia': return '💡';
      default: return '📊';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `R$ ${(num / 1000000).toFixed(1)}M`;
    }
    return num.toLocaleString('pt-BR');
  };

  const getTrendIcon = (trend) => {
    if (trend.startsWith('+')) return '↑';
    if (trend.startsWith('-')) return '↓';
    return '→';
  };

  const getTrendColor = (trend) => {
    if (trend.startsWith('+')) return 'text-green-600';
    if (trend.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">📈 Insights de Mercado</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          RADAR SCANNTECH Ago/25
        </span>
      </div>

      {/* Mercado Total - Dados Reais Scanntech */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🏪</span>
          <div>
            <h4 className="text-lg font-bold text-gray-800">Mercado Total de Barras</h4>
            <p className="text-sm text-gray-600">Visão consolidada do mercado - Ago/25 vs Ago/24</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-gray-600 mb-1">Valor Total</p>
            <p className="text-2xl font-bold text-blue-600">{formatNumber(mercadoTotal.valor.atual)}</p>
            <p className={`text-sm font-medium ${parseFloat(variacaoValor) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(variacaoValor) >= 0 ? '↑' : '↓'} {Math.abs(variacaoValor)}% vs Ago/24
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-gray-600 mb-1">Volume Total</p>
            <p className="text-2xl font-bold text-indigo-600">{formatNumber(mercadoTotal.volume.atual)}</p>
            <p className={`text-sm font-medium ${parseFloat(variacaoVolume) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(variacaoVolume) >= 0 ? '↑' : '↓'} {Math.abs(variacaoVolume)}% vs Ago/24
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-gray-600 mb-1">Preço Médio</p>
            <p className="text-2xl font-bold text-purple-600">R$ {mercadoTotal.preco.atual.toFixed(2)}</p>
            <p className={`text-sm font-medium ${parseFloat(variacaoPreco) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(variacaoPreco) >= 0 ? '↑' : '↓'} {Math.abs(variacaoPreco)}% vs Ago/24
            </p>
          </div>
        </div>


      </div>

      {/* Alertas Estratégicos */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">🚨 Alertas Estratégicos</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alertas.map((alerta, index) => (
            <div 
              key={index}
              className={`border-l-4 p-4 rounded-r-lg ${getPrioridadeColor(alerta.prioridade)}`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">{getTipoIcon(alerta.tipo)}</span>
                <h5 className="font-semibold text-gray-800">{alerta.titulo}</h5>
              </div>
              <p className="text-sm text-gray-600">{alerta.descricao}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navegação de Insights */}
      <div className="flex space-x-4 mb-6">
        {Object.keys(insights).map((key) => (
          <button
            key={key}
            onClick={() => setInsightSelecionado(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              insightSelecionado === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {insights[key].titulo}
          </button>
        ))}
      </div>

      {/* Conteúdo do Insight Selecionado */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          {insights[insightSelecionado].titulo}
        </h4>

        {insightSelecionado === 'tendencias' && (
          <div className="space-y-4">
            {insights.tendencias.dados.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-gray-800">{item.categoria}</h5>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                    {item.variacao}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.insight}</p>
              </div>
            ))}
          </div>
        )}

        {insightSelecionado === 'sazonalidade' && (
          <div className="space-y-4">
            {insights.sazonalidade.dados.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-800">{item.mes}</h5>
                    <p className="text-sm text-gray-600">{item.temperatura || item.evento}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">{item.impacto}</p>
                    <p className="text-sm text-gray-600">{item.oportunidade || item.estrategia}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {insightSelecionado === 'consumidor' && (
          <div className="space-y-4">
            {insights.consumidor.dados.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-semibold text-gray-800">{item.tendencia}</h5>
                    <p className="text-sm text-gray-500">{item.categoria}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.tendencia === 'Trade Up' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                  }`}>
                    {item.percentual}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.impacto}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resumo Executivo */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Resumo Executivo</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• <strong>Mercado:</strong> Crescimento de {variacaoValor}% em valor e {variacaoVolume}% em volume (Ago/25 vs Ago/24)</p>
          <p>• <strong>Oportunidade:</strong> Barras proteicas crescem 7% - segmento premium resiliente</p>
          <p>• <strong>Sazonalidade:</strong> Setembro impactado pelo calor - ajustar previsões climáticas</p>
          <p>• <strong>Preços:</strong> Mercado aceita aumentos (+7,3%) - revisar estratégia de pricing</p>
          <p>• <strong>Consumidor:</strong> Trade up em indulgências com propósito - posicionar valor</p>
        </div>
      </div>
    </div>
  );
};

export default InsightsMercado;
