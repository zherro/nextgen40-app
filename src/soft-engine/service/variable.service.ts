import { nonEmpty, nonNull } from "./validation.service";

const findVarValueOf = (key, variables: any[]) => {

    if(nonEmpty(variables)) {
        let filter = variables.find( v => v.key == key);

        if(nonNull(filter)) {
            return filter?.value;
        }
    }   

    return undefined;
}

export {
   findVarValueOf
}