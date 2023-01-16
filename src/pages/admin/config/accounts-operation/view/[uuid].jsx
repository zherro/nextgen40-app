import React, { useEffect } from "react";
import { getAccountOperationById } from "@/actions/accountOperation.action";
import CrudLayout from "@/components/forms/crud-layout/crudLayout";
import FormBuilder from "@/components/forms/write-form";
import DefaultLayout from "@/components/layouts/default-layout";
import { ROUTES } from "@/core/config/app.environment";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { dataMap, viewActions } from "../../../../../page-actions/admin-accountOperation-view.action";

const AccountViewPage = () => {

    const router = useRouter();
    const { uuid } = router.query;

    const dispatch = useDispatch();
    const { loadingData, data, dataError } = useSelector(state => state.crudReducer);

    useEffect(() => {
        if(uuid != undefined) {
            dispatch(getAccountOperationById(uuid));
        }
    }, [uuid]);

    return (
        <>
            <CrudLayout
                title={'Visualizar Tipo de Operação'}
                pieces={[
                    { name: 'Configurar' },
                    { name: 'Tipos de Operação', link: ROUTES.CONFIG_ACCOUNT_OPERATION },
                    { name: 'Vizualizar Tipo Operação' },
                ]}
            >
                <FormBuilder
                    type="VIEW"
                    dispatch={() => {}}
                    dataMap={dataMap}
                    data={data}
                    loading={loadingData}
                    dataError={dataError}
                    formConfig={{
                        actions: viewActions(router,  dispatch)
                    }}
                />
            </CrudLayout>
        </>
    );
}

AccountViewPage.getLayout = DefaultLayout;

export default AccountViewPage;