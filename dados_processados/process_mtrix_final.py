#!/usr/bin/env python3.11
# -*- coding: utf-8 -*-
"""
Processador Final de Dados MTRIX - Nutrimental
"""

import pandas as pd
import json
from pathlib import Path
from datetime import datetime
import re

# Configurações
DATA_DIR = Path("/home/ubuntu/upload")
OUTPUT_DIR = Path("/home/ubuntu/dados_processados")
OUTPUT_DIR.mkdir(exist_ok=True)

MTRIX_FILE = "MTRIX-Sellout-Nutry-2025-2semestre-atualizado-12112025(Sheet1).csv"

def limpar_valor_monetario(valor):
    """Remove R$ e converte para float"""
    if pd.isna(valor):
        return 0.0
    if isinstance(valor, (int, float)):
        return float(valor)
    # Remove R$, espaços e converte vírgula para ponto
    valor_limpo = str(valor).replace('R$', '').replace(' ', '').replace(',', '.')
    try:
        return float(valor_limpo)
    except:
        return 0.0

print("="*80)
print("PROCESSADOR FINAL DE DADOS MTRIX - NUTRIMENTAL")
print("="*80)
print(f"\n📂 Arquivo: {MTRIX_FILE}")
print(f"⏰ Início: {datetime.now().strftime('%H:%M:%S')}\n")

try:
    filepath = DATA_DIR / MTRIX_FILE
    
    print("📊 Carregando dados...")
    df = pd.read_csv(filepath, encoding='ISO-8859-1', low_memory=False)
    
    print(f"✅ {len(df):,} linhas carregadas\n")
    
    # Limpar nomes de colunas
    df.columns = df.columns.str.strip()
    
    # Limpar e converter valores monetários
    print("🔧 Limpando valores monetários...")
    df['# Sell-Out \n(R$)'] = df['# Sell-Out \n(R$)'].apply(limpar_valor_monetario)
    df['Preço Médio Unitário'] = df['Preço Médio Unitário'].apply(limpar_valor_monetario)
    
    # Garantir que unidades seja numérico
    df['# Sell-Out \n(Und)'] = pd.to_numeric(df['# Sell-Out \n(Und)'], errors='coerce').fillna(0)
    
    # Filtrar apenas valores positivos (remover devoluções)
    df_positivo = df[df['# Sell-Out \n(Und)'] > 0].copy()
    print(f"✅ {len(df_positivo):,} registros válidos (vendas positivas)\n")
    
    # Análises
    print("="*80)
    print("📈 ANÁLISES AGREGADAS")
    print("="*80)
    
    # 1. Vendas por Estado
    print("\n1️⃣ TOP 10 ESTADOS")
    vendas_estado = df_positivo.groupby('UF').agg({
        '# Sell-Out \n(Und)': 'sum',
        '# Sell-Out \n(R$)': 'sum'
    }).sort_values('# Sell-Out \n(Und)', ascending=False).head(10)
    vendas_estado.columns = ['Unidades', 'Valor_RS']
    print(vendas_estado)
    
    # 2. Vendas por Marca
    print("\n2️⃣ TOP 10 MARCAS")
    vendas_marca = df_positivo.groupby('Marca').agg({
        '# Sell-Out \n(Und)': 'sum',
        '# Sell-Out \n(R$)': 'sum'
    }).sort_values('# Sell-Out \n(Und)', ascending=False).head(10)
    vendas_marca.columns = ['Unidades', 'Valor_RS']
    print(vendas_marca)
    
    # 3. Vendas por Categoria
    print("\n3️⃣ VENDAS POR CATEGORIA")
    vendas_categoria = df_positivo.groupby('Categoria').agg({
        '# Sell-Out \n(Und)': 'sum',
        '# Sell-Out \n(R$)': 'sum',
        'Preço Médio Unitário': 'mean'
    }).sort_values('# Sell-Out \n(Und)', ascending=False)
    vendas_categoria.columns = ['Unidades', 'Valor_RS', 'Preco_Medio']
    print(vendas_categoria)
    
    # 4. Evolução Mensal
    print("\n4️⃣ EVOLUÇÃO MENSAL")
    vendas_mes = df_positivo.groupby('Ano/Mês').agg({
        '# Sell-Out \n(Und)': 'sum',
        '# Sell-Out \n(R$)': 'sum'
    }).sort_index()
    vendas_mes.columns = ['Unidades', 'Valor_RS']
    print(vendas_mes)
    
    # 5. Market Share por Marca (%)
    total_unidades = df_positivo['# Sell-Out \n(Und)'].sum()
    vendas_marca_full = df_positivo.groupby('Marca')['# Sell-Out \n(Und)'].sum().sort_values(ascending=False)
    market_share = (vendas_marca_full / total_unidades * 100).head(10)
    
    print("\n5️⃣ MARKET SHARE TOP 10 MARCAS (%)")
    for marca, share in market_share.items():
        print(f"  {marca}: {share:.2f}%")
    
    # Salvar dados processados
    print("\n" + "="*80)
    print("💾 SALVANDO DADOS PROCESSADOS")
    print("="*80)
    
    dados_processados = {
        "metadata": {
            "arquivo_origem": MTRIX_FILE,
            "total_registros": len(df),
            "registros_validos": len(df_positivo),
            "data_processamento": datetime.now().isoformat(),
            "periodo": "2025 - 2º Semestre (Jul-Dez)"
        },
        "vendas_por_estado": vendas_estado.reset_index().to_dict('records'),
        "vendas_por_marca": vendas_marca.reset_index().to_dict('records'),
        "vendas_por_categoria": vendas_categoria.reset_index().to_dict('records'),
        "evolucao_mensal": vendas_mes.reset_index().to_dict('records'),
        "market_share": {marca: float(share) for marca, share in market_share.items()},
        "resumo_geral": {
            "total_unidades": float(df_positivo['# Sell-Out \n(Und)'].sum()),
            "total_valor_rs": float(df_positivo['# Sell-Out \n(R$)'].sum()),
            "preco_medio": float(df_positivo['Preço Médio Unitário'].mean()),
            "num_estados": int(df_positivo['UF'].nunique()),
            "num_marcas": int(df_positivo['Marca'].nunique()),
            "num_categorias": int(df_positivo['Categoria'].nunique()),
            "num_produtos": int(df_positivo['SKU'].nunique())
        }
    }
    
    output_file = OUTPUT_DIR / "mtrix_2025_2s_processado.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(dados_processados, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Arquivo salvo: {output_file.name}")
    
    # Resumo final
    print("\n" + "="*80)
    print("📊 RESUMO GERAL - MTRIX 2025 2S")
    print("="*80)
    resumo = dados_processados['resumo_geral']
    print(f"Total de Unidades: {resumo['total_unidades']:,.0f}")
    print(f"Total em R$: R$ {resumo['total_valor_rs']:,.2f}")
    print(f"Preço Médio: R$ {resumo['preco_medio']:.2f}")
    print(f"Estados: {resumo['num_estados']}")
    print(f"Marcas: {resumo['num_marcas']}")
    print(f"Categorias: {resumo['num_categorias']}")
    print(f"Produtos (SKUs): {resumo['num_produtos']}")
    
    print(f"\n⏰ Fim: {datetime.now().strftime('%H:%M:%S')}")
    print("="*80)
    print("✅ PROCESSAMENTO CONCLUÍDO!")
    print("="*80)

except Exception as e:
    print(f"\n❌ ERRO: {str(e)}")
    import traceback
    traceback.print_exc()
