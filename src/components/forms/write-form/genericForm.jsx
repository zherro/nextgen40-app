import React from "react";
import { Wrap, Spacer, Alert, AlertIcon } from '@chakra-ui/react';
import { getField } from './fields';
import { getBtnAction } from './action-btn';

const GenericForm = ({
    formConfig,
    handleSubmit,
    submitForm,
    values,
    handleChange,
    errors,
    setValues,
    setFieldValue,
    isSubmitting,
    resetForm,
    feedbackError,
    setFeedbackError,
    submited,
    setSubmited
}) => {

    const handleBtnSubmit = (e) => {
        console.log('summiiiiit')
        // e.preventDefault();
        setSubmited(true);
        submitForm();
    };

    return (
        <div className="row p-0 m-0 mt-3">
            {
                submited && feedbackError && feedbackError.message && (
                    <Alert status='error'>
                        <AlertIcon />
                        { feedbackError.message }
                    </Alert>
                )
            }
            <div className="col-12 bg-white pt-2">
                {
                    formConfig?.fields?.map((field, idx) => getField(setFieldValue, handleChange, submited, errors, values, field, idx))
                }
            </div>
            <div className="col-12 bg-white pt-2 pb-3">
                <Wrap spacing={4} gap='2' >
                    <Spacer />
                    {
                        formConfig?.actions?.map((action, idx) => getBtnAction(handleBtnSubmit, action, idx))
                    }
                </Wrap>
            </div>
        </div>
    );

}

export default GenericForm;