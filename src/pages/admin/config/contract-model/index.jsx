import React from "react";
import CrudLayout from "@/components/forms/crud-layout/crudLayout";
import DefaultLayout from "@/components/layouts/default-layout";
import { useRouter } from 'next/router';
import { getContractModelAll } from "@/actions/contractModel.action";
import { useDispatch, useSelector } from "react-redux";
import { tableFilterConfig, tableHead, tableRowsConfig, tableAction } from "../../../../page-actions/contractModel/table.action";
import FormBuilder from '@/components/forms/write-form';
import useTranslations from "@/hooks/useTranslations";
import { FORM_TYPE } from "@/components/forms/shared/types/form.type";

const ConfigContractModelPage = () => {
    const router = useRouter();
    const { lang, t } = useTranslations();

    const dispatch = useDispatch();
    const { loadingDataList, dataList, dataListError } = useSelector(state => state.crudReducer);

    return (
        <>
            <CrudLayout
                title={"Configurar de Modelo de Contrato"}
                pieces={[
                    { name: t.config },
                    { name: "Modelos de Contrato" },
                ]}
            >
                <FormBuilder
                    type={FORM_TYPE.RESPONSIVE_TABLE}
                    dispatch={(params) => dispatch(getContractModelAll(params))}
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

ConfigContractModelPage.getLayout = DefaultLayout;

export default ConfigContractModelPage;