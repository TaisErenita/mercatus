import React, { useState } from 'react';

const MapaBrasilVisual = () => {
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);

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

  const topEstados = Object.entries(dadosEstados)
    .sort(([,a], [,b]) => b.share - a.share)
    .slice(0, 10);

  // Layout que simula o formato do Brasil
  const layoutBrasil = [
    // Linha 1 - Norte
    [null, null, 'RR', 'AP', null, null],
    [null, 'AM', 'PA', 'PA', null, null],
    // Linha 2 - Norte/Nordeste
    [null, 'AC', 'RO', 'MT', 'TO', 'MA'],
    [null, null, null, 'GO', 'PI', 'CE'],
    // Linha 3 - Centro/Nordeste
    [null, null, 'MS', 'MG', 'BA', 'RN'],
    [null, null, null, 'ES', 'SE', 'PB'],
    // Linha 4 - Sudeste/Sul
    [null, null, 'SP', 'RJ', 'AL', 'PE'],
    [null, 'PR', 'SC', null, null, null],
    // Linha 5 - Sul
    [null, 'RS', null, null, null, null]
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">🗺️ Market Share por Estado</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          Dados MTRIX 2025 2º Semestre
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa do Brasil */}
        <div className="lg:col-span-2">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Mapa do Brasil - Market Share</h4>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-1">
              {layoutBrasil.map((linha, indexLinha) => (
                <div key={indexLinha} className="flex justify-center space-x-1">
                  {linha.map((estado, indexColuna) => (
                    <div key={`${indexLinha}-${indexColuna}`} className="w-12 h-12">
                      {estado && dadosEstados[estado] ? (
                        <div
                          onClick={() => setEstadoSelecionado(estado)}
                          className="w-full h-full rounded cursor-pointer transition-all hover:scale-110 hover:shadow-lg flex flex-col items-center justify-center text-xs font-bold border border-white"
                          style={{
                            backgroundColor: getCorPorShare(dadosEstados[estado].share),
                            color: dadosEstados[estado].share >= 10 ? 'white' : '#374151'
                          }}
                          title={`${dadosEstados[estado].nome}: ${dadosEstados[estado].share}%`}
                        >
                          <div className="text-xs font-bold">{estado}</div>
                          <div className="text-xs">{dadosEstados[estado].share}%</div>
                        </div>
                      ) : estado ? (
                        <div
                          className="w-full h-full rounded bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 border border-white"
                          title={`${estado}: Sem dados`}
                        >
                          {estado}
                        </div>
                      ) : (
                        <div className="w-full h-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Legenda */}
            <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
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
                <span>&lt;5%</span>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              Clique nos estados para ver detalhes
            </div>
          </div>
        </div>

        {/* Ranking e Detalhes */}
        <div className="space-y-6">
          {/* Top 10 Estados */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">🏆 Top 10 Estados</h4>
            <div className="space-y-2">
              {topEstados.map(([sigla, dados], index) => (
                <div 
                  key={sigla}
                  onClick={() => setEstadoSelecionado(sigla)}
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
              <h4 className="text-lg font-semibold text-gray-800 mb-4">📊 Detalhes do Estado</h4>
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
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posição:</span>
                    <span className="font-medium text-purple-600">
                      #{topEstados.findIndex(([sigla]) => sigla === estadoSelecionado) + 1}º lugar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resumo Regional */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">🌎 Resumo Regional</h4>
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
        <h4 className="font-semibold text-gray-800 mb-2">💡 Insights Principais</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-700 font-medium">• São Paulo lidera com 24.52% do market share</p>
            <p className="text-green-700 font-medium">• Sudeste + Sul concentram 75.82% do mercado</p>
          </div>
          <div>
            <p className="text-purple-700 font-medium">• Oportunidade de expansão no Nordeste</p>
            <p className="text-orange-700 font-medium">• Norte e Centro-Oeste com potencial de crescimento</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaBrasilVisual;
