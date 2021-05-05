import { List } from "@chakra-ui/layout";
import { Activities } from "../../shared/interfaces/Versions";
import ActivityItem from "./activityItem";

const ActivitiesConfig: React.FC<Activities> = ({
  activities,
}): JSX.Element => {
  return (
    <List spacing={3}>
      {activities.map((activity, i) => {
        return (
          <ActivityItem
            key={i}
            type={activity.type}
            commit={activity.commit}
            error={activity.error}
          />
        );
      })}
    </List>
  );
};

export default ActivitiesConfig;
