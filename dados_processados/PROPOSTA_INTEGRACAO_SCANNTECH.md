# 📊 Proposta de Integração: Scanntech + MTRIX

## 🎯 Objetivo

Integrar dados de **sell-through** (Scanntech) com dados de **sell-out** (MTRIX) para criar uma visão completa da jornada do produto desde o distribuidor até o consumidor final.

---

## 📈 Análise de Complementaridade

### **MTRIX (Sell-out)**
- **O que mede:** Venda do distribuidor para o PDV
- **Granularidade:** Distribuidor, PDV individual, SKU, UF
- **Período:** 2023-2025 (histórico completo)
- **Volume:** 328.984 registros
- **Métricas:** Unidades vendidas, Receita, Preço médio
- **Cobertura:** 35 distribuidores, 25 UFs, 7 categorias

### **SCANNTECH (Sell-through)**
- **O que mede:** Venda do PDV para o consumidor final
- **Granularidade:** Região/Canal, Marca/SKU, Período mensal
- **Período:** Out/2024 - Nov/2025 (14 meses)
- **Volume:** 28.000 registros (7.098 Nutrimental = 25,4%)
- **Métricas:** Share de mercado, Price Index, KPIs de performance
- **Cobertura:** 14 regiões/canais, 51 SKUs Nutry/AllNutri

---

## 💡 Insights Estratégicos da Integração

### 1. **Análise de Giro de Estoque**
**Sell-out (MTRIX) vs Sell-through (Scanntech)**
- Identificar produtos com alto sell-out mas baixo sell-through → **Estoque parado no PDV**
- Identificar produtos com baixo sell-out mas alto sell-through → **Ruptura de estoque**

### 2. **Performance por Canal**
**Cruzamento Região/Canal (Scanntech) + UF/Distribuidor (MTRIX)**
- Mapear quais canais (1a4, 5a9, 10+, atc) têm melhor conversão
- Identificar oportunidades de expansão por região

### 3. **Elasticidade de Preço**
**Price Index (Scanntech) vs Preço Médio (MTRIX)**
- Analisar impacto de variações de preço no share de mercado
- Otimizar estratégia de pricing por região

### 4. **Share of Shelf vs Share of Market**
**Distribuição (MTRIX) vs Share (Scanntech)**
- Verificar se presença em PDVs se converte em share de mercado
- Identificar PDVs com baixa conversão

---

## 🎨 Proposta de Visualizações no Dashboard

### **Módulo 1: Visão Integrada Sell-out + Sell-through**

#### **1.1 Funil de Vendas**
```
Distribuidor → PDV → Consumidor
   (MTRIX)      (Gap)  (Scanntech)
```
**Métricas:**
- Volume sell-out (unidades)
- Taxa de conversão (sell-through / sell-out)
- Dias de estoque no PDV (estimado)

#### **1.2 Mapa de Calor Regional**
**Visualização:** Mapa do Brasil
- **Cor:** Intensidade de sell-out (MTRIX)
- **Tamanho:** Share de mercado (Scanntech)
- **Filtros:** Região, Canal, Período

#### **1.3 Análise de SKUs**
**Tabela Comparativa:**
| SKU | Sell-out (un) | Sell-through (share) | Giro | Status |
|-----|---------------|----------------------|------|--------|
| Nutry Bolo Chocolate 3x22g | 15.234 | 1,2% | ✅ Alto | Saudável |
| Nutry Castanha Caju 22g | 8.456 | 0,3% | ⚠️ Baixo | Atenção |

---

### **Módulo 2: Performance por Canal**

#### **2.1 Gráfico de Barras Empilhadas**
**Eixo X:** Canais (1a4, 5a9, 10+, atc)
**Eixo Y:** Volume
- **Barra inferior:** Sell-out (MTRIX)
- **Barra superior:** Sell-through estimado (Scanntech × fator)
- **Gap:** Diferença = estoque no PDV

#### **2.2 Ranking de Canais**
**Métricas:**
- Taxa de conversão (%)
- Share médio por canal
- Preço médio praticado
- Oportunidade de crescimento

---

### **Módulo 3: Análise de Preço e Elasticidade**

#### **3.1 Scatter Plot**
**Eixo X:** Price Index (Scanntech)
**Eixo Y:** Share de mercado (Scanntech)
**Tamanho bolha:** Volume sell-out (MTRIX)
**Cor:** Região

**Insight:** Identificar sweet spot de preço × share

#### **3.2 Série Temporal**
**Linha 1:** Preço médio MTRIX (sell-out)
**Linha 2:** Price Index Scanntech (sell-through)
**Linha 3:** Share de mercado
**Período:** Últimos 12 meses

---

### **Módulo 4: Alertas e Recomendações**

#### **4.1 Dashboard de Alertas**
🔴 **Crítico:**
- SKUs com sell-out alto mas share baixo (estoque parado)
- Regiões com queda de share > 20% vs mês anterior

🟡 **Atenção:**
- Canais com taxa de conversão < 60%
- SKUs com price index acima da média mas share abaixo

🟢 **Oportunidade:**
- Canais com alto share mas baixo sell-out (expandir distribuição)
- Regiões com crescimento de share > 15%

---

