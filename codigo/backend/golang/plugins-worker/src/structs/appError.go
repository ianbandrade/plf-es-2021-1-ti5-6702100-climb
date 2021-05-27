package structs

type AppError struct {
	Err     error
	Message string
}

func (appError *AppError) Error() string {
	return appError.Message
}
