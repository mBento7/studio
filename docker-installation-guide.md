# Guia de Instalação do Docker e Docker Compose na VPS

## Pré-requisitos
- Acesso SSH à VPS Ubuntu 22.04.5 LTS
- Usuário com privilégios sudo

## Passo 1: Conectar à VPS

```bash
ssh ubuntu@129.146.116.166
```

## Passo 2: Atualizar o Sistema

```bash
sudo apt update && sudo apt upgrade -y
```

## Passo 3: Instalar Dependências

```bash
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
```

## Passo 4: Adicionar Chave GPG do Docker

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

## Passo 5: Adicionar Repositório do Docker

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

## Passo 6: Instalar Docker Engine

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
```

## Passo 7: Iniciar e Habilitar Docker

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

## Passo 8: Verificar Instalação do Docker

```bash
docker --version
sudo docker run hello-world
```

## Passo 9: Adicionar Usuário ao Grupo Docker (Opcional)

```bash
sudo usermod -aG docker $USER
```

**Nota:** Após executar este comando, faça logout e login novamente para que as alterações tenham efeito.

## Passo 10: Instalar Docker Compose

### Método 1: Via apt (Recomendado para Ubuntu 22.04)

```bash
sudo apt install -y docker-compose-plugin
```

### Método 2: Download Direto (Versão mais recente)

```bash
# Verificar a versão mais recente em: https://github.com/docker/compose/releases
DOCKER_COMPOSE_VERSION="v2.24.5"
sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## Passo 11: Verificar Instalação do Docker Compose

```bash
# Para plugin (método 1)
docker compose version

# Para instalação standalone (método 2)
docker-compose --version
```

## Passo 12: Teste Completo

Crie um arquivo de teste `docker-compose.yml`:

```bash
cat > docker-compose-test.yml << EOF
version: '3.8'
services:
  hello-world:
    image: hello-world
EOF
```

Execute o teste:

```bash
# Para plugin
docker compose -f docker-compose-test.yml up

# Para standalone
docker-compose -f docker-compose-test.yml up
```

Remova o arquivo de teste:

```bash
rm docker-compose-test.yml
```

## Configurações Adicionais de Segurança

### 1. Configurar Firewall (UFW)

```bash
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable
```

### 2. Configurar Docker Daemon (Opcional)

Crie o arquivo de configuração do Docker:

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null << EOF
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

Reinicie o Docker:

```bash
sudo systemctl restart docker
```

## Verificação Final

Execute os seguintes comandos para verificar se tudo está funcionando:

```bash
# Verificar status do Docker
sudo systemctl status docker

# Verificar versões
docker --version
docker compose version

# Verificar se o usuário pode executar Docker sem sudo (se adicionado ao grupo)
docker ps
```

## Próximos Passos

Após a instalação bem-sucedida do Docker e Docker Compose, você pode:

1. **Instalar Coolify** para gerenciamento de aplicações
2. **Configurar Nginx** como proxy reverso
3. **Instalar Supabase** self-hosted
4. **Configurar SSL/TLS** com Let's Encrypt

## Solução de Problemas

### Docker não inicia
```bash
sudo systemctl status docker
sudo journalctl -u docker.service
```

### Permissões negadas
```bash
sudo usermod -aG docker $USER
# Faça logout e login novamente
```

### Problemas de rede
```bash
sudo systemctl restart docker
sudo iptables -t nat -L -n
```

---

**Nota:** Este guia foi criado para Ubuntu 22.04.5 LTS. Para outras distribuições, alguns comandos podem variar.