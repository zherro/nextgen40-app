import React from "react";
import CrudLayout from "@/components/forms/crud-layout/crudLayout";
import DefaultLayout from "@/components/layouts/default-layout";
import { useRouter } from 'next/router';
import { getAccountAll } from "@/actions/account.action";
import { useDispatch, useSelector } from "react-redux";
import { tableFilterConfig, tableHead, tableRowsConfig, tableAction } from "../../../../page-actions/admin-account-table.action";
import { FORM_TYPE } from '@/components/forms/types/form.types';
import FormBuilder from '@/components/forms/write-form';
import useTranslations from "@/hooks/useTranslations";

const ConfigAccountPage = () => {
    const router = useRouter();
    const { lang, t } = useTranslations();

    const dispatch = useDispatch();
    const { loadingDataList, dataList, dataListError } = useSelector(state => state.crudReducer);

    return (
        <>
            <CrudLayout
                title={"Configurar Contas"}
                pieces={[
                    { name: t.config },
                    { name: "Contas" },
                ]}
            >
                <FormBuilder
                    type={FORM_TYPE.RESPONSIVE_TABLE}
                    dispatch={(params) => dispatch(getAccountAll(params))}
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

ConfigAccountPage.getLayout = DefaultLayout;

export default ConfigAccountPage;