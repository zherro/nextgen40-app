import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormikBuilder from './formik';
import { pushToast } from '@/core/actions/toast.action';
import ViewFormContainer from "../view";

const FormBuilder = ({
    type,
    dataMap,
    formConfig,

    dispatch,
    loading,
    data,
    dataError,
    successMsg,

    callbackSuccess,
    callbackError,

}) => {
    const [feedbackError, setFeedbackError] = useState({});
    const [submited, setSubmited] = useState(false);
    const [vizualizeForm, setVizualizeForm] = useState(false);
    const dispatchForm = useDispatch();

    useEffect(() => {
        
        if (submited && !loading) {

            if (!loading && data !== undefined && data !== null) {
                setFeedbackError({});

                if (type === 'FORM' && callbackSuccess !== undefined) {
                    callbackSuccess(data);
                    if (successMsg) {
                        dispatchForm(pushToast({
                            msg: successMsg,
                            status: 'success',
                        }))
                    }
                } else if (type === 'VIEW') {
                    setVizualizeForm(true)
                }
            } else if (dataError) {
                console.log(dataError)
                if (callbackError !== undefined) {
                    callbackError(dataError);
                }
                setFeedbackError(dataError);
                setVizualizeForm(true)
            }
        }
    }, [loading, data, dataError])


    useEffect(() => {
        if(type === 'VIEW' && !vizualizeForm && !loading ) {
            fetchDataToView();
        }
    }, [])

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
                    formConfig={formConfig}
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
                    />
                )                
            }
        </>
    );
}

export default FormBuilder;