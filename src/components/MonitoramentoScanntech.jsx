import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

const MonitoramentoScanntech = ({
  onVoltar
}) => {
  return (
    <div className="space-y-6">
      {/* Botão Voltar */}
      <Button
        onClick={onVoltar}
        variant="outline"
        className="flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar</span>
      </Button>

      {/* Título */}
      <Card>
        <CardHeader>
          <CardTitle>Scanntech - Mercado Total & Concorrência</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Análise detalhada do mercado total de barras.</p>
          <p className="mt-4 text-2xl font-bold">R$ 159.2M</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoramentoScanntech;
