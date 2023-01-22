import { ROUTES } from '@/core/config/app.environment';
import * as yup from 'yup';

const initialValues = {
    username: '',
    email: '',
    status: '',
    password: '',
};

const validationSchema = () => {
    return yup.object().shape({
        username: yup.string().trim().required('Campo obrigatorio!'),
        email: yup.string().trim().required('Campo obrigatorio!'),
        status: yup.string().trim().required('Campo obrigatorio!')
    });
}

const formActions = (router) => {
    return [
        {
            type: 'btn',
            title: 'Cancelar',
            colorScheme: 'red',
            action: () => { router.push(ROUTES.CONFIG_USER) }
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
            id: 'username',
            title: 'Usuario: *',
            type: 'text',
            sizeClass: 'col-12'
        },
        {
            id: 'email',
            title: 'email: *',
            type: 'email',
            sizeClass: 'col-12'
        },
        {
            id: 'password',
            title: 'Senha: ** (Obrigatorio ao cadastrar, para editar deixar em branco para nao alterar a senha)',
            type: 'password',
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

export {
    formFields,
    formActions,
    validationSchema,
    initialValues,
}