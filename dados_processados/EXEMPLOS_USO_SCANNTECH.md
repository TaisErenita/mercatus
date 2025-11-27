# 📚 Exemplos de Uso - Integração Scanntech

## 🎯 Funções Disponíveis

### 1. `getScanntechPorRegiao()`
Retorna dados agregados por região com breakdown por canal.

```javascript
import { getScanntechPorRegiao } from './data/scanntechDataReal';

const regioes = getScanntechPorRegiao();

// Exemplo de saída:
{
  "CO": {
    "share": 1.9332,
    "priceIndex": 847.48,
    "canais": {
      "10+": { "share": 1.4555, "priceIndex": 425.36 },
      "1a4": { "share": 2.451, "priceIndex": 150.26 },
      "5a9": { "share": 2.4184, "priceIndex": 167.24 },
      "atc": { "share": 1.8015, "priceIndex": 2145.28 }
    }
  },
  "NE": { ... },
  // ... outras regiões
}
```

---

### 2. `getScanntechTopSkus()`
Retorna top 20 SKUs por share de mercado.

```javascript
import { getScanntechTopSkus } from './data/scanntechDataReal';

const topSkus = getScanntechTopSkus();

// Exemplo de saída:
[
  {
    "sku": "CEREAL BARRA NUTRY BOLO DE CHOCOLATE 3X22G",
    "share": 3.2145,
    "priceIndex": 425.50
  },
  {
    "sku": "CEREAL BARRA NUTRY AVEIA BANANA MEL 22G",
    "share": 2.8932,
    "priceIndex": 380.25
  },
  // ... outros SKUs
]
```

---

### 3. `getScanntechTimeline()`
Retorna série temporal com share e price index por período.

```javascript
import { getScanntechTimeline } from './data/scanntechDataReal';

const timeline = getScanntechTimeline();

// Exemplo de saída:
[
  {
    "periodo": "out./24",
    "shareTotal": 1.5234,
    "priceIndexMedio": 685.30
  },
  {
    "periodo": "nov./24",
    "shareTotal": 1.6123,
    "priceIndexMedio": 695.45
  },
  // ... outros períodos
]
```

---

### 4. `getScanntechSummary()`
Retorna resumo geral dos dados.

```javascript
import { getScanntechSummary } from './data/scanntechDataReal';

const summary = getScanntechSummary();

// Exemplo de saída:
{
  "totalRegistros": 7098,
  "periodoInicio": "out./24",
  "periodoFim": "nov./25",
  "shareMedio": 1.6678,
  "priceIndexMedio": 705.06,
  "regioes": 5,
  "skusUnicos": 51
}
```

---

### 5. `getIntegracaoMtrixScanntech(regiao, periodo)`
Função de integração com dados MTRIX.

```javascript
import { getIntegracaoMtrixScanntech } from './data/scanntechDataReal';

const integracao = getIntegracaoMtrixScanntech('CO', 'nov./25');

// Exemplo de saída:
{
  "regiao": "CO",
  "periodo": "nov./25",
  "shareMercado": 1.9332,
  "priceIndex": 847.48,
  "canais": {
    "10+": { "share": 1.4555, "priceIndex": 425.36 },
    "1a4": { "share": 2.451, "priceIndex": 150.26 },
    // ... outros canais
  }
}
```

---

## 💡 Exemplos de Componentes React

### Exemplo 1: Card de Região

```jsx
import { getScanntechPorRegiao } from '../data/scanntechDataReal';

const RegiaoCard = ({ regiao }) => {
  const dados = getScanntechPorRegiao()[regiao];
  
  if (!dados) return null;
  
  return (
    <div className="regiao-card">
      <h3>Região {regiao}</h3>
      <div className="metricas">
        <div className="metrica">
          <span className="label">Share de Mercado</span>
          <span className="valor">{dados.share.toFixed(2)}%</span>
        </div>
        <div className="metrica">
          <span className="label">Price Index</span>
          <span className="valor">R$ {dados.priceIndex.toFixed(2)}</span>
        </div>
      </div>
      
      <h4>Performance por Canal</h4>
      <div className="canais">
        {Object.entries(dados.canais).map(([canal, data]) => (
          <div key={canal} className="canal-item">
            <span className="canal-nome">{canal}</span>
            <span className="canal-share">{data.share.toFixed(2)}%</span>
            <span className="canal-preco">R$ {data.priceIndex.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Uso:
<RegiaoCard regiao="CO" />
```

