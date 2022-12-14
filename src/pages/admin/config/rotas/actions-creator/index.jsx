import { ROUTES } from '@/core/config/app.environment';
import * as yup from 'yup';
import { DeleteIcon, EditIcon, QuestionOutlineIcon, WarningIcon, WarningTwoIcon, ViewIcon } from '@chakra-ui/icons';
import { deleteRotaById } from '@/actions/routes.action';
import { ACTION_CONDITIONS } from '@/components/forms/types/btn.types';

const initialValues = {
    name: '',
    description: '',
};

const validationSchema = () => {
    return yup.object().shape({
        name: yup.string().trim().required('Campo obrigatorio!'),
        status: yup.string().trim().required('Campo obrigatorio!')
    });
}

const dataMap = [
    { type: 'uuid', id: 'uuid', title: 'ID' },
    { type: 'text', id: 'id', title: 'Codigo' },
    { type: 'switch', id: 'status', title: 'Status' },
    { type: 'text', id: 'name', title: 'Nome/Descricao' },
    { type: 'text', id: 'description', title: 'Informacao' },
    {
        type: 'table',
        header: ['', 'Em', 'Por'],
        fields: [
            [{ value: 'Criado', type: 'print' }, { id: 'createdAt', type: 'date-time' }, { id: 'createdBy.username', type: 'nickname' }],
            [{ value: 'Atualizado', type: 'print' }, { id: 'updatedAt', type: 'date-time' }, { id: 'updatedBy.username', type: 'nickname' }],
            [{ value: 'Deletado', type: 'print' }, { id: 'deletedAt', type: 'date-time' }, { id: 'deletedBy.username', type: 'nickname' }],
        ]
    }
];

const formActions = (router) => {
    return [
        {
            type: 'btn',
            title: 'Cancelar',
            colorScheme: 'red',
            action: () => { router.push(ROUTES.CONFIG_ROTA) }
        },
        {
            type: 'submit',
            title: 'Salvar',
            colorScheme: 'green',
        },
    ];
}

const viewActions = (router, dispatch) => {
    return [
        {
            type: 'btn-with-confirmation',
            icon: <DeleteIcon />,
            title: 'Deletar',
            colorScheme: 'red',
            withConfirm: true,
            modal: {
                titleIcon: <QuestionOutlineIcon boxSize={6} mr={2} />,
                title: 'Confirmacao',
                contentIcon: <WarningTwoIcon boxSize={8} color="red" />,
                content: 'Tem certeza que deseja remover esta Rota? Esta e uma acao irreversivel!',
                actions: [
                    {
                        type: 'btn',
                        title: 'Confirmar',
                        colorScheme: 'red',
                        actionFieldParam: 'uuid',
                        action: (uuid) => dispatch(deleteRotaById(uuid))
                    },
                    {
                        type: 'close',
                        title: 'Cancelar',
                    },
                ]
            },
            modealType: 'request',
            action: () => { router.push(ROUTES.CONFIG_ROTA) },
            conditions: [
                {
                    type: ACTION_CONDITIONS.TYPE.NOT_EQUALS_FIELD,
                    field: 'status',
                    condition: 'DELETED'
                }
            ]
        },
        {
            type: 'btn',
            title: 'Ver todos',
            colorScheme: 'blue',
            action: () => { router.push(ROUTES.CONFIG_ROTA) },
        },
        {
            type: 'btn',
            icon: <EditIcon />,
            title: 'Editar',
            colorScheme: 'blue',
            actionFieldParam: 'uuid',
            action: (uuid) => { router.push(`${ROUTES.CONFIG_ROTA_EDIT}${uuid}`) },
            conditions: [
                {
                    type: ACTION_CONDITIONS.TYPE.NOT_EQUALS_FIELD,
                    field: 'status',
                    condition: 'DELETED'
                }
            ]
        },
    ];
}

const formFields = () => {
    return [

        {
            id: 'id',
            type: 'hidden',
        },
        {
            id: 'uuid',
            type: 'hidden',
        },
        {
            id: 'name',
            title: 'Nome/Descrição: *',
            type: 'text',
            sizeClass: 'col-12'
        },
        {
            id: 'description',
            title: 'Informação:',
            type: 'textarea',
            sizeClass: 'col-12'
        },
        {
            id: 'status',
            title: 'Status:',
            type: 'switch',
            sizeClass: 'col-12',
            options: [
                {
                    title: 'Ativo',
                    value: 'ACTIVE',
                    type: 'success',
                },
                {
                    title: 'Inativo',
                    value: 'INACTIVE',
                    type: 'danger',
                },
            ]
        }
    ];
}

const crudTableFilter = {
    size: 10,
}

const crudTableMap = (router, dispatch) => {
    return [
        {
            id: 'id',
            type: 'text'
        },
        {
            id: 'name',
            type: 'text'
        },
        {
            id: 'status',
            type: 'switch'
        },
        {
            id: 'createdAt',
            type: 'date-time'
        },
        {
            id: 'createdBy.username',
            type: 'nickname'
        },
        {
            id: 'action',
            type: 'action',
            actions: [
                {
                    type: 'btn-ghost',
                    colorScheme: 'blue',
                    icon: <ViewIcon boxSize={4} color='blue' />,
                    actionFieldParam: 'uuid',
                    action: (uuid) => { router.push(`${ROUTES.CONFIG_ROTA_VIEW}${uuid}`) }
                },
                {
                    type: 'btn-ghost',
                    colorScheme: 'blue',
                    icon: <EditIcon boxSize={4} color='blue' />,
                    actionFieldParam: 'uuid',
                    action: (uuid) => { router.push(`${ROUTES.CONFIG_ROTA_EDIT}${uuid}`) },
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
                    action: (uuid) => { router.push(`${ROUTES.CONFIG_ROTA_DELETE}${uuid}`) },
                    withConfirm: true,
                    modal: {
                        titleIcon: <QuestionOutlineIcon boxSize={6} mr={2} />,
                        title: 'Confirmacao',
                        contentIcon: <WarningTwoIcon boxSize={8} color="red" />,
                        content: 'Tem certeza que deseja remover esta Rota? Esta e uma acao irreversivel!',
                    action: (uuid) => { router.push(`${ROUTES.CONFIG_ROTA_DELETE}${uuid}`) },
                    callbackOnClose: () => {router.push(ROUTES.CONFIG_ROTA)},
                        actions: [
                            {
                                type: 'btn',
                                title: 'Confirmar',
                                colorScheme: 'red',
                                actionFieldParam: 'uuid',
                                action: (uuid) => dispatch(deleteRotaById(uuid))
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
    formFields,
    formActions,
    viewActions,
    validationSchema,
    initialValues,
    dataMap,
    crudTableMap,
    crudTableFilter
}