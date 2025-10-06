// Módulo de Validação de Dados Geográficos para AIAAS Nutrimental

/**
 * Validador de dados geográficos com sistema de semáforo
 * Verde (95-100%): Dados validados e confiáveis
 * Amarelo (85-94%): Pequenas inconsistências que requerem atenção
 * Vermelho (<85%): Dados que exigem revisão manual urgente
 */

export class ValidadorGeografico {
  constructor() {
    this.thresholds = {
      verde: 95,
      amarelo: 85,
      vermelho: 0
    };
    
    this.estadosValidos = [
      'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
      'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
      'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];
    
    this.regioes = {
      'Norte': ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
      'Nordeste': ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
      'Centro-Oeste': ['DF', 'GO', 'MT', 'MS'],
      'Sudeste': ['ES', 'MG', 'RJ', 'SP'],
      'Sul': ['PR', 'RS', 'SC']
    };
  }

  /**
   * Valida dados de market share por estado
   */
  validarDadosEstados(dadosEstados) {
    const resultados = {
      score: 0,
      status: 'vermelho',
      alertas: [],
      inconsistencias: [],
      recomendacoes: [],
      detalhes: {}
    };

    let pontuacaoTotal = 0;
    let verificacoesRealizadas = 0;

    // 1. Verificação de Estados Válidos
    const estadosInvalidos = Object.keys(dadosEstados).filter(
      estado => !this.estadosValidos.includes(estado)
    );
    
    if (estadosInvalidos.length === 0) {
      pontuacaoTotal += 10;
    } else {
      resultados.inconsistencias.push({
        tipo: 'Estados Inválidos',
        detalhes: `Estados não reconhecidos: ${estadosInvalidos.join(', ')}`,
        severidade: 'alta'
      });
    }
    verificacoesRealizadas++;

    // 2. Verificação de Completude de Dados
    const camposObrigatorios = ['nome', 'share', 'vendas', 'densidade', 'regiao', 'status'];
    let dadosCompletos = 0;
    
    Object.entries(dadosEstados).forEach(([codigo, dados]) => {
      const camposFaltantes = camposObrigatorios.filter(campo => 
        dados[campo] === undefined || dados[campo] === null || dados[campo] === ''
      );
      
      if (camposFaltantes.length === 0) {
        dadosCompletos++;
      } else {
        resultados.inconsistencias.push({
          tipo: 'Dados Incompletos',
          detalhes: `${codigo}: campos faltantes - ${camposFaltantes.join(', ')}`,
          severidade: 'media'
        });
      }
    });
    
    const percentualCompleto = (dadosCompletos / Object.keys(dadosEstados).length) * 100;
    pontuacaoTotal += (percentualCompleto / 100) * 15;
    verificacoesRealizadas++;

    // 3. Verificação de Consistência de Market Share
    const totalShare = Object.values(dadosEstados).reduce((sum, estado) => sum + estado.share, 0);
    
    if (totalShare >= 95 && totalShare <= 105) {
      pontuacaoTotal += 15;
    } else if (totalShare >= 90 && totalShare <= 110) {
      pontuacaoTotal += 10;
      resultados.alertas.push({
        tipo: 'Market Share Total',
        mensagem: `Total de ${totalShare.toFixed(1)}% pode indicar sobreposição ou dados faltantes`,
        severidade: 'media'
      });
    } else {
      resultados.inconsistencias.push({
        tipo: 'Market Share Inconsistente',
        detalhes: `Total de ${totalShare.toFixed(1)}% está fora do esperado (95-105%)`,
        severidade: 'alta'
      });
    }
    verificacoesRealizadas++;

    // 4. Verificação de Outliers em Densidade
    const densidades = Object.values(dadosEstados).map(estado => estado.densidade);
    const mediaDensidade = densidades.reduce((a, b) => a + b, 0) / densidades.length;
    const desvioPadrao = Math.sqrt(
      densidades.reduce((sum, densidade) => sum + Math.pow(densidade - mediaDensidade, 2), 0) / densidades.length
    );
    
    let outliersDetectados = 0;
    Object.entries(dadosEstados).forEach(([codigo, dados]) => {
      const zScore = Math.abs((dados.densidade - mediaDensidade) / desvioPadrao);
      if (zScore > 2) {
        outliersDetectados++;
        resultados.alertas.push({
          tipo: 'Outlier de Densidade',
          mensagem: `${codigo}: densidade ${dados.densidade} muito diferente da média (${mediaDensidade.toFixed(1)})`,
          severidade: 'baixa'
        });
      }
    });
    
    if (outliersDetectados <= 2) {
      pontuacaoTotal += 10;
    } else {
      pontuacaoTotal += 5;
    }
    verificacoesRealizadas++;

    // 5. Verificação de Coerência Regional
    let coerenciaRegional = 0;
    Object.entries(this.regioes).forEach(([nomeRegiao, estadosRegiao]) => {
      const estadosComDados = estadosRegiao.filter(estado => dadosEstados[estado]);
      const sharesRegiao = estadosComDados.map(estado => dadosEstados[estado].share);
      
      if (sharesRegiao.length > 0) {
        const shareTotal = sharesRegiao.reduce((a, b) => a + b, 0);
        const densidadeMedia = estadosComDados.reduce((sum, estado) => 
          sum + dadosEstados[estado].densidade, 0) / estadosComDados.length;
        
        // Verificar se a região tem dados coerentes
        if (shareTotal > 0 && densidadeMedia > 0) {
          coerenciaRegional++;
        }
      }
    });
    
    pontuacaoTotal += (coerenciaRegional / 5) * 15;
    verificacoesRealizadas++;

    // 6. Verificação de Padrões Históricos (simulado)
    const estadosComCrescimento = Object.entries(dadosEstados).filter(([codigo, dados]) => 
      dados.share > 1 && dados.densidade > 10
    ).length;
    
    if (estadosComCrescimento >= 3) {
      pontuacaoTotal += 10;
    } else {
      resultados.alertas.push({
        tipo: 'Poucos Estados Performantes',
        mensagem: `Apenas ${estadosComCrescimento} estados com performance significativa`,
        severidade: 'media'
      });
      pontuacaoTotal += 5;
    }
    verificacoesRealizadas++;

    // 7. Verificação de Estados Críticos
    const estadosCriticos = Object.entries(dadosEstados).filter(([codigo, dados]) => 
      dados.status === 'Crítico'
    );
    
    if (estadosCriticos.length <= 5) {
      pontuacaoTotal += 10;
    } else {
      resultados.alertas.push({
        tipo: 'Muitos Estados Críticos',
        mensagem: `${estadosCriticos.length} estados em situação crítica`,
        severidade: 'alta'
      });
      pontuacaoTotal += 3;
    }
    verificacoesRealizadas++;

    // 8. Verificação de Distribuição Geográfica
    const regioesCoberturas = Object.keys(this.regioes).filter(regiao => 
      this.regioes[regiao].some(estado => dadosEstados[estado] && dadosEstados[estado].share > 0)
    );
    
    if (regioesCoberturas.length >= 4) {
      pontuacaoTotal += 15;
    } else if (regioesCoberturas.length >= 3) {
      pontuacaoTotal += 10;
      resultados.alertas.push({
        tipo: 'Cobertura Geográfica Limitada',
        mensagem: `Presença em apenas ${regioesCoberturas.length} de 5 regiões`,
        severidade: 'media'
      });
    } else {
      resultados.inconsistencias.push({
        tipo: 'Cobertura Geográfica Insuficiente',
        detalhes: `Presença em apenas ${regioesCoberturas.length} regiões`,
        severidade: 'alta'
      });
      pontuacaoTotal += 5;
    }
    verificacoesRealizadas++;

    // Calcular score final
    resultados.score = Math.round((pontuacaoTotal / (verificacoesRealizadas * 10)) * 100);
    
    // Determinar status baseado no score
    if (resultados.score >= this.thresholds.verde) {
      resultados.status = 'verde';
    } else if (resultados.score >= this.thresholds.amarelo) {
      resultados.status = 'amarelo';
    } else {
      resultados.status = 'vermelho';
    }

    // Gerar recomendações baseadas nos problemas encontrados
    this.gerarRecomendacoes(resultados);

    // Adicionar detalhes da validação
    resultados.detalhes = {
      verificacoesRealizadas,
      pontuacaoMaxima: verificacoesRealizadas * 10,
      pontuacaoObtida: pontuacaoTotal,
      percentualValidacao: resultados.score,
      timestamp: new Date().toISOString()
    };

    return resultados;
  }

  /**
   * Gera recomendações baseadas nos problemas identificados
   */
  gerarRecomendacoes(resultados) {
    if (resultados.inconsistencias.length > 0) {
      resultados.recomendacoes.push({
        prioridade: 'Alta',
        acao: 'Corrigir Inconsistências',
        detalhes: 'Revisar e corrigir os dados identificados como inconsistentes',
        prazo: '24 horas'
      });
    }

    if (resultados.alertas.filter(a => a.severidade === 'alta').length > 0) {
      resultados.recomendacoes.push({
        prioridade: 'Alta',
        acao: 'Investigar Alertas Críticos',
        detalhes: 'Analisar e resolver alertas de alta severidade',
        prazo: '48 horas'
      });
    }

    if (resultados.score < this.thresholds.amarelo) {
      resultados.recomendacoes.push({
        prioridade: 'Crítica',
        acao: 'Revisão Manual Completa',
        detalhes: 'Dados requerem revisão manual urgente antes do uso',
        prazo: 'Imediato'
      });
    }

    if (resultados.alertas.some(a => a.tipo === 'Cobertura Geográfica Limitada')) {
      resultados.recomendacoes.push({
        prioridade: 'Média',
        acao: 'Expandir Cobertura Geográfica',
        detalhes: 'Considerar estratégias para aumentar presença em regiões não cobertas',
        prazo: '30 dias'
      });
    }
  }

  /**
   * Valida dados em tempo real durante a entrada
   */
  validarEntradaDados(estado, dados) {
    const erros = [];
    const avisos = [];

    // Validar código do estado
    if (!this.estadosValidos.includes(estado)) {
      erros.push(`Código de estado inválido: ${estado}`);
    }

    // Validar market share
    if (dados.share < 0 || dados.share > 100) {
      erros.push('Market share deve estar entre 0 e 100%');
    }

    // Validar vendas
    if (dados.vendas < 0) {
      erros.push('Vendas não podem ser negativas');
    }

    // Validar densidade
    if (dados.densidade < 0) {
      erros.push('Densidade não pode ser negativa');
    }

    // Avisos para valores suspeitos
    if (dados.share > 50) {
      avisos.push('Market share muito alto - verificar se está correto');
    }

    if (dados.densidade > 100) {
      avisos.push('Densidade muito alta - verificar cálculo');
    }

    return { erros, avisos };
  }

  /**
   * Gera relatório de qualidade dos dados
   */
  gerarRelatorioQualidade(resultadosValidacao) {
    const relatorio = {
      resumo: {
        status: resultadosValidacao.status,
        score: resultadosValidacao.score,
        nivel: this.getNivelQualidade(resultadosValidacao.score)
      },
      problemas: {
        criticos: resultadosValidacao.inconsistencias.filter(i => i.severidade === 'alta').length,
        medios: resultadosValidacao.inconsistencias.filter(i => i.severidade === 'media').length + 
                resultadosValidacao.alertas.filter(a => a.severidade === 'alta').length,
        baixos: resultadosValidacao.alertas.filter(a => a.severidade === 'media' || a.severidade === 'baixa').length
      },
      acoes: {
        imediatas: resultadosValidacao.recomendacoes.filter(r => r.prioridade === 'Crítica').length,
        curto_prazo: resultadosValidacao.recomendacoes.filter(r => r.prioridade === 'Alta').length,
        medio_prazo: resultadosValidacao.recomendacoes.filter(r => r.prioridade === 'Média').length
      },
      timestamp: new Date().toISOString()
    };

    return relatorio;
  }

  getNivelQualidade(score) {
    if (score >= 95) return 'Excelente';
    if (score >= 85) return 'Bom';
    if (score >= 70) return 'Regular';
    return 'Ruim';
  }
}

export default ValidadorGeografico;
