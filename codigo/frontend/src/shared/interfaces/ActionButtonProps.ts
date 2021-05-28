import { ButtonProps } from "@chakra-ui/button";

export interface ActionButtonProps extends ButtonProps {
  href: string;
  backgroundColor: string;
  variant: string;
  label: string;
  icon: any;
  p: string;
  color: string;
}

export interface HeadingActionButtonProps {
  title: string;
}
