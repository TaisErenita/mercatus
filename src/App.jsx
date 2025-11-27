import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, Target, ShoppingCart, Brain, Award, Zap, Users, DollarSign, Package, BarChart3, PieChart as PieChartIcon, MessageCircle, Send, X, Minimize2, Map } from 'lucide-react'
import MapaBrasilInterativo from './components/MapaBrasilInterativo'
import AnaliseAmazon from './components/AnaliseAmazon'
import NutrimentalInterna from './components/NutrimentalInterna'

import InsightsMercado from "./components/InsightsMercado";
import SharePorSegmento from "./components/SharePorSegmento";
import InsightsNaoEstruturados from "./components/InsightsNaoEstruturados";
import DashboardRecomendacoes from "./components/DashboardRecomendacoes";
import DashboardExecutivo from "./components/DashboardExecutivo";
import EstrategiaInovacao from './components/EstrategiaInovacao'
import './App.css'
import './enhancements.css'
import './animations.css'
import SimuladorElasticidade from './components/SimuladorElasticidade'
import InfoTooltip from './components/Tooltip'
import tooltipDescriptions from './data/tooltipDescriptions'
import LandingPage from './components/LandingPage'
import HomePage from './components/HomePage'
import { Home, LogOut } from 'lucide-react'
import { getFilteredData, getMercadoTotalData } from './data/filteredData'
import { getScanntechMercadoTotal, getScanntechShareNutrimental, getScanntechMarcasRegiaoComparativo } from './data/scanntechDataReal';import { getMarcasData } from './data/marcasData'
import { getMtrixData } from './data/mtrixData'
import { getPerformanceInternaData } from './data/performanceInternaData'
import { getNutrimentalScanntechData, getNutrimentalCategorias } from './data/nutrimentalScanntechData'
import { getNutrimentalInternaData } from './data/nutrimentalInternaData'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [showHome, setShowHome] = useState(false)
  const [activeTab, setActiveTab] = useState('monitoramento')
  const [selectedPeriod, setSelectedPeriod] = useState('mes_yoy')
  const [selectedCategory, setSelectedCategory] = useState('total')
  const [selectedMtrixRegion, setSelectedMtrixRegion] = useState('brasil')
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

  // Função auxiliar para prevenir erros com valores undefined/null
  const safeNumber = (value, defaultValue = 0) => {
    return (value !== null && value !== undefined && !isNaN(value)) ? value : defaultValue;
  };

  // Dados filtrados dinamicamente
  const currentData = getFilteredData(selectedCategory, selectedPeriod)
  const kpiData = {
    marketShare: currentData.marketShare,
    totalSales: currentData.vendas,
    revenue: currentData.receita * 1000000,
    predictions: currentData.r2Score,
    variacao: currentData.variacao,
    periodo: currentData.periodo
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

  // Navegação: Landing → Home → Dashboard
  if (showLanding) {
    return <LandingPage onEnter={() => {
      setShowLanding(false);
      setShowHome(true);
    }} />;
  }

  // Mostrar Home com seleção de módulos
  if (showHome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        {/* Header com Logo e Avatar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-slate-800 mb-2">
                <span className="font-bold">MERC<span className="text-cyan-500">A</span>TUS</span> | AIAAS
              </h1>
              <p className="text-slate-600">Sistema de Inteligência Artificial para Análise Estratégica</p>
            </div>
            
            {/* Avatar Nutrimental */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-md">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 font-bold text-xl">N</span>
                </div>
                <span className="font-semibold text-slate-700">Nutrimental</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowHome(false);
                  setShowLanding(true);
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
        
        <HomePage onSelectModule={(moduleId) => {
          setActiveTab(moduleId);
          setShowHome(false);
        }} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ${presentationMode ? 'p-2' : 'p-4'} transition-all duration-300`}>
      {/* Header */}
      <div className={`${presentationMode ? 'mb-4' : 'mb-8'} transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl text-slate-800 mb-2">
              <span className="font-bold">MERC<span className="text-cyan-500">A</span>TUS</span> | AIAAS
            </h1>
            <p className="text-slate-600">Sistema de Inteligência Artificial para Análise Estratégica</p>
          </div>
          
          {!presentationMode && (
            <div className="flex items-center space-x-4">
              {/* Botão Voltar */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHome(true)}
                className="mr-2"
              >
                <Home className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              
              {/* Menu de Módulos */}
              <div className="flex items-center space-x-2 mr-4 border-r pr-4">
                <Button
                  variant={activeTab === 'monitoramento' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('monitoramento')}
                  className={activeTab === 'monitoramento' ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
                >
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Monitoramento
                </Button>
                <Button
                  variant={activeTab === 'insights' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('insights')}
                  className={activeTab === 'insights' ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
                >
                  <Brain className="w-4 h-4 mr-1" />
                  Insights
                </Button>
                <Button
                  variant={activeTab === 'estrategia' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('estrategia')}
                  className={activeTab === 'estrategia' ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
                >
                  <Zap className="w-4 h-4 mr-1" />
                  Estratégia
                </Button>
                <Button
                  variant={activeTab === 'simulador' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('simulador')}
                  className={activeTab === 'simulador' ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
                >
                  <Target className="w-4 h-4 mr-1" />
                  Simulador
                </Button>
              </div>

              {/* Alertas - Lanterninha Minimalista */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAlerts(!showAlerts)}
                  className="relative hover:bg-slate-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v2.25l.75.75H3.75l.75-.75V9.75a6 6 0 0 1 6-6z" />
                  </svg>
                  {unreadAlerts > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
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


              
              {/* Avatar Nutrimental */}
              <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-md ml-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 font-bold text-lg">N</span>
                </div>
                <span className="font-semibold text-slate-700 text-sm">Nutrimental</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs de Análise */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

        <TabsContent value="monitoramento" className="space-y-6 px-12">
          {/* Bloco de Filtros */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-200 to-slate-300 border-2 border-slate-400">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <span>Filtros</span>
                  </CardTitle>
                  <CardDescription>Selecione categoria e período para análise (Atualização: Agosto 2025)</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Dados Atualizados
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filtro de Categoria */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Categoria de Barras</h4>
                <div className="flex flex-wrap gap-3">
                {[
                  { id: 'total', label: 'TOTAL' },
                  { id: 'cereais', label: 'CEREAIS' },
                  { id: 'frutas', label: 'FRUTAS' },
                  { id: 'nuts', label: 'NUTS' },
                  { id: 'proteina', label: 'PROTEÍNA' }
                ].map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 ${selectedCategory === category.id ? 'bg-cyan-500 text-white border-cyan-600' : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-300 hover:bg-slate-50'}`}
                  >
                    {category.label}
                  </Button>
                ))}
                </div>
              </div>

              {/* Filtro de Período */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Período de Comparação</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { 
                      id: 'mes_yoy', 
                      label: 'Mês Atual vs Ano Anterior', 
                      desc: 'Ago/25 vs Ago/24',
                      detail: 'Comparação mensal YoY'
                    },
                    { 
                      id: 'trimestre_yoy', 
                      label: 'Trimestre Atual vs Ano Anterior', 
                      desc: 'Jun-Jul-Ago/25 vs Jun-Jul-Ago/24',
                      detail: 'Comparação trimestral YoY'
                    },
                    { 
                      id: 'ytd_yoy', 
                      label: 'YTD vs Mesmo Período Ano Anterior', 
                      desc: 'Jan-Ago/25 vs Jan-Ago/24',
                      detail: 'Acumulado do ano YoY'
                    }
                  ].map((period) => (
                    <Button
                      key={period.id}
                      variant={selectedPeriod === period.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPeriod(period.id)}
                      className={`flex flex-col h-auto py-2 px-4 ${selectedPeriod === period.id ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-300 hover:bg-slate-50'}`}
                  >
                    <span className="font-semibold text-sm mb-0.5">{period.label}</span>
                    <span className="text-xs opacity-80">{period.desc}</span>
                    <span className="text-xs opacity-60 hidden">{period.detail}</span>
                  </Button>
                ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mercado Total de Barras */}
          {(() => {
            try {
            const mercadoData = getScanntechMercadoTotal(selectedCategory, selectedPeriod);
            const calcVariacao = (atual, anterior) => {
              if (!atual || !anterior || anterior === 0) return '0.0';
              return ((atual - anterior) / anterior * 100).toFixed(1);
            };
            const valorVar = calcVariacao(mercadoData.valor.atual, mercadoData.valor.anterior);
            const volumeVar = calcVariacao(mercadoData.volume.atual, mercadoData.volume.anterior);
            const precoVar = calcVariacao(mercadoData.preco.atual, mercadoData.preco.anterior);
            
            return (
              <Card className="border-0 shadow-lg mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span>Mercado Total de Barras</span>
                    </CardTitle>
                    <Badge className="bg-cyan-50 text-cyan-700 border-cyan-200 text-xs">Scanntech</Badge>
                  </div>
                  <CardDescription>Visão consolidada do mercado - {kpiData.periodo}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Valor */}
                    <div className="p-6 bg-white rounded-lg border border-slate-200">
                      <div className="text-sm text-slate-600 font-medium mb-3">Valor (R$)</div>
                      <div className="flex items-baseline space-x-2 mb-2">
                        <div className="text-3xl font-bold text-cyan-500">
                          R$ {(mercadoData.valor.atual / 1000000).toFixed(1)}M
                        </div>
                        {parseFloat(valorVar) > 0 ? (
                          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        )}
                        <span className={`text-sm font-semibold ${parseFloat(valorVar) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {valorVar}%
                        </span>
                      </div>
                      <div className="text-sm text-slate-400">
                        Anterior: R$ {(mercadoData.valor.anterior / 1000000).toFixed(1)}M
                      </div>
                    </div>

                    {/* Volume */}
                    <div className="p-6 bg-white rounded-lg border border-slate-200">
                      <div className="text-sm text-slate-600 font-medium mb-3">Volume (unidades)</div>
                      <div className="flex items-baseline space-x-2 mb-2">
                        <div className="text-3xl font-bold text-cyan-500">
                          {mercadoData.volume.atual.toLocaleString('pt-BR')}
                        </div>
                        {parseFloat(volumeVar) > 0 ? (
                          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        )}
                        <span className={`text-sm font-semibold ${parseFloat(volumeVar) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {volumeVar}%
                        </span>
                      </div>
                      <div className="text-sm text-slate-400">
                        Anterior: {mercadoData.volume.anterior.toLocaleString('pt-BR')}
                      </div>
                    </div>

                    {/* Preço Médio */}
                    <div className="p-6 bg-white rounded-lg border border-slate-200">
                      <div className="text-sm text-slate-600 font-medium mb-3">Preço Médio (R$/un)</div>
                      <div className="flex items-baseline space-x-2 mb-2">
                        <div className="text-3xl font-bold text-cyan-500">
                          R$ {safeNumber(mercadoData?.preco?.atual).toFixed(2)}
                        </div>
                        {parseFloat(precoVar) > 0 ? (
                          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        )}
                        <span className={`text-sm font-semibold ${parseFloat(precoVar) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {precoVar}%
                        </span>
                      </div>
                      <div className="text-sm text-slate-400">
                        Anterior: R$ {safeNumber(mercadoData?.preco?.anterior).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
            } catch(error) {
              console.error('Erro no Mercado Total:', error);
              return <div className="p-4 bg-red-100 text-red-800 rounded">Erro ao carregar dados: {error.message}</div>;
            }
          })()}


          {/* Marcas por Região */}
          {(() => {
            try {
            const marcasData = getScanntechMarcasRegiaoComparativo(selectedCategory, selectedPeriod);
            const regioes = [
              { id: 'brasil', label: 'BRASIL', icon: '🇧🇷' },
              { id: 'sul', label: 'SUL', icon: '🌾' },
              { id: 'ne_no_co', label: 'NE-NO-CO', icon: '🌴' }
            ];
            
            const renderTabela = (marcas, regiaoLabel) => {
              // Validar se marcas existe
              if (!marcas || !Array.isArray(marcas)) {
                return <div className="p-4 text-gray-500">Dados não disponíveis para esta região</div>;
              }
              
              // Encontrar preço do mercado total
              const precoMercado = marcas.find(m => m.marca === 'Mercado Total')?.preco || 0;
              
              return (
                <div className="mb-6 last:mb-0">
                  <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center space-x-2">
                    <span>{regiaoLabel}</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left p-3 text-sm font-semibold text-slate-700">Marca</th>
                          <th className="text-right p-3 text-sm font-semibold text-slate-700">Receita (R$ mil)<br/><span className="text-xs font-normal text-slate-500">({kpiData.periodo})</span></th>
                          <th className="text-right p-3 text-sm font-semibold text-slate-700">Volume (un)<br/><span className="text-xs font-normal text-slate-500">({kpiData.periodo})</span></th>
                          <th className="text-right p-3 text-sm font-semibold text-slate-700">Share Valor %<br/><span className="text-xs font-normal text-slate-500">({kpiData.periodo})</span></th>
                          <th className="text-right p-3 text-sm font-semibold text-slate-700">Share Volume %<br/><span className="text-xs font-normal text-slate-500">({kpiData.periodo})</span></th>
                          <th className="text-right p-3 text-sm font-semibold text-slate-700">Preço Médio (R$)<br/><span className="text-xs font-normal text-slate-500">({kpiData.periodo})</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {marcas.map((item) => {
                          const deltaShareValor = item.shareValor - (item.shareValorAnterior || item.shareValor);
                          const deltaShareVolume = item.shareVolumeKG - (item.shareVolumeKGAnterior || item.shareVolumeKG);
                          const deltaPreco = item.precoKG - (item.precoKGAnterior || item.precoKG);
                          
                          const renderComparacao = (atual, anterior, unidade = '%') => {
                            const safeAtual = safeNumber(atual);
                            const safeAnterior = safeNumber(anterior);
                            const delta = safeAtual - safeAnterior;
                            const deltaAbs = Math.abs(delta);
                            const seta = delta > 0 ? '↑' : delta < 0 ? '↓' : '→';
                            const cor = delta > 0 ? 'text-green-600' : delta < 0 ? 'text-red-600' : 'text-slate-500';
                            
                            return (
                              <div className="flex flex-col items-end">
                                <div className="font-semibold">{safeAtual.toFixed(1)}{unidade}</div>
                                <div className={`text-xs ${cor} flex items-center gap-1`}>
                                  <span>{seta}</span>
                                  <span>{safeAnterior.toFixed(1)}{unidade}</span>
                                  {deltaAbs > 0.1 && <span>({delta > 0 ? '+' : ''}{delta.toFixed(1)})</span>}
                                </div>
                              </div>
                            );
                          };
                          
                          return (
                            <tr 
                              key={item.marca} 
                              className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                                item.marca === 'NUTRY' ? 'bg-cyan-50' : 
                                item.marca === 'Mercado Total' ? 'bg-slate-100 font-semibold' : ''
                              }`}
                            >
                              <td className="p-3 text-sm">
                                <span className={item.marca === 'NUTRY' ? 'font-semibold text-cyan-700' : item.marca === 'Mercado Total' ? 'font-bold text-slate-700' : 'text-slate-600'}>
                                  {item.marca}
                                </span>
                              </td>
                              <td className="p-3 text-sm text-right">
                                <div className={item.marca === 'NUTRY' ? 'text-cyan-600' : item.marca === 'Mercado Total' ? 'text-slate-700' : 'text-slate-600'}>
                                  {renderComparacao(item.receita, item.receitaAnterior || item.receita, '')}
                                </div>
                              </td>
                              <td className="p-3 text-sm text-right">
                                <div className={item.marca === 'NUTRY' ? 'text-cyan-600' : item.marca === 'Mercado Total' ? 'text-slate-700' : 'text-slate-600'}>
                                  {renderComparacao(item.volumeKG, item.volumeKGAnterior || item.volumeKG, '')}
                                </div>
                              </td>
                              <td className="p-3 text-sm text-right">
                                <div className={item.marca === 'NUTRY' ? 'text-cyan-600' : item.marca === 'Mercado Total' ? 'text-slate-700' : 'text-slate-600'}>
                                  {renderComparacao(item.shareValor, item.shareValorAnterior || item.shareValor, '%')}
                                </div>
                              </td>
                              <td className="p-3 text-sm text-right">
                                <div className={item.marca === 'NUTRY' ? 'text-cyan-600' : item.marca === 'Mercado Total' ? 'text-slate-700' : 'text-slate-600'}>
                                  {renderComparacao(item.shareVolumeKG, item.shareVolumeKGAnterior || item.shareVolumeKG, '%')}
                                </div>
                              </td>
                              <td className="p-3 text-sm text-right">
                                <div className={item.marca === 'NUTRY' ? 'text-cyan-600' : item.marca === 'Mercado Total' ? 'text-slate-700' : 'text-slate-600'}>
                                  {renderComparacao(item.precoKG, item.precoKGAnterior || item.precoKG, '')}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            };
            
            return (
              <Card className="border-0 shadow-lg mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span>Marcas por Região</span>
                    </CardTitle>
                    <Badge className="bg-cyan-50 text-cyan-700 border-cyan-200 text-xs">Scanntech</Badge>
                  </div>
                  <CardDescription>Análise de participação por marca em todas as regiões - {kpiData.periodo}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Tabelas Empilhadas Verticalmente */}
                  <div className="space-y-6">
                    {regioes.map((regiao) => (
                      <div key={regiao.id}>
                        {marcasData[regiao.id] && renderTabela(marcasData[regiao.id], `${regiao.icon} ${regiao.label}`)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
            } catch(error) {
              console.error('Erro em Marcas por Região:', error);
              return <div className="p-4 bg-red-100 text-red-800 rounded">Erro ao carregar Marcas por Região: {error.message}</div>;
            }
          })()}

          {/* Nutrimental - Bloco Integrado */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <span>Nutrimental</span>
                </CardTitle>
                <Badge className="bg-cyan-50 text-cyan-700 border-cyan-200 text-xs">Scanntech</Badge>
              </div>
              <CardDescription>Participação de mercado da Nutrimental por categoria de barras - {kpiData.periodo}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Visão Consolidada NUTRY */}
              {(() => {
                const shareData = getScanntechShareNutrimental(selectedCategory, selectedPeriod);
                const { consolidado } = shareData;
                const calcVar = (atual, anterior) => {
                  if (!atual || !anterior || anterior === 0) return '0.0';
                  return ((atual - anterior) / anterior * 100).toFixed(1);
                };
                const variacaoShare = calcVar(consolidado.share, consolidado.shareAnterior);
                const variacaoReceita = calcVar(consolidado.receita, consolidado.receitaAnterior);
                const variacaoVolume = calcVar(consolidado.volume, consolidado.volumeAnterior);
                const variacaoPreco = calcVar(consolidado.precoMedio, consolidado.precoMedioAnterior);
                
                return (
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6 mb-6 border-2 border-cyan-300">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h5 className="text-lg font-bold text-gray-800 mb-1">🏆 NUTRY - Performance Total</h5>
                        <p className="text-sm text-gray-600">Consolidado de todas as categorias - {kpiData.periodo}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-cyan-200">
                        <div className="text-xs text-gray-600 mb-1">Share de Mercado</div>
                        <div className="text-2xl font-bold text-cyan-600">{consolidado.share}%</div>
                        <div className={`text-xs font-medium mt-1 ${parseFloat(variacaoShare) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {parseFloat(variacaoShare) >= 0 ? '↑' : '↓'} {variacaoShare}% vs período anterior
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-cyan-200">
                        <div className="text-xs text-gray-600 mb-1">Receita Total</div>
                        <div className="text-2xl font-bold text-purple-600">R$ {(safeNumber(consolidado?.receita) / 1000000).toFixed(1)}M</div>
                        <div className={`text-xs font-medium mt-1 ${parseFloat(variacaoReceita) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {parseFloat(variacaoReceita) >= 0 ? '↑' : '↓'} {variacaoReceita}% vs Ago/24
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-cyan-200">
                        <div className="text-xs text-gray-600 mb-1">Volume Total</div>
                        <div className="text-2xl font-bold text-blue-600">{(safeNumber(consolidado?.volume) / 1000).toFixed(0)}k un</div>
                        <div className={`text-xs font-medium mt-1 ${parseFloat(variacaoVolume) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {parseFloat(variacaoVolume) >= 0 ? '↑' : '↓'} {variacaoVolume}% vs Ago/24
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-cyan-200">
                        <div className="text-xs text-gray-600 mb-1">Preço Médio</div>
                        <div className="text-2xl font-bold text-green-600">R$ {safeNumber(consolidado?.precoMedio).toFixed(2)}</div>
                        <div className={`text-xs font-medium mt-1 ${parseFloat(variacaoPreco) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {parseFloat(variacaoPreco) >= 0 ? '↑' : '↓'} {variacaoPreco}% vs Ago/24
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Share por Categoria - Cards Melhorados */}
              <div className="mb-6">
                <h5 className="text-md font-semibold text-gray-800 mb-4">📊 Aberturas por Categoria</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(() => {
                    const shareData = getScanntechShareNutrimental(selectedCategory, selectedPeriod);
                    return shareData.categorias.map((cat) => {
                    const isPositive = cat.trend.startsWith('+');
                    return (
                      <div key={cat.categoria} className="p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm text-slate-700 font-semibold">{cat.icon} {cat.categoria}</div>
                          {isPositive ? (
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div>
                            <div className="text-xs text-gray-500">Share Nutry</div>
                            <div className="text-2xl font-bold text-cyan-600">{cat.share}%</div>
                            <div className={`text-xs font-medium ${
                              isPositive ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {cat.trend} vs anterior
                            </div>
                          </div>
                          <div className="pt-2 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-500">Receita</span>
                              <span className="text-sm font-semibold text-purple-600">R$ {(safeNumber(cat?.receita) / 1000000).toFixed(1)}M</span>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-500">Volume</span>
                              <span className="text-sm font-semibold text-blue-600">{(safeNumber(cat?.volume) / 1000).toFixed(0)}k un</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">Preço Médio</span>
                              <span className="text-sm font-semibold text-green-600">R$ {safeNumber(cat?.precoMedio).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                    });
                  })()}
                </div>
              </div>

              {/* Evolução de Share - Gráfico de Tendência */}
              <div className="mb-6">
                <h5 className="text-md font-semibold text-gray-800 mb-4">📈 Evolução de Share de Mercado (Ago/24 - Mai/25)</h5>
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                      data={[
                        { mes: 'Ago/24', Total: 26.9, Cereais: 55.66, Frutas: 41.86, Nuts: 4.66, Proteína: 5.39 },
                        { mes: 'Set/24', Total: 25.6, Cereais: 51.83, Frutas: 39.57, Nuts: 5.47, Proteína: 5.45 },
                        { mes: 'Out/24', Total: 24.5, Cereais: 51.93, Frutas: 34.59, Nuts: 5.72, Proteína: 5.69 },
                        { mes: 'Nov/24', Total: 23.8, Cereais: 54.25, Frutas: 30.27, Nuts: 4.91, Proteína: 5.56 },
                        { mes: 'Dez/24', Total: 23.0, Cereais: 50.05, Frutas: 30.93, Nuts: 5.42, Proteína: 5.45 },
                        { mes: 'Jan/25', Total: 26.5, Cereais: 61.65, Frutas: 32.64, Nuts: 6.35, Proteína: 5.38 },
                        { mes: 'Fev/25', Total: 24.0, Cereais: 56.23, Frutas: 29.14, Nuts: 5.22, Proteína: 5.41 },
                        { mes: 'Mar/25', Total: 26.6, Cereais: 59.23, Frutas: 33.20, Nuts: 8.11, Proteína: 5.74 },
                        { mes: 'Abr/25', Total: 26.7, Cereais: 56.54, Frutas: 35.83, Nuts: 8.27, Proteína: 5.99 },
                        { mes: 'Mai/25', Total: 28.2, Cereais: 55.57, Frutas: 43.41, Nuts: 7.71, Proteína: 6.15 }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="mes" 
                        tick={{ fontSize: 12 }}
                        stroke="#64748b"
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        stroke="#64748b"
                        label={{ value: 'Share (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#64748b' } }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                        formatter={(value) => `${value}%`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Total" 
                        stroke="#06b6d4" 
                        strokeWidth={3}
                        dot={{ fill: '#06b6d4', r: 4 }}
                        name="Total Nutry"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Cereais" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={{ fill: '#f59e0b', r: 3 }}
                        name="Cereais"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Frutas" 
                        stroke="#ec4899" 
                        strokeWidth={2}
                        dot={{ fill: '#ec4899', r: 3 }}
                        name="Frutas"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Nuts" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        dot={{ fill: '#8b5cf6', r: 3 }}
                        name="Nuts"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Proteína" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ fill: '#10b981', r: 3 }}
                        name="Proteína"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  
                  {/* Legenda Customizada */}
                  <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-1 bg-cyan-500 rounded"></div>
                      <span className="text-gray-700 font-semibold">Total Nutry</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-1 bg-amber-500 rounded"></div>
                      <span className="text-gray-600">🌾 Cereais</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-1 bg-pink-500 rounded"></div>
                      <span className="text-gray-600">🍓 Frutas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-1 bg-purple-500 rounded"></div>
                      <span className="text-gray-600">🥜 Nuts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-1 bg-green-500 rounded"></div>
                      <span className="text-gray-600">💪 Proteína</span>
                    </div>
                  </div>
                  
                  {/* Insights Rápidos */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="text-xs text-green-700 font-medium mb-1">📈 Crescimento</div>
                      <div className="text-sm text-green-900">Total Nutry: +1.3pp (Ago/24 → Mai/25)</div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="text-xs text-amber-700 font-medium mb-1">⭐ Destaque</div>
                      <div className="text-sm text-amber-900">Cereais mantém liderança (~55%)</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="text-xs text-purple-700 font-medium mb-1">🚀 Oportunidade</div>
                      <div className="text-sm text-purple-900">Nuts: +3.05pp em 10 meses</div>
                    </div>
                  </div>
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
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all">
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{mov.marca}</div>
                        <div className="text-sm text-slate-600">{mov.acao}</div>
                      </div>
                      <div className="text-center mx-4">
                        <div className="text-sm font-medium text-cyan-500">{mov.impacto}</div>
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

          {/* Nutrimental - Performance Interna */}
          {(() => {
            const nutriInternaData = getNutrimentalInternaData();
            
            return <NutrimentalInterna data={nutriInternaData} />;
          })()}

          {/* MTRIX Intelligence Center - Novo Layout */}
          {(() => {
            const mtrixRegionData = getMtrixData(selectedCategory, selectedPeriod);
            
            // Calcular totais e rankings
            const calculateTotals = (data) => {
              const totalFaturamento = data.reduce((sum, d) => sum + d.faturamento, 0);
              return data.map((dist, idx) => ({
                ...dist,
                ranking: idx + 1,
                participacao: ((dist.faturamento / totalFaturamento) * 100).toFixed(1)
              }));
            };

            const brasilData = calculateTotals(mtrixRegionData.brasil);
            const totalFaturamento = brasilData.reduce((sum, d) => sum + d.faturamento, 0);
            const totalVolume = brasilData.reduce((sum, d) => sum + d.volume, 0);
            const precoMedioGeral = totalFaturamento / totalVolume;

            // Preparar dados para gráfico
            const chartData = brasilData.map(dist => ({
              nome: dist.distribuidor.split(' ')[0], // Primeiro nome apenas
              faturamento: (dist.faturamento / 1000).toFixed(0)
            }));

            const getRankingIcon = (ranking) => {
              if (ranking === 1) return '🥇';
              if (ranking === 2) return '🥈';
              if (ranking === 3) return '🥉';
              return `#${ranking}`;
            };
            
            return (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-lime-50 to-lime-100 border-2 border-lime-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>MTRIX Intelligence Center</span>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-lime-200 text-lime-900 border-lime-400 text-xs font-semibold">MTRIX</Badge>
                      <Badge className="bg-cyan-100 text-cyan-700 border-cyan-300 text-xs font-semibold">Nutrimental</Badge>
                    </div>
                  </div>
                  <CardDescription>Performance de distribuidores por região - {kpiData.periodo}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Resumo Consolidado - Movido para o topo */}
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                      <div className="text-sm text-orange-700 font-medium mb-1">Faturamento Total</div>
                      <div className="text-2xl font-bold text-orange-900">
                        R$ {(safeNumber(totalFaturamento) / 1000000).toFixed(2)}M
                      </div>
                      <div className="text-xs text-orange-600 mt-1">Top 5 distribuidores Brasil</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg border border-cyan-200">
                      <div className="text-sm text-cyan-700 font-medium mb-1">Volume Total</div>
                      <div className="text-2xl font-bold text-cyan-900">
                        {(safeNumber(totalVolume) / 1000).toFixed(0)}k un
                      </div>
                      <div className="text-xs text-cyan-600 mt-1">Unidades vendidas</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                      <div className="text-sm text-slate-700 font-medium mb-1">Preço Médio Geral</div>
                      <div className="text-2xl font-bold text-slate-900">
                        R$ {safeNumber(precoMedioGeral).toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-600 mt-1">Média ponderada</div>
                    </div>
                  </div>

                  {/* Brasil em Destaque - Sempre Visível */}
                  <div className="mb-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border-2 border-yellow-300 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                        <span>🇧🇷</span>
                        <span>BRASIL - Top 5 Distribuidores</span>
                      </h4>
                      <Badge className="bg-yellow-400 text-yellow-900 font-semibold">Consolidação Nacional</Badge>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Rank</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Distribuidor</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Faturamento</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Volume</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Participação</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Preço Médio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {brasilData.map((dist, idx) => (
                            <tr key={idx} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                              idx < 3 ? 'bg-yellow-50' : ''
                            }`}>
                              <td className="py-3 px-4">
                                <span className="text-lg font-bold">{getRankingIcon(dist.ranking)}</span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-semibold text-slate-900">{dist.distribuidor}</div>
                                <div className="text-xs text-slate-500">{dist.uf}</div>
                              </td>
                              <td className="text-right py-3 px-4 font-semibold text-slate-900">
                                R$ {(safeNumber(dist?.faturamento) / 1000).toFixed(0)}k
                              </td>
                              <td className="text-right py-3 px-4 text-slate-900">
                                {(safeNumber(dist?.volume) / 1000).toFixed(1)}k
                              </td>
                              <td className="text-right py-3 px-4">
                                <span className="inline-block bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-xs font-semibold">
                                  {dist.participacao}%
                                </span>
                              </td>
                              <td className="text-right py-3 px-4 text-slate-900">
                                R$ {safeNumber(dist?.precoMedio).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Gráfico de Barras - Top 5 Distribuidores */}
                  <div className="mb-6 bg-white rounded-lg border border-slate-200 p-5">
                    <h5 className="text-md font-semibold text-gray-800 mb-4">📊 Faturamento por Distribuidor (Brasil)</h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="nome" 
                          tick={{ fontSize: 12 }}
                          stroke="#64748b"
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          stroke="#64748b"
                          label={{ value: 'Faturamento (R$ mil)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#64748b' } }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                          formatter={(value) => [`R$ ${value}k`, 'Faturamento']}
                        />
                        <Bar dataKey="faturamento" fill="#84cc16" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Abas para Outras Regiões */}
                  <div className="bg-white rounded-lg border border-slate-200 p-5">
                    <h5 className="text-md font-semibold text-gray-800 mb-4">🗺️ Distribuidores por Região</h5>
                    
                    {/* Botões de Abas */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        { id: 'sp_rj_mg_es', label: '🏛️ SP, RJ, MG, ES' },
                        { id: 'sul', label: '🌾 SUL' },
                        { id: 'ne_no_co', label: '🌴 NE-NO-CO' }
                      ].map(({ id, label }) => (
                        <Button
                          key={id}
                          variant={selectedMtrixRegion === id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedMtrixRegion(id)}
                          className={`${
                            selectedMtrixRegion === id 
                              ? 'bg-lime-500 hover:bg-lime-600 text-white' 
                              : 'bg-white border-slate-300 text-slate-700 hover:bg-lime-50'
                          }`}
                        >
                          {label}
                        </Button>
                      ))}
                    </div>

                    {/* Tabela da Região Selecionada */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Rank</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Distribuidor</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Faturamento</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Volume</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Preço Médio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculateTotals(mtrixRegionData[selectedMtrixRegion]).map((dist, idx) => (
                            <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                              <td className="py-3 px-4">
                                <span className="font-semibold text-slate-600">{getRankingIcon(dist.ranking)}</span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-medium text-slate-900">{dist.distribuidor}</div>
                                <div className="text-xs text-slate-500">{dist.uf}</div>
                              </td>
                              <td className="text-right py-3 px-4 font-semibold text-slate-900">
                                R$ {(safeNumber(dist?.faturamento) / 1000).toFixed(0)}k
                              </td>
                              <td className="text-right py-3 px-4 text-slate-900">
                                {(safeNumber(dist?.volume) / 1000).toFixed(1)}k
                              </td>
                              <td className="text-right py-3 px-4 text-slate-900">
                                R$ {safeNumber(dist?.precoMedio).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* Análise Amazon - Dados E-commerce */}
          <AnaliseAmazon selectedCategory={selectedCategory} selectedPeriod={selectedPeriod} />

        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <InsightsMercado selectedCategory={selectedCategory} selectedPeriod={selectedPeriod} />
          <InsightsNaoEstruturados />
        </TabsContent>

        <TabsContent value="estrategia" className="space-y-6">
          <EstrategiaInovacao />
          <DashboardRecomendacoes />
        </TabsContent>

        <TabsContent value="simulador" className="space-y-6">
          <SimuladorElasticidade />
        </TabsContent>
      </Tabs>

      {/* Chat Assistant */}
      {!presentationMode && (
        <>
          <Button
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg z-40"
            onClick={() => setChatOpen(true)}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>

          {chatOpen && (
            <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl border z-50 flex flex-col">
              <div className="p-4 border-b bg-cyan-500 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span className="font-medium">Assistente IA Nutrimental</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setChatOpen(false)} className="text-white hover:bg-cyan-600">
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === 'user' 
                        ? 'bg-cyan-500 text-white' 
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
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <Button size="sm" onClick={sendMessage} className="bg-cyan-500 hover:bg-cyan-600">
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
