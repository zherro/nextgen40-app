import React from "react";
import LangSwitcher from '@/components/lang-switcher/LangSwitcher';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useTranslation from '@/hooks/useTranslations';
import { logoutAuth } from '@/actions/login.action';
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router';
import { ROUTES } from "../../core/config/app.environment";

const DefaultLayout = (page) => {
    const router = useRouter();
    const { t } = useTranslation();

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
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        aria-label='Options'
                                        icon={<HamburgerIcon />}
                                        variant='outline'
                                    />
                                    <MenuList>
                                        <MenuItem onClick={() => logout()} icon={<CloseIcon />} >
                                            { t.logout }
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                            <div className="float-end">
                                <LangSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div style={{ paddingTop: 70 }}>
                <div className="container">
                    {page}
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;