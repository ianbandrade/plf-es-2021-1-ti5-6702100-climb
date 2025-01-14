import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { colors } from "../../styles/customTheme";

interface ModalComponentProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  width?: number;
  children: ReactNode | ReactNode[];
}

const LIGHT = "light";

const ModalComponent = ({
  title,
  width,
  userName,
  isOpen,
  onClose,
  children,
}: ModalComponentProps) => {
  const { colorMode } = useColorMode();
  const formColor =
    colorMode === LIGHT ? colors.light.Nord6 : colors.dark.Nord2;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        minW={width}
        bgColor={formColor}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ModalHeader display="flex" alignContent="space-between">
          <Heading>{title}</Heading>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody>
          {userName ? (
            <Text
              maxW={350}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              Você deseja deletar{" "}
              {userName.length < 19
                ? `${userName}?`
                : `${userName.slice(0, 19)}...?`}
            </Text>
          ) : (
            ""
          )}
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
