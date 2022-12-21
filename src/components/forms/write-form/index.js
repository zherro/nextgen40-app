import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormikBuilder from './formik';
import { pushToast } from '@/core/actions/toast.action';
import ViewFormContainer from "../view";
import { useDisclosure } from "@chakra-ui/react";
import ConfirmationModal from '../modal/confirmation-modal';
import ResponsiveTable from '../responsiveTable';

const FormBuilder = ({
    type,
    dataMap,
    actions,
    formConfig,
    tableConfig,

    dispatch,
    dispatchRetrieveData,
    loading,
    data,
    editable,
    editId,
    dataError,
    successMsg,

    callbackSuccess,
    callbackError,

}) => {
    const [ feedbackError, setFeedbackError ] = useState({});
    const [ submited, setSubmited ] = useState(false);
    const [ vizualizeForm, setVizualizeForm ] = useState(false);
    const [ modalConfig, setModalConfig ] = useState({});
    const [ modalData, setModalData ] = useState({});
    const [ params, setParams ] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatchForm = useDispatch();

    useEffect(() => {
        if(editId != undefined && editable && !loading) {
            dispatchRetrieveData(editId);
        }
    }, [editable, editId])


    useEffect(() => {
        
        if (submited && !loading) {

            if (!dataError && !loading && data !== undefined && data !== null) {
                setFeedbackError({});
                setSubmited(false);

                if (type === 'FORM' && callbackSuccess !== undefined) {
                    callbackSuccess(data);
                    if (successMsg) {
                        dispatchForm(pushToast({
                            msg: successMsg,
                            status: 'success',
                        }))
                    }
                } else if (type === 'VIEW') {
                    setVizualizeForm(true);
                }
            } else if (dataError) {
                console.log('ERROR aqui')
                console.log(dataError)
                if (callbackError !== undefined) {
                    callbackError(dataError);
                }
                setFeedbackError(dataError);
                setVizualizeForm(true)
            }
        }

        if(dataError && type == 'RESPONSIVE_TABLE') {
            console.log('ERROR aqui')
            console.log(dataError)
            if (callbackError !== undefined) {
                callbackError(dataError);
            }
            setFeedbackError(dataError);
        }
    
    }, [loading, data, dataError])


    useEffect(() => {
        if(type === 'VIEW' && !vizualizeForm && !loading ) {
            fetchDataToView();
        }
        if(type == 'RESPONSIVE_TABLE') {
            fetchDataToTable();
        }
    }, [])

    const fetchDataToTable = async () => {
        dispatch(buildParams(0, ''));
    }

    const buildParams = (page, filter) => {
        return {
            size: (tableConfig?.tableFilter && tableConfig?.tableFilter?.size ? tableConfig?.tableFilter?.size : 20),
            page: page,
            filter: filter,
        }
    }

    const fetchDataToView = () => {
        console.log('teste 1111')
        setSubmited(true);
        dispatch();
    }

    const fetchData = (values) => {
        console.log('teste 222222')
        if (submited) {
            dispatch(values);
        }
    }

    const navigateToPage = async (page, filter) => {
        dispatch(buildParams(page, filter));
    }

    return (
        <>
            {
            type == 'FORM' &&
                <FormikBuilder
                    feedbackError={feedbackError}
                    setFeedbackError={setFeedbackError}
                    fetch={fetchData}
                    submited={submited}
                    setSubmited={setSubmited}
                    editable={editable}
                    data={data}
                    formConfig={formConfig}

                    setModalConfig={setModalConfig}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                /> 
            }
            {
                type == 'VIEW' && vizualizeForm && (
                    <ViewFormContainer
                        feedbackError={feedbackError}
                        setFeedbackError={setFeedbackError}
                        fetch={fetchDataToView}
                        data={data}
                        dataMap={dataMap}
                        submited={submited}
                        setSubmited={setSubmited}
                        formConfig={formConfig}

                        setModalConfig={setModalConfig}
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        setModalData={setModalData}
                    />
                )                
            }
            {
                type == 'RESPONSIVE_TABLE' && (
                    <ResponsiveTable
                        data={data}
                        config={tableConfig?.tableMap}
                        filter={tableConfig?.tableFilter}
                        feedbackError={feedbackError}
                        setFeedbackError={setFeedbackError}
                        setModalData={setModalData}
                        actions={tableConfig?.actions}
                        withFilter={tableConfig?.withFilter}

                        setModalConfig={setModalConfig}
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}

                        navigateToPage={(page, filter) => navigateToPage(page, filter)}
                    />
                )                
            }

            <ConfirmationModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={() => {
                    setSubmited(true);
                    onClose();
                }}
                data={modalData}
                modalConfig={modalConfig}
            />
        </>
    );
}

export default FormBuilder;