
import { ROUTES } from '../../core/config/app.environment';
import { deleteClientById } from '@/actions/clients.action';
import viewActionsModel from '../view.action';

const dataMap = [
    { type: 'uuid', id: 'uuid', title: 'ID' },
    { type: 'text', id: 'id', title: 'Codigo' },
    { type: 'switch', id: 'status', title: 'Status' },
    { type: 'text', id: 'name', title: 'Nome' },
    { type: 'text', id: 'docNumber', title: 'Documento' },
    { type: 'text', id: 'phone', title: 'Telefone' },
    { type: 'text', id: 'job', title: 'Profissão' },
    { type: 'text', id: 'workPlace', title: 'Local de Trabalho' },
    { type: 'text', id: 'info', title: 'Obs' },
    { type: 'text', id: 'street', title: 'Rua' },
    { type: 'text', id: 'place', title: 'Bairro' },
    { type: 'text', id: 'number', title: 'Numero' },
    { type: 'text', id: 'city', title: 'cidade' },
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
    return viewActionsModel({
        router: router,
        confirmAction: (uuid) => dispatch(deleteClientById(uuid)),
        confirmMessage: 'Cliente',
        appEnv: ROUTES.CLIENT,
    });
}

export {
    dataMap,
    viewActions
}