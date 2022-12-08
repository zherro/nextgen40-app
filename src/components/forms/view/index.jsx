import React from "react";
import { arrayDateConverter } from '../forms.helper';
import { Wrap, Spacer, Alert, AlertIcon } from '@chakra-ui/react';
import { getBtnAction } from "../write-form/action-btn";

const ViewFormContainer = ({
    dataMap,
    data,
    submited,
    feedbackError,
    formConfig,
}) => {


    const buildText = (field, values) => {
        return (
            <>
                <div className="col-sm-12 col-md-3">
                    <b>{field?.title}</b>
                </div>
                <div className="col-sm-12 col-md-9">
                    {values && values?.[field.id]}
                </div>
            </>
        )
    }

    const buildSwitch = (field, values) => {
        return (
            <>
                <div className="col-sm-12 col-md-3">
                    <b>{field?.title}</b>
                </div>
                <div className="col-sm-12 col-md-9">
                    <span class={`badge ${values && values?.[field.id] == 'ACTIVE' ? 'text-bg-success' : 'text-bg-danger'}`}>
                        {values && values?.[field.id] == 'ACTIVE' ? 'ATIVO' : 'INATIVO'}
                    </span>
                </div>
            </>
        )
    }

    const buildDateTime = (field, values) => {

        const dateValue = arrayDateConverter(values?.[field.id]);

        return (
            <>
                <div className="col-sm-12 col-md-3">
                    <b>{field?.title}</b>
                </div>
                <div className="col-sm-12 col-md-9">
                    {values && dateValue}
                </div>
            </>
        )
    }

    const getFieldData = (values, field) => {
        let treeField = field.split('.');
        let tempValue = values;

        for (let i = 0; i < treeField.length; i++) {
            tempValue = tempValue[treeField[i]];
        }
        return tempValue;
    }

    const getFieldValue = (field, values) => {
        switch (field.type) {
            case 'date-time':
                return arrayDateConverter(getFieldData(values, field?.id));
            case 'print':
            default:
                return field.value;
        }
    }

    const buildSimpleTable = (table, values) => {
        if (table == undefined || table == null) {
            return (
                <div>
                    <p>Tabela nao configurada!</p>
                </div>
            );
        } else {
            return (
                <div className="col-12">
                    <table className="table table-responsive table-striped table-hover">
                        <thead>
                            <tr>
                                {
                                    table?.header?.map((header, idx) => {
                                        return <th key={idx} scope="col">{header}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                table?.fields?.map((rows, idx) => {
                                    return (
                                        <tr>
                                            {rows?.map((column, idx) => {
                                                return <td key={idx}> {getFieldValue(column, values)} </td>
                                            })}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
    }


    const getFieldView = (field, idx, values) => {
        const getInput = () => {
            switch (field?.type) {
                case 'switch':
                    return buildSwitch(field, values);
                case 'date-time':
                    return buildDateTime(field, values);
                case 'table':
                    return buildSimpleTable(field, values);
                case 'textarea':
                default:
                    return buildText(field, values);
            }
        }

        return (
            <div key={idx} className="row mb-3"  >
                {getInput()}
            </div>
        );
    }

    return (
        <div className="row p-0 m-0 mt-3">
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
                    dataMap?.map((fieldMap, idx) => getFieldView(fieldMap, idx, data))
                }

                <div className="col-12 bg-white pt-2 pb-3">
                    <Wrap spacing={4} gap='2' >
                        <Spacer />
                        {
                            formConfig?.actions?.map((action, idx) => getBtnAction(() => {}, action, idx))
                        }
                    </Wrap>
                </div>
            </div>

        </div>
    );
}

export default ViewFormContainer;