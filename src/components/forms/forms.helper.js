
const arrayDateConverter = ( date ) => {
    return date && date.length > 0
        ? `${date[0]}-${(''+date[1]).padStart(2, 0)}-${(''+date[2]).padStart(2, 0)} ${(''+date[3]).padStart(2, 0)}:${(''+date[4]).padStart(2, 0)}:${(''+date[5]).padStart(2, 0)}`
        : null
}

export {arrayDateConverter};