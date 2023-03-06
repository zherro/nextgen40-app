const isNull = (object: any) => {
    return object == null || object == undefined;
}

const nonNull = (object: any) => {
    return !isNull(object);
}

const isEmpty = (object: any[]) => {
    return isNull(object) || object.length <= 0;
}

const nonEmpty = (object: any[]) => {
    return !isEmpty(object);
}

const isBlank = (object: string) => {
    return isNull(object) || object.length <= 0;
}

const notBlank = (object: string) => {
    return !isBlank(object);
}

export {
    isNull,
    nonNull,
    isEmpty,
    nonEmpty,
    isBlank,
    notBlank,
};