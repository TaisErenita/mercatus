#!/usr/bin/env python3
"""
Script para processar dados MTRIX atualizados (CSV)
"""
import pandas as pd
import json
from datetime import datetime

def process_mtrix(file_path):
    """Processa arquivo MTRIX CSV e extrai dados relevantes"""
    print(f"Processando {file_path}...")
    
    try:
        # Ler arquivo CSV
        df = pd.read_csv(file_path, encoding='latin-1', low_memory=False)
        
        print(f"Colunas encontradas: {list(df.columns)[:10]}...")  # Primeiras 10 colunas
        print(f"Total de linhas: {len(df)}")
        print(f"\nPrimeiras linhas:")
        print(df.head())
        
        # Salvar informações básicas
        info = {
            "total_rows": len(df),
            "columns": list(df.columns),
            "processed_at": datetime.now().isoformat()
        }
        
        with open('mtrix_info.json', 'w', encoding='utf-8') as f:
            json.dump(info, f, indent=2, ensure_ascii=False)
        
        print(f"\nInformações salvas em mtrix_info.json")
        
        return df
        
    except Exception as e:
        print(f"Erro ao processar: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    df = process_mtrix("mtrix_data.csv")
