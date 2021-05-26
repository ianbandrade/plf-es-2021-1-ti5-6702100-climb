import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, Heading, Spacer } from "@chakra-ui/layout";
import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/table";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { User } from "../../shared/interfaces/user";
import { colors } from "../../styles/customTheme";
import TableLine from "../TableLine";

const NUMBER_OF_USERS_PER_PAGE = 5;
const LIGHT = "light";

export interface UserTableProps {
  users: User[];
  handleUpdateUser(user: User, index: number): void;
  handleDeleteUser(user: User, index: number): void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  handleUpdateUser,
  handleDeleteUser,
}: UserTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const init = (currentPage - 1) * NUMBER_OF_USERS_PER_PAGE;

  const updateNumberOfPages = () => {
    const page = Math.ceil(users.length / NUMBER_OF_USERS_PER_PAGE);
    setNumberOfPages(page);
    setCurrentPage(page < currentPage ? page : currentPage);
  };

  useEffect(() => {
    updateNumberOfPages();
  }, [users]);

  const { colorMode } = useColorMode();
  const setTableBgColor: string =
    colorMode === LIGHT ? colors.light.Nord5 : colors.dark.Nord1;
  const handleNextPage = (): void =>
    setCurrentPage((prevState) => prevState + 1);

  const handlePrevPage = (): void =>
    setCurrentPage((prevState) => prevState - 1);

  const handleRenderUsers: JSX.Element[] = users
    .slice(init, init + NUMBER_OF_USERS_PER_PAGE)
    .map((user, i) => {
      const key = init + i;
      return (
        <TableLine
          index={key}
          user={user}
          key={key}
          updateUser={(updatedUser) => handleUpdateUser(updatedUser, key)}
          deleteUser={(deletedUser) => handleDeleteUser(deletedUser, key)}
        />
      );
    });

  return (
    <Table
      boxShadow="dark-lg"
      variant="striped"
      bgColor={setTableBgColor}
      borderRadius={6}
      maxH={600}
      minW={1000}
      maxW={500}
      size="lg"
      h={"50%"}
    >
      <Thead>
        <Tr height={5}>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>Github</Th>
          <Th>Gitlab</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>{handleRenderUsers}</Tbody>
      <Tfoot>
        <Tr height="5px">
          <Td colSpan={5}>
            <Flex alignItems="center">
              <Button
                isDisabled={currentPage === 1}
                onClick={(): void => handlePrevPage()}
              >
                <AiOutlineArrowLeft />
              </Button>
              <Spacer />
              <Heading fontSize="22px">{currentPage}</Heading>
              <Spacer />
              <Button
                isDisabled={currentPage === numberOfPages}
                onClick={(): void => handleNextPage()}
              >
                <AiOutlineArrowRight />
              </Button>
            </Flex>
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  );
};
