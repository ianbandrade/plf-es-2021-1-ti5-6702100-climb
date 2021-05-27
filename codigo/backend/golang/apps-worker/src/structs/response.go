package structs

type Response struct {
	Id      string  `json:"id"`
	URL     string  `json:"url"`
	Error   *string `json:"error"`
	Success bool    `json:"success"`
}
