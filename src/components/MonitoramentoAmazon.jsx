import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import { getAmazonSummary } from '../data/amazonDataReal';

export default function MonitoramentoAmazon({ onVoltar }) {
  const [selectedCategoria, setSelectedCategoria] = useState('total');
  const [selectedPeriodo, setSelectedPeriodo] = useState('mes');
  const [selectedMes, setSelectedMes] = useState('agosto');

  const dadosAmazon = getAmazonSummary();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg p-6 text-white">
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
          <ShoppingCart className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Amazon - E-commerce & Digital</h2>
        </div>
        <p className="text-orange-100">Análise de vendas no marketplace Amazon Brasil</p>
      </div>

      {/* Filtros */}
      <FiltrosMonitoramento
        titulo="Amazon - E-commerce & Digital"
        subtitulo="Análise de vendas no marketplace Amazon"
        badgeTexto="Amazon"
        badgeColor="bg-orange-100 text-orange-800 border-orange-300"
        onVoltar={onVoltar}
        selectedCategory={selectedCategoria}
        setSelectedCategory={setSelectedCategoria}
        selectedPeriod={selectedPeriodo}
        setSelectedPeriod={setSelectedPeriodo}
        selectedMes={selectedMes}
        setSelectedMes={setSelectedMes}
      />

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">
                R$ {(dadosAmazon.receitaTotal / 1000000).toFixed(1)}M
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Vendas Amazon consolidadas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Unidades Vendidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">
                {(dadosAmazon.unidadesTotal / 1000).toFixed(1)}k
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Total de produtos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">
                R$ {dadosAmazon.ticketMedio.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Por unidade vendida</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Avaliação Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                {dadosAmazon.avaliacaoMedia.toFixed(1)}
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Satisfação dos clientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Produtos Mais Vendidos</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Ranking por receita na Amazon</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Produto</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Categoria</th>
                  <th className="text-right py-3 px-4 font-semibold text-orange-600">Receita</th>
                  <th className="text-right py-3 px-4 font-semibold text-blue-600">Unidades</th>
                  <th className="text-center py-3 px-4 font-semibold text-yellow-600">Avaliação</th>
                </tr>
              </thead>
              <tbody>
                {dadosAmazon.topProdutos.slice(0, 10).map((produto, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-gray-500">#{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{produto.nome}</td>
                    <td className="text-center py-3 px-4">
                      <Badge className="bg-purple-100 text-purple-800">{produto.categoria}</Badge>
                    </td>
                    <td className="text-right py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-semibold">
                        R$ {(produto.receita / 1000).toFixed(1)}k
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-gray-700">{produto.unidades.toLocaleString('pt-BR')}</td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-gray-900">{produto.avaliacao.toFixed(1)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Categoria</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Receita por tipo de barra nutricional</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dadosAmazon.porCategoria.map((cat, index) => {
              const percentual = (cat.receita / dadosAmazon.receitaTotal * 100);
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{cat.categoria}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      R$ {(cat.receita / 1000).toFixed(1)}k ({percentual.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-amber-500 h-3 rounded-full transition-all"
                      style={{ width: `${percentual}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-900">
            <TrendingUp className="w-5 h-5" />
            Insights Principais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span className="text-gray-700">
                Receita total de <strong>R$ {(dadosAmazon.receitaTotal / 1000000).toFixed(1)}M</strong> via Amazon
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span className="text-gray-700">
                Ticket médio de <strong>R$ {dadosAmazon.ticketMedio.toFixed(2)}</strong> por unidade
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span className="text-gray-700">
                Avaliação média de <strong>{dadosAmazon.avaliacaoMedia.toFixed(1)} estrelas</strong> - excelente satisfação
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span className="text-gray-700">
                Produto mais vendido: <strong>{dadosAmazon.topProdutos[0].nome}</strong>
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
