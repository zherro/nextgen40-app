
const pullValue = ( taskConfig, value ) => {

    switch (value?.val) {
        case 'TASK_NAME':
            return taskConfig?.name;
    }
}

export default pullValue;