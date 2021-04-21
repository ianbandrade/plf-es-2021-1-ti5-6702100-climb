export type Status = "fail" | "success" | "creating";

export interface AccordionProps {
  instances: Instance[];
}

export interface Instance {
  id: string;
  name: string;
  status: Status;
  credentials: null | Credential[];
}

interface Credential {
  key: string;
  value: string;
}
