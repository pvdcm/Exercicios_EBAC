# Como cliente da EBAC-SHOP
# Quero fazer concluir meu cadastro
# Para finalizar minha compra


# Critérios de Aceitação:
# 1 – Deve ser cadastrado com todos os dados obrigatórios, marcado com asteriscos
# 2 – Não deve permitir campo e-mail com formato inválido. Sistema deve inserir uma mensagem de erro
# 3 – Ao tentar cadastrar com campos vazios, deve exibir mensagem de alerta.

#language: pt

Funcionalidade: Configurar Produto
Como cliente da EBAC-SHOP
Quero fazer concluir meu cadastro
Para finalizar minha compra


Contexto:
Dado Que eu esteja na etapa de finalização da compra


Cenário: Preenchimento de todos os campos obrigatórios
Quando Eu preencher os campos obrigatórios
E Os campos estejam preenchidos corretamente/válidos e clicar no botão 'FINALIZAR COMPRA'
Então Eu devo poder finalizar a compra


Cenário: Preenchimento do campos de e-mail
Quando Eu preencher os obrigatório
E clicar no botão 'FINALIZAR COMPRA' e  o campo de e-mail esteja preenchido incorretamente/invalido 
Então Eu não devo poder finalizar a compra e ser notificado com a mensagem: "E-mail inválido"


Cenário: Preenchimento inválidos dos campos obrigatórios
Quando Eu não preencher o campo: <campo>
Então Eu devo ser notificado com a devida mensagem: <mensagem>

Exemplos:
| Campo       | mensagem                                 |
| "e-mail"    | "Campo e-mail não preenchido "           |
| "nome"      | "Campo nome não preenchido "             |
| "sobrenome" | "Campo sobrenome não preenchido "        |
| "país"      | "Campo obrigatório país não preenchido " |
| "endereco"  | "Campo endereço não preenchido "         |
| "cidade"    | "Campo cidade não preenchido "           |
| "cep"       | "Campo cep não preenchido "              |
| "telefone"  | "Campo telefone não preenchido "         |