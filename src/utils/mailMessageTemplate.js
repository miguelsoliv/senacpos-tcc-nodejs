module.exports = function mailMessageTemplate(randomPassword) {
  return `<h1>Sua nova senha é: ${randomPassword}</h1>

    <p>Ao logar no aplicativo sua senha aleatória será deletada, então lembre-se de trocar sua senha assim que entrar!!
    <br>
    Caso não tenha solicitado uma nova senha, desconsidere este e-mail. Caso contrário, tenha em mente que esta senha
    possui validade de 3 horas. Após sua expiração, solicite uma nova senha.</p>`
}
