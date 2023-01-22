import React from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
} from "@chakra-ui/react";

const ConfirmationModal = ({
    isOpen,
    onClose,
    modalConfig,
    data,
}) => {
    const close = () => {
        onClose();
        if(modalConfig?.callbackOnClose) {
            modalConfig?.callbackOnClose();
        }
    }

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {
                            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                {modalConfig?.titleIcon} {modalConfig?.title}
                            </div>
                        }
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {
                            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <div style={{marginRight: '1em'}}>
                                    {modalConfig?.contentIcon}
                                </div>
                                <div>
                                    {modalConfig?.content}
                                </div>
                            </div>
                        }                        
                    </ModalBody>

                    <ModalFooter>
                        {
                            modalConfig?.actions?.map((action, idx) => {
                                if(action?.type == 'close') {
                                    return (
                                        <Button
                                            ml={3}
                                            colorScheme={action?.colorScheme}
                                            key={idx}
                                            onClick={close}
                                        >
                                            { action?.title }
                                        </Button>
                                    );
                                }

                                return (
                                    <Button
                                        ml={3}
                                        colorScheme={action?.colorScheme}
                                        key={idx}
                                        onClick={() => {
                                            if(action?.actionFieldParam) {
                                                action?.action(data[action.actionFieldParam]);
                                            } else {
                                                action?.action();
                                            }
                                            close();
                                        }}
                                    >
                                        { action?.title }
                                    </Button>);
                            })
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ConfirmationModal;