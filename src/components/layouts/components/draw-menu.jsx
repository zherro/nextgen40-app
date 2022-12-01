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
            groupId: id,
            groupName: 'name'
            itens: [
                {
                    action: () => {},
                    icon: <SameIconConponent />,
                    name: "Menu Item Name"
                },
            ]
        },
    ]
 * 
 * 
 */

const DrawMenu = ({ onClose, isOpen, size, title, type, groups, logout }) => {

    const { t } = useTranslation();

    const GridMenu = () => {
        return (
            <>
                <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 400 }}>
                    {
                        groups?.map(item => {
                            return item.show &&
                                (
                                    <>
                                        <div key={item.groupId} className="row">
                                            <div className="col-12 p-0 mb-2" style={{ borderBottom: 'solid 1px #999' }}>
                                                <p className="text-secondary" style={{ width: '100%' }}>
                                                    {item.groupName}
                                                </p>
                                            </div>
                                            {item.itens.map((i, idx) => {
                                                return i.show &&
                                                    <div key={idx} className="col-12 p-0 mb-2 py-2" style={{ cursor: 'pointer', borderBottom: 'solid 1px #CCC' }}>
                                                        <div onClick={() => i.action()} >
                                                            {i.name}
                                                        </div>
                                                    </div>
                                            })}
                                        </div>
                                    </>
                                );
                        })
                    }
                </div>
                <div className="d-flex justify-content-center mt-5">
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
                    <DrawerHeader>
                        <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 400 }}>
                            {title}
                        </div>
                    </DrawerHeader>
                    <DrawerBody>
                        {type == "GRID" && <GridMenu />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default DrawMenu;