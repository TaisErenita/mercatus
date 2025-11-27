#!/usr/bin/env python3
"""
Script para processar dados Scanntech e gerar arquivo JavaScript
"""
import pandas as pd
import json
from datetime import datetime

def process_scanntech_for_dashboard():
    """Processa dados Scanntech e gera formato para dashboard"""
    print("Processando Scanntech para dashboard...")
    
    df = pd.read_excel("scanntech_data.xls", sheet_name=0)
    
    # Filtrar apenas produtos Nutrimental
    nutri_keywords = ['NUTRY', 'NUTRIMENTAL', 'NUTRI', 'ALLNUTRI']
    nutri_mask = df['Visão SKU Player + outros'].str.contains('|'.join(nutri_keywords), case=False, na=False)
    nutri_df = df[nutri_mask].copy()
    
    print(f"Total de registros Nutrimental: {len(nutri_df):,}")
    
    # Limpar dados numéricos
    nutri_df['Vendas Limpas'] = pd.to_numeric(
        nutri_df['Vendas/Share/Share in Handlers  (Data)  (SS Data)'], 
        errors='coerce'
    ).fillna(0)
    
    nutri_df['Preco Limpo'] = pd.to_numeric(
        nutri_df['Preço/Price Index (Data)'], 
        errors='coerce'
    ).fillna(0)
    
    # Extrair região do campo 'Reg Canal'
    nutri_df['Regiao'] = nutri_df['Reg Canal'].str[:2]  # CO, NE, NO, SE, SU
    nutri_df['Canal'] = nutri_df['Reg Canal'].str[3:]  # 1a4, 5a9, 10+, atc
    
    # 1. Agregar por Região
    por_regiao = nutri_df.groupby('Regiao').agg({
        'Vendas Limpas': 'mean',
        'Preco Limpo': 'mean'
    }).reset_index()
    
    por_regiao_dict = {}
    for _, row in por_regiao.iterrows():
        regiao = row['Regiao']
        
        # Agregar canais dentro da região
        canais_regiao = nutri_df[nutri_df['Regiao'] == regiao].groupby('Canal').agg({
            'Vendas Limpas': 'mean',
            'Preco Limpo': 'mean'
        }).reset_index()
        
        canais_dict = {}
        for _, canal_row in canais_regiao.iterrows():
            canais_dict[canal_row['Canal']] = {
                'share': round(float(canal_row['Vendas Limpas']), 4),
                'priceIndex': round(float(canal_row['Preco Limpo']), 2)
            }
        
        por_regiao_dict[regiao] = {
            'share': round(float(row['Vendas Limpas']), 4),
            'priceIndex': round(float(row['Preco Limpo']), 2),
            'canais': canais_dict
        }
    
    # 2. Top SKUs
    top_skus = nutri_df.groupby('Visão SKU Player + outros').agg({
        'Vendas Limpas': 'mean',
        'Preco Limpo': 'mean'
    }).reset_index().sort_values('Vendas Limpas', ascending=False).head(20)
    
    top_skus_list = []
    for _, row in top_skus.iterrows():
        top_skus_list.append({
            'sku': row['Visão SKU Player + outros'],
            'share': round(float(row['Vendas Limpas']), 4),
            'priceIndex': round(float(row['Preco Limpo']), 2)
        })
    
    # 3. Série Temporal
    timeline = nutri_df.groupby('Mês de Data Campo').agg({
        'Vendas Limpas': 'mean',
        'Preco Limpo': 'mean'
    }).reset_index().sort_values('Mês de Data Campo')
    
    timeline_list = []
    for _, row in timeline.iterrows():
        timeline_list.append({
            'periodo': row['Mês de Data Campo'],
            'shareTotal': round(float(row['Vendas Limpas']), 4),
            'priceIndexMedio': round(float(row['Preco Limpo']), 2)
        })
    
    # 4. Resumo Geral
    summary = {
        'totalRegistros': len(nutri_df),
        'periodoInicio': str(nutri_df['Mês de Data Campo'].min()),
        'periodoFim': str(nutri_df['Mês de Data Campo'].max()),
        'shareMedio': round(float(nutri_df['Vendas Limpas'].mean()), 4),
        'priceIndexMedio': round(float(nutri_df['Preco Limpo'].mean()), 2),
        'regioes': len(por_regiao_dict),
        'skusUnicos': nutri_df['Visão SKU Player + outros'].nunique()
    }
    
    # Criar arquivo JavaScript
    data_atual = datetime.now().strftime('%d/%m/%Y %H:%M')
    
    js_content = f"""// Dados Scanntech - Atualizado em {data_atual}
// Total de registros Nutrimental: {len(nutri_df):,}

export const getScanntechPorRegiao = () => {{
  return {json.dumps(por_regiao_dict, indent=2, ensure_ascii=False)};
}};

export const getScanntechTopSkus = () => {{
  return {json.dumps(top_skus_list, indent=2, ensure_ascii=False)};
}};

export const getScanntechTimeline = () => {{
  return {json.dumps(timeline_list, indent=2, ensure_ascii=False)};
}};

export const getScanntechSummary = () => {{
  return {json.dumps(summary, indent=2, ensure_ascii=False)};
}};

// Função para integração com MTRIX
export const getIntegracaoMtrixScanntech = (regiao, periodo) => {{
  const scanntechData = getScanntechPorRegiao()[regiao];
  
  if (!scanntechData) {{
    return null;
  }}
  
  return {{
    regiao,
    periodo,
    shareMercado: scanntechData.share,
    priceIndex: scanntechData.priceIndex,
    canais: scanntechData.canais
  }};
}};
"""
    
    with open('../src/data/scanntechDataReal.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"✅ scanntechDataReal.js gerado ({len(js_content)} bytes)")
    print(f"\nResumo:")
    print(f"  - Regiões: {len(por_regiao_dict)}")
    print(f"  - Top SKUs: {len(top_skus_list)}")
    print(f"  - Períodos: {len(timeline_list)}")
    print(f"  - Share médio: {summary['shareMedio']:.4f}")
    print(f"  - Price Index médio: R$ {summary['priceIndexMedio']:.2f}")
    
    return True

if __name__ == "__main__":
    print("="*60)
    print("GERANDO ARQUIVO JAVASCRIPT SCANNTECH")
    print("="*60)
    
    process_scanntech_for_dashboard()
    
    print("\n" + "="*60)
    print("ARQUIVO GERADO COM SUCESSO!")
    print("="*60)
    print("Arquivo atualizado:")
    print("  - src/data/scanntechDataReal.js")
