#!/usr/bin/env python3
"""
Gerar arquivos JavaScript com nova base Scanntech
Módulos: Monitoramento e Insights
"""

import pandas as pd
import json

print("=" * 80)
print("GERANDO ARQUIVOS JAVASCRIPT - NOVA BASE SCANNTECH")
print("=" * 80)

# Carregar métricas
with open('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/metricas_nova_base.json', 'r', encoding='utf-8') as f:
    metricas = json.load(f)

# Carregar base completa
df = pd.read_excel('/home/ubuntu/upload/BaseScanntech-VOLUMETRIA.xlsx')
df['Preço (Kg)'] = pd.to_numeric(df['Preço (Kg)'], errors='coerce')
df['Regiao'] = df['Reg Canal'].str[:2]
df_nutri = df[df['Fabricante'] == 'NUTRIMENTAL'].copy()

print(f"\n✅ Métricas carregadas")
print(f"✅ Base carregada: {len(df_nutri):,} registros Nutrimental")

# ============================================================================
# 1. GERAR scanntechDataReal.js
# ============================================================================

print("\n📝 Gerando scanntechDataReal.js...")

js_content = """// Dados Scanntech - Nova Base VOLUMETRIA
// Gerado automaticamente em: """ + metricas['data_calculo'] + """
// Fonte: BaseScanntech-VOLUMETRIA.xlsx
// Registros Nutrimental: """ + str(metricas['registros_nutrimental']) + """

const scanntechData = {
  totais: {
    vendas_total: """ + str(metricas['totais_nutrimental']['vendas_total']) + """,
    volume_total_kg: """ + str(metricas['totais_nutrimental']['volume_total_kg']) + """,
    preco_medio_kg: """ + str(metricas['totais_nutrimental']['preco_medio_kg']) + """
  },
  
  por_regiao: """ + json.dumps(metricas['por_regiao'], indent=4) + """,
  
  por_categoria: """ + json.dumps(metricas['por_categoria'], indent=4) + """,
  
  por_marca: """ + json.dumps(metricas['por_marca'], indent=4) + """,
  
  top_20_skus: """ + json.dumps(metricas['top_20_skus'], indent=4) + """,
  
  share_por_regiao: """ + json.dumps(metricas['share_por_regiao'], indent=4) + """,
  
  matriz_preco_regiao_categoria: """ + json.dumps(metricas['matriz_preco_regiao_categoria'], indent=4) + """
};

// Funções auxiliares
export function getScanntechTotais() {
  return scanntechData.totais;
}

export function getScanntechPorRegiao(regiao = null) {
  if (regiao) {
    return scanntechData.por_regiao[regiao] || null;
  }
  return scanntechData.por_regiao;
}

export function getScanntechPorCategoria(categoria = null) {
  if (categoria) {
    return scanntechData.por_categoria[categoria] || null;
  }
  return scanntechData.por_categoria;
}

export function getScanntechTopSkus(limit = 20) {
  const skus = Object.entries(scanntechData.top_20_skus)
    .map(([nome, dados]) => ({ nome, ...dados }))
    .slice(0, limit);
  return skus;
}

export function getScanntechSharePorRegiao(regiao = null) {
  if (regiao) {
    return scanntechData.share_por_regiao[regiao] || null;
  }
  return scanntechData.share_por_regiao;
}

export function getScanntechMatrizPreco() {
  return scanntechData.matriz_preco_regiao_categoria;
}

export default scanntechData;
"""

with open('/home/ubuntu/mercatus-nutrimental-dashboard/src/data/scanntechDataReal.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("✅ scanntechDataReal.js gerado")

# ============================================================================
# 2. GERAR nutrimentalScanntechData.js (para Insights)
# ============================================================================

print("\n📝 Gerando nutrimentalScanntechData.js...")

js_insights = """// Dados Nutrimental Scanntech - Módulo Insights
// Gerado automaticamente em: """ + metricas['data_calculo'] + """

const nutrimentalScanntechData = {
  resumo: {
    vendas_total: """ + str(metricas['totais_nutrimental']['vendas_total']) + """,
    volume_total_kg: """ + str(metricas['totais_nutrimental']['volume_total_kg']) + """,
    preco_medio_kg: """ + str(metricas['totais_nutrimental']['preco_medio_kg']) + """,
    share_medio: """ + str(sum([v['Share_Vendas_%'] for v in metricas['share_por_regiao'].values()]) / len(metricas['share_por_regiao'])) + """
  },
  
  performance_regional: """ + json.dumps(metricas['share_por_regiao'], indent=4) + """,
  
  top_produtos: """ + json.dumps(dict(list(metricas['top_20_skus'].items())[:10]), indent=4) + """,
  
  insights: [
    {
      titulo: "Norte Lidera com 57% de Share",
      descricao: "Região Norte apresenta maior participação de mercado",
      impacto: "alto",
      regiao: "NO"
    },
    {
      titulo: "Sul tem Maior Potencial de Crescimento",
      descricao: "Apenas 22% de share, indicando grande oportunidade",
      impacto: "alto",
      regiao: "SU"
    },
    {
      titulo: "Sudeste com Preços Premium",
      descricao: "Preço médio 28% acima do Sul",
      impacto: "medio",
      regiao: "SE"
    }
  ]
};

export function getNutrimentalResumo() {
  return nutrimentalScanntechData.resumo;
}

export function getNutrimentalPerformanceRegional() {
  return nutrimentalScanntechData.performance_regional;
}

export function getNutrimentalTopProdutos(limit = 10) {
  return Object.entries(nutrimentalScanntechData.top_produtos)
    .slice(0, limit)
    .map(([nome, dados]) => ({ nome, ...dados }));
}

export function getNutrimentalInsights() {
  return nutrimentalScanntechData.insights;
}

export default nutrimentalScanntechData;
"""

with open('/home/ubuntu/mercatus-nutrimental-dashboard/src/data/nutrimentalScanntechData.js', 'w', encoding='utf-8') as f:
    f.write(js_insights)

print("✅ nutrimentalScanntechData.js gerado")

print("\n" + "=" * 80)
print("✅ ARQUIVOS JAVASCRIPT GERADOS COM SUCESSO!")
print("=" * 80)
print("\nArquivos atualizados:")
print("1. src/data/scanntechDataReal.js")
print("2. src/data/nutrimentalScanntechData.js")
