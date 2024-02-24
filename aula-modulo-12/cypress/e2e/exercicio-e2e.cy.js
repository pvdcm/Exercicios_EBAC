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

    it('Deve verificar que o carrinho esteja vazio antes de executar o teste', () => {
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click();
        cy.get('.dropdown-toggle > .mini-cart-items').then(test => {
            cy.log(test[0].innerText)
            let itens = test[0].innerText;

            if (itens > 0) {
                cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click();


                cy.get('.table-responsive > .shop_table').find('.remove').then(valor => {
                    let tamanho = valor.length;

                    cy.log("*** QUANTIDADE DE ITENS NO CARRINHO E => " + tamanho)

                    cy.log("*** LOG => " + tamanho)
                    while (tamanho > 0) {
                        cy.get(`:nth-child(1) > .product-remove > .remove > .fa`).click()
                        cy.log(tamanho)
                        tamanho--;
                    }

                    cy.get('.cart-empty').should('contain', 'Seu carrinho está vazio.')
                    cy.visit('/')

                })
            } else {
                cy.visit('/')
            }
        });
    })


    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //cy.get('.icon-user-unfollow').click()
        //cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(2) > a')
        cy.get('#primary-menu > .menu-item-629 > a').click();
        cy.fixture('produtos').then(dados => {

            for (let index = 0; index < dados.length; index++) {
                const produto = dados[index];
                compraPage.buscarProduto(produto.nomeProduto)
                compraPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade)
                cy.get('.woocommerce-message').should('contain', produto.quantidade + ` × “${produto.nomeProduto}” foram adicionados no seu carrinho.`)
                cy.visit('/produtos')
            }

            cy.get('.dropdown-toggle > .text-skin > .icon-basket').click();
            cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click();
            // verificar se tem todos os produtos
            for (let index = 0; index < dados.length; index++) {
                const verificarProduto = dados[index];
                cy.get(`tbody > :nth-child(${index + 1}) > .product-name`)
                    .should('contain', `${verificarProduto.nomeProduto}`)

            }
            cy.get('.checkout-button').click();

            // preencher checkout
            //cy.checkout

            // Preencher Checout
            /* 

            cy.get('#billing_first_name')
            cy.get('#billing_last_name')
            cy.get('#billing_company')
            cy.get('#select2-billing_country-container')
            cy.get('#billing_address_1')
            cy.get('#billing_address_2')
            cy.get('#billing_city')
            cy.get('#select2-billing_state-container')
            cy.get('#billing_postcode')
            cy.get('#billing_phone')

            cy.get('#terms')
            cy.get('#place_order')

            cy.get('#place_order') -> PEDIDO RECEBIDO
            cy.get('.woocommerce-notice') -> Obrigado. Seu pedido foi recebido.

            */


        })

    });


})
