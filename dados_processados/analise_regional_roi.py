#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Análise Regional e Cálculo de ROI
Processa dados MTRIX para identificar oportunidades por UF e calcular ROI das iniciativas
"""

import pandas as pd
import json
from pathlib import Path

# Carregar dados MTRIX
mtrix_file = Path('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/mtrix_data.csv')
df = pd.read_csv(mtrix_file, encoding='latin-1', low_memory=False)

print("=" * 80)
print("ANÁLISE REGIONAL E ROI")
print("=" * 80)

# Limpar dados
df['Sell-Out Limpo'] = pd.to_numeric(df['# Sell-Out \n(Und)'], errors='coerce').fillna(0)
df['Preco Limpo'] = pd.to_numeric(df['Preço Médio Unitário'], errors='coerce').fillna(0)
df['Receita'] = df['Sell-Out Limpo'] * df['Preco Limpo']

# 1. ANÁLISE POR UF
print("\n1. ANÁLISE POR UF (Top 10)")
print("-" * 80)

uf_analysis = df.groupby('UF').agg({
    'Sell-Out Limpo': 'sum',
    'Receita': 'sum',
    'Preco Limpo': 'mean',
    'Agente de Distribuição': 'nunique'
}).round(2)

uf_analysis.columns = ['Volume', 'Receita', 'Preco_Medio', 'Distribuidores']
uf_analysis = uf_analysis.sort_values('Receita', ascending=False)

# Calcular participação
uf_analysis['Part_Receita_%'] = (uf_analysis['Receita'] / uf_analysis['Receita'].sum() * 100).round(2)
uf_analysis['Part_Volume_%'] = (uf_analysis['Volume'] / uf_analysis['Volume'].sum() * 100).round(2)

print(uf_analysis.head(10).to_string())

# 2. ANÁLISE POR REGIÃO
print("\n2. ANÁLISE POR REGIÃO")
print("-" * 80)

# Mapeamento de UFs para regiões
regioes_map = {
    'SP': 'Sudeste', 'RJ': 'Sudeste', 'MG': 'Sudeste', 'ES': 'Sudeste',
    'RS': 'Sul', 'SC': 'Sul', 'PR': 'Sul',
    'BA': 'Nordeste', 'CE': 'Nordeste', 'PE': 'Nordeste', 'MA': 'Nordeste',
    'AL': 'Nordeste', 'SE': 'Nordeste', 'PB': 'Nordeste', 'RN': 'Nordeste', 'PI': 'Nordeste',
    'GO': 'Centro-Oeste', 'DF': 'Centro-Oeste', 'MT': 'Centro-Oeste', 'MS': 'Centro-Oeste',
    'PA': 'Norte', 'AM': 'Norte', 'RO': 'Norte', 'AC': 'Norte', 'TO': 'Norte',
    'AP': 'Norte', 'RR': 'Norte'
}

df['Regiao'] = df['UF'].map(regioes_map)

regiao_analysis = df.groupby('Regiao').agg({
    'Sell-Out Limpo': 'sum',
    'Receita': 'sum',
    'Preco Limpo': 'mean',
    'UF': 'nunique',
    'Agente de Distribuição': 'nunique'
}).round(2)

regiao_analysis.columns = ['Volume', 'Receita', 'Preco_Medio', 'UFs', 'Distribuidores']
regiao_analysis['Part_Receita_%'] = (regiao_analysis['Receita'] / regiao_analysis['Receita'].sum() * 100).round(2)
regiao_analysis = regiao_analysis.sort_values('Receita', ascending=False)

print(regiao_analysis.to_string())

# 3. ANÁLISE POR CATEGORIA
print("\n3. ANÁLISE POR CATEGORIA")
print("-" * 80)

# Categorizar produtos
def categorizar(nome):
    nome_lower = str(nome).lower()
    if 'protein' in nome_lower or 'proteína' in nome_lower:
        return 'Proteína'
    elif 'nuts' in nome_lower or 'castanha' in nome_lower or 'amendoim' in nome_lower:
        return 'Nuts'
    elif 'frutas' in nome_lower or 'morango' in nome_lower or 'banana' in nome_lower:
        return 'Frutas'
    else:
        return 'Cereais'

df['Categoria'] = df['SKU'].apply(categorizar)

cat_analysis = df.groupby('Categoria').agg({
    'Sell-Out Limpo': 'sum',
    'Receita': 'sum',
    'Preco Limpo': 'mean'
}).round(2)

cat_analysis.columns = ['Volume', 'Receita', 'Preco_Medio']
cat_analysis['Part_Receita_%'] = (cat_analysis['Receita'] / cat_analysis['Receita'].sum() * 100).round(2)
cat_analysis = cat_analysis.sort_values('Receita', ascending=False)

print(cat_analysis.to_string())

# 4. PRECIFICAÇÃO POR CATEGORIA E REGIÃO
print("\n4. PRECIFICAÇÃO POR CATEGORIA E REGIÃO")
print("-" * 80)

pricing_matrix = df.groupby(['Regiao', 'Categoria'])['Preco Limpo'].mean().round(2).unstack(fill_value=0)
print(pricing_matrix.to_string())

# 5. OPORTUNIDADES DE CRESCIMENTO POR UF
print("\n5. TOP 10 UFs COM MAIOR OPORTUNIDADE DE CRESCIMENTO")
print("-" * 80)

# Calcular score de oportunidade (preço médio alto + volume razoável + poucos distribuidores)
uf_oportunidade = uf_analysis.copy()
uf_oportunidade['Score_Preco'] = (uf_oportunidade['Preco_Medio'] / uf_oportunidade['Preco_Medio'].max() * 100).round(2)
uf_oportunidade['Score_Volume'] = (uf_oportunidade['Volume'] / uf_oportunidade['Volume'].max() * 100).round(2)
uf_oportunidade['Score_Distribuicao'] = (100 - (uf_oportunidade['Distribuidores'] / uf_oportunidade['Distribuidores'].max() * 100)).round(2)
uf_oportunidade['Score_Oportunidade'] = (
    uf_oportunidade['Score_Preco'] * 0.4 +
    uf_oportunidade['Score_Volume'] * 0.3 +
    uf_oportunidade['Score_Distribuicao'] * 0.3
).round(2)

uf_oportunidade = uf_oportunidade.sort_values('Score_Oportunidade', ascending=False)
print(uf_oportunidade[['Volume', 'Receita', 'Preco_Medio', 'Distribuidores', 'Score_Oportunidade']].head(10).to_string())

# 6. SALVAR RESULTADOS EM JSON
print("\n6. SALVANDO RESULTADOS...")
print("-" * 80)

resultados = {
    'analise_uf': uf_analysis.head(15).to_dict('index'),
    'analise_regiao': regiao_analysis.to_dict('index'),
    'analise_categoria': cat_analysis.to_dict('index'),
    'pricing_matrix': pricing_matrix.to_dict('index'),
    'oportunidades_uf': uf_oportunidade.head(15).to_dict('index'),
    'totais': {
        'volume_total': int(df['Sell-Out Limpo'].sum()),
        'receita_total': float(df['Receita'].sum()),
        'preco_medio_geral': float(df['Preco Limpo'].mean()),
        'ufs_ativas': int(df['UF'].nunique()),
        'distribuidores_ativos': int(df['Agente de Distribuição'].nunique())
    }
}

output_file = Path('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/analise_regional_roi.json')
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(resultados, f, ensure_ascii=False, indent=2)

print(f"✅ Resultados salvos em: {output_file}")
print("\n" + "=" * 80)
print("ANÁLISE CONCLUÍDA!")
print("=" * 80)
