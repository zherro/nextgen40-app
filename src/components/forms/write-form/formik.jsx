import { Formik } from "formik";
import React from "react";
import GenericForm from './genericForm';

const FormikBuilder = ({
    formConfig,
    fetch,
    feedbackError,
    setFeedbackError,
    initialValues,
    submited,
    setSubmited,
    editable,
    data,

    setModalConfig,
    isOpen,
    onClose,
    onOpen,
}) => {
    const submit = async (values, { setSubmitting, resetForm }) => {
        await fetch(values);
    };

    return (
        <Formik
            validationSchema={formConfig?.validationSchema}
            initialValues={editable ? data : formConfig?.initialValues}
            enableReinitialize
            onSubmit={(values, { setSubmitting, resetForm }) => {
                submit(values, { setSubmitting, resetForm });
            }}
        >
            {(props) => (
               <GenericForm
                    {...props}
                    formConfig={formConfig}
                    feedbackError={feedbackError}
                    setFeedbackError={setFeedbackError}
                    submited={submited}
                    setSubmited={setSubmited}
               />
            )}
        </Formik>
    );
}

export default FormikBuilder;