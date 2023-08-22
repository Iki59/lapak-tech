package routes

import (
	"lapak-tech/handlers"
	"lapak-tech/package/middleware"
	"lapak-tech/package/mysql"
	"lapak-tech/repository"

	"github.com/labstack/echo/v4"
)

func ProductRoutes(e *echo.Group) {
	productRepository := repository.MakeRepository(mysql.DB)
	h := handlers.HandlerProduct(productRepository)

	e.GET("/products", h.FindProducts)
	e.GET("/product/:id", h.GetProduct)
	e.POST("/product", middleware.UploadFile(h.CreateProduct))
	e.PATCH("/product/:id", middleware.UploadFile(h.UpdateProduct))
	e.DELETE("/product/:id", h.DeleteProduct)
}
