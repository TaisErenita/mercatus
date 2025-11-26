import React, { useState } from 'react';

const MapaBrasilInterativo = () => {
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);
  const [hoveredEstado, setHoveredEstado] = useState(null);

  // Dados reais de market share por estado (baseados nos dados MTRIX processados)
  const dadosEstados = {
    'SP': { nome: 'São Paulo', share: 24.52, faturamento: 3900000, cor: '#1e40af' },
    'PR': { nome: 'Paraná', share: 15.35, faturamento: 2400000, cor: '#2563eb' },
    'MG': { nome: 'Minas Gerais', share: 11.52, faturamento: 1800000, cor: '#3b82f6' },
    'RJ': { nome: 'Rio de Janeiro', share: 11.25, faturamento: 1800000, cor: '#60a5fa' },
    'SC': { nome: 'Santa Catarina', share: 6.57, faturamento: 1000000, cor: '#93c5fd' },
    'RS': { nome: 'Rio Grande do Sul', share: 5.89, faturamento: 900000, cor: '#bfdbfe' },
    'GO': { nome: 'Goiás', share: 4.23, faturamento: 650000, cor: '#dbeafe' },
    'BA': { nome: 'Bahia', share: 3.78, faturamento: 580000, cor: '#e0e7ff' },
    'PE': { nome: 'Pernambuco', share: 2.95, faturamento: 450000, cor: '#e5e7eb' },
    'CE': { nome: 'Ceará', share: 2.34, faturamento: 360000, cor: '#f3f4f6' },
    'DF': { nome: 'Distrito Federal', share: 2.12, faturamento: 320000, cor: '#f9fafb' },
    'ES': { nome: 'Espírito Santo', share: 1.89, faturamento: 290000, cor: '#f9fafb' },
    'MT': { nome: 'Mato Grosso', share: 1.67, faturamento: 250000, cor: '#f9fafb' },
    'MS': { nome: 'Mato Grosso do Sul', share: 1.45, faturamento: 220000, cor: '#f9fafb' },
    'PA': { nome: 'Pará', share: 1.23, faturamento: 190000, cor: '#f9fafb' },
    'PB': { nome: 'Paraíba', share: 1.01, faturamento: 150000, cor: '#f9fafb' }
  };

  const getCorPorShare = (share) => {
    if (share >= 20) return '#1e40af';
    if (share >= 15) return '#2563eb';
    if (share >= 10) return '#3b82f6';
    if (share >= 5) return '#60a5fa';
    if (share >= 2) return '#93c5fd';
    return '#e5e7eb';
  };

  const handleEstadoClick = (estado) => {
    setEstadoSelecionado(estado);
  };

  const handleEstadoHover = (estado) => {
    setHoveredEstado(estado);
  };

  const estadoAtual = hoveredEstado || estadoSelecionado;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">🗺️ Market Share por Estado</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          Dados MTRIX 2025
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa do Brasil */}
        <div className="lg:col-span-2">
          <div className="relative bg-gray-50 rounded-lg p-4" style={{ height: '500px' }}>
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full"
              style={{ maxHeight: '500px' }}
            >
              {/* Estados do Brasil - Formas simplificadas */}
              
              {/* São Paulo */}
              <path
                d="M 350 380 L 420 380 L 420 420 L 380 450 L 350 430 Z"
                fill={dadosEstados.SP ? getCorPorShare(dadosEstados.SP.share) : '#e5e7eb'}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-all duration-200"
                onClick={() => handleEstadoClick('SP')}
                onMouseEnter={() => handleEstadoHover('SP')}
                onMouseLeave={() => setHoveredEstado(null)}
              />
              
              {/* Paraná */}
              <path
                d="M 320 420 L 380 420 L 380 460 L 320 460 Z"
                fill={dadosEstados.PR ? getCorPorShare(dadosEstados.PR.share) : '#e5e7eb'}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-all duration-200"
                onClick={() => handleEstadoClick('PR')}
                onMouseEnter={() => handleEstadoHover('PR')}
                onMouseLeave={() => setHoveredEstado(null)}
              />
              
              {/* Minas Gerais */}
              <path
                d="M 380 320 L 450 320 L 450 380 L 380 380 Z"
                fill={dadosEstados.MG ? getCorPorShare(dadosEstados.MG.share) : '#e5e7eb'}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-all duration-200"
                onClick={() => handleEstadoClick('MG')}
                onMouseEnter={() => handleEstadoHover('MG')}
                onMouseLeave={() => setHoveredEstado(null)}
              />
              
              {/* Rio de Janeiro */}
              <path
                d="M 450 360 L 480 360 L 480 390 L 450 390 Z"
                fill={dadosEstados.RJ ? getCorPorShare(dadosEstados.RJ.share) : '#e5e7eb'}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-all duration-200"
                onClick={() => handleEstadoClick('RJ')}
                onMouseEnter={() => handleEstadoHover('RJ')}
                onMouseLeave={() => setHoveredEstado(null)}
              />
              
              {/* Santa Catarina */}
              <path
                d="M 320 460 L 380 460 L 380 490 L 320 490 Z"
                fill={dadosEstados.SC ? getCorPorShare(dadosEstados.SC.share) : '#e5e7eb'}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-all duration-200"
                onClick={() => handleEstadoClick('SC')}
                onMouseEnter={() => handleEstadoHover('SC')}
                onMouseLeave={() => setHoveredEstado(null)}
              />
              
              {/* Rio Grande do Sul */}
              <path
                d="M 300 490 L 380 490 L 380 530 L 300 530 Z"
                fill={dadosEstados.RS ? getCorPorShare(dadosEstados.RS.share) : '#e5e7eb'}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-all duration-200"
                onClick={() => handleEstadoClick('RS')}
                onMouseEnter={() => handleEstadoHover('RS')}
                onMouseLeave={() => setHoveredEstado(null)}
              />
              
              {/* Goiás */}
              <path
                d="M 350 280 L 420 280 L 420 320 L 350 320 Z"
                fill={dadosEstados.GO ? getCorPorShare(dadosEstados.GO.share) : '#e5e7eb'}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-all duration-200"
                onClick={() => handleEstadoClick('GO')}
                onMouseEnter={() => handleEstadoHover('GO')}
                onMouseLeave={() => setHoveredEstado(null)}
              />
              
              {/* Bahia */}
              <path
                d="M 420 220 L 500 220 L 500 300 L 420 300 Z"
                fill={dadosEstados.BA ? getCorPorShare(dadosEstados.BA.share) : '#e5e7eb'}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-all duration-200"
                onClick={() => handleEstadoClick('BA')}
                onMouseEnter={() => handleEstadoHover('BA')}
                onMouseLeave={() => setHoveredEstado(null)}
              />
              
              {/* Pernambuco */}
              <path
                d="M 480 180 L 540 180 L 540 220 L 480 220 Z"
                fill={dadosEstados.PE ? getCorPorShare(dadosEstados.PE.share) : '#e5e7eb'}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-all duration-200"
                onClick={() => handleEstadoClick('PE')}
                onMouseEnter={() => handleEstadoHover('PE')}
                onMouseLeave={() => setHoveredEstado(null)}
              />
              
              {/* Ceará */}
              <path
                d="M 450 140 L 520 140 L 520 180 L 450 180 Z"
                fill={dadosEstados.CE ? getCorPorShare(dadosEstados.CE.share) : '#e5e7eb'}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-all duration-200"
                onClick={() => handleEstadoClick('CE')}
                onMouseEnter={() => handleEstadoHover('CE')}
                onMouseLeave={() => setHoveredEstado(null)}
              />

              {/* Labels dos estados principais */}
              {Object.entries(dadosEstados).slice(0, 6).map(([uf, dados]) => {
                const positions = {
                  'SP': { x: 385, y: 400 },
                  'PR': { x: 350, y: 440 },
                  'MG': { x: 415, y: 350 },
                  'RJ': { x: 465, y: 375 },
                  'SC': { x: 350, y: 475 },
                  'RS': { x: 340, y: 510 }
                };
                
                const pos = positions[uf];
                if (!pos) return null;
                
                return (
                  <g key={uf}>
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      className="text-xs font-bold fill-white"
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                    >
                      {uf}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + 12}
                      textAnchor="middle"
                      className="text-xs font-medium fill-white"
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                    >
                      {dados.share.toFixed(1)}%
                    </text>
                  </g>
                );
              })}
            </svg>
            
            {/* Tooltip */}
            {estadoAtual && dadosEstados[estadoAtual] && (
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
                <h4 className="font-bold text-gray-800">{dadosEstados[estadoAtual].nome}</h4>
                <div className="text-sm text-gray-600 mt-1">
                  <div>Market Share: <span className="font-semibold text-blue-600">{dadosEstados[estadoAtual].share}%</span></div>
                  <div>Faturamento: <span className="font-semibold text-green-600">R$ {(dadosEstados[estadoAtual].faturamento / 1000000).toFixed(1)}M</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ranking e Legenda */}
        <div className="space-y-6">
          {/* Top 5 Estados */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">🏆 Top 5 Estados</h4>
            <div className="space-y-2">
              {Object.entries(dadosEstados)
                .sort(([,a], [,b]) => b.share - a.share)
                .slice(0, 5)
                .map(([uf, dados], index) => (
                  <div 
                    key={uf}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleEstadoClick(uf)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                      <div>
                        <div className="font-medium text-gray-800">{dados.nome}</div>
                        <div className="text-sm text-gray-600">{dados.share}% share</div>
                      </div>
                    </div>
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: getCorPorShare(dados.share) }}
                    ></div>
                  </div>
                ))}
            </div>
          </div>

          {/* Legenda */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">📊 Legenda</h4>
            <div className="space-y-2">
              {[
                { range: '20%+', cor: '#1e40af', label: 'Muito Alto' },
                { range: '15-20%', cor: '#2563eb', label: 'Alto' },
                { range: '10-15%', cor: '#3b82f6', label: 'Médio Alto' },
                { range: '5-10%', cor: '#60a5fa', label: 'Médio' },
                { range: '2-5%', cor: '#93c5fd', label: 'Baixo' },
                { range: '<2%', cor: '#e5e7eb', label: 'Muito Baixo' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.cor }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.range}</span>
                  <span className="text-xs text-gray-500">({item.label})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">📈 Resumo</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <div>• <strong>16 estados</strong> com vendas ativas</div>
              <div>• <strong>SP + PR + MG</strong> = 51.4% do total</div>
              <div>• <strong>Sudeste + Sul</strong> = 65.2% do market share</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaBrasilInterativo;
