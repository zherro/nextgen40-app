import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/layouts/default-layout";
import CrudLayout from '@/components/forms/crud-layout/crudLayout';
import { useRouter } from 'next/router';
import { ROUTES } from "@/core/config/app.environment";
import FormBuilder from '../../../../components/forms/write-form/index';
import { useDispatch, useSelector } from "react-redux";
import { getAccountOperationById, saveAccountOperation, updateAccountOperation } from '@/actions/accountOperation.action';
import { formFields, formActions, validationSchema, initialValues } from '../../../../page-actions/admin-accountOperation-form.action';

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
                title={action == 'new' ? 'Novo Tipo Operação' : 'Editar Tipo Operação'}
                pieces={[
                    { name: 'Configurar' },
                    { name: 'Tipo Operação', link: ROUTES.CONFIG_ACCOUNT_OPERATION },
                    { name: 'Novo Tipo' },
                ]}
            >
                <FormBuilder
                    type="FORM"
                    callbackSuccess={(data) => router.push(ROUTES.CONFIG_ACCOUNT_OPERATION_VIEW + data?.uuid)}
                    dispatch={(values) => editable ? dispatch(updateAccountOperation(action, values)) : dispatch(saveAccountOperation(values))}
                    dispatchRetrieveData={(id) => dispatch(getAccountOperationById(id))}
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