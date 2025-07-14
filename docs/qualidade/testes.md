# Estratégia de Testes Automatizados

> **Última revisão:** 10/07/2025  
> **Responsável:** Micael Bento

## Objetivo
Garantir qualidade, segurança e evolução contínua do projeto Whosfy.com através de testes automatizados em múltiplos níveis.

## Tipos de Testes
- **Testes Unitários:** Validam funções e componentes isolados (ex: Jest, Vitest).
- **Testes de Integração:** Validam a integração entre módulos, serviços e APIs.
- **Testes End-to-End (E2E):** Simulam o fluxo completo do usuário (ex: Cypress, Playwright).

## Como Rodar os Testes
- Unitários/integrados:
  ```bash
  pnpm test
  # ou
  pnpm run test:unit
  pnpm run test:integration
  ```
- E2E:
  ```bash
  pnpm run test:e2e
  ```

## Cobertura e Qualidade
- Busque cobertura mínima de 80% para código crítico.
- Use relatórios de cobertura para identificar pontos frágeis.
- Automatize a execução dos testes no CI/CD (ex: GitHub Actions).

## Checklist de Qualidade
- [ ] Toda feature nova deve ter testes unitários e/ou de integração.
- [ ] Bugs corrigidos devem ter teste que reproduza o erro.
- [ ] Não faça merge de PRs sem passar nos testes.
- [ ] Documente comandos e exemplos de uso nos READMEs.

## Links Úteis
- [Guia de Onboarding](./onboarding.md)
- [Checklist de Segurança](./infraestrutura/README.md)

> Atualize esta estratégia conforme novas ferramentas e padrões forem adotados. 