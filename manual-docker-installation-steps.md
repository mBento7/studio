# Passos Manuais de Instalação do Docker

Este guia fornece instruções passo a passo para instalar manualmente o Docker e Docker Compose na sua VPS devido a problemas persistentes de autenticação SSH com scripts automatizados.

## Pré-requisitos

- VPS executando Ubuntu 22.04 LTS
- Acesso à VPS (via SSH com autenticação adequada ou acesso ao console)
- Privilégios root ou sudo

## Passo 1: Conectar à Sua VPS

### Opção A: SSH com Autenticação por Senha
```bash
ssh -o PreferredAuthentications=password ubuntu@129.146.116.166
```

### Opção B: SSH com Chave (se você tem o arquivo de chave)
```bash
ssh -i /caminho/para/sua/chave.pem ubuntu@129.146.116.166
```

### Opção C: Usar Console do Provedor de Nuvem
Acesse sua VPS através do console baseado na web do seu provedor de nuvem se o SSH falhar.

## Passo 2: Atualizar Sistema

Uma vez conectado à sua VPS, execute:

```bash
sudo apt update && sudo apt upgrade -y
```

## Passo 3: Instalar Dependências Necessárias

```bash
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

## Passo 4: Remover Versões Antigas do Docker (se existirem)
```bash
sudo apt remove -y docker docker-engine docker.io containerd runc
```

## Passo 5: Adicionar Chave GPG do Docker
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

## Passo 6: Adicionar Repositório do Docker
```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

## Passo 7: Atualizar Lista de Pacotes
```bash
sudo apt update
```

## Passo 8: Instalar Docker Engine e Docker Compose
```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Passo 9: Iniciar e Habilitar Docker
```bash
sudo systemctl start docker
sudo systemctl enable docker
```

## Passo 10: Adicionar Usuário ao Grupo Docker
```bash
sudo usermod -aG docker $USER
```

## Passo 11: Configurar Docker Daemon
```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null << 'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "live-restore": true
}
EOF
```

## Passo 12: Reiniciar Docker
```bash
sudo systemctl restart docker
```

## Passo 13: Configurar Firewall Básico
```bash
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

## Passo 3: Verificar Instalação

### 3.1 Verificar Versões
```bash
docker --version
docker compose version
```

### 3.2 Verificar Status do Docker
```bash
sudo systemctl status docker
```

### 3.3 Teste Básico
```bash
sudo docker run hello-world
```

### 3.4 Teste do Docker Compose
```bash
# Criar arquivo de teste
cat > docker-compose-test.yml << 'EOF'
version: '3.8'
services:
  test:
    image: alpine:latest
    command: echo "Docker Compose funcionando!"
EOF

# Executar teste
sudo docker compose -f docker-compose-test.yml up

# Remover arquivo de teste
rm docker-compose-test.yml
```

## Passo 4: Configuração Final

### 4.1 Logout e Login (Importante)
Para usar Docker sem `sudo`, você precisa fazer logout e login novamente:

```bash
exit  # Sair da VPS
ssh ubuntu@129.146.116.166  # Conectar novamente
```

### 4.2 Teste sem Sudo
Após reconectar:
```bash
docker run hello-world
```

## Verificação de Sucesso

Se todos os comandos executaram sem erro, você deve ver:

1. **Versões do Docker:**
   ```
   Docker version 24.x.x
   Docker Compose version v2.x.x
   ```

2. **Status do Docker:**
   ```
   ● docker.service - Docker Application Container Engine
   Loaded: loaded
   Active: active (running)
   ```

3. **Teste Hello World:**
   ```
   Hello from Docker!
   This message shows that your installation appears to be working correctly.
   ```

## Próximos Passos

Após a instalação bem-sucedida:

### 1. Instalar Coolify (Opcional)
```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

### 2. Configurar Nginx (Se necessário)
```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 3. Instalar Supabase Self-hosted
Siga o guia em `supabase-self-hosted-setup.md`

## Solução de Problemas

### Docker não inicia
```bash
sudo systemctl status docker
sudo journalctl -u docker.service
```

### Erro de permissão
```bash
# Verificar se usuário está no grupo docker
groups $USER

# Se não estiver, adicionar novamente
sudo usermod -aG docker $USER
# Fazer logout e login
```

### Problemas de rede
```bash
sudo systemctl restart docker
sudo iptables -t nat -L -n
```

### Verificar logs do Docker
```bash
sudo journalctl -u docker.service --no-pager
```

## Comandos Úteis

```bash
# Ver containers rodando
docker ps

# Ver todas as imagens
docker images

# Ver uso de espaço
docker system df

# Limpar recursos não utilizados
docker system prune

# Ver logs de um container
docker logs <container_name>

# Parar todos os containers
docker stop $(docker ps -q)

# Remover todos os containers parados
docker container prune
```

---

**Importante:** Execute os comandos na ordem apresentada e aguarde cada um terminar antes de executar o próximo. Se algum comando falhar, anote o erro e tente novamente ou consulte a seção de solução de problemas.