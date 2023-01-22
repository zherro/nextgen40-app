import React, { ReactElement, useEffect } from "react";
import InputSideAddon from '../shared/types/InputSideAddon';
import {
    HStack,
    Button,
    Input,
    InputRightAddon,
    InputLeftAddon,
    InputGroup,
} from '@chakra-ui/react';

/**
### InputNumber Fields

 maxW: tamanho maximo da largura do InputNumber. Ex: maxW='320px'

 `step` = numero de aumento e decremeto do valor do imput. Ex: 0.01, assim cada aumento ou decremento sera de 0.01
 `defaultValue`: valor default do input, valor incial. Ex: 1.53
 `min`: valor minimo do input
 `max`: valor maximo do input
 `precision`: numero de casas decimais
 `value: valor do vield, form control
 `setValue: change value function
 `size`: size of input 
    {       
        xs (24px)
        sm (32px)
        md (40px)
        lg (48px)
    }
 `variant` -> The input component comes in 4 variants: `outline`, `unstyled`, `flushed`, and `filled`. Pass the variant prop and set it to one of these values.

 `leftAddonChildren` and `rightAddonChildren`:
    pointerEvents: If the left or right is an icon or text, you can pass pointerEvents="none" to InputLeftElement or InputRightElement to ensure that clicking on them focused the input.
        type Property.PointerEvents = "fill" | "none" | CSS.Globals | "auto" | "stroke" | "all" | "painted" | "visible" | "visibleFill" | "visiblePainted" | "visibleStroke"
    
    color: hexadecimal code or name color;
    fontSize: font size in em. Ex: size='1.2em'
    children: string or icon component;
    
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const InputNumber = ({
    id,
    name,
    className,

    maxW = '320px',
    step = 0.01,
    defaultValue = 0.00,
    min = -99999999999999.99,
    max = 99999999999999.99,
    precision = 2,
    milionSeparator = ' ',
    value = 0.00,
    setValue = (id, e) => { },
    onChange = (e) => { },
    size = 'md',
    variant = '',

    leftAddonChildren = null,
    rightAddonChildren = null,
}) => {

    useEffect(() => {
        if (value == null || value == undefined) {
            value = defaultValue;
            maskValue(defaultValue);
        }

        if(+value < min) {
            maskValue(min.toFixed(precision));
        }

        if(+value > max) {
            maskValue(max.toFixed(precision));
        }
    }, [value])

    const getInputAddon = (data: any, side: string = 'LEFT'): ReactElement => {

        if (data && data != null && data != undefined) {
            let input: InputSideAddon = {
                type: data?.type,
                pointerEvents: data?.pointerEvents ? data?.pointerEvents : '',
                color: data?.color ? data?.color : 'gray.500',
                fontSize: data?.fontSize ? data?.fontSize : '1.2em',
                child: data?.child ? data?.child : '',
            };

            console.log(data.child)

            if (side === 'LEFT') {
                return (
                    <InputLeftAddon
                        pointerEvents={input.pointerEvents}
                        color={input.color}
                        fontSize={input.fontSize}
                        children={input.child}
                    />
                );
            } else {
                return (
                    <InputRightAddon
                        pointerEvents={input.pointerEvents}
                        color={input.color}
                        fontSize={input.fontSize}
                        children={input.child}
                    />
                );
            }
        }

        return (<></>);
    }

    const getValue = () => {

        if (value == null || value == undefined) {
            value = defaultValue;
            setValue(id, defaultValue);
        }

        return processValue(value);
    }

    const processValue = (value) => {

        let isNegative = ('' + value).indexOf('-') >= 0;
        let number = ('' + value).replace(/\D/g, '');

        if(+value < min) {
            let val = min.toFixed(precision);
            number = (val).replace(/\D/g, '');
        }
        
        let monetary = String(+number).padStart(precision + 1, '0');
        let integers = '' + monetary.substring(0, monetary.length - precision);
        let decimals = '' + monetary.substring(monetary.length - precision, monetary.length);

        let valueNumber = +((isNegative ? '-' : '') + integers + (precision > 0 ? '.' + decimals : ''));

        return {
            isNegative: isNegative,
            integers: integers,
            decimals: decimals,
            value: valueNumber,
        };
    }

    const handleChange = (event) => maskValue(event.target.value);
    const inc = () => {
        let stepInterval: number = step;
        let val: number = getValue().value;
        let num = val + stepInterval;
        maskValue(num.toFixed(precision));
    }
    const dec = () => {
        let stepInterval: number = step;
        let val: number = getValue().value;
        let num = val - stepInterval;
        maskValue(num.toFixed(precision));
    }

    const maskValue = async (v) => {

        console.log(v)

        let dataValue = processValue(v);

        if (milionSeparator !== 'none') {

            let newNumber = '';

            if (dataValue.integers.length <= 3) {
                newNumber = dataValue.integers;
            }

            if (dataValue.integers.length > 3 && dataValue.integers.length <= 6) {
                newNumber = dataValue.integers.substring(0, dataValue.integers.length - 3) + milionSeparator + dataValue.integers.substring(dataValue.integers.length - 3, dataValue.integers.length);
            }

            if (dataValue.integers.length > 6) {

                for (let i = dataValue.integers.length; i > 0;) {
                    if (i > 3) {
                        newNumber = milionSeparator + dataValue.integers.substring(i - 3, i) + newNumber;
                        i = i - 3;
                    } else {
                        newNumber = dataValue.integers.substring(0, i) + newNumber;
                        i = 0;
                    }
                }

            }

            dataValue.integers = newNumber;
        }

        let monetary = (dataValue.isNegative ? '-' : '') + dataValue.integers + (precision > 0 ? '.' + dataValue.decimals : '');
        setValue(id, monetary);
    }

    return (
        <>
            <HStack maxW={maxW}>
                {/* <Button {...dec}>-</Button> */}
                <Button onClick={() => dec()}>-</Button>
                <InputGroup size={size}>
                    { getInputAddon(leftAddonChildren) }
                    <Input
                        className={className}
                        id={id}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        size={size}
                        variant={variant}
                    />
                    { getInputAddon(rightAddonChildren, 'RIGHT') }
                </InputGroup>
                {/* <Button {...inc}>+</Button> */}
                <Button onClick={() => inc()}>+</Button>
            </HStack>
        </>
    );
}

export default InputNumber;