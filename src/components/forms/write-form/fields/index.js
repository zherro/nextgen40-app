import { FormLabel, Switch } from "@chakra-ui/react"

const errorField = (msg) => {
    console.log(msg)
    return <div className="text-danger small">{msg}</div>
}

const fieldText = (handleChange, field, values) => {
    return (
        <>
            <label className="form-label">{field?.title}</label>
            <input
                id={field.id}
                name={field.id}
                value={values[field.id]}
                onChange={handleChange}
                type={field?.type ? field?.type : 'text'}
                className="form-control"
                placeholder={field?.placeholder}
            />
        </>
    )
}

const fieldTextArea = (handleChange, field, values) => {
    return (
        <>
            <label className="form-label">{field?.title}</label>
            <textarea
                id={field.id}
                name={field.id}
                value={values[field.id]}
                onChange={handleChange}
                className="form-control"
                rows="3"
            ></textarea>
        </>
    );
}

const fieldSwitch = (field, values, setFieldValue) => {

    
    const select = (value) => {
        setFieldValue(field.id, value)
    }

    return (
        <>
            <div className="btn-group" role="group" >
                {
                    field?.options?.map((opt, idx) => 
                        <button
                            id={field.id}
                            name={field.id}
                            key={idx}
                            onClick={() => select(opt.value)}
                            type="button"
                            className={`btn btn-${opt.value !== values[field.id]  ? 'outline-' : ''}${opt?.type ? opt.type : 'primary'}`}
                        >
                            { opt.title }
                        </button>)
                }
            </div>
        </>
    )
}

const getField = (setFieldValue, handleChange, submitted, errors, values, field, idx) => {
    const getInput = () => {
        switch (field?.type) {
            case 'textarea':
                return fieldTextArea(handleChange, field, values);
            case 'switch':
                return fieldSwitch(field, values, setFieldValue)
            default:
                return fieldText(handleChange, field, values);
        }
    }

    return (
        <div key={idx} className={`${field?.sizeClass ? field?.sizeClass : 'col-12'} mb-3`}>
            {getInput()}
            {submitted && errors[field?.id] && errorField(errors[field?.id])}
        </div>
    );
}

export { getField };