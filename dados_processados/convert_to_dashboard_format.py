#!/usr/bin/env python3
"""
Script para converter dados processados em formato JavaScript para o dashboard
"""
import pandas as pd
import json
from datetime import datetime
from collections import defaultdict

def process_scanntech_for_dashboard():
    """Processa dados Scanntech e gera formato para dashboard"""
    print("Processando Scanntech para dashboard...")
    
    df = pd.read_excel("scanntech_data.xls", sheet_name=0)
    
    # Estrutura de dados para o dashboard
    dashboard_data = {
        "mercado_total": {},
        "marcas_por_regiao": {},
        "categorias": {},
        "updated_at": datetime.now().isoformat()
    }
    
    # Processar dados por categoria
    # Assumindo que a coluna 'Visão SKU Player + outros' contém as categorias/marcas
    
    print(f"Total de registros: {len(df)}")
    print(f"Colunas: {list(df.columns)}")
    
    return dashboard_data

def process_mtrix_for_dashboard():
    """Processa dados MTRIX e gera formato para dashboard"""
    print("Processando MTRIX para dashboard...")
    
    df = pd.read_csv("mtrix_data.csv", encoding='latin-1', low_memory=False)
    
    # Estrutura de dados para o dashboard
    dashboard_data = {
        "distribuidores": {},
        "vendas_por_uf": {},
        "vendas_por_categoria": {},
        "vendas_por_mes": {},
        "updated_at": datetime.now().isoformat()
    }
    
    # Processar vendas por distribuidor
    # Limpar coluna de preço
    def clean_price(x):
        try:
            if pd.isna(x) or x == '-' or x == '':
                return 0.0
            if isinstance(x, str):
                return float(x.replace('R$ ', '').replace(',', '.'))
            return float(x)
        except:
            return 0.0
    
    df['Preço Limpo'] = df['Preço Médio Unitário'].apply(clean_price)
    
    dist_data = df.groupby('Agente de Distribuição').agg({
        '# Sell-Out \n(Und)': 'sum',
        'Preço Limpo': 'mean'
    }).reset_index()
    dist_data.rename(columns={'Preço Limpo': 'Preço Médio'}, inplace=True)
    
    dashboard_data['distribuidores'] = dist_data.to_dict('records')
    
    # Processar vendas por UF
    uf_data = df.groupby('UF').agg({
        '# Sell-Out \n(Und)': 'sum'
    }).reset_index()
    
    dashboard_data['vendas_por_uf'] = uf_data.to_dict('records')
    
    # Processar vendas por categoria
    cat_data = df.groupby('Categoria').agg({
        '# Sell-Out \n(Und)': 'sum'
    }).reset_index()
    
    dashboard_data['vendas_por_categoria'] = cat_data.to_dict('records')
    
    print(f"Total de registros: {len(df)}")
    print(f"Distribuidores únicos: {df['Agente de Distribuição'].nunique()}")
    print(f"UFs únicas: {df['UF'].nunique()}")
    print(f"Categorias únicas: {df['Categoria'].nunique()}")
    
    return dashboard_data

def process_amazon_for_dashboard():
    """Processa dados Amazon e gera formato para dashboard"""
    print("Processando Amazon para dashboard...")
    
    df = pd.read_excel("amazon_data.xlsx", sheet_name=0)
    
    # Estrutura de dados para o dashboard
    dashboard_data = {
        "vendas_totais": {},
        "produtos_top": [],
        "vendas_por_mes": {},
        "updated_at": datetime.now().isoformat()
    }
    
    # Converter Data para datetime
    df['Data'] = pd.to_datetime(df['Data'])
    df['Ano_Mes'] = df['Data'].dt.to_period('M').astype(str)
    
    # Limpar colunas numéricas
    df['Receita de enviados'] = pd.to_numeric(df['Receita de enviados'], errors='coerce').fillna(0)
    df['Unidades enviadas'] = pd.to_numeric(df['Unidades enviadas'], errors='coerce').fillna(0)
    
    # Vendas totais
    dashboard_data['vendas_totais'] = {
        "receita_total": float(df['Receita de enviados'].sum()),
        "unidades_total": float(df['Unidades enviadas'].sum()),
        "produtos_unicos": int(df['ASIN'].nunique())
    }
    
    # Top produtos
    top_produtos = df.groupby(['ASIN', 'Nome do produto']).agg({
        'Receita de enviados': 'sum',
        'Unidades enviadas': 'sum'
    }).reset_index().sort_values('Receita de enviados', ascending=False).head(10)
    
    dashboard_data['produtos_top'] = top_produtos.to_dict('records')
    
    # Vendas por mês
    vendas_mes = df.groupby('Ano_Mes').agg({
        'Receita de enviados': 'sum',
        'Unidades enviadas': 'sum'
    }).reset_index()
    
    dashboard_data['vendas_por_mes'] = vendas_mes.to_dict('records')
    
    print(f"Total de registros: {len(df)}")
    print(f"Receita total: R$ {dashboard_data['vendas_totais']['receita_total']:,.2f}")
    print(f"Unidades totais: {dashboard_data['vendas_totais']['unidades_total']:,.0f}")
    
    return dashboard_data

if __name__ == "__main__":
    print("="*60)
    print("CONVERTENDO DADOS PARA FORMATO DO DASHBOARD")
    print("="*60)
    
    # Processar cada fonte
    scanntech_data = process_scanntech_for_dashboard()
    mtrix_data = process_mtrix_for_dashboard()
    amazon_data = process_amazon_for_dashboard()
    
    # Salvar em arquivos JSON
    with open('scanntech_dashboard.json', 'w', encoding='utf-8') as f:
        json.dump(scanntech_data, f, indent=2, ensure_ascii=False)
    
    with open('mtrix_dashboard.json', 'w', encoding='utf-8') as f:
        json.dump(mtrix_data, f, indent=2, ensure_ascii=False)
    
    with open('amazon_dashboard.json', 'w', encoding='utf-8') as f:
        json.dump(amazon_data, f, indent=2, ensure_ascii=False)
    
    print("\n" + "="*60)
    print("CONVERSÃO CONCLUÍDA!")
    print("="*60)
    print("Arquivos gerados:")
    print("  - scanntech_dashboard.json")
    print("  - mtrix_dashboard.json")
    print("  - amazon_dashboard.json")
