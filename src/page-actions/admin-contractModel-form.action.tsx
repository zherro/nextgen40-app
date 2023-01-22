import { inputHiddenHelper, inputPriceHelper } from '@/components/forms/helpers/Field.helper';
import { ROUTES } from '@/core/config/app.environment';
import * as yup from 'yup';

const initialValues = {
    price: '',
    qtdQuotes: '',
    tipoContrato: 'MENSAL',
    onWeekend: 'SIM',
    status: 'ACTIVE'
};

const validationSchema = () => {
    return yup.object().shape({
        price: yup.string().trim().required('Campo obrigatorio!'),
        qtdQuotes: yup.string().trim().required('Campo obrigatorio!'),
        quotePrice: yup.string().trim().required('Campo obrigatorio!'),
        status: yup.string().trim().required('Campo obrigatorio!'),
        tipoContrato: yup.string().trim().required('Campo obrigatorio!'),
        onWeekend: yup.string().trim().required('Campo obrigatorio!')
    });
}

const formActions = (router) => {
    return [
        {
            type: 'btn',
            title: 'Cancelar',
            colorScheme: 'red',
            action: () => { router.push(ROUTES.CONFIG_CONTRACT_MODEL) }
        },
        {
            type: 'submit',
            title: 'Salvar',
            colorScheme: 'green',
        },
    ];
}


const formFields = () => {

    const sizeOfNumerFields = 'col-sm-12 col-md-4';

    return [
        inputHiddenHelper('id'),
        inputHiddenHelper('uuid'),
        inputPriceHelper({
            fieldId: 'price',
            title: 'Valor Contrato: *',
            sizeClass: sizeOfNumerFields,
        }),
        {
            id: 'qtdQuotes',
            title: 'Quantidade de parcelas:',
            type: 'text',
            sizeClass: 'col-sm-12 col-md-4'
        },
        {
            id: 'quotePrice',
            title: 'Valor da parcela:',
            type: 'text',
            sizeClass: 'col-sm-12 col-md-4'
        },
        {
            id: 'qtdQuotes',
            title: 'Quantidade de parcelas:',
            type: 'text',
            sizeClass: 'col-sm-12 col-md-4'
        },
        {
            id: 'description',
            title: 'Descrição:',
            type: 'text',
            sizeClass: 'col-12'
        },
        {
            id: 'onWeekend',
            title: 'Pode vencer em fim de semana?:',
            type: 'switch',
            sizeClass: 'col-12',
            options: [
                {
                    title: 'Sim',
                    value: 'SIM',
                    type: 'info',
                },
                {
                    title: 'Não',
                    value: 'NAO',
                    type: 'info',
                },
            ]
        },
        {
            id: 'tipoContrato',
            title: 'Status:',
            type: 'switch',
            sizeClass: 'col-12',
            options: [
                {
                    title: 'Mensal',
                    value: 'MENSAL',
                    type: 'info',
                },
                {
                    title: 'Diário',
                    value: 'DIARIO',
                    type: 'info',
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