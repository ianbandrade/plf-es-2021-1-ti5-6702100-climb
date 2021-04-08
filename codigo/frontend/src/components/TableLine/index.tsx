import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Td, Tooltip, Tr } from "@chakra-ui/react";
import { User } from "../../pages/admin/users";
import { colors } from "../../styles/customTheme";

const cellWidth = "36ch";

interface TableLineProps {
  user: User;
  updateUser: (user: User, index: number) => void;
  deleteUser: (user: User, index: number) => void;
  index: number;
}

const TableLine = ({ user, index, updateUser, deleteUser }: TableLineProps) => {
  return (
    <Tr key={index} h="auto">
      <Td minW={cellWidth} maxW={cellWidth} isTruncated title={user.name}>
        {user.name}
      </Td>
      <Td minW={cellWidth} maxW={cellWidth} isTruncated title={user.email}>
        {user.email}
      </Td>
      <Td minW={cellWidth} maxW={cellWidth} isTruncated title={user.email}>
        {user.githubAcc ?? "-"}
      </Td>
      <Td minW={cellWidth} maxW={cellWidth} isTruncated title={user.email}>
        {user.gitlabAcc ?? "-"}
      </Td>
      <Td>
        <Flex justifyContent="space-around">
          <Tooltip label="Editar usuário" placement="top">
            <EditIcon
              color={colors.aurora.Nord15}
              _hover={{ cursor: "pointer" }}
              boxSize="18px"
              onClick={() => updateUser(user, index)}
            />
          </Tooltip>
          <Tooltip label="Deletar usuário" placement="top">
            <DeleteIcon
              color={colors.aurora.Nord11}
              _hover={{ cursor: "pointer" }}
              boxSize="18px"
              onClick={() => deleteUser(user, index)}
            />
          </Tooltip>
        </Flex>
      </Td>
    </Tr>
  );
};

export default TableLine;
