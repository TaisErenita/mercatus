#!/usr/bin/env python3
"""
Cálculo do R² do Modelo Preditivo - Dashboard Mercatus
Modelo de previsão de vendas baseado em múltiplas variáveis
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_percentage_error, mean_squared_error
from sklearn.preprocessing import LabelEncoder
import warnings
warnings.filterwarnings('ignore')

print("=" * 80)
print("CÁLCULO DO R² DO MODELO PREDITIVO - DASHBOARD MERCATUS")
print("=" * 80)

# ============================================================================
# 1. CARREGAR DADOS
# ============================================================================

print("\n📊 Carregando dados...")

# MTRIX - Dados de sell-out
mtrix_df = pd.read_csv('/home/ubuntu/upload/MTRIX-Sellout-Nutry-2025-2semestre-atualizado-12112025(Sheet1).csv', 
                       encoding='latin-1', low_memory=False)

# Scanntech - Dados de sell-through
scanntech_df = pd.read_excel('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/scanntech_data.xls', 
                             engine='xlrd')

print(f"✅ MTRIX: {len(mtrix_df):,} registros")
print(f"✅ Scanntech: {len(scanntech_df):,} registros")

# ============================================================================
# 2. PREPARAR DADOS PARA MODELO PREDITIVO
# ============================================================================

print("\n🔧 Preparando dados para modelo...")

# Usar MTRIX como base (sell-out)
df = mtrix_df.copy()

# Criar features
# Formato: 2025/JUL
df['Ano_Mes'] = df['Ano/Mês'].astype(str)
df['Ano'] = df['Ano_Mes'].str.split('/').str[0]
df['Mes_Nome'] = df['Ano_Mes'].str.split('/').str[1]

# Converter ano para int
df = df[df['Ano'].str.isnumeric()].copy()
df['Ano'] = df['Ano'].astype(int)

# Mapear mês para número
meses_map = {
    'JAN': 1, 'FEV': 2, 'MAR': 3, 'ABR': 4, 'MAI': 5, 'JUN': 6,
    'JUL': 7, 'AGO': 8, 'SET': 9, 'OUT': 10, 'NOV': 11, 'DEZ': 12
}
df['Mes'] = df['Mes_Nome'].map(meses_map)
df = df[df['Mes'].notna()].copy()
df['Mes'] = df['Mes'].astype(int)

# Target: Sell-Out (Unidades)
# Nome da coluna pode variar, vamos procurar
possible_targets = ['Sell-Out (Unidades)', '# Sell-Out', 'Sell-Out']
target_col = None
for col in possible_targets:
    if col in df.columns:
        target_col = col
        break

if target_col is None:
    # Pegar coluna que contenha 'sell' no nome
    sell_cols = [col for col in df.columns if 'sell' in col.lower()]
    if sell_cols:
        target_col = sell_cols[0]
    else:
        raise ValueError(f"Coluna de vendas não encontrada. Colunas disponíveis: {df.columns.tolist()}")

print(f"✅ Coluna target: {target_col}")

# Remover linhas com target nulo
df = df[df[target_col].notna()].copy()

# Features categóricas
categorical_features = ['Agente de Distribuição', 'Segmento do PDV', 'UF', 'Categoria', 'Marca']

# Encoding de variáveis categóricas
le_dict = {}
for col in categorical_features:
    if col in df.columns:
        le = LabelEncoder()
        df[f'{col}_encoded'] = le.fit_transform(df[col].astype(str))
        le_dict[col] = le

# Features numéricas
feature_cols = [f'{col}_encoded' for col in categorical_features if col in df.columns] + ['Ano', 'Mes']

# Preparar X e y
X = df[feature_cols].copy()
y = df[target_col].copy()

print(f"✅ Features: {len(feature_cols)}")
print(f"✅ Registros para treino: {len(X):,}")

# ============================================================================
# 3. TREINAR MODELOS
# ============================================================================

print("\n🤖 Treinando modelos...")

# Split train/test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

resultados = {}

# Modelo 1: Linear Regression
print("\n1️⃣ Linear Regression...")
lr = LinearRegression()
lr.fit(X_train, y_train)
y_pred_lr = lr.predict(X_test)
r2_lr = r2_score(y_test, y_pred_lr)
mape_lr = mean_absolute_percentage_error(y_test, y_pred_lr) * 100
rmse_lr = np.sqrt(mean_squared_error(y_test, y_pred_lr))

resultados['Linear Regression'] = {
    'r2': r2_lr,
    'mape': mape_lr,
    'rmse': rmse_lr,
    'acuracia': (1 - mape_lr/100) * 100
}

print(f"   R²: {r2_lr:.4f} ({r2_lr*100:.2f}%)")
print(f"   MAPE: {mape_lr:.2f}%")
print(f"   Acurácia: {resultados['Linear Regression']['acuracia']:.2f}%")

# Modelo 2: Random Forest
print("\n2️⃣ Random Forest...")
rf = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42, n_jobs=-1)
rf.fit(X_train, y_train)
y_pred_rf = rf.predict(X_test)
r2_rf = r2_score(y_test, y_pred_rf)
mape_rf = mean_absolute_percentage_error(y_test, y_pred_rf) * 100
rmse_rf = np.sqrt(mean_squared_error(y_test, y_pred_rf))

resultados['Random Forest'] = {
    'r2': r2_rf,
    'mape': mape_rf,
    'rmse': rmse_rf,
    'acuracia': (1 - mape_rf/100) * 100
}

print(f"   R²: {r2_rf:.4f} ({r2_rf*100:.2f}%)")
print(f"   MAPE: {mape_rf:.2f}%")
print(f"   Acurácia: {resultados['Random Forest']['acuracia']:.2f}%")

# Modelo 3: Gradient Boosting
print("\n3️⃣ Gradient Boosting...")
gb = GradientBoostingRegressor(n_estimators=100, max_depth=5, random_state=42)
gb.fit(X_train, y_train)
y_pred_gb = gb.predict(X_test)
r2_gb = r2_score(y_test, y_pred_gb)
mape_gb = mean_absolute_percentage_error(y_test, y_pred_gb) * 100
rmse_gb = np.sqrt(mean_squared_error(y_test, y_pred_gb))

resultados['Gradient Boosting'] = {
    'r2': r2_gb,
    'mape': mape_gb,
    'rmse': rmse_gb,
    'acuracia': (1 - mape_gb/100) * 100
}

print(f"   R²: {r2_gb:.4f} ({r2_gb*100:.2f}%)")
print(f"   MAPE: {mape_gb:.2f}%")
print(f"   Acurácia: {resultados['Gradient Boosting']['acuracia']:.2f}%")

# ============================================================================
# 4. SELECIONAR MELHOR MODELO
# ============================================================================

print("\n" + "=" * 80)
print("📊 COMPARAÇÃO DE MODELOS")
print("=" * 80)

melhor_modelo = max(resultados.items(), key=lambda x: x[1]['r2'])

print(f"\n🏆 MELHOR MODELO: {melhor_modelo[0]}")
print(f"   R² Score: {melhor_modelo[1]['r2']:.4f} ({melhor_modelo[1]['r2']*100:.2f}%)")
print(f"   MAPE: {melhor_modelo[1]['mape']:.2f}%")
print(f"   Acurácia: {melhor_modelo[1]['acuracia']:.2f}%")
print(f"   RMSE: {melhor_modelo[1]['rmse']:.2f}")

# ============================================================================
# 5. FEATURE IMPORTANCE (Random Forest)
# ============================================================================

print("\n📊 IMPORTÂNCIA DAS FEATURES (Random Forest):")
feature_importance = pd.DataFrame({
    'feature': feature_cols,
    'importance': rf.feature_importances_
}).sort_values('importance', ascending=False)

print(feature_importance.head(10).to_string(index=False))

# ============================================================================
# 6. SALVAR RESULTADOS
# ============================================================================

import json

resultado_final = {
    'data_calculo': pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S'),
    'modelo_selecionado': melhor_modelo[0],
    'metricas': {
        'r2_score': round(melhor_modelo[1]['r2'], 4),
        'r2_percentual': round(melhor_modelo[1]['r2'] * 100, 2),
        'mape': round(melhor_modelo[1]['mape'], 2),
        'acuracia': round(melhor_modelo[1]['acuracia'], 2),
        'rmse': round(melhor_modelo[1]['rmse'], 2)
    },
    'comparacao_modelos': {
        nome: {
            'r2': round(metricas['r2'], 4),
            'r2_percentual': round(metricas['r2'] * 100, 2),
            'mape': round(metricas['mape'], 2),
            'acuracia': round(metricas['acuracia'], 2)
        }
        for nome, metricas in resultados.items()
    },
    'dados_treino': {
        'total_registros': len(df),
        'treino': len(X_train),
        'teste': len(X_test),
        'features': len(feature_cols)
    },
    'feature_importance_top5': [
        {
            'feature': row['feature'],
            'importance': round(row['importance'], 4)
        }
        for _, row in feature_importance.head(5).iterrows()
    ]
}

with open('/home/ubuntu/mercatus-nutrimental-dashboard/dados_processados/r2_modelo.json', 'w') as f:
    json.dump(resultado_final, f, indent=2)

print("\n✅ Resultados salvos em: r2_modelo.json")
print("=" * 80)
