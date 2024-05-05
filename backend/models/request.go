package model

import "gorm.io/gorm"

type Request struct {
	gorm.Model
	UserID int
	Name  string
	Desc string
	Price int
	ReqType []Outfit `gorm:"many2many:req_type"`
}