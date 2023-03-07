import operationService from "./service/operation.service";

const SoftEngine = ({
    taskConfig
}) => {

    return operationService(taskConfig);
}

export default SoftEngine;