Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, { log: false })
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('checkout', (
    nome,
    sobrenome,
    empresa,
    pais,
    endereco1,
    endereco2,
    cidade,
    estado,
    cep,
    telefone,
    email,
    pagamento
) => {

    cy.get('#billing_first_name').clear().type(nome)
    cy.get('#billing_last_name').clear().type(sobrenome)
    cy.get('#billing_company').clear().type(empresa)
    cy.get('#select2-billing_country-container').click().type(pais + '{enter}')
    cy.get('#billing_address_1').clear().type(endereco1)
    cy.get('#billing_address_2').clear().type(endereco2)
    cy.get('#billing_city').clear().type(cidade)
    cy.get('#select2-billing_state-container').click().type(estado + '{enter}')
    cy.get('#billing_postcode').clear().type(cep)
    cy.get('#billing_phone').clear().type(telefone)
    cy.get('#billing_email').clear().type(email)

    cy.get(`#payment_method_${pagamento}`).click()

    cy.get('#terms').click()
    cy.get('#place_order').click()
})


Cypress.Commands.add('verificaCarrinho', () => {

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