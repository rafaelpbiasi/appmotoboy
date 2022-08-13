function ValidateIsEmpty(value) {
  if (value.trim().length === 0) {
    return 'Este campo é obrigatório!'
  }

  return null
}

function EmailValidator(value) {
  const regex = new RegExp('^[a-z0-9.]+@[a-z0-9]+\\.[a-z]+(\\.[a-z]+)?$')
  if (!regex.test(value)) {
    return 'Este campo precisa ser um e-mail válido!'
  }

  return null
}
function SenhaValidator(value1, value2) {
  if (value1 != value2) {
    return 'As senhas precisam ser iguais'
  }
  return null
}

export const Validates = {
  ValidateIsEmpty,
  EmailValidator,
  SenhaValidator,
}
