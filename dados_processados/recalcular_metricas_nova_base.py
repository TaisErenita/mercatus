#!/usr/bin/env python3
"""
Recalcular Métricas com Nova Base Scanntech
Foco em: Vendas $, Volume (KG), Preço (KG)
"""

import pandas as pd
import numpy as np
import json
from datetime import datetime

print("=" * 80)
print("RECALCULANDO MÉTRICAS - NOVA BASE SCANNTECH")
print("=" * 80)

# Carregar nova base
df = pd.read_excel('/home/ubuntu/upload/BaseScanntech-VOLUMETRIA.xlsx')

# Converter Preço (Kg) para numérico
df['Preço (Kg)'] = pd.to_numeric(df['Preço (Kg)'], errors='coerce')

# Filtrar apenas Nutrimental
df_nutri = df[df['Fabricante'] == 'NUTRIMENTAL'].copy()

print(f"\n📊 Total registros: {len(df):,}")
print(f"📊 Registros Nutrimental: {len(df_nutri):,} ({len(df_nutri)/len(df)*100:.1f}%)")

# ============================================================================
# 1. ANÁLISE POR REGIÃO
# ============================================================================

print("\n" + "=" * 80)
print("1. ANÁLISE POR REGIÃO")
print("=" * 80)

# Extrair região (primeiros 2 caracteres de Reg Canal)
df_nutri['Regiao'] = df_nutri['Reg Canal'].str[:2]

por_regiao = df_nutri.groupby('Regiao').agg({
    'Vendas $': 'sum',
    'Volume (Kg)': 'sum',
    'Preço (Kg)': 'mean'
}).round(2)

por_regiao['Preco_Medio'] = (por_regiao['Vendas $'] / por_regiao['Volume (Kg)']).round(2)
por_regiao = por_regiao.sort_values('Vendas $', ascending=False)

print("\n📊 VENDAS E VOLUME POR REGIÃO:")
print(por_regiao.to_string())

# ============================================================================
# 2. ANÁLISE POR CATEGORIA
# ============================================================================

print("\n" + "=" * 80)
print("2. ANÁLISE POR CATEGORIA")
print("=" * 80)

por_categoria = df_nutri.groupby('Categoria Nutrimental').agg({
    'Vendas $': 'sum',
    'Volume (Kg)': 'sum',
    'Preço (Kg)': 'mean'
}).round(2)

por_categoria['Preco_Medio'] = (por_categoria['Vendas $'] / por_categoria['Volume (Kg)']).round(2)
por_categoria = por_categoria.sort_values('Vendas $', ascending=False)

print("\n📊 VENDAS E VOLUME POR CATEGORIA:")
print(por_categoria.to_string())

# ============================================================================
# 3. ANÁLISE POR MARCA
# ============================================================================

print("\n" + "=" * 80)
print("3. ANÁLISE POR MARCA NUTRIMENTAL")
print("=" * 80)

por_marca = df_nutri.groupby('Marca').agg({
    'Vendas $': 'sum',
    'Volume (Kg)': 'sum',
    'Preço (Kg)': 'mean'
}).round(2)

por_marca['Preco_Medio'] = (por_marca['Vendas $'] / por_marca['Volume (Kg)']).round(2)
por_marca = por_marca.sort_values('Vendas $', ascending=False)

print("\n📊 VENDAS E VOLUME POR MARCA:")
print(por_marca.to_string())

# ============================================================================
# 4. ANÁLISE TEMPORAL
# ============================================================================

print("\n" + "=" * 80)
print("4. ANÁLISE TEMPORAL")
print("=" * 80)

por_mes = df_nutri.groupby('Mês de Data Campo').agg({
    'Vendas $': 'sum',
    'Volume (Kg)': 'sum',
    'Preço (Kg)': 'mean'
}).round(2)

por_mes['Preco_Medio'] = (por_mes['Vendas $'] / por_mes['Volume (Kg)']).round(2)

print("\n📊 VENDAS E VOLUME POR MÊS:")
print(por_mes.to_string())

# ============================================================================
# 5. TOP SKUs
# ============================================================================

print("\n" + "=" * 80)
print("5. TOP 20 SKUs NUTRIMENTAL")
print("=" * 80)

por_sku = df_nutri.groupby('Visão SKU Player + outros').agg({
    'Vendas $': 'sum',
    'Volume (Kg)': 'sum',
    'Preço (Kg)': 'mean'
}).round(2)

por_sku['Preco_Medio'] = (por_sku['Vendas $'] / por_sku['Volume (Kg)']).round(2)
por_sku = por_sku.sort_values('Vendas $', ascending=False).head(20)

print("\n📊 TOP 20 SKUs:")
print(por_sku.to_string())

# ============================================================================
# 6. ANÁLISE REGIÃO x CATEGORIA
# ============================================================================

print("\n" + "=" * 80)
print("6. MATRIZ REGIÃO x CATEGORIA")
print("=" * 80)

matriz_regiao_cat = df_nutri.pivot_table(
    values='Preço (Kg)',
    index='Regiao',
    columns='Categoria Nutrimental',
    aggfunc='mean'
).round(2)

print("\n📊 PREÇO MÉDIO (R$/kg) POR REGIÃO E CATEGORIA:")
print(matriz_regiao_cat.to_string())

# ============================================================================
# 7. CALCULAR SHARE DE MERCADO
# ============================================================================

print("\n" + "=" * 80)
print("7. SHARE DE MERCADO NUTRIMENTAL")
print("=" * 80)

# Adicionar Regiao ao df total também
df['Regiao'] = df['Reg Canal'].str[:2]

total_mercado = df.groupby('Regiao').agg({
    'Vendas $': 'sum',
    'Volume (Kg)': 'sum'
})

nutri_por_regiao = df_nutri.groupby('Regiao').agg({
    'Vendas $': 'sum',
    'Volume (Kg)': 'sum'
})

share = pd.DataFrame({
    'Share_Vendas_%': (nutri_por_regiao['Vendas $'] / total_mercado['Vendas $'] * 100).round(2),
    'Share_Volume_%': (nutri_por_regiao['Volume (Kg)'] / total_mercado['Volume (Kg)'] * 100).round(2)
})

print("\n📊 SHARE NUTRIMENTAL POR REGIÃO:")
print(share.to_string())

# ============================================================================
# 8. SALVAR RESULTADOS
# ============================================================================

resultados = {
    'data_calculo': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
    'fonte': 'BaseScanntech-VOLUMETRIA.xlsx',
    'total_registros': len(df),
    'registros_nutrimental': len(df_nutri),
    'percentual_nutrimental': round(len(df_nutri)/len(df)*100, 2),
    
    'totais_nutrimental': {
        'vendas_total': float(df_nutri['Vendas $'].sum()),
        'volume_total_kg': float(df_nutri['Volume (Kg)'].sum()),
        'preco_medio_kg': float(df_nutri['Preço (Kg)'].mean())
    },
    
    'por_regiao': por_regiao.to_dict('index'),
    'por_categoria': por_categoria.to_dict('index'),
    'por_marca': por_marca.to_dict('index'),
    'top_20_skus': por_sku.to_dict('index'),
    'share_por_regiao': share.to_dict('index'),
    'matriz_preco_regiao_categoria': matriz_regiao_cat.to_dict('index')
}

with open('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/metricas_nova_base.json', 'w', encoding='utf-8') as f:
    json.dump(resultados, f, indent=2, ensure_ascii=False)

print("\n✅ Métricas salvas em: metricas_nova_base.json")
print("=" * 80)
