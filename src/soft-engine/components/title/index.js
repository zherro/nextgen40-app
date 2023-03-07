import React from "react";
import clsx from "classnames";
import {
    actionVarStyleClass,
    actionVarTextStyle,
    actionVarTitleSize
} from "../../action/variable.action";
import { Heading, Stack } from "@chakra-ui/react";

/**
 *  Basic title
 * 
 * 
 * @vars styleClass, titleSize, textStyle
 * @typw TITLE
 * 
 * @param {string} title - text title
 * @param {*} Operation
 * 
 * @returns SoftTitle component
 */
const SoftTitle = ({
    vars,
    value
}) => {

    const classStyles = () => {
        return clsx({
            [styles[actionVarStyleClass(vars)]]: true
        })
    }

    return (
        <>
            <Stack spacing={3}>
                <Heading
                    as={actionVarTitleSize(vars)}
                >
                    { value }
                </Heading>
            </Stack>
        </>
    );
}

export default SoftTitle;