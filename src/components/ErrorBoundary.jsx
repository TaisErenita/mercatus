import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para renderizar a UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Loga o erro para debug
    console.error('🔴 Error Boundary capturou erro:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });

    // Atualiza estado com informações do erro
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Se houver muitos erros consecutivos, pode ser um loop infinito
    if (this.state.errorCount > 5) {
      console.error('⚠️ Muitos erros consecutivos detectados. Possível loop infinito.');
    }
  }

  handleReload = () => {
    // Recarrega a página
    window.location.reload();
  };

  handleGoHome = () => {
    // Reseta o estado e volta para home
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {/* Card de Erro */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-red-200">
              {/* Header com Gradiente Vermelho */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-white">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <AlertTriangle className="w-12 h-12" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-center mb-2">
                  Ops! Algo deu errado
                </h1>
                <p className="text-red-100 text-center text-lg">
                  Encontramos um erro inesperado no sistema
                </p>
              </div>

              {/* Conteúdo */}
              <div className="p-8 space-y-6">
                {/* Mensagem de Erro */}
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-red-900 mb-2 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Detalhes do Erro
                  </h3>
                  <p className="text-red-800 text-sm font-mono">
                    {this.state.error?.message || 'Erro desconhecido'}
                  </p>
                </div>

                {/* Informações Adicionais (apenas em desenvolvimento) */}
                {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                  <details className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <summary className="cursor-pointer font-semibold text-slate-700 hover:text-slate-900">
                      Detalhes Técnicos (Dev Only)
                    </summary>
                    <pre className="mt-4 text-xs text-slate-600 overflow-auto max-h-48 bg-white p-3 rounded border border-slate-200">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}

                {/* Sugestões */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">
                    💡 O que você pode fazer:
                  </h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Recarregue a página para tentar novamente</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Volte para a página inicial e navegue novamente</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Se o problema persistir, entre em contato com o suporte</span>
                    </li>
                  </ul>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={this.handleReload}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Recarregar Página
                  </button>
                  <button
                    onClick={this.handleGoHome}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
                  >
                    <Home className="w-5 h-5" />
                    Ir para Início
                  </button>
                </div>

                {/* Informação de Suporte */}
                <div className="text-center pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-500">
                    Erro registrado em {new Date().toLocaleString('pt-BR')}
                  </p>
                  {this.state.errorCount > 1 && (
                    <p className="text-xs text-red-600 mt-1">
                      ⚠️ Este erro ocorreu {this.state.errorCount} vezes
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-sm text-slate-600">
                MERCATUS - Sistema de Inteligência de Mercado
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Se não houver erro, renderiza os children normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;
