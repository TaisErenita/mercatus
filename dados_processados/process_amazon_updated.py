#!/usr/bin/env python3
"""
Script para processar dados Amazon atualizados
"""
import pandas as pd
import json
from datetime import datetime

def process_amazon(file_path):
    """Processa arquivo Amazon Excel e extrai dados relevantes"""
    print(f"Processando {file_path}...")
    
    try:
        # Ler arquivo Excel - tentar primeira sheet
        df = pd.read_excel(file_path, sheet_name=0)
        
        print(f"Colunas encontradas: {list(df.columns)}")
        print(f"Total de linhas: {len(df)}")
        print(f"\nPrimeiras linhas:")
        print(df.head())
        
        # Salvar informações básicas
        info = {
            "total_rows": len(df),
            "columns": list(df.columns),
            "processed_at": datetime.now().isoformat()
        }
        
        with open('amazon_info.json', 'w', encoding='utf-8') as f:
            json.dump(info, f, indent=2, ensure_ascii=False)
        
        print(f"\nInformações salvas em amazon_info.json")
        
        return df
        
    except Exception as e:
        print(f"Erro ao processar: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    df = process_amazon("amazon_data.xlsx")
