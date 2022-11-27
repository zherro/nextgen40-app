import React from "react";
import LangSwitcher from '@/components/lang-switcher/LangSwitcher';
import { useDisclosure } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import useTranslation from '@/hooks/useTranslations';
import { logoutAuth } from '@/actions/login.action';
import {  HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router';
import { ROUTES } from "../../core/config/app.environment";
import DrawMenu from "./components/draw-menu";
import ContentLoader from "./components/content-loader";

const DefaultLayout = (page) => {
    const router = useRouter();
    const { t } = useTranslation();
    const { loadingContent, contentLoadError } = useSelector(state => state.contentReducer)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const logout = () => {
        logoutAuth();
        router.push(ROUTES.LOGIN);
    }

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
            <div style={{ paddingTop: 70, minHeight: '100vh' }}>
                <div className="container" style={{minHeight: '100%'}}>
                   { loadingContent &&  <ContentLoader /> }
                   { !loadingContent && page }                   
                </div>
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
                logout={logout}
            />
        </>
    );
}

export default DefaultLayout;