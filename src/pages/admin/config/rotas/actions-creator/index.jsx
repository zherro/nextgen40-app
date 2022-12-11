import { ROUTES } from '@/core/config/app.environment';
import * as yup from 'yup';
import { EditIcon } from '@chakra-ui/icons';

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

const formActions = (router) => {
    return [
        {
            type: 'btn',
            title: 'Cancelar',
            colorScheme: 'red',
            action: () => {router.push(ROUTES.CONFIG_ROTA)}
        },
        {
            type: 'submit',
            title: 'Salvar',
            colorScheme: 'green',
        },
    ];
}

const viewActions = (router, uuid) => {
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
        },,
        {
            type: 'btn',
            icon: <EditIcon />,
            title: 'Editar',
            colorScheme: 'blue',
            action: () => {router.push(`${ROUTES.CONFIG_ROTA_EDIT}${uuid}`)}
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

export { formFields, formActions, viewActions, validationSchema, initialValues, dataMap }