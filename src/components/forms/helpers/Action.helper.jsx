

const modalActionConfim = ({
    title = '',
    colorScheme = 'blue',
    actionFieldParam = 'uuid',
    action = (uuid) => { }
}) => {
    return {
        type: 'btn',
        title: title,
        colorScheme: colorScheme,
        actionFieldParam: actionFieldParam,
        action: action
    };
}

const modalActionClose = ({
    title = '',
    colorScheme = 'blue',
    actionFieldParam = 'uuid',
    action = (uuid) => { }
}) => {
    return {
        type: 'close',
        title: title,
    };
}


export {
    modalActionConfim, modalActionClose
}