import { useState } from 'react';
import { ArrowLeft, TrendingUp, Building2, BarChart3, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import { getFilteredInternaData, getEvolucaoTemporalCanal, getCurvaABCProdutos, getRentabilidadeCanal } from '../data/nutrimentalInternaData';

export default function MonitoramentoInternos({ onVoltar }) {
  const [selectedCategoria, setSelectedCategoria] = useState('total');
  const [selectedPeriodo, setSelectedPeriodo] = useState('ytd');
  const [selectedMes, setSelectedMes] = useState('setembro');
  const [selectedCanal, setSelectedCanal] = useState('todos');
  const [selectedRegiao, setSelectedRegiao] = useState('todas');

  // Obter dados filtrados
  const dadosInternos = getFilteredInternaData(selectedCategoria, selectedPeriodo, selectedMes, selectedCanal, selectedRegiao);
  const evolucaoTemporal = getEvolucaoTemporalCanal(selectedCategoria, 'ytd', selectedCanal, selectedRegiao);
  const curvaABC = getCurvaABCProdutos(selectedCategoria, 'ytd', selectedCanal, selectedRegiao);
  const rentabilidade = getRentabilidadeCanal(selectedCategoria, selectedPeriodo, selectedRegiao);

  const canais = [
    { id: 'todos', label: 'Todos' },
    { id: 'distribuidor', label: 'Distribuidor' },
    { id: 'atacado', label: 'Atacado' },
    { id: 'as', label: 'AS' },
    { id: 'doceiro', label: 'Doceiro' },
    { id: 'ka', label: 'KA' }
  ];

  const regioes = [
    { id: 'todas', label: 'Todas' },
    { id: 'sul', label: 'Norte' },
    { id: 'sp_capital', label: 'SP Capital' },
    { id: 'nordeste', label: 'Nordeste' },
    { id: 'sp_interior', label: 'SP Interior' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onVoltar}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Visão Geral
          </button>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Dados Internos - Performance Nutrimental</h2>
        </div>
        <p className="text-purple-100">Análise detalhada de vendas de BARRAS por canal, região e produtos</p>
      </div>

      {/* Filtros */}
      <FiltrosMonitoramento
        titulo="Dados Internos - Performance Nutrimental"
        subtitulo="Análise de vendas internas por canal, região e produtos (apenas BARRAS)"
        badgeTexto="Interno"
        badgeColor="bg-purple-100 text-purple-800 border-purple-300"
        onVoltar={onVoltar}
        selectedCategory={selectedCategoria}
        setSelectedCategory={setSelectedCategoria}
        selectedPeriod={selectedPeriodo}
        setSelectedPeriod={setSelectedPeriodo}
        selectedMes={selectedMes}
        setSelectedMes={setSelectedMes}
      />

      {/* Filtros Específicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Canal de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {canais.map((canal) => (
                <button
                  key={canal.id}
                  onClick={() => setSelectedCanal(canal.id)}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    selectedCanal === canal.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {canal.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Região</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {regioes.map((regiao) => (
                <button
                  key={regiao.id}
                  onClick={() => setSelectedRegiao(regiao.id)}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    selectedRegiao === regiao.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {regiao.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">
                R$ {(dadosInternos.totais.receita / 1000000).toFixed(1)}M
              </span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18.9%
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">YTD 2025 - Apenas BARRAS</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pink-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Volume Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">
                {(dadosInternos.totais.volume / 1000).toFixed(1)}k kg
              </span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15.2%
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">YTD 2025</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Clientes Diretos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">{dadosInternos.totais.clientes}</span>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Total</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">Clientes ativos</p>
          </CardContent>
        </Card>
      </div>

      {/* Análise 1: Evolução Temporal de Vendas por Canal */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <CardTitle>Análise 1: Evolução Temporal de Vendas por Canal</CardTitle>
            </div>
            <Badge className="bg-purple-100 text-purple-800 border-purple-300">9 meses</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={evolucaoTemporal.evolucao}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                <Legend />
                <Bar dataKey="Distribuidor" fill="#8b5cf6" />
                <Bar dataKey="Atacado" fill="#ec4899" />
                <Bar dataKey="AS" fill="#06b6d4" />
                <Bar dataKey="Doceiro" fill="#10b981" />
                <Bar dataKey="KA" fill="#f59e0b" />
                <Bar dataKey="C&C" fill="#6366f1" />
                <Bar dataKey="HSA" fill="#84cc16" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">💡 Insights</h4>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Canal <strong>Distribuidor</strong> cresceu <strong>{evolucaoTemporal.insights.crescimentoDistribuidor}%</strong> no período</li>
              <li>• Mês com maior venda total: <strong>{evolucaoTemporal.insights.mesComMaiorVenda}</strong> (R$ {(evolucaoTemporal.insights.valorMaiorVenda / 1000).toFixed(0)}k)</li>
              <li>• Tendência de crescimento consistente em todos os canais</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Análise 2: Curva ABC de Produtos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-600" />
              <CardTitle>Análise 2: Curva ABC de Produtos</CardTitle>
            </div>
            <Badge className="bg-purple-100 text-purple-800 border-purple-300">Classificação Automática</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-800">Classe A</span>
                  <Badge className="bg-green-600 text-white">Top 80%</Badge>
                </div>
                <div className="text-2xl font-bold text-green-900">{curvaABC.estatisticas.classeA.quantidade} produtos</div>
                <div className="text-sm text-green-700 mt-1">
                  R$ {(curvaABC.estatisticas.classeA.receita / 1000000).toFixed(2)}M ({curvaABC.estatisticas.classeA.percentual.toFixed(1)}%)
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-yellow-800">Classe B</span>
                  <Badge className="bg-yellow-600 text-white">80-95%</Badge>
                </div>
                <div className="text-2xl font-bold text-yellow-900">{curvaABC.estatisticas.classeB.quantidade} produtos</div>
                <div className="text-sm text-yellow-700 mt-1">
                  R$ {(curvaABC.estatisticas.classeB.receita / 1000000).toFixed(2)}M ({curvaABC.estatisticas.classeB.percentual.toFixed(1)}%)
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-800">Classe C</span>
                  <Badge className="bg-red-600 text-white">95-100%</Badge>
                </div>
                <div className="text-2xl font-bold text-red-900">{curvaABC.estatisticas.classeC.quantidade} produtos</div>
                <div className="text-sm text-red-700 mt-1">
                  R$ {(curvaABC.estatisticas.classeC.receita / 1000000).toFixed(2)}M ({curvaABC.estatisticas.classeC.percentual.toFixed(1)}%)
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabela Top 20 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">#</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Produto</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Receita</th>
                  <th className="text-right p-3 font-semibold text-gray-700">% Individual</th>
                  <th className="text-right p-3 font-semibold text-gray-700">% Acumulado</th>
                  <th className="text-center p-3 font-semibold text-gray-700">Classe</th>
                </tr>
              </thead>
              <tbody>
                {curvaABC.produtos.slice(0, 20).map((produto, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-gray-600">{index + 1}</td>
                    <td className="p-3 font-medium text-gray-900">{produto.nome}</td>
                    <td className="p-3 text-right text-gray-900">R$ {(produto.receita / 1000).toFixed(0)}k</td>
                    <td className="p-3 text-right text-gray-700">{produto.percentual.toFixed(1)}%</td>
                    <td className="p-3 text-right text-gray-700">{produto.acumulado.toFixed(1)}%</td>
                    <td className="p-3 text-center">
                      <Badge className={
                        produto.classe === 'A' ? 'bg-green-100 text-green-800 border-green-300' :
                        produto.classe === 'B' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                        'bg-red-100 text-red-800 border-red-300'
                      }>
                        {produto.classe}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Análise 3: Rentabilidade por Canal */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <CardTitle>Análise 3: Rentabilidade por Canal</CardTitle>
            </div>
            <Badge className="bg-purple-100 text-purple-800 border-purple-300">Margem & Ticket Médio</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Tabela de Rentabilidade */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Canal</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Receita</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Ticket Médio</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Margem</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Lucro Est.</th>
                </tr>
              </thead>
              <tbody>
                {rentabilidade.canais.map((canal, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{canal.canal}</td>
                    <td className="py-3 px-4 text-sm text-right text-gray-700">
                      R$ {(canal.receita / 1000).toFixed(0)}k
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-700">
                      R$ {canal.ticketMedio.toFixed(2)}/kg
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      <Badge className={`${
                        canal.margem >= 30 ? 'bg-green-100 text-green-800 border-green-200' :
                        canal.margem >= 25 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {canal.margem.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-green-700">
                      R$ {(canal.lucro / 1000).toFixed(0)}k
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Insights de Rentabilidade */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-purple-900 mb-2">💡 Insights</h4>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Canal mais rentável: <strong>{rentabilidade.insights.canalMaisRentavel}</strong> (R$ {(rentabilidade.insights.lucroMaisRentavel / 1000).toFixed(0)}k de lucro)</li>
              <li>• Maior ticket médio: <strong>{rentabilidade.insights.canalMaiorTicket}</strong> (R$ {rentabilidade.insights.valorMaiorTicket.toFixed(2)}/kg)</li>
              <li>• Margem média geral: <strong>{rentabilidade.insights.margemMedia.toFixed(1)}%</strong></li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Análise por Canal de Vendas */}
      <Card>
        <CardHeader>
          <CardTitle>Análise por Canal de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">Canal</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Receita (R$)</th>
                  <th className="text-right p-3 font-semibold text-gray-700">% Total</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Volume (kg)</th>
                </tr>
              </thead>
              <tbody>
                {dadosInternos.receita_por_canal.canais.map((canal, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{canal.nome}</td>
                    <td className="p-3 text-right text-gray-900">R$ {(canal.valor / 1000).toFixed(1)}k</td>
                    <td className="p-3 text-right text-gray-700">{canal.percentual.toFixed(1)}%</td>
                    <td className="p-3 text-right text-gray-700">{(canal.volume / 1000).toFixed(1)}k</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Análise por Região */}
      <Card>
        <CardHeader>
          <CardTitle>Análise por Região</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">Região</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Receita (R$)</th>
                  <th className="text-right p-3 font-semibold text-gray-700">% Total</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Volume (kg)</th>
                </tr>
              </thead>
              <tbody>
                {dadosInternos.receita_por_regiao.regioes.map((regiao, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{regiao.nome}</td>
                    <td className="p-3 text-right text-gray-900">R$ {(regiao.valor / 1000).toFixed(1)}k</td>
                    <td className="p-3 text-right text-gray-700">{regiao.percentual.toFixed(1)}%</td>
                    <td className="p-3 text-right text-gray-700">{(regiao.volume / 1000).toFixed(1)}k</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Produtos Mais Vendidos */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Produtos Mais Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">#</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Produto</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Receita (R$)</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Volume (kg)</th>
                </tr>
              </thead>
              <tbody>
                {dadosInternos.top_produtos_vendidos.map((produto, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-gray-600">{index + 1}</td>
                    <td className="p-3 font-medium text-gray-900">{produto.nome}</td>
                    <td className="p-3 text-right text-gray-900">R$ {(produto.receita / 1000).toFixed(1)}k</td>
                    <td className="p-3 text-right text-gray-700">{(produto.volume / 1000).toFixed(1)}k</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Produtos Menos Vendidos */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Produtos Menos Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">#</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Produto</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Receita (R$)</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Volume (kg)</th>
                </tr>
              </thead>
              <tbody>
                {dadosInternos.top_produtos_menos_vendidos.map((produto, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-gray-600">{index + 1}</td>
                    <td className="p-3 font-medium text-gray-900">{produto.nome}</td>
                    <td className="p-3 text-right text-gray-900">R$ {(produto.receita / 1000).toFixed(1)}k</td>
                    <td className="p-3 text-right text-gray-700">{(produto.volume / 1000).toFixed(1)}k</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Card de Insights */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900">💡 Insights Principais</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-purple-800">
            <li>• <strong>Canal Distribuidor</strong> representa {dadosInternos.receita_por_canal.canais[0]?.percentual.toFixed(1)}% da receita total</li>
            <li>• <strong>Região Norte</strong> concentra {dadosInternos.receita_por_regiao.regioes[0]?.percentual.toFixed(1)}% das vendas</li>
            <li>• <strong>Top 3 produtos</strong> geram {curvaABC.produtos.slice(0, 3).reduce((sum, p) => sum + p.percentual, 0).toFixed(1)}% da receita</li>
            <li>• <strong>Apenas produtos de BARRAS</strong> (BC NUTRY, BN NUTRY, BF NUTRY, NUTRY)</li>
            <li>• <strong>Crescimento consistente</strong> em todos os canais ao longo de 9 meses</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
