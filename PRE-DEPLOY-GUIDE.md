# 🚀 Guia de Análise Pré-Deploy

Este guia explica como usar as ferramentas de análise pré-deploy para evitar erros durante o build e deploy da aplicação.

## 📋 O que é verificado?

A análise pré-deploy verifica:

### ✅ Problemas de SSR (Server-Side Rendering)
- Uso de `window` sem verificação `typeof window !== "undefined"`
- Uso de `document` sem verificação adequada
- Uso de `localStorage`/`sessionStorage` sem proteção
- Uso de `navigator` sem verificação

### ✅ Dependências
- Verificação se `node_modules` existe
- Validação do `package.json`

### ✅ Variáveis de Ambiente
- Verificação se `.env.local` existe
- Validação de variáveis críticas do Supabase

### ✅ Sintaxe TypeScript
- Verificação de erros de tipo
- Validação de sintaxe

### ✅ ESLint
- Verificação de padrões de código
- Detecção de problemas de qualidade

### ✅ Teste de Build
- Execução de um build de teste
- Verificação se o build completa sem erros

## 🛠️ Como usar

### Opção 1: Script npm (Recomendado)
```bash
pnpm run pre-deploy
```

### Opção 2: PowerShell (Windows)
```powershell
.\pre-deploy-check.ps1
```

### Opção 3: Node.js direto
```bash
node scripts/pre-deploy-check.js
```

## 🎯 Interpretando os resultados

### ✅ Verde - Passou
A verificação passou sem problemas.

### ⚠️ Amarelo - Aviso
Problema encontrado, mas não crítico. O deploy pode continuar, mas é recomendado corrigir.

### ❌ Vermelho - Erro Crítico
Problema que impedirá o deploy. **DEVE** ser corrigido antes do deploy.

## 🔧 Corrigindo problemas comuns

### Problemas de SSR

**❌ Problema:**
```typescript
// Erro: window usado sem verificação
const origin = window.location.origin;
```

**✅ Solução:**
```typescript
// Correto: verificação antes do uso
if (typeof window !== 'undefined') {
  const origin = window.location.origin;
}
```

### Variáveis de Ambiente

**❌ Problema:**
```
.env.local não encontrado
```

**✅ Solução:**
1. Copie `.env.example` para `.env.local`
2. Configure as variáveis necessárias:
   ```
   NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
   ```

### Dependências

**❌ Problema:**
```
node_modules não encontrado
```

**✅ Solução:**
```bash
pnpm install
```

## 🚀 Fluxo recomendado de deploy

1. **Desenvolva suas alterações**
   ```bash
   # Trabalhe normalmente no código
   ```

2. **Execute a análise pré-deploy**
   ```bash
   pnpm run pre-deploy
   ```

3. **Corrija problemas encontrados**
   - Siga as sugestões do script
   - Execute novamente até passar

4. **Commit e push**
   ```bash
   git add .
   git commit -m "sua mensagem"
   git push
   ```

5. **Deploy no Coolify**
   - Inicie o deploy na interface do Coolify
   - Monitore os logs

## 🔍 Logs detalhados

O script fornece informações detalhadas sobre cada problema:

```
❌ 2 problemas de SSR encontrados:
  📁 hooks/use-auth.tsx:45
     Uso de window sem verificação typeof window !== "undefined"
     Código: const origin = window.location.origin;
```

## 🆘 Solução de problemas

### Script não executa
1. Verifique se Node.js está instalado: `node --version`
2. Verifique se pnpm está instalado: `pnpm --version`
3. Execute `pnpm install` para instalar dependências

### Build falha mesmo após análise
1. Execute `pnpm run pre-deploy` novamente
2. Verifique se todas as correções foram aplicadas
3. Limpe o cache: `pnpm clean` (se disponível)

### Problemas de permissão (Windows)
```powershell
# Execute como administrador ou ajuste a política de execução
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 📚 Recursos adicionais

- [Documentação do Next.js sobre SSR](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
- [Guia de TypeScript](https://www.typescriptlang.org/docs/)
- [Configuração do ESLint](https://eslint.org/docs/user-guide/configuring/)

---

**💡 Dica:** Execute `pnpm run pre-deploy` sempre antes de fazer deploy para evitar surpresas!