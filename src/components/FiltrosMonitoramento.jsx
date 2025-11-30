import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Filter } from 'lucide-react';
import { getPeriodoLegenda, meses } from '../utils/periodHelpers';

const FiltrosMonitoramento = ({
  titulo,
  subtitulo,
  badgeTexto,
  badgeColor = 'bg-cyan-100 text-cyan-800 border-cyan-300',
  onVoltar,
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
  selectedMes,
  setSelectedMes,
  periodoLegenda,
  children // Filtros adicionais específicos do submódulo
}) => {
  const categorias = [
    { id: 'total', label: 'TOTAL' },
    { id: 'cereais', label: 'CEREAIS' },
    { id: 'frutas', label: 'FRUTAS' },
    { id: 'nuts', label: 'NUTS' },
    { id: 'proteina', label: 'PROTEÍNA' }
  ];

  const periodos = [
    { 
      id: 'mes_yoy', 
      label: 'Mês Atual vs Ano Anterior', 
      desc: getPeriodoLegenda('mes_yoy', selectedMes, 2025).curto,
      detail: getPeriodoLegenda('mes_yoy', selectedMes, 2025).descricao
    },
    { 
      id: 'trimestre_yoy', 
      label: 'Trimestre Atual vs Ano Anterior', 
      desc: getPeriodoLegenda('trimestre_yoy', selectedMes, 2025).curto,
      detail: getPeriodoLegenda('trimestre_yoy', selectedMes, 2025).descricao
    },
    { 
      id: 'ytd_yoy', 
      label: 'YTD vs Mesmo Período Ano Anterior', 
      desc: getPeriodoLegenda('ytd_yoy', selectedMes, 2025).curto,
      detail: getPeriodoLegenda('ytd_yoy', selectedMes, 2025).descricao
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header com Voltar */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={onVoltar}
          className="hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Badge className={`${badgeColor} text-sm px-3 py-1`}>
          {badgeTexto}
        </Badge>
      </div>

      {/* Card de Filtros */}
      <Card className="border-2 border-slate-200 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-cyan-500" />
                <span>{titulo}</span>
              </CardTitle>
              <CardDescription className="mt-1">{subtitulo}</CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
              {periodoLegenda.curto}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filtro de Categoria */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Categoria de Barras</h4>
            <div className="flex flex-wrap gap-2">
              {categorias.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                  className={`${selectedCategory === category.id ? 'bg-cyan-500 text-white border-cyan-600' : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-300 hover:bg-slate-50'}`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Filtro de Período */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Período de Comparação</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {periodos.map((period) => (
                <Button
                  key={period.id}
                  variant={selectedPeriod === period.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`flex flex-col h-auto py-2 px-3 ${selectedPeriod === period.id ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-300 hover:bg-slate-50'}`}
                >
                  <span className="font-semibold text-xs mb-0.5">{period.label}</span>
                  <span className="text-xs opacity-80">{period.desc}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Seletor de Mês */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Mês de Referência</h4>
            <select
              value={selectedMes}
              onChange={(e) => setSelectedMes(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-slate-700"
            >
              {meses.map((mes) => (
                <option key={mes.id} value={mes.id}>
                  {mes.nome} 2025
                </option>
              ))}
            </select>
          </div>

          {/* Filtros Adicionais Específicos */}
          {children && (
            <div className="pt-4 border-t border-slate-200">
              {children}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FiltrosMonitoramento;
