import { modalActionClose, modalActionConfim } from "@/components/forms/helpers/Action.helper";
import { ACTION_CONDITIONS } from "@/components/forms/shared/types/btn.type";
import {
    DeleteIcon,
    EditIcon,
    QuestionOutlineIcon,
    WarningTwoIcon
} from "@chakra-ui/icons";

const viewActionsModel = ({
    router, confirmAction = (uuid) => { },
    confirmMessage = 'registro',
    appEnv
}) => {
    return [
        {
            type: 'btn-with-confirmation',
            icon: <DeleteIcon />,
            title: 'Deletar',
            colorScheme: 'red',
            withConfirm: true,
            modal: {
                titleIcon: <QuestionOutlineIcon boxSize={6} mr={2} />,
                title: 'Confirmacao',
                contentIcon: <WarningTwoIcon boxSize={8} color="red" />,
                content: `Tem certeza que deseja remover este(a) ${confirmMessage}? Esta e uma acao irreversivel!`,
                actions: [
                    modalActionConfim({
                        title: 'Confirmar',
                        colorScheme: 'red',
                        action: confirmAction
                    }),
                    modalActionClose({ title: 'Cancelar' }),
                ]
            },
            modealType: 'request',
            action: () => { router.push(appEnv.ROOT) },
            conditions: [
                {
                    type: ACTION_CONDITIONS.TYPE.NOT_EQUALS_FIELD,
                    field: 'status',
                    condition: 'DELETED'
                }
            ]
        },
        {
            type: 'btn',
            title: 'Ver todos',
            colorScheme: 'blue',
            action: () => { router.push(appEnv.ROOT) },
        },
        {
            type: 'btn',
            icon: <EditIcon />,
            title: 'Editar',
            colorScheme: 'blue',
            actionFieldParam: 'uuid',
            action: (uuid) => { router.push(`${appEnv.EDIT}${uuid}`) },
            conditions: [
                {
                    type: ACTION_CONDITIONS.TYPE.NOT_EQUALS_FIELD,
                    field: 'status',
                    condition: 'DELETED'
                }
            ]
        },
    ];
}

export default viewActionsModel;