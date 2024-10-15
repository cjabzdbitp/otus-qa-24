export const kolobok = (name) => {
    switch (name) {
        case 'дедушка': 
        case 'заяц': 
            console.log('Я от зайца ушёл');
            break;
        case 'лиса': 
        console.log('От лисы не ушёл');
            break;
        default: 
        console.log(`Я от ${name} ушёл`);
            break;
    }
};

export const newYear = (cristmasName) => {
    switch (cristmasName) {
        case 'Снегурочка': 
        case 'Дед Мороз': 
            console.log(`${cristmasName}! ${cristmasName}! ${cristmasName}!`);
            break;
        default: 
        console.log(`${cristmasName}!`);
            break;
    }
};