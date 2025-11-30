// Helpers para períodos e legendas dinâmicas

export const meses = [
  { id: 1, nome: 'Janeiro', abrev: 'Jan' },
  { id: 2, nome: 'Fevereiro', abrev: 'Fev' },
  { id: 3, nome: 'Março', abrev: 'Mar' },
  { id: 4, nome: 'Abril', abrev: 'Abr' },
  { id: 5, nome: 'Maio', abrev: 'Mai' },
  { id: 6, nome: 'Junho', abrev: 'Jun' },
  { id: 7, nome: 'Julho', abrev: 'Jul' },
  { id: 8, nome: 'Agosto', abrev: 'Ago' },
  { id: 9, nome: 'Setembro', abrev: 'Set' },
  { id: 10, nome: 'Outubro', abrev: 'Out' },
  { id: 11, nome: 'Novembro', abrev: 'Nov' },
  { id: 12, nome: 'Dezembro', abrev: 'Dez' }
];

// Gerar legenda dinâmica baseada no período e mês selecionado
export function getPeriodoLegenda(tipoPeriodo, mesAtual = 8, anoAtual = 2025) {
  const mes = meses.find(m => m.id === mesAtual);
  const mesAbrev = mes?.abrev || 'Ago';
  const mesNome = mes?.nome || 'Agosto';
  const anoAnterior = anoAtual - 1;
  
  switch (tipoPeriodo) {
    case 'mes_yoy':
      return {
        curto: `${mesAbrev}/${anoAtual.toString().slice(-2)} vs ${mesAbrev}/${anoAnterior.toString().slice(-2)}`,
        longo: `${mesNome} ${anoAtual} vs ${mesNome} ${anoAnterior}`,
        descricao: 'Comparação mensal YoY'
      };
      
    case 'trimestre_yoy':
      const mesAnterior2 = meses[(mesAtual - 3 + 12) % 12] || meses[5];
      const mesAnterior1 = meses[(mesAtual - 2 + 12) % 12] || meses[6];
      return {
        curto: `${mesAnterior2.abrev}-${mesAnterior1.abrev}-${mesAbrev}/${anoAtual.toString().slice(-2)} vs ${mesAnterior2.abrev}-${mesAnterior1.abrev}-${mesAbrev}/${anoAnterior.toString().slice(-2)}`,
        longo: `Trimestre ${mesAnterior2.nome}-${mesAnterior1.nome}-${mesNome} ${anoAtual} vs ${anoAnterior}`,
        descricao: 'Comparação trimestral YoY'
      };
      
    case 'ytd_yoy':
      return {
        curto: `Jan-${mesAbrev}/${anoAtual.toString().slice(-2)} vs Jan-${mesAbrev}/${anoAnterior.toString().slice(-2)}`,
        longo: `Janeiro a ${mesNome} ${anoAtual} vs ${anoAnterior}`,
        descricao: 'Acumulado do ano YoY'
      };
      
    case 'mes_anterior':
      const mesAnt = meses[(mesAtual - 2 + 12) % 12] || meses[6];
      return {
        curto: `${mesAbrev}/${anoAtual.toString().slice(-2)} vs ${mesAnt.abrev}/${anoAtual.toString().slice(-2)}`,
        longo: `${mesNome} ${anoAtual} vs ${mesAnt.nome} ${anoAtual}`,
        descricao: 'Comparação mês a mês'
      };
      
    default:
      return {
        curto: `${mesAbrev}/${anoAtual.toString().slice(-2)} vs ${mesAbrev}/${anoAnterior.toString().slice(-2)}`,
        longo: `${mesNome} ${anoAtual} vs ${mesNome} ${anoAnterior}`,
        descricao: 'Comparação mensal YoY'
      };
  }
}

// Obter nome do mês por ID
export function getMesNome(mesId) {
  const mes = meses.find(m => m.id === mesId);
  return mes?.nome || 'Agosto';
}

// Obter abreviação do mês por ID
export function getMesAbrev(mesId) {
  const mes = meses.find(m => m.id === mesId);
  return mes?.abrev || 'Ago';
}
