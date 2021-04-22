package structs

type DeployRequest struct {
  Id          string      `json:"id"`
  Token       string      `json:"token"`
  Application Application `json:"application"`
}
