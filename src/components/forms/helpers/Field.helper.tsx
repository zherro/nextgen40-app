import { FieldType } from '../shared/enums/Field.enum';

const inputHiddenHelper = (fieldId) => {
    return {
        id: fieldId,
        type: FieldType.HIDDEN,
    }
}

const inputAddonInside = (children: any) => {

    if(children != undefined) {
        return {
            pointerEvents: 'none',
            color: 'gray.300',
            fontSize: '1.2em',
            children: children,
        }
    }

    return undefined;
}

const inputPriceHelper = ({
    fieldId,
    title,
    sizeClass,
    size = 'md',
    variant = 'filled',
    leftAddon=null,
    rightAddon=null,
}) => {
    return {
        id: fieldId,
        title: title,
        type: FieldType.NUMBER,
        sizeClass: sizeClass,
        maxW: '100%',
        step: 1,
        defaultValue: 0,
        min: 1,
        max: 99999999999999,
        precision: 2,
        size: size,
        variant: variant,
        leftAddonChildren: inputAddonInside(leftAddon),
        rightAddonChildren: inputAddonInside(rightAddon),
    };
}

export {
    inputHiddenHelper,
    inputAddonInside,
    inputPriceHelper
}