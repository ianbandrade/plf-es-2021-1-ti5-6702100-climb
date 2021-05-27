export class ReqInstanceDeleteDto {
  id: string;
  plugin: PluginData;
}

class PluginData {
  name: string;
  chart: string;
}
