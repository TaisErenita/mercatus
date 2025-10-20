import React, { useState } from 'react';

const MapaBrasilGeografico = () => {
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
    if (share >= 2) return '#dbeafe';  // Azul bem claro
    return '#f3f4f6'; // Cinza claro
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
        <h3 className="text-xl font-bold text-gray-800">🗺️ Market Share por Estado - Brasil</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          Dados MTRIX 2025 2º Semestre
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa do Brasil com formato geográfico correto */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-auto max-h-96"
              style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%)' }}
            >
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                </filter>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e0f7fa"/>
                  <stop offset="100%" stopColor="#b2ebf2"/>
                </linearGradient>
              </defs>

              {/* Fundo oceânico */}
              <rect width="800" height="600" fill="url(#oceanGradient)" opacity="0.3"/>

              {/* Estados do Norte */}
              
              {/* Roraima - RR */}
              <path
                id="RR"
                d="M 280 50 L 350 50 L 360 80 L 340 110 L 300 100 L 280 80 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Amapá - AP */}
              <path
                id="AP"
                d="M 380 60 L 420 60 L 430 90 L 420 120 L 390 110 L 380 90 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Amazonas - AM */}
              <path
                id="AM"
                d="M 100 80 L 280 80 L 300 100 L 280 180 L 200 200 L 120 180 L 100 120 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Pará - PA */}
              <path
                id="PA"
                d="M 280 80 L 380 90 L 420 120 L 400 180 L 350 200 L 280 180 Z"
                fill={getCorPorShare(dadosEstados.PA?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                onClick={() => handleStateClick('PA')}
                onMouseEnter={() => handleStateHover('PA')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Acre - AC */}
              <path
                id="AC"
                d="M 100 180 L 160 180 L 170 220 L 140 240 L 100 230 L 90 200 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Rondônia - RO */}
              <path
                id="RO"
                d="M 170 180 L 220 180 L 230 220 L 200 240 L 170 220 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Tocantins - TO */}
              <path
                id="TO"
                d="M 350 200 L 400 180 L 420 220 L 400 260 L 360 270 L 350 230 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Estados do Nordeste */}

              {/* Maranhão - MA */}
              <path
                id="MA"
                d="M 400 180 L 480 170 L 500 200 L 480 230 L 420 220 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Piauí - PI */}
              <path
                id="PI"
                d="M 480 200 L 520 190 L 530 230 L 510 260 L 480 250 L 480 220 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Ceará - CE */}
              <path
                id="CE"
                d="M 520 170 L 580 160 L 600 190 L 580 220 L 530 210 L 520 190 Z"
                fill={getCorPorShare(dadosEstados.CE?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                onClick={() => handleStateClick('CE')}
                onMouseEnter={() => handleStateHover('CE')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Rio Grande do Norte - RN */}
              <path
                id="RN"
                d="M 580 190 L 620 180 L 640 200 L 620 220 L 590 210 L 580 200 Z"
                fill={getCorPorShare(dadosEstados.RN?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                onClick={() => handleStateClick('RN')}
                onMouseEnter={() => handleStateHover('RN')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Paraíba - PB */}
              <path
                id="PB"
                d="M 600 210 L 630 200 L 640 230 L 620 250 L 600 240 L 590 220 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Pernambuco - PE */}
              <path
                id="PE"
                d="M 580 240 L 620 230 L 640 260 L 610 290 L 580 280 L 570 250 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Alagoas - AL */}
              <path
                id="AL"
                d="M 610 290 L 630 280 L 640 300 L 620 320 L 600 310 L 610 300 Z"
                fill={getCorPorShare(dadosEstados.AL?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                onClick={() => handleStateClick('AL')}
                onMouseEnter={() => handleStateHover('AL')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Sergipe - SE */}
              <path
                id="SE"
                d="M 600 310 L 620 300 L 630 320 L 610 340 L 590 330 L 600 320 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Bahia - BA */}
              <path
                id="BA"
                d="M 480 250 L 570 240 L 590 330 L 550 380 L 480 370 L 460 320 L 480 270 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Estados do Centro-Oeste */}

              {/* Mato Grosso - MT */}
              <path
                id="MT"
                d="M 230 220 L 350 230 L 360 300 L 320 340 L 250 330 L 230 280 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Goiás - GO */}
              <path
                id="GO"
                d="M 360 270 L 460 260 L 480 320 L 450 360 L 380 370 L 360 320 Z"
                fill={getCorPorShare(dadosEstados.GO?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                onClick={() => handleStateClick('GO')}
                onMouseEnter={() => handleStateHover('GO')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Distrito Federal - DF */}
              <circle
                id="DF"
                cx="420"
                cy="330"
                r="6"
                fill="#fbbf24"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Mato Grosso do Sul - MS */}
              <path
                id="MS"
                d="M 250 330 L 320 340 L 340 400 L 300 440 L 240 430 L 230 380 Z"
                fill="#f3f4f6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                filter="url(#shadow)"
              />

              {/* Estados do Sudeste */}

              {/* Minas Gerais - MG */}
              <path
                id="MG"
                d="M 380 370 L 480 360 L 520 400 L 500 460 L 420 470 L 360 450 L 340 400 Z"
                fill={getCorPorShare(dadosEstados.MG?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                onClick={() => handleStateClick('MG')}
                onMouseEnter={() => handleStateHover('MG')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Espírito Santo - ES */}
              <path
                id="ES"
                d="M 520 400 L 540 390 L 550 420 L 530 450 L 510 440 L 520 420 Z"
                fill={getCorPorShare(dadosEstados.ES?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                onClick={() => handleStateClick('ES')}
                onMouseEnter={() => handleStateHover('ES')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Rio de Janeiro - RJ */}
              <path
                id="RJ"
                d="M 480 450 L 520 440 L 530 470 L 500 500 L 460 490 L 470 470 Z"
                fill={getCorPorShare(dadosEstados.RJ?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                onClick={() => handleStateClick('RJ')}
                onMouseEnter={() => handleStateHover('RJ')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* São Paulo - SP */}
              <path
                id="SP"
                d="M 360 450 L 470 470 L 460 520 L 400 540 L 340 530 L 330 490 Z"
                fill={getCorPorShare(dadosEstados.SP?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                onClick={() => handleStateClick('SP')}
                onMouseEnter={() => handleStateHover('SP')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Estados do Sul */}

              {/* Paraná - PR */}
              <path
                id="PR"
                d="M 300 440 L 340 530 L 320 570 L 280 560 L 260 520 L 280 480 Z"
                fill={getCorPorShare(dadosEstados.PR?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                onClick={() => handleStateClick('PR')}
                onMouseEnter={() => handleStateHover('PR')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Santa Catarina - SC */}
              <path
                id="SC"
                d="M 280 520 L 340 530 L 360 560 L 320 580 L 280 570 L 260 540 Z"
                fill={getCorPorShare(dadosEstados.SC?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                onClick={() => handleStateClick('SC')}
                onMouseEnter={() => handleStateHover('SC')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Rio Grande do Sul - RS */}
              <path
                id="RS"
                d="M 240 520 L 280 570 L 270 600 L 220 590 L 200 560 L 220 530 Z"
                fill={getCorPorShare(dadosEstados.RS?.share || 0)}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:brightness-110"
                onClick={() => handleStateClick('RS')}
                onMouseEnter={() => handleStateHover('RS')}
                onMouseLeave={handleStateLeave}
                filter="url(#shadow)"
              />

              {/* Labels dos estados com dados */}
              {Object.entries(dadosEstados).map(([sigla, dados]) => {
                const positions = {
                  'SP': { x: 400, y: 500 },
                  'PR': { x: 310, y: 510 },
                  'MG': { x: 440, y: 420 },
                  'RJ': { x: 490, y: 475 },
                  'SC': { x: 320, y: 555 },
                  'GO': { x: 420, y: 315 },
                  'CE': { x: 560, y: 185 },
                  'RN': { x: 610, y: 200 },
                  'ES': { x: 530, y: 425 },
                  'PA': { x: 340, y: 135 },
                  'RS': { x: 250, y: 560 },
                  'AL': { x: 620, y: 305 }
                };

                const pos = positions[sigla];
                if (!pos) return null;

                return (
                  <g key={sigla}>
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      className="fill-white font-bold text-sm pointer-events-none drop-shadow-lg"
                      style={{ 
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        fontSize: '12px'
                      }}
                    >
                      {sigla}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + 14}
                      textAnchor="middle"
                      className="fill-white font-bold text-xs pointer-events-none drop-shadow-lg"
                      style={{ 
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        fontSize: '10px'
                      }}
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
                    width="220"
                    height="90"
                    fill="rgba(0,0,0,0.9)"
                    rx="8"
                    className="pointer-events-none"
                    filter="url(#shadow)"
                  />
                  <text x="65" y="75" className="fill-white font-bold text-sm pointer-events-none">
                    {dadosEstados[hoveredState].nome}
                  </text>
                  <text x="65" y="95" className="fill-white text-sm pointer-events-none">
                    Market Share: {dadosEstados[hoveredState].share}%
                  </text>
                  <text x="65" y="115" className="fill-white text-sm pointer-events-none">
                    Faturamento: R$ {dadosEstados[hoveredState].faturamento}M
                  </text>
                  <text x="65" y="130" className="fill-blue-300 text-xs pointer-events-none">
                    Região: {dadosEstados[hoveredState].regiao}
                  </text>
                </g>
              )}
            </svg>

            {/* Legenda */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{backgroundColor: '#1e40af'}}></div>
                <span>20%+ (Líder)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{backgroundColor: '#3b82f6'}}></div>
                <span>15-20% (Alto)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{backgroundColor: '#60a5fa'}}></div>
                <span>10-15% (Médio)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{backgroundColor: '#93c5fd'}}></div>
                <span>5-10% (Baixo)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{backgroundColor: '#dbeafe'}}></div>
                <span>2-5% (Mínimo)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{backgroundColor: '#f3f4f6'}}></div>
                <span>Sem dados</span>
              </div>
            </div>
          </div>
        </div>

        {/* Painel Lateral */}
        <div className="space-y-6">
          {/* Top 5 Estados */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">🏆 Top 5 Estados</h4>
            <div className="space-y-3">
              {topEstados.map(([sigla, dados], index) => (
                <div 
                  key={sigla}
                  onClick={() => handleStateClick(sigla)}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg hover:from-blue-100 hover:to-blue-50 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{dados.nome}</p>
                      <p className="text-sm text-gray-500">{dados.regiao}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 text-lg">{dados.share}%</p>
                    <p className="text-sm text-green-600 font-medium">R$ {dados.faturamento}M</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes do Estado Selecionado */}
          {estadoSelecionado && dadosEstados[estadoSelecionado] && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">📊 Estado Selecionado</h4>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <h5 className="font-bold text-blue-800 text-lg mb-3 flex items-center">
                  <span className="mr-2">🎯</span>
                  {dadosEstados[estadoSelecionado].nome} ({estadoSelecionado})
                </h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="text-gray-600 font-medium">Market Share:</span>
                    <span className="font-bold text-blue-600 text-lg">
                      {dadosEstados[estadoSelecionado].share}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="text-gray-600 font-medium">Faturamento:</span>
                    <span className="font-bold text-green-600 text-lg">
                      R$ {dadosEstados[estadoSelecionado].faturamento}M
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="text-gray-600 font-medium">Região:</span>
                    <span className="font-semibold text-gray-800">
                      {dadosEstados[estadoSelecionado].regiao}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resumo Regional */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">🌎 Distribuição Regional</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <span className="font-medium">🏙️ Sudeste:</span>
                <span className="font-bold text-blue-600 text-lg">51.43%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <span className="font-medium">🌾 Sul:</span>
                <span className="font-bold text-green-600 text-lg">24.39%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                <span className="font-medium">☀️ Nordeste:</span>
                <span className="font-bold text-orange-600 text-lg">10.92%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <span className="font-medium">🌄 Centro-Oeste:</span>
                <span className="font-bold text-purple-600 text-lg">6.07%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <span className="font-medium">🌳 Norte:</span>
                <span className="font-bold text-gray-600 text-lg">2.47%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Estratégicos */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg p-6 border border-blue-200">
        <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
          <span className="mr-2">💡</span>
          Insights Estratégicos do Mapa
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-blue-700 mb-2">🎯 Concentração Geográfica</h5>
            <p className="text-sm text-gray-600">75.82% do market share concentrado no Sul-Sudeste</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-green-700 mb-2">🚀 Oportunidades</h5>
            <p className="text-sm text-gray-600">Nordeste (10.92%) com potencial de expansão</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-purple-700 mb-2">📈 Crescimento</h5>
            <p className="text-sm text-gray-600">Norte/Centro-Oeste: mercados emergentes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaBrasilGeografico;
