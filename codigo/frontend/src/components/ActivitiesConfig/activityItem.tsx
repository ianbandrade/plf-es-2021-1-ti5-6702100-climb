import { Box, Flex, ListItem, Text } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import api from "../../shared/api/api-client";
import { Action, Activity } from "../../shared/interfaces/Activities";
import { getMessages } from "../../shared/utils/toast-messages";

interface ActivityItemProps {
  activity: Activity;
  rollback: boolean;
  id: string | string[] | undefined;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  activity,
  rollback,
  id,
}): JSX.Element => {
  const toast = useToast();

  const cantRollback: Action = {
    CREATING: null,
    SUCCESS: null,
    FAIL: null,
    ROLLBACK: null,
  };

  const canRollback: Action = {
    CREATING: null,
    SUCCESS: (
      <Button onClick={(): void => toggleRollback()} size="sm">
        Reverter
      </Button>
    ),
    FAIL: null,
    ROLLBACK: (
      <Button onClick={(): void => toggleCancelRollback()} size="sm">
        Cancelar reversão
      </Button>
    ),
  };

  const toggleRollback = () => {
    api
      .post(`applications/${id}/rollback`)
      .then(() => {
        toast({
          title: "Sucesso!",
          description: `A solicitação para realizar o rollback do commit ${activity.commit} foi recebida.`,
          status: "success",
          duration: 3000,
          position: "bottom-left",
          id: id?.toString(),
        });
      })
      .catch((error) => {
        getMessages(error?.response?.data).forEach((description, i) =>
          toast({
            title: "Erro!",
            description,
            status: "error",
            duration: 3000,
            position: "bottom-left",
            id: i,
          })
        );
      });
  };

  const toggleCancelRollback = () => {
    api
      .post(`applications/${id}/rollback/cancel`)
      .then(() => {
        toast({
          title: "Sucesso!",
          description: `A solicitação para realizar o cancelamento do rollback do commit ${activity.commit} foi recebida.`,
          status: "success",
          duration: 3000,
          position: "bottom-left",
          id: id?.toString(),
        });
      })
      .catch((error) => {
        getMessages(error?.response?.data).forEach((description, i) =>
          toast({
            title: "Erro!",
            description,
            status: "error",
            duration: 3000,
            position: "bottom-left",
            id: i,
          })
        );
      });
  };

  return (
    <ListItem w="full">
      <Flex alignContent="center">
        <Box flex="1" textAlign="left" margin="0 auto" mb={2}>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            display="inline-block"
            mr={2}
          >
            Versão:
          </Text>
          <Text display="inline-block" fontSize="lg">
            {activity.commit}
          </Text>
        </Box>
        {rollback === true
          ? canRollback[activity.type]
          : cantRollback[activity.type]}
      </Flex>
    </ListItem>
  );
};
