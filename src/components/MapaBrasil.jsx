import React, { useState } from 'react';
import ValidacaoGeografica from './ValidacaoGeografica';

const MapaBrasil = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validationResults, setValidationResults] = useState(null);

  // Dados de market share por estado
  const estadosData = {
    'SP': { nome: 'São Paulo', share: 26.9, vendas: 20589, densidade: 85.4, regiao: 'Sudeste', status: 'Líder', color: '#1e40af' },
    'CE': { nome: 'Ceará', share: 26.5, vendas: 20285, densidade: 37.2, regiao: 'Nordeste', status: 'Líder', color: '#1e40af' },
    'RN': { nome: 'Rio Grande do Norte', share: 26.4, vendas: 20208, densidade: 31.8, regiao: 'Nordeste', status: 'Líder', color: '#1e40af' },
    'PR': { nome: 'Paraná', share: 15.9, vendas: 12167, densidade: 42.1, regiao: 'Sul', status: 'Forte', color: '#3b82f6' },
    'MG': { nome: 'Minas Gerais', share: 4.2, vendas: 3214, densidade: 28.9, regiao: 'Sudeste', status: 'Moderado', color: '#60a5fa' },
    'RJ': { nome: 'Rio de Janeiro', share: 0.25, vendas: 189, densidade: 6.8, regiao: 'Sudeste', status: 'Crítico', color: '#ef4444' },
    'BA': { nome: 'Bahia', share: 0.15, vendas: 115, densidade: 4.2, regiao: 'Nordeste', status: 'Crítico', color: '#ef4444' },
    'RS': { nome: 'Rio Grande do Sul', share: 0.12, vendas: 92, densidade: 3.8, regiao: 'Sul', status: 'Crítico', color: '#ef4444' },
    'SC': { nome: 'Santa Catarina', share: 0.08, vendas: 61, densidade: 2.9, regiao: 'Sul', status: 'Crítico', color: '#ef4444' },
    'GO': { nome: 'Goiás', share: 0.05, vendas: 38, densidade: 2.1, regiao: 'Centro-Oeste', status: 'Crítico', color: '#ef4444' }
  };

  // Análise regional
  const analiseRegional = [
    {
      regiao: 'Nordeste',
      shareTotal: 52.95,
      vendas: 40608,
      densidade: 24.4,
      oportunidades: ['Otimizar densidade BA', 'Expandir para PE e AL'],
      ameacas: ['Concentração excessiva', 'Dependência regional']
    },
    {
      regiao: 'Sudeste', 
      shareTotal: 31.35,
      vendas: 23992,
      densidade: 40.4,
      oportunidades: ['Operação resgate RJ', 'Crescer em MG'],
      ameacas: ['RJ subexplorado', 'Concorrência SP']
    },
    {
      regiao: 'Sul',
      shareTotal: 16.1,
      vendas: 12320,
      densidade: 16.3,
      oportunidades: ['Expandir RS e SC', 'Fortalecer PR'],
      ameacas: ['Baixa penetração', 'Mercado fragmentado']
    },
    {
      regiao: 'Centro-Oeste',
      shareTotal: 0.05,
      vendas: 38,
      densidade: 2.1,
      oportunidades: ['Mercado virgem', 'Potencial agronegócio'],
      ameacas: ['Ausência total', 'Logística complexa']
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      'Líder': 'default',
      'Forte': 'secondary', 
      'Moderado': 'outline',
      'Crítico': 'destructive'
    };
    return variants[status] || 'outline';
  };

  const handleStateClick = (stateCode) => {
    setSelectedState(stateCode);
    setShowDetails(true);
  };

  const handleValidationChange = (results) => {
    setValidationResults(results);
  };

  return (
    <div className="space-y-6">
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
            Distribuição geográfica da participação de mercado da Nutrimental
          </p>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mapa Simplificado */}
            <div className="relative p-4 bg-slate-50 rounded-lg border">
              <h4 className="font-medium text-slate-900 mb-4">Visualização por Estados</h4>
              <div className="grid grid-cols-3 gap-3">
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
                  <span>Líder (>20%)</span>
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
                  <span>Crítico (<1%)</span>
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
                          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                            dados.status === 'Líder' ? 'bg-blue-100 text-blue-800' :
                            dados.status === 'Forte' ? 'bg-green-100 text-green-800' :
                            dados.status === 'Moderado' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-blue-700">Market Share</div>
                  <div className="text-xl font-bold text-blue-900">
                    {estadosData[selectedState].share}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-blue-700">Vendas</div>
                  <div className="text-xl font-bold text-blue-900">
                    {estadosData[selectedState].vendas.toLocaleString()}
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
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                    estadosData[selectedState].status === 'Líder' ? 'bg-blue-100 text-blue-800' :
                    estadosData[selectedState].status === 'Forte' ? 'bg-green-100 text-green-800' :
                    estadosData[selectedState].status === 'Moderado' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
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
        <ValidacaoGeografica 
          dadosEstados={estadosData}
          onValidationChange={handleValidationChange}
        />
      )}

      {/* Análise Regional */}
      {showDetails && (
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Análise Regional</h3>
            <p className="text-sm text-muted-foreground">
              Performance por região geográfica
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analiseRegional.map((regiao) => (
                <div key={regiao.regiao} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-slate-900">{regiao.regiao}</h4>
                    <div className="text-right">
                      <div className="font-bold text-lg">{regiao.shareTotal}%</div>
                      <div className="text-sm text-slate-600">{regiao.vendas.toLocaleString()} vendas</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm font-medium text-green-700">Oportunidades:</div>
                      <ul className="text-sm text-slate-600">
                        {regiao.oportunidades.map((op, i) => (
                          <li key={i}>• {op}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-red-700">Ameaças:</div>
                      <ul className="text-sm text-slate-600">
                        {regiao.ameacas.map((ameaca, i) => (
                          <li key={i}>• {ameaca}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default MapaBrasil;
