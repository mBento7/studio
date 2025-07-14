# Infraestrutura

Esta pasta centraliza a documentação sobre deploy, operações, monitoramento e estratégias de hospedagem do WhosDo, incluindo guias práticos e recomendações para ambientes de produção e desenvolvimento.

> **Última revisão:** 10/07/2025  
> **Responsável:** Micael Bento

## Checklist de Segurança e Escalabilidade

- [ ] RLS ativado em todas as tabelas sensíveis
- [ ] Buckets públicos revisados e restritos
- [ ] HTTPS obrigatório em todos os ambientes
- [ ] Firewall configurado (apenas portas essenciais)
- [ ] Segredos e variáveis de ambiente fora do repositório
- [ ] Auditoria e backup automáticos configurados
- [ ] Monitoramento de performance e erros ativo (Sentry, LogRocket, etc)
- [ ] Healthchecks e logs centralizados

> Consulte também o arquivo `seguranca.md` (se existir) para checklist detalhado.

## Objetivo
- Documentar processos de deploy, monitoramento e manutenção da infraestrutura.
- Servir de referência para configuração de ambientes, automação e boas práticas operacionais.
- Garantir segurança, performance e disponibilidade do sistema.

## Estrutura dos Arquivos
- `hosting-and-deployment-strategy.md`: Estratégias de hospedagem e publicação.
- `infrastructure-and-operations-guide.md`: Guia prático de operações e monitoramento.

## Como usar
- Consulte este README e os guias para configurar, operar e monitorar a infraestrutura do projeto.
- Atualize a documentação sempre que houver mudanças relevantes nos processos ou ferramentas.

## Boas práticas
- Documente scripts, automações e rotinas de backup.
- Mantenha exemplos reais e recomendações de segurança. 