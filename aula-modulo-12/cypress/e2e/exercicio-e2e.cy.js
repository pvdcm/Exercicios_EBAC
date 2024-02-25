/// <reference types="cypress" />

import compraPage from "../support/page_objects/produtos.page";


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')

        cy.get('.icon-user-unfollow').click()

        cy.fixture('perfil').then(login => {
            cy.login(login.usuario, login.senha)
        })
    });
 
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        // Função para limpar o carrinho, feita para testar a funcionalidade
        // Não é importante para o exercicio em si

        cy.verificaCarrinho();

        ////////////


        cy.get('#primary-menu > .menu-item-629 > a').click();

        // Realizando um pedido de 4 produtos com escolha dos produtos e adicionando ao carrinho

        cy.fixture('produtos').then(dados => {
            for (let i = 0; i < dados.length; i++) {
                const produto = dados[i];
                compraPage.buscarProduto(produto.nomeProduto)
                compraPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade)
                cy.get('.woocommerce-message').should('contain', produto.quantidade + ` × “${produto.nomeProduto}” foram adicionados no seu carrinho.`)
                cy.visit('/produtos')
            }

            cy.get('.dropdown-toggle > .text-skin > .icon-basket').click();
            cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click();

            // verificanod se todos os produtos estão corretos
            for (let j = 0; j < dados.length; j++) {
                const verificarProduto = dados[j];
                cy.get(`tbody > :nth-child(${j + 1}) > .product-name`)
                    .should('contain', `${verificarProduto.nomeProduto}`)

            }
            cy.get('.checkout-button').click();

            //  Preenchendo todas opções no checkout
            cy.fixture('infoCheckout').then(dados => {

                cy.checkout(
                    dados.nome,
                    dados.sobrenome,
                    dados.empresa,
                    dados.pais,
                    dados.endereco1,
                    dados.endereco2,
                    dados.cidade,
                    dados.estado,
                    dados.cep,
                    dados.telefone,
                    dados.email,
                    dados.pagamento
                );
                
                cy.wait(4000) // Garantindo que a pagina está carregada
                cy.get('.woocommerce-notice').should('contain','Obrigado. Seu pedido foi recebido.')

            })
 
        })

    });


})
