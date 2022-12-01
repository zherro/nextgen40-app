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
    { type: 'date-time', id: 'createsAt', title: 'Criado em'},
    { type: 'date-time', id: 'updatedAt', title: 'Atualizado em'},
    { type: 'date-time', id: 'deletedAt', title: 'Excluido em'},
    { type: 'switch', id: 'status', title: 'Status'},
    { type: 'text', id: 'name', title: 'Nome/Descricao'},
    { type: 'text', id: 'description', title: 'Informacao'},
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

export { formFields, formActions, validationSchema, initialValues }