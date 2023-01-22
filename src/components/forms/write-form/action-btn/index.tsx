
import React, { useState, useEffect } from 'react';
import { Button, WrapItem } from '@chakra-ui/react';
import { ACTION_CONDITIONS } from '../../shared/types/btn.type';

const getBtnAction = (
    handleBtnSubmit,
    action,
    idx,
    values,
    setFeedbackError,

    setModalConfig,
    isOpen,
    onClose,
    onOpen,
    setModalData
) => {

    const runAction = () => {
        if (action?.type == 'btn-with-confirmation' || action?.type == 'btn-ghost-with-confirmation') {
            if (!action?.modal || action?.modal == undefined || action?.modal == null) {
                setFeedbackError({
                    code: 'CONFIG_NOT_FOUND',
                    message: 'Action modal not configured!',
                })
            }
            setModalData(values);
            setModalConfig(action?.modal);
            onOpen();
            return;
        }

        if (action?.actionFieldParam !== undefined
            && action?.actionFieldParam !== null
            && ('' + action?.actionFieldParam).length > 0
            && values) {

            action?.action(values[action?.actionFieldParam]);
        } else {
            action?.action();
        }

        if (action?.type == 'btn-with-confirmation' || action?.type == 'btn-ghost-with-confirmation') {
            onClose();
        }
    }

    const showAction = () => {
        const isValid = true;
        if (action && action?.conditions !== undefined) {
            for (let i = 0; i < action?.conditions.length; i++) {
                const condition = action?.conditions[i];
                const validation = validateConditions(condition);
                if(!validation) {
                    isValid = validation;
                }
            }
        }
        return isValid;
    }

    const validateConditions = (condition) => {
        if (!condition?.type || !condition?.field || !condition?.condition) {
            setFeedbackError({
                code: 'CONFIG_CONDITION',
                message: 'Condition config error: type, field and condition are required.',
            });
            return false;
        }

        if (!values) {
            return false;
        }

        if (condition?.type == ACTION_CONDITIONS.TYPE.NOT_EQUALS_FIELD) {
            return values[condition?.field] !== condition?.condition;
        }

        setFeedbackError({
            code: 'CONFIG_CONDITION',
            message: 'Condition config error: required config not found',
        });
        return false;
    }

    return (
        <div key={idx}>
            {
                showAction() && (action?.type == 'btn' || action?.type == 'submit' || action?.type == 'btn-with-confirmation') &&
                <WrapItem>
                    <Button
                        type={'button'}
                        onClick={action?.type == 'submit' ? () => handleBtnSubmit() : () => runAction(action)}
                        colorScheme={action?.colorScheme}
                        variant={action?.variant ? action.variant : 'solid'}
                    >
                        <span style={{ marginRight: '0.5em' }}>
                            {action?.icon}
                        </span>
                        {action?.title}
                    </Button>
                </WrapItem>
            }
            {
                showAction() && (action?.type == 'btn-ghost' || action?.type == 'btn-ghost-with-confirmation') &&
                <div
                    style={{ cursor: 'pointer', paddingLeft: '1em', paddingRight: '1em', height: '100%' }}
                    onClick={() => runAction(action)}
                >
                    {action?.icon}
                    {action?.title}
                </div>
            }
            {
                !showAction() && <></>
            }
        </div>
    );
}

export { getBtnAction };