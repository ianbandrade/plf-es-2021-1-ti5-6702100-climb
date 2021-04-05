import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { colors } from "../../styles/customTheme";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode[];
}

const LIGHT = "light";

const ModalComponent = ({ isOpen, onClose, children }: ModalComponentProps) => {
  const { colorMode } = useColorMode();
  const formColor =
    colorMode === LIGHT ? colors.light.Nord6 : colors.dark.Nord2;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bgColor={formColor}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ModalHeader alignSelf="flex-start" ml="6%">
          CADASTRO DE USUÁRIO
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
