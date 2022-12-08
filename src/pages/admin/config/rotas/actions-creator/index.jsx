import { ROUTES } from '@/core/config/app.environment';
import * as yup from 'yup';

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
    { type: 'switch', id: 'status', title: 'Status'},
    { type: 'text', id: 'name', title: 'Nome/Descricao'},
    { type: 'text', id: 'description', title: 'Informacao'},
    { 
        type: 'table',
        header: ['', 'Em', 'Por'],
        fields: [
                    [{ value: 'Criado', type: 'print' }, {id: 'createdAt', type: 'date-time'}, { id: 'createdBy.username', type: 'nickname'}],
                    [{ value: 'Atualizado', type: 'print' }, {id: 'updatedAt', type: 'date-time'}, { id: 'updatedBy.username', type: 'nickname'}],
                    [{ value: 'Deletado', type: 'print' }, {id: 'deletedAt', type: 'date-time'}, { id: 'deletedBy.username', type: 'nickname'}],
                ]
    }
];

const formActions = () => {
    return [
        {
            type: 'btn',
            title: 'Cancelar',
            colorScheme: 'red',
            action: () => {}
        },
        {
            type: 'submit',
            title: 'Salvar',
            colorScheme: 'green',
        },
    ];
}

const viewActions = (router) => {
        return [
        {
            type: 'btn',
            title: 'Cancelar',
            colorScheme: 'red',            
            action: () => {router.push(ROUTES.CONFIG_ROTA)}
        },
        {
            type: 'btn',
            title: 'Ver todos',
            colorScheme: 'blue',
            action: () => {router.push(ROUTES.CONFIG_ROTA)}
        },
    ];
}

const formFields = () => {
    return [
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

export { formFields, formActions, viewActions, validationSchema, initialValues, dataMap }