
import { Button, WrapItem } from '@chakra-ui/react';

const getBtnAction = (handleBtnSubmit, action, idx) => {
    return (
        <WrapItem key={idx}>
            <Button
                type={'button'}
                onClick={action?.type == 'submit' ? () => handleBtnSubmit() : () => action?.action()}
                colorScheme={action?.colorScheme}
                variant={action?.variant ? action.variant : 'solid'}
            >
                {action?.title}
            </Button>
        </WrapItem>
    );
}

export { getBtnAction };