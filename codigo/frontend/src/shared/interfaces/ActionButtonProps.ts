import { ButtonProps } from "@chakra-ui/button";

export interface ActionButtonProps extends ButtonProps{
    backgroundColor: string
    variant: string
    label: string
    icon: any
    p: string
    color:string
}