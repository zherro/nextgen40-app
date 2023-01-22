import { TypeInputAddonEnum } from "../enums/TypeInputAddon.enum";

export default interface InputSideAddon {
    type: TypeInputAddonEnum;
    pointerEvents: any;
    color: string;
    fontSize: string;
    child: any;
}

