package model


type Promo struct {
	PromoCode string `gorm:"primaryKey"`
	Discount int
}

type UserPromo struct{
	PromoCode string `gorm:"primaryKey"`
	UserID int `gorm:"primaryKey"`
	Quantity int
}