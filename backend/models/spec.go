package model

type Top struct{
	ProductID uint `gorm:"primaryKey"`
	Product Product
	Chest float64
	ShoulderToWaist float64
	Shoulder float64
	SleveLength float64
	Waist float64
	Neck float64
	Collar bool
}

type Bottom struct {
	ProductID    uint    `gorm:"primaryKey"`
	Product      Product
	WaistToAnkle float64
	Waist        float64
	Hip          float64
	Ankle        float64
	Thigh        float64
	Knee         float64
	CuffWidth    float64
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

type Suit struct {
	ProductID   uint    `gorm:"primaryKey"`
	Product     Product
	Chest       float64
	Waist       float64
	Hip         float64
	Shoulder    float64
	SleeveLength float64
	JacketLength float64
	Inseam      float64
	Outseam     float64
	Thigh       float64
	Knee        float64
	Ankle       float64
}

type ToteBag struct {
	ProductID   uint    `gorm:"primaryKey"`
	Product     Product
	Color string
	Material string
	Writing string
	ImageDesc string
}