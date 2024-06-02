package model

import "gorm.io/gorm"

type Tailor struct {
	gorm.Model
	Name  string
	Email string
	Password string
	Address string
	ImgUrl string
	OutfitPrices []Outfit `gorm:"many2many:tailor_prices"`
	Products []Product
}

type TailorPrice struct{
	TailorID uint `gorm:"primaryKey"`
	OutfitID uint `gorm:"primaryKey"`
	Price int
}

type TailorRating struct{
	TailorID uint `gorm:"primaryKey"`
	Tailor Tailor
	UserID uint `gorm:"primaryKey"`
	User User
	Rating int
}