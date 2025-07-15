# Configuração de Chaves SSH para Coolify

Este documento contém as chaves SSH necessárias para configurar o acesso aos servidores no Coolify.

## Chaves SSH para localhost

### Chave Pública
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHCgY2Dzs9Z3SCY/4ROrH4+MWaC4sqHkQ3fOASWopP6F
```

### Chave Privada
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZWQyNTUx
OQAAACBwoGNg87PWd0gmP+ETqx+PjFmguLKh5EN3zgElqKT+hQAAAJBxjKLScYyi0gAAAAtzc2gt
ZWQyNTUxOQAAACBwoGNg87PWd0gmP+ETqx+PjFmguLKh5EN3zgElqKT+hQAAAECtuf2a3samHko+
v2cOiw0Y7GeG9b9Fw/yfjBJzlLaGH3CgY2Dzs9Z3SCY/4ROrH4+MWaC4sqHkQ3fOASWopP6FAAAA
B2Nvb2xpZnkBAgMEBQY=
-----END OPENSSH PRIVATE KEY-----
```

## Como Configurar no Coolify

### 1. Acesso ao Painel do Coolify
- Acesse o Coolify através do túnel SSH: http://localhost:8000
- Faça login com suas credenciais de administrador

### 2. Configuração de Servidor
1. Vá para **Servers** no menu principal
2. Clique em **Add Server** ou edite um servidor existente
3. Na seção **SSH Configuration**:
   - **Host**: localhost (ou IP do servidor)
   - **Port**: 22 (ou porta SSH customizada)
   - **User**: root (ou usuário apropriado)
   - **Private Key**: Cole a chave privada acima

### 3. Configuração de Private Keys
1. Vá para **Security** > **Private Keys**
2. Clique em **Add Private Key**
3. Configure:
   - **Name**: localhost's key
   - **Description**: The private key for the Coolify host machine (localhost)
   - **Private Key**: Cole a chave privada completa

### 4. Teste de Conexão
- Após configurar, use o botão **Test Connection** para verificar se a conexão SSH está funcionando
- O status deve mostrar "Connected" em verde

## Segurança

⚠️ **Importante**:
- Mantenha essas chaves seguras e nunca as compartilhe publicamente
- A chave privada deve ser protegida com permissões adequadas (600)
- Considere usar chaves diferentes para ambientes de produção e desenvolvimento
- Faça backup seguro dessas chaves

## Troubleshooting

### Problemas Comuns
1. **Connection refused**: Verifique se o serviço SSH está rodando
2. **Permission denied**: Verifique as permissões da chave e do usuário
3. **Host key verification failed**: Adicione o host aos known_hosts

### Comandos Úteis
```bash
# Testar conexão SSH manualmente
ssh -i /path/to/private/key user@host

# Verificar permissões da chave
ls -la ~/.ssh/

# Corrigir permissões se necessário
chmod 600 ~/.ssh/private_key
chmod 644 ~/.ssh/public_key
```

## Referências
- [Documentação oficial do Coolify - SSH Keys](https://coolify.io/docs)
- [Guia de configuração SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)