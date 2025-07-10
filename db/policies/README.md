# Políticas de Segurança (RLS) - WhosDo

## Padrão Atual

- Cada tabela possui apenas **uma política permissiva** por ação/role, consolidando regras públicas e de acesso do próprio usuário.
- O acesso do usuário autenticado é feito usando `(select auth.uid())` para melhor performance, conforme recomendação do Supabase.
- Políticas públicas (ex: SELECT para todos) e de "próprio usuário" (ex: ALL para quem é dono do registro) foram unificadas quando possível.

## Exemplo de política consolidada

```sql
-- Exemplo para tabela education
CREATE POLICY "Education: public or own" ON public.education FOR SELECT USING (true OR (select auth.uid()) = profile_id);
CREATE POLICY "Users can manage their own education" ON public.education FOR ALL USING ((select auth.uid()) = profile_id);
```

## Benefícios
- Menos avaliações por query, melhorando a performance.
- Menos duplicidade e mais clareza nas regras de acesso.
- Alinhamento com as melhores práticas do Supabase.

## Observações
- Sempre que criar novas políticas, siga o padrão de consolidar permissivas e usar `(select auth.uid())`.
- Em caso de dúvidas, consulte a [documentação oficial do Supabase sobre RLS](https://supabase.com/docs/guides/auth/row-level-security). 