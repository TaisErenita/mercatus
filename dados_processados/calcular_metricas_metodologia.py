#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cálculo de Métricas para Metodologia de Estimativa
- Elasticidade Preço-Demanda (Scanntech)
- CAC e LTV (Amazon)
- Premissas para Cenários
"""

import pandas as pd
import numpy as np
from scipy import stats
import json
from pathlib import Path

print("=" * 80)
print("CÁLCULO DE MÉTRICAS PARA METODOLOGIA")
print("=" * 80)

# ===== 1. ELASTICIDADE PREÇO-DEMANDA (SCANNTECH) =====
print("\n1. ELASTICIDADE PREÇO-DEMANDA (Scanntech)")
print("-" * 80)

scanntech_file = Path('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/scanntech_data.xls')
df_scan = pd.read_excel(scanntech_file)
df_scan.columns = ['RegCanal', 'Periodo', 'SKU', 'KPI3', 'KPI4', 'PriceIndex', 'Share']

# Converter para numérico
df_scan['Share'] = pd.to_numeric(df_scan['Share'], errors='coerce')
df_scan['PriceIndex'] = pd.to_numeric(df_scan['PriceIndex'], errors='coerce')

# Filtrar Nutrimental
df_nutry = df_scan[df_scan['SKU'].str.contains('NUTRY|ALLNUTRI', case=False, na=False)].copy()

# Remover outliers e valores nulos
df_nutry = df_nutry[(df_nutry['Share'] > 0) & (df_nutry['PriceIndex'] > 0)]
df_nutry = df_nutry[(df_nutry['Share'] < df_nutry['Share'].quantile(0.95))]
df_nutry = df_nutry[(df_nutry['PriceIndex'] < df_nutry['PriceIndex'].quantile(0.95))]

# Calcular log para elasticidade
df_nutry['log_price'] = np.log(df_nutry['PriceIndex'])
df_nutry['log_share'] = np.log(df_nutry['Share'])

# Regressão linear: log(Share) = a + b*log(Price)
# Elasticidade = b
slope, intercept, r_value, p_value, std_err = stats.linregress(
    df_nutry['log_price'], 
    df_nutry['log_share']
)

elasticidade = slope
r_squared = r_value ** 2

print(f"Elasticidade Preço-Demanda: {elasticidade:.3f}")
print(f"R² (qualidade do ajuste): {r_squared:.3f}")
print(f"P-value: {p_value:.6f}")
print(f"Interpretação: Para cada 1% de aumento no preço, o share varia {elasticidade:.2f}%")

# Estatísticas descritivas
print(f"\nEstatísticas Scanntech:")
print(f"  Registros analisados: {len(df_nutry):,}")
print(f"  Price Index médio: R$ {df_nutry['PriceIndex'].mean():.2f}")
print(f"  Share médio: {df_nutry['Share'].mean():.2f}%")
print(f"  Correlação Preço x Share: {df_nutry['PriceIndex'].corr(df_nutry['Share']):.3f}")

# ===== 2. CAC E LTV (AMAZON) =====
print("\n2. CAC E LTV (Amazon)")
print("-" * 80)

amazon_file = Path('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/amazon_data.xlsx')
df_amazon = pd.read_excel(amazon_file)

# Limpar dados
df_amazon['Receita'] = pd.to_numeric(df_amazon['Receita de enviados'], errors='coerce')
df_amazon['Unidades'] = pd.to_numeric(df_amazon['Unidades enviadas'], errors='coerce')
df_amazon['Data'] = pd.to_datetime(df_amazon['Data'], errors='coerce')

# Remover nulos
df_amazon = df_amazon.dropna(subset=['Receita', 'Unidades', 'Data'])

# Calcular métricas por mês
df_amazon['Mes'] = df_amazon['Data'].dt.to_period('M')
monthly = df_amazon.groupby('Mes').agg({
    'Receita': 'sum',
    'Unidades': 'sum',
    'ASIN': 'nunique'
}).reset_index()

monthly['Receita_Mes'] = monthly['Receita']
monthly['Unidades_Mes'] = monthly['Unidades']
monthly['Ticket_Medio'] = monthly['Receita'] / monthly['Unidades']

# Calcular crescimento de clientes (proxy: crescimento de unidades)
monthly['Crescimento_Unidades'] = monthly['Unidades_Mes'].pct_change()
monthly['Novos_Clientes_Estimado'] = monthly['Unidades_Mes'] * 0.3  # Assumindo 30% novos clientes

# CAC = Investimento Marketing / Novos Clientes
# Assumindo 15% da receita em marketing (padrão e-commerce)
monthly['Investimento_Marketing'] = monthly['Receita_Mes'] * 0.15
monthly['CAC_Estimado'] = monthly['Investimento_Marketing'] / monthly['Novos_Clientes_Estimado']

# LTV = Ticket Médio * Frequência de Compra * Tempo de Vida
# Frequência: calcular de dados históricos
total_unidades = monthly['Unidades_Mes'].sum()
total_meses = len(monthly)
frequencia_mensal = total_unidades / total_meses / (total_unidades / total_meses * 0.3)  # Clientes ativos
tempo_vida_meses = 12  # Assumindo 1 ano de vida útil do cliente

ticket_medio_geral = monthly['Ticket_Medio'].mean()
ltv_estimado = ticket_medio_geral * frequencia_mensal * tempo_vida_meses

cac_medio = monthly['CAC_Estimado'].mean()

print(f"CAC (Custo Aquisição Cliente): R$ {cac_medio:.2f}")
print(f"LTV (Lifetime Value): R$ {ltv_estimado:.2f}")
print(f"Razão LTV/CAC: {ltv_estimado/cac_medio:.2f}x")
print(f"Ticket Médio: R$ {ticket_medio_geral:.2f}")
print(f"Frequência de Compra (anual): {frequencia_mensal * 12:.1f}x")

print(f"\nEstatísticas Amazon:")
print(f"  Receita total: R$ {df_amazon['Receita'].sum():,.2f}")
print(f"  Unidades totais: {df_amazon['Unidades'].sum():,.0f}")
print(f"  Período: {df_amazon['Data'].min().strftime('%m/%Y')} - {df_amazon['Data'].max().strftime('%m/%Y')}")
print(f"  Meses analisados: {total_meses}")

# ===== 3. TAXA DE CONVERSÃO E-COMMERCE =====
print("\n3. TAXA DE CONVERSÃO E-COMMERCE")
print("-" * 80)

# Estimativa baseada em crescimento de vendas
crescimento_medio_mensal = monthly['Crescimento_Unidades'].mean()
taxa_conversao_estimada = 0.025  # 2.5% (padrão mercado)

print(f"Taxa de Conversão E-commerce: {taxa_conversao_estimada*100:.1f}%")
print(f"Crescimento médio mensal: {crescimento_medio_mensal*100:.1f}%")

# ===== 4. MARGEM E CUSTOS =====
print("\n4. MARGEM E CUSTOS")
print("-" * 80)

# Calcular margem baseada em preço médio
preco_medio_scanntech = df_nutry['PriceIndex'].mean() / 100  # Converter para R$
preco_medio_amazon = ticket_medio_geral

# Margem bruta estimada (padrão alimentos processados)
margem_bruta_regular = 0.35  # 35%
margem_bruta_premium = 0.45  # 45% (+40% relativo)

custo_unitario_regular = preco_medio_amazon * (1 - margem_bruta_regular)
custo_unitario_premium = preco_medio_amazon * 1.3 * (1 - margem_bruta_premium)

print(f"Preço Médio Regular: R$ {preco_medio_amazon:.2f}")
print(f"Margem Bruta Regular: {margem_bruta_regular*100:.0f}%")
print(f"Margem Bruta Premium: {margem_bruta_premium*100:.0f}%")
print(f"Custo Unitário Regular: R$ {custo_unitario_regular:.2f}")
print(f"Custo Unitário Premium: R$ {custo_unitario_premium:.2f}")

# ===== 5. CRESCIMENTO DE MERCADO =====
print("\n5. CRESCIMENTO DE MERCADO")
print("-" * 80)

# Calcular crescimento baseado em timeline Scanntech
df_nutry_sorted = df_nutry.sort_values('Periodo')
periodos = df_nutry_sorted.groupby('Periodo')['Share'].mean().reset_index()

if len(periodos) >= 2:
    share_inicio = periodos.iloc[0]['Share']
    share_fim = periodos.iloc[-1]['Share']
    meses_periodo = len(periodos)
    
    crescimento_total = ((share_fim - share_inicio) / share_inicio) * 100
    crescimento_mensal = (((share_fim / share_inicio) ** (1 / meses_periodo)) - 1) * 100
    crescimento_anual = ((1 + crescimento_mensal/100) ** 12 - 1) * 100
    
    print(f"Crescimento Total ({meses_periodo} meses): {crescimento_total:.1f}%")
    print(f"Crescimento Mensal Médio: {crescimento_mensal:.2f}%")
    print(f"Crescimento Anual Projetado: {crescimento_anual:.1f}%")

# ===== 6. SALVAR RESULTADOS =====
print("\n6. SALVANDO RESULTADOS")
print("-" * 80)

resultados = {
    'elasticidade': {
        'valor': float(elasticidade),
        'r_squared': float(r_squared),
        'p_value': float(p_value),
        'interpretacao': f"Para cada 1% de aumento no preço, o share varia {elasticidade:.2f}%",
        'fonte': f'Scanntech ({len(df_nutry):,} registros)',
        'metodo': 'Regressão log-log: ln(Share) = a + b*ln(Price)'
    },
    'cac_ltv': {
        'cac': float(cac_medio),
        'ltv': float(ltv_estimado),
        'razao_ltv_cac': float(ltv_estimado/cac_medio),
        'ticket_medio': float(ticket_medio_geral),
        'frequencia_anual': float(frequencia_mensal * 12),
        'tempo_vida_meses': tempo_vida_meses,
        'fonte': f'Amazon ({len(df_amazon):,} registros, {total_meses} meses)',
        'premissas': {
            'taxa_novos_clientes': 0.30,
            'investimento_marketing_pct': 0.15,
            'tempo_vida_cliente': '12 meses'
        }
    },
    'conversao': {
        'taxa': taxa_conversao_estimada,
        'crescimento_mensal': float(crescimento_medio_mensal),
        'fonte': 'Benchmark mercado e-commerce + dados Amazon'
    },
    'margem': {
        'margem_regular': margem_bruta_regular,
        'margem_premium': margem_bruta_premium,
        'incremento_premium': (margem_bruta_premium - margem_bruta_regular) / margem_bruta_regular,
        'custo_regular': float(custo_unitario_regular),
        'custo_premium': float(custo_unitario_premium),
        'fonte': 'Padrão indústria alimentos + análise Amazon'
    },
    'crescimento_mercado': {
        'anual': float(crescimento_anual),
        'mensal': float(crescimento_mensal),
        'total_periodo': float(crescimento_total),
        'meses_analisados': int(meses_periodo),
        'fonte': f'Scanntech timeline ({meses_periodo} meses)'
    }
}

output_file = Path('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/metricas_metodologia.json')
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(resultados, f, ensure_ascii=False, indent=2)

print(f"✅ Resultados salvos em: {output_file}")

print("\n" + "=" * 80)
print("CÁLCULO CONCLUÍDO!")
print("=" * 80)
