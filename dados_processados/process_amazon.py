#!/usr/bin/env python3.11
# -*- coding: utf-8 -*-
"""
Processador de Dados Amazon - Nutrimental
Analisa dados de e-commerce da Amazon
"""

import pandas as pd
import json
from pathlib import Path
from datetime import datetime

# Configurações
DATA_DIR = Path("/home/ubuntu/upload")
OUTPUT_DIR = Path("/home/ubuntu/dados_processados")
OUTPUT_DIR.mkdir(exist_ok=True)

AMAZON_FILE = "RelatórioAmazon.xlsx"

print("="*80)
print("PROCESSADOR DE DADOS AMAZON - NUTRIMENTAL")
print("="*80)
print(f"\n📂 Arquivo: {AMAZON_FILE}\n")

try:
    filepath = DATA_DIR / AMAZON_FILE
    
    # Verificar se arquivo existe
    if not filepath.exists():
        print(f"❌ Arquivo não encontrado: {filepath}")
        exit(1)
    
    print("📊 Carregando dados...")
    
    # Tentar ler todas as sheets
    excel_file = pd.ExcelFile(filepath)
    print(f"✅ Arquivo carregado!")
    print(f"📋 Sheets encontradas: {len(excel_file.sheet_names)}")
    
    for i, sheet_name in enumerate(excel_file.sheet_names, 1):
        print(f"  {i}. {sheet_name}")
    
    # Processar cada sheet
    dados_amazon = {}
    
    for sheet_name in excel_file.sheet_names:
        print(f"\n{'='*80}")
        print(f"📄 Processando sheet: {sheet_name}")
        print(f"{'='*80}")
        
        df = pd.read_excel(filepath, sheet_name=sheet_name)
        
        print(f"📏 Dimensões: {df.shape[0]} linhas x {df.shape[1]} colunas")
        print(f"\n📋 Colunas:")
        for i, col in enumerate(df.columns, 1):
            print(f"  {i}. {col}")
        
        print(f"\n🔍 Primeiras 3 linhas:")
        print(df.head(3).to_string())
        
        # Salvar dados da sheet
        dados_amazon[sheet_name] = {
            "dimensoes": {
                "linhas": int(df.shape[0]),
                "colunas": int(df.shape[1])
            },
            "colunas": list(df.columns),
            "tipos": {col: str(dtype) for col, dtype in df.dtypes.items()},
            "amostra": df.head(5).to_dict('records')
        }
        
        # Estatísticas básicas para colunas numéricas
        numeric_cols = df.select_dtypes(include=['number']).columns
        if len(numeric_cols) > 0:
            print(f"\n📈 Estatísticas das colunas numéricas:")
            for col in numeric_cols[:10]:  # Mostrar primeiras 10
                print(f"  • {col}:")
                print(f"    - Min: {df[col].min()}")
                print(f"    - Max: {df[col].max()}")
                print(f"    - Média: {df[col].mean():.2f}")
                print(f"    - Total: {df[col].sum():.2f}")
    
    # Salvar resumo completo
    print(f"\n{'='*80}")
    print("💾 SALVANDO DADOS PROCESSADOS")
    print(f"{'='*80}")
    
    output_json = OUTPUT_DIR / "amazon_processado.json"
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump({
            "metadata": {
                "arquivo_origem": AMAZON_FILE,
                "data_processamento": datetime.now().isoformat(),
                "num_sheets": len(excel_file.sheet_names),
                "sheets": excel_file.sheet_names
            },
            "dados": dados_amazon
        }, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Arquivo salvo: {output_json.name}")
    
    # Resumo final
    print(f"\n{'='*80}")
    print("📊 RESUMO GERAL - AMAZON")
    print(f"{'='*80}")
    print(f"Total de Sheets: {len(excel_file.sheet_names)}")
    for sheet_name, dados in dados_amazon.items():
        print(f"\n{sheet_name}:")
        print(f"  - Linhas: {dados['dimensoes']['linhas']}")
        print(f"  - Colunas: {dados['dimensoes']['colunas']}")
    
    print(f"\n⏰ Fim: {datetime.now().strftime('%H:%M:%S')}")
    print("="*80)
    print("✅ PROCESSAMENTO CONCLUÍDO!")
    print("="*80)

except Exception as e:
    print(f"\n❌ ERRO: {str(e)}")
    import traceback
    traceback.print_exc()
