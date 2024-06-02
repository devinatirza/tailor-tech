package model

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name  string
	TailorID uint
	Desc string
	Price int
	ImgUrl string
}