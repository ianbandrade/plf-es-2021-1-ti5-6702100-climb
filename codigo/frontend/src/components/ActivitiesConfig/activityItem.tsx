import { Box, Flex, ListItem, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React from "react";
import api from "../../shared/api/api-client";
import { Action, Activity } from "../../shared/interfaces/Activities";

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
      .then(() => {})
      .catch(() => {});
  };

  const toggleCancelRollback = () => {
    console.log("Here!");
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
