package structs

type DeployResponse struct {
  Id      string `json:"id"`
  Error   string `json:"error"`
  Success bool   `json:"success"`
}
