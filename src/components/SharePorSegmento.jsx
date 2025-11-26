import React from 'react';
import { getScanntechShareNutrimental } from '../data/scanntechDataReal_v2';

const SharePorSegmento = ({ selectedCategory, selectedPeriod }) => {
  const shareNutrimental = getScanntechShareNutrimental(selectedCategory, selectedPeriod);

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
      {/* Linha Consolidada NUTRY Total */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6 mb-6 border-2 border-cyan-300">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-lg font-bold text-gray-800 mb-2">🏆 NUTRY - Participação Total de Mercado</h5>
            <p className="text-sm text-gray-600">Consolidado de todas as categorias - Ago/25 vs Ago/24</p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold text-cyan-600">27.4%</p>
            <p className="text-sm font-medium text-green-600 mt-2">↑ +0.2% vs período anterior</p>
          </div>
        </div>
      </div>

      {/* Segmentos por Categoria */}
      <h5 className="text-md font-semibold text-gray-800 mb-4">📊 Share por Segmento (Nutry)</h5>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shareNutrimental.categorias.map((cat, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{cat.icon}</span>
              <span className={`text-xs font-medium ${getTrendColor(cat.trend)}`}>
                {getTrendIcon(cat.trend)} {cat.trend}
              </span>
            </div>
            <h6 className="text-sm font-semibold text-gray-700 mb-1">{cat.categoria}</h6>
            <p className="text-2xl font-bold text-blue-600">{cat.share}%</p>
            <p className="text-xs text-gray-500 mt-1">Share Nutry</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharePorSegmento;
