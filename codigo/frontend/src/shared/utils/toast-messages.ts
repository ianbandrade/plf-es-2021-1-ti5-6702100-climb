export const getMessages = ({ message }: { message: string[] }) =>
  new Array().concat(message ?? []);