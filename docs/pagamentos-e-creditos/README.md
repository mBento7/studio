# Documentação de Pagamentos e Créditos

> **Última revisão:** 24/06/2025  
> **Responsável:** Micael Bento

Esta pasta reúne toda a documentação relacionada ao sistema de créditos, monetização e pagamentos do projeto.

## Objetivo
- Centralizar o planejamento, regras de negócio, integrações e UX das funcionalidades de créditos e pagamentos.
- Facilitar a consulta e atualização por desenvolvedores e gestores.

## Estrutura dos Arquivos
- `creditos-planejamento.md`: Visão geral, regras e lógica do sistema de créditos.
- `paginas-ux-creditos.md`: UX/UI das páginas de compra, uso e histórico de créditos.
- `planos-contratacao-creditos.md`: Estratégia e regras para planos pagos e pacotes de créditos.
- `plano-fases-creditos.md`: Fases de implementação do sistema de créditos.
- `plano-execucao-creditos.md`: Passo a passo para execução técnica.
- `monetization-strategy.md`: Estratégias de monetização e integração com meios de pagamento.

## Como usar
- Consulte o arquivo mais relevante para sua dúvida ou tarefa.
- Sempre que houver mudanças importantes no sistema de créditos/pagamentos, atualize o(s) arquivo(s) correspondente(s).
- Use exemplos reais e práticos sempre que possível.
- Para dúvidas gerais, consulte este README ou peça orientação ao time responsável.

## Boas práticas
- Documente toda alteração relevante nesta área.
- Mantenha exemplos práticos e atualizados.
- Consulte o time de produto/negócios em caso de dúvidas sobre regras ou integrações.

---

## Progresso da Integração Mercado Pago

**Atualização:** 24/06/2025

### O que já foi implementado:
- Página `/dashboard/credits/buy` exibe pacotes de créditos e inicia o fluxo de compra via Mercado Pago.
- Página `/dashboard/credits/payment-confirmation` processa o retorno do Mercado Pago e exibe o status ao usuário.

### Próximos passos:
- Implementar as rotas de API `/api/payments/mercadopago/checkout` e `/api/payments/mercadopago/validate`.
- Criar/atualizar o serviço `credits.service.ts` para registrar transações e atualizar saldo.
- Criar migration para tabela de transações de créditos.

> Após esses passos, o fluxo de compra estará pronto para testes integrados e homologação.

> [2024-06] Correção aplicada: a página `/dashboard/credits/buy` agora está marcada com "use client", permitindo uso de hooks React (useEffect, useState) conforme exigido pelo Next.js. O frontend está pronto para integração com o backend.

---

## 🤝 Como contribuir

- Para sugerir melhorias, abra uma issue ou pull request no repositório.
- Sempre que alterar algo fundamental (regras, integrações, UX), atualize este README e os arquivos relacionados.
- Em caso de dúvida, consulte a documentação central em `/docs` ou pergunte ao time responsável. 