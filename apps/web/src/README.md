# Padrão de Organização de Pastas — Frontend (apps/web/src)

Este documento descreve o padrão de organização de pastas adotado no frontend do projeto. Siga estas diretrizes para manter o código limpo, escalável e fácil de entender por todo o time.

## Estrutura Recomendada

```
app/           # Rotas e páginas Next.js (app router)
features/      # Lógica de negócio por domínio (ex: profile, credits, dashboard)
components/    # Componentes reutilizáveis, organizados por domínio ou tipo
lib/           # Utilitários, helpers, tipos globais, integração com APIs
hooks/         # Hooks customizados
services/      # Serviços de dados (ex: chamadas à API, manipulação de dados)
config/        # Arquivos de configuração (ex: site, feed, temas)
contexts/      # Contextos React (ex: autenticação, tema)
docs/          # Documentação adicional do frontend
pages/         # (Se usar pages router, pode ser mantido para rotas legadas)
```

## Descrição das Pastas

- **app/**: Rotas e páginas do Next.js (app router).
- **features/**: Lógica de negócio separada por domínio (ex: `features/profile`, `features/credits`).
- **components/**: Componentes reutilizáveis, organizados por domínio ou tipo.
- **lib/**: Utilitários, helpers, tipos globais, integração com APIs.
- **hooks/**: Hooks customizados.
- **services/**: Serviços de dados e integrações externas.
- **config/**: Arquivos de configuração do projeto.
- **contexts/**: Contextos React para estado global.
- **docs/**: Documentação adicional do frontend.
- **pages/**: Rotas legadas (caso ainda existam).

## Boas Práticas

- Sempre criar um `README.md` em cada pasta principal explicando sua finalidade e exemplos de uso.
- Manter o padrão atualizado e visível para todo o time.
- Revisar periodicamente a estrutura e remover legados.
- Usar code review para reforçar o padrão.

---

Dúvidas ou sugestões? Atualize este arquivo ou consulte o `NEXT_STEPS.md` na raiz do projeto. 