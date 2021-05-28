package structs

type Plugins map[string]PluginData

type PluginData struct {
	WebPort    *int32   `json:"webPort"`
	Protocol   string   `json:"protocol"`
	Entrypoint string   `json:"entrypoint"`
	Storages   []string `json:"storages"`
	Configs    Configs  `json:"configs"`
}

type Configs map[string]Config

type Config struct {
	Name  string `json:"name"`
	Label string `json:"label"`
	Path  string `json:"path"`
	Size  int    `json:"size"`
}

type Credential struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}
