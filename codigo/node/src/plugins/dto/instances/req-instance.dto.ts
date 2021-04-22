export class ReqInstanceDto {
  id: string;
  plugin: {
    name: string;
    dockerfile: string;
  };
}
