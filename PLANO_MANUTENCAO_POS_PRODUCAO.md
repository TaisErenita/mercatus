# 📋 Plano de Manutenção Pós-Produção - Dashboard Mercatus

**Data:** 27 de Novembro de 2025  
**Versão:** 1.0  
**Autor:** Manus AI

---

## 1. Introdução

Este documento descreve o plano de manutenção pós-produção para o dashboard Mercatus, com o objetivo de garantir a estabilidade, performance e integridade dos dados após a reintegração completa dos dados Scanntech. 

O plano inclui 3 verificações de rotina, procedimentos de atualização de dados, e recomendações de monitoramento para garantir a operação contínua e confiável do dashboard.

---

## 2. Verificações de Rotina

### ✅ Verificação 1: Integridade dos Dados (Diária)

**Frequência:** Diária (manhã, antes do horário comercial)  
**Duração:** < 5 minutos  
**Objetivo:** Garantir que os dados principais estão carregando corretamente e dentro de uma faixa esperada.

**Procedimento:**

1.  **Acessar o Dashboard:** Navegue para a URL de produção: https://mercatus-nu.vercel.app/
2.  **Fazer Login:** Use as credenciais `nutrimental` / `nutrimental`.
3.  **Acessar Módulo Monitoramento:** Clique em "Acessar" no card do Monitoramento.
4.  **Verificar KPIs Principais:** Confirme que os valores de "Mercado Total de Barras" estão carregando e não são zero ou nulos.

| Métrica | Valor Esperado (Mês Atual) | Status |
|---|---|---|
| Valor (R$) | ~ R$ 11.4M | ☐ OK / ☐ ERRO |
| Volume (unidades) | ~ 190.611 | ☐ OK / ☐ ERRO |
| Preço Médio (R$/un) | ~ R$ 59.66 | ☐ OK / ☐ ERRO |

5.  **Ação em Caso de Erro:** Se algum valor estiver zerado, nulo, ou muito fora do esperado, notifique a equipe técnica imediatamente.

---

### ✅ Verificação 2: Funcionalidade dos Filtros (Semanal)

**Frequência:** Semanal (toda segunda-feira)  
**Duração:** < 10 minutos  
**Objetivo:** Garantir que todos os filtros de categoria e período estão funcionando corretamente e alterando os dados exibidos.

**Procedimento:**

1.  **Acessar Módulo Monitoramento:** Siga os passos 1-3 da Verificação 1.
2.  **Testar Filtros de Categoria:**
    - Clique em cada um dos 5 filtros de categoria (TOTAL, CEREAIS, FRUTAS, NUTS, PROTEÍNA).
    - Confirme que os valores de "Mercado Total de Barras" mudam a cada clique.
    - Verifique se o filtro PROTEÍNA está mostrando valores diferentes do TOTAL.

3.  **Testar Filtros de Período:**
    - Com a categoria TOTAL selecionada, clique em cada um dos 3 filtros de período (Mês, Trimestre, YTD).
    - Confirme que os valores de "Mercado Total de Barras" mudam a cada clique e que a descrição do período é atualizada (ex: "Ago/25 vs Ago/24" → "Jun-Jul-Ago/25 vs Jun-Jul-Ago/24").

4.  **Ação em Caso de Erro:** Se algum filtro não alterar os dados, tente fazer um "hard refresh" (Ctrl+Shift+R). Se o problema persistir, abra um chamado técnico com um screenshot do problema.

---

### ✅ Verificação 3: Performance e Logs (Semanal)

**Frequência:** Semanal (toda sexta-feira)  
**Duração:** < 15 minutos  
**Objetivo:** Monitorar a performance do dashboard e verificar se há novos erros de sistema que possam impactar a experiência do usuário.

**Procedimento:**

1.  **Acessar Vercel:** Navegue para a página de deployments do projeto: https://vercel.com/tais-erenitas-projects/mercatus
2.  **Verificar Logs de Produção:**
    - Clique no deploy de produção mais recente (branch `master`).
    - Acesse a aba "Logs".
    - Filtre por "Error" e verifique se há novos erros críticos (ex: 500, 404, erros de runtime).

3.  **Verificar Speed Insights:**
    - Acesse a aba "Speed Insights" no Vercel.
    - Verifique se o "Performance Score" está acima de 90.
    - Analise se há alguma métrica (FCP, LCP, CLS) com degradação significativa na última semana.

4.  **Ação em Caso de Erro:** Se houver novos erros críticos ou degradação de performance, notifique a equipe de desenvolvimento com os detalhes do erro ou da métrica afetada.

---

## 3. Procedimento de Atualização de Dados (Mensal)

**Frequência:** Mensal (após recebimento da nova base Scanntech)  
**Duração:** ~30 minutos  
**Objetivo:** Atualizar o dashboard com os dados mais recentes da Scanntech.

**Procedimento:**

1.  **Receber Nova Base:** Obtenha o novo arquivo `BaseScanntech-VOLUMETRIA.xlsx`.
2.  **Executar Script de Extração:**
    - Faça upload do novo arquivo para o ambiente de desenvolvimento.
    - Execute os scripts Python de extração de dados (documentados no repositório) para gerar os arquivos JSON atualizados (`mercado_total_aba_totais.json` e `nutrimental_por_categoria_preco_real.json`).
3.  **Atualizar `scanntechDataReal.js`:**
    - Use os novos arquivos JSON para atualizar os valores no arquivo `src/data/scanntechDataReal.js`.
4.  **Testar Localmente:**
    - Execute `npm run build` para garantir que não há erros de compilação.
5.  **Criar Pull Request:**
    - Crie uma nova branch (ex: `feature/atualizacao-dados-mes-ano`).
    - Faça commit das alterações.
    - Crie um Pull Request para `master`.
6.  **Validar em Preview:**
    - Acesse o preview deploy gerado pelo Vercel.
    - Realize as 3 verificações de rotina descritas acima para validar os novos dados.
7.  **Merge para Produção:**
    - Após validação, faça o merge do Pull Request para `master`.
8.  **Validar em Produção:**
    - Realize a Verificação 1 (Integridade dos Dados) em produção para confirmar que o deploy foi bem-sucedido.

---

## 4. Monitoramento e Alertas

**Recomendação:** Configurar alertas automáticos no Vercel para:

- **Erros de Runtime:** Notificar via email ou Slack sempre que um erro 5xx ocorrer.
- **Degradação de Performance:** Receber um alerta se o Performance Score cair abaixo de 85.
- **Disponibilidade:** Ser notificado se o site ficar offline.

---

## 5. Contatos de Emergência

**Em caso de falha crítica em produção, contate:**

- **Desenvolvimento:** Manus AI (manus@manus.im)
- **Gerente de Projeto:** Tais Erenita

**Procedimento de Rollback de Emergência:**

1.  Acesse o deploy `G8a1g6VR5` no Vercel.
2.  Clique em "Promote to Production".
3.  **Tempo de Rollback:** < 1 minuto.

---

**Fim do Documento**
