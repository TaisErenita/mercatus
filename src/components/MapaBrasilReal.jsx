import React, { useState } from 'react';

const MapaBrasilReal = () => {
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);

  const dadosEstados = {
    'SP': { nome: 'São Paulo', share: 24.52, faturamento: 3.9, regiao: 'Sudeste' },
    'PR': { nome: 'Paraná', share: 15.35, faturamento: 2.4, regiao: 'Sul' },
    'MG': { nome: 'Minas Gerais', share: 11.52, faturamento: 1.8, regiao: 'Sudeste' },
    'RJ': { nome: 'Rio de Janeiro', share: 11.25, faturamento: 1.8, regiao: 'Sudeste' },
    'SC': { nome: 'Santa Catarina', share: 6.57, faturamento: 1.0, regiao: 'Sul' },
    'GO': { nome: 'Goiás', share: 6.07, faturamento: 0.9, regiao: 'Centro-Oeste' },
    'CE': { nome: 'Ceará', share: 4.82, faturamento: 0.7, regiao: 'Nordeste' },
    'RN': { nome: 'Rio Grande do Norte', share: 4.2, faturamento: 0.6, regiao: 'Nordeste' },
    'ES': { nome: 'Espírito Santo', share: 3.66, faturamento: 0.5, regiao: 'Sudeste' },
    'PA': { nome: 'Pará', share: 2.47, faturamento: 0.4, regiao: 'Norte' },
    'RS': { nome: 'Rio Grande do Sul', share: 2.47, faturamento: 0.4, regiao: 'Sul' },
    'AL': { nome: 'Alagoas', share: 1.9, faturamento: 0.3, regiao: 'Nordeste' }
  };

  const getCorPorShare = (share) => {
    if (share >= 20) return '#1e40af'; // Azul escuro
    if (share >= 15) return '#3b82f6'; // Azul médio
    if (share >= 10) return '#60a5fa'; // Azul claro
    if (share >= 5) return '#93c5fd';  // Azul muito claro
    return '#e5e7eb'; // Cinza
  };

  const handleStateClick = (stateId) => {
    setEstadoSelecionado(stateId);
  };

  const handleStateHover = (stateId) => {
    setHoveredState(stateId);
  };

  const handleStateLeave = () => {
    setHoveredState(null);
  };

  const topEstados = Object.entries(dadosEstados)
    .sort(([,a], [,b]) => b.share - a.share)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">🗺️ Mapa do Brasil - Market Share</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          Dados MTRIX 2025 2º Semestre
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa SVG Real do Brasil */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-4">
            <svg
              viewBox="0 0 780 687"
              className="w-full h-auto max-h-96"
              style={{ background: '#f8fafc' }}
            >
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                </filter>
              </defs>

              {/* Estados do Brasil com formas simplificadas mas reconhecíveis */}
              
              {/* Acre */}
              <path
                id="AC"
                d="M 20 350 L 80 350 L 80 420 L 20 420 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Alagoas */}
              <path
                id="AL"
                d="M 580 420 L 620 420 L 620 450 L 580 450 Z"
                fill={getCorPorShare(dadosEstados.AL?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onClick={() => handleStateClick('AL')}
                onMouseEnter={() => handleStateHover('AL')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Amapá */}
              <path
                id="AP"
                d="M 350 30 L 400 30 L 400 90 L 350 90 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Amazonas */}
              <path
                id="AM"
                d="M 50 80 L 250 80 L 250 250 L 50 250 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Bahia */}
              <path
                id="BA"
                d="M 450 350 L 580 350 L 580 500 L 450 500 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Ceará */}
              <path
                id="CE"
                d="M 480 250 L 560 250 L 560 320 L 480 320 Z"
                fill={getCorPorShare(dadosEstados.CE?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onClick={() => handleStateClick('CE')}
                onMouseEnter={() => handleStateHover('CE')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Espírito Santo */}
              <path
                id="ES"
                d="M 520 480 L 560 480 L 560 520 L 520 520 Z"
                fill={getCorPorShare(dadosEstados.ES?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onClick={() => handleStateClick('ES')}
                onMouseEnter={() => handleStateHover('ES')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Goiás */}
              <path
                id="GO"
                d="M 350 350 L 450 350 L 450 450 L 350 450 Z"
                fill={getCorPorShare(dadosEstados.GO?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onClick={() => handleStateClick('GO')}
                onMouseEnter={() => handleStateHover('GO')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Maranhão */}
              <path
                id="MA"
                d="M 380 180 L 480 180 L 480 280 L 380 280 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Mato Grosso */}
              <path
                id="MT"
                d="M 250 250 L 350 250 L 350 380 L 250 380 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Mato Grosso do Sul */}
              <path
                id="MS"
                d="M 250 380 L 350 380 L 350 480 L 250 480 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Minas Gerais */}
              <path
                id="MG"
                d="M 350 450 L 480 450 L 480 550 L 350 550 Z"
                fill={getCorPorShare(dadosEstados.MG?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onClick={() => handleStateClick('MG')}
                onMouseEnter={() => handleStateHover('MG')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Pará */}
              <path
                id="PA"
                d="M 250 80 L 380 80 L 380 220 L 250 220 Z"
                fill={getCorPorShare(dadosEstados.PA?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onClick={() => handleStateClick('PA')}
                onMouseEnter={() => handleStateHover('PA')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Paraíba */}
              <path
                id="PB"
                d="M 580 320 L 620 320 L 620 360 L 580 360 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Paraná */}
              <path
                id="PR"
                d="M 300 550 L 400 550 L 400 620 L 300 620 Z"
                fill={getCorPorShare(dadosEstados.PR?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onClick={() => handleStateClick('PR')}
                onMouseEnter={() => handleStateHover('PR')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Pernambuco */}
              <path
                id="PE"
                d="M 520 350 L 580 350 L 580 420 L 520 420 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Piauí */}
              <path
                id="PI"
                d="M 420 280 L 480 280 L 480 350 L 420 350 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Rio de Janeiro */}
              <path
                id="RJ"
                d="M 480 520 L 540 520 L 540 570 L 480 570 Z"
                fill={getCorPorShare(dadosEstados.RJ?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onClick={() => handleStateClick('RJ')}
                onMouseEnter={() => handleStateHover('RJ')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Rio Grande do Norte */}
              <path
                id="RN"
                d="M 560 280 L 620 280 L 620 330 L 560 330 Z"
                fill={getCorPorShare(dadosEstados.RN?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onClick={() => handleStateClick('RN')}
                onMouseEnter={() => handleStateHover('RN')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Rio Grande do Sul */}
              <path
                id="RS"
                d="M 250 620 L 350 620 L 350 680 L 250 680 Z"
                fill={getCorPorShare(dadosEstados.RS?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onClick={() => handleStateClick('RS')}
                onMouseEnter={() => handleStateHover('RS')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Rondônia */}
              <path
                id="RO"
                d="M 150 250 L 220 250 L 220 320 L 150 320 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Roraima */}
              <path
                id="RR"
                d="M 200 20 L 280 20 L 280 100 L 200 100 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Santa Catarina */}
              <path
                id="SC"
                d="M 300 620 L 400 620 L 400 670 L 300 670 Z"
                fill={getCorPorShare(dadosEstados.SC?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onClick={() => handleStateClick('SC')}
                onMouseEnter={() => handleStateHover('SC')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* São Paulo */}
              <path
                id="SP"
                d="M 380 520 L 480 520 L 480 600 L 380 600 Z"
                fill={getCorPorShare(dadosEstados.SP?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onClick={() => handleStateClick('SP')}
                onMouseEnter={() => handleStateHover('SP')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Sergipe */}
              <path
                id="SE"
                d="M 580 380 L 610 380 L 610 420 L 580 420 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Tocantins */}
              <path
                id="TO"
                d="M 350 220 L 420 220 L 420 320 L 350 320 Z"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Distrito Federal */}
              <circle
                id="DF"
                cx="385"
                cy="385"
                r="8"
                fill="#e5e7eb"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Labels dos estados com dados */}
              {Object.entries(dadosEstados).map(([sigla, dados]) => {
                const positions = {
                  'SP': { x: 430, y: 560 },
                  'PR': { x: 350, y: 585 },
                  'MG': { x: 415, y: 500 },
                  'RJ': { x: 510, y: 545 },
                  'SC': { x: 350, y: 645 },
                  'GO': { x: 400, y: 400 },
                  'CE': { x: 520, y: 285 },
                  'RN': { x: 590, y: 305 },
                  'ES': { x: 540, y: 500 },
                  'PA': { x: 315, y: 150 },
                  'RS': { x: 300, y: 650 },
                  'AL': { x: 600, y: 435 }
                };

                const pos = positions[sigla];
                if (!pos) return null;

                return (
                  <g key={sigla}>
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      className="fill-white font-bold text-xs pointer-events-none"
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                    >
                      {sigla}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + 12}
                      textAnchor="middle"
                      className="fill-white font-bold text-xs pointer-events-none"
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                    >
                      {dados.share}%
                    </text>
                  </g>
                );
              })}

              {/* Tooltip para estado em hover */}
              {hoveredState && dadosEstados[hoveredState] && (
                <g>
                  <rect
                    x="50"
                    y="50"
                    width="200"
                    height="80"
                    fill="rgba(0,0,0,0.9)"
                    rx="8"
                    className="pointer-events-none"
                  />
                  <text x="60" y="70" className="fill-white font-bold text-sm pointer-events-none">
                    {dadosEstados[hoveredState].nome}
                  </text>
                  <text x="60" y="90" className="fill-white text-sm pointer-events-none">
                    Market Share: {dadosEstados[hoveredState].share}%
                  </text>
                  <text x="60" y="110" className="fill-white text-sm pointer-events-none">
                    Faturamento: R$ {dadosEstados[hoveredState].faturamento}M
                  </text>
                </g>
              )}
            </svg>

            {/* Legenda */}
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{backgroundColor: '#1e40af'}}></div>
                <span>20%+</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{backgroundColor: '#3b82f6'}}></div>
                <span>15-20%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{backgroundColor: '#60a5fa'}}></div>
                <span>10-15%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{backgroundColor: '#93c5fd'}}></div>
                <span>5-10%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{backgroundColor: '#e5e7eb'}}></div>
                <span>&lt;5% ou sem dados</span>
              </div>
            </div>
          </div>
        </div>

        {/* Painel Lateral */}
        <div className="space-y-6">
          {/* Top 5 Estados */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">🏆 Top 5 Estados</h4>
            <div className="space-y-2">
              {topEstados.map(([sigla, dados], index) => (
                <div 
                  key={sigla}
                  onClick={() => handleStateClick(sigla)}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">{dados.nome}</p>
                      <p className="text-sm text-gray-500">{dados.regiao}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{dados.share}%</p>
                    <p className="text-sm text-gray-500">R$ {dados.faturamento}M</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes do Estado Selecionado */}
          {estadoSelecionado && dadosEstados[estadoSelecionado] && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">📊 Estado Selecionado</h4>
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-bold text-blue-800 text-lg mb-3">
                  {dadosEstados[estadoSelecionado].nome} ({estadoSelecionado})
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Share:</span>
                    <span className="font-bold text-blue-600">
                      {dadosEstados[estadoSelecionado].share}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Faturamento:</span>
                    <span className="font-bold text-green-600">
                      R$ {dadosEstados[estadoSelecionado].faturamento}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Região:</span>
                    <span className="font-medium text-gray-800">
                      {dadosEstados[estadoSelecionado].regiao}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resumo Regional */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">🌎 Por Região</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-blue-50 rounded">
                <span>Sudeste:</span>
                <span className="font-bold text-blue-600">51.43%</span>
              </div>
              <div className="flex justify-between p-2 bg-green-50 rounded">
                <span>Sul:</span>
                <span className="font-bold text-green-600">24.39%</span>
              </div>
              <div className="flex justify-between p-2 bg-orange-50 rounded">
                <span>Nordeste:</span>
                <span className="font-bold text-orange-600">10.92%</span>
              </div>
              <div className="flex justify-between p-2 bg-purple-50 rounded">
                <span>Centro-Oeste:</span>
                <span className="font-bold text-purple-600">6.07%</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Norte:</span>
                <span className="font-bold text-gray-600">2.47%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">💡 Insights do Mapa</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-blue-700 font-medium">🎯 Clique nos estados para detalhes</p>
            <p className="text-green-700 font-medium">🎨 Cores indicam market share</p>
          </div>
          <div>
            <p className="text-purple-700 font-medium">🖱️ Hover para preview rápido</p>
            <p className="text-orange-700 font-medium">📍 Concentração Sul-Sudeste</p>
          </div>
          <div>
            <p className="text-red-700 font-medium">🚀 Oportunidades no Nordeste</p>
            <p className="text-indigo-700 font-medium">📈 Expansão Norte/Centro-Oeste</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaBrasilReal;
