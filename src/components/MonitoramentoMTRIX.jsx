import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import MapaBrasilInterativo from './MapaBrasilInterativo';
import { getMtrixData } from '../data/mtrixData';

const MonitoramentoMTRIX = ({
  onVoltar,
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
  selectedMes,
  setSelectedMes,
  periodoLegenda
}) => {
  const [selectedUF, setSelectedUF] = useState('todas');
  const [selectedMtrixRegion, setSelectedMtrixRegion] = useState('brasil');

  const mtrixData = getMtrixData();

  const ufs = [
    'Todas', 'SP', 'RJ', 'MG', 'ES', 'PR', 'SC', 'RS', 'BA', 'CE', 'PE',
    'RN', 'PB', 'AL', 'SE', 'MA', 'PI', 'GO', 'DF', 'MT', 'MS', 'AM',
    'PA', 'RO', 'AC', 'RR', 'AP', 'TO'
  ];

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <FiltrosMonitoramento
        titulo="MTRIX - Distribuição & Cobertura"
        subtitulo="Análise de distribuidores e cobertura geográfica"
        badgeTexto="MTRIX"
        badgeColor="bg-green-100 text-green-800 border-green-300"
        onVoltar={onVoltar}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedMes={selectedMes}
        setSelectedMes={setSelectedMes}
        periodoLegenda={periodoLegenda}
      >
        {/* Filtro de UF */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Unidade Federativa</h4>
          <select
            value={selectedUF}
            onChange={(e) => setSelectedUF(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-slate-700"
          >
            {ufs.map((uf) => (
              <option key={uf} value={uf.toLowerCase()}>
                {uf}
              </option>
            ))}
          </select>
        </div>
      </FiltrosMonitoramento>

      {/* KPIs MTRIX */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Receita Total</CardDescription>
            <CardTitle className="text-2xl text-green-600">
              R$ {(mtrixData.totais.receita / 1000000).toFixed(1)}M
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Distribuidores</CardDescription>
            <CardTitle className="text-2xl text-blue-600">
              {mtrixData.totais.distribuidores}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Cobertura UFs</CardDescription>
            <CardTitle className="text-2xl text-purple-600">
              {mtrixData.totais.ufs}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Categorias</CardDescription>
            <CardTitle className="text-2xl text-orange-600">
              {mtrixData.totais.categorias}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Mapa do Brasil */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Mapa de Cobertura Nacional</CardTitle>
          <CardDescription>Distribuição geográfica por UF</CardDescription>
        </CardHeader>
        <CardContent>
          <MapaBrasilInterativo
            selectedRegion={selectedMtrixRegion}
            onRegionChange={setSelectedMtrixRegion}
          />
        </CardContent>
      </Card>

      {/* Top Distribuidores */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Top 10 Distribuidores</CardTitle>
          <CardDescription>Principais parceiros de distribuição</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left p-3 text-sm font-semibold text-slate-700">#</th>
                  <th className="text-left p-3 text-sm font-semibold text-slate-700">Distribuidor</th>
                  <th className="text-right p-3 text-sm font-semibold text-slate-700">Receita (R$)</th>
                  <th className="text-right p-3 text-sm font-semibold text-slate-700">% Total</th>
                  <th className="text-center p-3 text-sm font-semibold text-slate-700">UF</th>
                </tr>
              </thead>
              <tbody>
                {mtrixData.topDistribuidores.slice(0, 10).map((dist, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3 text-sm font-semibold text-slate-500">{index + 1}</td>
                    <td className="p-3 text-sm">{dist.nome}</td>
                    <td className="p-3 text-sm text-right font-semibold">
                      R$ {dist.receita.toLocaleString('pt-BR')}
                    </td>
                    <td className="p-3 text-sm text-right">{dist.percentual.toFixed(1)}%</td>
                    <td className="p-3 text-sm text-center">
                      <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
                        {dist.uf}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por Categoria */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Distribuição por Categoria</CardTitle>
          <CardDescription>Receita por tipo de produto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mtrixData.porCategoria.map((cat, index) => {
              const percentual = (cat.receita / mtrixData.totais.receita * 100);
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-32 text-sm font-medium text-slate-700">{cat.categoria}</div>
                  <div className="flex-1">
                    <div className="w-full bg-slate-200 rounded-full h-6 relative">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${percentual}%` }}
                      >
                        <span className="text-xs font-semibold text-white">
                          {percentual.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-32 text-right text-sm font-semibold text-slate-900">
                    R$ {(cat.receita / 1000).toFixed(0)}k
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoramentoMTRIX;
