function MoedaMask(value) {
  var valor = value

  valor = valor + ''
  valor = parseInt(valor.replace(/[\D]+/g, ''))
  valor = valor + ''
  valor = valor.replace(/([0-9]{2})$/g, ',$1')

  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
  }

  if (valor.length > 10) {
    valor = ''
  }

  if (valor == 'NaN') return ''

  return valor
}

function CpfCnpjMask(value) {
  const calc = value

  if (calc.length <= 15) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
  } else {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }
}
const TelefoneMask = (value) => {
  const calc = value
  if (calc.length <= 14) {
    value = value
      .replace(/\D/g, '')
      .replace(/(\d{0})(\d)/, '$1($2')
      .replace(/(\d{2})(\d)/, '$1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  } else {
    value = value
      .replace(/\D/g, '')
      .replace(/(\d{0})(\d)/, '$1($2')
      .replace(/(\d{2})(\d)/, '$1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  }
  return value
}

function CepMask(value) {
  if (value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  } else {
    return ''
  }
}

export const Mask = {
  CpfCnpjMask,
  TelefoneMask,
  MoedaMask,
  CepMask,
}
