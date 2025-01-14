type Status = "CREATING" | "SUCCESS" | "FAIL" | "ROLLBACK";

export type Action = {
  [key in Status]: JSX.Element | null;
};

export interface Activity {
  type: Status;
  commit: string;
  error: string | null;
}

export interface Activities {
  activities: Activity[];
}
