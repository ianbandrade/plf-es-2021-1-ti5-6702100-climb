import { List } from "@chakra-ui/layout";
import { Center, Flex, Heading } from "@chakra-ui/react";
import { Activity } from "../../shared/interfaces/Activities";
import { ActivityItem } from "./activityItem";

interface ActivitiesConfigProps {
  activities: Activity[];
  id: string | string[] | undefined;
}

const ActivitiesConfig: React.FC<ActivitiesConfigProps> = ({
  activities,
  id,
}): JSX.Element => {
  return (
    <Flex display="flex" w="40%" flexDirection="column" padding="1" mr={20}>
      <Center margin="5">
        <Heading as="h3" size="lg">
          Atividades
        </Heading>
      </Center>
      <List spacing={3} p={2} overflow="auto" height="26em">
        {activities.map((activity, i) => {
          let canRollback =
            i === 0 &&
            (activity.type === "SUCCESS" || activity.type === "ROLLBACK") &&
            activities.some(
              (act, index) => act.type === "SUCCESS" && index !== i
            );
          return (
            <ActivityItem
              key={i}
              activity={activity}
              rollback={canRollback}
              id={id}
            />
          );
        })}
      </List>
    </Flex>
  );
};

export default ActivitiesConfig;
