#!/usr/bin/env python3
"""
Recalcular Elasticidade e ROI com Nova Base Scanntech
"""

import pandas as pd
import numpy as np
from scipy import stats
import json

print("=" * 80)
print("RECALCULANDO ELASTICIDADE E ROI - NOVA BASE SCANNTECH")
print("=" * 80)

# Carregar nova base
df = pd.read_excel('/home/ubuntu/upload/BaseScanntech-VOLUMETRIA.xlsx')
df['Preço (Kg)'] = pd.to_numeric(df['Preço (Kg)'], errors='coerce')
df_nutri = df[df['Fabricante'] == 'NUTRIMENTAL'].copy()

print(f"\n✅ Base carregada: {len(df_nutri):,} registros Nutrimental")

# ============================================================================
# 1. CALCULAR ELASTICIDADE PREÇO-DEMANDA
# ============================================================================

print("\n" + "=" * 80)
print("1. ELASTICIDADE PREÇO-DEMANDA")
print("=" * 80)

# Calcular share por período
df['Regiao'] = df['Reg Canal'].str[:2]
df_nutri['Regiao'] = df_nutri['Reg Canal'].str[:2]

# Agrupar por mês e região
total_por_mes_regiao = df.groupby(['Mês de Data Campo', 'Regiao']).agg({
    'Vendas $': 'sum',
    'Volume (Kg)': 'sum'
}).reset_index()

nutri_por_mes_regiao = df_nutri.groupby(['Mês de Data Campo', 'Regiao']).agg({
    'Vendas $': 'sum',
    'Volume (Kg)': 'sum',
    'Preço (Kg)': 'mean'
}).reset_index()

# Calcular share
merged = nutri_por_mes_regiao.merge(
    total_por_mes_regiao, 
    on=['Mês de Data Campo', 'Regiao'],
    suffixes=('_nutri', '_total')
)

merged['Share_Volume'] = merged['Volume (Kg)_nutri'] / merged['Volume (Kg)_total']
merged['Share_Vendas'] = merged['Vendas $_nutri'] / merged['Vendas $_total']

# Remover NaN e infinitos
merged = merged.replace([np.inf, -np.inf], np.nan).dropna()

# Filtrar valores válidos
merged = merged[
    (merged['Preço (Kg)'] > 0) & 
    (merged['Share_Volume'] > 0) &
    (merged['Share_Volume'] < 1)
]

print(f"\n📊 Registros válidos para regressão: {len(merged)}")

# Regressão log-log
log_preco = np.log(merged['Preço (Kg)'])
log_share = np.log(merged['Share_Volume'])

slope, intercept, r_value, p_value, std_err = stats.linregress(log_preco, log_share)

elasticidade = slope
r_squared = r_value ** 2

print(f"\n📊 ELASTICIDADE PREÇO-DEMANDA:")
print(f"   Valor: {elasticidade:.3f}")
print(f"   R²: {r_squared:.3f} ({r_squared*100:.1f}%)")
print(f"   P-value: {p_value:.6f}")
print(f"   Erro padrão: {std_err:.3f}")

if abs(elasticidade) < 1:
    print(f"   Interpretação: DEMANDA INELÁSTICA (|ε| < 1)")
else:
    print(f"   Interpretação: DEMANDA ELÁSTICA (|ε| > 1)")

# ============================================================================
# 2. RECALCULAR ROI DAS INICIATIVAS
# ============================================================================

print("\n" + "=" * 80)
print("2. ROI DAS INICIATIVAS")
print("=" * 80)

# Carregar métricas
with open('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/metricas_nova_base.json', 'r') as f:
    metricas = json.load(f)

vendas_total = metricas['totais_nutrimental']['vendas_total']
volume_total = metricas['totais_nutrimental']['volume_total_kg']
preco_medio = metricas['totais_nutrimental']['preco_medio_kg']

print(f"\n📊 BASE ATUAL:")
print(f"   Vendas Total: R$ {vendas_total:,.2f}")
print(f"   Volume Total: {volume_total:,.2f} kg")
print(f"   Preço Médio: R$ {preco_medio:.2f}/kg")

