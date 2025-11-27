#!/usr/bin/env python3
"""
Análise profunda dos dados Scanntech para integração com MTRIX
"""
import pandas as pd
import json
from datetime import datetime
from collections import Counter

def analyze_scanntech():
    """Analisa dados Scanntech em profundidade"""
    print("="*80)
    print("ANÁLISE PROFUNDA DOS DADOS SCANNTECH")
    print("="*80)
    
    # Carregar dados
    df = pd.read_excel("scanntech_data.xls", sheet_name=0)
    
    print(f"\n📊 INFORMAÇÕES GERAIS:")
    print(f"  Total de registros: {len(df):,}")
    print(f"  Colunas: {len(df.columns)}")
    print(f"  Período: {df['Mês de Data Campo'].min()} a {df['Mês de Data Campo'].max()}")
    
    print(f"\n📋 ESTRUTURA DAS COLUNAS:")
    for i, col in enumerate(df.columns, 1):
        print(f"  {i}. {col}")
        print(f"     - Tipo: {df[col].dtype}")
        print(f"     - Valores únicos: {df[col].nunique():,}")
        print(f"     - Valores nulos: {df[col].isnull().sum():,}")
        if df[col].dtype == 'object':
            print(f"     - Exemplos: {list(df[col].dropna().unique()[:3])}")
        else:
            print(f"     - Min: {df[col].min()}, Max: {df[col].max()}")
        print()
    
    print(f"\n🔍 ANÁLISE POR DIMENSÃO:")
    
    # Análise de Região/Canal
    print(f"\n1. REGIÃO/CANAL (Reg Canal):")
    reg_canal = df['Reg Canal'].value_counts().head(10)
    for reg, count in reg_canal.items():
        print(f"   {reg}: {count:,} registros ({count/len(df)*100:.1f}%)")
    
    # Análise de Período
    print(f"\n2. PERÍODO (Mês de Data Campo):")
    periodo = df['Mês de Data Campo'].value_counts().sort_index()
    for mes, count in periodo.items():
        print(f"   {mes}: {count:,} registros")
    
    # Análise de SKU/Player
    print(f"\n3. VISÃO SKU/PLAYER:")
    sku_player = df['Visão SKU Player + outros'].value_counts().head(15)
    for sku, count in sku_player.items():
        print(f"   {sku}: {count:,} registros ({count/len(df)*100:.1f}%)")
    
    # Análise de KPIs
    print(f"\n4. KPIs DISPONÍVEIS:")
    kpi3 = df['KPI 3 Player (Data)'].value_counts().head(10)
    print(f"   KPI 3 Player - Top valores:")
    for kpi, count in kpi3.items():
        print(f"     {kpi}: {count:,} registros")
    
    kpi4 = df['KPI 4 Player (Data)'].value_counts().head(10)
    print(f"\n   KPI 4 Player - Top valores:")
    for kpi, count in kpi4.items():
        print(f"     {kpi}: {count:,} registros")
    
    # Análise de Preço
    print(f"\n5. PREÇO/PRICE INDEX:")
    print(f"   Valores únicos: {df['Preço/Price Index (Data)'].nunique():,}")
    print(f"   Média: {df['Preço/Price Index (Data)'].mean():.2f}")
    print(f"   Mediana: {df['Preço/Price Index (Data)'].median():.2f}")
    print(f"   Min: {df['Preço/Price Index (Data)'].min():.2f}")
    print(f"   Max: {df['Preço/Price Index (Data)'].max():.2f}")
    
    # Análise de Vendas/Share
    print(f"\n6. VENDAS/SHARE:")
    vendas_col = df['Vendas/Share/Share in Handlers  (Data)  (SS Data)']
    vendas_numeric = pd.to_numeric(vendas_col, errors='coerce')
    print(f"   Valores únicos: {vendas_col.nunique():,}")
    print(f"   Média: {vendas_numeric.mean():.4f}")
    print(f"   Mediana: {vendas_numeric.median():.4f}")
    print(f"   Min: {vendas_numeric.min():.4f}")
    print(f"   Max: {vendas_numeric.max():.4f}")
    
    # Identificar marcas/produtos Nutrimental
    print(f"\n7. IDENTIFICAÇÃO NUTRIMENTAL:")
    nutri_keywords = ['NUTRY', 'NUTRIMENTAL', 'NUTRI']
    nutri_mask = df['Visão SKU Player + outros'].str.contains('|'.join(nutri_keywords), case=False, na=False)
    nutri_df = df[nutri_mask]
    print(f"   Registros com Nutrimental: {len(nutri_df):,} ({len(nutri_df)/len(df)*100:.1f}%)")
    
    if len(nutri_df) > 0:
        print(f"\n   SKUs Nutrimental encontrados:")
        nutri_skus = nutri_df['Visão SKU Player + outros'].value_counts()
        for sku, count in nutri_skus.items():
            print(f"     {sku}: {count:,} registros")
    
    # Análise de complementaridade com MTRIX
    print(f"\n\n🔗 COMPLEMENTARIDADE COM MTRIX:")
    print(f"\n   MTRIX fornece:")
    print(f"     - Dados de SELL-OUT (venda do distribuidor para PDV)")
    print(f"     - Granularidade: Distribuidor, PDV, SKU, UF")
    print(f"     - Período: 2023-2025")
    print(f"\n   SCANNTECH fornece:")
    print(f"     - Dados de SELL-THROUGH (venda do PDV para consumidor)")
    print(f"     - Granularidade: Região/Canal, Marca/SKU, Período")
    print(f"     - KPIs: Preço, Share, Vendas")
    
    # Salvar análise
    analysis = {
        "total_registros": len(df),
        "periodo": {
            "inicio": str(df['Mês de Data Campo'].min()),
            "fim": str(df['Mês de Data Campo'].max())
        },
        "regioes_canais": df['Reg Canal'].nunique(),
        "skus_players": df['Visão SKU Player + outros'].nunique(),
        "registros_nutrimental": int(len(nutri_df)),
        "percentual_nutrimental": float(len(nutri_df)/len(df)*100),
        "analyzed_at": datetime.now().isoformat()
    }
    
    with open('scanntech_analysis.json', 'w', encoding='utf-8') as f:
        json.dump(analysis, f, indent=2, ensure_ascii=False)
    
    print(f"\n\n✅ Análise salva em scanntech_analysis.json")
    
    return df, nutri_df

if __name__ == "__main__":
    df, nutri_df = analyze_scanntech()
