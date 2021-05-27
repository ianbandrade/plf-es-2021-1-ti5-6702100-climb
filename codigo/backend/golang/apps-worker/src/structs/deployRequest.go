package structs

type DeployRequest struct {
	Id          string      `json:"id"`
	Token       string      `json:"token"`
	Commit      string      `json:"commit"`
	Timestamp   int         `json:"timestamp"`
	Application Application `json:"application"`
}
