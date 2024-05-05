package model

import (
	"regexp"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name  string
	Email string
	PhoneNumber string
	Password string
	Address string
	Transactions []Transaction
	SavedRequests []Request
	Cart []Product `gorm:"many2many:carts"`
	Wishlist []Product `gorm:"many2many:wishlists"`
	Points int
	Promos []Promo `gorm:"many2many:user_promos;references:PromoCode;joinReferences:PromoCode"`
}

func IsValidEmail(email string) bool {
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$`)
	return emailRegex.MatchString(email)
}