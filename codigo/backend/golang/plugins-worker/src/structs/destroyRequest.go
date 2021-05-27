package structs

type DestroyRequest struct {
	Id     string `json:"id"`
	Plugin Plugin `json:"plugin"`
}
