import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/layouts/default-layout";
import CrudLayout from '@/components/forms/crud-layout/crudLayout';
import { useRouter } from 'next/router';
import { ROUTES } from "@/core/config/app.environment";
import FormBuilder from '../../../../components/forms/write-form/index';
import { useDispatch, useSelector } from "react-redux";
import { getContractModelById, saveContractModel, updateContractModel } from '@/actions/contractModel.action';
import { formFields, formActions, validationSchema, initialValues } from '../../../../page-actions/contractModel/form.action';

const FormAccount = () => {
    const router = useRouter();
    const { action } = router.query;
    const [editable, setEditable] = useState(action !== 'new');

    useEffect(() => {
        setEditable(action !== 'new');
    }, [action])

    const dispatch = useDispatch();
    const { creatingData, dataCreated, dataCreateError, loadingData, data, dataError } = useSelector(state => state.crudReducer);

    return (
        <>
            <CrudLayout
                title={action == 'new' ? 'Novo Modelo Contrato' : 'Editar Modelo Contrato'}
                pieces={[
                    { name: 'Configurar' },
                    { name: 'Modelo Contrato', link: ROUTES.CONFIG_ACCOUNT },
                    { name: 'Novo Modelo Contrato' },
                ]}
            >
                <FormBuilder
                    type="FORM"
                    callbackSuccess={(data) => router.push(ROUTES.CONFIG_ACCOUNT_VIEW + data?.uuid)}
                    dispatch={(values) => editable ? dispatch(updateContractModel(action, values)) : dispatch(saveContractModel(values))}
                    dispatchRetrieveData={(id) => dispatch(getContractModelById(id))}
                    loading={ editable ? loadingData : creatingData }
                    data={
                        editable && data && data !== undefined && data !== null
                        ? data
                        : !editable && dataCreated && dataCreated !== undefined && dataCreated !== null ? dataCreated : {}
                    }
                    editable={editable}
                    editId={action}
                    dataError={ editable ? dataError : dataCreateError }
                    formConfig={{
                        fields: formFields(),
                        actions: formActions(router),
                        validationSchema: validationSchema(),
                        initialValues: initialValues
                    }}
                />
            </CrudLayout>
        </>
    );
}

FormAccount.getLayout = DefaultLayout;

export default FormAccount;