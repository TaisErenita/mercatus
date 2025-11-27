#!/usr/bin/env python3
"""
Script para processar dados Scanntech atualizados
"""
import pandas as pd
import json
from datetime import datetime

def process_scanntech(file_path):
    """Processa arquivo Scanntech e extrai dados relevantes"""
    print(f"Processando {file_path}...")
    
    try:
        # Ler arquivo Excel
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
        
        with open('scanntech_info.json', 'w', encoding='utf-8') as f:
            json.dump(info, f, indent=2, ensure_ascii=False)
        
        print("\nInformações salvas em scanntech_info.json")
        
        return df
        
    except Exception as e:
        print(f"Erro ao processar: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    df = process_scanntech("scanntech_data.xls")
