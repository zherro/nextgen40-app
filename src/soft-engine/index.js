import React from "react";
import SoftEngine from "./engine";

/**
 * Main container of Flow Engine. In this flow all components are rendered.
 * 
 * @param { config } - task configurations
 * 
 * @returns SoftEngineContainer component container
 */

const SoftEngineContainer = ({
    taskConfig
}) => {
    return <>
        <SoftEngine
            taskConfig={taskConfig}
        />
    </>
}

export default SoftEngineContainer;