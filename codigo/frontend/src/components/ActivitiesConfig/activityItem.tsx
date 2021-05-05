import { Box, Flex, ListItem, Text } from "@chakra-ui/layout";
import React from "react";
import { Action, Activity } from "../../shared/interfaces/Versions";

const action: Action = {
  CREATING: null,
  SUCCESS: null,
  FAIL: null,
  ROLLBACK: null,
};

const ActivityItem: React.FC<Activity> = ({
  type,
  commit,
  error,
}): JSX.Element => {
  return (
    <ListItem w="full">
      <Flex>
        <Box flex="1" textAlign="left" margin="0 auto">
          <Text fontSize="2xl" fontWeight="semibold">
            Versão: {commit}
          </Text>
          {action[type]}
        </Box>
      </Flex>
    </ListItem>
  );
};

export default ActivityItem;
