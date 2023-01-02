import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/layouts/default-layout";
import CrudLayout from '@/components/forms/crud-layout/crudLayout';
import { useRouter } from 'next/router';
import { ROUTES } from "@/core/config/app.environment";
import FormBuilder from '../../../../components/forms/write-form/index';
import { useDispatch, useSelector } from "react-redux";
import { getUserById, saveUser, updateUser } from '@/actions/users.action';
import { formFields, formActions, validationSchema, initialValues } from '../../../../page-actions/admin-user-form.action';

const FormRota = () => {
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
                title={action == 'new' ? 'Nova usuario' : 'Editar usuario'}
                pieces={[
                    { name: 'Configurar' },
                    { name: 'Usuarios', link: ROUTES.CONFIG_USER },
                    { name: 'Nova Usuario' },
                ]}
            >
                <FormBuilder
                    type="FORM"
                    callbackSuccess={(data) => router.push(ROUTES.CONFIG_USER_VIEW + data?.uuid)}
                    dispatch={(values) => editable ? dispatch(updateUser(action, values)) : dispatch(saveUser(values))}
                    dispatchRetrieveData={(id) => dispatch(getUserById(id))}
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

FormRota.getLayout = DefaultLayout;

export default FormRota;