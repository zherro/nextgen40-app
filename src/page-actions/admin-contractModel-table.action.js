
import { ROUTES } from '../core/config/app.environment';
import { ACTION_CONDITIONS, CRUD_ACTION } from '@/components/forms/types/btn.types';
import { FORM_TYPE } from '@/components/forms/types/form.types';
import { DeleteIcon, EditIcon, QuestionOutlineIcon, ViewIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { deleteContractModelById } from '@/actions/contractModel.action';

const tableAction = (t, router) => {
    return [
        {
            type: CRUD_ACTION.ADD,
            title: t.add,
            onClick: () => { router.push(ROUTES.CONFIG_CONTRACT_MODEL_NEW) },
        }
    ];
}

const tableFilterConfig = (t) => {
    return {
        size: 10,
        withClearButton: true,
        placeholder: "ID, valor ou descrição",
        minSearch: 3,
        minSearchAlert: t.minSearchText
    }
}

const tableHead = [
    { title: '#ID' },
    { title: 'Valor' },
    { title: 'Qtd. Parcela' },
    { title: 'Vl. Parcela' },
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
            id: 'price',
            type: FORM_TYPE.FIELD.TEXT
        },
        {
            id: 'qtdQuotes',
            type: FORM_TYPE.FIELD.TEXT
        },
        {
            id: 'quotePrice',
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
                    action: (uuid) => { router.push(`${ROUTES.CONFIG_CONTRACT_MODEL_VIEW}${uuid}`) }
                },
                {
                    type: 'btn-ghost',
                    colorScheme: 'blue',
                    icon: <EditIcon boxSize={4} color='blue' />,
                    actionFieldParam: 'uuid',
                    action: (uuid) => { router.push(`${ROUTES.CONFIG_CONTRACT_MODEL_EDIT}${uuid}`) },
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
                    action: (uuid) => { router.push(`${ROUTES.CONFIG_CONTRACT_MODEL_DELETE}${uuid}`) },
                    withConfirm: true,
                    modal: {
                        titleIcon: <QuestionOutlineIcon boxSize={6} mr={2} />,
                        title: 'Confirmacao',
                        contentIcon: <WarningTwoIcon boxSize={8} color="red" />,
                        content: 'Tem certeza que deseja remover esta Conta? Esta e uma acao irreversivel!',
                    action: (uuid) => { router.push(`${ROUTES.CONFIG_CONTRACT_MODEL_DELETE}${uuid}`) },
                    callbackOnClose: () => {router.push(ROUTES.CONFIG_CONTRACT_MODEL)},
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