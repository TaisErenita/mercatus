#!/usr/bin/env python3
"""
Análise de Métricas de Acurácia dos Dados Integrados
Calcula qualidade, completude, consistência e confiabilidade dos dados MTRIX, Amazon e Scanntech
"""

import pandas as pd
import numpy as np
from datetime import datetime
import json

print("=" * 80)
print("ANÁLISE DE MÉTRICAS DE ACURÁCIA - DASHBOARD MERCATUS")
print("=" * 80)

# ============================================================================
# 1. MÉTRICAS DE QUALIDADE DOS DADOS
# ============================================================================

def calcular_metricas_qualidade(df, nome_fonte):
    """Calcula métricas de qualidade de dados"""
    total_registros = len(df)
    total_campos = len(df.columns)
    
    # Completude (% de valores não-nulos)
    completude_por_campo = {}
    for col in df.columns:
        nao_nulos = df[col].notna().sum()
        completude_por_campo[col] = (nao_nulos / total_registros) * 100
    
    completude_media = np.mean(list(completude_por_campo.values()))
    
    # Consistência (% de valores válidos)
    valores_invalidos = 0
    for col in df.columns:
        if df[col].dtype in ['float64', 'int64']:
            # Verificar valores negativos onde não deveria ter
            if col.lower() in ['preco', 'price', 'valor', 'receita', 'volume', 'unidades']:
                valores_invalidos += (df[col] < 0).sum()
            # Verificar valores extremos (outliers)
            if df[col].notna().sum() > 0:
                q1 = df[col].quantile(0.25)
                q3 = df[col].quantile(0.75)
                iqr = q3 - q1
                outliers = ((df[col] < (q1 - 3 * iqr)) | (df[col] > (q3 + 3 * iqr))).sum()
                valores_invalidos += outliers
    
    consistencia = ((total_registros * total_campos - valores_invalidos) / (total_registros * total_campos)) * 100
    
    # Duplicatas
    duplicatas = df.duplicated().sum()
    taxa_duplicatas = (duplicatas / total_registros) * 100
    
    return {
        'fonte': nome_fonte,
        'total_registros': total_registros,
        'total_campos': total_campos,
        'completude_media': round(completude_media, 2),
        'completude_por_campo': {k: round(v, 2) for k, v in sorted(completude_por_campo.items(), key=lambda x: x[1], reverse=True)[:5]},
        'consistencia': round(consistencia, 2),
        'duplicatas': duplicatas,
        'taxa_duplicatas': round(taxa_duplicatas, 2),
        'valores_unicos_por_campo': {col: df[col].nunique() for col in df.columns if df[col].nunique() < 100}
    }

# ============================================================================
# 2. ANÁLISE MTRIX
# ============================================================================

print("\n📊 ANALISANDO DADOS MTRIX...")
try:
    mtrix_df = pd.read_csv('/home/ubuntu/upload/MTRIX-Sellout-Nutry-2025-2semestre-atualizado-12112025(Sheet1).csv', 
                           encoding='latin-1', low_memory=False)
    
    metricas_mtrix = calcular_metricas_qualidade(mtrix_df, 'MTRIX')
    
    # Métricas específicas MTRIX
    metricas_mtrix['periodo_cobertura'] = f"{mtrix_df['Ano'].min()}-{mtrix_df['Ano'].max()}" if 'Ano' in mtrix_df.columns else "N/A"
    metricas_mtrix['distribuidores_unicos'] = mtrix_df['Agente de Distribuição'].nunique() if 'Agente de Distribuição' in mtrix_df.columns else 0
    metricas_mtrix['ufs_cobertas'] = mtrix_df['UF'].nunique() if 'UF' in mtrix_df.columns else 0
    metricas_mtrix['skus_unicos'] = mtrix_df['SKU'].nunique() if 'SKU' in mtrix_df.columns else 0
    
    # Volume total
    if 'Sell-Out (Unidades)' in mtrix_df.columns:
        metricas_mtrix['volume_total'] = int(mtrix_df['Sell-Out (Unidades)'].sum())
    
    print(f"✅ MTRIX processado: {metricas_mtrix['total_registros']:,} registros")
    print(f"   Completude: {metricas_mtrix['completude_media']:.1f}%")
    print(f"   Consistência: {metricas_mtrix['consistencia']:.1f}%")
    
except Exception as e:
    print(f"❌ Erro ao processar MTRIX: {e}")
    metricas_mtrix = {'fonte': 'MTRIX', 'erro': str(e)}

# ============================================================================
# 3. ANÁLISE AMAZON
# ============================================================================

print("\n🛒 ANALISANDO DADOS AMAZON...")
try:
    amazon_df = pd.read_excel('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/amazon_data.xlsx')
    
    metricas_amazon = calcular_metricas_qualidade(amazon_df, 'Amazon')
    
    # Métricas específicas Amazon
    if 'Data' in amazon_df.columns:
        amazon_df['Data'] = pd.to_datetime(amazon_df['Data'], errors='coerce')
        metricas_amazon['periodo_cobertura'] = f"{amazon_df['Data'].min().strftime('%Y-%m')} a {amazon_df['Data'].max().strftime('%Y-%m')}"
        metricas_amazon['meses_cobertura'] = amazon_df['Data'].dt.to_period('M').nunique()
    
    if 'Receita de enviados' in amazon_df.columns:
        metricas_amazon['receita_total'] = float(amazon_df['Receita de enviados'].sum())
    
    if 'Unidades enviadas' in amazon_df.columns:
        metricas_amazon['unidades_total'] = int(amazon_df['Unidades enviadas'].sum())
    
    metricas_amazon['produtos_unicos'] = amazon_df['ASIN'].nunique() if 'ASIN' in amazon_df.columns else 0
    
    print(f"✅ Amazon processado: {metricas_amazon['total_registros']:,} registros")
    print(f"   Completude: {metricas_amazon['completude_media']:.1f}%")
    print(f"   Consistência: {metricas_amazon['consistencia']:.1f}%")
    
