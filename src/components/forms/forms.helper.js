
const arrayDateConverter = (date) => {
    return date && date.length > 0
        ? `${date[0]}-${('' + date[1]).padStart(2, 0)}-${('' + date[2]).padStart(2, 0)} ${('' + date[3]).padStart(2, 0)}:${('' + date[4]).padStart(2, 0)}:${('' + date[5]).padStart(2, 0)}`
        : null
}

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

const getBadgeClass = (field, values) => {
    if(values && values?.[field.id] == 'ACTIVE') {
        return 'text-bg-success';
    } else if(values && values?.[field.id] == 'INACTIVE') {
        return 'text-bg-danger';
    } else if(values && values?.[field.id] == 'DELETED') {
        return 'text-bg-secondary';
    } else {
        return 'text-bg-warning';
    }
}

const getBadgeValue = (field, values) => {
    if(values && values?.[field.id] == 'ACTIVE') {
        return 'ATIVO';
    } else if(values && values?.[field.id] == 'INACTIVE') {
        return 'INATIVO';
    } else if(values && values?.[field.id] == 'DELETED') {
        return 'Excluido';
    } else {
        return 'indefinido';
    }
}

const buildSwitch = (field, values) => {
    return (
        <>
            <div className="col-sm-12 col-md-3">
                <b>{field?.title}</b>
            </div>
            <div className="col-sm-12 col-md-9">
                <span className={`badge ${ getBadgeClass(field, values) }`}>
                    { getBadgeValue(field, values) }
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
                                    <tr key={idx}>
                                        {rows?.map((column, idxc) => {
                                            return <td key={idxc}> {getFieldValue(column, values)} </td>
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


const getFieldData = (values, field) => {
    let treeField = field.split('.');
    let tempValue = values;

    for (let i = 0; i < treeField.length; i++) {
        if (!tempValue || tempValue == undefined || tempValue == null) {
            tempValue = '';
            break;
        }
        tempValue = tempValue[treeField[i]];
    }
    return tempValue;
}

const getFieldValue = (field, values) => {

    switch (field.type) {
        case 'date-time':
            return arrayDateConverter(getFieldData(values, field?.id));
        case 'nickname':
            let value = getFieldData(values, field?.id);
            return values && value !== undefined && ('' + value).length > 0 ? `@${value}` : '';
        case 'text':
            return getFieldData(values, field?.id);
        case 'switch':
            return (
                <span className={`badge ${ getBadgeClass(field, values) }`}>
                    { getBadgeValue(field, values) }
                </span>
            )
        case 'print':
        default:
            return field?.value;
    }
}

export {
    arrayDateConverter,
    getFieldValue,
    getFieldView,
};