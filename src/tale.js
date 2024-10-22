export const kolobok = name => {
  switch (name) {
    case 'дедушка':
      return 'Я от дедушки ушёл'
    case 'заяц':
      return 'Я от зайца ушёл'
    case 'лиса':
      return 'От лисы не ушёл'
    default:
      return `Я от ${name} ушёл`
  }
}

export const newYear = christmasName => {
  switch (christmasName) {
    case 'Снегурочка':
    case 'Дед Мороз':
      return `${christmasName}! ${christmasName}! ${christmasName}!`
    default:
      return `${christmasName}!`
  }
}
