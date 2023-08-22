package routes

import (
	"lapak-tech/handlers"
	"lapak-tech/package/middleware"
	"lapak-tech/package/mysql"
	"lapak-tech/repository"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repository.MakeRepository(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/users", h.FindUsers)
	e.GET("/user", middleware.Auth(h.GetUser))
	e.PATCH("/user/:id", middleware.Auth(h.UpdateUser))
	e.DELETE("/user/:id", middleware.Auth(h.DeleteUser))
	// e.PATCH("/change-image", middleware.Auth(middleware.UploadFile(h.ChangeImage)))
}
