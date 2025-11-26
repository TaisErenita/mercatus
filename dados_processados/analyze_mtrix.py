import pandas as pd
import json
from pathlib import Path

# Diretório de dados
DATA_DIR = Path("/home/ubuntu/upload")
OUTPUT_DIR = Path("/home/ubuntu/dados_processados")

# Lista de arquivos MTRIX
mtrix_files = [
    "MTRIX-Sellout-Nutry-2023-2semestre.xlsx",
    "MTRIX-Sellout-Nutry-2024-1semestre.xlsx",
    "MTRIX-Sellout-Nutry-2024-2semestre.xlsx",
    "MTRIX-Sellout-Nutry-2025-1semestre.xlsx",
    "MTRIX-Sellout-Nutry-2025-2semestre.xlsx",
]

print("=" * 80)
print("ANÁLISE DE DADOS MTRIX - NUTRIMENTAL")
print("=" * 80)

# Analisar cada arquivo
for filename in mtrix_files:
    filepath = DATA_DIR / filename
    if not filepath.exists():
        print(f"\n❌ Arquivo não encontrado: {filename}")
        continue
    
    print(f"\n📊 Analisando: {filename}")
    print("-" * 80)
    
    try:
        # Ler Excel
        df = pd.read_excel(filepath)
        
        print(f"✅ Arquivo carregado com sucesso!")
        print(f"📏 Dimensões: {df.shape[0]} linhas x {df.shape[1]} colunas")
        print(f"\n📋 Colunas encontradas:")
        for i, col in enumerate(df.columns, 1):
            print(f"  {i}. {col}")
        
        print(f"\n🔍 Primeiras 3 linhas:")
        print(df.head(3).to_string())
        
        # Estatísticas básicas
        print(f"\n📈 Estatísticas:")
        numeric_cols = df.select_dtypes(include=['number']).columns
        if len(numeric_cols) > 0:
            print(f"  - Colunas numéricas: {len(numeric_cols)}")
            for col in numeric_cols[:5]:  # Mostrar primeiras 5
                print(f"    • {col}: min={df[col].min():.2f}, max={df[col].max():.2f}, média={df[col].mean():.2f}")
        
        # Salvar resumo
        summary = {
            "filename": filename,
            "rows": int(df.shape[0]),
            "columns": int(df.shape[1]),
            "column_names": list(df.columns),
            "dtypes": {col: str(dtype) for col, dtype in df.dtypes.items()},
            "missing_values": {col: int(df[col].isna().sum()) for col in df.columns if df[col].isna().sum() > 0}
        }
        
        output_file = OUTPUT_DIR / f"summary_{filename.replace('.xlsx', '.json')}"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(summary, f, indent=2, ensure_ascii=False)
        print(f"\n💾 Resumo salvo em: {output_file.name}")
        
    except Exception as e:
        print(f"❌ Erro ao processar arquivo: {str(e)}")

print("\n" + "=" * 80)
print("✅ Análise concluída!")
print("=" * 80)
