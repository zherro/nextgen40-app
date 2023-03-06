import { nonNull } from "../service/validation.service";
import { findVarValueOf } from "../service/variable.service"

/**
 * Header
 *
 * @class Header
 * @extends {React.Component}
 */
const actionVarTitleStyle = (variables) => {
    let titleSize = findVarValueOf('titleSize', variables);
    
    return nonNull(titleSize) ? titleSize : 'h3';
}

export {
    actionVarTitleStyle
}