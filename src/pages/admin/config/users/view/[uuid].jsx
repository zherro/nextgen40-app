import { getUserById } from "@/actions/users.action";
import CrudLayout from "@/components/forms/crud-layout/crudLayout";
import FormBuilder from "@/components/forms/write-form";
import DefaultLayout from "@/components/layouts/default-layout";
import { ROUTES } from "@/core/config/app.environment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataMap, viewActions } from "../../../../../page-actions/admin-user-view.action";

const RotaViewPage = () => {

    const router = useRouter();
    const { uuid } = router.query;

    const [ id, setId ] = useState();

    const dispatch = useDispatch();
    const { loadingData, data, dataError } = useSelector(state => state.crudReducer);

    useEffect(() => {
        if(uuid != undefined) {
            dispatch(getUserById(uuid));
        }
    }, [uuid]);

    return (
        <>
            <CrudLayout
                title={'Visualizar Usuario'}
                pieces={[
                    { name: 'Configurar' },
                    { name: 'Usuarios', link: ROUTES.CONFIG_USER },
                    { name: 'Vizualizar Usuario' },
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

RotaViewPage.getLayout = DefaultLayout;

export default RotaViewPage;