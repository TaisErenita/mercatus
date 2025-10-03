import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, TrendingDown, Target, ShoppingCart, Brain, Award, Zap, Users, DollarSign, Package, BarChart3, PieChart as PieChartIcon } from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview')

  // Dados simulados baseados nas análises reais
  const kpiData = {
    marketShare: 50.16,
    totalSales: 351804,
    revenue: 119538436,
    growth: 15.2,
    clusters: 3,
    predictions: 0.788
  }

  const clusterData = [
    { name: 'Alto Volume', products: 28, avgSales: 873, color: '#22c55e' },
    { name: 'Médio Volume', products: 2507, avgSales: 38, color: '#3b82f6' },
    { name: 'Baixo Volume', products: 17846, avgSales: 13, color: '#ef4444' }
  ]

  const channelData = [
    { name: 'Scanntech', sales: 25868, share: 45 },
    { name: 'Amazon', sales: 20493, share: 35 },
    { name: 'MTRIX', sales: 50000, share: 20 }
  ]

  const trendData = [
    { period: '2023-2S', sales: 223903 },
    { period: '2024-1S', sales: 334709 },
    { period: '2024-2S', sales: 367345 },
    { period: '2025-1S', sales: 378887 },
    { period: '2025-2S', sales: 192504 }
  ]

  const topProducts = [
    { name: 'Barra Frutas Vermelhas', sales: 21908, growth: 12.5 },
    { name: 'Barra Avelã Chocolate', sales: 17608, growth: 8.3 },
    { name: 'Barra Proteína Amendoim', sales: 16600, growth: 15.7 },
    { name: 'Barra Morango Chocolate', sales: 16248, growth: 6.2 },
    { name: 'Barra Bolo Chocolate', sales: 13456, growth: 9.8 }
  ]

  const recommendations = [
    {
      area: 'Planejamento',
      action: 'Implementar forecasting automático',
      priority: 'Alta',
      impact: 'Redução custos estoque',
      status: 'pending'
    },
    {
      area: 'Marketing',
      action: 'Estratégias por cluster',
      priority: 'Alta', 
      impact: 'Aumento vendas',
      status: 'pending'
    },
    {
      area: 'E-commerce',
      action: 'Intensificar Amazon',
      priority: 'Alta',
      impact: 'Crescimento digital',
      status: 'pending'
    },
    {
      area: 'Produto',
      action: 'Analisar baixo volume',
      priority: 'Média',
      impact: 'Otimização portfólio',
      status: 'pending'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta': return 'bg-red-100 text-red-800 border-red-200'
      case 'Média': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Baixa': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              AIAAS Nutrimental
            </h1>
            <p className="text-slate-600 text-lg">
              Dashboard Executivo de Inteligência Artificial
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Brain className="w-4 h-4 mr-2" />
              IA Operacional
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Award className="w-4 h-4 mr-2" />
              Líder de Mercado
            </Badge>
          </div>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{kpiData.marketShare}%</div>
              <Target className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-xs opacity-80 mt-1">Liderança consolidada</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Vendas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{kpiData.totalSales.toLocaleString()}</div>
              <ShoppingCart className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-xs opacity-80 mt-1">Unidades vendidas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Receita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">R$ {(kpiData.revenue / 1000000).toFixed(1)}M</div>
              <DollarSign className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-xs opacity-80 mt-1">Faturamento total</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">IA Preditiva</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">R² {kpiData.predictions}</div>
              <Brain className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-xs opacity-80 mt-1">Precisão do modelo</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Análise */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Produtos</span>
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Canais</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Recomendações</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tendência de Vendas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Evolução de Vendas</span>
                </CardTitle>
                <CardDescription>Crescimento por período (MTRIX)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value.toLocaleString(), 'Vendas']} />
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Segmentação de Produtos */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChartIcon className="w-5 h-5 text-purple-600" />
                  <span>Clusters de Produtos</span>
                </CardTitle>
                <CardDescription>Segmentação por IA (K-means)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={clusterData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="products"
                      label={({ name, products }) => `${name}: ${products}`}
                    >
                      {clusterData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Produtos */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Top 5 Produtos (Amazon)</CardTitle>
                <CardDescription>Produtos mais vendidos no e-commerce</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-slate-600">{product.sales.toLocaleString()} unidades</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={product.growth > 10 ? "default" : "secondary"} className="text-xs">
                        {product.growth > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {product.growth}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Análise de Clusters */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Análise de Clusters</CardTitle>
                <CardDescription>Performance por segmento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {clusterData.map((cluster, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium" style={{ color: cluster.color }}>{cluster.name}</h4>
                      <Badge variant="outline">{cluster.products} produtos</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Vendas médias:</span>
                        <span className="font-medium">{cluster.avgSales} unidades</span>
                      </div>
                      <Progress value={(cluster.avgSales / 873) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Performance por Canal</CardTitle>
              <CardDescription>Análise omnichannel integrada</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={channelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'Vendas']} />
                  <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span>Recomendações Estratégicas IA</span>
              </CardTitle>
              <CardDescription>Ações acionáveis baseadas em análise de dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">{rec.area}</Badge>
                        <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-slate-800 mb-1">{rec.action}</h4>
                      <p className="text-sm text-slate-600">{rec.impact}</p>
                    </div>
                    <Button size="sm" variant="outline" className="ml-4">
                      Implementar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="mt-12 text-center text-slate-500 text-sm">
        <p>AIAAS Nutrimental - Powered by Manus AI | Dados atualizados em tempo real</p>
      </div>
    </div>
  )
}

export default App
