#!/usr/bin/env python3.11
# -*- coding: utf-8 -*-
"""
Processador Completo de Dados Amazon - Nutrimental
"""

import pandas as pd
import json
from pathlib import Path
from datetime import datetime

# Configurações
DATA_DIR = Path("/home/ubuntu/upload")
OUTPUT_DIR = Path("/home/ubuntu/dados_processados")
DASHBOARD_DIR = Path("/home/ubuntu/mercatus-nutrimental-dashboard/src/data")

print("="*80)
print("PROCESSADOR COMPLETO DE DADOS AMAZON - NUTRIMENTAL")
print("="*80)

try:
    # Encontrar arquivo
    files = list(DATA_DIR.glob("*Amazon*"))
    if not files:
        print("❌ Arquivo Amazon não encontrado!")
        exit(1)
    
    filepath = files[0]
    print(f"\n📂 Arquivo: {filepath.name}\n")
    
    # Carregar Excel
    excel_file = pd.ExcelFile(filepath)
    print(f"✅ {len(excel_file.sheet_names)} sheets encontradas:")
    for i, sheet in enumerate(excel_file.sheet_names, 1):
        print(f"  {i}. {sheet}")
    
    # Processar cada sheet
    dados_processados = {}
    
    # 1. VENDAS
    print(f"\n{'='*80}")
    print("📊 PROCESSANDO: global-vendas")
    print(f"{'='*80}")
    
    df_vendas = pd.read_excel(filepath, sheet_name='global-vendas')
    print(f"✅ {len(df_vendas):,} registros carregados")
    
    # Converter Data para datetime
    df_vendas['Data'] = pd.to_datetime(df_vendas['Data'])
    df_vendas['Ano'] = df_vendas['Data'].dt.year
    df_vendas['Mes'] = df_vendas['Data'].dt.month
    df_vendas['Ano_Mes'] = df_vendas['Data'].dt.strftime('%Y-%m')
    
    # Converter colunas numéricas
    df_vendas['Receita de enviados'] = pd.to_numeric(df_vendas['Receita de enviados'], errors='coerce').fillna(0)
    df_vendas['Unidades enviadas'] = pd.to_numeric(df_vendas['Unidades enviadas'], errors='coerce').fillna(0)
    df_vendas['COGS enviados'] = pd.to_numeric(df_vendas['COGS enviados'], errors='coerce').fillna(0)
    
    # Análises
    vendas_por_mes = df_vendas.groupby('Ano_Mes').agg({
        'Receita de enviados': 'sum',
        'Unidades enviadas': 'sum',
        'COGS enviados': 'sum'
    }).reset_index()
    
    vendas_por_produto = df_vendas.groupby('Nome do produto').agg({
        'Receita de enviados': 'sum',
        'Unidades enviadas': 'sum'
    }).sort_values('Unidades enviadas', ascending=False).head(10).reset_index()
    
    print(f"\n📈 Resumo de Vendas:")
    print(f"  Total Receita: R$ {df_vendas['Receita de enviados'].sum():,.2f}")
    print(f"  Total Unidades: {df_vendas['Unidades enviadas'].sum():,.0f}")
    print(f"  Período: {df_vendas['Data'].min()} a {df_vendas['Data'].max()}")
    
    dados_processados['vendas'] = {
        'total_receita': float(df_vendas['Receita de enviados'].sum()),
        'total_unidades': float(df_vendas['Unidades enviadas'].sum()),
        'periodo_inicio': df_vendas['Data'].min().isoformat(),
        'periodo_fim': df_vendas['Data'].max().isoformat(),
        'vendas_por_mes': vendas_por_mes.to_dict('records'),
        'top_produtos': vendas_por_produto.to_dict('records')
    }
    
    # 2. INVENTÁRIO
    print(f"\n{'='*80}")
    print("📦 PROCESSANDO: global-inventario")
    print(f"{'='*80}")
    
    df_inventario = pd.read_excel(filepath, sheet_name='global-inventario')
    print(f"✅ {len(df_inventario):,} registros carregados")
    print(f"Colunas: {list(df_inventario.columns)}")
    
    # 3. TRÁFEGO
    print(f"\n{'='*80}")
    print("🌐 PROCESSANDO: global-trafego")
    print(f"{'='*80}")
    
    df_trafego = pd.read_excel(filepath, sheet_name='global-trafego')
    print(f"✅ {len(df_trafego):,} registros carregados")
    print(f"Colunas: {list(df_trafego.columns)}")
    
    # 4. VENDAS POR UF E MÊS
    print(f"\n{'='*80}")
    print("🗺️  PROCESSANDO: global-uf-mes")
    print(f"{'='*80}")
    
    df_uf_mes = pd.read_excel(filepath, sheet_name='global-uf-mes')
    print(f"✅ {len(df_uf_mes):,} registros carregados")
    print(f"Colunas: {list(df_uf_mes.columns)}")
    
    if 'UF' in df_uf_mes.columns or 'Estado' in df_uf_mes.columns:
        col_uf = 'UF' if 'UF' in df_uf_mes.columns else 'Estado'
        
        # Converter colunas numéricas
        for col in ['Receita de enviados', 'COGS enviados', 'Unidades enviadas']:
            if col in df_uf_mes.columns:
                df_uf_mes[col] = pd.to_numeric(df_uf_mes[col], errors='coerce').fillna(0)
        
        # Selecionar apenas colunas numéricas para agregar
        numeric_cols = df_uf_mes.select_dtypes(include=['number']).columns.tolist()
        agg_dict = {col: 'sum' for col in numeric_cols}
        
        vendas_por_uf = df_uf_mes.groupby(col_uf).agg(agg_dict).sort_values(
            by=numeric_cols[0] if numeric_cols else 'Unidades enviadas', 
            ascending=False
        ).head(10)
        
        print(f"\n🏆 Top 10 Estados:")
        print(vendas_por_uf)
        
        dados_processados['vendas_por_uf'] = vendas_por_uf.reset_index().to_dict('records')
    
    # Salvar dados processados
    print(f"\n{'='*80}")
    print("💾 SALVANDO DADOS PROCESSADOS")
    print(f"{'='*80}")
    
    output_json = OUTPUT_DIR / "amazon_processado.json"
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump({
            "metadata": {
                "arquivo_origem": filepath.name,
                "data_processamento": datetime.now().isoformat(),
                "sheets_processadas": excel_file.sheet_names
            },
            "dados": dados_processados
        }, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Arquivo salvo: {output_json.name}")
    
    # Gerar arquivo JavaScript para dashboard
    print("\n📝 Gerando arquivo amazonDataReal.js...")
    
    js_content = f"""// Dados Amazon Reais - Nutrimental
// Gerado automaticamente em {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}
// Fonte: {filepath.name}

export const amazonDataReal = {json.dumps(dados_processados, indent=2, ensure_ascii=False)};

export default amazonDataReal;
"""
    
    output_js = DASHBOARD_DIR / "amazonDataReal.js"
    with open(output_js, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"✅ Arquivo JavaScript criado: {output_js}")
    
    # Resumo final
    print(f"\n{'='*80}")
    print("📊 RESUMO GERAL - AMAZON")
    print(f"{'='*80}")
    print(f"Total Receita: R$ {dados_processados['vendas']['total_receita']:,.2f}")
    print(f"Total Unidades: {dados_processados['vendas']['total_unidades']:,.0f}")
    print(f"Período: {dados_processados['vendas']['periodo_inicio'][:10]} a {dados_processados['vendas']['periodo_fim'][:10]}")
    print(f"\nArquivos gerados:")
    print(f"  1. {output_json}")
    print(f"  2. {output_js}")
    
    print(f"\n⏰ Fim: {datetime.now().strftime('%H:%M:%S')}")
    print("="*80)
    print("✅ PROCESSAMENTO CONCLUÍDO!")
    print("="*80)

except Exception as e:
    print(f"\n❌ ERRO: {str(e)}")
    import traceback
    traceback.print_exc()
