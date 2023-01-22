const buttonSubmitHelper = ( title, colorScheme ) => {
    return {
        type: 'submit',
        title: title,
        colorScheme: colorScheme,
    }
}

const buttonHelper = ( title, colorScheme, action) => {
    return {
        type: 'btn',
        title: title,
        colorScheme: colorScheme,
        action: action

    }
}

export {
    buttonSubmitHelper,
    buttonHelper,
}