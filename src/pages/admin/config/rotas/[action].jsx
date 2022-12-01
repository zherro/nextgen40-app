import React from "react";
import DefaultLayout from "@/components/layouts/default-layout";
import CrudLayout from '@/components/forms/crud-layout/crudLayout';
import { useRouter } from 'next/router';
import { ROUTES } from "@/core/config/app.environment";
import FormBuilder from '../../../../components/forms/write-form/index';
import { useDispatch, useSelector } from "react-redux";
import { saveRota } from '@/actions/routes.action';
import { formFields, formActions, validationSchema, initialValues } from './actions-creator';

const FormRota = () => {
    const router = useRouter();
    const { action } = router.query;

    const dispatch = useDispatch();
    const { creatingRota, rota, rotaError } = useSelector(state => state.crudReducer)

    return (
        <>
            <CrudLayout
                title={action == 'new' ? 'Nova rota' : 'Editar rota'}
                pieces={[
                    { name: 'Configurar' },
                    { name: 'Rotas', link: ROUTES.CONFIG_ROTA },
                    { name: 'Nova Rota' },
                ]}
            >
                <FormBuilder
                    callbackSuccess={(data) => router.push(ROUTES.CONFIG_ROTA_VIEW + data?.uuid)}
                    dispatch={(values) => dispatch(saveRota(values))}
                    loading={creatingRota}
                    data={rota}
                    dataError={rotaError}
                    formConfig={{
                        fields: formFields(),
                        actions: formActions(),
                        validationSchema: validationSchema(),
                        initialValues: initialValues
                    }}
                />
            </CrudLayout>
        </>
    );
}

FormRota.getLayout = DefaultLayout;

export default FormRota;