# Como cliente da EBAC-SHOP
# Quero fazer o login (autenticação) na plataforma
# Para visualizar meus pedidos


# Critérios de Aceitação:
# 1 – Ao inserir dados válidos deve ser direcionado para a tela de checkout
# 2 – Ao inserir um dos campos inválidos deve exibir uma mensagem de alerta “Usuário ou senha inválidos”


#language: pt

Funcionalidade: Autenticação de login
Como cliente da EBAC-SHOP
Quero fazer o login (autenticação) na plataforma
Para visualizar meus pedidos

Contexto:
Dado que eu acesse a página de autenticação do portal EBAC

Cenário: Preenchimento dos campos com dados válidos.
Quando Eu entrar na página de Login
E Preencher os campos de login e clicar no botão de "Login"
Então Eu devo ser direcionado para a tela de checkout e devo poder visualizar meus pedidos


Cenário: Preenchimento dos campos com dados inválidos.
Quando Eu entrar na página de Login
E Preencher os campos de login e clicar no botão de "Login"
Então Eu devo permanecer na página de login e ser notificado com a mensagem "Usuário ou senha inválidos"