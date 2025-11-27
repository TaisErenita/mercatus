#!/usr/bin/env python3
"""
Script para gerar arquivos JavaScript otimizados para o dashboard
"""
import json
import pandas as pd
from datetime import datetime

def generate_mtrix_js():
    """Gera arquivo JavaScript otimizado para MTRIX"""
    print("Gerando mtrixDataReal.js...")
    
    df = pd.read_csv("mtrix_data.csv", encoding='latin-1', low_memory=False)
    
    # Limpar preço
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
    
    # Limpar coluna de vendas
    df['Vendas Limpas'] = pd.to_numeric(df['# Sell-Out \n(Und)'], errors='coerce').fillna(0)
    
    # Agregar dados por distribuidor (Top 10)
    top_distribuidores = df.groupby('Agente de Distribuição').agg({
        'Vendas Limpas': 'sum',
        'Preço Limpo': 'mean'
    }).reset_index().sort_values('Vendas Limpas', ascending=False).head(10)
    top_distribuidores.rename(columns={'Vendas Limpas': 'Vendas'}, inplace=True)
    
    # Agregar por UF
    vendas_uf = df.groupby('UF').agg({
        'Vendas Limpas': 'sum'
    }).reset_index().sort_values('Vendas Limpas', ascending=False)
    vendas_uf.rename(columns={'Vendas Limpas': 'Vendas'}, inplace=True)
    
    # Agregar por categoria
    vendas_categoria = df.groupby('Categoria').agg({
        'Vendas Limpas': 'sum',
        'Preço Limpo': 'mean'
    }).reset_index()
    vendas_categoria.rename(columns={'Vendas Limpas': 'Vendas'}, inplace=True)
    
    # Criar estrutura JavaScript
    data_atual = datetime.now().strftime('%d/%m/%Y %H:%M')
    total_registros = f"{len(df):,}"
    total_vendas = int(df['Vendas Limpas'].sum())
    total_dist = df['Agente de Distribuição'].nunique()
    total_ufs = df['UF'].nunique()
    total_cats = df['Categoria'].nunique()
    preco_medio = f"{df['Preço Limpo'].mean():.2f}"
    
    js_content = f"""// Dados MTRIX - Atualizado em {data_atual}
// Total de registros processados: {total_registros}

export const getMtrixDistribuidores = () => {{
  return {json.dumps(top_distribuidores.to_dict('records'), indent=2, ensure_ascii=False)};
}};

export const getMtrixVendasPorUF = () => {{
  return {json.dumps(vendas_uf.to_dict('records'), indent=2, ensure_ascii=False)};
}};

export const getMtrixVendasPorCategoria = () => {{
  return {json.dumps(vendas_categoria.to_dict('records'), indent=2, ensure_ascii=False)};
}};

export const getMtrixSummary = () => {{
  return {{
    totalVendas: {total_vendas},
    totalDistribuidores: {total_dist},
    totalUFs: {total_ufs},
    totalCategorias: {total_cats},
    precoMedio: {preco_medio}
  }};
}};
"""
    
    with open('../src/data/mtrixDataReal.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"  ✅ mtrixDataReal.js gerado ({len(js_content)} bytes)")
    return True

def generate_amazon_js():
    """Gera arquivo JavaScript otimizado para Amazon"""
    print("Gerando amazonDataReal.js...")
    
    df = pd.read_excel("amazon_data.xlsx", sheet_name=0)
    
    # Limpar dados
    df['Data'] = pd.to_datetime(df['Data'])
    df['Ano_Mes'] = df['Data'].dt.to_period('M').astype(str)
    df['Receita de enviados'] = pd.to_numeric(df['Receita de enviados'], errors='coerce').fillna(0)
    df['Unidades enviadas'] = pd.to_numeric(df['Unidades enviadas'], errors='coerce').fillna(0)
    
    # Top 10 produtos
    top_produtos = df.groupby(['ASIN', 'Nome do produto']).agg({
        'Receita de enviados': 'sum',
        'Unidades enviadas': 'sum'
    }).reset_index().sort_values('Receita de enviados', ascending=False).head(10)
    
    # Vendas por mês (últimos 12 meses)
    vendas_mes = df.groupby('Ano_Mes').agg({
        'Receita de enviados': 'sum',
        'Unidades enviadas': 'sum'
    }).reset_index().tail(12)
    
    # Criar estrutura JavaScript
    data_atual = datetime.now().strftime('%d/%m/%Y %H:%M')
    total_registros = f"{len(df):,}"
    receita_total = f"{float(df['Receita de enviados'].sum()):.2f}"
    unidades_total = int(df['Unidades enviadas'].sum())
    produtos_unicos = df['ASIN'].nunique()
    ticket_medio = f"{(df['Receita de enviados'].sum() / df['Unidades enviadas'].sum()):.2f}"
    
    js_content = f"""// Dados Amazon - Atualizado em {data_atual}
// Total de registros processados: {total_registros}

export const getAmazonTopProdutos = () => {{
  return {json.dumps(top_produtos.to_dict('records'), indent=2, ensure_ascii=False)};
}};

export const getAmazonVendasPorMes = () => {{
  return {json.dumps(vendas_mes.to_dict('records'), indent=2, ensure_ascii=False)};
}};

export const getAmazonSummary = () => {{
  return {{
    receitaTotal: {receita_total},
    unidadesTotal: {unidades_total},
    produtosUnicos: {produtos_unicos},
    ticketMedio: {ticket_medio}
  }};
}};
"""
    
    with open('../src/data/amazonDataReal.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"  ✅ amazonDataReal.js gerado ({len(js_content)} bytes)")
    return True

if __name__ == "__main__":
    print("="*60)
    print("GERANDO ARQUIVOS JAVASCRIPT PARA O DASHBOARD")
    print("="*60)
    
    generate_mtrix_js()
    generate_amazon_js()
    
    print("\n" + "="*60)
    print("ARQUIVOS GERADOS COM SUCESSO!")
    print("="*60)
    print("Arquivos atualizados:")
    print("  - src/data/mtrixDataReal.js")
    print("  - src/data/amazonDataReal.js")
