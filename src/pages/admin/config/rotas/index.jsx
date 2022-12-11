import React, { useEffect, useState } from "react";
import CrudLayout from "@/components/forms/crud-layout/crudLayout";
import DefaultLayout from "@/components/layouts/default-layout";
import ResponsiveTable from "@/components/forms/responsiveTable";
import { useRouter } from 'next/router';
import { ROUTES } from "@/core/config/app.environment";
import { getRotaAll } from "@/actions/routes.action";
import { useDispatch, useSelector } from "react-redux";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";

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
                    {name: 'Configurar'},
                    {name: 'Rotas'},
                ]}
                actions={[
                    {
                        type: 'add',
                        title: 'Adicionar',
                        onClick: () => { router.push(ROUTES.CONFIG_ROTA_NEW) },
                    }
                ]}
            >
            
            <ResponsiveTable
                data={rotas?.content}
                config={{
                    head: [
                        {title: '#ID'},
                        {title: 'Nome'},
                        {title: 'Status'},
                        {title: 'Criado em', hideWhen: 900},
                        {title: 'Criado Por'},
                        {title: 'Acoes'},
                    ],
                    rows: [
                            {
                                id: 'id',
                                type: 'text'
                            },
                            {
                                id: 'name',
                                type: 'text'
                            },
                            {
                                id: 'status',
                                type: 'switch'
                            },
                            {
                                id: 'createdAt',
                                type: 'date-time'
                            },
                            {
                                id: 'createdBy.username',                                
                                type: 'nickname'
                            },
                            {      
                                id: 'action',                 
                                type: 'action',
                                actions: [
                                    {
                                        type: 'btn-ghost',
                                        colorScheme: 'blue',
                                        icon: <ViewIcon boxSize={4} color='blue' />,
                                        actionFieldParam: 'uuid',
                                        action: (uuid) => {router.push(`${ROUTES.CONFIG_ROTA_VIEW}${uuid}`)}
                                    },
                                    {
                                        type: 'btn-ghost',
                                        colorScheme: 'blue',
                                        icon: <EditIcon boxSize={4} color='blue' />,
                                        actionFieldParam: 'uuid',
                                        action: (uuid) => {router.push(`${ROUTES.CONFIG_ROTA_EDIT}${uuid}`)}
                                    },
                                    {
                                        type: 'btn-ghost',
                                        colorScheme: 'red',
                                        icon: <DeleteIcon boxSize={4} color='red' />,
                                        actionFieldParam: 'uuid',
                                        action: (uuid) => {router.push(`${ROUTES.CONFIG_ROTA_DELETE}${uuid}`)}
                                    },
                                ]
                            },
                        ]
                }}
            />
            </CrudLayout>
        </>
    )
}

ConfigRotaPage.getLayout = DefaultLayout;

export default ConfigRotaPage;