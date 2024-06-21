package model

import "gorm.io/gorm"

type Request struct {
    gorm.Model
    TailorID uint
    Tailor Tailor
    UserID uint
    Name  string
    Desc string
    Price uint
    RequestType uint
    ReqType Outfit `gorm:"foreignKey:RequestType"`
}