---

### Exemplo 2: Ranking de SKUs

```jsx
import { getScanntechTopSkus } from '../data/scanntechDataReal';

const RankingSkus = ({ limit = 10 }) => {
  const topSkus = getScanntechTopSkus().slice(0, limit);
  
  return (
    <div className="ranking-skus">
      <h3>Top {limit} SKUs por Share</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>SKU</th>
            <th>Share</th>
            <th>Price Index</th>
          </tr>
        </thead>
        <tbody>
          {topSkus.map((sku, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{sku.sku}</td>
              <td>{sku.share.toFixed(2)}%</td>
              <td>R$ {sku.priceIndex.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Uso:
<RankingSkus limit={10} />
```

---

### Exemplo 3: Gráfico de Evolução Temporal

```jsx
import { getScanntechTimeline } from '../data/scanntechDataReal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EvolucaoTemporal = () => {
  const timeline = getScanntechTimeline();
  
  return (
    <div className="evolucao-temporal">
      <h3>Evolução de Share e Price Index</h3>
      <LineChart width={800} height={400} data={timeline}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="periodo" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="shareTotal" 
          stroke="#8884d8" 
          name="Share (%)"
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="priceIndexMedio" 
          stroke="#82ca9d" 
          name="Price Index (R$)"
        />
      </LineChart>
    </div>
  );
};

// Uso:
<EvolucaoTemporal />
```

---

### Exemplo 4: Dashboard Integrado MTRIX + Scanntech

```jsx
import { getMtrixVendasPorUF } from '../data/mtrixDataReal';
import { getScanntechPorRegiao } from '../data/scanntechDataReal';

const DashboardIntegrado = () => {
  const mtrixData = getMtrixVendasPorUF();
  const scanntechData = getScanntechPorRegiao();
  
  // Mapear UF para Região
  const ufToRegiao = {
    'GO': 'CO', 'MT': 'CO', 'MS': 'CO', 'DF': 'CO',
    'BA': 'NE', 'CE': 'NE', 'PE': 'NE', 'MA': 'NE',
    // ... outros mapeamentos
  };
  
  const integrado = mtrixData.map(uf => {
    const regiao = ufToRegiao[uf.UF];
    const scanntech = scanntechData[regiao];
    
    return {
      uf: uf.UF,
      regiao,
      sellOut: uf['# Sell-Out \n(Und)'],
      shareMercado: scanntech?.share || 0,
      priceIndex: scanntech?.priceIndex || 0
    };
  });
  
  return (
    <div className="dashboard-integrado">
      <h2>Visão Integrada: Sell-out + Share de Mercado</h2>
      <table>
        <thead>
          <tr>
            <th>UF</th>
            <th>Região</th>
            <th>Sell-out (un)</th>
            <th>Share (%)</th>
            <th>Price Index</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {integrado.map((item, index) => {
            const status = item.sellOut > 10000 && item.shareMercado > 1.5 
              ? '✅ Excelente' 
              : item.sellOut > 5000 
                ? '⚠️ Atenção' 
                : '🔴 Crítico';
            
            return (
              <tr key={index}>
                <td>{item.uf}</td>
                <td>{item.regiao}</td>
                <td>{item.sellOut.toLocaleString()}</td>
                <td>{item.shareMercado.toFixed(2)}%</td>
                <td>R$ {item.priceIndex.toFixed(2)}</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Uso:
<DashboardIntegrado />
```

---

### Exemplo 5: Análise de Canal

