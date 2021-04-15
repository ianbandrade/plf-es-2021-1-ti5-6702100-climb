import { Button, ButtonGroup } from "@chakra-ui/button"
import { AddIcon, SettingsIcon } from "@chakra-ui/icons"
import { Box, Heading, Spacer } from "@chakra-ui/layout"
import { ActionButtonProps } from "../interfaces/ActionButtonProps"


export const ActionButton = () => {
    const baseButtom = {
        p: "4",
        variant: "outline",
        color: "#1f1f1f",
    }

    const preConfiguredApps = {
        backgroundColor: "#5E81AC",
        label: "Apps Pré-configurados",
        icon: <SettingsIcon m="1" />,
        ...baseButtom
    }

    const newApps = {
        backgroundColor: "#A3BE8C",
        label: "Nova Aplicação",
        icon: <AddIcon m="1" />,
        ...baseButtom
    }

    const RenderButton = (props: ActionButtonProps) => (
        <Button {...props}>
            {props.label}
            {props.icon}
        </Button>)

    return (
        <Box display="flex">
            <Box p="4">
                <Heading size="md">Aplicações conectadas</Heading>
            </Box>
            <Spacer />
            <Box>
                <ButtonGroup size="md" mr="16">
                    <RenderButton {...preConfiguredApps} />
                    <RenderButton {...newApps} />
                </ButtonGroup>
            </Box>
        </Box>
    )
}