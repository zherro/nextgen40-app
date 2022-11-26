import {
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerContent
} from "@chakra-ui/react";
import React from "react";
import useTranslation from '@/hooks/useTranslations';

/**
 * -To implmentent, declare consts im parent component
 * 
 *      const [size, setSize] = React.useState('')
 *      const { isOpen, onOpen, onClose } = useDisclosure()
 * 
 * 
 * - for define size of drawer use any on this
 * 
 *  sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full']
 * 
 * and for menu item use:

    [
        {
            action: () => {},
            icon: <SameIconConponent />,
            name: "Menu Item Name"
        }
    ]
 * 
 * 
 */

const DrawMenu = ({ onClose, isOpen, size, title, type, itens, logout }) => {

    const { t } = useTranslation();

    const GridMenu = () => {
        return (
            <>
                <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 400 }}>
                    {
                        itens?.map(item => {
                            return (
                                <>
                                    <div onClick={item?.action}>
                                        <div>{item?.icon}</div>
                                        <div>{item?.name}</div>
                                    </div>
                                </>
                            );
                        })
                    }
                </div>
                <div className="d-flex justify-content-center">
                    <button onClick={() => logout()} type="text" className="btn btn-outline-danger" style={{ width: 150 }}>
                        {t.logout}
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Drawer onClose={onClose} isOpen={isOpen} size={size}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{title}</DrawerHeader>
                    <DrawerBody>
                        {type == "GRID" && <GridMenu />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default DrawMenu;