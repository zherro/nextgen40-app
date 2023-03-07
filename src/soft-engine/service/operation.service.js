import { actionVarValue } from "../action/variable.action";
import SoftEngineComponents from "../components";
import { isEmpty, isNull } from "./validation.service";

const operationService = (
    taskConfig
) => {

    const EMPTY = <></>;

    const loadComponent = (config, key) => {
        let value = actionVarValue(taskConfig, config?.variables);

        return SoftEngineComponents(config?.variables, config?.type, value);
    }

    if (isNull(taskConfig) || isEmpty(taskConfig?.operations)) {
        return EMPTY;
    }

    return (
        <>
            {
                taskConfig?.operations?.map((config, idx) => loadComponent(config, idx))
            }
        </>
    )
}

export default operationService;