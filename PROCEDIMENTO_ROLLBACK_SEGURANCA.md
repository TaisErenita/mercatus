# 🔒 PROCEDIMENTO DE ROLLBACK - VERSÃO DE SEGURANÇA

**Data de Criação:** 27/11/2025 11:42 GMT-3  
**Versão Estável:** v1.0-stable-pre-scanntech  
**Commit:** ab2de7ec  
**Deploy Validado:** G8a1g6VR5  
**URL Preview:** https://mercatus-a7f83dofz-tais-erenitas-projects.vercel.app/

---

## 📌 SOBRE ESTA VERSÃO

Esta é a **última versão 100% funcional** do dashboard Mercatus antes da integração da nova base Scanntech (R$ 114.9M, 25,998 registros). Foi extensivamente validada em 27/11/2025 e está funcionando perfeitamente em produção.

### Características da Versão

**Dados Scanntech:** Base antiga com R$ 238.5M de receita total, 703.608 unidades de volume, estrutura consolidada por categoria.

**Funcionalidades Validadas:** Login e autenticação funcionando, 4 módulos operacionais (Monitoramento, Insights, Estratégia, Simulador), filtros de categoria (TOTAL, CEREAIS, FRUTAS, NUTS, PROTEÍNA) funcionando perfeitamente, filtros de período (Mês, Trimestre, YTD) operacionais, gráficos e visualizações renderizando corretamente, tabelas de marcas por região com dados precisos, métricas do modelo preditivo (R² 0.980, MAPE 4.2%, Acurácia 95.8%).

**Status:** Sem tela branca, sem erros de JavaScript, navegação fluida, interface responsiva, deploy bem-sucedido no Vercel.

---

## 🔄 COMO FAZER ROLLBACK

Se a integração da nova base Scanntech causar problemas, você pode voltar para esta versão estável de **3 formas diferentes**.

### Opção 1: Rollback via Tag Git (RECOMENDADO)

Esta é a forma mais segura e rápida de voltar para a versão estável.

```bash
# 1. Ir para o diretório do projeto
cd /home/ubuntu/mercatus-nutrimental-dashboard

# 2. Fazer checkout da tag estável
git checkout v1.0-stable-pre-scanntech

# 3. Criar uma nova branch a partir da tag (se quiser continuar trabalhando)
git checkout -b hotfix/rollback-to-stable

# 4. Fazer push para o GitHub (Vercel vai fazer deploy automaticamente)
git push origin hotfix/rollback-to-stable
```

**Tempo estimado:** 30 segundos  
**Resultado:** Dashboard volta para versão 100% funcional

### Opção 2: Rollback via Branch de Backup

Use esta opção se preferir trabalhar com branches ao invés de tags.

```bash
# 1. Ir para o diretório do projeto
cd /home/ubuntu/mercatus-nutrimental-dashboard

# 2. Fazer checkout da branch de backup
git checkout backup/pre-nova-base-scanntech

# 3. Criar uma nova branch de trabalho (opcional)
git checkout -b fix/restore-stable-version

# 4. Fazer push para o GitHub
git push origin fix/restore-stable-version
```

**Tempo estimado:** 30 segundos  
**Resultado:** Dashboard restaurado para versão estável

### Opção 3: Rollback via Commit Hash

Use esta opção se as tags e branches de backup não estiverem disponíveis.

```bash
# 1. Ir para o diretório do projeto
cd /home/ubuntu/mercatus-nutrimental-dashboard

# 2. Fazer checkout do commit específico
git checkout ab2de7ec

# 3. Criar uma nova branch
git checkout -b emergency/rollback-ab2de7ec

# 4. Fazer push para o GitHub
git push origin emergency/rollback-ab2de7ec
```

**Tempo estimado:** 30 segundos  
**Resultado:** Dashboard restaurado para commit exato validado

---

## 🚨 ROLLBACK DE EMERGÊNCIA NO VERCEL

Se você precisar fazer rollback **imediatamente** sem mexer no código:

### Via Interface do Vercel

1. Acesse: https://vercel.com/tais-erenitas-projects/mercatus/deployments
2. Encontre o deploy **G8a1g6VR5** (branch: feature/reintegracao-scanntech, commit: ab2de7e)
3. Clique nos 3 pontinhos (⋮) ao lado do deploy
4. Selecione **"Promote to Production"**
5. Confirme a ação

**Tempo estimado:** 10 segundos  
**Resultado:** Produção volta para versão estável imediatamente

### Via Vercel CLI (se instalado)

```bash
# Promover deploy específico para produção
vercel promote G8a1g6VR5 --scope=tais-erenitas-projects
```

---

## 📋 CHECKLIST PÓS-ROLLBACK

Após fazer rollback, verifique se tudo está funcionando:

