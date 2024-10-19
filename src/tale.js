export const kolobok = name => {
  switch (name) {
    case 'дедушка':
      console.log('Я от   дедушки ушёл')
      break
    case 'заяц':
      console.log('Я от зайца ушёл')
      break
    case 'лиса':
      console.log('От лисы не ушёл')
      break
    default:
      console.log(`Я от ${name} ушёл`)
      break
  }
}

export const newYear = christmasName => {
  switch (christmasName) {
    case 'Снегурочка':
    case 'Дед Мороз':
      console.log(`${christmasName}! ${christmasName}! ${christmasName}!`)
      break
    default:
      console.log(`${christmasName}!`)
      break
  }
}
