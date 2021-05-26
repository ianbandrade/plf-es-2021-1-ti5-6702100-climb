export class ReqInstanceDto {
  id: string;
  plugin: PluginData;
}

class PluginData {
  name: string;
  dockerfile: string;
}