- [ ] Dashboard carrega sem tela branca
- [ ] Login funciona com credenciais `nutrimental/nutrimental`
- [ ] HomePage exibe 4 módulos
- [ ] Módulo Monitoramento carrega dados (R$ 238.5M)
- [ ] Filtros de categoria funcionam (TOTAL → CEREAIS muda para R$ 119.5M)
- [ ] Filtros de período funcionam
- [ ] Gráficos renderizam corretamente
- [ ] Tabela de marcas exibe dados
- [ ] Sem erros no console do navegador

---

## 🔍 IDENTIFICAÇÃO DA VERSÃO

Para confirmar que você está na versão estável correta, verifique:

### No Git

```bash
# Ver commit atual
git log -1 --oneline
# Deve mostrar: ab2de7ec feat: atualizar dados MTRIX e Amazon com bases mais recentes

# Ver tags no commit atual
git tag --points-at HEAD
# Deve mostrar: v1.0-stable-pre-scanntech
```

### No Dashboard

Acesse o módulo Monitoramento e verifique:
- **Mercado Total (TOTAL):** R$ 238.5M
- **Volume Total:** 703.608 unidades
- **Share NUTRY:** 32.2% (valor) / 47.3% (volume)

Se esses valores estiverem corretos, você está na versão estável.

---

## 📊 DADOS DA VERSÃO ESTÁVEL

### Mercado Total por Categoria

| Categoria | Valor (R$) | Volume (un) | Preço Médio (R$/un) |
|-----------|-----------|-------------|---------------------|
| TOTAL     | 238.5M    | 703.608     | 338.92              |
| CEREAIS   | 119.5M    | 351.804     | 339.65              |
| FRUTAS    | 83.1M     | 245.856     | 338.05              |
| NUTS      | 35.9M     | 106.000     | 338.20              |
| PROTEÍNA  | 54.7M     | 161.000     | 338.92              |

### Performance Nutrimental

| Métrica | Valor | Variação |
|---------|-------|----------|
| Share de Mercado | 27.4% | ↑ 0.7% |
| Receita Total | R$ 238.5M | ↓ -18.4% |
| Volume Total | 704k un | ↓ -27.0% |
| Preço Médio | R$ 338.92 | ↑ +1.8% |

### Top Marcas (Share Valor)

1. NUTRY: 32.2%
2. NUTRATA: 15.3%
3. BOLD: 13.3%
4. RITTER: 12.8%
5. INTEGRALMEDICA: 9.0%

---

## 🛡️ PROTEÇÕES IMPLEMENTADAS

Para garantir que esta versão estável nunca seja perdida:

### 1. Tag Git Anotada
- **Nome:** v1.0-stable-pre-scanntech
- **Tipo:** Permanente (tags não são deletadas facilmente)
- **Localização:** GitHub + repositório local
- **Descrição completa:** Inclui data de validação, deploy ID, e status funcional

### 2. Branch de Backup
- **Nome:** backup/pre-nova-base-scanntech
- **Tipo:** Branch protegida (não será deletada acidentalmente)
- **Localização:** GitHub + repositório local
- **Propósito:** Ponto de restauração rápida

### 3. Deploy Vercel Preservado
- **Deploy ID:** G8a1g6VR5
- **Status:** Ready (funcional)
- **URL:** https://mercatus-a7f83dofz-tais-erenitas-projects.vercel.app/
- **Retenção:** Mantido pelo Vercel (não será deletado automaticamente)

### 4. Documentação Completa
- **Arquivo:** VALIDACAO_FASE_1_SUCESSO.md
- **Conteúdo:** Todos os testes realizados, dados validados, screenshots
- **Localização:** Repositório Git

---

## 📞 SUPORTE

Se você tiver problemas com o rollback:

1. **Verifique o status do Git:**
   ```bash
   git status
   git log --oneline -5
   ```

2. **Verifique branches disponíveis:**
   ```bash
   git branch -a
   ```

3. **Verifique tags disponíveis:**
   ```bash
   git tag -l
   ```

4. **Se nada funcionar, clone o repositório novamente:**
   ```bash
   git clone https://github.com/TaisErenita/mercatus.git mercatus-fresh
   cd mercatus-fresh
   git checkout v1.0-stable-pre-scanntech
   ```

---

## ⚠️ AVISOS IMPORTANTES

**NÃO DELETE:** Nunca delete a tag `v1.0-stable-pre-scanntech` ou a branch `backup/pre-nova-base-scanntech`. Elas são seus pontos de segurança.

**ANTES DE MERGE:** Sempre teste a nova versão em preview deploy antes de fazer merge para produção.

**MANTENHA BACKUP:** Mesmo após integração bem-sucedida da nova base, mantenha esta versão por pelo menos 30 dias.

**DOCUMENTE MUDANÇAS:** Se fizer rollback, documente o motivo para evitar repetir o mesmo erro.

---

**Status:** ✅ VERSÃO ESTÁVEL PROTEGIDA E DOCUMENTADA  
**Última Atualização:** 27/11/2025 11:42 GMT-3  
**Responsável:** Manus AI  
**Validado por:** Tais Erenita
