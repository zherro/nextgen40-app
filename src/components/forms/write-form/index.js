import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormikBuilder from './formik';
import { pushToast } from '@/core/actions/toast.action';

const FormBuilder = ({
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
    const dispatchForm = useDispatch();

    useEffect(() => {

        
        if (submited && !loading) {

            if (!loading && data !== undefined && data !== null) {
                setFeedbackError({});

                if (callbackSuccess !== undefined) {
                    callbackSuccess(data);
                    if (successMsg) {
                        dispatchForm(pushToast({
                            msg: successMsg,
                            status: 'success',
                        }))
                    }
                }
            } else if (dataError) {
                if (callbackError !== undefined) {
                    callbackError(dataError);
                }
                console.log(dataError)
                setFeedbackError(dataError);
            }
        }
    }, [loading, data, dataError])

    const fetchData = (values) => {
        if (submited) {
            dispatch(values);
        }
    }

    return (
        <FormikBuilder
            feedbackError={feedbackError}
            setFeedbackError={setFeedbackError}
            fetch={fetchData}
            submited={submited}
            setSubmited={setSubmited}
            formConfig={formConfig}
        />
    );
}

export default FormBuilder;