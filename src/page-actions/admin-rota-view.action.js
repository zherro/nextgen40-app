
import { ROUTES } from '../core/config/app.environment';
import { ACTION_CONDITIONS, CRUD_ACTION } from '@/components/forms/types/btn.types';
import { FORM_TYPE } from '@/components/forms/types/form.types';
import { DeleteIcon, EditIcon, QuestionOutlineIcon, ViewIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { deleteRotaById } from '@/actions/routes.action';

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

export {
    dataMap,
    viewActions
}