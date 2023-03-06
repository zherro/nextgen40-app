import React, { useEffect } from "react";
import LangSwitcher from '@/components/lang-switcher/LangSwitcher';
import { Icon, useDisclosure, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from '@/hooks/useTranslations';
import { logoutAuth } from '@/actions/login.action';
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router';
import DrawMenu from "./components/draw-menu";
import ContentLoader from "./components/content-loader";
import { ROUTES } from '@/core/config/app.environment';
import { userHasRole } from "@/helpers/service.helper";
import { STORAGE_KEYS } from "@/core/config/api.environment";
import { MdFace } from 'react-icons/md';

const DefaultLayout = (page) => {
    const router = useRouter();
    const { t } = useTranslation();
    const toast = useToast()
    const { loadingContent, contentLoadError } = useSelector(state => state.contentReducer);
    const { showToast, messageToast} = useSelector(state => state.toastReducer);
    const { loggingIn, logout } = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const logoutAction = () => {
        dispatch(logoutAuth());
        router.push(ROUTES.LOGIN);
    }

    useEffect(() => {
        if(!loggingIn && logout && localStorage.getItem(STORAGE_KEYS.LOGOUT)) {
            dispatch(logoutAuth());
        }
    }, [logout])

    useEffect(() => {
        if(showToast) {
            toast({
                title: messageToast.msg,
                status: messageToast.status,
                isClosable: true,
            })
        }
    }, [showToast])

    return (
        <>
            <nav className="shadow-sm navbar navbar-light bg-light position-absolute top-0 start-0 w-100">
                <div className="container">
                    <div className="row w-100">
                        <div className="col-12">
                            <a className="navbar-brand" href="#">NextGen 4.0</a>
                            <div className="float-end">
                                <button onClick={() => onOpen()} type="button" className="btn btn-outline-secondary">
                                    <HamburgerIcon />
                                </button>
                            </div>
                            <div className="float-end">
                                <LangSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div style={{ paddingTop: 70, minHeight: '100vh'}}>
                <div className="container" style={{minHeight: '90hv'}}>
                   { page }                  
                </div>
                {  loadingContent && <ContentLoader /> }
            </div>

            {
                isOpen &&
                <div className="position-absolute text-center" style={{ bottom: 16, left: 0, right: 0, zIndex: 2000 }}>
                    <button onClick={() => onClose()} type="text" className="btn btn-outline-dark w-100" style={{ maxWidth: 300 }}>
                        {t.closeMenu}
                    </button>
                </div>
            }

            <DrawMenu
                type="GRID"
                title={t.menu}
                isOpen={isOpen}
                onClose={onClose}
                size="full"
                logout={logoutAction}
                groups={[
                    {
                        groupId: 'configurar',
                        groupName: 'Configurar',
                        show: userHasRole('CONFIG'),
                        itens: [
                            {
                                show: userHasRole('CONFIG_ROTA'),
                                action: () => router.push(ROUTES.CONFIG_ROTA),
                                icon: <SettingsIcon />,
                                name: "Configurar ROTA"
                            },
                            {
                                show: userHasRole('CONFIG_ROTA'),
                                action: () => router.push(ROUTES.CONFIG_ACCOUNT),
                                icon: <SettingsIcon />,
                                name: "Configurar Contas"
                            },
                            {
                                show: userHasRole('CONFIG_ROTA'),
                                action: () => router.push(ROUTES.CONFIG_ACCOUNT_OPERATION),
                                icon: <SettingsIcon />,
                                name: "Configurar Tipo de Movimentos"
                            },
                            {
                                show: userHasRole('CONFIG_ROTA'),
                                action: () => router.push(ROUTES.CONFIG_CONTRACT_MODEL.ROOT),
                                icon: <SettingsIcon />,
                                name: "Configurar Modelos de Contrato"
                            },
                        ]
                    },
                    {
                        groupId: 'cadastro',
                        groupName: 'Cadastro',
                        show: userHasRole('CONFIG'),
                        itens: [
                            {
                                show: userHasRole('CONFIG_ROTA'),
                                action: () => router.push(ROUTES.CLIENT.ROOT),
                                icon: <Icon as={MdFace}  w={4} h={4} />,
                                name: "Cadastro Clientes"
                            },
                        ]
                    },
                ]}
            />
        </>
    );
}

export default DefaultLayout;