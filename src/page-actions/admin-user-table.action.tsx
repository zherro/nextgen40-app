
import { ROUTES } from '../core/config/app.environment';
import { ACTION_CONDITIONS, CRUD_ACTION } from '@/components/forms/types/btn.types';
import { FORM_TYPE } from '@/components/forms/types/form.types';
import { DeleteIcon, EditIcon, QuestionOutlineIcon, ViewIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { deleteUserById } from '../core/actions/users.action';

const tableAction = (t, router) => {
    return [
        {
            type: CRUD_ACTION.ADD,
            title: t.add,
            onClick: () => { router.push(ROUTES.CONFIG_USER_NEW) },
        }
    ];
}

const tableFilterConfig = (t) => {
    return {
        size: 10,
        withClearButton: true,
        placeholder: t.userSearchPlaceholder,
        minSearch: 3,
        minSearchAlert: t.minSearchText
    }
}

const tableHead = [
    { title: '#ID' },
    { title: 'User' },
    { title: 'Email', hideWhen: 900 },
    { title: 'Status' },
    { title: 'Criado em', hideWhen: 900 },
    { title: 'Criado Por' },
    { title: 'Acoes' },
];

const tableRowsConfig = (router, dispatch) => {
    return [
        {
            id: 'id',
            type: FORM_TYPE.FIELD.TEXT
        },
        {
            id: 'username',
            type: FORM_TYPE.FIELD.TEXT
        },
        {
            id: 'email',
            type: FORM_TYPE.FIELD.TEXT
        },
        {
            id: 'status',
            type: FORM_TYPE.FIELD.SWITCH
        },
        {
            id: 'createdAt',
            type: FORM_TYPE.FIELD.DATE_TIME
        },
        {
            id: 'createdBy.username',
            type: FORM_TYPE.FIELD.NICKNAME
        },
        {
            id: 'action',
            type: FORM_TYPE.FIELD.ACTION,
            actions: [
                {
                    type: 'btn-ghost',
                    colorScheme: 'blue',
                    icon: <ViewIcon boxSize={4} color='blue' />,
                    actionFieldParam: 'uuid',
                    action: (uuid) => { router.push(`${ROUTES.CONFIG_USER_VIEW}${uuid}`) }
                },
                {
                    type: 'btn-ghost',
                    colorScheme: 'blue',
                    icon: <EditIcon boxSize={4} color='blue' />,
                    actionFieldParam: 'uuid',
                    action: (uuid) => { router.push(`${ROUTES.CONFIG_USER_EDIT}${uuid}`) },
                    conditions: [
                        {
                            type: ACTION_CONDITIONS.TYPE.NOT_EQUALS_FIELD,
                            field: 'status',
                            condition: 'DELETED'
                        }
                    ]
                },
                {
                    type: 'btn-ghost-with-confirmation',
                    colorScheme: 'red',
                    icon: <DeleteIcon boxSize={4} color='red' />,
                    actionFieldParam: 'uuid',
                    action: (uuid) => { router.push(`${ROUTES.CONFIG_USER_DELETE}${uuid}`) },
                    withConfirm: true,
                    modal: {
                        titleIcon: <QuestionOutlineIcon boxSize={6} mr={2} />,
                        title: 'Confirmacao',
                        contentIcon: <WarningTwoIcon boxSize={8} color="red" />,
                        content: 'Tem certeza que deseja remover este Usuario? Esta e uma acao irreversivel!',
                    action: (uuid) => { router.push(`${ROUTES.CONFIG_USER_DELETE}${uuid}`) },
                    callbackOnClose: () => {router.push(ROUTES.CONFIG_USER)},
                        actions: [
                            {
                                type: 'btn',
                                title: 'Confirmar',
                                colorScheme: 'red',
                                actionFieldParam: 'uuid',
                                action: (uuid) => dispatch(deleteUserById(uuid))
                            },
                            {
                                type: 'close',
                                title: 'Cancelar',
                            },
                        ]
                    },
                    modealType: 'request',
                    conditions: [
                        {
                            type: ACTION_CONDITIONS.TYPE.NOT_EQUALS_FIELD,
                            field: 'status',
                            condition: 'DELETED'
                        }
                    ]
                },
            ]
        },
    ]
};

export {
    tableAction,
    tableFilterConfig,
    tableHead,
    tableRowsConfig
}