except Exception as e:
    print(f"❌ Erro ao processar Amazon: {e}")
    metricas_amazon = {'fonte': 'Amazon', 'erro': str(e)}

# ============================================================================
# 4. ANÁLISE SCANNTECH
# ============================================================================

print("\n📈 ANALISANDO DADOS SCANNTECH...")
try:
    scanntech_df = pd.read_excel('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/scanntech_data.xls', engine='xlrd')
    
    metricas_scanntech = calcular_metricas_qualidade(scanntech_df, 'Scanntech')
    
    # Filtrar apenas Nutrimental
    if 'Visão SKU Player + outros' in scanntech_df.columns:
        nutry_df = scanntech_df[scanntech_df['Visão SKU Player + outros'].str.contains('NUTRY|ALLNUTRI', case=False, na=False)]
        metricas_scanntech['registros_nutrimental'] = len(nutry_df)
        metricas_scanntech['percentual_nutrimental'] = round((len(nutry_df) / len(scanntech_df)) * 100, 2)
    
    # Período
    if 'Mês de Data Campo' in scanntech_df.columns:
        metricas_scanntech['periodo_cobertura'] = f"{scanntech_df['Mês de Data Campo'].min()} a {scanntech_df['Mês de Data Campo'].max()}"
        metricas_scanntech['meses_cobertura'] = scanntech_df['Mês de Data Campo'].nunique()
    
    # Regiões
    if 'Reg Canal' in scanntech_df.columns:
        metricas_scanntech['regioes_cobertas'] = scanntech_df['Reg Canal'].nunique()
    
    # SKUs Nutrimental
    if 'Visão SKU Player + outros' in scanntech_df.columns:
        skus_nutry = nutry_df['Visão SKU Player + outros'].nunique() if len(nutry_df) > 0 else 0
        metricas_scanntech['skus_nutrimental'] = skus_nutry
    
    print(f"✅ Scanntech processado: {metricas_scanntech['total_registros']:,} registros")
    print(f"   Completude: {metricas_scanntech['completude_media']:.1f}%")
    print(f"   Consistência: {metricas_scanntech['consistencia']:.1f}%")
    print(f"   Nutrimental: {metricas_scanntech.get('registros_nutrimental', 0):,} registros ({metricas_scanntech.get('percentual_nutrimental', 0):.1f}%)")
    
except Exception as e:
    print(f"❌ Erro ao processar Scanntech: {e}")
    metricas_scanntech = {'fonte': 'Scanntech', 'erro': str(e)}

# ============================================================================
# 5. CONSOLIDAÇÃO E SCORE GERAL
# ============================================================================

print("\n" + "=" * 80)
print("📊 CONSOLIDAÇÃO DAS MÉTRICAS")
print("=" * 80)

metricas_consolidadas = {
    'data_analise': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
    'fontes': {
        'mtrix': metricas_mtrix,
        'amazon': metricas_amazon,
        'scanntech': metricas_scanntech
    }
}

# Calcular score geral de qualidade
scores = []
for fonte in ['mtrix', 'amazon', 'scanntech']:
    if 'erro' not in metricas_consolidadas['fontes'][fonte]:
        completude = metricas_consolidadas['fontes'][fonte]['completude_media']
        consistencia = metricas_consolidadas['fontes'][fonte]['consistencia']
        score = (completude * 0.6 + consistencia * 0.4)
        scores.append(score)
        metricas_consolidadas['fontes'][fonte]['score_qualidade'] = round(score, 2)

if scores:
    metricas_consolidadas['score_geral'] = round(np.mean(scores), 2)
    metricas_consolidadas['classificacao'] = (
        'EXCELENTE' if metricas_consolidadas['score_geral'] >= 95 else
        'MUITO BOM' if metricas_consolidadas['score_geral'] >= 90 else
        'BOM' if metricas_consolidadas['score_geral'] >= 80 else
        'REGULAR' if metricas_consolidadas['score_geral'] >= 70 else
        'RUIM'
    )

# Converter tipos numpy para tipos Python nativos
def converter_tipos(obj):
    if isinstance(obj, dict):
        return {k: converter_tipos(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [converter_tipos(item) for item in obj]
    elif isinstance(obj, (np.int64, np.int32)):
        return int(obj)
    elif isinstance(obj, (np.float64, np.float32)):
        return float(obj)
    else:
        return obj

metricas_consolidadas = converter_tipos(metricas_consolidadas)

# Salvar em JSON
with open('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/metricas_acuracia.json', 'w', encoding='utf-8') as f:
    json.dump(metricas_consolidadas, f, indent=2, ensure_ascii=False)

print(f"\n🎯 SCORE GERAL DE QUALIDADE: {metricas_consolidadas.get('score_geral', 0):.1f}%")
print(f"📊 CLASSIFICAÇÃO: {metricas_consolidadas.get('classificacao', 'N/A')}")

print("\n✅ Métricas salvas em: metricas_acuracia.json")
print("=" * 80)
