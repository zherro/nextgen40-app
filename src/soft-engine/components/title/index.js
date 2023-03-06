import React from "react";
import clsx from "classnames";
import { actionVarTitleStyle } from "../../action/variable.action";
import { Stack, Text } from "@chakra-ui/react";

/**
 *  operation 
 * 
 *  bla bla bla 
 * @param {*} param0 
 * @returns 
 */
const SoftTitle = ({
    operation
}) => {

    const titleStyle = () => {
        return clsx({
            [styles[actionVarTitleSize(operation?.variables)]]: true,
            [styles[actionVarTitleStyle(operation?.variables)]]: true
        })
    }

    return (
        <>
            <Stack spacing={3}>
                <Text fontSize='6xl'>(6xl) In love with React & Next</Text>
                <Text fontSize='5xl'>(5xl) In love with React & Next</Text>
                <Text fontSize='4xl'>(4xl) In love with React & Next</Text>
                <Text fontSize='3xl'>(3xl) In love with React & Next</Text>
                <Text fontSize='2xl'>(2xl) In love with React & Next</Text>
                <Text fontSize='xl'>(xl) In love with React & Next</Text>
                <Text fontSize='lg'>(lg) In love with React & Next</Text>
                <Text fontSize='md'>(md) In love with React & Next</Text>
                <Text fontSize='sm'>(sm) In love with React & Next</Text>
                <Text fontSize='xs'>(xs) In love with React & Next</Text>
            </Stack>
        </>
    );
}

export default SoftTitle;