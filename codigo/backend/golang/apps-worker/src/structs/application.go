package structs

type Env struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type Application struct {
	Name           string `json:"name"`
	RepositoryURL  string `json:"repositoryURL"`
	RepositoryPath string `json:"repositoryPath"`
	RepositoryRef  string `json:"repositoryRef"`
	Environments   []Env  `json:"environments"`
}
