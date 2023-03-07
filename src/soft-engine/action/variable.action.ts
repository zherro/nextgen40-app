import { nonNull } from "../service/validation.service";
import { findVarValueOf } from "../service/variable.service"
import pullValue from "./value.cation";

/**
 * Header
 *
 * @class Header
 * @extends {React.Component}
 */
const actionVarStyleClass = (variables) => {
    let styleClass = findVarValueOf('styleClass', variables);

    return nonNull(styleClass) ? styleClass : '';
}

const actionVarTitleSize = (variables) => {
    let titleSize = findVarValueOf('titleSize', variables);

    return nonNull(titleSize) ? titleSize?.val : 'h1';
}

const actionVarTextStyle = (variables) => {
    let textStyle = findVarValueOf('textStyle', variables);

    return nonNull(textStyle) ? textStyle : '';
}

const actionVarValue = (taskConfig, variables) => {
    let value = findVarValueOf('value', variables);

    switch (value?.type) {
        case 'DEFAULT':
                return pullValue(taskConfig, value);
        default:
            return undefined;
    }
}

export {
    actionVarStyleClass,
    actionVarTitleSize,
    actionVarTextStyle,
    actionVarValue
}