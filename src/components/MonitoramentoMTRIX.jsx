import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import { getMtrixSummary } from '../data/mtrixDataReal';

export default function MonitoramentoMTRIX({ onVoltar }) {
  const [selectedCategoria, setSelectedCategoria] = useState('total');
  const [selectedPeriodo, setSelectedPeriodo] = useState('mes');
  const [selectedMes, setSelectedMes] = useState('agosto');
  const [selectedUF, setSelectedUF] = useState('todas');

  const dadosMTRIX = getMtrixSummary();

  const ufs = [
    'Todas', 'SP', 'RJ', 'MG', 'ES', 'PR', 'SC', 'RS', 'BA', 'CE', 'PE',
    'RN', 'PB', 'AL', 'SE', 'MA', 'PI', 'GO', 'DF', 'MT', 'MS', 'AM',
    'PA', 'RO', 'AC', 'RR', 'AP', 'TO'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-6 text-white">
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
          <MapPin className="w-8 h-8" />
          <h2 className="text-3xl font-bold">MTRIX - Distribuição & Cobertura</h2>
        </div>
        <p className="text-green-100">Análise de distribuidores e cobertura geográfica nacional</p>
      </div>

      {/* Filtros */}
      <FiltrosMonitoramento
        titulo="MTRIX - Distribuição & Cobertura"
        subtitulo="Análise de distribuidores e cobertura geográfica"
        badgeTexto="MTRIX"
        badgeColor="bg-green-100 text-green-800 border-green-300"
        onVoltar={onVoltar}
        selectedCategory={selectedCategoria}
        setSelectedCategory={setSelectedCategoria}
        selectedPeriod={selectedPeriodo}
        setSelectedPeriod={setSelectedPeriodo}
        selectedMes={selectedMes}
        setSelectedMes={setSelectedMes}
      />

      {/* Filtro UF */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Filtrar por Unidade Federativa</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={selectedUF}
            onChange={(e) => setSelectedUF(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700"
          >
            {ufs.map((uf) => (
              <option key={uf} value={uf.toLowerCase()}>
                {uf}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">
                R$ {(dadosMTRIX.totalVendas / 1000000).toFixed(1)}M
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Dados MTRIX consolidados</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Distribuidores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">{dadosMTRIX.totalDistribuidores}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Parceiros ativos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Cobertura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">{dadosMTRIX.totalUFs}</span>
              <Badge className="bg-green-100 text-green-800">UFs</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">Unidades federativas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Categorias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">{dadosMTRIX.totalCategorias}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Tipos de produtos</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Distribuidores */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Distribuidores</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Principais parceiros de distribuição por receita</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Distribuidor</th>
                  <th className="text-right py-3 px-4 font-semibold text-green-600">Receita</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">% Total</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">UF</th>
                </tr>
              </thead>
              <tbody>
                {dadosMTRIX.topDistribuidores.slice(0, 10).map((dist, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-gray-500">#{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{dist.nome}</td>
                    <td className="text-right py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
                        R$ {(dist.receita / 1000).toFixed(1)}k
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-gray-700">{dist.percentual.toFixed(1)}%</td>
                    <td className="text-center py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800">{dist.uf}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Categoria</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Receita por tipo de produto</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dadosMTRIX.porCategoria.map((cat, index) => {
              const percentual = (cat.receita / dadosMTRIX.totalVendas * 100);
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
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all"
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
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <MapPin className="w-5 h-5" />
            Insights Principais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span className="text-gray-700">
                Receita total de <strong>R$ {(dadosMTRIX.totalVendas / 1000000).toFixed(1)}M</strong> via MTRIX
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span className="text-gray-700">
                Rede de <strong>{dadosMTRIX.totalDistribuidores} distribuidores</strong> em {dadosMTRIX.totalUFs} UFs
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span className="text-gray-700">
                Top distribuidor: <strong>{dadosMTRIX.topDistribuidores[0].nome}</strong> ({dadosMTRIX.topDistribuidores[0].uf})
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
