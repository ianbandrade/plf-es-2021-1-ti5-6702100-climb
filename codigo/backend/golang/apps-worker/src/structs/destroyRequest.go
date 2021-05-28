package structs

type DestroyRequest struct {
	Id          string      `json:"id"`
	Application Application `json:"application"`
}
