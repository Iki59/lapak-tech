package handlers

import (
	"fmt"
	dto "lapak-tech/dto/result"
	"lapak-tech/models"
	"lapak-tech/repository"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerproduct struct {
	ProductRepository repository.ProductRepository
}

func HandlerProduct(ProductRepository repository.ProductRepository) *handlerproduct {
	return &handlerproduct{ProductRepository}
}

func (h *handlerproduct) FindProducts(c echo.Context) error {
	products, err := h.ProductRepository.FindProducts()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: products})
}

func (h *handlerproduct) CreateProduct(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)

	Selling, _ := strconv.Atoi(c.FormValue("selling"))
	Purchasing, _ := strconv.Atoi(c.FormValue("purchasing"))
	Quota, _ := strconv.Atoi(c.FormValue("quota"))

	request := models.Product{
		Title:       c.FormValue("title"),
		Quota:       Quota,
		Selling:     Selling,
		Purchasing:  Purchasing,
		Description: c.FormValue("description"),
		Image:       dataFile,
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	response, err := h.ProductRepository.CreateProduct(request)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: response,
	})
}

func (h *handlerproduct) GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: product})

}

func (h *handlerproduct) UpdateProduct(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println(dataFile)

	Selling, _ := strconv.Atoi(c.FormValue("selling"))
	Purchasing, _ := strconv.Atoi(c.FormValue("purchasing"))
	Quota, _ := strconv.Atoi(c.FormValue("quota"))

	request := models.Product{
		Title:       c.FormValue("title"),
		Quota:       Quota,
		Selling:     Selling,
		Purchasing:  Purchasing,
		Description: c.FormValue("description"),
		Image:       dataFile,
	}

	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Title != "" {
		product.Title = request.Title
	}

	if request.Quota != 0 {
		product.Quota = request.Quota
	}

	if request.Selling != 0 {
		product.Selling = request.Selling
	}

	if request.Purchasing != 0 {
		product.Purchasing = request.Purchasing
	}

	if request.Description != "" {
		product.Description = request.Description
	}

	if request.Image != "" {
		product.Image = dataFile
	}

	data, err := h.ProductRepository.UpdateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerproduct) DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	data, err := h.ProductRepository.DeleteProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusBadRequest,
		Data: data})
}
