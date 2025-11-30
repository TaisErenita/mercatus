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
import MonitoramentoOverview from './components/MonitoramentoOverview'
import MonitoramentoScanntech from './components/MonitoramentoScanntech'
import MonitoramentoInternos from './components/MonitoramentoInternos'
import MonitoramentoMTRIX from './components/MonitoramentoMTRIX'
import MonitoramentoAmazon from './components/MonitoramentoAmazon'

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
import { getScanntechMercadoTotal, getScanntechShareNutrimental } from './data/scanntechDataReal';
import { getScanntechMarcasRegiaoComparativo } from './data/scanntechDataReal_v2';import { getMarcasData } from './data/marcasData'
import { getMtrixData } from './data/mtrixData'
import { getPerformanceInternaData } from './data/performanceInternaData'
import { getNutrimentalScanntechData, getNutrimentalCategorias } from './data/nutrimentalScanntechData'
import { getNutrimentalInternaData } from './data/nutrimentalInternaData'
import { getPeriodoLegenda, meses } from './utils/periodHelpers'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [showHome, setShowHome] = useState(false)
  const [activeTab, setActiveTab] = useState('monitoramento')
  const [selectedPeriod, setSelectedPeriod] = useState('mes_yoy')
  const [selectedCategory, setSelectedCategory] = useState('total')
  const [selectedMes, setSelectedMes] = useState(8) // Agosto = 8
  const [selectedSubmodulo, setSelectedSubmodulo] = useState(null) // null = visão geral, 'scanntech', 'internos', 'mtrix', 'amazon'
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
  // Legenda dinu00e2mica baseada no peru00edodo e mu00eas selecionados
  const periodoLegenda = getPeriodoLegenda(selectedPeriod, selectedMes, 2025)
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
          {selectedSubmodulo === null && (
            <MonitoramentoOverview
              onSelectSubmodulo={setSelectedSubmodulo}
              periodoLegenda={periodoLegenda}
            />
          )}
          
          {selectedSubmodulo === 'scanntech' && (
            <MonitoramentoScanntech
              onVoltar={() => setSelectedSubmodulo(null)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              selectedMes={selectedMes}
              setSelectedMes={setSelectedMes}
              periodoLegenda={periodoLegenda}
            />
          )}
          
          {selectedSubmodulo === 'internos' && (
            <MonitoramentoInternos
              onVoltar={() => setSelectedSubmodulo(null)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              selectedMes={selectedMes}
              setSelectedMes={setSelectedMes}
              periodoLegenda={periodoLegenda}
            />
          )}
          
          {selectedSubmodulo === 'mtrix' && (
            <MonitoramentoMTRIX
              onVoltar={() => setSelectedSubmodulo(null)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              selectedMes={selectedMes}
              setSelectedMes={setSelectedMes}
              periodoLegenda={periodoLegenda}
            />
          )}
          
          {selectedSubmodulo === 'amazon' && (
            <MonitoramentoAmazon
              onVoltar={() => setSelectedSubmodulo(null)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              selectedMes={selectedMes}
              setSelectedMes={setSelectedMes}
              periodoLegenda={periodoLegenda}
            />
          )}
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
