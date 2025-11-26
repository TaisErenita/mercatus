#!/usr/bin/env python3.11
# -*- coding: utf-8 -*-
"""
Conversor de Dados MTRIX para Formato do Dashboard
Converte dados processados para o formato esperado pelo mtrixData.js
"""

import json
import pandas as pd
from pathlib import Path
from datetime import datetime

# Configurações
DATA_DIR = Path("/home/ubuntu/upload")
OUTPUT_DIR = Path("/home/ubuntu/dados_processados")
DASHBOARD_DIR = Path("/home/ubuntu/mercatus-nutrimental-dashboard/src/data")

# Carregar dados processados
print("="*80)
print("CONVERSOR DE DADOS MTRIX PARA DASHBOARD")
print("="*80)

# Carregar JSON processado
json_file = OUTPUT_DIR / "mtrix_2025_2s_processado.json"
with open(json_file, 'r', encoding='utf-8') as f:
    dados = json.load(f)

print(f"\n✅ Dados carregados: {json_file.name}")
print(f"📊 Período: {dados['metadata']['periodo']}")
print(f"📦 Total de Unidades: {dados['resumo_geral']['total_unidades']:,.0f}")

# Mapear estados para regiões
REGIOES = {
    'brasil': ['SP', 'MG', 'PR', 'RJ', 'GO', 'SC', 'RN', 'ES', 'CE', 'RS', 'BA', 'PE', 'AL', 'MA', 'PB', 'SE', 'PI', 'MT', 'DF', 'MS', 'PA', 'AM', 'RO', 'AC', 'AP'],
    'sp_rj_mg_es': ['SP', 'RJ', 'MG', 'ES'],
    'sul': ['PR', 'SC', 'RS'],
    'ne_no_co': ['BA', 'CE', 'PE', 'RN', 'AL', 'MA', 'PB', 'SE', 'PI', 'GO', 'MT', 'DF', 'MS', 'PA', 'AM', 'RO', 'AC', 'AP', 'TO']
}

# Mapear categorias
CATEGORIAS_MAP = {
    'BARRA DE CEREAIS': 'cereais',
    'BARRAS DE FRUTAS': 'frutas',
    'BARRA NUTS': 'nuts',
    'BARRA PROTEICA': 'proteina',
    'AVEIA': 'cereais',
    'DOCE DE FRUTAS': 'frutas',
    'TUBE PROTEICO': 'proteina'
}

print("\n🔧 Processando dados por região e categoria...")

# Recarregar CSV para ter dados detalhados
csv_file = DATA_DIR / "MTRIX-Sellout-Nutry-2025-2semestre-atualizado-12112025(Sheet1).csv"
df = pd.read_csv(csv_file, encoding='ISO-8859-1', low_memory=False)

# Limpar colunas
df.columns = df.columns.str.strip()

# Função para limpar valores monetários
def limpar_valor(valor):
    if pd.isna(valor):
        return 0.0
    if isinstance(valor, (int, float)):
        return float(valor)
    valor_limpo = str(valor).replace('R$', '').replace(' ', '').replace(',', '.')
    try:
        return float(valor_limpo)
    except:
        return 0.0

# Limpar dados
df['# Sell-Out \n(R$)'] = df['# Sell-Out \n(R$)'].apply(limpar_valor)
df['Preço Médio Unitário'] = df['Preço Médio Unitário'].apply(limpar_valor)
df['# Sell-Out \n(Und)'] = pd.to_numeric(df['# Sell-Out \n(Und)'], errors='coerce').fillna(0)

# Filtrar vendas positivas
df = df[df['# Sell-Out \n(Und)'] > 0].copy()

# Mapear categorias
df['Categoria_Dash'] = df['Categoria'].map(CATEGORIAS_MAP).fillna('outros')

print(f"✅ {len(df):,} registros processados")

# Gerar estrutura de dados
dashboard_data = {}

