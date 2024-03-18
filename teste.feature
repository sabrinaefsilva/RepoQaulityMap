# language: pt
Funcionalidade: Registro de usuário no site nopCommerce

  Cenário: Registro bem-sucedido de um novo usuário
    Dado que estou na página de registro do site nopCommerce
    Quando preencho o formulário de registro com:
      | Primeiro Nome   | John            |
      | Último Nome     | Doe             |
      | E-mail          | john.doe@example.com |
      | Senha           | password123     |
      | Confirmar Senha | password123     |
    E clico no botão de registro
    Então devo ver a mensagem de boas-vindas com o nome "John Doe"

  Cenário: Tentativa de registro com e-mail já existente
    Dado que estou na página de registro do site nopCommerce
    Quando tento registrar com o e-mail "john.doe@example.com"
    Então devo ver a mensagem de erro informando que "O e-mail especificado já existe"

  Cenário: Validar a data selecionada
    Dado que estou na página onde há um campo para selecionar a data
    Quando seleciono a data desejada "2024-03-18" e confirmo a seleção
    Então devo ver que a data selecionada corresponde a "2024-03-18"
