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
    name: '',
    docNumber: '',
    phone: '',
    job: '',
    workPlace: '',
    info: '',
    description: '',
    street: '',
    place: '',
    number: '',
    city: '',
    state: '',
    status: 'ACTIVE'
};

const validationSchema = () => {
    return yup.object().shape({
        name: yup.string().trim().required('Campo obrigatorio!'),
        status: yup.string().trim().required('Campo obrigatorio!'),
    });
}

const formActions = (router) => {
    return [
        buttonHelper( 'Cancelar', 'red', () => router.push(ROUTES.CLIENT) ),
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
        {
            id: 'name',
            title: 'Nome:',
            type: FieldTypeEnum.TEXT,
            sizeClass: 'col-12'
        },
        {
            id: 'docNumber',
            title: 'Documento:',
            type: FieldTypeEnum.TEXT,
            sizeClass: sizeOfNumberFields
        },
        {
            id: 'phone',
            title: 'Telefone:',
            type: FieldTypeEnum.TEXT,
            sizeClass: sizeOfNumberFields
        },
        {
            id: 'job',
            title: 'Profissão:',
            type: FieldTypeEnum.TEXT,
            sizeClass: sizeOfNumberFields
        },
        {
            id: 'workPlace',
            title: 'Local de Trabalho:',
            type: FieldTypeEnum.TEXT,
            sizeClass: sizeOfNumberFields
        },
        {
            id: 'street',
            title: 'Rua:',
            type: FieldTypeEnum.TEXT,
            sizeClass: sizeOfNumberFields
        },
        {
            id: 'place',
            title: 'Bairro:',
            type: FieldTypeEnum.TEXT,
            sizeClass: sizeOfNumberFields
        },
        {
            id: 'number',
            title: 'Number:',
            type: FieldTypeEnum.TEXT,
            sizeClass: sizeOfNumberFields
        },
        {
            id: 'city',
            title: 'Cidade:',
            type: FieldTypeEnum.TEXT,
            sizeClass: sizeOfNumberFields
        },
        {
            id: 'state',
            title: 'Estado:',
            type: FieldTypeEnum.TEXT,
            sizeClass: sizeOfNumberFields
        },
        {
            id: 'info',
            title: 'Obs:',
            type: FieldTypeEnum.TEXT_AREA,
            sizeClass: 'col-12'
        },

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