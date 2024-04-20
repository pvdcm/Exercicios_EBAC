/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })
  });


  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: "GET",
      url: "usuarios"
    }).should(response => {
      expect(response.status).equal(200)

    })
  });


  it('Deve cadastrar um usuário com sucesso', () => {

    let email = `Jonas${Math.floor(Math.random() * 1000000)}@teste.com`

    cy.cadastrarUsuario("Fulano da Silva", email, "teste", "true").then(response => {
      expect(response.status).equal(201)
      expect(response.body.message).equal("Cadastro realizado com sucesso")
    })
  });


  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario("Fulano da Silva", "fulano@qa.com", "teste", "true").then(response => {
      expect(response.status).equal(400)
      expect(response.body.message).equal("Este email já está sendo usado")
    });
  });


  it('Deve editar um usuário previamente cadastrado', () => {
    let email = `Jonas${Math.floor(Math.random() * 1000000)}@teste.com`
    cy.cadastrarUsuario("Jonas Truco", email, "teste", "true").then(response => {
      let idProvisorio = response.body._id;

      cy.request({
        method: "PUT",
        url: `usuarios/${idProvisorio}`,
        body: {
          "nome": "Fulano Editado",
          "email": email,
          "password": "teste",
          "administrador": "true"
        }
      }).should(response => {
        expect(response.status).equal(200)
        expect(response.body.message).equal("Registro alterado com sucesso")

      })
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let email = `Jonas${Math.floor(Math.random() * 1000000)}@teste.com`;
    cy.cadastrarUsuario("Jonas Truco", email, "teste", "true").then(response => {
      let id = response.body._id
      cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`,
      }).should(response => {
        expect(response.body.message).equal("Registro excluído com sucesso")
      })
    })
  });
});
