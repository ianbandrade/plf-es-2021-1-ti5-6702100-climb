import { Flex, Td, Tooltip, Tr } from "@chakra-ui/react";
import { User } from "../../pages/admin/users";
import { DeleteIcon, EditIcon, Icon } from "@chakra-ui/icons";
import { colors } from "../../styles/customTheme";
const cellItemLength = "36ch";

interface TableLineProps {
  user: User;
}

const TableLine = ({ user }: TableLineProps) => {
  return (
    <Tr key={Math.random()}>
      <Td maxWidth={cellItemLength} isTruncated title={user.displayName}>
        {user.displayName}
      </Td>
      <Td maxWidth={cellItemLength} isTruncated title={user.email}>
        {user.email}
      </Td>
      <Td maxWidth={cellItemLength} isTruncated title={user.email}>
        {user.userName}
      </Td>
      <Td>
        <Flex justifyContent="space-around">
          <Tooltip label="Editar usuário" placement="top">
            <EditIcon
              color={colors.aurora.Nord13}
              _hover={{ cursor: "pointer" }}
              onClick={() => alert("oi")}
              boxSize="18px"
            />
          </Tooltip>
          <Tooltip label="Deletar usuário" placement="top">
            <DeleteIcon
              color={colors.aurora.Nord11}
              _hover={{ cursor: "pointer" }}
              onClick={() => alert("oi")}
              boxSize="18px"
            />
          </Tooltip>
        </Flex>
      </Td>
    </Tr>
  );
};

export default TableLine;
