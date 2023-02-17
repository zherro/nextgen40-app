
import { ROUTES } from '../../core/config/app.environment';
import { deleteContractModelById } from '@/actions/contractModel.action';
import viewActionsModel from '../view.action';

const dataMap = [
    { type: 'uuid', id: 'uuid', title: 'ID' },
    { type: 'text', id: 'id', title: 'Codigo' },
    { type: 'switch', id: 'status', title: 'Status' },
    { type: 'text', id: 'price', title: 'valor Contrato' },
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
    return viewActionsModel({
        router: router,
        confirmAction: (uuid) => dispatch(deleteContractModelById(uuid)),
        confirmMessage: 'Modelo de Contrato',
        appEnv: ROUTES.CONFIG_CONTRACT_MODEL,
    });
}

export {
    dataMap,
    viewActions
}