# Para cada categoria
for cat_original, cat_dash in CATEGORIAS_MAP.items():
    if cat_dash not in dashboard_data:
        dashboard_data[cat_dash] = {
            'mes_yoy': {},
            'trimestre_yoy': {},
            'ytd_yoy': {}
        }
    
    # Filtrar por categoria
    df_cat = df[df['Categoria'] == cat_original].copy()
    
    if len(df_cat) == 0:
        continue
    
    # Para cada região
    for regiao, estados in REGIOES.items():
        df_regiao = df_cat[df_cat['UF'].isin(estados)].copy()
        
        if len(df_regiao) == 0:
            continue
        
        # Agregar por agente de distribuição
        agg = df_regiao.groupby('Agente de Distribuição').agg({
            '# Sell-Out \n(R$)': 'sum',
            '# Sell-Out \n(Und)': 'sum',
            'UF': 'first'
        }).reset_index()
        
        agg['precoMedio'] = (agg['# Sell-Out \n(R$)'] / agg['# Sell-Out \n(Und)']).round(2)
        agg = agg.sort_values('# Sell-Out \n(Und)', ascending=False).head(5)
        
        # Converter para formato do dashboard
        registros = []
        for _, row in agg.iterrows():
            registros.append({
                'distribuidor': row['Agente de Distribuição'],
                'faturamento': round(float(row['# Sell-Out \n(R$)']), 2),
                'volume': int(row['# Sell-Out \n(Und)']),
                'precoMedio': float(row['precoMedio']),
                'uf': row['UF']
            })
        
        # Adicionar aos períodos (usando mesmos dados para todos por enquanto)
        dashboard_data[cat_dash]['mes_yoy'][regiao] = registros
        dashboard_data[cat_dash]['trimestre_yoy'][regiao] = registros
        dashboard_data[cat_dash]['ytd_yoy'][regiao] = registros

# Adicionar categoria 'total'
dashboard_data['total'] = {
    'mes_yoy': {},
    'trimestre_yoy': {},
    'ytd_yoy': {}
}

for regiao, estados in REGIOES.items():
    df_regiao = df[df['UF'].isin(estados)].copy()
    
    if len(df_regiao) == 0:
        continue
    
    agg = df_regiao.groupby('Agente de Distribuição').agg({
        '# Sell-Out \n(R$)': 'sum',
        '# Sell-Out \n(Und)': 'sum',
        'UF': 'first'
    }).reset_index()
    
    agg['precoMedio'] = (agg['# Sell-Out \n(R$)'] / agg['# Sell-Out \n(Und)']).round(2)
    agg = agg.sort_values('# Sell-Out \n(Und)', ascending=False).head(5)
    
    registros = []
    for _, row in agg.iterrows():
        registros.append({
            'distribuidor': row['Agente de Distribuição'],
            'faturamento': round(float(row['# Sell-Out \n(R$)']), 2),
            'volume': int(row['# Sell-Out \n(Und)']),
            'precoMedio': float(row['precoMedio']),
            'uf': row['UF']
        })
    
    dashboard_data['total']['mes_yoy'][regiao] = registros
    dashboard_data['total']['trimestre_yoy'][regiao] = registros
    dashboard_data['total']['ytd_yoy'][regiao] = registros

# Salvar JSON intermediário
output_json = OUTPUT_DIR / "mtrix_dashboard_format.json"
with open(output_json, 'w', encoding='utf-8') as f:
    json.dump(dashboard_data, f, indent=2, ensure_ascii=False)

print(f"\n💾 Dados convertidos salvos em: {output_json.name}")

# Gerar arquivo JavaScript
print("\n📝 Gerando arquivo mtrixDataReal.js...")

js_content = f"""// Dados MTRIX Reais - Nutrimental
// Gerado automaticamente em {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}
// Fonte: MTRIX-Sellout-Nutry-2025-2semestre-atualizado-12112025
// Período: 2025 - 2º Semestre (Jul-Nov)

export const mtrixDataReal = {json.dumps(dashboard_data, indent=2, ensure_ascii=False)};

export default mtrixDataReal;
"""

output_js = DASHBOARD_DIR / "mtrixDataReal.js"
with open(output_js, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"✅ Arquivo JavaScript criado: {output_js}")

# Estatísticas
print("\n" + "="*80)
print("📊 RESUMO DA CONVERSÃO")
print("="*80)
print(f"Categorias processadas: {len([k for k in dashboard_data.keys() if k != 'total'])}")
print(f"Regiões por categoria: {len(REGIOES)}")
print(f"Períodos por região: 3 (mes_yoy, trimestre_yoy, ytd_yoy)")
print(f"\nArquivos gerados:")
print(f"  1. {output_json}")
print(f"  2. {output_js}")
print("="*80)
print("✅ CONVERSÃO CONCLUÍDA!")
print("="*80)
