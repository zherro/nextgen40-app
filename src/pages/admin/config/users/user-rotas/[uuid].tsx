import { getUserById } from "@/actions/users.action";
import CrudLayout from "@/components/forms/crud-layout/crudLayout";
import FormBuilder from "@/components/forms/write-form";
import DefaultLayout from "@/components/layouts/default-layout";
import { ROUTES } from "@/core/config/app.environment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataMap, viewActionsResume, dataMapResume } from "../../../../../page-actions/admin-user-view.action";
import { retrieveRoutesActives, sendAuthorizedRoutesForUser } from "@/actions/routes.action";
import { Checkbox, CheckboxGroup, Stack, useCheckboxGroup } from "@chakra-ui/react";

const UserRotaConfigPage = () => {

    const router = useRouter();
    const { uuid } = router.query;

    const dispatch = useDispatch();
    const { loadingData, data, dataError, creatingData, dataCreated, dataCreateError } = useSelector(state => state.crudReducer);
    const { loadingActiveRoutes, activeRoutes, routesActiveError } = useSelector(state => state.routesReducer);

    const { value, setValue, getCheckboxProps } = useCheckboxGroup();

    useEffect(() => {
        if (uuid != undefined) {
            dispatch(getUserById(uuid));
            dispatch(retrieveRoutesActives())
        }
    }, [uuid]);

    useEffect(() => {
        setValue(getValues(data))
    }, [data]);

    useEffect(() => {
        if(!creatingData && dataCreated) {
            setValue(getValues(dataCreated))
        }
    }, [creatingData, dataCreated]);

    const getValues = (dataUser) => {
        let v = [];
        if (dataUser !== undefined) {
            for (let i = 0; i < dataUser?.rotas?.length; i++) {
                v.push(dataUser?.rotas[i]?.uuid)
            }
        }
        return v;
    }

    const sendRoutesByUser = () => {
        const data = {
            user: uuid,
            routes: value,
        }

        dispatch(sendAuthorizedRoutesForUser(data));
    }

    return (
        <>
            <CrudLayout
                title={'Autorizar Rotas Usuario'}
                pieces={[
                    { name: 'Configurar' },
                    { name: 'Usuarios', link: ROUTES.CONFIG_USER },
                    { name: 'Autorizar Rotas Usuario' },
                ]}
            >
                <FormBuilder
                    type="VIEW"
                    dispatch={() => { }}
                    dataMap={dataMapResume}
                    data={data}
                    loading={ loadingData || loadingActiveRoutes }
                    dataError={ dataError || dataCreateError || routesActiveError }
                    formConfig={{
                        actions: viewActionsResume(router,  dispatch)
                    }}
                />
            </CrudLayout>
            <div className="row mt-3">
                <div className="w-100 rounded-1 border border-1 mx-3" style={{ flexShrink: 'inherit' }}>
                    <div className="col-12">
                        <p className="fs-4 px-4">
                            Rotas
                        </p>
                    </div>
                    <div className="col-12 pb-3">
                        {
                            data !== undefined &&
                            <CheckboxGroup colorScheme='green' defaultValue={getValues(data)} >
                                <Stack pl={6} mt={1} spacing={1}>
                                    {
                                        activeRoutes?.map((route, idx) => {
                                            return (
                                                    <Checkbox
                                                        key={idx}
                                                        {...getCheckboxProps({ value: route?.uuid })}
                                                    >
                                                        {route.name}
                                                    </Checkbox>
                                            )
                                        })
                                    }
                                </Stack>
                            </CheckboxGroup>
                        }
                    </div>
                </div>
            </div>
            <div className="col-12 text-end p-3">
                <button type="button" onClick={() => sendRoutesByUser()} class="btn btn-success">Enviar</button>
            </div>
        </>
    );
}

UserRotaConfigPage.getLayout = DefaultLayout;

export default UserRotaConfigPage;