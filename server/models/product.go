package models

type Product struct {
	ID          int    `json:"id" gorm:"primaryKey:autoIncrement"`
	Title       string `json:"title" gorm:"type: varchar(100);unique"`
	Quota       int    `json:"quota"`
	Selling     int    `json:"selling"`
	Purchasing  int    `json:"purchasing"`
	Description string `json:"description" gorm:"type: varchar(500)"`
	Image       string `json:"image"`
}
