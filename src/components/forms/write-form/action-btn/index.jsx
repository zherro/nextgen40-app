
import { Button, WrapItem } from '@chakra-ui/react';

const getBtnAction = (handleBtnSubmit, action, idx, values) => {

    const runAction = () => {
        if(action?.actionFieldParam !== undefined 
            && action?.actionFieldParam !== null
            && (''+action?.actionFieldParam).length > 0
            && values) {

            action?.action(values[action?.actionFieldParam]);
        } else {
            action?.action();
        }
    }

    return (
        <span key={idx}>
            {
                (action?.type == 'btn' || action?.type == 'submit') &&
                <WrapItem>
                    <Button
                        type={'button'}
                        onClick={action?.type == 'submit' ? () => handleBtnSubmit() : () => runAction()}
                        colorScheme={action?.colorScheme}
                        variant={action?.variant ? action.variant : 'solid'}
                    >
                        {action?.icon}
                        {action?.title}
                    </Button>
                </WrapItem>
            }
            {
                action?.type == 'btn-ghost' &&
                    <div
                        style={{cursor: 'pointer' , paddingLeft: '1em', paddingRight: '1em', height: '100%'}}
                        onClick={() => runAction()}
                    >
                        {action?.icon}
                        {action?.title}
                    </div>
            }
        </span>
    );
}

export { getBtnAction };