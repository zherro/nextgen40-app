import { FieldTypeEnum } from '../shared/enums/Field.enum';
import { TypeInputAddonEnum } from '../shared/enums/TypeInputAddon.enum';
import InputSideAddon from '../shared/types/InputSideAddon';

const inputHiddenHelper = (fieldId) => {
    return {
        id: fieldId,
        type: FieldTypeEnum.HIDDEN,
    }
}

const inputAddonInside = (addonConfig: any) => {

    if(addonConfig != undefined && addonConfig != null) {
        return {
            type: TypeInputAddonEnum.INSIDE,
            pointerEvents: 'none',
            child: addonConfig.child,
        }
    }

    return undefined;
}

const inputAddon = (addonConfig: any) => {

    if(addonConfig != undefined && addonConfig != null) {
        return {
            type: TypeInputAddonEnum.NORMAL,
            child: addonConfig.chield,
        }
    }

    return undefined;
}

const getInputAddon = (addonConfig: InputSideAddon) => {

    if(addonConfig == undefined || addonConfig == null
        || addonConfig.type == undefined || addonConfig.type == null
        || addonConfig.child == undefined || addonConfig.child == null) {
        return null;
    }

    switch (addonConfig.type) {
        case TypeInputAddonEnum.NORMAL:
            return inputAddon(addonConfig);
        case TypeInputAddonEnum.INSIDE:
            return inputAddonInside(addonConfig);
    
        default:
            return undefined;
    }
}

const inputNumberHelper = ({
    fieldId,
    title,
    sizeClass,
    size = 'md',
    leftAddon=null,
    rightAddon=null,
}) => {

    return {
        id: fieldId,
        title: title,
        type: FieldTypeEnum.NUMBER,
        sizeClass: sizeClass,
        maxW: '100%',
        step: 1,
        min: 1,
        precision: 0,
        size: size,
        leftAddonChildren: getInputAddon(leftAddon),
        rightAddonChildren: getInputAddon(rightAddon),
    };
}

const inputPriceHelper = ({
    fieldId,
    title,
    sizeClass,
    size = 'md',
    leftAddon=null,
    rightAddon=null,
}) => {

    return {
        id: fieldId,
        title: title,
        type: FieldTypeEnum.NUMBER,
        sizeClass: sizeClass,
        maxW: '100%',
        step: 1,
        min: 1.00,
        size: size,
        leftAddonChildren: getInputAddon(leftAddon),
        rightAddonChildren: getInputAddon(rightAddon),
    };
}

export {
    inputHiddenHelper,
    inputPriceHelper,
    inputNumberHelper
}