# Recalcular ROI das iniciativas
iniciativas = [
    {
        'nome': 'Ajuste Precificação Regional',
        'investimento': 250000,
        'aumento_preco_pct': 0.10,  # +10% no preço
        'reducao_volume_pct': abs(elasticidade) * 0.10,  # Elasticidade aplicada
        'margem': 0.35
    },
    {
        'nome': 'Expansão E-commerce',
        'investimento': 1200000,
        'aumento_volume_pct': 0.25,  # +25% volume
        'margem': 0.40
    },
    {
        'nome': 'Expansão Sul',
        'investimento': 1800000,
        'share_atual': 0.222,
        'share_meta': 0.350,
        'mercado_total_sul': metricas['por_regiao']['SU']['Vendas $'] / 0.222,
        'margem': 0.35
    },
    {
        'nome': 'Expansão Norte (Consolidação)',
        'investimento': 1500000,
        'share_atual': 0.574,
        'share_meta': 0.650,
        'mercado_total_norte': metricas['por_regiao']['NO']['Vendas $'] / 0.574,
        'margem': 0.35
    },
    {
        'nome': 'Linha Premium (Proteína)',
        'investimento': 800000,
        'volume_novo_kg': 50000,
        'preco_kg': 185,  # Preço médio proteína
        'margem': 0.45
    }
]

resultados_roi = []

for ini in iniciativas:
    nome = ini['nome']
    investimento = ini['investimento']
    margem = ini['margem']
    
    # Calcular receita incremental
    if 'aumento_preco_pct' in ini:
        # Precificação
        novo_preco = preco_medio * (1 + ini['aumento_preco_pct'])
        novo_volume = volume_total * (1 - ini['reducao_volume_pct'])
        receita_nova = novo_preco * novo_volume
        receita_atual = preco_medio * volume_total
        receita_incremental = receita_nova - receita_atual
        
    elif 'aumento_volume_pct' in ini:
        # Expansão volume
        volume_incremental = volume_total * ini['aumento_volume_pct']
        receita_incremental = volume_incremental * preco_medio
        
    elif 'share_meta' in ini:
        # Expansão regional
        mercado_total = ini['mercado_total_sul'] if 'sul' in nome.lower() else ini['mercado_total_norte']
        receita_nova = mercado_total * ini['share_meta']
        receita_atual = mercado_total * ini['share_atual']
        receita_incremental = receita_nova - receita_atual
        
    elif 'volume_novo_kg' in ini:
        # Linha nova
        receita_incremental = ini['volume_novo_kg'] * ini['preco_kg']
    
    # Calcular ROI
    lucro_anual = receita_incremental * margem
    roi = lucro_anual / investimento
    payback_meses = (investimento / lucro_anual * 12) if lucro_anual > 0 else 999
    
    resultado = {
        'nome': nome,
        'investimento': investimento,
        'receita_incremental_ano': receita_incremental,
        'lucro_anual': lucro_anual,
        'roi': roi,
        'payback_meses': payback_meses,
        'margem': margem
    }
    
    resultados_roi.append(resultado)
    
    print(f"\n📊 {nome}:")
    print(f"   Investimento: R$ {investimento:,.0f}")
    print(f"   Receita/ano: R$ {receita_incremental:,.0f}")
    print(f"   Lucro/ano: R$ {lucro_anual:,.0f}")
    print(f"   ROI: {roi:.2f}x")
    print(f"   Payback: {payback_meses:.0f} meses")

# ============================================================================
# 3. SALVAR RESULTADOS
# ============================================================================

resultados = {
    'data_calculo': pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S'),
    'fonte': 'BaseScanntech-VOLUMETRIA.xlsx',
    
    'elasticidade': {
        'valor': float(elasticidade),
        'r_squared': float(r_squared),
        'p_value': float(p_value),
        'erro_padrao': float(std_err),
        'interpretacao': 'INELÁSTICA' if abs(elasticidade) < 1 else 'ELÁSTICA',
        'registros_usados': len(merged)
    },
    
    'base_atual': {
        'vendas_total': float(vendas_total),
        'volume_total_kg': float(volume_total),
        'preco_medio_kg': float(preco_medio)
    },
    
    'roi_iniciativas': resultados_roi
}

with open('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/elasticidade_roi_nova_base.json', 'w', encoding='utf-8') as f:
    json.dump(resultados, f, indent=2, ensure_ascii=False)

print("\n" + "=" * 80)
print("✅ CÁLCULOS SALVOS EM: elasticidade_roi_nova_base.json")
print("=" * 80)
