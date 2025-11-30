import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft } from 'lucide-react';

const MonitoramentoScanntech = ({ onVoltar }) => {
  return (
    <div className="space-y-6">
      <button
        onClick={onVoltar}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Voltar para Visão Geral</span>
      </button>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="text-3xl">Scanntech - Mercado Total & Concorrência</CardTitle>
          <p className="text-white/90 mt-2">Análise detalhada do mercado total de barras</p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Teste de Funcionamento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">✅ Submódulo Scanntech carregado com sucesso!</p>
          <p className="text-sm text-gray-600 mt-2">
            Este é um teste básico para verificar se a navegação está funcionando.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoramentoScanntech;