```jsx
import { getScanntechPorRegiao } from '../data/scanntechDataReal';

const AnaliseCanal = ({ regiao }) => {
  const dados = getScanntechPorRegiao()[regiao];
  
  if (!dados) return <p>Região não encontrada</p>;
  
  const canaisOrdenados = Object.entries(dados.canais)
    .sort((a, b) => b[1].share - a[1].share);
  
  const melhorCanal = canaisOrdenados[0];
  const piorCanal = canaisOrdenados[canaisOrdenados.length - 1];
  
  return (
    <div className="analise-canal">
      <h3>Análise de Canais - Região {regiao}</h3>
      
      <div className="destaque">
        <div className="melhor-canal">
          <h4>🏆 Melhor Canal</h4>
          <p className="canal-nome">{melhorCanal[0]}</p>
          <p className="canal-share">{melhorCanal[1].share.toFixed(2)}% share</p>
          <p className="canal-preco">R$ {melhorCanal[1].priceIndex.toFixed(2)}</p>
        </div>
        
        <div className="pior-canal">
          <h4>⚠️ Canal com Oportunidade</h4>
          <p className="canal-nome">{piorCanal[0]}</p>
          <p className="canal-share">{piorCanal[1].share.toFixed(2)}% share</p>
          <p className="canal-preco">R$ {piorCanal[1].priceIndex.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="todos-canais">
        <h4>Todos os Canais</h4>
        {canaisOrdenados.map(([canal, data], index) => (
          <div key={canal} className="canal-bar">
            <span className="canal-label">{canal}</span>
            <div className="bar-container">
              <div 
                className="bar-fill" 
                style={{ width: `${(data.share / melhorCanal[1].share) * 100}%` }}
              />
            </div>
            <span className="canal-valor">{data.share.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Uso:
<AnaliseCanal regiao="CO" />
```

---

## 🎨 Sugestões de Visualizações

### 1. Mapa de Calor por Região
```jsx
const MapaCalorRegioes = () => {
  const regioes = getScanntechPorRegiao();
  
  // Normalizar shares para escala de cores
  const shares = Object.values(regioes).map(r => r.share);
  const maxShare = Math.max(...shares);
  
  return (
    <div className="mapa-calor">
      {Object.entries(regioes).map(([regiao, data]) => {
        const intensidade = (data.share / maxShare) * 100;
        const cor = `hsl(120, ${intensidade}%, 50%)`;
        
        return (
          <div 
            key={regiao} 
            className="regiao-box"
            style={{ backgroundColor: cor }}
          >
            <h4>{regiao}</h4>
            <p>{data.share.toFixed(2)}%</p>
          </div>
        );
      })}
    </div>
  );
};
```

### 2. Comparativo Sell-out vs Share
```jsx
const ComparativoSelloutShare = ({ uf, regiao }) => {
  const mtrix = getMtrixVendasPorUF().find(item => item.UF === uf);
  const scanntech = getScanntechPorRegiao()[regiao];
  
  return (
    <div className="comparativo">
      <h3>{uf} - {regiao}</h3>
      <div className="metricas-lado-a-lado">
        <div className="metrica-mtrix">
          <h4>MTRIX (Sell-out)</h4>
          <p className="valor-grande">{mtrix.Vendas.toLocaleString()}</p>
          <p className="label">unidades vendidas</p>
        </div>
        <div className="seta">→</div>
        <div className="metrica-scanntech">
          <h4>Scanntech (Share)</h4>
          <p className="valor-grande">{scanntech.share.toFixed(2)}%</p>
          <p className="label">share de mercado</p>
        </div>
      </div>
    </div>
  );
};
```

---

## 📊 Integração no Dashboard Existente

### Adicionar ao módulo "Monitoramento"

```jsx
// Em App.jsx, dentro do módulo Monitoramento

import { 
  getScanntechPorRegiao, 
  getScanntechTopSkus,
  getScanntechSummary 
} from './data/scanntechDataReal';

// Adicionar nova seção após "Marcas por Região"
{moduloAtivo === 'monitoramento' && (
  <>
    {/* ... seções existentes ... */}
    
    {/* NOVA SEÇÃO: Share de Mercado por Região */}
    <div className="secao-dashboard">
      <h2>Share de Mercado por Região (Scanntech)</h2>
      <div className="grid-regioes">
        {Object.entries(getScanntechPorRegiao()).map(([regiao, data]) => (
          <RegiaoCard key={regiao} regiao={regiao} />
        ))}
      </div>
    </div>
    
    {/* NOVA SEÇÃO: Top SKUs */}
    <div className="secao-dashboard">
      <h2>Top 10 SKUs por Share de Mercado</h2>
      <RankingSkus limit={10} />
    </div>
  </>
)}
```

---

**Atualizado em:** 26/11/2025
**Versão:** 1.0
