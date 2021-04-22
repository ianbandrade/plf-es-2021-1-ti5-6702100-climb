package structs

type environment struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type Application struct {
	Id             string        `json:"id"`
	Name           string        `json:"name"`
	RepositoryURL  string        `json:"repositoryURL"`
	RepositoryPath string        `json:"repositoryPath"`
	RepositoryRef  string        `json:"repositoryRef"`
	Environments   []environment `json:"environments"`
}