## 🔧 Implementação Técnica

### **Fase 1: Processamento de Dados**

```python
def integrate_scanntech_mtrix():
    # 1. Carregar dados
    mtrix = load_mtrix_data()
    scanntech = load_scanntech_data()
    
    # 2. Normalizar períodos
    # MTRIX: Ano/Mês (2025/JUL)
    # Scanntech: Mês (jul./25)
    
    # 3. Mapear regiões
    # Scanntech: CO, NE, NO, SE, SUL
    # MTRIX: UF → Região
    
    # 4. Agregar por SKU + Região + Período
    integrated = merge_data(mtrix, scanntech)
    
    # 5. Calcular métricas derivadas
    integrated['taxa_conversao'] = (
        integrated['sell_through'] / integrated['sell_out']
    )
    integrated['dias_estoque'] = (
        integrated['sell_out'] - integrated['sell_through']
    ) / integrated['sell_through_diario']
    
    return integrated
```

### **Fase 2: Criação de Funções JavaScript**

```javascript
// src/data/scanntechDataReal.js

export const getScanntechSharePorRegiao = (periodo) => {
  // Retorna share de mercado por região
  return {
    CO: { share: 1.2, priceIndex: 105.5 },
    NE: { share: 0.8, priceIndex: 98.3 },
    // ...
  };
};

export const getScanntechSharePorCanal = (regiao) => {
  // Retorna share por canal (1a4, 5a9, 10+, atc)
  return [
    { canal: '1a4', share: 0.9, volume: 1234 },
    { canal: '5a9', share: 1.5, volume: 2345 },
    // ...
  ];
};

export const getIntegracaoMtrixScanntech = (sku, periodo) => {
  // Retorna dados integrados
  return {
    sku: 'Nutry Bolo Chocolate 3x22g',
    sellOut: 15234,  // MTRIX
    sellThrough: 0.012,  // Scanntech (share)
    taxaConversao: 0.78,
    diasEstoque: 12,
    status: 'saudavel'
  };
};
```

### **Fase 3: Componentes React**

```javascript
// Novo componente: FunilVendas.jsx
const FunilVendas = ({ sku, periodo }) => {
  const data = getIntegracaoMtrixScanntech(sku, periodo);
  
  return (
    <div className="funil-vendas">
      <div className="etapa distribuidor">
        <h3>Distribuidor → PDV</h3>
        <p>{data.sellOut.toLocaleString()} unidades</p>
        <small>Sell-out (MTRIX)</small>
      </div>
      
      <div className="gap">
        <p>{data.diasEstoque} dias de estoque</p>
        <small>Taxa conversão: {(data.taxaConversao * 100).toFixed(1)}%</small>
      </div>
      
      <div className="etapa consumidor">
        <h3>PDV → Consumidor</h3>
        <p>{(data.sellThrough * 100).toFixed(2)}% share</p>
        <small>Sell-through (Scanntech)</small>
      </div>
    </div>
  );
};
```

---

## 📊 Estrutura de Dados Proposta

### **Arquivo: scanntechDataReal.js**

```javascript
export const getScanntechData = () => {
  return {
    // Dados agregados por região
    porRegiao: {
      CO: {
        share: 1.2,
        priceIndex: 105.5,
        canais: {
          '1a4': { share: 0.9, volume: 1234 },
          '5a9': { share: 1.5, volume: 2345 },
          '10+': { share: 1.8, volume: 3456 },
          'atc': { share: 0.8, volume: 987 }
        }
      },
      // ... outras regiões
    },
    
    // Top SKUs Nutrimental
    topSkus: [
      {
        sku: 'Nutry Bolo Chocolate 3x22g',
        share: 1.2,
        priceIndex: 320.5,
        registros: 280
      },
      // ... outros SKUs
    ],
    
    // Série temporal
    timeline: [
      {
        periodo: 'out./24',
        shareTotal: 12.5,
        priceIndexMedio: 315.2
      },
      // ... outros períodos
    ]
  };
};
```

---

## 🎯 Próximos Passos

### **Imediato (Hoje)**
1. ✅ Análise completa dos dados Scanntech
2. ⏳ Criar funções de processamento e agregação
3. ⏳ Gerar arquivo `scanntechDataReal.js`

### **Curto Prazo (Esta Semana)**
4. Criar componente "Funil de Vendas"
5. Criar componente "Performance por Canal"
6. Integrar no módulo "Monitoramento"

### **Médio Prazo (Próximas 2 Semanas)**
7. Criar módulo "Análise de Preço"
8. Criar dashboard de alertas
9. Implementar filtros avançados

---

## 💰 Valor de Negócio

### **Benefícios Imediatos:**
- ✅ Visão completa da jornada do produto
- ✅ Identificação de gargalos na cadeia
- ✅ Otimização de estoque no PDV
- ✅ Melhor estratégia de pricing

### **Benefícios Estratégicos:**
- 📈 Aumento de 15-20% na taxa de conversão
- 💰 Redução de 10-15% em estoque parado
- 🎯 Melhoria de 5-10% no share de mercado
- 🚀 Identificação de oportunidades de expansão

---

**Atualizado em:** 26/11/2025
**Versão:** 1.0
