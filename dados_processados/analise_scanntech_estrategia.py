#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Análise Estratégica Scanntech
ROI, Precificação Regional e Focos de Crescimento
"""

import pandas as pd
import json
from pathlib import Path

# Carregar dados Scanntech
scanntech_file = Path('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/scanntech_data.xls')
df = pd.read_excel(scanntech_file)

print("=" * 80)
print("ANÁLISE ESTRATÉGICA SCANNTECH")
print("=" * 80)
print(f"Total de registros: {len(df):,}")

# Renomear colunas para facilitar
df.columns = ['RegCanal', 'Periodo', 'SKU', 'KPI3', 'KPI4', 'PriceIndex', 'Share']

# Converter para numérico
df['Share'] = pd.to_numeric(df['Share'], errors='coerce')
df['PriceIndex'] = pd.to_numeric(df['PriceIndex'], errors='coerce')

# Filtrar apenas Nutrimental
df_nutry = df[df['SKU'].str.contains('NUTRY|ALLNUTRI', case=False, na=False)].copy()
print(f"Registros Nutrimental: {len(df_nutry):,}")

# Extrair região do RegCanal (CO, NE, NO, SE, SU)
df_nutry['Regiao'] = df_nutry['RegCanal'].str[:2]

# Mapear regiões
regiao_map = {
    'CO': 'Centro-Oeste',
    'NE': 'Nordeste', 
    'NO': 'Norte',
    'SE': 'Sudeste',
    'SU': 'Sul'
}
df_nutry['RegiaoNome'] = df_nutry['Regiao'].map(regiao_map)

# Categorizar produtos
def categorizar(sku):
    sku_lower = str(sku).lower()
    if 'protein' in sku_lower or 'proteína' in sku_lower:
        return 'Proteína'
    elif 'castanha' in sku_lower or 'amendoim' in sku_lower or 'avelã' in sku_lower:
        return 'Nuts'
    elif 'frutas' in sku_lower or 'morango' in sku_lower or 'banana' in sku_lower:
        return 'Frutas'
    else:
        return 'Cereais'

df_nutry['Categoria'] = df_nutry['SKU'].apply(categorizar)

# ===== 1. ANÁLISE POR REGIÃO =====
print("\n" + "=" * 80)
print("1. PERFORMANCE POR REGIÃO")
print("=" * 80)

regiao_stats = df_nutry.groupby('RegiaoNome').agg({
    'Share': ['mean', 'std', 'min', 'max'],
    'PriceIndex': ['mean', 'std', 'min', 'max'],
    'SKU': 'nunique'
}).round(2)

regiao_stats.columns = ['Share_Medio', 'Share_DP', 'Share_Min', 'Share_Max',
                        'Price_Medio', 'Price_DP', 'Price_Min', 'Price_Max', 'SKUs_Unicos']

regiao_stats = regiao_stats.sort_values('Share_Medio', ascending=False)
print(regiao_stats.to_string())

# ===== 2. PRECIFICAÇÃO POR CATEGORIA E REGIÃO =====
print("\n" + "=" * 80)
print("2. PRECIFICAÇÃO POR CATEGORIA E REGIÃO")
print("=" * 80)

pricing_matrix = df_nutry.groupby(['RegiaoNome', 'Categoria'])['PriceIndex'].mean().round(2).unstack(fill_value=0)
print(pricing_matrix.to_string())

# ===== 3. SHARE POR CATEGORIA E REGIÃO =====
print("\n" + "=" * 80)
print("3. SHARE POR CATEGORIA E REGIÃO (%)")
print("=" * 80)

share_matrix = df_nutry.groupby(['RegiaoNome', 'Categoria'])['Share'].mean().round(2).unstack(fill_value=0)
print(share_matrix.to_string())

# ===== 4. OPORTUNIDADES DE CRESCIMENTO POR REGIÃO =====
print("\n" + "=" * 80)
print("4. OPORTUNIDADES DE CRESCIMENTO POR REGIÃO")
print("=" * 80)

# Calcular score de oportunidade
oportunidades = regiao_stats.copy()

# Normalizar scores (0-100)
oportunidades['Score_Share'] = (oportunidades['Share_Medio'] / oportunidades['Share_Medio'].max() * 100).round(2)
oportunidades['Score_Price'] = (oportunidades['Price_Medio'] / oportunidades['Price_Medio'].max() * 100).round(2)
oportunidades['Score_Variedade'] = (oportunidades['SKUs_Unicos'] / oportunidades['SKUs_Unicos'].max() * 100).round(2)

# Score de oportunidade: regiões com share baixo mas price alto = oportunidade
oportunidades['Score_Oportunidade'] = (
    (100 - oportunidades['Score_Share']) * 0.4 +  # Share baixo = oportunidade
    oportunidades['Score_Price'] * 0.3 +          # Preço alto = poder de compra
    (100 - oportunidades['Score_Variedade']) * 0.3 # Variedade baixa = espaço para crescer
).round(2)

oportunidades = oportunidades.sort_values('Score_Oportunidade', ascending=False)
print(oportunidades[['Share_Medio', 'Price_Medio', 'SKUs_Unicos', 'Score_Oportunidade']].to_string())

# ===== 5. TOP SKUs POR REGIÃO =====
print("\n" + "=" * 80)
print("5. TOP 3 SKUs POR REGIÃO (por Share)")
print("=" * 80)

top_skus_regiao = {}
for regiao in df_nutry['RegiaoNome'].unique():
    if pd.notna(regiao):
        top = df_nutry[df_nutry['RegiaoNome'] == regiao].groupby('SKU')['Share'].mean().sort_values(ascending=False).head(3)
        top_skus_regiao[regiao] = top.to_dict()
        print(f"\n{regiao}:")
        for sku, share in top.items():
            print(f"  - {sku[:50]}: {share:.2f}%")

# ===== 6. ANÁLISE TEMPORAL =====
print("\n" + "=" * 80)
print("6. EVOLUÇÃO TEMPORAL (Primeiros e Últimos 3 Meses)")
print("=" * 80)

df_nutry_sorted = df_nutry.sort_values('Periodo')
periodos_unicos = df_nutry_sorted['Periodo'].unique()

if len(periodos_unicos) >= 6:
    primeiros_3 = periodos_unicos[:3]
    ultimos_3 = periodos_unicos[-3:]
    
    inicio = df_nutry[df_nutry['Periodo'].isin(primeiros_3)].agg({
        'Share': 'mean',
        'PriceIndex': 'mean'
    })
    
    fim = df_nutry[df_nutry['Periodo'].isin(ultimos_3)].agg({
        'Share': 'mean',
        'PriceIndex': 'mean'
    })
    
    print(f"Início (3 primeiros meses):")
    print(f"  Share Médio: {inicio['Share']:.2f}%")
    print(f"  Price Index Médio: R$ {inicio['PriceIndex']:.2f}")
    
    print(f"\nFim (3 últimos meses):")
    print(f"  Share Médio: {fim['Share']:.2f}%")
    print(f"  Price Index Médio: R$ {fim['PriceIndex']:.2f}")
    
    print(f"\nCrescimento:")
    print(f"  Share: {((fim['Share'] - inicio['Share']) / inicio['Share'] * 100):.1f}%")
    print(f"  Price Index: {((fim['PriceIndex'] - inicio['PriceIndex']) / inicio['PriceIndex'] * 100):.1f}%")

# ===== 7. SALVAR RESULTADOS =====
print("\n" + "=" * 80)
print("7. SALVANDO RESULTADOS")
print("=" * 80)

resultados = {
    'performance_regiao': regiao_stats.to_dict('index'),
    'pricing_matrix': pricing_matrix.to_dict('index'),
    'share_matrix': share_matrix.to_dict('index'),
    'oportunidades_regiao': oportunidades[['Share_Medio', 'Price_Medio', 'SKUs_Unicos', 'Score_Oportunidade']].to_dict('index'),
    'top_skus_regiao': top_skus_regiao,
    'resumo': {
        'total_registros': len(df_nutry),
        'regioes': int(df_nutry['RegiaoNome'].nunique()),
        'skus_unicos': int(df_nutry['SKU'].nunique()),
        'share_medio_geral': float(df_nutry['Share'].mean()),
        'price_index_medio_geral': float(df_nutry['PriceIndex'].mean()),
        'periodo_inicio': str(periodos_unicos[0]) if len(periodos_unicos) > 0 else None,
        'periodo_fim': str(periodos_unicos[-1]) if len(periodos_unicos) > 0 else None
    }
}

output_file = Path('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/analise_estrategia_scanntech.json')
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(resultados, f, ensure_ascii=False, indent=2)

print(f"✅ Resultados salvos em: {output_file}")
print("\n" + "=" * 80)
print("ANÁLISE CONCLUÍDA!")
print("=" * 80)
