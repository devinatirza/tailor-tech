package model

import "gorm.io/gorm"

type Request struct {
	gorm.Model
	UserID int
	Name  string
	Desc string
	Price int
	RequestType int
	ReqType Outfit `gorm:"foreignKey:RequestType"`
}