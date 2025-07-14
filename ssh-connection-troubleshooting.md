# Guia de Solução de Problemas de Conexão SSH

## Problema Atual
Você está recebendo `Permission denied (publickey)` ao tentar conectar à sua VPS em `ubuntu@129.146.116.166`.

## Opções de Solução (Tente em Ordem)

### Opção 1: Usar Autenticação por Senha
Se sua VPS suporta autenticação por senha:

```bash
ssh -o PreferredAuthentications=password ubuntu@129.146.116.166
```

### Opção 2: Verificar Chaves SSH na Pasta Downloads
Baseado no seu workspace, verifique se você tem chaves SSH na pasta Downloads:

```powershell
# No PowerShell, liste todos os arquivos em Downloads
Get-ChildItem C:\Users\Micael\Downloads\ -Recurse | Where-Object {$_.Name -like "*.pem" -or $_.Name -like "*key*" -or $_.Name -like "*.ppk"}
```

### Opção 3: Usar Chave SSH Específica
Se encontrar um arquivo de chave SSH, use-o:

```bash
# Substitua 'your-key-file.pem' pelo nome real do arquivo de chave
ssh -i C:\Users\Micael\Downloads\your-key-file.pem ubuntu@129.146.116.166
```

### Opção 4: Gerar Novo Par de Chaves SSH
Se você não tem chaves, gere novas:

```bash
# Gerar novo par de chaves SSH
ssh-keygen -t rsa -b 4096 -f C:\Users\Micael\.ssh\vps_key

# Copiar chave pública para VPS (você precisará de acesso por senha para isso)
ssh-copy-id -i C:\Users\Micael\.ssh\vps_key.pub ubuntu@129.146.116.166

# Então conecte usando a chave
ssh -i C:\Users\Micael\.ssh\vps_key ubuntu@129.146.116.166
```

### Opção 5: Usar PuTTY (Alternativa Windows)
Se a linha de comando SSH não estiver funcionando:

1. Baixe o PuTTY de https://www.putty.org/
2. Abra o PuTTY
3. Digite o Host Name: `129.146.116.166`
4. Porta: `22`
5. Tipo de Conexão: `SSH`
6. Clique em "Open"
7. Login como: `ubuntu`
8. Digite a senha quando solicitado

## Passos de Depuração

### Verificar Serviço SSH na VPS
Se você tem acesso ao console da sua VPS:

```bash
# Verificar se o serviço SSH está rodando
sudo systemctl status ssh

# Verificar configuração SSH
sudo nano /etc/ssh/sshd_config

# Procure por essas configurações:
# PasswordAuthentication yes
# PubkeyAuthentication yes
# PermitRootLogin no
```

### Conexão SSH Verbosa
Para informações detalhadas de erro:

```bash
ssh -v ubuntu@129.146.116.166
```

## Causas Comuns e Soluções

1. **Nenhuma chave SSH configurada**: Use autenticação por senha ou gere chaves
2. **Arquivo de chave errado**: Verifique a pasta Downloads por arquivos .pem ou .key
3. **Permissões da chave**: No Linux/WSL, execute `chmod 600 /caminho/para/chave`
4. **Serviço SSH não está rodando**: Reinicie o serviço SSH na VPS
5. **Firewall bloqueando**: Verifique as configurações de firewall da VPS

## Próximos Passos Após Conexão Bem-Sucedida

Uma vez que você conseguir conectar à sua VPS:

1. Corrigir o erro do repositório Docker:
   ```bash
   sudo rm /etc/apt/sources.list.d/docker.list
   ```

2. Seguir o guia de instalação do Docker em `fix-docker-repository-error.md`

3. Verificar instalação do Docker:
   ```bash
   docker --version
   docker-compose --version
   ```

## Alternativa: Acesso ao Console da VPS

Se o SSH continuar falhando, você pode:
1. Acessar sua VPS através do console web do seu provedor de nuvem
2. Executar os comandos de instalação do Docker diretamente
3. Configurar o SSH adequadamente de dentro da VPS

---

**Lembre-se**: Todos os comandos de instalação do Docker devem ser executados NA VPS, não no seu PowerShell local!