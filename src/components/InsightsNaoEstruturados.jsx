import React, { useState } from 'react';

const InsightsNaoEstruturados = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('posicionamento_competitivo');

  const insights = {
    posicionamento_competitivo: {
      titulo: "🎯 Posicionamento Competitivo",
      cor: "blue",
      dados: [
        { produto: "Nutry Cereais", status: "premium", diferencial: "+20% vs Ritter", estrategia: "Manter premium" },
        { produto: "Nutry Frutas", status: "paridade", diferencial: "= Banana Brasil", estrategia: "Oportunidade diferenciação" },
        { produto: "Bananinhas", status: "competitivo", diferencial: "-10% vs Paraibuna", estrategia: "Vantagem custo-benefício" },
        { produto: "Nuts", status: "paridade", diferencial: "= &Joy", estrategia: "Buscar diferenciação" },
        { produto: "Crispy Protein", status: "premium", diferencial: "+10% vs Banana Brasil", estrategia: "Justificar valor agregado" },
        { produto: "Tube Protein", status: "premium", diferencial: "+10% vs Bold", estrategia: "Comunicar benefícios" },
        { produto: "Aveia Nutry", status: "competitivo", diferencial: "-10% vs Quaker", estrategia: "Aproveitar custo-benefício" },
        { produto: "Nutribom", status: "competitivo", diferencial: "-15% vs Mucilon", estrategia: "Posição agressiva" },
        { produto: "Lactea", status: "competitivo", diferencial: "-10% vs Nestlé", estrategia: "Competir por preço" }
      ]
    },
    estrategia_precos: {
      titulo: "💰 Estratégia de Preços",
      cor: "green",
      dados: [
        { categoria: "Barras Proteicas", estrategia: "Premium", justificativa: "Alto valor agregado, público disposto a pagar mais", oportunidade: "Expandir linha premium" },
        { categoria: "Produtos Básicos", estrategia: "Competitiva", justificativa: "Aveia e Nutribom com preços agressivos", oportunidade: "Ganhar market share" },
        { categoria: "Categorias Tradicionais", estrategia: "Intermediária", justificativa: "Equilibrio entre valor e competitividade", oportunidade: "Diferenciação por qualidade" }
      ]
    },
    concorrentes_principais: {
      titulo: "⚔️ Inteligência Competitiva",
      cor: "red",
      dados: [
        { concorrente: "Ritter", categoria: "Cereais", ameaca: "Alta", estrategia: "Líder estabelecido", resposta: "Diferenciação nutricional" },
        { concorrente: "Banana Brasil", categoria: "Frutas/Proteína", ameaca: "Muito Alta", estrategia: "Presença em múltiplas categorias", resposta: "Inovação e marketing" },
        { concorrente: "Quaker", categoria: "Aveia", ameaca: "Muito Alta", estrategia: "Marca tradicional forte", resposta: "Posicionamento premium saudável" },
        { concorrente: "Nestlé", categoria: "Infantil", ameaca: "Muito Alta", estrategia: "Gigante multinacional", resposta: "Nicho especializado" },
        { concorrente: "Mucilon", categoria: "Nutribom", ameaca: "Alta", estrategia: "Marca consolidada", resposta: "Preço competitivo" }
      ]
    },
    publico_comunicacao: {
      titulo: "👥 Público e Comunicação",
      cor: "purple",
      dados: [
        { segmento: "Fitness/Pós-treino", caracteristica: "Busca performance e recuperação", comunicacao: "Influenciadores fitness", oportunidade: "Parcerias especializadas" },
        { segmento: "Health Marketing", caracteristica: "Valoriza benefícios científicos", comunicacao: "Abordagem técnica", oportunidade: "Conteúdo educativo" },
        { segmento: "Nutrição Esportiva", caracteristica: "Foco em resultados", comunicacao: "Evidências científicas", oportunidade: "Certificações e estudos" },
        { segmento: "Stakeholders", caracteristica: "Relacionamento B2B", comunicacao: "Estratégia institucional", oportunidade: "Parcerias estratégicas" }
      ]
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'paridade': return 'bg-yellow-100 text-yellow-800';
      case 'competitivo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAmeacaColor = (ameaca) => {
    switch(ameaca) {
      case 'Muito Alta': return 'bg-red-100 text-red-800';
      case 'Alta': return 'bg-orange-100 text-orange-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoriaColor = (categoria) => {
    const cores = {
      blue: 'bg-blue-600 text-white',
      green: 'bg-green-600 text-white',
      red: 'bg-red-600 text-white',
      purple: 'bg-purple-600 text-white'
    };
    return cores[insights[categoria]?.cor] || 'bg-gray-600 text-white';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">🧠 Insights Não Estruturados</h3>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            26 Insights
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            IA Processada
          </span>
        </div>
      </div>

      {/* Navegação de Categorias */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {Object.keys(insights).map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaAtiva(categoria)}
            className={`p-3 rounded-lg font-medium transition-all text-sm ${
              categoriaAtiva === categoria
                ? getCategoriaColor(categoria)
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {insights[categoria].titulo}
          </button>
        ))}
      </div>

      {/* Conteúdo da Categoria Ativa */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          {insights[categoriaAtiva].titulo}
        </h4>

        {/* Posicionamento Competitivo */}
        {categoriaAtiva === 'posicionamento_competitivo' && (
          <div className="space-y-4">
            {insights.posicionamento_competitivo.dados.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-gray-800">{item.produto}</h5>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                    {item.diferencial}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Estratégia:</strong> {item.estrategia}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Estratégia de Preços */}
        {categoriaAtiva === 'estrategia_precos' && (
          <div className="space-y-4">
            {insights.estrategia_precos.dados.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-gray-800">{item.categoria}</h5>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {item.estrategia}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.justificativa}</p>
                <p className="text-sm text-blue-600 font-medium">
                  💡 {item.oportunidade}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Concorrentes Principais */}
        {categoriaAtiva === 'concorrentes_principais' && (
          <div className="space-y-4">
            {insights.concorrentes_principais.dados.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-semibold text-gray-800">{item.concorrente}</h5>
                    <p className="text-sm text-gray-500">{item.categoria}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAmeacaColor(item.ameaca)}`}>
                    {item.ameaca}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Estratégia:</strong> {item.estrategia}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  🎯 Resposta: {item.resposta}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Público e Comunicação */}
        {categoriaAtiva === 'publico_comunicacao' && (
          <div className="space-y-4">
            {insights.publico_comunicacao.dados.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border">
                <h5 className="font-semibold text-gray-800 mb-2">{item.segmento}</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 font-medium">Característica:</p>
                    <p className="text-gray-700">{item.caracteristica}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Comunicação:</p>
                    <p className="text-gray-700">{item.comunicacao}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Oportunidade:</p>
                    <p className="text-purple-600 font-medium">{item.oportunidade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resumo de Ações */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">🚀 Ações Recomendadas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-purple-700 font-medium">• Fortalecer posicionamento premium em proteínas</p>
            <p className="text-blue-700 font-medium">• Aproveitar vantagem competitiva em produtos básicos</p>
          </div>
          <div>
            <p className="text-green-700 font-medium">• Intensificar marketing fitness/health</p>
            <p className="text-red-700 font-medium">• Monitorar movimentos da Banana Brasil</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsNaoEstruturados;
