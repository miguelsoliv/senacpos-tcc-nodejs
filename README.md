## Visão geral

API desenvolvida em [node.js](https://nodejs.org/en/) e hospedada no [Heroku](https://heroku.com/) para realizar a comunicação entre o aplicativo e o [MongoDB](https://mongodb.com/).

### Usuários

Os usuários são divididos em: cliente e profissional. A profissional possui todos os atributos do cliente e mais "photo_url", "services" e "schedule" para diferenciação. O cliente é salvo somente com "name", "email" e "password".

### Autenticação

A API possui um middleware de autenticação de usuário em certas rotas, fazendo com que o usuário tenha que enviar seu token JWT em cada requisição para provar sua autenticidade.

### Requisitos funcionais

1. Enviar e-mail via Gmail
2. CRUD de usuários
3. CRUD de agendamento
4. Gerar/Validar token de autenticação
5. Autenticar usuário

### Requisitos não funcionais

1. Aplicação de criptografia na senha do usuário a cada inserção ou alteração
2. Ao autenticar, verificar a existência do token gerado ao ser enviado o e-mail de "esqueci minha senha"

## Bibliotecas utilizadas

- [Express](https://github.com/expressjs/express) : `npm i express`
- [Mongoose](https://github.com/Automattic/mongoose) : `npm i mongoose`
- [Nodemon](https://github.com/remy/nodemon) : `npm i nodemon -D`
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) : `npm i bcryptjs`
- [JSON Web Token (JWT)](https://github.com/auth0/node-jsonwebtoken) : `npm i jsonwebtoken`
- [Nodemailer](https://github.com/nodemailer/nodemailer) : `npm i nodemailer`
- [dotenv](https://github.com/motdotla/dotenv) : `npm i dotenv`

---

## How to

- Start project: `npm start`
- Start project with nodemon: `npm run devstart`

## Libraries

- [Express](https://github.com/expressjs/express): `npm i express`
- [Mongoose](https://github.com/Automattic/mongoose): `npm i mongoose`
- [Nodemon](https://github.com/remy/nodemon): `npm i nodemon -D`
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js): `npm i bcryptjs`
- [JSON Web Token (JWT)](https://github.com/auth0/node-jsonwebtoken): `npm i jsonwebtoken`
- [Nodemailer](https://github.com/nodemailer/nodemailer): `npm i nodemailer`
- [dotenv](https://github.com/motdotla/dotenv): `npm i dotenv`

## License

    MIT License

    Copyright (c) 2020 Miguel Soares de Oliveira

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
