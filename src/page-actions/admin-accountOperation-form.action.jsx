import { ROUTES } from '@/core/config/app.environment';
import * as yup from 'yup';

const initialValues = {
    name: '',
    description: '',
    status: 'ACTIVE'
};

const validationSchema = () => {
    return yup.object().shape({
        name: yup.string().trim().required('Campo obrigatorio!'),
        operationType: yup.string().trim().required('Campo obrigatorio!'),
        status: yup.string().trim().required('Campo obrigatorio!')
    });
}

const formActions = (router) => {
    return [
        {
            type: 'btn',
            title: 'Cancelar',
            colorScheme: 'red',
            action: () => { router.push(ROUTES.CONFIG_ACCOUNT_OPERATION) }
        },
        {
            type: 'submit',
            title: 'Salvar',
            colorScheme: 'green',
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
            id: 'operationType',
            title: 'Tipo movimento:',
            type: 'switch',
            sizeClass: 'col-12',
            options: [
                {
                    title: 'Entrada',
                    value: 'IN',
                    type: 'success',
                },
                {
                    title: 'Saida',
                    value: 'OUT',
                    type: 'danger',
                },
            ]
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

export {
    formFields,
    formActions,
    validationSchema,
    initialValues,
}