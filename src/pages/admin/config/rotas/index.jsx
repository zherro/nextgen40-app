import React from "react";
import CrudLayout from "@/components/forms/crud-layout/crudLayout";
import DefaultLayout from "@/components/layouts/default-layout";
import ResponsiveTable from "@/components/responsiveTable";
import { useRouter } from 'next/router';
import { ROUTES } from "@/core/config/app.environment";

const ConfigRotaPage = () => {
    const router = useRouter();
    
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
                data={{
                    head: [
                        {title: 'Name'},
                        {title: 'Status'},
                        {title: 'Types'},
                        {title: 'Last Updated At'},
                        {title: 'Country'},
                    ],
                    rows: [
                        [
                            {
                                id: 'name',
                                text: 'Developer Zahid',
                                grid: 12,
                                gridRow: 2,
                            },
                            {
                                id: 'status',
                                text: 'Active',
                                grid: 23,
                            },
                            {
                                id: 'types',
                                text: 'Jul 17, 2021, 01:14 PM',
                                grid: 23,
                            },
                            {
                                id: 'updatedAt',
                                text: 'Jul 17, 2021, 01:14 PM',
                                grid: 23,
                            },
                            {
                                id: 'Country',
                                text: 'Bangladesh',
                                grid: '3-1',
                                gridRow: 2,
                            },
                        ],
                        [
                            {
                                id: 'name',
                                text: 'Developer Zahid',
                                grid: 12,
                                gridRow: 2,
                            },
                            {
                                id: 'status',
                                text: 'Active',
                                grid: 23,
                            },
                            {
                                id: 'types',
                                text: 'Jul 17, 2021, 01:14 PM',
                                grid: 23,
                            },
                            {
                                id: 'updatedAt',
                                text: 'Jul 17, 2021, 01:14 PM',
                                grid: 23,
                            },
                            {
                                id: 'Country',
                                text: 'Bangladesh',
                                grid: '3-1',
                                gridRow: 2,
                            },
                        ],
                    ]
                }}
            />
            </CrudLayout>
        </>
    )
}

ConfigRotaPage.getLayout = DefaultLayout;

export default ConfigRotaPage;