import React, { useEffect, useState } from "react";
import CrudLayout from "@/components/forms/crud-layout/crudLayout";
import DefaultLayout from "@/components/layouts/default-layout";
import { useRouter } from 'next/router';
import { ROUTES } from "@/core/config/app.environment";
import { getRotaAll } from "@/actions/routes.action";
import { useDispatch, useSelector } from "react-redux";
import { crudTableMap } from "./actions-creator";
import FormBuilder from '@/components/forms/write-form';

const ConfigRotaPage = () => {
    const router = useRouter();
    const [load, setLoad] = useState(true);

    const dispatch = useDispatch();
    const { loadingRotaList, rotas, rotaListError } = useSelector(state => state.crudReducer);

    useEffect(() => {
        setLoad(false);
        dispatch(getRotaAll({}))
    }, [load]);


    return (
        <>
            <CrudLayout
                title="Rotas"
                pieces={[
                    { name: 'Configurar' },
                    { name: 'Rotas' },
                ]}
                actions={[
                    {
                        type: 'add',
                        title: 'Adicionar',
                        onClick: () => { router.push(ROUTES.CONFIG_ROTA_NEW) },
                    }
                ]}
            >
                <FormBuilder
                    type="RESPONSIVE_TABLE"
                    tableMap={{
                        head: [
                            { title: '#ID' },
                            { title: 'Nome' },
                            { title: 'Status' },
                            { title: 'Criado em', hideWhen: 900 },
                            { title: 'Criado Por' },
                            { title: 'Acoes' },
                        ],
                        rows: crudTableMap(router, dispatch)
                    }}
                    data={rotas?.content}
                    loading={loadingRotaList}
                    dataError={rotaListError}
                />
            </CrudLayout>
        </>
    )
}

ConfigRotaPage.getLayout = DefaultLayout;

export default ConfigRotaPage;