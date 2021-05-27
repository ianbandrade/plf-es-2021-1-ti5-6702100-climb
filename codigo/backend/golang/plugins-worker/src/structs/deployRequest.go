package structs

type DeployRequest struct {
	Id     string `json:"id"`
	Plugin Plugin `json:"plugin"`
}
