package middleware

import (
	"context"
	"fmt"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/labstack/echo/v4"
)

func isValidImageFormat(file *multipart.FileHeader) bool {
	ext := strings.ToLower(filepath.Ext(file.Filename))
	return ext == ".jpg" || ext == ".jpeg" || ext == ".png"
}

func isValidFileSize(file *multipart.FileHeader) error {
	const maxSize = 100 * 1024 // 100 KB
	if file.Size > maxSize {
		return fmt.Errorf("file size exceeds the maximum limit of 100 KB")
	}
	return nil
}

func UploadFile(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		file, err := c.FormFile("image")
		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		// Check file format
		if !isValidImageFormat(file) {
			return c.JSON(http.StatusBadRequest, "Invalid image format. Only JPG and PNG are allowed.")
		}

		// Check file size
		if err := isValidFileSize(file); err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		src, err := file.Open()
		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}
		defer src.Close()

		ctx := context.Background()
		CLOUD_NAME := os.Getenv("CLOUD_NAME")
		API_KEY := os.Getenv("API_KEY")
		API_SECRET := os.Getenv("API_SECRET")
		// var err error

		cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

		resp, _ := cld.Upload.Upload(ctx, src, uploader.UploadParams{Folder: "lapak_tech"})

		c.Set("dataFile", resp.SecureURL)
		return next(c)
	}
}
