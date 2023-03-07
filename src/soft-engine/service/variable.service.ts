import { nonEmpty, nonNull } from "./validation.service";

const findVarValueOf = (key, variables: any[]) => {

    if(nonEmpty(variables)) {
        let filter = variables.find( v => v.name == key);

        if(nonNull(filter)) {
            return { val: filter?.value, type: filter?.type };
        }
    }   

    return undefined;
}

export {
   findVarValueOf
}