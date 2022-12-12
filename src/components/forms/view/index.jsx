import React, { useEffect, useState } from "react";
import { getFieldView } from '../forms.helper';
import { Wrap, Spacer, Alert, AlertIcon } from '@chakra-ui/react';
import { getBtnAction } from "../write-form/action-btn";

const ViewFormContainer = ({
    dataMap,
    data,
    submited,
    feedbackError,
    setFeedbackError,
    setModalData,
    formConfig,

    setModalConfig,
    isOpen,
    onClose,
    onOpen,
}) => {

    const [viewError, setViewError] = useState(null);
    
    useEffect(() => {
        setModalData(data);
    }, [data])

    return (
        <div className="row p-0 m-0 mt-3">
            {
                viewError && (
                    <Alert status='error'>
                        <AlertIcon />
                        {viewError.message}
                    </Alert>
                )
            }
            {
                submited && feedbackError && feedbackError.message && (
                    <Alert status='error'>
                        <AlertIcon />
                        {feedbackError.message}
                    </Alert>
                )
            }
            <div className="col-12 bg-white pt-2">
                {
                    data && dataMap?.map((fieldMap, idx) => getFieldView(fieldMap, idx, data))
                }

                <div className="col-12 bg-white pt-2 pb-3">
                    <Wrap spacing={4} gap='2' >
                        <Spacer />
                        {
                            formConfig?.actions?.map((action, idx) => getBtnAction(
                                () => { },
                                action,
                                idx,
                                data,
                                setViewError,

                                setModalConfig,
                                isOpen,
                                onClose,
                                onOpen
                            ))
                        }
                    </Wrap>
                </div>
            </div>

        </div>
    );
}

export default ViewFormContainer;