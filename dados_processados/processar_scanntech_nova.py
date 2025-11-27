#!/usr/bin/env python3
"""
Processamento da Nova Base Scanntech - VOLUMETRIA
Foco em: Vendas $, Volume (KG), Preço (KG)
"""

import pandas as pd
import numpy as np
import json
from datetime import datetime

print("=" * 80)
print("PROCESSAMENTO NOVA BASE SCANNTECH - VOLUMETRIA")
print("=" * 80)

# Carregar nova base
print("\n📊 Carregando nova base Scanntech...")
df = pd.read_excel('/home/ubuntu/upload/BaseScanntech-VOLUMETRIA.xlsx')

print(f"✅ {len(df):,} registros carregados")
print(f"✅ {len(df.columns)} colunas")

# Mostrar estrutura
print("\n📋 ESTRUTURA DA BASE:")
print(df.head(10).to_string())

print("\n📋 COLUNAS DISPONÍVEIS:")
for i, col in enumerate(df.columns, 1):
    print(f"{i}. {col}")

print("\n📊 INFORMAÇÕES GERAIS:")
print(df.info())

print("\n📊 ESTATÍSTICAS DAS COLUNAS NUMÉRICAS:")
print(df.describe())

# Identificar colunas principais
vendas_col = None
volume_col = None
preco_col = None

for col in df.columns:
    col_lower = col.lower()
    if 'vendas' in col_lower and '$' in col:
        vendas_col = col
    elif 'volume' in col_lower and 'kg' in col_lower:
        volume_col = col
    elif 'preço' in col_lower or 'preco' in col_lower:
        if 'kg' in col_lower:
            preco_col = col

print(f"\n✅ Colunas identificadas:")
print(f"   Vendas: {vendas_col}")
print(f"   Volume: {volume_col}")
print(f"   Preço: {preco_col}")

# Análise dos dados
print("\n" + "=" * 80)
print("ANÁLISE DOS DADOS")
print("=" * 80)

if vendas_col:
    print(f"\n💰 VENDAS $ ({vendas_col}):")
    print(f"   Total: R$ {df[vendas_col].sum():,.2f}")
    print(f"   Média: R$ {df[vendas_col].mean():,.2f}")
    print(f"   Mediana: R$ {df[vendas_col].median():,.2f}")

if volume_col:
    print(f"\n📦 VOLUME KG ({volume_col}):")
    print(f"   Total: {df[volume_col].sum():,.2f} kg")
    print(f"   Média: {df[volume_col].mean():,.2f} kg")
    print(f"   Mediana: {df[volume_col].median():,.2f} kg")

if preco_col:
    # Converter para numérico se necessário
    df[preco_col] = pd.to_numeric(df[preco_col], errors='coerce')
    print(f"\n💵 PREÇO KG ({preco_col}):")
    print(f"   Média: R$ {df[preco_col].mean():,.2f}/kg")
    print(f"   Mediana: R$ {df[preco_col].median():,.2f}/kg")
    print(f"   Mín: R$ {df[preco_col].min():,.2f}/kg")
    print(f"   Máx: R$ {df[preco_col].max():,.2f}/kg")

# Verificar outras colunas importantes
print("\n📋 OUTRAS COLUNAS IMPORTANTES:")
outras_cols = [col for col in df.columns if col not in [vendas_col, volume_col, preco_col]]
for col in outras_cols[:10]:
    valores_unicos = df[col].nunique()
    print(f"   {col}: {valores_unicos} valores únicos")

# Salvar análise
analise = {
    'data_processamento': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
    'total_registros': len(df),
    'total_colunas': len(df.columns),
    'colunas': {
        'vendas': vendas_col,
        'volume': volume_col,
        'preco': preco_col
    },
    'metricas': {}
}

if vendas_col:
    analise['metricas']['vendas'] = {
        'total': float(df[vendas_col].sum()),
        'media': float(df[vendas_col].mean()),
        'mediana': float(df[vendas_col].median())
    }

if volume_col:
    analise['metricas']['volume'] = {
        'total_kg': float(df[volume_col].sum()),
        'media_kg': float(df[volume_col].mean()),
        'mediana_kg': float(df[volume_col].median())
    }

if preco_col:
    analise['metricas']['preco'] = {
        'media_kg': float(df[preco_col].mean()),
        'mediana_kg': float(df[preco_col].median()),
        'min_kg': float(df[preco_col].min()),
        'max_kg': float(df[preco_col].max())
    }

with open('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/analise_scanntech_nova.json', 'w') as f:
    json.dump(analise, f, indent=2)

print("\n✅ Análise salva em: analise_scanntech_nova.json")
print("=" * 80)
