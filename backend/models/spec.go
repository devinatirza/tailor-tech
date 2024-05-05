package model

type Shirt struct{
	ProductID uint `gorm:"primaryKey"`
	Product Product
	Chest float64
	ShoulderToWaist float64
	Shoulder float64
	SleveLength float64
	Waist float64
	Neck float64
}

type Trouser struct{
	ProductID uint `gorm:"primaryKey"`
	Product Product
	WaistToAnkle float64
	Waist float64
	Hip float64
	Ankle float64
}

type Dress struct{
	ProductID uint `gorm:"primaryKey"`
	Product Product
	Chest float64
	Shoulder float64
	DressLength float64
	Waist float64
	Hip float64
}