import React, { useEffect, useState } from "react";
import CrudLayout from "@/components/forms/crud-layout/crudLayout";
import FormBuilder from "@/components/forms/write-form";
import DefaultLayout from "@/components/layouts/default-layout";
import { ROUTES } from "@/core/config/app.environment";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { dataMap, viewActions } from "../../../page-actions/clients/view.action";
import { getClientById } from "@/actions/clients.action";

const ClientViewPage = () => {

    const router = useRouter();
    const { uuid } = router.query;

    const dispatch = useDispatch();
    const { loadingData, data, dataError } = useSelector(state => state.crudReducer);

    useEffect(() => {
        if(uuid != undefined) {
            dispatch(getClientById(uuid));
        }
    }, [uuid]);

    return (
        <>
            <CrudLayout
                title={'Visualizar Cliente'}
                pieces={[
                    { name: 'Cadastro' },
                    { name: 'Clientes', link: ROUTES.CLIENT.ROOT},
                    { name: 'Vizualizar' },
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

ClientViewPage.getLayout = DefaultLayout;

export default ClientViewPage;