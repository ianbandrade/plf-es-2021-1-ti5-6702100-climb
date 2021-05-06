package structs

type Response struct {
  Id      string  `json:"id"`
  Error   *string `json:"error"`
  Success bool    `json:"success"`
}
