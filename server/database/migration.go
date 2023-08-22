package database

import (
	"fmt"
	"lapak-tech/models"
	"lapak-tech/package/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Product{},
	// &models.Station{},
	// &models.Ticket{},
	// &models.Transaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
