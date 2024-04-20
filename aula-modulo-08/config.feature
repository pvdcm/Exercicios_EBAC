# Como cliente da EBAC-SHOP
# Quero configurar meu produto de acordo com meu tamanho e gosto
# E escolher a quantidade
# Para depois inserir no carrinho


# Critérios de Aceitação:
# 1 – Seleções de cor, tamanho e quantidade devem ser obrigatórios
# 2 – Deve permitir apenas 10 produtos por venda
# 3 – Quando eu clicar no botão “limpar” deve voltar ao estado original

#language: pt

Funcionalidade: Configurar Produto
Como cliente da EBAC-SHOP
Quero configurar meu produto de acordo com meu tamanho e gosto
E escolher a quantidade
Para depois inserir no carrinho


Contexto:
Dado Que eu acesse o EBAC-SHOP na página de um produto


Cenário: Seleção e preenchimento de todos os campos
Quando Eu selecionar e preencher os campos de cor, tamanho e quantidade, selecionando 10 ou menos produtos
Então O produto deve ser adicionado ao carrinho e Eu devo ser notificado que o produto foi adicionado


Cenário: Seleção e não preenchimento de todos os campos
Quando Eu selecionar os campos, porem não preencher um ou mais campos
E Selecionar 10 ou menos produtos
Então O produto não deve ser adicionado ao carrinho e eu devo ser notificado sobre os campos obrigatórios


Cenário: Seleção e preenchimento de todos os campos, mas exceder o limite de produtos
Quando Eu selecionar e preencher os campos de cor, tamanho e quantidade, selecionando mais 10 
Então O produto não deve ser adicionado ao carrinho e eu devo ser notificado que excedi o limite de produtos


Cenário: Limpar campos
Quando Eu clicar no botão "Limpar" e comfirmar a limpeza dos campos
Então O formulário/interface deve limpar todos os inputs/campos e me notificar sobre a limpeza