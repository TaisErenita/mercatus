import React, { useState, useEffect } from 'react';

const ModeloPreditivoAprimorado = () => {
  const [modeloData, setModeloData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento dos dados do modelo
    setTimeout(() => {
      setModeloData({
        r2_atual: 0.788,
        r2_novo: 0.980,
        melhoria_percentual: 24.4,
        fontes_integradas: ['Amazon', 'Regional', 'Marketing', 'Histórico', 'Consumidor'],
        variaveis_totais: 40,
        confiabilidade: 'Alta'
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  const melhorias = [
    { fonte: 'Amazon', impacto: 0.20, cor: 'bg-blue-500' },
    { fonte: 'Regional', impacto: 0.12, cor: 'bg-green-500' },
    { fonte: 'Marketing', impacto: 0.08, cor: 'bg-purple-500' },
    { fonte: 'Histórico', impacto: 0.15, cor: 'bg-orange-500' },
    { fonte: 'Consumidor', impacto: 0.05, cor: 'bg-pink-500' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">🎯 Modelo Preditivo Aprimorado</h3>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          {modeloData.confiabilidade} Confiabilidade
        </span>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4">
          <div className="text-sm text-red-600 font-medium">R² Anterior</div>
          <div className="text-2xl font-bold text-red-700">{modeloData.r2_atual.toFixed(3)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
          <div className="text-sm text-green-600 font-medium">R² Novo</div>
          <div className="text-2xl font-bold text-green-700">{modeloData.r2_novo.toFixed(3)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="text-sm text-blue-600 font-medium">Melhoria</div>
          <div className="text-2xl font-bold text-blue-700">+{modeloData.melhoria_percentual.toFixed(1)}%</div>
        </div>
      </div>

      {/* Visualização das Melhorias */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Contribuição por Fonte de Dados</h4>
        <div className="space-y-3">
          {melhorias.map((melhoria, index) => (
            <div key={index} className="flex items-center">
              <div className="w-20 text-sm font-medium text-gray-600">{melhoria.fonte}</div>
              <div className="flex-1 mx-3">
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className={`${melhoria.cor} h-3 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${(melhoria.impacto / 0.20) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-sm font-bold text-gray-800">+{(melhoria.impacto * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Estatísticas do Modelo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{modeloData.fontes_integradas.length}</div>
          <div className="text-sm text-gray-600">Fontes Integradas</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{modeloData.variaveis_totais}</div>
          <div className="text-sm text-gray-600">Variáveis</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">98%</div>
          <div className="text-sm text-gray-600">Precisão</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">24/7</div>
          <div className="text-sm text-gray-600">Monitoramento</div>
        </div>
      </div>

      {/* Fontes de Dados */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">Fontes de Dados Integradas:</h4>
        <div className="flex flex-wrap gap-2">
          {modeloData.fontes_integradas.map((fonte, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
            >
              {fonte}
            </span>
          ))}
        </div>
      </div>

      {/* Indicador de Status */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Modelo Ativo e Atualizado</span>
        </div>
        <div className="text-xs text-gray-500">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>
    </div>
  );
};

export default ModeloPreditivoAprimorado;
