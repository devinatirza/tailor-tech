package model

import "gorm.io/gorm"

type Assistant struct {
	gorm.Model
	Name  string
}