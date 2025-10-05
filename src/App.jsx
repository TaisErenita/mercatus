import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, TrendingDown, Target, ShoppingCart, Brain, Award, Zap, Users, DollarSign, Package, BarChart3, PieChart as PieChartIcon, MessageCircle, Send, X, Minimize2 } from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      message: 'Olá! 👋 Sou o assistente IA da Nutrimental. Como posso ajudar você a interpretar os dados do dashboard?',
      timestamp: new Date()
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [presentationMode, setPresentationMode] = useState(false)
  const [simulatorOpen, setSimulatorOpen] = useState(false)
  const [simulatorParams, setSimulatorParams] = useState({
    investment: 1000000, // R$ 1M
    priceIncrease: 0, // 0%
    marketingSpend: 500000, // R$ 500K
    distributionExpansion: 2 // 2 novos estados
  })
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Rio de Janeiro - Ação Urgente',
      message: 'Apenas 189 unidades vendidas. Potencial de crescimento 1.000%',
      action: 'Implementar operação resgate',
      timestamp: new Date(),
      read: false
    },
    {
      id: 2,
      type: 'opportunity',
      title: 'Tendência Mini Barras',
      message: 'Mercado crescendo 15% ao ano. Brasil sem líder estabelecido',
      action: 'Acelerar desenvolvimento',
      timestamp: new Date(),
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Declínio Projetado 2025',
      message: 'IA detecta queda de 50% no 2º semestre de 2025',
      action: 'Implementar forecasting',
      timestamp: new Date(),
      read: false
    },
    {
      id: 4,
      type: 'success',
      title: 'Meta SP Atingida',
      message: 'São Paulo superou expectativas com 85.4 unid/transação',
      action: 'Replicar estratégia',
      timestamp: new Date(),
      read: true
    }
  ])
  const [showAlerts, setShowAlerts] = useState(false)

  // Dados simulados baseados nas análises reais
  const kpiData = {
    marketShare: 50.16,
    totalSales: 351804,
    revenue: 119538436,
    growth: 15.2,
    clusters: 3,
    predictions: 0.788
  }

  // Dados de categorias e concorrentes
  const categoriaBarrasData = {
    shareByCategory: [
      {
        categoria: 'Barra de Cereais',
        nutrimentalShare: 52.3,
        marketSize: 'R$ 1.8B',
        growth: '+8.2%',
        color: '#3B82F6',
        principais_concorrentes: [
          { nome: 'Nutry', share: 52.3, posicao: 1 },
          { nome: 'Trio', share: 18.7, posicao: 2 },
          { nome: 'Kobber', share: 12.4, posicao: 3 },
          { nome: 'Bauducco', share: 8.9, posicao: 4 },
          { nome: 'Outros', share: 7.7, posicao: 5 }
        ]
      },
      {
        categoria: 'Barra de Frutas',
        nutrimentalShare: 34.8,
        marketSize: 'R$ 450M',
        growth: '+12.5%',
        color: '#10B981',
        principais_concorrentes: [
          { nome: 'Frutose', share: 41.2, posicao: 1 },
          { nome: 'Nutry', share: 34.8, posicao: 2 },
          { nome: 'Native', share: 15.6, posicao: 3 },
          { nome: 'Mãe Terra', share: 5.8, posicao: 4 },
          { nome: 'Outros', share: 2.6, posicao: 5 }
        ]
      },
      {
        categoria: 'Barra de Nuts',
        nutrimentalShare: 28.9,
        marketSize: 'R$ 320M',
        growth: '+15.8%',
        color: '#F59E0B',
        principais_concorrentes: [
          { nome: 'Agtal', share: 35.4, posicao: 1 },
          { nome: 'Nutry', share: 28.9, posicao: 2 },
          { nome: 'Castanheiro', share: 19.7, posicao: 3 },
          { nome: 'Jasmine', share: 11.2, posicao: 4 },
          { nome: 'Outros', share: 4.8, posicao: 5 }
        ]
      },
      {
        categoria: 'Barra de Proteína',
        nutrimentalShare: 15.6,
        marketSize: 'R$ 280M',
        growth: '+22.3%',
        color: '#EF4444',
        principais_concorrentes: [
          { nome: 'Integralmédica', share: 42.8, posicao: 1 },
          { nome: 'Probiótica', share: 23.1, posicao: 2 },
          { nome: 'Nutry', share: 15.6, posicao: 3 },
          { nome: 'Growth', share: 12.7, posicao: 4 },
          { nome: 'Outros', share: 5.8, posicao: 5 }
        ]
      }
    ],
    
    priceAnalysis: [
      {
        categoria: 'Barra de Cereais',
        nutryPrice: 4.50,
        marketAverage: 4.20,
        premium: '+7.1%',
        concorrentes: [
          { nome: 'Nutry', preco: 4.50, posicionamento: 'Premium' },
          { nome: 'Trio', preco: 3.90, posicionamento: 'Mainstream' },
          { nome: 'Kobber', preco: 4.80, posicionamento: 'Premium' },
          { nome: 'Bauducco', preco: 3.50, posicionamento: 'Econômico' }
        ]
      },
      {
        categoria: 'Barra de Frutas',
        nutryPrice: 5.20,
        marketAverage: 5.80,
        premium: '-10.3%',
        concorrentes: [
          { nome: 'Frutose', preco: 4.90, posicionamento: 'Mainstream' },
          { nome: 'Nutry', preco: 5.20, posicionamento: 'Mainstream' },
          { nome: 'Native', preco: 8.90, posicionamento: 'Super Premium' },
          { nome: 'Mãe Terra', preco: 7.50, posicionamento: 'Premium' }
        ]
      },
      {
        categoria: 'Barra de Nuts',
        nutryPrice: 6.80,
        marketAverage: 7.20,
        premium: '-5.6%',
        concorrentes: [
          { nome: 'Agtal', preco: 5.90, posicionamento: 'Mainstream' },
          { nome: 'Nutry', preco: 6.80, posicionamento: 'Premium' },
          { nome: 'Castanheiro', preco: 12.90, posicionamento: 'Super Premium' },
          { nome: 'Jasmine', preco: 8.50, posicionamento: 'Premium' }
        ]
      },
      {
        categoria: 'Barra de Proteína',
        nutryPrice: 8.90,
        marketAverage: 9.80,
        premium: '-9.2%',
        concorrentes: [
          { nome: 'Integralmédica', preco: 12.50, posicionamento: 'Premium' },
          { nome: 'Probiótica', preco: 11.20, posicionamento: 'Premium' },
          { nome: 'Nutry', preco: 8.90, posicionamento: 'Mainstream' },
          { nome: 'Growth', preco: 15.90, posicionamento: 'Super Premium' }
        ]
      }
    ]
  }

  // Dados do mapa do Brasil
  const mapaEstadosData = {
    shareByState: [
      { estado: 'SP', nome: 'São Paulo', share: 26.9, vendas: 20589, densidade: 85.4, regiao: 'Sudeste', color: '#1e40af', status: 'Líder' },
      { estado: 'CE', nome: 'Ceará', share: 26.5, vendas: 20285, densidade: 37.2, regiao: 'Nordeste', color: '#1e40af', status: 'Líder' },
      { estado: 'RN', nome: 'Rio Grande do Norte', share: 26.4, vendas: 20208, densidade: 31.8, regiao: 'Nordeste', color: '#1e40af', status: 'Líder' },
      { estado: 'PR', nome: 'Paraná', share: 15.9, vendas: 12167, densidade: 42.1, regiao: 'Sul', color: '#3b82f6', status: 'Forte' },
      { estado: 'MG', nome: 'Minas Gerais', share: 4.2, vendas: 3214, densidade: 28.9, regiao: 'Sudeste', color: '#60a5fa', status: 'Moderado' },
      { estado: 'RJ', nome: 'Rio de Janeiro', share: 0.25, vendas: 189, densidade: 6.8, regiao: 'Sudeste', color: '#ef4444', status: 'Crítico' },
      { estado: 'BA', nome: 'Bahia', share: 0.15, vendas: 115, densidade: 4.2, regiao: 'Nordeste', color: '#ef4444', status: 'Crítico' },
      { estado: 'RS', nome: 'Rio Grande do Sul', share: 0.12, vendas: 92, densidade: 3.8, regiao: 'Sul', color: '#ef4444', status: 'Crítico' },
      { estado: 'SC', nome: 'Santa Catarina', share: 0.08, vendas: 61, densidade: 2.9, regiao: 'Sul', color: '#ef4444', status: 'Crítico' },
      { estado: 'GO', nome: 'Goiás', share: 0.05, vendas: 38, densidade: 2.1, regiao: 'Centro-Oeste', color: '#ef4444', status: 'Crítico' }
    ],
    
    kpisGeograficos: {
      coberturaNacional: '37%',
      concentracaoTop3: '79.8%',
      densidadeMedia: 32.1,
      estadosCriticos: 6,
      potencialInexplorado: 'R$ 2.3B',
      investimentoRecomendado: 'R$ 1.15M'
    }
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



  // Funções do Chat
  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: chatInput,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse = generateAIResponse(chatInput)
      const assistantMessage = {
        id: chatMessages.length + 2,
        type: 'assistant',
        message: aiResponse,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  const generateAIResponse = (input) => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('market share') || lowerInput.includes('participação')) {
      return '📊 Nosso market share atual é de 50.16%, indicando liderança consolidada no mercado de barras de cereais. Isso representa uma posição forte, mas há oportunidades de crescimento, especialmente no e-commerce que representa apenas 0.5% das vendas.'
    }
    
    if (lowerInput.includes('vendas') || lowerInput.includes('sales')) {
      return '📈 Vendemos 351.804 unidades com receita de R$ 119.5M. O modelo IA detectou um padrão preocupante: projeção de declínio de 50% para 2025-2S. Recomendo focar nas ações de alta prioridade para reverter essa tendência.'
    }
    
    if (lowerInput.includes('produtos') || lowerInput.includes('cluster')) {
      return '🛍️ Temos 3 clusters: Alto Volume (28 produtos, média 873 unid), Médio Volume (2.507 produtos, média 38 unid) e Baixo Volume (17.646 produtos, média 13 unid). 85% do portfólio está em baixo volume - grande oportunidade de otimização!'
    }
    
    if (lowerInput.includes('estados') || lowerInput.includes('região')) {
      return '🗺️ SP lidera com 26.9% das vendas (densidade 85.4 unid/transação). CE e RN têm volumes altos mas baixa eficiência (31-37 unid/transação). RJ é nossa maior oportunidade perdida: apenas 189 unidades em um mercado de 17M habitantes!'
    }
    
    if (lowerInput.includes('recomendação') || lowerInput.includes('ação')) {
      return '🎯 Principais ações: 1) Implementar forecasting automático (economia R$ 2.3M), 2) Intensificar Amazon (potencial +40%), 3) Operação resgate no RJ (ROI 300%), 4) Otimizar portfólio (reduzir 30% SKUs baixo volume).'
    }
    
    if (lowerInput.includes('roi') || lowerInput.includes('retorno')) {
      return '💰 O AIAAS já está gerando valor! Projeção de ROI: 1.042% em 3 anos. Economia de R$ 2.3M anuais em estoque + crescimento de 25% nos produtos-alvo. Payback em 4-6 meses.'
    }
    
    if (lowerInput.includes('concorrência') || lowerInput.includes('mercado')) {
      return '🏆 Mantemos liderança com 50.16% de market share, mas precisamos acelerar no digital. Concorrentes estão investindo em e-commerce. Nossa vantagem: primeiro AIAAS específico para barras de cereais no Brasil!'
    }
    
    if (lowerInput.includes('inovação') || lowerInput.includes('inovações') || lowerInput.includes('inovacao')) {
      return '🚀 Roadmap de inovação: Fase 1 (0-3 meses): Validação R$ 200K, Fase 2 (3-6 meses): Protótipos R$ 400K, Fase 3 (6-12 meses): Lançamento R$ 800K. Meta: 4 produtos inovadores/ano, 15% market share premium, ROI 200%. Oportunidades: Nutry Mini (ROI 180%), Linha Amazônia (ROI 220%), Nutry Energia+ (ROI 150%).'
    }
    
    if (lowerInput.includes('mini') || lowerInput.includes('miniaturização')) {
      return '🔬 Mini barras representam nossa maior oportunidade de inovação! Mercado global crescendo 12-15% ao ano. Perfect Snacks e Ritual Chocolate lideram internacionalmente, mas Brasil ainda não tem líder estabelecido. Recomendo desenvolvimento imediato da linha Nutry Mini (18g) com investimento de R$ 800K e ROI projetado de 180%.'
    }
    
    if (lowerInput.includes('categoria') || lowerInput.includes('share por categoria')) {
      return '📊 Share por categoria: Cereais 52.3% (líder absoluto), Frutas 34.8% (vice-líder atrás da Frutose 41.2%), Nuts 28.9% (vice-líder atrás da Agtal 35.4%), Proteína 15.6% (3º lugar atrás de Integralmédica 42.8% e Probiótica 23.1%). Maior oportunidade: fortalecer posição em proteína e nuts.'
    }
    
    if (lowerInput.includes('concorrente') || lowerInput.includes('competição') || lowerInput.includes('trio') || lowerInput.includes('kobber')) {
      return '🏁 Principais concorrentes: Cereais - Trio (18.7%) crescendo 15% ao ano, Kobber (12.4%) investindo em premium; Frutas - Frutose líder (41.2%); Nuts - Agtal líder (35.4%), Castanheiro premium (19.7%); Proteína - Integralmédica dominante (42.8%). Ameaças: Trio acelerando, Native crescendo em premium.'
    }
    
    if (lowerInput.includes('preço') || lowerInput.includes('pricing') || lowerInput.includes('premium')) {
      return '💰 Posicionamento de preços: Cereais +7.1% premium vs mercado (R$ 4.50 vs R$ 4.20), Frutas -10.3% desconto (R$ 5.20 vs R$ 5.80), Nuts -5.6% desconto (R$ 6.80 vs R$ 7.20), Proteína -9.2% desconto (R$ 8.90 vs R$ 9.80). Oportunidade: aumentar preços em frutas, nuts e proteína para capturar valor.'
    }
    
    if (lowerInput.includes('amazônia') || lowerInput.includes('ingredientes') || lowerInput.includes('amazonia')) {
      return '🌿 Ingredientes amazônicos são nossa vantagem competitiva única! Açaí, castanha do Pará e cupuaçu oferecem diferenciação que concorrentes internacionais não conseguem replicar. Linha Amazônia pode gerar R$ 30-40M em potencial de mercado com posicionamento premium de R$ 8,90.'
    }
    
    if (lowerInput.includes('mapa') || lowerInput.includes('geografia') || lowerInput.includes('cobertura')) {
      return '🗺️ Cobertura nacional de apenas 37% (10 de 27 estados). Concentração de 79.8% nos top 3 (SP, CE, RN). 6 estados críticos com share <1%. Potencial inexplorado de R$ 2.3B. Prioridade: operação resgate RJ (ROI 300%), expansão BA (ROI 250%), entrada RS (ROI 180%).'
    }
    }
    
    if (lowerInput.includes('plant') || lowerInput.includes('vegano') || lowerInput.includes('vegetal')) {
      return '🌱 Mercado plant-based crescendo 15-20% ao ano! Oportunidade de R$ 35-50M no Brasil. Nutry Veggie com proteínas de feijão e grão-de-bico pode capturar mercado vegano/vegetariano em expansão. Investimento de R$ 1.5M com ROI de 200%.'
    }
    
    if (lowerInput.includes('crescimento') || lowerInput.includes('impacto') || lowerInput.includes('potencial')) {
      return '📈 TRANSFORMAÇÃO DRAMÁTICA! Inovações triplicam o potencial: Receita 5 anos salta de R$ 152M para R$ 350M (+2.3x). ROI explode de 180% para 1.900% (+10.5x). Market share cresce de 55% para 68%. Receita adicional de R$ 474M em 5 anos. Crescimento acelera de 3-5% para 15-25% ao ano!'
    }
    
    if (lowerInput.includes('comparação') || lowerInput.includes('cenário') || lowerInput.includes('tradicional')) {
      return '⚖️ COMPARAÇÃO DECISIVA: Cenário Tradicional = R$ 152M em 5 anos, 55% market share, ROI 180%. Cenário com Inovações = R$ 350M em 5 anos (+2.3x), 68% market share (+13%), ROI 1.900% (+10.5x). Mercado endereçável expande de R$ 2.5B para R$ 3.8B (+52%). A diferença é transformadora!'
    }
    
    return '🤖 Posso ajudar com informações sobre: market share, vendas, produtos/clusters, análise por estados, recomendações estratégicas, ROI, inovações, crescimento, comparação de cenários, mini barras, ingredientes amazônicos, ou plant-based. Sobre o que gostaria de saber mais?'
  }

  // Funções de Alertas
  const unreadAlertsCount = alerts.filter(alert => !alert.read).length

  const markAlertAsRead = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ))
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return '🚨'
      case 'warning': return '⚠️'
      case 'opportunity': return '💡'
      case 'success': return '✅'
      default: return '📊'
    }
  }



  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-900'
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-900'
      case 'opportunity': return 'bg-blue-50 border-blue-200 text-blue-900'
      case 'success': return 'bg-green-50 border-green-200 text-green-900'
      default: return 'bg-gray-50 border-gray-200 text-gray-900'
    }
  }

  // Funções do Simulador de Cenários
  const calculateSimulatorResults = () => {
    const baseRevenue = 119500000 // R$ 119.5M atual
    const baseMarketShare = 50.16
    
    // Cálculos baseados nos parâmetros
    const investmentMultiplier = simulatorParams.investment / 1000000 // Base R$ 1M
    const priceImpact = simulatorParams.priceIncrease / 100
    const marketingImpact = simulatorParams.marketingSpend / 500000 // Base R$ 500K
    const distributionImpact = simulatorParams.distributionExpansion / 2 // Base 2 estados
    
    // Projeções
    const projectedRevenue = baseRevenue * (1 + (investmentMultiplier * 0.15) + (priceImpact * 0.8) + (marketingImpact * 0.12) + (distributionImpact * 0.25))
    const projectedMarketShare = Math.min(baseMarketShare * (1 + (investmentMultiplier * 0.08) + (marketingImpact * 0.05) + (distributionImpact * 0.15)), 75)
    const totalInvestment = simulatorParams.investment + simulatorParams.marketingSpend
    const roi = ((projectedRevenue - baseRevenue - totalInvestment) / totalInvestment) * 100
    const paybackMonths = totalInvestment / ((projectedRevenue - baseRevenue) / 12)
    
    return {
      projectedRevenue,
      projectedMarketShare,
      totalInvestment,
      roi,
      paybackMonths,
      revenueIncrease: projectedRevenue - baseRevenue
    }
  }

  const updateSimulatorParam = (param, value) => {
    setSimulatorParams(prev => ({
      ...prev,
      [param]: value
    }))
  }



  // Função de Modo Apresentação
  const togglePresentationMode = () => {
    setPresentationMode(!presentationMode)
    if (!presentationMode) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
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
            <p className="text-slate-600 text-lg">
              Dashboard Executivo de Inteligência Artificial
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Botão de Alertas */}
            {!presentationMode && (
              <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAlerts(!showAlerts)}
                className="relative"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v6m0 0l3-3m-3 3l-3-3" />
                </svg>
                Alertas
                {unreadAlertsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {unreadAlertsCount}
                  </Badge>
                )}
              </Button>
              
              {/* Dropdown de Alertas */}
              {showAlerts && (
                <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-slate-900">Alertas Inteligentes</h3>
                    <p className="text-sm text-slate-600">{unreadAlertsCount} não lidos</p>
                  </div>
                  <div className="p-2">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-lg border mb-2 cursor-pointer transition-all ${getAlertColor(alert.type)} ${!alert.read ? 'border-l-4' : ''}`}
                        onClick={() => markAlertAsRead(alert.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2">
                            <span className="text-lg">{getAlertIcon(alert.type)}</span>
                            <div>
                              <h4 className="font-semibold text-sm">{alert.title}</h4>
                              <p className="text-xs mt-1 opacity-80">{alert.message}</p>
                              <p className="text-xs mt-2 font-medium">💡 {alert.action}</p>
                            </div>
                          </div>
                          {!alert.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </div>
            )}

            {/* Botão Simulador de Cenários */}
            {!presentationMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSimulatorOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Simular Cenários
              </Button>
            )}

            {/* Botão Modo Apresentação */}
            <Button
              variant={presentationMode ? "default" : "outline"}
              size="sm"
              onClick={togglePresentationMode}
            >
              {presentationMode ? (
                <>
                  <Minimize2 className="w-4 h-4 mr-2" />
                  Sair Apresentação
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  Modo Apresentação
                </>
              )}
            </Button>

            {!presentationMode && (
              <>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  <Brain className="w-4 h-4 mr-2" />
                  IA Operacional
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  <Award className="w-4 h-4 mr-2" />
                  Líder de Mercado
                </Badge>
              </>
            )}
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
        <TabsList className="grid w-full grid-cols-6 lg:w-4/5">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Monitoramento</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Produtos</span>
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Canais</span>
          </TabsTrigger>
          <TabsTrigger value="estados" className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>Estados</span>
          </TabsTrigger>
          <TabsTrigger value="inovacoes" className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Inovações</span>
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

          {/* Nova Seção: Share por Categoria de Barras */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Share por Categoria</span>
                </CardTitle>
                <CardDescription>Posição competitiva por tipo de barra</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoriaBarrasData.shareByCategory.map((categoria, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: categoria.color }}
                        ></div>
                        <span className="font-medium text-sm">{categoria.categoria}</span>
                        <Badge variant="outline" className="text-xs">
                          {categoria.marketSize}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg" style={{ color: categoria.color }}>
                          {categoria.nutrimentalShare}%
                        </div>
                        <div className="text-xs text-slate-600">{categoria.growth}</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300" 
                        style={{ 
                          backgroundColor: categoria.color, 
                          width: `${categoria.nutrimentalShare}%` 
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-500">
                      Posição: #{categoria.principais_concorrentes.find(c => c.nome === 'Nutry')?.posicao || 'N/A'} | 
                      Líder: {categoria.principais_concorrentes[0]?.nome} ({categoria.principais_concorrentes[0]?.share}%)
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Nova Seção: Análise de Preços */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span>Posicionamento de Preços</span>
                </CardTitle>
                <CardDescription>Nutry vs. média do mercado por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoriaBarrasData.priceAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="categoria" 
                      tick={{ fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      label={{ value: 'Preço (R$)', angle: -90, position: 'insideLeft' }}
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `R$ ${value.toFixed(2)}`, 
                        name === 'nutryPrice' ? 'Nutry' : 'Média Mercado'
                      ]}
                    />
                    <Bar dataKey="marketAverage" fill="#94a3b8" name="Média Mercado" />
                    <Bar dataKey="nutryPrice" fill="#3b82f6" name="Nutry" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoriaBarrasData.priceAnalysis.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="font-medium">{item.categoria}:</span>
                      <span className={`font-bold ${item.premium.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {item.premium} vs. mercado
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Matriz Competitiva */}
          <Card className="border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Principais Concorrentes por Categoria</span>
              </CardTitle>
              <CardDescription>Ranking competitivo detalhado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoriaBarrasData.shareByCategory.map((categoria, catIndex) => (
                  <div key={catIndex} className="space-y-3">
                    <div className="text-center">
                      <h4 className="font-semibold text-sm" style={{ color: categoria.color }}>
                        {categoria.categoria}
                      </h4>
                      <p className="text-xs text-slate-600">{categoria.marketSize}</p>
                    </div>
                    <div className="space-y-2">
                      {categoria.principais_concorrentes.map((concorrente, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                            concorrente.nome === 'Nutry' 
                              ? 'bg-blue-50 border border-blue-200' 
                              : 'bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-400">#{concorrente.posicao}</span>
                            <span className={`font-medium ${concorrente.nome === 'Nutry' ? 'text-blue-700' : ''}`}>
                              {concorrente.nome}
                            </span>
                          </div>
                          <span className="font-bold">{concorrente.share}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nova Seção: Mapa do Brasil */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Mapa Interativo */}
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>Mapa de Performance por Estado</span>
                </CardTitle>
                <CardDescription>Distribuição geográfica das vendas e oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mapa SVG Simplificado do Brasil */}
                <div className="relative w-full h-96 bg-slate-50 rounded-lg overflow-hidden">
                  <svg viewBox="0 0 500 400" className="w-full h-full">
                    {/* Contorno simplificado do Brasil */}
                    <path
                      d="M100 50 L400 50 L450 100 L450 300 L400 350 L100 350 L50 300 L50 100 Z"
                      fill="#f1f5f9"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />
                    
                    {/* Estados com dados */}
                    {mapaEstadosData.shareByState.map((estado, index) => {
                      const radius = Math.max(8, Math.min(25, estado.share * 0.8));
                      const positions = {
                        'SP': { cx: 350, cy: 280 },
                        'CE': { cx: 420, cy: 120 },
                        'RN': { cx: 440, cy: 110 },
                        'PR': { cx: 320, cy: 320 },
                        'MG': { cx: 380, cy: 240 },
                        'RJ': { cx: 400, cy: 290 },
                        'BA': { cx: 410, cy: 180 },
                        'RS': { cx: 300, cy: 380 },
                        'SC': { cx: 310, cy: 340 },
                        'GO': { cx: 340, cy: 200 }
                      };
                      
                      const pos = positions[estado.estado] || { cx: 250, cy: 200 };
                      
                      return (
                        <g key={index}>
                          <circle
                            cx={pos.cx}
                            cy={pos.cy}
                            r={radius}
                            fill={estado.color}
                            opacity="0.8"
                            className="hover:opacity-100 transition-opacity cursor-pointer"
                          />
                          <text
                            x={pos.cx}
                            y={pos.cy + 3}
                            textAnchor="middle"
                            className="text-xs font-bold fill-white"
                          >
                            {estado.estado}
                          </text>
                          <text
                            x={pos.cx}
                            y={pos.cy + radius + 15}
                            textAnchor="middle"
                            className="text-xs fill-slate-600"
                          >
                            {estado.share}%
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Legenda */}
                  <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                    <div className="text-xs font-semibold mb-2">Legenda</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                        <span>Líder (>20%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Forte (10-20%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                        <span>Moderado (1-10%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Crítico (menor que 1%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPIs Geográficos */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>KPIs Geográficos</span>
                </CardTitle>
                <CardDescription>Métricas de cobertura nacional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {mapaEstadosData.kpisGeograficos.coberturaNacional}
                    </div>
                    <div className="text-xs text-slate-600">Cobertura Nacional</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {mapaEstadosData.kpisGeograficos.concentracaoTop3}
                    </div>
                    <div className="text-xs text-slate-600">Concentração Top 3</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mapaEstadosData.kpisGeograficos.densidadeMedia}
                    </div>
                    <div className="text-xs text-slate-600">Densidade Média</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {mapaEstadosData.kpisGeograficos.estadosCriticos}
                    </div>
                    <div className="text-xs text-slate-600">Estados Críticos</div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="text-sm font-semibold">Top 5 Estados</div>
                  {mapaEstadosData.shareByState.slice(0, 5).map((estado, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: estado.color }}
                        ></div>
                        <span className="text-sm font-medium">{estado.estado}</span>
                        <Badge variant="outline" className="text-xs">
                          {estado.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{estado.share}%</div>
                        <div className="text-xs text-slate-600">{estado.vendas.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-sm font-semibold text-yellow-800 mb-1">Oportunidade Crítica</div>
                  <div className="text-xs text-yellow-700">
                    Potencial inexplorado: <span className="font-bold">{mapaEstadosData.kpisGeograficos.potencialInexplorado}</span>
                  </div>
                  <div className="text-xs text-yellow-700">
                    Investimento recomendado: <span className="font-bold">{mapaEstadosData.kpisGeograficos.investimentoRecomendado}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Bases de Dados ScanTech e MTRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* ScanTech Intelligence */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>ScanTech Intelligence</span>
                </CardTitle>
                <CardDescription>Inteligência competitiva e market share</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {scanTechMetrics.marketShare.current}%
                    </div>
                    <div className="text-xs text-slate-600">Market Share</div>
                    <div className="text-xs text-green-600 font-medium">
                      {scanTechMetrics.marketShare.trend}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      #{scanTechMetrics.marketShare.position}
                    </div>
                    <div className="text-xs text-slate-600">Posição Geral</div>
                    <div className="text-xs text-blue-600 font-medium">Líder</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Ameaças Competitivas</div>
                  {scanTechMetrics.marketShare.threats.map((threat, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">⚠️ {threat}</span>
                      <Badge variant="destructive" className="text-xs">Alta</Badge>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Oportunidades</div>
                  {scanTechMetrics.marketShare.opportunities.map((opp, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-sm text-green-700">💡 {opp}</span>
                      <Badge variant="default" className="text-xs bg-green-600">Média</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Pricing Intelligence</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Premium: <span className="font-bold text-green-600">{scanTechMetrics.pricing.premium}</span></div>
                    <div>Gap: <span className="font-bold">{scanTechMetrics.pricing.competitiveGap}</span></div>
                    <div>Elasticidade: <span className="font-bold">{scanTechMetrics.pricing.elasticity}</span></div>
                    <div>Guerra Preços: <span className="font-bold text-green-600">Não</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MTRIX Sell-Out */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>MTRIX Sell-Out</span>
                </CardTitle>
                <CardDescription>Performance operacional e distribuição</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {(mtrixMetrics.sellOut.volume / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-slate-600">Volume Total</div>
                    <div className="text-xs text-green-600 font-medium">
                      {mtrixMetrics.sellOut.growth}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mtrixMetrics.sellOut.density}
                    </div>
                    <div className="text-xs text-slate-600">Densidade Média</div>
                    <div className="text-xs text-green-600 font-medium">unid/transação</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Estados Críticos</div>
                  {mtrixMetrics.geographic.criticalStates.map((state, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">🚨 {state}</span>
                      <Badge variant="destructive" className="text-xs">Ação Urgente</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Top Performer</div>
                  <div className="text-lg font-bold text-blue-600">{mtrixMetrics.geographic.topPerformer}</div>
                  <div className="text-xs text-slate-600">Melhor densidade e cobertura</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Métricas Operacionais</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Ticket Médio: <span className="font-bold">{mtrixMetrics.operational.avgTicket}</span></div>
                    <div>Giro Estoque: <span className="font-bold">{mtrixMetrics.operational.stockTurnover}</span></div>
                    <div>Ruptura: <span className="font-bold text-red-600">{mtrixMetrics.operational.rupture}</span></div>
                    <div>Share Gôndola: <span className="font-bold text-green-600">{mtrixMetrics.operational.shelfShare}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Alertas Cross-Base */}
          <Card className="border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Alertas Integrados ScanTech + MTRIX</span>
              </CardTitle>
              <CardDescription>Monitoramento cross-base em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {crossBaseAlerts.map((alert, index) => {
                  const getAlertColor = (type) => {
                    switch(type) {
                      case 'critical': return 'bg-red-50 border-red-200 text-red-800'
                      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
                      case 'success': return 'bg-green-50 border-green-200 text-green-800'
                      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800'
                      default: return 'bg-gray-50 border-gray-200 text-gray-800'
                    }
                  }

                  const getAlertIcon = (type) => {
                    switch(type) {
                      case 'critical': return '🔴'
                      case 'warning': return '🟡'
                      case 'success': return '🟢'
                      case 'info': return '🔵'
                      default: return '⚪'
                    }
                  }

                  return (
                    <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span>{getAlertIcon(alert.type)}</span>
                            <span className="text-sm font-semibold">{alert.source}</span>
                            <Badge variant="outline" className="text-xs">
                              {alert.priority}
                            </Badge>
                          </div>
                          <div className="text-sm mb-1">{alert.message}</div>
                          <div className="text-xs opacity-75">💡 {alert.action}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
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

          {/* Nova Seção: Share por Categoria de Barras */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Share por Categoria</span>
                </CardTitle>
                <CardDescription>Posição competitiva por tipo de barra</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoriaBarrasData.shareByCategory.map((categoria, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: categoria.color }}
                        ></div>
                        <span className="font-medium text-sm">{categoria.categoria}</span>
                        <Badge variant="outline" className="text-xs">
                          {categoria.marketSize}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg" style={{ color: categoria.color }}>
                          {categoria.nutrimentalShare}%
                        </div>
                        <div className="text-xs text-slate-600">{categoria.growth}</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300" 
                        style={{ 
                          backgroundColor: categoria.color, 
                          width: `${categoria.nutrimentalShare}%` 
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-500">
                      Posição: #{categoria.principais_concorrentes.find(c => c.nome === 'Nutry')?.posicao || 'N/A'} | 
                      Líder: {categoria.principais_concorrentes[0]?.nome} ({categoria.principais_concorrentes[0]?.share}%)
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Nova Seção: Análise de Preços */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span>Posicionamento de Preços</span>
                </CardTitle>
                <CardDescription>Nutry vs. média do mercado por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoriaBarrasData.priceAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="categoria" 
                      tick={{ fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      label={{ value: 'Preço (R$)', angle: -90, position: 'insideLeft' }}
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `R$ ${value.toFixed(2)}`, 
                        name === 'nutryPrice' ? 'Nutry' : 'Média Mercado'
                      ]}
                    />
                    <Bar dataKey="marketAverage" fill="#94a3b8" name="Média Mercado" />
                    <Bar dataKey="nutryPrice" fill="#3b82f6" name="Nutry" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoriaBarrasData.priceAnalysis.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="font-medium">{item.categoria}:</span>
                      <span className={`font-bold ${item.premium.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {item.premium} vs. mercado
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Matriz Competitiva */}
          <Card className="border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Principais Concorrentes por Categoria</span>
              </CardTitle>
              <CardDescription>Ranking competitivo detalhado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoriaBarrasData.shareByCategory.map((categoria, catIndex) => (
                  <div key={catIndex} className="space-y-3">
                    <div className="text-center">
                      <h4 className="font-semibold text-sm" style={{ color: categoria.color }}>
                        {categoria.categoria}
                      </h4>
                      <p className="text-xs text-slate-600">{categoria.marketSize}</p>
                    </div>
                    <div className="space-y-2">
                      {categoria.principais_concorrentes.map((concorrente, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                            concorrente.nome === 'Nutry' 
                              ? 'bg-blue-50 border border-blue-200' 
                              : 'bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-400">#{concorrente.posicao}</span>
                            <span className={`font-medium ${concorrente.nome === 'Nutry' ? 'text-blue-700' : ''}`}>
                              {concorrente.nome}
                            </span>
                          </div>
                          <span className="font-bold">{concorrente.share}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nova Seção: Mapa do Brasil */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Mapa Interativo */}
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>Mapa de Performance por Estado</span>
                </CardTitle>
                <CardDescription>Distribuição geográfica das vendas e oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mapa SVG Simplificado do Brasil */}
                <div className="relative w-full h-96 bg-slate-50 rounded-lg overflow-hidden">
                  <svg viewBox="0 0 500 400" className="w-full h-full">
                    {/* Contorno simplificado do Brasil */}
                    <path
                      d="M100 50 L400 50 L450 100 L450 300 L400 350 L100 350 L50 300 L50 100 Z"
                      fill="#f1f5f9"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />
                    
                    {/* Estados com dados */}
                    {mapaEstadosData.shareByState.map((estado, index) => {
                      const radius = Math.max(8, Math.min(25, estado.share * 0.8));
                      const positions = {
                        'SP': { cx: 350, cy: 280 },
                        'CE': { cx: 420, cy: 120 },
                        'RN': { cx: 440, cy: 110 },
                        'PR': { cx: 320, cy: 320 },
                        'MG': { cx: 380, cy: 240 },
                        'RJ': { cx: 400, cy: 290 },
                        'BA': { cx: 410, cy: 180 },
                        'RS': { cx: 300, cy: 380 },
                        'SC': { cx: 310, cy: 340 },
                        'GO': { cx: 340, cy: 200 }
                      };
                      
                      const pos = positions[estado.estado] || { cx: 250, cy: 200 };
                      
                      return (
                        <g key={index}>
                          <circle
                            cx={pos.cx}
                            cy={pos.cy}
                            r={radius}
                            fill={estado.color}
                            opacity="0.8"
                            className="hover:opacity-100 transition-opacity cursor-pointer"
                          />
                          <text
                            x={pos.cx}
                            y={pos.cy + 3}
                            textAnchor="middle"
                            className="text-xs font-bold fill-white"
                          >
                            {estado.estado}
                          </text>
                          <text
                            x={pos.cx}
                            y={pos.cy + radius + 15}
                            textAnchor="middle"
                            className="text-xs fill-slate-600"
                          >
                            {estado.share}%
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Legenda */}
                  <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                    <div className="text-xs font-semibold mb-2">Legenda</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                        <span>Líder (>20%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Forte (10-20%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                        <span>Moderado (1-10%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Crítico (menor que 1%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPIs Geográficos */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>KPIs Geográficos</span>
                </CardTitle>
                <CardDescription>Métricas de cobertura nacional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {mapaEstadosData.kpisGeograficos.coberturaNacional}
                    </div>
                    <div className="text-xs text-slate-600">Cobertura Nacional</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {mapaEstadosData.kpisGeograficos.concentracaoTop3}
                    </div>
                    <div className="text-xs text-slate-600">Concentração Top 3</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mapaEstadosData.kpisGeograficos.densidadeMedia}
                    </div>
                    <div className="text-xs text-slate-600">Densidade Média</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {mapaEstadosData.kpisGeograficos.estadosCriticos}
                    </div>
                    <div className="text-xs text-slate-600">Estados Críticos</div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="text-sm font-semibold">Top 5 Estados</div>
                  {mapaEstadosData.shareByState.slice(0, 5).map((estado, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: estado.color }}
                        ></div>
                        <span className="text-sm font-medium">{estado.estado}</span>
                        <Badge variant="outline" className="text-xs">
                          {estado.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{estado.share}%</div>
                        <div className="text-xs text-slate-600">{estado.vendas.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-sm font-semibold text-yellow-800 mb-1">Oportunidade Crítica</div>
                  <div className="text-xs text-yellow-700">
                    Potencial inexplorado: <span className="font-bold">{mapaEstadosData.kpisGeograficos.potencialInexplorado}</span>
                  </div>
                  <div className="text-xs text-yellow-700">
                    Investimento recomendado: <span className="font-bold">{mapaEstadosData.kpisGeograficos.investimentoRecomendado}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Bases de Dados ScanTech e MTRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* ScanTech Intelligence */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>ScanTech Intelligence</span>
                </CardTitle>
                <CardDescription>Inteligência competitiva e market share</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {scanTechMetrics.marketShare.current}%
                    </div>
                    <div className="text-xs text-slate-600">Market Share</div>
                    <div className="text-xs text-green-600 font-medium">
                      {scanTechMetrics.marketShare.trend}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      #{scanTechMetrics.marketShare.position}
                    </div>
                    <div className="text-xs text-slate-600">Posição Geral</div>
                    <div className="text-xs text-blue-600 font-medium">Líder</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Ameaças Competitivas</div>
                  {scanTechMetrics.marketShare.threats.map((threat, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">⚠️ {threat}</span>
                      <Badge variant="destructive" className="text-xs">Alta</Badge>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Oportunidades</div>
                  {scanTechMetrics.marketShare.opportunities.map((opp, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-sm text-green-700">💡 {opp}</span>
                      <Badge variant="default" className="text-xs bg-green-600">Média</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Pricing Intelligence</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Premium: <span className="font-bold text-green-600">{scanTechMetrics.pricing.premium}</span></div>
                    <div>Gap: <span className="font-bold">{scanTechMetrics.pricing.competitiveGap}</span></div>
                    <div>Elasticidade: <span className="font-bold">{scanTechMetrics.pricing.elasticity}</span></div>
                    <div>Guerra Preços: <span className="font-bold text-green-600">Não</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MTRIX Sell-Out */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>MTRIX Sell-Out</span>
                </CardTitle>
                <CardDescription>Performance operacional e distribuição</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {(mtrixMetrics.sellOut.volume / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-slate-600">Volume Total</div>
                    <div className="text-xs text-green-600 font-medium">
                      {mtrixMetrics.sellOut.growth}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mtrixMetrics.sellOut.density}
                    </div>
                    <div className="text-xs text-slate-600">Densidade Média</div>
                    <div className="text-xs text-green-600 font-medium">unid/transação</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Estados Críticos</div>
                  {mtrixMetrics.geographic.criticalStates.map((state, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">🚨 {state}</span>
                      <Badge variant="destructive" className="text-xs">Ação Urgente</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Top Performer</div>
                  <div className="text-lg font-bold text-blue-600">{mtrixMetrics.geographic.topPerformer}</div>
                  <div className="text-xs text-slate-600">Melhor densidade e cobertura</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Métricas Operacionais</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Ticket Médio: <span className="font-bold">{mtrixMetrics.operational.avgTicket}</span></div>
                    <div>Giro Estoque: <span className="font-bold">{mtrixMetrics.operational.stockTurnover}</span></div>
                    <div>Ruptura: <span className="font-bold text-red-600">{mtrixMetrics.operational.rupture}</span></div>
                    <div>Share Gôndola: <span className="font-bold text-green-600">{mtrixMetrics.operational.shelfShare}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Alertas Cross-Base */}
          <Card className="border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Alertas Integrados ScanTech + MTRIX</span>
              </CardTitle>
              <CardDescription>Monitoramento cross-base em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {crossBaseAlerts.map((alert, index) => {
                  const getAlertColor = (type) => {
                    switch(type) {
                      case 'critical': return 'bg-red-50 border-red-200 text-red-800'
                      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
                      case 'success': return 'bg-green-50 border-green-200 text-green-800'
                      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800'
                      default: return 'bg-gray-50 border-gray-200 text-gray-800'
                    }
                  }

                  const getAlertIcon = (type) => {
                    switch(type) {
                      case 'critical': return '🔴'
                      case 'warning': return '🟡'
                      case 'success': return '🟢'
                      case 'info': return '🔵'
                      default: return '⚪'
                    }
                  }

                  return (
                    <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span>{getAlertIcon(alert.type)}</span>
                            <span className="text-sm font-semibold">{alert.source}</span>
                            <Badge variant="outline" className="text-xs">
                              {alert.priority}
                            </Badge>
                          </div>
                          <div className="text-sm mb-1">{alert.message}</div>
                          <div className="text-xs opacity-75">💡 {alert.action}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
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

          {/* Nova Seção: Mapa do Brasil */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Mapa Interativo */}
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>Mapa de Performance por Estado</span>
                </CardTitle>
                <CardDescription>Distribuição geográfica das vendas e oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mapa SVG Simplificado do Brasil */}
                <div className="relative w-full h-96 bg-slate-50 rounded-lg overflow-hidden">
                  <svg viewBox="0 0 500 400" className="w-full h-full">
                    {/* Contorno simplificado do Brasil */}
                    <path
                      d="M100 50 L400 50 L450 100 L450 300 L400 350 L100 350 L50 300 L50 100 Z"
                      fill="#f1f5f9"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />
                    
                    {/* Estados com dados */}
                    {mapaEstadosData.shareByState.map((estado, index) => {
                      const radius = Math.max(8, Math.min(25, estado.share * 0.8));
                      const positions = {
                        'SP': { cx: 350, cy: 280 },
                        'CE': { cx: 420, cy: 120 },
                        'RN': { cx: 440, cy: 110 },
                        'PR': { cx: 320, cy: 320 },
                        'MG': { cx: 380, cy: 240 },
                        'RJ': { cx: 400, cy: 290 },
                        'BA': { cx: 410, cy: 180 },
                        'RS': { cx: 300, cy: 380 },
                        'SC': { cx: 310, cy: 340 },
                        'GO': { cx: 340, cy: 200 }
                      };
                      
                      const pos = positions[estado.estado] || { cx: 250, cy: 200 };
                      
                      return (
                        <g key={index}>
                          <circle
                            cx={pos.cx}
                            cy={pos.cy}
                            r={radius}
                            fill={estado.color}
                            opacity="0.8"
                            className="hover:opacity-100 transition-opacity cursor-pointer"
                          />
                          <text
                            x={pos.cx}
                            y={pos.cy + 3}
                            textAnchor="middle"
                            className="text-xs font-bold fill-white"
                          >
                            {estado.estado}
                          </text>
                          <text
                            x={pos.cx}
                            y={pos.cy + radius + 15}
                            textAnchor="middle"
                            className="text-xs fill-slate-600"
                          >
                            {estado.share}%
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Legenda */}
                  <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                    <div className="text-xs font-semibold mb-2">Legenda</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                        <span>Líder (>20%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Forte (10-20%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                        <span>Moderado (1-10%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Crítico (menor que 1%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPIs Geográficos */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>KPIs Geográficos</span>
                </CardTitle>
                <CardDescription>Métricas de cobertura nacional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {mapaEstadosData.kpisGeograficos.coberturaNacional}
                    </div>
                    <div className="text-xs text-slate-600">Cobertura Nacional</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {mapaEstadosData.kpisGeograficos.concentracaoTop3}
                    </div>
                    <div className="text-xs text-slate-600">Concentração Top 3</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mapaEstadosData.kpisGeograficos.densidadeMedia}
                    </div>
                    <div className="text-xs text-slate-600">Densidade Média</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {mapaEstadosData.kpisGeograficos.estadosCriticos}
                    </div>
                    <div className="text-xs text-slate-600">Estados Críticos</div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="text-sm font-semibold">Top 5 Estados</div>
                  {mapaEstadosData.shareByState.slice(0, 5).map((estado, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: estado.color }}
                        ></div>
                        <span className="text-sm font-medium">{estado.estado}</span>
                        <Badge variant="outline" className="text-xs">
                          {estado.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{estado.share}%</div>
                        <div className="text-xs text-slate-600">{estado.vendas.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-sm font-semibold text-yellow-800 mb-1">Oportunidade Crítica</div>
                  <div className="text-xs text-yellow-700">
                    Potencial inexplorado: <span className="font-bold">{mapaEstadosData.kpisGeograficos.potencialInexplorado}</span>
                  </div>
                  <div className="text-xs text-yellow-700">
                    Investimento recomendado: <span className="font-bold">{mapaEstadosData.kpisGeograficos.investimentoRecomendado}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Bases de Dados ScanTech e MTRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* ScanTech Intelligence */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>ScanTech Intelligence</span>
                </CardTitle>
                <CardDescription>Inteligência competitiva e market share</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {scanTechMetrics.marketShare.current}%
                    </div>
                    <div className="text-xs text-slate-600">Market Share</div>
                    <div className="text-xs text-green-600 font-medium">
                      {scanTechMetrics.marketShare.trend}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      #{scanTechMetrics.marketShare.position}
                    </div>
                    <div className="text-xs text-slate-600">Posição Geral</div>
                    <div className="text-xs text-blue-600 font-medium">Líder</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Ameaças Competitivas</div>
                  {scanTechMetrics.marketShare.threats.map((threat, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">⚠️ {threat}</span>
                      <Badge variant="destructive" className="text-xs">Alta</Badge>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Oportunidades</div>
                  {scanTechMetrics.marketShare.opportunities.map((opp, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-sm text-green-700">💡 {opp}</span>
                      <Badge variant="default" className="text-xs bg-green-600">Média</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Pricing Intelligence</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Premium: <span className="font-bold text-green-600">{scanTechMetrics.pricing.premium}</span></div>
                    <div>Gap: <span className="font-bold">{scanTechMetrics.pricing.competitiveGap}</span></div>
                    <div>Elasticidade: <span className="font-bold">{scanTechMetrics.pricing.elasticity}</span></div>
                    <div>Guerra Preços: <span className="font-bold text-green-600">Não</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MTRIX Sell-Out */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>MTRIX Sell-Out</span>
                </CardTitle>
                <CardDescription>Performance operacional e distribuição</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {(mtrixMetrics.sellOut.volume / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-slate-600">Volume Total</div>
                    <div className="text-xs text-green-600 font-medium">
                      {mtrixMetrics.sellOut.growth}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mtrixMetrics.sellOut.density}
                    </div>
                    <div className="text-xs text-slate-600">Densidade Média</div>
                    <div className="text-xs text-green-600 font-medium">unid/transação</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Estados Críticos</div>
                  {mtrixMetrics.geographic.criticalStates.map((state, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">🚨 {state}</span>
                      <Badge variant="destructive" className="text-xs">Ação Urgente</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Top Performer</div>
                  <div className="text-lg font-bold text-blue-600">{mtrixMetrics.geographic.topPerformer}</div>
                  <div className="text-xs text-slate-600">Melhor densidade e cobertura</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Métricas Operacionais</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Ticket Médio: <span className="font-bold">{mtrixMetrics.operational.avgTicket}</span></div>
                    <div>Giro Estoque: <span className="font-bold">{mtrixMetrics.operational.stockTurnover}</span></div>
                    <div>Ruptura: <span className="font-bold text-red-600">{mtrixMetrics.operational.rupture}</span></div>
                    <div>Share Gôndola: <span className="font-bold text-green-600">{mtrixMetrics.operational.shelfShare}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Alertas Cross-Base */}
          <Card className="border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Alertas Integrados ScanTech + MTRIX</span>
              </CardTitle>
              <CardDescription>Monitoramento cross-base em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {crossBaseAlerts.map((alert, index) => {
                  const getAlertColor = (type) => {
                    switch(type) {
                      case 'critical': return 'bg-red-50 border-red-200 text-red-800'
                      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
                      case 'success': return 'bg-green-50 border-green-200 text-green-800'
                      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800'
                      default: return 'bg-gray-50 border-gray-200 text-gray-800'
                    }
                  }

                  const getAlertIcon = (type) => {
                    switch(type) {
                      case 'critical': return '🔴'
                      case 'warning': return '🟡'
                      case 'success': return '🟢'
                      case 'info': return '🔵'
                      default: return '⚪'
                    }
                  }

                  return (
                    <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span>{getAlertIcon(alert.type)}</span>
                            <span className="text-sm font-semibold">{alert.source}</span>
                            <Badge variant="outline" className="text-xs">
                              {alert.priority}
                            </Badge>
                          </div>
                          <div className="text-sm mb-1">{alert.message}</div>
                          <div className="text-xs opacity-75">💡 {alert.action}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
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

          {/* Nova Seção: Mapa do Brasil */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Mapa Interativo */}
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>Mapa de Performance por Estado</span>
                </CardTitle>
                <CardDescription>Distribuição geográfica das vendas e oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mapa SVG Simplificado do Brasil */}
                <div className="relative w-full h-96 bg-slate-50 rounded-lg overflow-hidden">
                  <svg viewBox="0 0 500 400" className="w-full h-full">
                    {/* Contorno simplificado do Brasil */}
                    <path
                      d="M100 50 L400 50 L450 100 L450 300 L400 350 L100 350 L50 300 L50 100 Z"
                      fill="#f1f5f9"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />
                    
                    {/* Estados com dados */}
                    {mapaEstadosData.shareByState.map((estado, index) => {
                      const radius = Math.max(8, Math.min(25, estado.share * 0.8));
                      const positions = {
                        'SP': { cx: 350, cy: 280 },
                        'CE': { cx: 420, cy: 120 },
                        'RN': { cx: 440, cy: 110 },
                        'PR': { cx: 320, cy: 320 },
                        'MG': { cx: 380, cy: 240 },
                        'RJ': { cx: 400, cy: 290 },
                        'BA': { cx: 410, cy: 180 },
                        'RS': { cx: 300, cy: 380 },
                        'SC': { cx: 310, cy: 340 },
                        'GO': { cx: 340, cy: 200 }
                      };
                      
                      const pos = positions[estado.estado] || { cx: 250, cy: 200 };
                      
                      return (
                        <g key={index}>
                          <circle
                            cx={pos.cx}
                            cy={pos.cy}
                            r={radius}
                            fill={estado.color}
                            opacity="0.8"
                            className="hover:opacity-100 transition-opacity cursor-pointer"
                          />
                          <text
                            x={pos.cx}
                            y={pos.cy + 3}
                            textAnchor="middle"
                            className="text-xs font-bold fill-white"
                          >
                            {estado.estado}
                          </text>
                          <text
                            x={pos.cx}
                            y={pos.cy + radius + 15}
                            textAnchor="middle"
                            className="text-xs fill-slate-600"
                          >
                            {estado.share}%
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Legenda */}
                  <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                    <div className="text-xs font-semibold mb-2">Legenda</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                        <span>Líder (>20%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Forte (10-20%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                        <span>Moderado (1-10%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Crítico (menor que 1%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPIs Geográficos */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>KPIs Geográficos</span>
                </CardTitle>
                <CardDescription>Métricas de cobertura nacional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {mapaEstadosData.kpisGeograficos.coberturaNacional}
                    </div>
                    <div className="text-xs text-slate-600">Cobertura Nacional</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {mapaEstadosData.kpisGeograficos.concentracaoTop3}
                    </div>
                    <div className="text-xs text-slate-600">Concentração Top 3</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mapaEstadosData.kpisGeograficos.densidadeMedia}
                    </div>
                    <div className="text-xs text-slate-600">Densidade Média</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {mapaEstadosData.kpisGeograficos.estadosCriticos}
                    </div>
                    <div className="text-xs text-slate-600">Estados Críticos</div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="text-sm font-semibold">Top 5 Estados</div>
                  {mapaEstadosData.shareByState.slice(0, 5).map((estado, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: estado.color }}
                        ></div>
                        <span className="text-sm font-medium">{estado.estado}</span>
                        <Badge variant="outline" className="text-xs">
                          {estado.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{estado.share}%</div>
                        <div className="text-xs text-slate-600">{estado.vendas.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-sm font-semibold text-yellow-800 mb-1">Oportunidade Crítica</div>
                  <div className="text-xs text-yellow-700">
                    Potencial inexplorado: <span className="font-bold">{mapaEstadosData.kpisGeograficos.potencialInexplorado}</span>
                  </div>
                  <div className="text-xs text-yellow-700">
                    Investimento recomendado: <span className="font-bold">{mapaEstadosData.kpisGeograficos.investimentoRecomendado}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Bases de Dados ScanTech e MTRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* ScanTech Intelligence */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>ScanTech Intelligence</span>
                </CardTitle>
                <CardDescription>Inteligência competitiva e market share</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {scanTechMetrics.marketShare.current}%
                    </div>
                    <div className="text-xs text-slate-600">Market Share</div>
                    <div className="text-xs text-green-600 font-medium">
                      {scanTechMetrics.marketShare.trend}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      #{scanTechMetrics.marketShare.position}
                    </div>
                    <div className="text-xs text-slate-600">Posição Geral</div>
                    <div className="text-xs text-blue-600 font-medium">Líder</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Ameaças Competitivas</div>
                  {scanTechMetrics.marketShare.threats.map((threat, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">⚠️ {threat}</span>
                      <Badge variant="destructive" className="text-xs">Alta</Badge>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Oportunidades</div>
                  {scanTechMetrics.marketShare.opportunities.map((opp, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-sm text-green-700">💡 {opp}</span>
                      <Badge variant="default" className="text-xs bg-green-600">Média</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Pricing Intelligence</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Premium: <span className="font-bold text-green-600">{scanTechMetrics.pricing.premium}</span></div>
                    <div>Gap: <span className="font-bold">{scanTechMetrics.pricing.competitiveGap}</span></div>
                    <div>Elasticidade: <span className="font-bold">{scanTechMetrics.pricing.elasticity}</span></div>
                    <div>Guerra Preços: <span className="font-bold text-green-600">Não</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MTRIX Sell-Out */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>MTRIX Sell-Out</span>
                </CardTitle>
                <CardDescription>Performance operacional e distribuição</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {(mtrixMetrics.sellOut.volume / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-slate-600">Volume Total</div>
                    <div className="text-xs text-green-600 font-medium">
                      {mtrixMetrics.sellOut.growth}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mtrixMetrics.sellOut.density}
                    </div>
                    <div className="text-xs text-slate-600">Densidade Média</div>
                    <div className="text-xs text-green-600 font-medium">unid/transação</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Estados Críticos</div>
                  {mtrixMetrics.geographic.criticalStates.map((state, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">🚨 {state}</span>
                      <Badge variant="destructive" className="text-xs">Ação Urgente</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Top Performer</div>
                  <div className="text-lg font-bold text-blue-600">{mtrixMetrics.geographic.topPerformer}</div>
                  <div className="text-xs text-slate-600">Melhor densidade e cobertura</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Métricas Operacionais</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Ticket Médio: <span className="font-bold">{mtrixMetrics.operational.avgTicket}</span></div>
                    <div>Giro Estoque: <span className="font-bold">{mtrixMetrics.operational.stockTurnover}</span></div>
                    <div>Ruptura: <span className="font-bold text-red-600">{mtrixMetrics.operational.rupture}</span></div>
                    <div>Share Gôndola: <span className="font-bold text-green-600">{mtrixMetrics.operational.shelfShare}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Alertas Cross-Base */}
          <Card className="border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Alertas Integrados ScanTech + MTRIX</span>
              </CardTitle>
              <CardDescription>Monitoramento cross-base em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {crossBaseAlerts.map((alert, index) => {
                  const getAlertColor = (type) => {
                    switch(type) {
                      case 'critical': return 'bg-red-50 border-red-200 text-red-800'
                      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
                      case 'success': return 'bg-green-50 border-green-200 text-green-800'
                      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800'
                      default: return 'bg-gray-50 border-gray-200 text-gray-800'
                    }
                  }

                  const getAlertIcon = (type) => {
                    switch(type) {
                      case 'critical': return '🔴'
                      case 'warning': return '🟡'
                      case 'success': return '🟢'
                      case 'info': return '🔵'
                      default: return '⚪'
                    }
                  }

                  return (
                    <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span>{getAlertIcon(alert.type)}</span>
                            <span className="text-sm font-semibold">{alert.source}</span>
                            <Badge variant="outline" className="text-xs">
                              {alert.priority}
                            </Badge>
                          </div>
                          <div className="text-sm mb-1">{alert.message}</div>
                          <div className="text-xs opacity-75">💡 {alert.action}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estados" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ranking de Estados */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Top 5 Estados por Performance</span>
                </CardTitle>
                <CardDescription>Análise de vendas e eficiência por estado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-900">🥇 São Paulo</h4>
                    <Badge className="bg-green-100 text-green-800">26.9%</Badge>
                  </div>
                  <p className="text-sm text-blue-800 mb-2">Líder em eficiência: 85.4 unidades/transação</p>
                  <div className="flex justify-between text-xs text-blue-700">
                    <span>Volume: Alto</span>
                    <span>Densidade: Excelente</span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-900">🥈 Ceará</h4>
                    <Badge className="bg-blue-100 text-blue-800">26.5%</Badge>
                  </div>
                  <p className="text-sm text-green-800 mb-2">Alto volume, densidade para otimizar: 37.2 unid/transação</p>
                  <div className="flex justify-between text-xs text-green-700">
                    <span>Volume: Muito Alto</span>
                    <span>Densidade: Média</span>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-yellow-900">🥉 Rio Grande do Norte</h4>
                    <Badge className="bg-yellow-100 text-yellow-800">26.4%</Badge>
                  </div>
                  <p className="text-sm text-yellow-800 mb-2">Volume alto, eficiência para melhorar: 31.8 unid/transação</p>
                  <div className="flex justify-between text-xs text-yellow-700">
                    <span>Volume: Alto</span>
                    <span>Densidade: Baixa</span>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-purple-900">4º Paraná</h4>
                    <Badge className="bg-purple-100 text-purple-800">15.9%</Badge>
                  </div>
                  <p className="text-sm text-purple-800 mb-2">Performance equilibrada: 45.2 unid/transação</p>
                  <div className="flex justify-between text-xs text-purple-700">
                    <span>Volume: Médio</span>
                    <span>Densidade: Boa</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">5º Minas Gerais</h4>
                    <Badge className="bg-slate-100 text-slate-800">4.2%</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Potencial subutilizado: 28.5 unid/transação</p>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Volume: Baixo</span>
                    <span>Densidade: Baixa</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Oportunidades Críticas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-red-600" />
                  <span>Oportunidades Críticas</span>
                </CardTitle>
                <CardDescription>Estados com maior potencial de crescimento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-red-900">🚨 Rio de Janeiro</h4>
                    <Badge className="bg-red-100 text-red-800">CRÍTICO</Badge>
                  </div>
                  <p className="text-sm text-red-800 mb-2">Apenas 189 unidades em mercado de 17M habitantes</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-red-700">
                    <span>Densidade: 6.8 unid/transação</span>
                    <span>Potencial: 1.000% crescimento</span>
                    <span>Investimento: R$ 500K</span>
                    <span>ROI Projetado: 300%</span>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-orange-900">⚠️ Bahia</h4>
                    <Badge className="bg-orange-100 text-orange-800">ALTA</Badge>
                  </div>
                  <p className="text-sm text-orange-800 mb-2">Mercado de 15M habitantes subexplorado</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-orange-700">
                    <span>População: 15M</span>
                    <span>Potencial: 400% crescimento</span>
                    <span>Investimento: R$ 300K</span>
                    <span>ROI Projetado: 180%</span>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-yellow-900">💡 Rio Grande do Sul</h4>
                    <Badge className="bg-yellow-100 text-yellow-800">MÉDIA</Badge>
                  </div>
                  <p className="text-sm text-yellow-800 mb-2">Mercado maduro com potencial de otimização</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-yellow-700">
                    <span>População: 11M</span>
                    <span>Potencial: 150% crescimento</span>
                    <span>Investimento: R$ 200K</span>
                    <span>ROI Projetado: 120%</span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-900">✅ Otimização Nordeste</h4>
                    <Badge className="bg-green-100 text-green-800">EFICIÊNCIA</Badge>
                  </div>
                  <p className="text-sm text-green-800 mb-2">Melhorar densidade em CE e RN</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                    <span>Foco: Densidade</span>
                    <span>Potencial: +25% eficiência</span>
                    <span>Investimento: R$ 150K</span>
                    <span>ROI Projetado: 200%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estratégias Regionais */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Estratégias por Região</span>
              </CardTitle>
              <CardDescription>Planos de ação específicos por região geográfica</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">🏙️ Sudeste</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>SP:</strong> Manter liderança, focar produtos premium</p>
                    <p><strong>RJ:</strong> Operação resgate urgente - R$ 500K investimento</p>
                    <p><strong>MG:</strong> Expansão gradual via distribuidores</p>
                    <p><strong>ES:</strong> Mercado emergente para monitorar</p>
                  </div>
                  <div className="mt-3 text-xs text-blue-600">
                    <span>Investimento Total: R$ 800K</span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">🌴 Nordeste</h4>
                  <div className="space-y-2 text-sm text-green-800">
                    <p><strong>CE/RN:</strong> Otimizar densidade de vendas</p>
                    <p><strong>BA:</strong> Expansão prioritária - mercado 15M</p>
                    <p><strong>PE:</strong> Potencial médio para desenvolvimento</p>
                    <p><strong>Outros:</strong> Monitoramento e oportunidades</p>
                  </div>
                  <div className="mt-3 text-xs text-green-600">
                    <span>Investimento Total: R$ 450K</span>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">🌾 Sul</h4>
                  <div className="space-y-2 text-sm text-purple-800">
                    <p><strong>PR:</strong> Manter performance atual</p>
                    <p><strong>RS:</strong> Expansão com foco em eficiência</p>
                    <p><strong>SC:</strong> Mercado emergente promissor</p>
                    <p><strong>Estratégia:</strong> Crescimento sustentável</p>
                  </div>
                  <div className="mt-3 text-xs text-purple-600">
                    <span>Investimento Total: R$ 300K</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métricas Geográficas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">27</div>
                <p className="text-sm opacity-90">Estados ativos</p>
                <p className="text-xs opacity-80">Cobertura nacional</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">97.6%</div>
                <p className="text-sm opacity-90">Top 5 Estados</p>
                <p className="text-xs opacity-80">Concentração vendas</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">1.000%</div>
                <p className="text-sm opacity-90">Potencial RJ</p>
                <p className="text-xs opacity-80">Maior oportunidade</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">R$ 1.5M</div>
                <p className="text-sm opacity-90">Investimento total</p>
                <p className="text-xs opacity-80">Expansão geográfica</p>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Share por Categoria de Barras */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Share por Categoria</span>
                </CardTitle>
                <CardDescription>Posição competitiva por tipo de barra</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoriaBarrasData.shareByCategory.map((categoria, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: categoria.color }}
                        ></div>
                        <span className="font-medium text-sm">{categoria.categoria}</span>
                        <Badge variant="outline" className="text-xs">
                          {categoria.marketSize}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg" style={{ color: categoria.color }}>
                          {categoria.nutrimentalShare}%
                        </div>
                        <div className="text-xs text-slate-600">{categoria.growth}</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300" 
                        style={{ 
                          backgroundColor: categoria.color, 
                          width: `${categoria.nutrimentalShare}%` 
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-500">
                      Posição: #{categoria.principais_concorrentes.find(c => c.nome === 'Nutry')?.posicao || 'N/A'} | 
                      Líder: {categoria.principais_concorrentes[0]?.nome} ({categoria.principais_concorrentes[0]?.share}%)
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Nova Seção: Análise de Preços */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span>Posicionamento de Preços</span>
                </CardTitle>
                <CardDescription>Nutry vs. média do mercado por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoriaBarrasData.priceAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="categoria" 
                      tick={{ fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      label={{ value: 'Preço (R$)', angle: -90, position: 'insideLeft' }}
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `R$ ${value.toFixed(2)}`, 
                        name === 'nutryPrice' ? 'Nutry' : 'Média Mercado'
                      ]}
                    />
                    <Bar dataKey="marketAverage" fill="#94a3b8" name="Média Mercado" />
                    <Bar dataKey="nutryPrice" fill="#3b82f6" name="Nutry" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoriaBarrasData.priceAnalysis.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="font-medium">{item.categoria}:</span>
                      <span className={`font-bold ${item.premium.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {item.premium} vs. mercado
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Matriz Competitiva */}
          <Card className="border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Principais Concorrentes por Categoria</span>
              </CardTitle>
              <CardDescription>Ranking competitivo detalhado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoriaBarrasData.shareByCategory.map((categoria, catIndex) => (
                  <div key={catIndex} className="space-y-3">
                    <div className="text-center">
                      <h4 className="font-semibold text-sm" style={{ color: categoria.color }}>
                        {categoria.categoria}
                      </h4>
                      <p className="text-xs text-slate-600">{categoria.marketSize}</p>
                    </div>
                    <div className="space-y-2">
                      {categoria.principais_concorrentes.map((concorrente, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                            concorrente.nome === 'Nutry' 
                              ? 'bg-blue-50 border border-blue-200' 
                              : 'bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-400">#{concorrente.posicao}</span>
                            <span className={`font-medium ${concorrente.nome === 'Nutry' ? 'text-blue-700' : ''}`}>
                              {concorrente.nome}
                            </span>
                          </div>
                          <span className="font-bold">{concorrente.share}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nova Seção: Mapa do Brasil */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Mapa Interativo */}
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>Mapa de Performance por Estado</span>
                </CardTitle>
                <CardDescription>Distribuição geográfica das vendas e oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mapa SVG Simplificado do Brasil */}
                <div className="relative w-full h-96 bg-slate-50 rounded-lg overflow-hidden">
                  <svg viewBox="0 0 500 400" className="w-full h-full">
                    {/* Contorno simplificado do Brasil */}
                    <path
                      d="M100 50 L400 50 L450 100 L450 300 L400 350 L100 350 L50 300 L50 100 Z"
                      fill="#f1f5f9"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />
                    
                    {/* Estados com dados */}
                    {mapaEstadosData.shareByState.map((estado, index) => {
                      const radius = Math.max(8, Math.min(25, estado.share * 0.8));
                      const positions = {
                        'SP': { cx: 350, cy: 280 },
                        'CE': { cx: 420, cy: 120 },
                        'RN': { cx: 440, cy: 110 },
                        'PR': { cx: 320, cy: 320 },
                        'MG': { cx: 380, cy: 240 },
                        'RJ': { cx: 400, cy: 290 },
                        'BA': { cx: 410, cy: 180 },
                        'RS': { cx: 300, cy: 380 },
                        'SC': { cx: 310, cy: 340 },
                        'GO': { cx: 340, cy: 200 }
                      };
                      
                      const pos = positions[estado.estado] || { cx: 250, cy: 200 };
                      
                      return (
                        <g key={index}>
                          <circle
                            cx={pos.cx}
                            cy={pos.cy}
                            r={radius}
                            fill={estado.color}
                            opacity="0.8"
                            className="hover:opacity-100 transition-opacity cursor-pointer"
                          />
                          <text
                            x={pos.cx}
                            y={pos.cy + 3}
                            textAnchor="middle"
                            className="text-xs font-bold fill-white"
                          >
                            {estado.estado}
                          </text>
                          <text
                            x={pos.cx}
                            y={pos.cy + radius + 15}
                            textAnchor="middle"
                            className="text-xs fill-slate-600"
                          >
                            {estado.share}%
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Legenda */}
                  <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                    <div className="text-xs font-semibold mb-2">Legenda</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                        <span>Líder (>20%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Forte (10-20%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                        <span>Moderado (1-10%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Crítico (menor que 1%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPIs Geográficos */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>KPIs Geográficos</span>
                </CardTitle>
                <CardDescription>Métricas de cobertura nacional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {mapaEstadosData.kpisGeograficos.coberturaNacional}
                    </div>
                    <div className="text-xs text-slate-600">Cobertura Nacional</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {mapaEstadosData.kpisGeograficos.concentracaoTop3}
                    </div>
                    <div className="text-xs text-slate-600">Concentração Top 3</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mapaEstadosData.kpisGeograficos.densidadeMedia}
                    </div>
                    <div className="text-xs text-slate-600">Densidade Média</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {mapaEstadosData.kpisGeograficos.estadosCriticos}
                    </div>
                    <div className="text-xs text-slate-600">Estados Críticos</div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="text-sm font-semibold">Top 5 Estados</div>
                  {mapaEstadosData.shareByState.slice(0, 5).map((estado, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: estado.color }}
                        ></div>
                        <span className="text-sm font-medium">{estado.estado}</span>
                        <Badge variant="outline" className="text-xs">
                          {estado.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{estado.share}%</div>
                        <div className="text-xs text-slate-600">{estado.vendas.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-sm font-semibold text-yellow-800 mb-1">Oportunidade Crítica</div>
                  <div className="text-xs text-yellow-700">
                    Potencial inexplorado: <span className="font-bold">{mapaEstadosData.kpisGeograficos.potencialInexplorado}</span>
                  </div>
                  <div className="text-xs text-yellow-700">
                    Investimento recomendado: <span className="font-bold">{mapaEstadosData.kpisGeograficos.investimentoRecomendado}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Bases de Dados ScanTech e MTRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* ScanTech Intelligence */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>ScanTech Intelligence</span>
                </CardTitle>
                <CardDescription>Inteligência competitiva e market share</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {scanTechMetrics.marketShare.current}%
                    </div>
                    <div className="text-xs text-slate-600">Market Share</div>
                    <div className="text-xs text-green-600 font-medium">
                      {scanTechMetrics.marketShare.trend}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      #{scanTechMetrics.marketShare.position}
                    </div>
                    <div className="text-xs text-slate-600">Posição Geral</div>
                    <div className="text-xs text-blue-600 font-medium">Líder</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Ameaças Competitivas</div>
                  {scanTechMetrics.marketShare.threats.map((threat, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">⚠️ {threat}</span>
                      <Badge variant="destructive" className="text-xs">Alta</Badge>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Oportunidades</div>
                  {scanTechMetrics.marketShare.opportunities.map((opp, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-sm text-green-700">💡 {opp}</span>
                      <Badge variant="default" className="text-xs bg-green-600">Média</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Pricing Intelligence</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Premium: <span className="font-bold text-green-600">{scanTechMetrics.pricing.premium}</span></div>
                    <div>Gap: <span className="font-bold">{scanTechMetrics.pricing.competitiveGap}</span></div>
                    <div>Elasticidade: <span className="font-bold">{scanTechMetrics.pricing.elasticity}</span></div>
                    <div>Guerra Preços: <span className="font-bold text-green-600">Não</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MTRIX Sell-Out */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>MTRIX Sell-Out</span>
                </CardTitle>
                <CardDescription>Performance operacional e distribuição</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {(mtrixMetrics.sellOut.volume / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-slate-600">Volume Total</div>
                    <div className="text-xs text-green-600 font-medium">
                      {mtrixMetrics.sellOut.growth}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mtrixMetrics.sellOut.density}
                    </div>
                    <div className="text-xs text-slate-600">Densidade Média</div>
                    <div className="text-xs text-green-600 font-medium">unid/transação</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Estados Críticos</div>
                  {mtrixMetrics.geographic.criticalStates.map((state, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">🚨 {state}</span>
                      <Badge variant="destructive" className="text-xs">Ação Urgente</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Top Performer</div>
                  <div className="text-lg font-bold text-blue-600">{mtrixMetrics.geographic.topPerformer}</div>
                  <div className="text-xs text-slate-600">Melhor densidade e cobertura</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Métricas Operacionais</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Ticket Médio: <span className="font-bold">{mtrixMetrics.operational.avgTicket}</span></div>
                    <div>Giro Estoque: <span className="font-bold">{mtrixMetrics.operational.stockTurnover}</span></div>
                    <div>Ruptura: <span className="font-bold text-red-600">{mtrixMetrics.operational.rupture}</span></div>
                    <div>Share Gôndola: <span className="font-bold text-green-600">{mtrixMetrics.operational.shelfShare}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Alertas Cross-Base */}
          <Card className="border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Alertas Integrados ScanTech + MTRIX</span>
              </CardTitle>
              <CardDescription>Monitoramento cross-base em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {crossBaseAlerts.map((alert, index) => {
                  const getAlertColor = (type) => {
                    switch(type) {
                      case 'critical': return 'bg-red-50 border-red-200 text-red-800'
                      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
                      case 'success': return 'bg-green-50 border-green-200 text-green-800'
                      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800'
                      default: return 'bg-gray-50 border-gray-200 text-gray-800'
                    }
                  }

                  const getAlertIcon = (type) => {
                    switch(type) {
                      case 'critical': return '🔴'
                      case 'warning': return '🟡'
                      case 'success': return '🟢'
                      case 'info': return '🔵'
                      default: return '⚪'
                    }
                  }

                  return (
                    <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span>{getAlertIcon(alert.type)}</span>
                            <span className="text-sm font-semibold">{alert.source}</span>
                            <Badge variant="outline" className="text-xs">
                              {alert.priority}
                            </Badge>
                          </div>
                          <div className="text-sm mb-1">{alert.message}</div>
                          <div className="text-xs opacity-75">💡 {alert.action}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inovacoes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tendências Globais */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>Tendências Globais 2025</span>
                </CardTitle>
                <CardDescription>Oportunidades de inovação baseadas em análises de mercado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-900">🔬 Miniaturização Inteligente</h4>
                    <Badge className="bg-green-100 text-green-800">12-15% CAGR</Badge>
                  </div>
                  <p className="text-sm text-blue-800 mb-2">Mini barras (15-25g) com alta densidade nutricional</p>
                  <div className="flex justify-between text-xs text-blue-700">
                    <span>Potencial: R$ 45-60M</span>
                    <span>Prazo: 6-12 meses</span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-900">🌿 Ingredientes Amazônicos</h4>
                    <Badge className="bg-blue-100 text-blue-800">8-12% CAGR</Badge>
                  </div>
                  <p className="text-sm text-green-800 mb-2">Superfrutos regionais brasileiros únicos</p>
                  <div className="flex justify-between text-xs text-green-700">
                    <span>Potencial: R$ 30-40M</span>
                    <span>Prazo: 3-6 meses</span>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-purple-900">🌱 Plant-Based Nacional</h4>
                    <Badge className="bg-purple-100 text-purple-800">15-20% CAGR</Badge>
                  </div>
                  <p className="text-sm text-purple-800 mb-2">Proteínas de leguminosas brasileiras</p>
                  <div className="flex justify-between text-xs text-purple-700">
                    <span>Potencial: R$ 35-50M</span>
                    <span>Prazo: 12-18 meses</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Oportunidades Específicas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Oportunidades Nutrimental</span>
                </CardTitle>
                <CardDescription>Projetos de inovação com ROI projetado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">Nutry Mini (18g)</h4>
                    <Badge className="bg-green-100 text-green-800">ROI 180%</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Versão mini dos sabores mais vendidos</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span className="text-slate-500">Investimento: R$ 800K</span>
                    <span className="text-slate-500">Prazo: 6 meses</span>
                    <span className="text-slate-500">Vendas: 2.5M unid/ano</span>
                    <span className="text-slate-500">Preço: R$ 2,50</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">Linha Amazônia</h4>
                    <Badge className="bg-blue-100 text-blue-800">ROI 220%</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Barras premium com superfrutos amazônicos</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span className="text-slate-500">Investimento: R$ 1.2M</span>
                    <span className="text-slate-500">Prazo: 9 meses</span>
                    <span className="text-slate-500">Vendas: 1.8M unid/ano</span>
                    <span className="text-slate-500">Preço: R$ 8,90</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">Nutry Energia+</h4>
                    <Badge className="bg-yellow-100 text-yellow-800">ROI 150%</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Barras funcionais para energia e foco</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span className="text-slate-500">Investimento: R$ 600K</span>
                    <span className="text-slate-500">Prazo: 4 meses</span>
                    <span className="text-slate-500">Vendas: 3.2M unid/ano</span>
                    <span className="text-slate-500">Mercado: Profissionais</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Roadmap de Implementação */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>Roadmap de Inovação</span>
              </CardTitle>
              <CardDescription>Cronograma de implementação das inovações prioritárias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900">Validação e Desenvolvimento</h4>
                    <p className="text-sm text-blue-700">Pesquisa de consumidor, formulações iniciais, testes de conceito</p>
                    <div className="flex justify-between mt-2 text-xs text-blue-600">
                      <span>Prazo: 0-3 meses</span>
                      <span>Investimento: R$ 200K</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-900">Prototipagem e Testes</h4>
                    <p className="text-sm text-green-700">Desenvolvimento de protótipos, testes de shelf-life, validação nutricional</p>
                    <div className="flex justify-between mt-2 text-xs text-green-600">
                      <span>Prazo: 3-6 meses</span>
                      <span>Investimento: R$ 400K</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-purple-900">Produção Piloto e Lançamento</h4>
                    <p className="text-sm text-purple-700">Setup de linha, produção piloto, campanha de marketing, distribuição</p>
                    <div className="flex justify-between mt-2 text-xs text-purple-600">
                      <span>Prazo: 6-12 meses</span>
                      <span>Investimento: R$ 800K</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métricas de Sucesso */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">5M</div>
                <p className="text-sm opacity-90">Unidades/ano meta</p>
                <p className="text-xs opacity-80">Produtos inovadores</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">15%</div>
                <p className="text-sm opacity-90">Market Share</p>
                <p className="text-xs opacity-80">Mercado premium</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">200%</div>
                <p className="text-sm opacity-90">ROI Médio</p>
                <p className="text-xs opacity-80">Inovações</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">4</div>
                <p className="text-sm opacity-90">Lançamentos/ano</p>
                <p className="text-xs opacity-80">Meta 2025</p>
              </CardContent>
            </Card>
          </div>

          {/* Impacto no Crescimento */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Impacto Transformador no Crescimento</span>
              </CardTitle>
              <CardDescription>Comparação: Cenário tradicional vs. cenário com inovações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Cenário Tradicional */}
                <div className="p-6 bg-slate-50 rounded-lg border">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Cenário Tradicional (Sem Inovações)
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Receita 5 anos:</span>
                      <span className="font-semibold text-slate-900">R$ 152M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Market Share:</span>
                      <span className="font-semibold text-slate-900">55%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Crescimento anual:</span>
                      <span className="font-semibold text-slate-900">3-5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">ROI Total:</span>
                      <span className="font-semibold text-slate-900">180%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Mercado endereçável:</span>
                      <span className="font-semibold text-slate-900">R$ 2.5B</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-xs text-yellow-800">⚠️ Risco de commoditização e estagnação</p>
                  </div>
                </div>

                {/* Cenário com Inovações */}
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Cenário com Inovações
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Receita 5 anos:</span>
                      <span className="font-bold text-green-900">R$ 350M</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">+2.3x</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Market Share:</span>
                      <span className="font-bold text-green-900">68%</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">+13%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Crescimento anual:</span>
                      <span className="font-bold text-green-900">15-25%</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">5x</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">ROI Total:</span>
                      <span className="font-bold text-green-900">1.900%</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">10.5x</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Mercado endereçável:</span>
                      <span className="font-bold text-green-900">R$ 3.8B</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">+52%</Badge>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-100 rounded border border-green-300">
                    <p className="text-xs text-green-800">✅ Crescimento exponencial e vantagem competitiva</p>
                  </div>
                </div>
              </div>

              {/* Receita Adicional por Ano */}
              <div className="mt-6">
                <h5 className="font-semibold text-slate-900 mb-3">Receita Adicional com Inovações (5 anos)</h5>
                <div className="grid grid-cols-5 gap-2">
                  <div className="text-center p-3 bg-blue-50 rounded border border-blue-200">
                    <div className="text-lg font-bold text-blue-900">+R$ 15M</div>
                    <div className="text-xs text-blue-700">Ano 1</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded border border-green-200">
                    <div className="text-lg font-bold text-green-900">+R$ 44M</div>
                    <div className="text-xs text-green-700">Ano 2</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded border border-yellow-200">
                    <div className="text-lg font-bold text-yellow-900">+R$ 82M</div>
                    <div className="text-xs text-yellow-700">Ano 3</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded border border-orange-200">
                    <div className="text-lg font-bold text-orange-900">+R$ 135M</div>
                    <div className="text-xs text-orange-700">Ano 4</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded border border-purple-200">
                    <div className="text-lg font-bold text-purple-900">+R$ 198M</div>
                    <div className="text-xs text-purple-700">Ano 5</div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span className="text-sm text-slate-600">Total Adicional: </span>
                  <span className="text-xl font-bold text-green-600">+R$ 474M</span>
                </div>
              </div>

              {/* Multiplicadores de Crescimento */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
                  <div className="text-2xl font-bold">2.3x</div>
                  <div className="text-sm opacity-90">Receita 5 anos</div>
                  <div className="text-xs opacity-80">R$ 350M vs R$ 152M</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
                  <div className="text-2xl font-bold">10.5x</div>
                  <div className="text-sm opacity-90">ROI Superior</div>
                  <div className="text-xs opacity-80">1.900% vs 180%</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg">
                  <div className="text-2xl font-bold">5x</div>
                  <div className="text-sm opacity-90">Velocidade</div>
                  <div className="text-xs opacity-80">25% vs 5% crescimento</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nova Seção: Mapa do Brasil */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Mapa Interativo */}
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>Mapa de Performance por Estado</span>
                </CardTitle>
                <CardDescription>Distribuição geográfica das vendas e oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mapa SVG Simplificado do Brasil */}
                <div className="relative w-full h-96 bg-slate-50 rounded-lg overflow-hidden">
                  <svg viewBox="0 0 500 400" className="w-full h-full">
                    {/* Contorno simplificado do Brasil */}
                    <path
                      d="M100 50 L400 50 L450 100 L450 300 L400 350 L100 350 L50 300 L50 100 Z"
                      fill="#f1f5f9"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />
                    
                    {/* Estados com dados */}
                    {mapaEstadosData.shareByState.map((estado, index) => {
                      const radius = Math.max(8, Math.min(25, estado.share * 0.8));
                      const positions = {
                        'SP': { cx: 350, cy: 280 },
                        'CE': { cx: 420, cy: 120 },
                        'RN': { cx: 440, cy: 110 },
                        'PR': { cx: 320, cy: 320 },
                        'MG': { cx: 380, cy: 240 },
                        'RJ': { cx: 400, cy: 290 },
                        'BA': { cx: 410, cy: 180 },
                        'RS': { cx: 300, cy: 380 },
                        'SC': { cx: 310, cy: 340 },
                        'GO': { cx: 340, cy: 200 }
                      };
                      
                      const pos = positions[estado.estado] || { cx: 250, cy: 200 };
                      
                      return (
                        <g key={index}>
                          <circle
                            cx={pos.cx}
                            cy={pos.cy}
                            r={radius}
                            fill={estado.color}
                            opacity="0.8"
                            className="hover:opacity-100 transition-opacity cursor-pointer"
                          />
                          <text
                            x={pos.cx}
                            y={pos.cy + 3}
                            textAnchor="middle"
                            className="text-xs font-bold fill-white"
                          >
                            {estado.estado}
                          </text>
                          <text
                            x={pos.cx}
                            y={pos.cy + radius + 15}
                            textAnchor="middle"
                            className="text-xs fill-slate-600"
                          >
                            {estado.share}%
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Legenda */}
                  <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                    <div className="text-xs font-semibold mb-2">Legenda</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                        <span>Líder (>20%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Forte (10-20%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                        <span>Moderado (1-10%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Crítico (menor que 1%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPIs Geográficos */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>KPIs Geográficos</span>
                </CardTitle>
                <CardDescription>Métricas de cobertura nacional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {mapaEstadosData.kpisGeograficos.coberturaNacional}
                    </div>
                    <div className="text-xs text-slate-600">Cobertura Nacional</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {mapaEstadosData.kpisGeograficos.concentracaoTop3}
                    </div>
                    <div className="text-xs text-slate-600">Concentração Top 3</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mapaEstadosData.kpisGeograficos.densidadeMedia}
                    </div>
                    <div className="text-xs text-slate-600">Densidade Média</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {mapaEstadosData.kpisGeograficos.estadosCriticos}
                    </div>
                    <div className="text-xs text-slate-600">Estados Críticos</div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="text-sm font-semibold">Top 5 Estados</div>
                  {mapaEstadosData.shareByState.slice(0, 5).map((estado, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: estado.color }}
                        ></div>
                        <span className="text-sm font-medium">{estado.estado}</span>
                        <Badge variant="outline" className="text-xs">
                          {estado.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{estado.share}%</div>
                        <div className="text-xs text-slate-600">{estado.vendas.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-sm font-semibold text-yellow-800 mb-1">Oportunidade Crítica</div>
                  <div className="text-xs text-yellow-700">
                    Potencial inexplorado: <span className="font-bold">{mapaEstadosData.kpisGeograficos.potencialInexplorado}</span>
                  </div>
                  <div className="text-xs text-yellow-700">
                    Investimento recomendado: <span className="font-bold">{mapaEstadosData.kpisGeograficos.investimentoRecomendado}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Bases de Dados ScanTech e MTRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* ScanTech Intelligence */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>ScanTech Intelligence</span>
                </CardTitle>
                <CardDescription>Inteligência competitiva e market share</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {scanTechMetrics.marketShare.current}%
                    </div>
                    <div className="text-xs text-slate-600">Market Share</div>
                    <div className="text-xs text-green-600 font-medium">
                      {scanTechMetrics.marketShare.trend}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      #{scanTechMetrics.marketShare.position}
                    </div>
                    <div className="text-xs text-slate-600">Posição Geral</div>
                    <div className="text-xs text-blue-600 font-medium">Líder</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Ameaças Competitivas</div>
                  {scanTechMetrics.marketShare.threats.map((threat, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">⚠️ {threat}</span>
                      <Badge variant="destructive" className="text-xs">Alta</Badge>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Oportunidades</div>
                  {scanTechMetrics.marketShare.opportunities.map((opp, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-sm text-green-700">💡 {opp}</span>
                      <Badge variant="default" className="text-xs bg-green-600">Média</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Pricing Intelligence</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Premium: <span className="font-bold text-green-600">{scanTechMetrics.pricing.premium}</span></div>
                    <div>Gap: <span className="font-bold">{scanTechMetrics.pricing.competitiveGap}</span></div>
                    <div>Elasticidade: <span className="font-bold">{scanTechMetrics.pricing.elasticity}</span></div>
                    <div>Guerra Preços: <span className="font-bold text-green-600">Não</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MTRIX Sell-Out */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>MTRIX Sell-Out</span>
                </CardTitle>
                <CardDescription>Performance operacional e distribuição</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {(mtrixMetrics.sellOut.volume / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-slate-600">Volume Total</div>
                    <div className="text-xs text-green-600 font-medium">
                      {mtrixMetrics.sellOut.growth}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mtrixMetrics.sellOut.density}
                    </div>
                    <div className="text-xs text-slate-600">Densidade Média</div>
                    <div className="text-xs text-green-600 font-medium">unid/transação</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Estados Críticos</div>
                  {mtrixMetrics.geographic.criticalStates.map((state, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">🚨 {state}</span>
                      <Badge variant="destructive" className="text-xs">Ação Urgente</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Top Performer</div>
                  <div className="text-lg font-bold text-blue-600">{mtrixMetrics.geographic.topPerformer}</div>
                  <div className="text-xs text-slate-600">Melhor densidade e cobertura</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Métricas Operacionais</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Ticket Médio: <span className="font-bold">{mtrixMetrics.operational.avgTicket}</span></div>
                    <div>Giro Estoque: <span className="font-bold">{mtrixMetrics.operational.stockTurnover}</span></div>
                    <div>Ruptura: <span className="font-bold text-red-600">{mtrixMetrics.operational.rupture}</span></div>
                    <div>Share Gôndola: <span className="font-bold text-green-600">{mtrixMetrics.operational.shelfShare}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nova Seção: Alertas Cross-Base */}
          <Card className="border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Alertas Integrados ScanTech + MTRIX</span>
              </CardTitle>
              <CardDescription>Monitoramento cross-base em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {crossBaseAlerts.map((alert, index) => {
                  const getAlertColor = (type) => {
                    switch(type) {
                      case 'critical': return 'bg-red-50 border-red-200 text-red-800'
                      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
                      case 'success': return 'bg-green-50 border-green-200 text-green-800'
                      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800'
                      default: return 'bg-gray-50 border-gray-200 text-gray-800'
                    }
                  }

                  const getAlertIcon = (type) => {
                    switch(type) {
                      case 'critical': return '🔴'
                      case 'warning': return '🟡'
                      case 'success': return '🟢'
                      case 'info': return '🔵'
                      default: return '⚪'
                    }
                  }

                  return (
                    <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span>{getAlertIcon(alert.type)}</span>
                            <span className="text-sm font-semibold">{alert.source}</span>
                            <Badge variant="outline" className="text-xs">
                              {alert.priority}
                            </Badge>
                          </div>
                          <div className="text-sm mb-1">{alert.message}</div>
                          <div className="text-xs opacity-75">💡 {alert.action}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Chat Assistant */}
      {!chatOpen && (
        <Button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-slate-200 z-50 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span className="font-semibold">Assistente IA Nutrimental</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-blue-700 p-1"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-blue-700 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    msg.type === 'user' ? 'text-blue-100' : 'text-slate-500'
                  }`}>
                    {msg.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua pergunta sobre os dados..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!chatInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              💡 Pergunte sobre: vendas, produtos, estados, recomendações, ROI
            </p>
          </div>
        </div>
      )}

      {/* Modal do Simulador de Cenários */}
      {simulatorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Simulador de Cenários</h2>
                  <p className="text-slate-600 mt-1">Teste estratégias antes de implementar</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSimulatorOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Controles do Simulador */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900">Parâmetros da Estratégia</h3>
                  
                  {/* Investimento Total */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Investimento Total: R$ {(simulatorParams.investment / 1000000).toFixed(1)}M
                    </label>
                    <input
                      type="range"
                      min="500000"
                      max="5000000"
                      step="100000"
                      value={simulatorParams.investment}
                      onChange={(e) => updateSimulatorParam('investment', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>R$ 0.5M</span>
                      <span>R$ 5M</span>
                    </div>
                  </div>

                  {/* Aumento de Preço */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Aumento de Preço: {simulatorParams.priceIncrease}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      step="1"
                      value={simulatorParams.priceIncrease}
                      onChange={(e) => updateSimulatorParam('priceIncrease', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>0%</span>
                      <span>25%</span>
                    </div>
                  </div>

                  {/* Investimento em Marketing */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Marketing: R$ {(simulatorParams.marketingSpend / 1000).toFixed(0)}K
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="2000000"
                      step="50000"
                      value={simulatorParams.marketingSpend}
                      onChange={(e) => updateSimulatorParam('marketingSpend', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>R$ 100K</span>
                      <span>R$ 2M</span>
                    </div>
                  </div>

                  {/* Expansão de Distribuição */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Novos Estados: {simulatorParams.distributionExpansion}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={simulatorParams.distributionExpansion}
                      onChange={(e) => updateSimulatorParam('distributionExpansion', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>0</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>

                {/* Resultados da Simulação */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900">Projeções de Resultado</h3>
                  
                  {(() => {
                    const results = calculateSimulatorResults()
                    return (
                      <div className="space-y-4">
                        {/* Receita Projetada */}
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-sm text-green-700 font-medium">Receita Projetada</div>
                          <div className="text-2xl font-bold text-green-800">
                            R$ {(results.projectedRevenue / 1000000).toFixed(1)}M
                          </div>
                          <div className="text-sm text-green-600">
                            +R$ {(results.revenueIncrease / 1000000).toFixed(1)}M vs. atual
                          </div>
                        </div>

                        {/* Market Share */}
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-sm text-blue-700 font-medium">Market Share</div>
                          <div className="text-2xl font-bold text-blue-800">
                            {results.projectedMarketShare.toFixed(1)}%
                          </div>
                          <div className="text-sm text-blue-600">
                            +{(results.projectedMarketShare - 50.16).toFixed(1)} pontos
                          </div>
                        </div>

                        {/* ROI */}
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="text-sm text-purple-700 font-medium">ROI Projetado</div>
                          <div className="text-2xl font-bold text-purple-800">
                            {results.roi.toFixed(0)}%
                          </div>
                          <div className="text-sm text-purple-600">
                            Payback: {results.paybackMonths.toFixed(1)} meses
                          </div>
                        </div>

                        {/* Investimento Total */}
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="text-sm text-orange-700 font-medium">Investimento Total</div>
                          <div className="text-2xl font-bold text-orange-800">
                            R$ {(results.totalInvestment / 1000000).toFixed(1)}M
                          </div>
                          <div className="text-sm text-orange-600">
                            Risco: {results.roi > 100 ? 'Baixo' : results.roi > 50 ? 'Médio' : 'Alto'}
                          </div>
                        </div>

                        {/* Recomendação da IA */}
                        <div className={`p-4 rounded-lg border ${results.roi > 150 ? 'bg-green-50 border-green-200' : results.roi > 75 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                          <div className="text-sm font-medium mb-2">
                            🤖 Recomendação da IA
                          </div>
                          <div className="text-sm">
                            {results.roi > 150 ? 
                              '✅ Estratégia altamente recomendada! ROI excelente com risco controlado.' :
                              results.roi > 75 ?
                              '⚠️ Estratégia viável, mas considere otimizar parâmetros para melhor ROI.' :
                              '❌ Estratégia de alto risco. Recomenda-se revisar investimentos.'
                            }
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setSimulatorOpen(false)}
                >
                  Fechar
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  onClick={() => {
                    // Aqui seria implementada a funcionalidade de salvar cenário
                    alert('Cenário salvo! Em breve será possível implementar automaticamente.')
                    setSimulatorOpen(false)
                  }}
                >
                  Salvar Cenário
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center text-slate-500 text-sm">
        <p>AIAAS Nutrimental - Powered by Manus AI | Dados atualizados em tempo real</p>
      </div>
    </div>
  )
}

export default App
