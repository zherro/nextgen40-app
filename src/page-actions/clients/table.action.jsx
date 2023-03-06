
import { ROUTES } from '../../core/config/app.environment';
import { DeleteIcon, EditIcon, QuestionOutlineIcon, ViewIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { deleteContractModelById } from '@/actions/contractModel.action';
import { ACTION_CONDITIONS, CRUD_ACTION } from '@/components/forms/shared/types/btn.type';
import { FORM_TYPE } from '@/components/forms/shared/types/form.type';

const tableAction = (t, router) => {
    return [
        {
            type: CRUD_ACTION.ADD,
            title: t.add,
            onClick: () => { router.push(ROUTES.CLIENT.NEW) },
        }
    ];
}

const tableFilterConfig = (t) => {
    return {
        size: 10,
        withClearButton: true,
        placeholder: "ID, nome ou documento",
        minSearch: 3,
        minSearchAlert: t.minSearchText
    }
}

const tableHead = [
    { title: '#ID' },
    { title: 'Nome' },
    { title: 'Documento' },
    { title: 'Situacao' },
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
            id: 'name',
            type: FORM_TYPE.FIELD.TEXT
        },
        {
            id: 'docNumber',
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
                    action: (uuid) => { router.push(`${ROUTES.CLIENT.VIEW}${uuid}`) }
                },
                {
                    type: 'btn-ghost',
                    colorScheme: 'blue',
                    icon: <EditIcon boxSize={4} color='blue' />,
                    actionFieldParam: 'uuid',
                    action: (uuid) => { router.push(`${ROUTES.CLIENT.EDIT}${uuid}`) },
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
                    action: (uuid) => { router.push(`${ROUTES.CLIENT.EDIT}${uuid}`) },
                    withConfirm: true,
                    modal: {
                        titleIcon: <QuestionOutlineIcon boxSize={6} mr={2} />,
                        title: 'Confirmacao',
                        contentIcon: <WarningTwoIcon boxSize={8} color="red" />,
                        content: 'Tem certeza que deseja remover esta Conta? Esta e uma acao irreversivel!',
                    action: (uuid) => { router.push(`${ROUTES.CLIENT.EDIT}${uuid}`) },
                    callbackOnClose: () => {router.push(ROUTES.CLIENT.ROOT)},
                        actions: [
                            {
                                type: 'btn',
                                title: 'Confirmar',
                                colorScheme: 'red',
                                actionFieldParam: 'uuid',
                                action: (uuid) => dispatch(deleteContractModelById(uuid))
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