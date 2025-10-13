import React, { useState } from 'react';

const MapaBrasilSimples = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validationResults, setValidationResults] = useState(null);

  // Dados reais de market share por estado - MTRIX 2025 2º Semestre
  const estadosData = {
    'SP': { nome: 'São Paulo', share: 24.52, vendas: 2482565, faturamento: 3935626.01, densidade: 245.2, regiao: 'Sudeste', status: 'Líder', color: '#1e40af' },
    'PR': { nome: 'Paraná', share: 15.35, vendas: 1598222, faturamento: 2463394.32, densidade: 153.5, regiao: 'Sul', status: 'Líder', color: '#1e40af' },
    'MG': { nome: 'Minas Gerais', share: 11.52, vendas: 1130928, faturamento: 1849597.24, densidade: 115.2, regiao: 'Sudeste', status: 'Líder', color: '#1e40af' },
    'RJ': { nome: 'Rio de Janeiro', share: 11.25, vendas: 1334433, faturamento: 1805363.76, densidade: 112.5, regiao: 'Sudeste', status: 'Líder', color: '#1e40af' },
    'SC': { nome: 'Santa Catarina', share: 6.57, vendas: 625015, faturamento: 1054256.20, densidade: 65.7, regiao: 'Sul', status: 'Forte', color: '#3b82f6' },
    'GO': { nome: 'Goiás', share: 6.07, vendas: 472401, faturamento: 973694.50, densidade: 60.7, regiao: 'Centro-Oeste', status: 'Forte', color: '#3b82f6' },
    'CE': { nome: 'Ceará', share: 4.82, vendas: 340405, faturamento: 773159.43, densidade: 48.2, regiao: 'Nordeste', status: 'Moderado', color: '#60a5fa' },
    'RN': { nome: 'Rio Grande do Norte', share: 4.20, vendas: 363721, faturamento: 674839.31, densidade: 42.0, regiao: 'Nordeste', status: 'Moderado', color: '#60a5fa' },
    'ES': { nome: 'Espírito Santo', share: 3.66, vendas: 325827, faturamento: 587002.69, densidade: 36.6, regiao: 'Sudeste', status: 'Moderado', color: '#60a5fa' },
    'PA': { nome: 'Pará', share: 2.47, vendas: 142071, faturamento: 396926.22, densidade: 24.7, regiao: 'Norte', status: 'Moderado', color: '#60a5fa' },
    'RS': { nome: 'Rio Grande do Sul', share: 2.47, vendas: 698013, faturamento: 396120.83, densidade: 24.7, regiao: 'Sul', status: 'Moderado', color: '#60a5fa' },
    'AL': { nome: 'Alagoas', share: 1.90, vendas: 140914, faturamento: 304326.16, densidade: 19.0, regiao: 'Nordeste', status: 'Moderado', color: '#60a5fa' },
    'BA': { nome: 'Bahia', share: 1.87, vendas: 137347, faturamento: 300310.07, densidade: 18.7, regiao: 'Nordeste', status: 'Moderado', color: '#60a5fa' },
    'PE': { nome: 'Pernambuco', share: 1.68, vendas: 139440, faturamento: 269339.00, densidade: 16.8, regiao: 'Nordeste', status: 'Moderado', color: '#60a5fa' },
    'PB': { nome: 'Paraíba', share: 1.14, vendas: 93685, faturamento: 183666.95, densidade: 11.4, regiao: 'Nordeste', status: 'Moderado', color: '#60a5fa' },
    'AM': { nome: 'Amazonas', share: 0.49, vendas: 24380, faturamento: 79071.94, densidade: 4.9, regiao: 'Norte', status: 'Crítico', color: '#ef4444' }
  };

  const handleStateClick = (stateCode) => {
    setSelectedState(stateCode);
    setShowDetails(true);
  };

  const handleValidationChange = (results) => {
    setValidationResults(results);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Líder': return 'bg-blue-100 text-blue-800';
      case 'Forte': return 'bg-green-100 text-green-800';
      case 'Moderado': return 'bg-yellow-100 text-yellow-800';
      case 'Crítico': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Card Principal */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Market Share por Estado
              </h3>
              {validationResults && (
                <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                  validationResults.status === 'verde' ? 'bg-green-100 text-green-800' :
                  validationResults.status === 'amarelo' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {validationResults.status === 'verde' ? '✅ Validado' :
                   validationResults.status === 'amarelo' ? '⚠️ Atenção' :
                   '❌ Crítico'} ({validationResults.score}%)
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-8 px-3"
                onClick={() => setShowValidation(!showValidation)}
              >
                {showValidation ? 'Ocultar Validação' : 'Ver Validação'}
              </button>
              <button 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-8 px-3"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Ocultar Detalhes' : 'Ver Detalhes'}
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Distribuição geográfica da participação de mercado da Nutrimental (Dados MTRIX 2025 - 2º Semestre)
          </p>
        </div>
        
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visualização por Estados */}
            <div className="relative p-4 bg-slate-50 rounded-lg border">
              <h4 className="font-medium text-slate-900 mb-4">Visualização por Estados</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(estadosData)
                  .sort(([,a], [,b]) => b.share - a.share)
                  .map(([codigo, dados]) => (
                    <div 
                      key={codigo}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedState === codigo ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white hover:bg-slate-50'
                      }`}
                      onClick={() => handleStateClick(codigo)}
                      style={{ borderLeftColor: dados.color, borderLeftWidth: '4px' }}
                    >
                      <div className="text-center">
                        <div className="font-bold text-lg">{codigo}</div>
                        <div className="text-sm text-slate-600">{dados.nome}</div>
                        <div className="font-semibold text-blue-600">{dados.share}%</div>
                        <div className="text-xs text-slate-500">{dados.regiao}</div>
                      </div>
                    </div>
                  ))}
              </div>
              
              {/* Legenda */}
              <div className="mt-4 flex flex-wrap gap-4 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span>Líder (&gt;20%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span>Forte (10-20%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-200"></div>
                  <span>Moderado (1-10%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Crítico (&lt;1%)</span>
                </div>
              </div>
            </div>

            {/* Ranking dos Estados */}
            <div className="space-y-3">
              <h4 className="font-medium text-slate-900">Top 10 Estados</h4>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {Object.entries(estadosData)
                  .sort(([,a], [,b]) => b.share - a.share)
                  .map(([codigo, dados], index) => (
                    <div 
                      key={codigo}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedState === codigo ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'
                      }`}
                      onClick={() => handleStateClick(codigo)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-slate-500">#{index + 1}</span>
                          <div>
                            <div className="font-medium text-slate-900">{dados.nome}</div>
                            <div className="text-sm text-slate-600">{dados.regiao}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{dados.share}%</div>
                          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${getStatusColor(dados.status)}`}>
                            {dados.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Detalhes do Estado Selecionado */}
          {selectedState && showDetails && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3">
                Detalhes: {estadosData[selectedState].nome} ({selectedState})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <div className="text-sm text-blue-700">Market Share</div>
                  <div className="text-xl font-bold text-blue-900">
                    {estadosData[selectedState].share}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-blue-700">Vendas (Und)</div>
                  <div className="text-xl font-bold text-blue-900">
                    {estadosData[selectedState].vendas.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-blue-700">Faturamento</div>
                  <div className="text-xl font-bold text-blue-900">
                    R$ {(estadosData[selectedState].faturamento / 1000).toFixed(0)}k
                  </div>
                </div>
                <div>
                  <div className="text-sm text-blue-700">Densidade</div>
                  <div className="text-xl font-bold text-blue-900">
                    {estadosData[selectedState].densidade}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-blue-700">Status</div>
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${getStatusColor(estadosData[selectedState].status)}`}>
                    {estadosData[selectedState].status}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Validação de Dados Geográficos */}
      {showValidation && (
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Validação de Dados Geográficos</h3>
          <p className="text-sm text-slate-600">
            Funcionalidade de validação será implementada em breve.
          </p>
        </div>
      )}
    </div>
  );
};

export default MapaBrasilSimples;
