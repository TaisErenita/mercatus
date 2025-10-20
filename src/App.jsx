import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, Target, ShoppingCart, Brain, Award, Zap, Users, DollarSign, Package, BarChart3, PieChart as PieChartIcon, MessageCircle, Send, X, Minimize2, Map } from 'lucide-react'
import MapaBrasilInterativo from './components/MapaBrasilInterativo'
import AnaliseAmazon from './components/AnaliseAmazon'
import ModeloPreditivoAprimorado from "./components/ModeloPreditivoAprimorado";
import InsightsMercado from "./components/InsightsMercado";
import InsightsNaoEstruturados from "./components/InsightsNaoEstruturados";
import DashboardRecomendacoes from "./components/DashboardRecomendacoes";
import DashboardExecutivo from "./components/DashboardExecutivo";
import EstrategiaInovacao from './components/EstrategiaInovacao'
import './App.css'
import './enhancements.css'
import Tooltip from './components/Tooltip'
import { getTooltip } from './data/tooltipDescriptions'
import SimuladorElasticidade from './components/SimuladorElasticidade'

function App() {
  const [activeTab, setActiveTab] = useState('monitoramento')
  const [selectedPeriod, setSelectedPeriod] = useState('ultimo_mes')
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'ai',
      content: 'Olá! Sou seu assistente de IA para análise de mercado. Como posso ajudar?'
    }
  ])
  const [currentMessage, setCurrentMessage] = useState('')
  const [unreadAlerts, setUnreadAlerts] = useState(4)
  const [showAlerts, setShowAlerts] = useState(false)
  const [presentationMode, setPresentationMode] = useState(false)
  const [showSimulator, setShowSimulator] = useState(false)
  const [simulatorParams, setSimulatorParams] = useState({
    investment: 1000000,
    priceIncrease: 5,
    marketing: 500000,
    expansion: 2
  })

  // Dados simulados
  const kpiData = {
    marketShare: 50.16,
    totalSales: 351804,
    revenue: 119500000,
    predictions: 0.788
  }

  const trendData = [
    { period: '2023-2S', sales: 22000 },
    { period: '2024-1S', sales: 35000 },
    { period: '2024-2S', sales: 38000 },
    { period: '2025-1S', sales: 38000 },
    { period: '2025-2S', sales: 19000 }
  ]

  const clusterData = [
    { name: 'Alto Volume', value: 28, color: '#22c55e' },
    { name: 'Médio Volume', value: 2507, color: '#3b82f6' },
    { name: 'Baixo Volume', value: 17646, color: '#ef4444' }
  ]

  const alerts = [
    { id: 1, type: 'critical', title: 'Rio de Janeiro - Ação Urgente', message: 'Apenas 189 unidades vendidas. Potencial de crescimento: 1.000%', read: false },
    { id: 2, type: 'opportunity', title: 'Tendência Mini Barras', message: 'Crescimento de 15% ao ano. Trio já lançou versão 18g', read: false },
    { id: 3, type: 'warning', title: 'Declínio Projetado 2025', message: 'IA detecta queda de 50% no 2º semestre. Ação preventiva necessária', read: false },
    { id: 4, type: 'success', title: 'Meta SP Atingida', message: 'São Paulo superou meta com 85.4 unidades por transação', read: false }
  ]

  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('market share') || lowerMessage.includes('participação')) {
      return 'Nossa participação de mercado atual é de 50.16%, mantendo liderança consolidada. Crescemos 2.3% vs período anterior, com destaque em cereais (52.3%) e oportunidade em proteínas (15.6% com declínio de 3.2%).'
    }
    
    if (lowerMessage.includes('vendas') || lowerMessage.includes('sales')) {
      return 'Vendas totais de 351.804 unidades geraram R$ 119.5M em receita. Crescimento sustentado até 2024, mas atenção: IA projeta declínio de 50% em 2025-2S. Recomendo ação preventiva imediata.'
    }
    
    if (lowerMessage.includes('produtos') || lowerMessage.includes('clusters')) {
      return 'Portfólio organizado em 3 clusters: Alto Volume (28 produtos, 873 unid/produto), Médio Volume (2.507 produtos, 38 unid/produto), Baixo Volume (17.646 produtos, 13 unid/produto). Oportunidade: 88% do portfólio tem baixa performance.'
    }
    
    if (lowerMessage.includes('estados') || lowerMessage.includes('geográfico')) {
      return 'Top 5 estados: SP (26.9%, líder), CE (26.5%), RN (26.4%), PR (15.9%), MG (4.2%). Oportunidade crítica: RJ com apenas 189 unidades - potencial de crescimento 1.000%.'
    }
    
    if (lowerMessage.includes('recomendações') || lowerMessage.includes('ações')) {
      return '4 recomendações prioritárias: 1) Forecasting automático (economia R$ 2.3M/ano), 2) Estratégias por cluster (+25% vendas), 3) Intensificar Amazon (+40% potencial), 4) Desenvolver mini meals (ROI 180%).'
    }
    
    if (lowerMessage.includes('roi') || lowerMessage.includes('retorno')) {
      return 'ROI do sistema: 1.042% em 3 anos. Principais drivers: economia R$ 2.3M (otimização estoque), crescimento 25% (produtos-alvo), melhoria 3-5% margem operacional. Payback: 4-6 meses.'
    }
    
    if (lowerMessage.includes('concorrentes') || lowerMessage.includes('competição')) {
      return 'Movimentos detectados: Trio lançou mini barra 18g (+15% vendas), Kobber posicionamento premium (+8% preço), Integralmédica pressão proteína (-3.2% nosso share). Status: Monitorar Trio, Atenção Kobber, Crítico Integralmédica.'
    }
    
    if (lowerMessage.includes('inovações') || lowerMessage.includes('tendências')) {
      return 'Oportunidades identificadas: Mini Barras (ROI 180%, R$ 800K investimento), Ingredientes Amazônicos (ROI 220%, R$ 1.2M), Plant-Based (ROI 150%, R$ 600K). Potencial total: R$ 110-150M em 5 anos.'
    }
    
    if (lowerMessage.includes('crescimento') || lowerMessage.includes('impacto')) {
      return 'Impacto das inovações: Receita 5 anos salta de R$ 152M para R$ 350M (+2.3x), ROI total de 180% para 1.900% (+10.5x), Market Share de 55% para 68% (+13%). Multiplicador transformador!'
    }
    
    if (lowerMessage.includes('mapa') || lowerMessage.includes('brasil')) {
      return 'Cobertura nacional: 27 estados ativos, concentração top 5 (97.6% vendas). Nordeste domina (59.3%), Sudeste subexplorado (40.7%). Densidade: SP líder (85.4 unid/trans), oportunidades RJ, BA, RS.'
    }
    
    return 'Posso ajudar com análises sobre market share, vendas, produtos, estados, recomendações, ROI, concorrentes, inovações ou qualquer outro aspecto do negócio. O que gostaria de saber?'
  }

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const newMessages = [
        ...chatMessages,
        { type: 'user', content: currentMessage },
        { type: 'ai', content: generateAIResponse(currentMessage) }
      ]
      setChatMessages(newMessages)
      setCurrentMessage('')
    }
  }

  const markAlertAsRead = (alertId) => {
    setUnreadAlerts(prev => Math.max(0, prev - 1))
  }

  const togglePresentationMode = () => {
    setPresentationMode(!presentationMode)
    if (!presentationMode) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  const updateSimulatorParam = (param, value) => {
    setSimulatorParams(prev => ({
      ...prev,
      [param]: value
    }))
  }

  const calculateSimulatorResults = () => {
    const baseRevenue = 119500000
    const investmentMultiplier = simulatorParams.investment / 1000000
    const priceImpact = simulatorParams.priceIncrease / 100
    const marketingImpact = simulatorParams.marketing / 500000
    const expansionImpact = simulatorParams.expansion / 2

    const projectedRevenue = baseRevenue * (1 + (investmentMultiplier * 0.15) + (priceImpact * 0.8) + (marketingImpact * 0.12) + (expansionImpact * 0.08))
    const projectedShare = kpiData.marketShare * (1 + (investmentMultiplier * 0.05) + (marketingImpact * 0.03) + (expansionImpact * 0.02))
    const roi = ((projectedRevenue - baseRevenue - simulatorParams.investment - simulatorParams.marketing) / (simulatorParams.investment + simulatorParams.marketing)) * 100
    const payback = (simulatorParams.investment + simulatorParams.marketing) / ((projectedRevenue - baseRevenue) / 12)

    return {
      revenue: projectedRevenue,
      share: Math.min(projectedShare, 75),
      roi: Math.max(roi, -50),
      payback: Math.max(payback, 1),
      risk: roi > 200 ? 'Alto' : roi > 100 ? 'Médio' : 'Baixo'
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ${presentationMode ? 'p-2' : 'p-4'} transition-all duration-300`}>
      {/* Header */}
      <div className={`${presentationMode ? 'mb-4' : 'mb-8'} transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              AIAAS Nutrimental
            </h1>
            <p className="text-slate-600">Sistema de Inteligência Artificial para Análise Estratégica</p>
          </div>
          
          {!presentationMode && (
            <div className="flex items-center space-x-4">
              {/* Alertas */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAlerts(!showAlerts)}
                  className="relative"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v2.25l.75.75H3.75l.75-.75V9.75a6 6 0 0 1 6-6z" />
                  </svg>
                  Alertas
                  {unreadAlerts > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                      {unreadAlerts}
                    </Badge>
                  )}
                </Button>
                
                {showAlerts && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-slate-900">Alertas do Sistema</h3>
                    </div>
                    <div className="p-2">
                      {alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                            alert.type === 'critical' ? 'bg-red-50 border border-red-200' :
                            alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                            alert.type === 'opportunity' ? 'bg-blue-50 border border-blue-200' :
                            'bg-green-50 border border-green-200'
                          }`}
                          onClick={() => markAlertAsRead(alert.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-slate-900">{alert.title}</h4>
                              <p className="text-xs text-slate-600 mt-1">{alert.message}</p>
                            </div>
                            <Badge variant={
                              alert.type === 'critical' ? 'destructive' :
                              alert.type === 'warning' ? 'secondary' :
                              alert.type === 'opportunity' ? 'default' : 'outline'
                            } className="text-xs">
                              {alert.type === 'critical' ? '🚨' :
                               alert.type === 'warning' ? '⚠️' :
                               alert.type === 'opportunity' ? '💡' : '✅'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Simulador */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSimulator(true)}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Simulador de Elasticidade
              </Button>

              {/* Modo Apresentação */}
              <Button
                variant="outline"
                size="sm"
                onClick={togglePresentationMode}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Apresentação
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 fade-in-up">
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
        <TabsList className="grid w-full grid-cols-2 lg:w-2/5">
          <TabsTrigger value="monitoramento" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Monitoramento</span>
            <Badge variant="outline" className="ml-2 text-xs">Mensal</Badge>
          </TabsTrigger>
          <TabsTrigger value="estrategia" className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Estratégia</span>
            <Badge variant="outline" className="ml-2 text-xs">Trimestral</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monitoramento" className="space-y-6">
          {/* Filtros de Período */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-slate-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Filtros Temporais</span>
                  </CardTitle>
                  <CardDescription>Selecione o período para análise (Atualização: Dezembro 2024)</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Dados Atualizados
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {[
                  { id: 'ultimo_mes', label: 'Último Mês', desc: 'Dez/24' },
                  { id: 'ultimos_3m', label: 'Últimos 3M', desc: 'Out-Dez/24' },
                  { id: 'ultimos_6m', label: 'Últimos 6M', desc: 'Jul-Dez/24' },
                  { id: 'ultimo_ano', label: 'Último Ano', desc: '2024' },
                  { id: 'ano_anterior', label: 'Ano Anterior', desc: '2023' },
                  { id: 'personalizado', label: 'Personalizado', desc: 'Escolher' }
                ].map((period) => (
                  <Button
                    key={period.id}
                    variant={selectedPeriod === period.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`flex flex-col h-16 ${selectedPeriod === period.id ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`}
                  >
                    <span className="font-medium text-sm">{period.label}</span>
                    <span className="text-xs opacity-70">{period.desc}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ScanTech Intelligence Center */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>ScanTech Intelligence Center</span>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Competitivo</Badge>
              </CardTitle>
              <CardDescription>Inteligência competitiva e análise de mercado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 font-medium">Market Share</div>
                  <div className="text-2xl font-bold text-green-800">50.16%</div>
                  <div className="text-sm text-green-600">+2.3% vs período anterior</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium">Posição</div>
                  <div className="text-2xl font-bold text-blue-800">#1</div>
                  <div className="text-sm text-blue-600">Liderança consolidada</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-sm text-orange-700 font-medium">Premium Preço</div>
                  <div className="text-2xl font-bold text-orange-800">+2.1%</div>
                  <div className="text-sm text-orange-600">vs média mercado</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-700 font-medium">Lançamentos</div>
                  <div className="text-2xl font-bold text-purple-800">12</div>
                  <div className="text-sm text-purple-600">no período</div>
                </div>
              </div>

              {/* Share por Categoria */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-3">Share por Categoria de Barras</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { categoria: 'Cereais', share: 52.3, trend: '+1.8%', color: 'green' },
                    { categoria: 'Frutas', share: 34.8, trend: '+0.5%', color: 'blue' },
                    { categoria: 'Nuts', share: 28.9, trend: '-0.3%', color: 'orange' },
                    { categoria: 'Proteína', share: 15.6, trend: '-3.2%', color: 'red' }
                  ].map((cat) => (
                    <div key={cat.categoria} className="p-3 bg-slate-50 rounded-lg border">
                      <div className="text-sm text-slate-700 font-medium">{cat.categoria}</div>
                      <div className="text-xl font-bold text-slate-800">{cat.share}%</div>
                      <div className="text-xs text-slate-600">{cat.trend}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Movimentos Competitivos */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Movimentos Competitivos Detectados</h4>
                <div className="space-y-3">
                  {[
                    { marca: 'Trio', acao: 'Lançou mini barra 18g', impacto: '+15% vendas', status: 'Monitorar' },
                    { marca: 'Kobber', acao: 'Posicionamento premium', impacto: '+8% preço médio', status: 'Atenção' },
                    { marca: 'Integralmédica', acao: 'Pressão proteína', impacto: '-3.2% share Nutry', status: 'Crítico' }
                  ].map((mov, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{mov.marca}</div>
                        <div className="text-sm text-slate-600">{mov.acao}</div>
                      </div>
                      <div className="text-center mx-4">
                        <div className="text-sm font-medium text-slate-900">{mov.impacto}</div>
                      </div>
                      <Badge variant={mov.status === 'Crítico' ? 'destructive' : mov.status === 'Atenção' ? 'secondary' : 'outline'}>
                        {mov.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mapa do Brasil - Market Share por Estado */}
          <MapaBrasilGeografico />

          {/* Análise Amazon - Dados E-commerce */}
          <AnaliseAmazon />
            <ModeloPreditivoAprimorado />
            <InsightsMercado />
            <InsightsNaoEstruturados />
        </TabsContent>

        <TabsContent value="estrategia" className="space-y-6">
            <DashboardExecutivo />
          <EstrategiaInovacao />
            <DashboardRecomendacoes />
        </TabsContent>
      </Tabs>

      {/* Simulador Modal */}
      {showSimulator && (
        <SimuladorElasticidade onClose={() => setShowSimulator(false)} />
      )}

      {/* Chat Assistant */}
      {!presentationMode && (
        <>
          <Button
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg z-40"
            onClick={() => setChatOpen(true)}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>

          {chatOpen && (
            <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl border z-50 flex flex-col">
              <div className="p-4 border-b bg-blue-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span className="font-medium">Assistente IA Nutrimental</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setChatOpen(false)} className="text-white hover:bg-blue-700">
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Digite sua pergunta..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button size="sm" onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <div className="mt-12 text-center text-slate-500 text-sm">
        <p>AIAAS Nutrimental - Powered by Manus AI | Dados atualizados em tempo real</p>
      </div>
    </div>
  )
}

export default App
