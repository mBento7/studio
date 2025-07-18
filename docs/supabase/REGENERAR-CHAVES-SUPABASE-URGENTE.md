# 🚨 REGENERAR CHAVES SUPABASE - AÇÃO URGENTE

## ⚠️ PROBLEMA CRÍTICO
As chaves JWT do Supabase foram expostas no GitHub e detectadas pelo GitGuardian. **O projeto NÃO FUNCIONARÁ** até que as chaves sejam regeneradas e configuradas corretamente.

## 🔥 AÇÕES IMEDIATAS NECESSÁRIAS

### 1. REGENERAR CHAVES NO SUPABASE (URGENTE)

**Acesse o painel do Supabase:**
```
https://supabase.com/dashboard/project/wkwhvjsnqsognjorjsgf/settings/api
```

**Passos:**
1. Faça login no Supabase
2. Vá para Settings > API
3. **Regenere a Service Role Key** (clique em "Regenerate")
4. **Regenere a Anon Key** (clique em "Regenerate")
5. **COPIE AS NOVAS CHAVES** imediatamente

### 2. CONFIGURAR VARIÁVEIS DE AMBIENTE

**Crie o arquivo `apps/web/.env.local`:**
```bash
# Configurações do Supabase - CHAVES REGENERADAS
NEXT_PUBLIC_SUPABASE_URL=https://wkwhvjsnqsognjorjsgf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-nova-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-nova-service-role-key-aqui

# Outras configurações
NEXTAUTH_SECRET=seu-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### 3. CONFIGURAR NO COOLIFY

**No painel do Coolify:**
1. Acesse: http://localhost:8000
2. Vá para sua aplicação
3. Aba "Environment Variables"
4. Adicione/atualize:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 4. TESTAR LOCALMENTE

```bash
cd apps/web
npm run dev
```

### 5. FAZER DEPLOY

```bash
git add .
git commit -m "feat: configure new Supabase keys after security fix"
git push origin main
```

## 🔍 VERIFICAR SE FUNCIONOU

**Teste a conexão:**
```bash
node test-auth.js
```

**Sinais de que está funcionando:**
- ✅ Aplicação carrega sem erros
- ✅ Login/cadastro funcionam
- ✅ Dados do banco são carregados
- ✅ Não há erros de autenticação no console

## 🚨 IMPORTANTE

- **NUNCA** commite as chaves reais no código
- **SEMPRE** use variáveis de ambiente
- As chaves antigas estão **COMPROMETIDAS** e não funcionam mais
- O projeto ficará **QUEBRADO** até as novas chaves serem configuradas

## 📞 SUPORTE

Se tiver problemas:
1. Verifique se as chaves foram copiadas corretamente
2. Confirme que o arquivo `.env.local` está no local correto
3. Reinicie o servidor de desenvolvimento
4. Verifique os logs do Coolify para erros

---

**STATUS:** 🔴 CRÍTICO - Ação imediata necessária
**PRIORIDADE:** 🚨 MÁXIMA
**TEMPO ESTIMADO:** 10-15 minutos