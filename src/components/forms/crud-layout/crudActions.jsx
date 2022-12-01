import { Button, Spacer, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

const CrudActions = ({ actions }) => {

    return (
        <>
            <Wrap spacing={4} gap='2' >
                <Spacer />
                {
                    actions?.map((action, idx) => {
                        return (
                            <WrapItem key={idx}>
                                <Button
                                    onClick={() => action?.onClick()}
                                    colorScheme={action?.type == 'add' ? 'green' : action?.type == 'gray'}
                                    variant={action?.variant ? action.variant : 'outline'} >
                                    {action?.title}
                                </Button>
                            </WrapItem>
                        )
                    })
                }
            </Wrap>
        </>
    );
}

export default CrudActions;