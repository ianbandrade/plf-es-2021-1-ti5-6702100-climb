export type Status = "FAIL" | "SUCCESS" | "CREATING";

export interface AccordionProps {
  instances: Instance[];
  pluginId: string;
  closeModal: Function;
}

export interface Instance {
  id: string;
  name: string;
  status: Status;
  credentials: Credential[];
}

interface Credential {
  key: string;
  value: string;
}
