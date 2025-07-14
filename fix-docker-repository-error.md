# Correção do Erro no Repositório Docker

## Descrição do Erro

O erro `E: Malformed entry 1 in list file /etc/apt/sources.list.d/docker.list ([option] no value)` indica que o arquivo de repositório do Docker foi criado incorretamente.

⚠️ **CRÍTICO**: Você está executando comandos Linux no PowerShell localmente! Esses comandos NÃO funcionarão no PowerShell.

## Passo 1: Conecte-se à Sua VPS Primeiro

Você DEVE conectar-se à sua VPS antes de executar qualquer um dos comandos abaixo:

```bash
ssh ubuntu@129.146.116.166
```

**Nota**: Se você está recebendo erros "Permission denied (publickey)", você pode precisar:
1. Usar autenticação por senha: `ssh -o PreferredAuthentications=password ubuntu@129.146.116.166`
2. Ou especificar sua chave SSH: `ssh -i caminho/para/sua/chave ubuntu@129.146.116.166`

## Passo 2: Uma Vez Conectado à VPS, Execute Estes Comandos

## Solução Rápida

Após conectar à VPS, execute os seguintes comandos para corrigir o problema:

### Passo 1: Remover o arquivo corrompido
```bash
sudo rm /etc/apt/sources.list.d/docker.list
```

### Passo 2: Recriar o repositório corretamente
```bash
# Adicionar a chave GPG oficial do Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Adicionar o repositório Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### Passo 3: Verificar se o arquivo foi criado corretamente
```bash
cat /etc/apt/sources.list.d/docker.list
```

O resultado deve ser algo como:
```
deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu jammy stable
```

### Passo 4: Atualizar a lista de pacotes
```bash
sudo apt update
```

### Passo 5: Continuar com a instalação do Docker
```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Comandos Completos para Execução Sequencial

Se preferir executar tudo de uma vez:

```bash
# Remover arquivo corrompido
sudo rm /etc/apt/sources.list.d/docker.list

# Adicionar chave GPG
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Recriar repositório
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Atualizar e instalar
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Iniciar Docker
sudo systemctl start docker
sudo systemctl enable docker

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Verificar instalação
docker --version
docker compose version
```

## Verificação Final

Após executar os comandos, teste se tudo está funcionando:

```bash
# Verificar status do Docker
sudo systemctl status docker

# Teste básico
sudo docker run hello-world

# Teste do Docker Compose
echo 'version: "3.8"
services:
  test:
    image: alpine:latest
    command: echo "Docker Compose funcionando!"' > test-compose.yml

sudo docker compose -f test-compose.yml up
rm test-compose.yml
```

## Causa do Problema

O erro ocorreu porque o arquivo `/etc/apt/sources.list.d/docker.list` foi criado com formato incorreto, provavelmente devido a:
- Comando mal formatado
- Caracteres especiais não escapados
- Interrupção durante a criação do arquivo

## Prevenção

Para evitar este problema no futuro:
1. Sempre use os comandos oficiais da documentação do Docker
2. Verifique o conteúdo dos arquivos de repositório após criá-los
3. Use `sudo tee` em vez de redirecionamento direto para arquivos do sistema

---

**Nota:** Após corrigir o problema e instalar o Docker, lembre-se de fazer logout e login novamente para usar Docker sem sudo.