package repository

import "lapak-tech/models"

type UserRepository interface {
	FindUsers() ([]models.User, error)
	GetUser(ID int) (models.User, error)
	UpdateUser(user models.User) (models.User, error)
	DeleteUser(user models.User) (models.User, error)
	// ChangeImage(user models.User) (models.User, error)
}

func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Find(&users).Error

	return users, err
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error

	return user, err
}

func (r *repository) UpdateUser(user models.User) (models.User, error) {
	err := r.db.Save(&user).Error
	return user, err
}

func (r *repository) DeleteUser(user models.User) (models.User, error) {
	err := r.db.Delete(&user).Error
	return user, err
}
