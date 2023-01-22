import { buttonHelper, buttonSubmitHelper } from '@/components/forms/helpers/Button.helper';
import {
    inputHiddenHelper,
    inputNumberHelper,
    inputPriceHelper,
    switchInputHelper,
    switchOptionInputHelper
} from '@/components/forms/helpers/Field.helper';
import { TypeInputAddonEnum } from '@/components/forms/shared/enums/TypeInputAddon.enum';
import { ROUTES } from '@/core/config/app.environment';
import * as yup from 'yup';
import { FieldTypeEnum } from '../../components/forms/shared/enums/Field.enum';

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
        buttonHelper( 'Cancelar', 'red', () => router.push(ROUTES.CONFIG_CONTRACT_MODEL) ),
        buttonSubmitHelper( 'Salvar', 'green' )
    ];
}

const formFields = () => {

    const sizeOfNumberFields = 'col-sm-12 col-md-6 col-lg-4';
    const addonReal = {
        type: TypeInputAddonEnum.INSIDE,
        child: 'R$'
    };

    return [
        inputHiddenHelper('id'),
        inputHiddenHelper('uuid'),
        inputPriceHelper({
            fieldId: 'price',
            title: 'Valor Contrato: *',
            sizeClass: sizeOfNumberFields,
            leftAddon: addonReal,
        }),
        inputNumberHelper({
            fieldId: 'qtdQuotes',
            title: 'Quantidade de parcelas: *',
            sizeClass: sizeOfNumberFields,
        }), ,
        inputPriceHelper({
            fieldId: 'quotePrice',
            title: 'Valor da parcela: *',
            sizeClass: sizeOfNumberFields,
            leftAddon: addonReal,
        }),
        {
            id: 'description',
            title: 'Descrição:',
            type: FieldTypeEnum.TEXT_AREA,
            sizeClass: 'col-12'
        },

        switchInputHelper('onWeekend', 'Pode vencer em fim de semana?::', 'col-12',
            [switchOptionInputHelper('Sim', 'SIM', 'info'), switchOptionInputHelper('Não', 'NAO', 'info')]),

        switchInputHelper('tipoContrato', 'Tipo Contrato:', 'col-12',
            [switchOptionInputHelper('Mensal', 'MENSAL', 'info'), switchOptionInputHelper('Diário', 'DIARIO', 'info')]),

        switchInputHelper('status', 'Status:', 'col-12',
            [switchOptionInputHelper('Ativo', 'ACTIVE', 'success'), switchOptionInputHelper('Inativo', 'INACTIVE', 'danger')])
    ];
}

export {
    formFields,
    formActions,
    validationSchema,
    initialValues,
}