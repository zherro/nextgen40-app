import React from "react";
import CrudLayout from "@/components/forms/crud-layout/crudLayout";
import DefaultLayout from "@/components/layouts/default-layout";
import { useRouter } from 'next/router';
import { getClientAll } from "@/actions/clients.action";
import { useDispatch, useSelector } from "react-redux";
import { tableFilterConfig, tableHead, tableRowsConfig, tableAction } from "../../page-actions/clients/table.action";
import FormBuilder from '@/components/forms/write-form';
import useTranslations from "@/hooks/useTranslations";
import { FORM_TYPE } from "@/components/forms/shared/types/form.type";

const ClientsPage = () => {
    const router = useRouter();
    const { lang, t } = useTranslations();

    const dispatch = useDispatch();
    const { loadingDataList, dataList, dataListError } = useSelector(state => state.crudReducer);

    return (
        <>
            <CrudLayout
                title={"Cadastrar Clientes"}
                pieces={[
                    { name: t.config },
                    { name: "Clientes" },
                ]}
            >
                <FormBuilder
                    type={FORM_TYPE.RESPONSIVE_TABLE}
                    dispatch={(params) => dispatch(getClientAll(params))}
                    data={dataList}
                    loading={loadingDataList}
                    dataError={dataListError}
                    
                    tableConfig={{
                        actions: tableAction(t, router),
                        withFilter: true,
                        tableFilter: tableFilterConfig(t),
                        tableMap: {
                            head: tableHead,
                            rows: tableRowsConfig(router, dispatch)
                        },
                    }}
                />
            </CrudLayout>
        </>
    )
}

ClientsPage.getLayout = DefaultLayout;

export default ClientsPage;