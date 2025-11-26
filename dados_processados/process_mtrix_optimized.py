#!/usr/bin/env python3.11
# -*- coding: utf-8 -*-
"""
Processador Otimizado de Dados MTRIX - Nutrimental
Processa dados de sell-out em chunks para gerar insights agregados
"""

import pandas as pd
import json
from pathlib import Path
from datetime import datetime

# Configurações
DATA_DIR = Path("/home/ubuntu/upload")
OUTPUT_DIR = Path("/home/ubuntu/dados_processados")
OUTPUT_DIR.mkdir(exist_ok=True)

# Arquivo mais recente
MTRIX_FILE = "MTRIX-Sellout-Nutry-2025-2semestre-atualizado-12112025(Sheet1).csv"

print("="*80)
print("PROCESSADOR OTIMIZADO DE DADOS MTRIX - NUTRIMENTAL")
print("="*80)
print(f"\n📂 Processando: {MTRIX_FILE}")
print(f"⏰ Início: {datetime.now().strftime('%H:%M:%S')}\n")

try:
    # Ler CSV com encoding correto
    filepath = DATA_DIR / MTRIX_FILE
    
    print("📊 Lendo dados (pode levar alguns minutos)...")
    df = pd.read_csv(filepath, encoding='ISO-8859-1')
    
    print(f"✅ Dados carregados: {len(df):,} linhas x {len(df.columns)} colunas\n")
    
    # Limpar nomes de colunas
    df.columns = df.columns.str.strip()
    
    print("📋 Colunas encontradas:")
    for i, col in enumerate(df.columns, 1):
        print(f"  {i}. {col}")
    
    # Converter colunas numéricas
    print("\n🔧 Convertendo tipos de dados...")
    df['# Sell-Out \n(Und)'] = pd.to_numeric(df['# Sell-Out \n(Und)'], errors='coerce')
    df['# Sell-Out \n(R$)'] = pd.to_numeric(df['# Sell-Out \n(R$)'], errors='coerce')
    df['Preço Médio Unitário'] = pd.to_numeric(df['Preço Médio Unitário'], errors='coerce')
    
    # Remover linhas com valores nulos nas colunas principais
    df = df.dropna(subset=['# Sell-Out \n(Und)', '# Sell-Out \n(R$)'])
    print(f"✅ Dados limpos: {len(df):,} linhas")
    
    # Análises agregadas
    print("\n" + "="*80)
    print("📈 ANÁLISES AGREGADAS")
    print("="*80)
    
    # 1. Vendas por Estado
    print("\n1️⃣ TOP 10 ESTADOS POR VOLUME DE VENDAS")
    vendas_estado = df.groupby('UF').agg({
        '# Sell-Out \n(Und)': 'sum',
        '# Sell-Out \n(R$)': 'sum'
    }).sort_values('# Sell-Out \n(Und)', ascending=False).head(10)
    print(vendas_estado)
    
    # 2. Vendas por Marca
    print("\n2️⃣ TOP 10 MARCAS POR VOLUME")
    vendas_marca = df.groupby('Marca').agg({
        '# Sell-Out \n(Und)': 'sum',
        '# Sell-Out \n(R$)': 'sum'
    }).sort_values('# Sell-Out \n(Und)', ascending=False).head(10)
    print(vendas_marca)
    
    # 3. Vendas por Categoria
    print("\n3️⃣ VENDAS POR CATEGORIA")
    vendas_categoria = df.groupby('Categoria').agg({
        '# Sell-Out \n(Und)': 'sum',
        '# Sell-Out \n(R$)': 'sum',
        'Preço Médio Unitário': 'mean'
    }).sort_values('# Sell-Out \n(Und)', ascending=False)
    print(vendas_categoria)
    
    # 4. Evolução Mensal
    print("\n4️⃣ EVOLUÇÃO MENSAL")
    vendas_mes = df.groupby('Ano/Mês').agg({
        '# Sell-Out \n(Und)': 'sum',
        '# Sell-Out \n(R$)': 'sum'
    }).sort_index()
    print(vendas_mes)
    
    # Salvar dados processados
    print("\n" + "="*80)
    print("💾 SALVANDO DADOS PROCESSADOS")
    print("="*80)
    
    # Converter para JSON para usar no dashboard
    dados_processados = {
        "metadata": {
            "arquivo_origem": MTRIX_FILE,
            "total_registros": len(df),
            "data_processamento": datetime.now().isoformat(),
            "periodo": "2025 - 2º Semestre"
        },
        "vendas_por_estado": vendas_estado.reset_index().to_dict('records'),
        "vendas_por_marca": vendas_marca.reset_index().to_dict('records'),
        "vendas_por_categoria": vendas_categoria.reset_index().to_dict('records'),
        "evolucao_mensal": vendas_mes.reset_index().to_dict('records'),
        "resumo_geral": {
            "total_unidades": float(df['# Sell-Out \n(Und)'].sum()),
            "total_valor_rs": float(df['# Sell-Out \n(R$)'].sum()),
            "preco_medio": float(df['Preço Médio Unitário'].mean()),
            "num_estados": df['UF'].nunique(),
            "num_marcas": df['Marca'].nunique(),
            "num_categorias": df['Categoria'].nunique()
        }
    }
    
    output_file = OUTPUT_DIR / "mtrix_2025_2s_processado.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(dados_processados, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Dados salvos em: {output_file}")
    
    # Resumo final
    print("\n" + "="*80)
    print("📊 RESUMO GERAL")
    print("="*80)
    print(f"Total de Unidades Vendidas: {dados_processados['resumo_geral']['total_unidades']:,.0f}")
    print(f"Total em R$: R$ {dados_processados['resumo_geral']['total_valor_rs']:,.2f}")
    print(f"Preço Médio: R$ {dados_processados['resumo_geral']['preco_medio']:.2f}")
    print(f"Estados Ativos: {dados_processados['resumo_geral']['num_estados']}")
    print(f"Marcas: {dados_processados['resumo_geral']['num_marcas']}")
    print(f"Categorias: {dados_processados['resumo_geral']['num_categorias']}")
    
    print(f"\n⏰ Fim: {datetime.now().strftime('%H:%M:%S')}")
    print("="*80)
    print("✅ PROCESSAMENTO CONCLUÍDO COM SUCESSO!")
    print("="*80)

except Exception as e:
    print(f"\n❌ ERRO: {str(e)}")
    import traceback
    traceback.print_exc()
